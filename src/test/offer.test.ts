import { describe, it, expect } from "vitest";
import { plans, signupUrl, MONEY_BACK_DAYS, FOUNDER_PLACES, pending } from "@/lib/offer";

// Every page and component, as text, so the copy can be checked for promises
// we can't keep.
const sources = import.meta.glob(["/src/**/*.tsx", "/index.html", "!/src/components/ui/**"], {
  query: "?raw",
  import: "default",
  eager: true,
}) as Record<string, string>;

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

describe("the copy", () => {
  // Pay-first with a money-back promise replaced the trial, and only email
  // works today. None of these may come back without the owner's say-so.
  const banned: [RegExp, string][] = [
    [/free trial/i, "there is no free trial"],
    [/no credit card/i, "payment comes first"],
    [/(hundreds|thousands) of (uk )?(service )?businesses/i, "no customer counts we can't show"],
    [/24\/7/, "no round-the-clock claims"],
    [/auto-handled/i, "nothing is handled without the owner"],
    [/AI phone|phone agent/i, "AI phone is not sold"],
    [/Google (My )?Business/i, "Google Business messaging is retired and not sold"],
    [/WhatsApp (Business )?AI|SMS AI|SMS Auto/i, "WhatsApp and SMS are not available"],
    [/Facebook (&|and) Instagram/i, "Meta channels are not available"],
  ];

  it("reads the site's pages", () => {
    expect(Object.keys(sources)).toContain("/src/components/Hero.tsx");
    expect(Object.keys(sources)).toContain("/index.html");
  });

  for (const [pattern, why] of banned) {
    it(`doesn't say ${pattern} (${why})`, () => {
      const hits = Object.entries(sources)
        .filter(([, text]) => pattern.test(text))
        .map(([file]) => file);
      expect(hits).toEqual([]);
    });
  }
});
