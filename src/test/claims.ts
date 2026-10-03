// What the site must never promise. The owner's rule is "claim only what's
// proven": no trial (pay first, with a money-back promise), email only, and
// nothing sent or handled without the owner.

type Rule = { pattern: RegExp; why: string };

// Banned everywhere, including the "before BizzyBee" story.
export const alwaysBanned: Rule[] = [
  { pattern: /free\s*trial|start (your )?trial|trial (period|days)|\d+[- ]day trial|try (it )?(for )?free/i, why: "there is no free trial" },
  { pattern: /no (credit |debit )?card (required|needed)|without a (credit |debit )?card/i, why: "payment comes first" },
  { pattern: /\b(hundreds|thousands|millions) of\b/i, why: "no customer counts we can't show" },
  { pattern: /\d[\d,]*\+?\s+(uk\s+)?(service\s+)?(businesses|customers|users)\s+(trust|use|love|rely)/i, why: "no customer counts we can't show" },
  { pattern: /24\s*\/\s*7|24\s*x\s*7|(a)?round[- ]the[- ]clock/i, why: "no round-the-clock claims" },
  { pattern: /auto[- ]?(send|sends|sent|sending|repl|respond|handl|book)/i, why: "nothing is sent or handled without the owner" },
  { pattern: /automatically (send|sends|repl|respond|handl|book)/i, why: "nothing is sent or handled without the owner" },
  { pattern: /instant(ly)?\s+(repl|respon|answer)/i, why: "no speed promises" },
  { pattern: /never miss|never lose (a|another) (lead|customer|job|enquiry)/i, why: "no guarantees" },
  { pattern: /no (customer|enquiry|lead|message|email)s? (ever|will ever|goes unanswered)|every (customer|enquiry|lead|message|email) (gets )?(answered|replied|handled)/i, why: "no guarantees" },
  { pattern: /(set ?up|live|ready|up and running) in (under |less than )?\d+\s*(sec|min|hour)/i, why: "no setup-time claims we haven't measured" },
  { pattern: /\d+(\.\d+)?\s*%\s*\+?\s*(accura|voice|approv|match)/i, why: "no accuracy figures we haven't measured" },
  { pattern: /google (my )?business/i, why: "Google Business messaging is retired and not sold" },
  { pattern: /ai phone|phone agent|voice agent|ai receptionist/i, why: "AI phone is not sold" },
  { pattern: /reads? your website|scans? your website|learns? from your website/i, why: "website reading isn't built" },
  { pattern: /most (other )?(mailboxes|email providers)|any (mailbox|email provider)/i, why: "only Gmail and Microsoft are offered" },
];

// Channels BizzyBee doesn't support yet. Allowed only inside the marked
// "before BizzyBee" story, where they show the owner's problem.
export const channelBanned: Rule[] = [
  {
    pattern:
      /\bwhats\s*apps?\b|\bsms\b|\btexts\b|\btext messages?\b|\bfacebook\b|\binstagram\b|\bmessenger\b|\bvoicemail\b|\bphones?\b|\bgoogle reviews?\b|\bweb\s*chat\b|\blive chat\b/i,
    why: "only email works today",
  },
];

// Removes the marked before-story parts: blocks between
// `// before-story:start` and `// before-story:end`, and single lines ending
// in `// before-story`.
export const withoutBeforeStory = (text: string) =>
  text
    .replace(/\/\/ before-story:start[\s\S]*?\/\/ before-story:end/g, "")
    .split("\n")
    .filter((line) => !/\/\/ before-story\s*$/.test(line))
    .join("\n");

const normalise = (text: string) => text.replace(/\s+/g, " ");

export const findBannedClaims = (text: string): string[] => {
  const all = normalise(text);
  const outsideStory = normalise(withoutBeforeStory(text));
  return [
    ...alwaysBanned.filter((r) => r.pattern.test(all)),
    ...channelBanned.filter((r) => r.pattern.test(outsideStory)),
  ].map((r) => r.why);
};
