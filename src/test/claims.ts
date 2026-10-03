// What the site must never promise. The owner's rule is "claim only what's
// proven": no trial (pay first, with a money-back promise), email only, and
// nothing sent or handled without the owner.

// allowedOn: the one source file, and the page it renders, where the rule
// doesn't apply.
type Rule = { pattern: RegExp; why: string; allowedOn?: { file: string; route: string } };

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
  // History import is capped (provisionally 12 months or 10,000 emails per
  // mailbox), optional, and runs in the background; its cost is unmeasured
  // and imported attachments aren't verified (Michael, 3 Oct 21:28).
  {
    pattern:
      /\b(full|complete|entire|whole|all( of)?|every)\b.{0,25}\b(history|past e?-?mails?|old e?-?mails?)\b|full picture|years of (e?-?mails?|history|messages)|every email you('ve| have) ever|everything (a|your) customers? (has|have) (ever )?said/i,
    why: "history import is capped and optional",
  },
  {
    pattern:
      /\battachments?\b|\b(photos?|pdfs?|files|documents?|images?)\b.{0,30}\b(come|comes|coming|came) (across|with|in|over|through)\b|\b(photos?|pdfs?|files|documents?|images?)\b.{0,30}\b(imported|brought in|kept|preserved|included)\b|file ?names? (and|,) (sizes?|types?)/i,
    why: "imported attachments aren't verified",
    // The privacy policy lists attachments as data Nylas may handle.
    allowedOn: { file: "/src/pages/Privacy.tsx", route: "/privacy" },
  },
  {
    pattern: /import costs?|\b\d+p\b|\bpence\b|\bpenn(y|ies)\b|£\s?\d*\.\d+\s*(per|a|an|each)\b|\bcosts?\b.{0,20}£\s?\d*\.\d+/i,
    why: "no import cost claims until measured",
  },
  // The numbers are enforced, so they're a monthly allowance (Michael's
  // term), not a soft "fair use" limit.
  { pattern: /fair[- ]use/i, why: "allowances are a monthly allowance, not fair use" },
  // Michael, 3 Oct 21:56-21:57.
  { pattern: /\bcooper\b/i, why: "the founder is Michael Carbon" },
  {
    pattern:
      /\b(get back to (you|them)|reply|replies|respond|response|be in touch|hear (back )?from us|answer)\b.{0,30}\bwithin (a few |an? |\d+\s*[–-]?\s*\d*\s*)(business |working )?(hours?|minutes?|mins?)\b|\b(24|48)[- ]?hours?\b|\bin touch shortly\b|\busually within\b/i,
    why: "replies are promised within 1 working day",
  },
];

// Setup, import and learning speed are unmeasured (Michael, 3 Oct 21:28).
// The before-story may say "the same day" about the owner's old life.
export const speedBanned: Rule = {
  pattern:
    /takes (just )?(a|one|\d+) (minute|min)|from (day one|the first minute|minute one)|in (just |a few |\d+ )?(seconds|minutes)|instant(ly)? (import|set ?up|ready|learn)|quick ?start|straight away|right away|\bimmediately\b|in no time|same[- ]day|\b(in|within) (just )?(under |less than )?(a|an|one|\d+) (minutes?|hours?|mins?|seconds?)\b/i,
  why: "no setup or import speed claims until measured",
};

// Channels BizzyBee doesn't support yet. Allowed only inside the marked
// "before BizzyBee" story, where they show the owner's problem.
export const channelBanned: Rule[] = [
  {
    pattern:
      /\bwhat\W{0,3}s\W{0,3}apps?\b|\bwa\.me\b|\bsms\b|\btexts\b|\btexting\b|\btext messages?\b|\bfacebook\b|\binsta(gram)?\b|\bmessenger\b|\bvoicemails?\b|\bphones?\b|\bgoogle reviews?\b|\bweb\s*chat\b|\blive chat\b/i,
    why: "only email works today",
  },
];

// The rendered-page check is stricter than the source check, because page
// text has no code comments to trip over: it also bans calls, social media,
// direct messages and the like.
export const renderedChannelBanned: Rule[] = [
  ...channelBanned,
  {
    pattern:
      /\b(phone )?calls?\b|\bcalling\b|\bcall us\b|\bsocial (media|dms?|messages?)\b|\bdirect messages?\b|\btik\s*tok\b|\btelegram\b|\bsignal app\b|\bwechat\b|\btwitter\b|\bx\.com\b/i,
    why: "only email works today",
  },
];

