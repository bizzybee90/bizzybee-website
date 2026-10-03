import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { AnimatedSection, AnimatedElement } from "@/lib/motion";
import { ChevronDown } from "lucide-react";
import { MONEY_BACK_DAYS, FOUNDER_PLACES } from "@/lib/offer";

const faqs = [
  {
    q: "What's the difference between the two plans?",
    a: "BizzyBee Inbox puts all your business email and each customer's history in one place, with no AI at all. BizzyBee AI Assistant is the same inbox, plus an assistant that sorts every email and drafts the reply in your voice for you to check and send.",
  },
  {
    q: "Why do I pay before connecting my email?",
    a: `Your customers' emails only ever come into a paid, set-up account. It also means you're using the real thing, not a cut-down trial. If it isn't right for you, ask within ${MONEY_BACK_DAYS} days and we'll refund your first payment in full.`,
  },
  {
    q: "How does the money-back promise work?",
    a: `Email us within ${MONEY_BACK_DAYS} days of your first payment and we'll refund it in full. It applies to both plans.`,
  },
  {
    q: "Which email accounts work with BizzyBee?",
    a: "Gmail and Google Workspace, and Microsoft 365 and Outlook. BizzyBee works with email today, and we'll tell you as soon as more mailboxes and channels are ready.",
  },
  {
    q: "Will the AI send anything without me?",
    a: "No. On the AI Assistant plan every reply is a draft until you approve it. You can edit it, send it or bin it. On the Inbox plan, no AI reads or writes anything.",
  },
  {
    q: "Will the drafts sound like me?",
    a: "The AI Assistant learns your tone, phrases and sign-off from the sent emails you bring in. Early drafts may need more editing while it's still learning, and you can change any draft before it goes.",
  },
  {
    q: "How does the founder price work?",
    a: `The first ${FOUNDER_PLACES} AI Assistant customers pay £89 a month + VAT instead of £149, for as long as they stay subscribed to that plan. If you cancel or move to Inbox, the founder price ends. It doesn't cover add-ons we launch later.`,
  },
  {
    q: "Is VAT included?",
    a: "Prices are shown excluding VAT. VAT is added at checkout and shown on your invoice.",
  },
  {
    q: "Can I change plans or cancel?",
    a: "Yes. There's no contract. You can move between plans without losing any customer history, and you can cancel at any time.",
  },
  {
    q: "Is my data safe?",
    a: "Your emails are encrypted in transit and at rest, used only to run BizzyBee for you, and never sold. Card payments are handled by Stripe, so we never see your card details.",
  },
];

const FAQ = () => {
  const [open, setOpen] = useState<number | null>(null);

  return (
    <AnimatedSection className="py-24 md:py-32" style={{ background: "hsl(40, 20%, 98%)" }}>
      <div className="container mx-auto px-6">
        <AnimatedElement className="text-center mb-14">
          <span
            className="inline-block mb-4 uppercase"
            style={{ fontSize: 11, fontWeight: 700, letterSpacing: "0.2em", color: "hsl(35, 50%, 45%)" }}
          >
            FAQ
          </span>
          <h2
            className="text-3xl md:text-4xl font-bold"
            style={{ color: "hsl(220, 9%, 15%)", letterSpacing: "-0.02em" }}
          >
            Frequently asked questions
          </h2>
        </AnimatedElement>

        <div className="max-w-2xl mx-auto space-y-3">
          {faqs.map((faq, i) => (
            <AnimatedElement key={i}>
              <div
                style={{
                  background: "white",
                  border: "1px solid #e5e7eb",
                  borderRadius: 12,
                  overflow: "hidden",
                  transition: "border-color 0.3s ease",
                  borderColor: open === i ? "hsl(35, 55%, 55%)" : "#e5e7eb",
                }}
              >
                <button
                  onClick={() => setOpen(open === i ? null : i)}
                  className="w-full flex items-center justify-between p-5 text-left"
                >
                  <span className="pr-4 font-medium" style={{ fontSize: 14, color: "hsl(220, 9%, 15%)" }}>
                    {faq.q}
                  </span>
                  <ChevronDown
                    className="shrink-0 transition-transform"
                    style={{
                      width: 18, height: 18,
                      color: "hsl(220, 9%, 55%)",
                      transform: open === i ? "rotate(180deg)" : "rotate(0)",
                    }}
                  />
                </button>
                <AnimatePresence>
                  {open === i && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.2 }}
                      className="overflow-hidden"
                    >
                      <p className="px-5 pb-5" style={{ fontSize: 13, lineHeight: 1.7, color: "hsl(220, 9%, 45%)" }}>
                        {faq.a}
                      </p>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </AnimatedElement>
          ))}
        </div>

        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "FAQPage",
              mainEntity: faqs.map((f) => ({
                "@type": "Question",
                name: f.q,
                acceptedAnswer: { "@type": "Answer", text: f.a },
              })),
            }),
          }}
        />
      </div>
    </AnimatedSection>
  );
};

export default FAQ;
