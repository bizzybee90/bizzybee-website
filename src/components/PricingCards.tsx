import { useState } from "react";
import { AnimatedSection, AnimatedElement } from "@/lib/motion";
import { Check, ArrowRight, ShieldCheck, CreditCard, Mail, Inbox } from "lucide-react";
import {
  plans,
  pending,
  signupUrl,
  formatPrice,
  MONEY_BACK_DAYS,
  FOUNDER_PLACES,
} from "@/lib/offer";
import PendingMarker from "@/components/PendingMarker";

const VatLabel = () =>
  pending.vatLabel ? (
    <span style={{ fontSize: 13, color: "hsl(220, 9%, 50%)" }}>{pending.vatLabel}</span>
  ) : (
    <PendingMarker>VAT wording to be confirmed</PendingMarker>
  );

const steps = [
  {
    icon: <CreditCard className="w-4 h-4" />,
    title: "Choose your plan and pay",
    text: "Secure checkout through Stripe.",
  },
  {
    icon: <Mail className="w-4 h-4" />,
    title: "Connect your email",
    text: "Gmail or Microsoft 365/Outlook, in a few clicks.",
  },
  {
    icon: <Inbox className="w-4 h-4" />,
    title: "Bring in your history",
    text: "Choose how much past email to bring in, or start fresh. You can use your inbox while it comes in.",
  },
];

