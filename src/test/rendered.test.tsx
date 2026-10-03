import { describe, it, expect, vi, beforeAll, afterEach } from "vitest";
import { render, cleanup, fireEvent, act } from "@testing-library/react";
import { MotionGlobalConfig } from "framer-motion";
import App from "@/App";
import { findBannedInRendered, foldText } from "./claims";
import indexHtml from "/index.html?raw";

// Checks what visitors actually read, not the source: every page is rendered
// at desktop and phone width, every button is pressed to open the FAQ answers,
// demo tabs, steps and menus, and the exit pop-up and sticky button are
// triggered. Text inside [data-before-story] (the owner's life before
// BizzyBee) is left out.

vi.mock("@/integrations/supabase/client", () => ({
  supabase: { from: () => ({ insert: async () => ({ error: null }) }) },
}));

const ROUTES = ["/", "/pricing", "/about", "/contact", "/privacy", "/terms", "/no-such-page"];
const WIDTHS = [1280, 375];
const ATTRIBUTES = ["alt", "title", "aria-label", "placeholder", "content", "href", "value"];

beforeAll(() => {
  // Swap content instantly, so a tab press shows its panel straight away.
  MotionGlobalConfig.skipAnimations = true;
  class NoopObserver {
    observe() {}
    unobserve() {}
    disconnect() {}
    takeRecords() {
      return [];
    }
  }
  vi.stubGlobal("IntersectionObserver", NoopObserver);
  vi.stubGlobal("ResizeObserver", NoopObserver);
  window.scrollTo = () => {};
  HTMLCanvasElement.prototype.getContext = (() => null) as never;
});

afterEach(() => {
  cleanup();
  sessionStorage.clear();
});

// Visible text and readable attributes, minus the before-story parts.
const readPage = () => {
  const copy = document.body.cloneNode(true) as HTMLElement;
  copy.querySelectorAll("[data-before-story], script, style").forEach((el) => el.remove());
  const attrs = [...copy.querySelectorAll("*")].flatMap((el) =>
    ATTRIBUTES.map((a) => el.getAttribute(a)).filter((v): v is string => !!v),
  );
  return [copy.textContent ?? "", ...attrs].join("\n");
};

const tick = () => act(() => new Promise((r) => setTimeout(r, 20)));

const visit = async (path: string, width: number) => {
  window.innerWidth = width;
  window.history.pushState({}, "", path);
  render(<App />);
  await tick();
  const seen = [readPage()];

  // Press every button once, reading the page after each press.
  const buttons = [...document.querySelectorAll("button")].filter((b) => !b.closest("[data-before-story]"));
  for (const button of buttons) {
    if (!button.isConnected) continue;
    await act(async () => {
      fireEvent.click(button);
    });
    await tick();
    seen.push(readPage());
  }

  // The sticky button appears after scrolling, the exit pop-up when the
  // pointer leaves the top of the window.
  await act(async () => {
    Object.defineProperty(window, "scrollY", { value: 1200, configurable: true });
    window.dispatchEvent(new Event("scroll"));
    document.dispatchEvent(new MouseEvent("mouseleave", { clientY: 0 }));
  });
  await tick();
  seen.push(readPage());
  Object.defineProperty(window, "scrollY", { value: 0, configurable: true });
  return seen.join("\n");
};

describe("what visitors read", () => {
  for (const width of WIDTHS) {
    for (const path of ROUTES) {
      it(`${path} at ${width}px makes no banned claims`, async () => {
        const text = await visit(path, width);
        expect(text.length).toBeGreaterThan(200);
        expect(findBannedInRendered(text)).toEqual([]);
      });
    }
  }

  it("reads the hidden parts too: FAQ answers, demo tabs and the exit pop-up", async () => {
    const text = foldText(await visit("/", 1280));
    expect(text).toContain("refund your first payment in full");
    expect(text).toContain("Every customer's story in one place");
    expect(text).toContain("Not sure yet? Test it on your real customers.");
    expect(text).toContain("The urgent ones come first");
  });

  it("leaves out only the before-story", async () => {
    window.innerWidth = 375;
    window.history.pushState({}, "", "/");
    render(<App />);
    await tick();
    expect(document.body.textContent).toContain("more WhatsApps");
    expect(readPage()).not.toContain("more WhatsApps");
    expect(readPage()).toContain("keeps your customer emails from getting buried");
  });

  it("checks the page title and share text", () => {
    const doc = new DOMParser().parseFromString(indexHtml, "text/html");
    const meta = [...doc.querySelectorAll("meta")].map((m) => m.getAttribute("content") ?? "");
    expect(findBannedInRendered([doc.title, ...meta].join("\n"))).toEqual([]);
  });
});

describe("the rendered-text check", () => {
  // The second review's probes that got past the source check.
  const probes = [
    "We answer What's App",
    "Whats-App replies",
    "WhаtsApp (Cyrillic a)",
    "Whats­App",
    "We reply ２４／７",
    "phone calls handled",
    "texting your customers",
    "Insta messages",
    "Start your free trial",
    "We auto-send replies",
    "Chat on WhatsApp via https://wa.me/447400123456",
  ];
  for (const probe of probes) {
    it(`catches "${probe}"`, () => {
      expect(findBannedInRendered(probe)).not.toEqual([]);
    });
  }

  it("catches text built by code once it's on the page", async () => {
    const parts = ["Whats", "App"];
    const Probe = () => (
      <main>
        <p>{`We answer ${parts.join("")}`}</p>
        <img alt={"free " + "trial"} src="x.png" />
      </main>
    );
    render(<Probe />);
    expect(findBannedInRendered(readPage())).toEqual(
      expect.arrayContaining(["only email works today", "there is no free trial"]),
    );
  });
});
