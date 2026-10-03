// One place for everything the site promises about price, plans and sign-up.
// Every page reads from here so the offer can't drift between sections.
//
// DRAFT: not for publishing until the owner settles the open items below.
// While a value is null the page shows a visible "to be confirmed" marker
// instead of guessing.

export const APP_URL = "https://app.bizzybee.co.uk";

// Open owner decisions. Fill these in, and the markers disappear.
export const pending = {
  // Prices are shown excluding VAT.
  vatLabel: "+ VAT" as string | null, // Michael, 3 Oct 15:42 UTC: "Plus VAT"
  // Allowances (mailboxes, team members, AI drafts) shown on each plan.
  allowancesConfirmed: false,
};

export const MONEY_BACK_DAYS = 30;

export type PlanId = "inbox" | "ai_assistant";

export type Plan = {
  id: PlanId;
  name: string;
  price: number;
  founderPrice?: number;
  tagline: string;
  description: string;
  features: string[];
  // Proposed allowances; shown with a marker until pending.allowancesConfirmed.
  allowances: string[];
  popular: boolean;
};

export const FOUNDER_PLACES = 50;

export const plans: Plan[] = [
  {
    id: "inbox",
    name: "BizzyBee Inbox",
    price: 49,
    tagline: "Everything in one place",
    description:
      "One calm inbox for your business email, with each customer's past emails alongside. No AI, just you in control.",
    features: [
      "Connect your Gmail or Microsoft 365/Outlook mailbox",
      "Choose how much past email to bring in, or start fresh",
      "Reply, assign, snooze and archive from one place",
      "No AI reads or writes anything",
    ],
    allowances: [
      "1 connected mailbox",
      "Monthly allowance: up to 2,000 incoming emails",
      "Past email: up to 12 months or 10,000 emails per mailbox, whichever comes first, not counted towards your monthly allowance",
    ],
    popular: false,
  },
  {
    id: "ai_assistant",
    name: "BizzyBee AI Assistant",
    price: 149,
    founderPrice: 89,
    tagline: "Your replies, written for you",
    description:
      "The same inbox, plus an assistant that sorts every email and drafts the reply in your voice. You check it and press send.",
    features: [
      "Everything in BizzyBee Inbox",
      "Every email sorted: quotes, bookings, complaints, junk",
      "Draft replies in your voice, learned from the sent emails you bring in",
      "Uses the prices and details you give it in quote and booking replies",
      "Nothing is sent until you approve it",
    ],
    allowances: [
      "1 connected mailbox",
      "Monthly allowance: up to 2,000 incoming emails and 500 AI drafts",
      "Past email: up to 12 months or 10,000 emails per mailbox, whichever comes first, not counted towards your monthly allowance",
    ],
    popular: true,
  },
];

// Where each plan's button goes. The app makes you pay before you connect
// anything, so this is the start of checkout, not a free account.
export const signupUrl = (plan: PlanId) => `${APP_URL}/auth?mode=signup&plan=${plan}`;

export const formatPrice = (amount: number) => `£${amount}`;
