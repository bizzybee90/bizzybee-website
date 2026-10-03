import { describe, it, expect, vi, beforeAll, beforeEach, afterEach } from "vitest";
import { render, cleanup, fireEvent, act } from "@testing-library/react";
import { MotionGlobalConfig } from "framer-motion";
import App from "@/App";
import { findBannedInRendered, foldText } from "./claims";
import indexHtml from "/index.html?raw";

// Checks what visitors actually read, not the source: every page is rendered
// at desktop and phone width with every section on screen, timers are run
// forward (the inbox sorts itself, the steps move on), the story is stepped
// through to its last stage, every button is pressed to open the FAQ answers,
// demo tabs, steps and menus, and the exit pop-up and sticky button are
// triggered. Text marked [data-before-story] (the owner's life before
// BizzyBee) is left out, but only inside the story section.

vi.mock("@/integrations/supabase/client", () => ({
  supabase: { from: () => ({ insert: async () => ({ error: null }) }) },
}));

const ROUTES = ["/", "/pricing", "/about", "/contact", "/privacy", "/terms", "/no-such-page"];
const WIDTHS = [1280, 375];
const ATTRIBUTES = ["alt", "title", "aria-label", "placeholder", "content", "href", "value"];
const STORY = "[data-growth-trap-story]";
const MARKED = "[data-before-story]";

// Reports every observed element as on screen, so sections that wait to be
// scrolled into view (the sorted inbox, the stats, the story) render.
class OnScreenObserver {
  private stopped = false;
  constructor(private callback: IntersectionObserverCallback) {}
  observe(target: Element) {
    queueMicrotask(() => {
      if (this.stopped) return;
      const entry = { target, isIntersecting: true, intersectionRatio: 1 } as unknown as IntersectionObserverEntry;
      this.callback([entry], this as unknown as IntersectionObserver);
    });
  }
  unobserve() {}
  disconnect() {
    this.stopped = true;
  }
  takeRecords() {
    return [];
  }
}

class NoopObserver {
  observe() {}
  unobserve() {}
  disconnect() {}
}

beforeAll(() => {
  // Swap content instantly, so a tab press shows its panel straight away.
  MotionGlobalConfig.skipAnimations = true;
  vi.stubGlobal("IntersectionObserver", OnScreenObserver);
  vi.stubGlobal("ResizeObserver", NoopObserver);
  window.scrollTo = () => {};
  HTMLCanvasElement.prototype.getContext = (() => null) as never;
});

beforeEach(() => {
  vi.useFakeTimers();
});

afterEach(() => {
  cleanup();
  vi.clearAllTimers();
  vi.useRealTimers();
  sessionStorage.clear();
});

// Visible text and readable attributes, minus the before-story parts of the
// story section. The text is read twice: run together, so a word split across
// tags stays whole ("free tr<b>ial</b>"), and with a space between elements,
// so a word starting one element isn't glued to the end of the one before
// ("Choose your plan" + "WhatsApp replies").
const readPage = () => {
  const copy = document.body.cloneNode(true) as HTMLElement;
  copy.querySelectorAll(`${STORY} ${MARKED}, script, style`).forEach((el) => el.remove());
  const texts: string[] = [];
  const walker = document.createTreeWalker(copy, NodeFilter.SHOW_TEXT);
  while (walker.nextNode()) texts.push(walker.currentNode.nodeValue ?? "");
  const attrs = [...copy.querySelectorAll("*")].flatMap((el) =>
    ATTRIBUTES.map((a) => el.getAttribute(a)).filter((v): v is string => !!v),
  );
  return [texts.join(""), texts.join(" "), ...attrs].join("\n");
};

// The before-story marker only counts inside the one story section.
const markerProblems = () => [
  ...(document.querySelectorAll(STORY).length > 1 ? ["more than one story section"] : []),
  ...[...document.querySelectorAll(MARKED)]
    .filter((el) => !el.closest(STORY))
    .map((el) => `before-story marker outside the story: ${el.outerHTML.slice(0, 100)}`),
];

const wait = (ms: number) =>
  act(async () => {
    await vi.advanceTimersByTimeAsync(ms);
  });
const tick = () => wait(20);

// The desktop story moves one stage per key press (after a short cooldown),
// then flips between "before" and "after" every 4 seconds on its last stage.
const stepStory = async (read: () => void) => {
  for (let stage = 0; stage <= 4; stage++) {
    fireEvent.keyDown(window, { key: "ArrowDown" });
    await wait(800);
    read();
  }
  await wait(4000);
  read();
  await wait(4000);
  read();
};

