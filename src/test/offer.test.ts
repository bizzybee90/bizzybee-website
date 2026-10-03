import { describe, it, expect } from "vitest";
import { plans, signupUrl, MONEY_BACK_DAYS, FOUNDER_PLACES, pending } from "@/lib/offer";
import { findBannedClaims, BEFORE_STORY_FILE } from "./claims";

// Every page, component and content file, as text, so the copy can be checked
// for promises we can't keep. Tests and the generic UI kit are left out.
const sources = import.meta.glob(
  ["/src/**/*.{ts,tsx}", "/index.html", "!/src/test/**", "!/src/components/ui/**"],
  { query: "?raw", import: "default", eager: true },
) as Record<string, string>;

describe("the offer", () => {
  it("has the two agreed plans at the agreed prices", () => {
    expect(plans.map((p) => [p.id, p.name, p.price, p.founderPrice])).toEqual([
      ["inbox", "BizzyBee Inbox", 49, undefined],
      ["ai_assistant", "BizzyBee AI Assistant", 149, 89],
    ]);
    expect(FOUNDER_PLACES).toBe(50);
    expect(MONEY_BACK_DAYS).toBe(30);
  });

  it("shows prices plus VAT", () => {
    expect(pending.vatLabel).toBe("+ VAT");
  });

  it("never mentions AI features on the Inbox plan", () => {
    const inbox = plans.find((p) => p.id === "inbox")!;
    const text = [inbox.description, ...inbox.features].join(" ").toLowerCase();
    expect(text).not.toMatch(/draft|sort|learn|classif/);
  });

  it("sends each plan button to sign-up with its plan", () => {
    expect(signupUrl("inbox")).toBe("https://app.bizzybee.co.uk/auth?mode=signup&plan=inbox");
    expect(signupUrl("ai_assistant")).toBe("https://app.bizzybee.co.uk/auth?mode=signup&plan=ai_assistant");
  });
});

describe("the banned-claims check", () => {
  it("reads the site's pages and content files", () => {
    const files = Object.keys(sources);
    expect(files).toContain("/src/components/Hero.tsx");
    expect(files).toContain("/src/lib/offer.ts");
    expect(files).toContain("/index.html");
  });

  // The two edits that slipped past the first version of this check.
  it("catches a free trial in the offer file", () => {
    const offer = sources["/src/lib/offer.ts"].replace(
      "No AI reads or writes anything",
      "Start your free trial today",
    );
    expect(findBannedClaims(offer)).toContain("there is no free trial");
  });

  it("catches unsupported channels, spaced-out 24/7 and auto-send in the hero", () => {
    const hero = sources["/src/components/Hero.tsx"].replace(
      "You check it and press send.",
      "We answer WhatsApp, SMS and Facebook messages 24 / 7, and auto-send replies.",
    );
    expect(findBannedClaims(hero)).toEqual(
      expect.arrayContaining([
        "only email works today",
        "no round-the-clock claims",
        "nothing is sent or handled without the owner",
      ]),
    );
  });

  it("catches claims split across lines", () => {
    expect(findBannedClaims("Start your free\n          trial")).toContain("there is no free trial");
  });

  // Phrases split by markup or code, as the second review tried in Hero.
  const hero = sources["/src/components/Hero.tsx"];
  const heroWith = (line: string) => hero.replace("You check it and press send.", line);

  it("catches a phrase split by a tag", () => {
    expect(findBannedClaims(heroWith("Start your free <strong>trial</strong> today."))).toContain(
      "there is no free trial",
    );
  });

  it("catches 24/7 split by a line-break hint", () => {
    expect(findBannedClaims(heroWith("We answer 24/<wbr />7."))).toContain("no round-the-clock claims");
  });

  it("catches a channel name split by a code expression", () => {
    expect(findBannedClaims(heroWith('We answer What{"s"}App too.'))).toContain("only email works today");
  });

  it("catches a channel name written with an HTML entity or a hidden space", () => {
    expect(findBannedClaims(heroWith("We answer &#87;hatsApp too."))).toContain("only email works today");
    expect(findBannedClaims(heroWith("We answer Whats\u200bApp too."))).toContain("only email works today");
  });

  it("allows other channels only inside the marked before-story of the story file", () => {
    const block = "// before-story:start\nconst cards = [{ from: \"WhatsApp\" }];\n// before-story:end";
    const line = 'const line = "more WhatsApps"; // before-story';
    expect(findBannedClaims(block, BEFORE_STORY_FILE)).toEqual([]);
    expect(findBannedClaims(line, BEFORE_STORY_FILE)).toEqual([]);
    expect(findBannedClaims('const line = "more WhatsApps";', BEFORE_STORY_FILE)).toEqual(["only email works today"]);
  });

  it("ignores a before-story marker in any other file", () => {
    const faq = sources["/src/components/FAQ.tsx"].replace(
      "const faqs = [",
      'const faqs = [\n  { q: "Do you answer WhatsApp and Facebook?", a: "Yes." }, // before-story',
    );
    expect(findBannedClaims(faq, "/src/components/FAQ.tsx")).toContain("only email works today");
    const block = "// before-story:start\nconst cards = [{ from: \"WhatsApp\" }];\n// before-story:end";
    expect(findBannedClaims(block, "/src/components/FAQ.tsx")).toContain("only email works today");
  });

  it("still bans a free trial inside the before-story", () => {
    const marked = "// before-story:start\nconst t = \"free trial\";\n// before-story:end";
    expect(findBannedClaims(marked, BEFORE_STORY_FILE)).toContain("there is no free trial");
  });
});

describe("the site's copy", () => {
  for (const [file, text] of Object.entries(sources)) {
    it(`${file} makes no banned claims`, () => {
      expect(findBannedClaims(text, file)).toEqual([]);
    });
  }
});
