import { useState } from "react";
import { motion } from "framer-motion";
import { AnimatedSection, AnimatedElement } from "@/lib/motion";
import { Check, ArrowRight, Sparkles } from "lucide-react";

const plans = [
  {
    name: "Starter",
    price: "£49",
    founderPrice: "£29",
    period: "/month",
    tagline: "Your smart inbox",
    description: "Connect your email and let AI sort the noise from what matters",
    features: [
      "Email connection + unified inbox",
      "AI classification & sorting",
      "Pre-triage rules engine",
      "Manual reply (no AI drafts)",
      "Email support",
    ],
    popular: false,
    cta: "Start Free Trial",
  },
  {
    name: "Growth",
    price: "£149",
    founderPrice: "£89",
    period: "/month",
    tagline: "Your AI assistant",
    description: "AI learns your voice, drafts replies, and handles the routine",
    features: [
      "Everything in Starter",
      "AI draft replies in your voice",
      "Voice learning from your sent emails",
      "Knowledge base + semantic FAQ search",
      "Google My Business integration",
      "Learn from your corrections",
      "Priority support",
    ],
    popular: true,
    cta: "Start Free Trial",
  },
  {
    name: "Pro",
    price: "£349",
    founderPrice: "£199",
    period: "/month",
    tagline: "Your AI handles every channel",
    description: "Every channel covered — WhatsApp, SMS, social, and phone",
    features: [
      "Everything in Growth",
      "WhatsApp AI (500 messages/mo)",
      "SMS AI (200 messages/mo)",
      "Facebook & Instagram DMs",
      "AI phone agent (60 minutes/mo)",
      "All channels bundled",
      "Dedicated onboarding",
    ],
    popular: false,
    cta: "Start Free Trial",
  },
];

const addons = [
  { name: "AI Phone Agent", price: "£99/mo", description: "ElevenLabs-powered voice AI" },
  { name: "WhatsApp Business AI", price: "£49/mo", description: "Automated WhatsApp replies" },
  { name: "SMS Auto-Response", price: "£29/mo", description: "AI-powered SMS handling" },
  { name: "Facebook & Instagram", price: "£39/mo", description: "Social DM automation" },
];

const PricingCards = ({ showFullPage = false }: { showFullPage?: boolean }) => {
  const [hoveredIdx, setHoveredIdx] = useState<number | null>(null);
  const [showFounder, setShowFounder] = useState(false);

  return (
    <AnimatedSection className={`py-24 md:py-32 ${showFullPage ? "pt-32" : ""}`} style={{ background: "hsl(40, 30%, 99%)" }}>
      <div className="container mx-auto px-6">
        <AnimatedElement className="text-center mb-16">
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
            Less than what one missed quote costs you.
          </h2>
          <p style={{ color: "hsl(220, 9%, 50%)", maxWidth: 460, margin: "0 auto" }}>
            14-day free trial on Growth. No contracts. Cancel any time.
          </p>

          {/* Founder pricing toggle */}
          <button
            onClick={() => setShowFounder(!showFounder)}
            className="mt-6 inline-flex items-center gap-2 transition-all"
            style={{
              background: showFounder ? "hsl(35, 55%, 55%)" : "transparent",
              color: showFounder ? "white" : "hsl(35, 55%, 55%)",
              border: `1px solid hsl(35, 55%, 55%)`,
              borderRadius: 20,
              padding: "8px 20px",
              fontSize: 13,
              fontWeight: 600,
            }}
          >
            <Sparkles size={14} />
            {showFounder ? "Showing Founder Pricing" : "Are you one of our first 50 customers?"}
          </button>
        </AnimatedElement>

        <div className="grid md:grid-cols-3 gap-6 max-w-5xl mx-auto">
          {plans.map((plan, i) => {
            const displayPrice = showFounder ? plan.founderPrice : plan.price;
            return (
              <AnimatedElement key={i} variant="scaleIn">
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
                      Most Popular
                    </span>
                  )}

                  <p
                    className="uppercase mb-1"
                    style={{ fontSize: 11, fontWeight: 700, letterSpacing: "0.1em", color: "hsl(35, 50%, 45%)" }}
                  >
                    {plan.tagline}
                  </p>
                  <h3 className="font-bold" style={{ fontSize: 18, color: "hsl(220, 9%, 15%)" }}>{plan.name}</h3>
                  <div className="mt-3 mb-1 flex items-baseline gap-2">
                    <span className="font-bold" style={{ fontSize: 36, color: "hsl(220, 9%, 15%)", letterSpacing: "-0.02em" }}>
                      {displayPrice}
                    </span>
                    <span style={{ fontSize: 13, color: "hsl(220, 9%, 50%)" }}>{plan.period}</span>
                    {showFounder && (
                      <span style={{ fontSize: 13, color: "hsl(220, 9%, 60%)", textDecoration: "line-through" }}>
                        {plan.price}
                      </span>
                    )}
                  </div>
                  {showFounder && (
                    <p style={{ fontSize: 11, color: "hsl(35, 55%, 55%)", fontWeight: 600, marginBottom: 4 }}>
                      Founder price — locked forever
                    </p>
                  )}
                  <p className="mb-5" style={{ fontSize: 13, color: "hsl(220, 9%, 50%)", lineHeight: 1.5 }}>
                    {plan.description}
                  </p>

                  <ul className="space-y-2.5 mb-6 flex-1">
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

                  <a
                    href="#pricing"
                    className="inline-flex items-center justify-center gap-2 font-medium transition-all"
                    style={{
                      background: plan.popular ? "hsl(35, 55%, 55%)" : "transparent",
                      color: plan.popular ? "white" : "hsl(220, 9%, 30%)",
                      border: plan.popular ? "none" : "1px solid #e5e7eb",
                      borderRadius: 10,
                      padding: "12px 24px",
                      fontSize: 13,
                      width: "100%",
                    }}
                  >
                    {plan.cta} <ArrowRight size={14} />
                  </a>
                </div>
              </AnimatedElement>
            );
          })}
        </div>

        {/* Add-ons section */}
        <AnimatedElement className="mt-16 max-w-5xl mx-auto">
          <h3
            className="text-center font-bold mb-8"
            style={{ fontSize: 20, color: "hsl(220, 9%, 15%)" }}
          >
            Add-ons <span style={{ fontWeight: 400, color: "hsl(220, 9%, 50%)", fontSize: 14 }}>Available on Growth & Pro</span>
          </h3>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {addons.map((addon, i) => (
              <div
                key={i}
                style={{
                  background: "white",
                  border: "1px solid #e5e7eb",
                  borderRadius: 12,
                  padding: "16px 20px",
                }}
              >
                <p className="font-semibold" style={{ fontSize: 14, color: "hsl(220, 9%, 15%)" }}>{addon.name}</p>
                <p className="font-bold mt-1" style={{ fontSize: 18, color: "hsl(35, 55%, 55%)" }}>{addon.price}</p>
                <p style={{ fontSize: 12, color: "hsl(220, 9%, 50%)", marginTop: 4 }}>{addon.description}</p>
              </div>
            ))}
          </div>
          <p className="text-center mt-4" style={{ fontSize: 12, color: "hsl(220, 9%, 50%)" }}>
            Paying for 2+ add-ons? Upgrade to Pro and get everything included.
          </p>
        </AnimatedElement>
      </div>
    </AnimatedSection>
  );
};

export default PricingCards;