const visit = async (path: string, width: number) => {
  window.innerWidth = width;
  window.history.pushState({}, "", path);
  render(<App />);
  const seen: string[] = [];
  const problems = new Set<string>();
  const read = () => {
    seen.push(readPage());
    markerProblems().forEach((p) => problems.add(p));
  };

  // Let timed content play out: the inbox sorts itself, the steps move on.
  for (const ms of [20, 1500, 1500, 3000]) {
    await wait(ms);
    read();
  }

  if (document.querySelector(STORY)) await stepStory(read);

  // Press every button once, reading the page after each press.
  const buttons = [...document.querySelectorAll("button")].filter((b) => !b.closest(`${STORY} ${MARKED}`));
  for (const button of buttons) {
    if (!button.isConnected) continue;
    await act(async () => {
      fireEvent.click(button);
    });
    await tick();
    read();
  }

  // The sticky button appears after scrolling, the exit pop-up when the
  // pointer leaves the top of the window.
  await act(async () => {
    Object.defineProperty(window, "scrollY", { value: 1200, configurable: true });
    window.dispatchEvent(new Event("scroll"));
    document.dispatchEvent(new MouseEvent("mouseleave", { clientY: 0 }));
  });
  await tick();
  read();
  Object.defineProperty(window, "scrollY", { value: 0, configurable: true });
  return { text: seen.join("\n"), problems: [...problems] };
};

describe("what visitors read", () => {
  for (const width of WIDTHS) {
    for (const path of ROUTES) {
      it(`${path} at ${width}px makes no banned claims`, async () => {
        const { text, problems } = await visit(path, width);
        expect(text.length).toBeGreaterThan(200);
        expect(problems).toEqual([]);
        expect(findBannedInRendered(text)).toEqual([]);
      });
    }
  }

  // If a layout change stops any of these from rendering, the check above
  // would quietly stop reading them, so each one is asserted here.
  it("reads the hidden parts too: FAQ answers, demo tabs, the sorted inbox, the story's ending and the exit pop-up", async () => {
    const text = foldText((await visit("/", 1280)).text);
    expect(text).toContain("refund your first payment in full");
    expect(text).toContain("Every customer's story in one place");
    expect(text).toContain("Not sure yet? Test it on your real customers.");
    expect(text).toContain("The urgent ones come first");
    expect(text).toContain("✓ prioritised");
    expect(text).toContain("Emergency booking");
    expect(text).toContain("After BizzyBee");
    expect(text).toContain("Supplier spam moved out of the way.");
    expect(text).toContain("keeps your customer emails from getting buried");
  });

  it("reads the story's ending on a phone too", async () => {
    const text = foldText((await visit("/", 375)).text);
    expect(text).toContain("Tom is chasing his quote for the third time.");
    expect(text).toContain("keeps your customer emails from getting buried");
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

  it("drops the before-story marker in the story's ending on desktop", async () => {
    window.innerWidth = 1280;
    window.history.pushState({}, "", "/");
    render(<App />);
    await tick();
    const story = () => document.querySelector(STORY)!;
    const stages: number[] = [];
    await stepStory(() => stages.push(story().querySelectorAll(MARKED).length));
    // Stages 0 to 3 are the before-story, all marked. On the last stage the
    // "after" view has no marker at all; its "before" flip marks only the chaos.
    expect(stages.slice(0, 4).every((n) => n > 0)).toBe(true);
    expect(stages[4]).toBe(0);
    expect(stages[5]).toBeGreaterThan(0);
    expect(stages[6]).toBe(0);
    expect(story().textContent).toContain("Supplier spam moved out of the way.");
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

  it("catches a banned word at the start of an element that follows another", () => {
    const Probe = () => (
      <main>
        <button>Choose your plan</button>
        <p>{["Whats", "App"].join("")} replies handled too</p>
      </main>
    );
    render(<Probe />);
    expect(findBannedInRendered(readPage())).toContain("only email works today");
  });

  it("catches a word split across tags", () => {
    render(
      <p>
        Start your free tr<b>ial</b>
      </p>,
    );
    expect(findBannedInRendered(readPage())).toContain("there is no free trial");
  });

  it("reads and flags a before-story marker outside the story", () => {
    const Probe = () => (
      <main>
        <p data-before-story="">We answer {["Whats", "App"].join("")} too</p>
      </main>
    );
    render(<Probe />);
    expect(markerProblems()).toHaveLength(1);
    expect(findBannedInRendered(readPage())).toContain("only email works today");
  });

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