// Letters from other scripts that look like Latin ones.
const lookAlikes: Record<string, string> = {
  а: "a", в: "b", е: "e", к: "k", м: "m", н: "h", о: "o", р: "p", с: "c", т: "t", у: "y", х: "x",
  і: "i", ј: "j", ѕ: "s", ԁ: "d", һ: "h", ԛ: "q", ԝ: "w", ɡ: "g", ӏ: "l",
  А: "A", В: "B", Е: "E", К: "K", М: "M", Н: "H", О: "O", Р: "P", С: "C", Т: "T", У: "Y", Х: "X",
  І: "I", Ј: "J", Ѕ: "S", Ԁ: "D", Һ: "H", Ԛ: "Q", Ԝ: "W",
  α: "a", ο: "o", ρ: "p", ν: "v", τ: "t", υ: "u", ι: "i", κ: "k",
  Α: "A", Β: "B", Ε: "E", Η: "H", Ι: "I", Κ: "K", Μ: "M", Ν: "N", Ο: "O", Ρ: "P", Τ: "T", Χ: "X", Υ: "Y", Ζ: "Z",
};

// Folds full-width forms, look-alike letters, soft hyphens and zero-width
// characters, and collapses whitespace, so "２４／７", "Whаts\u00adApp" and
// "free\n trial" all read as plain text.
export const foldText = (text: string) =>
  text
    .normalize("NFKC")
    .replace(/[\u00ad\u200b-\u200f\u2060\ufeff]/g, "")
    .replace(/[\u0080-\uffff]/g, (c) => lookAlikes[c] ?? c)
    .replace(/\s+/g, " ");

// The only file allowed to name other channels, inside its marked
// before-story parts. A marker anywhere else is ignored.
export const BEFORE_STORY_FILE = "/src/components/GrowthTrapStory.tsx";

// Removes the marked before-story parts: blocks between
// `// before-story:start` and `// before-story:end`, and single lines ending
// in `// before-story`.
export const withoutBeforeStory = (text: string) =>
  text
    .replace(/\/\/ before-story:start[\s\S]*?\/\/ before-story:end/g, "")
    .split("\n")
    .filter((line) => !/\/\/ before-story\s*$/.test(line))
    .join("\n");

const entities: Record<string, string> = { nbsp: " ", amp: "&", lt: "<", gt: ">", quot: '"', apos: "'", shy: "" };

const decodeEntities = (text: string) =>
  text
    .replace(/&#x([0-9a-f]+);/gi, (_, hex) => String.fromCodePoint(parseInt(hex, 16)))
    .replace(/&#(\d+);/g, (_, dec) => String.fromCodePoint(parseInt(dec, 10)))
    .replace(/&([a-z]+);/gi, (m, name) => entities[name.toLowerCase()] ?? m);

// The text a reader would see, roughly: tags removed (so "free <strong>trial"
// and "24/<wbr />7" join up), string expressions inlined (What{"s"}App),
// other simple expressions dropped, and entities decoded.
export const visibleText = (text: string) =>
  decodeEntities(
    text
      .replace(/<[^<>]*>/g, "")
      .replace(/\{\s*(["'`])((?:(?!\1)[^\\]|\\.)*)\1\s*\}/g, "$2")
      .replace(/\{\s*[\w.]+\s*\}/g, ""),
  );

const normalise = foldText;

// Each rule is checked against both the raw source and its visible text, so a
// phrase split by markup or code is still caught.
const matches = (rule: Rule, text: string) =>
  rule.pattern.test(normalise(text)) || rule.pattern.test(normalise(visibleText(text)));

export const findBannedClaims = (text: string, file = ""): string[] => {
  const outsideStory = file === BEFORE_STORY_FILE ? withoutBeforeStory(text) : text;
  return [
    ...alwaysBanned.filter((r) => r.allowedOn?.file !== file && matches(r, text)),
    ...[...channelBanned, speedBanned].filter((r) => matches(r, outsideStory)),
  ].map((r) => r.why);
};

// For text taken from rendered pages: what visitors actually read. The
// before-story is already left out, so every rule applies.
export const findBannedInRendered = (text: string, route = ""): string[] => {
  const folded = foldText(text);
  return [...alwaysBanned, ...renderedChannelBanned, speedBanned]
    .filter((r) => r.allowedOn?.route !== route && r.pattern.test(folded))
    .map((r) => r.why);
};