const PricingCards = ({ showFullPage = false }: { showFullPage?: boolean }) => {
  const [hoveredIdx, setHoveredIdx] = useState<number | null>(null);

  return (
    <AnimatedSection
      id="pricing"
      className={`py-24 md:py-32 ${showFullPage ? "pt-32" : ""}`}
      style={{ background: "hsl(40, 30%, 99%)" }}
    >
      <div className="container mx-auto px-6">
        <AnimatedElement className="text-center mb-12">
          <span
            className="inline-block mb-4 uppercase"
            style={{ fontSize: 11, fontWeight: 700, letterSpacing: "0.2em", color: "hsl(35, 50%, 45%)" }}
          >
            Pricing
          </span>
          <h2
            className="text-3xl md:text-4xl font-bold mb-4"
            style={{ color: "hsl(220, 9%, 15%)", letterSpacing: "-0.02em" }}
          >
            Less than one missed job a month.
          </h2>
          <p style={{ color: "hsl(220, 9%, 45%)", maxWidth: 520, margin: "0 auto", fontSize: 16, lineHeight: 1.6 }}>
            Two plans, no contracts. Start today and judge it on your own customers. If it isn't for you,
            ask within {MONEY_BACK_DAYS} days and we'll refund your first payment in full.
          </p>
        </AnimatedElement>

        <div className="grid md:grid-cols-2 gap-6 max-w-4xl mx-auto">
          {plans.map((plan, i) => (
            <AnimatedElement key={plan.id} variant="scaleIn">
              <div
                className="relative h-full flex flex-col"
                style={{
                  background: "white",
                  border: `1px solid ${plan.popular ? "hsl(35, 55%, 55%)" : "#e5e7eb"}`,
                  borderRadius: 16,
                  padding: "32px 28px",
                  boxShadow: plan.popular
                    ? "0 4px 24px rgba(213,149,67,0.12)"
                    : hoveredIdx === i
                      ? "0 2px 12px rgba(0,0,0,0.06)"
                      : "0 1px 3px rgba(0,0,0,0.03)",
                  transition: "box-shadow 0.3s ease, border-color 0.3s ease",
                }}
                onMouseEnter={() => setHoveredIdx(i)}
                onMouseLeave={() => setHoveredIdx(null)}
              >
                {plan.popular && (
                  <span
                    className="absolute -top-3 left-1/2 -translate-x-1/2 whitespace-nowrap"
                    style={{
                      background: "hsl(35, 55%, 55%)",
                      color: "white",
                      fontSize: 10,
                      fontWeight: 700,
                      padding: "4px 14px",
                      borderRadius: 20,
                      letterSpacing: "0.05em",
                      textTransform: "uppercase",
                    }}
                  >
                    Saves the most time
                  </span>
                )}

                <p
                  className="uppercase mb-1"
                  style={{ fontSize: 11, fontWeight: 700, letterSpacing: "0.1em", color: "hsl(35, 50%, 45%)" }}
                >
                  {plan.tagline}
                </p>
                <h3 className="font-bold" style={{ fontSize: 20, color: "hsl(220, 9%, 15%)" }}>{plan.name}</h3>

                <div className="mt-3 mb-1 flex items-baseline gap-2 flex-wrap">
                  <span
                    className="font-bold"
                    style={{ fontSize: 40, color: "hsl(220, 9%, 15%)", letterSpacing: "-0.02em" }}
                  >
                    {formatPrice(plan.price)}
                  </span>
                  <span style={{ fontSize: 13, color: "hsl(220, 9%, 50%)" }}>a month</span>
                  <VatLabel />
                </div>

                {plan.founderPrice && (
                  <div
                    className="mt-2 mb-2"
                    style={{
                      background: "rgba(213,149,67,0.08)",
                      border: "1px solid rgba(213,149,67,0.2)",
                      borderRadius: 10,
                      padding: "10px 12px",
                    }}
                  >
                    <p style={{ fontSize: 13, fontWeight: 700, color: "hsl(35, 55%, 40%)" }}>
                      Founder price: {formatPrice(plan.founderPrice)} a month{pending.vatLabel ? ` ${pending.vatLabel}` : ""}
                    </p>
                    <p style={{ fontSize: 12, color: "hsl(220, 9%, 40%)", lineHeight: 1.5, marginTop: 2 }}>
                      For our first {FOUNDER_PLACES} AI Assistant customers. You keep it for as long as you stay
                      subscribed to this plan. It doesn't apply to add-ons we launch later.
                    </p>
                  </div>
                )}

                <p className="mb-5 mt-2" style={{ fontSize: 14, color: "hsl(220, 9%, 40%)", lineHeight: 1.55 }}>
                  {plan.description}
                </p>

                <ul className="space-y-2.5 mb-5 flex-1">
                  {plan.features.map((f, j) => (
                    <li key={j} className="flex items-start gap-2" style={{ fontSize: 13, color: "hsl(220, 9%, 30%)" }}>
                      <Check
                        className="shrink-0 mt-0.5"
                        style={{ width: 14, height: 14, color: "hsl(35, 55%, 55%)" }}
                      />
                      {f}
                    </li>
                  ))}
                </ul>

                <div className="mb-6" style={{ fontSize: 12, color: "hsl(220, 9%, 45%)", lineHeight: 1.6 }}>
                  {plan.allowances.join(" · ")}
                  {!pending.allowancesConfirmed && (
                    <>
                      {" "}
                      <PendingMarker>Allowances to be confirmed</PendingMarker>
                    </>
                  )}
                </div>

                <a
                  href={signupUrl(plan.id)}
                  className="inline-flex items-center justify-center gap-2 font-medium transition-all hover:scale-[1.01] active:scale-[0.99]"
                  style={{
                    background: plan.popular ? "hsl(35, 55%, 55%)" : "hsl(220, 9%, 15%)",
                    color: "white",
                    borderRadius: 10,
                    padding: "14px 24px",
                    fontSize: 14,
                    width: "100%",
                  }}
                >
                  Start with {plan.name.replace("BizzyBee ", "")} <ArrowRight size={14} />
                </a>
                <p className="text-center mt-2" style={{ fontSize: 11, color: "hsl(220, 9%, 50%)" }}>
                  {MONEY_BACK_DAYS}-day money-back promise · Cancel any time
                </p>
              </div>
            </AnimatedElement>
          ))}
        </div>

        {/* Pay-first, explained: what happens after the button */}
        <AnimatedElement className="mt-14 max-w-4xl mx-auto">
          <h3 className="text-center font-bold mb-6" style={{ fontSize: 18, color: "hsl(220, 9%, 15%)" }}>
            What happens when you start
          </h3>
          <div className="grid md:grid-cols-3 gap-4">
            {steps.map((s, i) => (
              <div
                key={i}
                style={{ background: "white", border: "1px solid #e5e7eb", borderRadius: 12, padding: "16px 20px" }}
              >
                <div className="flex items-center gap-2 mb-1" style={{ color: "hsl(35, 55%, 45%)" }}>
                  {s.icon}
                  <span style={{ fontSize: 11, fontWeight: 700, letterSpacing: "0.1em" }}>STEP {i + 1}</span>
                </div>
                <p className="font-semibold" style={{ fontSize: 14, color: "hsl(220, 9%, 15%)" }}>{s.title}</p>
                <p style={{ fontSize: 12, color: "hsl(220, 9%, 45%)", marginTop: 4, lineHeight: 1.5 }}>{s.text}</p>
              </div>
            ))}
          </div>
        </AnimatedElement>

        {/* Risk reversal */}
        <AnimatedElement className="mt-10 max-w-2xl mx-auto">
          <div
            className="flex items-start gap-4"
            style={{
              background: "white",
              border: "1px solid hsl(35, 55%, 75%)",
              borderRadius: 14,
              padding: "20px 24px",
            }}
          >
            <ShieldCheck className="shrink-0" style={{ width: 28, height: 28, color: "hsl(35, 55%, 50%)" }} />
            <div>
              <p className="font-bold" style={{ fontSize: 15, color: "hsl(220, 9%, 15%)" }}>
                The {MONEY_BACK_DAYS}-day money-back promise
              </p>
              <p style={{ fontSize: 13, color: "hsl(220, 9%, 40%)", lineHeight: 1.6, marginTop: 4 }}>
                Use BizzyBee on your real customers for a month. If it doesn't earn its place, email us within{" "}
                {MONEY_BACK_DAYS} days of paying and we'll refund your first payment in full.
              </p>
            </div>
          </div>
        </AnimatedElement>
      </div>
    </AnimatedSection>
  );
};

export default PricingCards;
