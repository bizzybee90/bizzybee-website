import { useState, useEffect, useCallback, useRef } from "react";
import { AnimatedSection, AnimatedElement } from "@/lib/motion";
import { CreditCard, Cpu, Rocket } from "lucide-react";
import { MONEY_BACK_DAYS } from "@/lib/offer";
import { motion, AnimatePresence } from "framer-motion";

const steps = [
  {
    icon: <CreditCard className="w-5 h-5" />,
    step: "01",
    title: "Pay and connect",
    description: (
      <>
        Choose your plan and pay securely through Stripe.
        <br /><br />
        Then connect your Gmail, Outlook or other mailbox in a few clicks. Your past emails come in, so every customer's history is there from day one.
        <br /><br />
        <span style={{ fontWeight: 600, color: "hsl(220, 9%, 15%)" }}>Not for you? Ask within {MONEY_BACK_DAYS} days for a full refund of your first payment.</span>
      </>
    ),
  },
  {
    icon: <Cpu className="w-5 h-5" />,
    step: "02",
    title: "Learn your business",
    description: (
      <>
        On the AI Assistant plan, BizzyBee reads the emails you've sent to learn how you write: your tone, your phrasing, your sign-off.
        <br /><br />
        It reads your website for your services, prices and the areas you cover, and you can add or correct anything in plain English.
        <br /><br />
        <span style={{ fontWeight: 600, color: "hsl(220, 9%, 15%)" }}>It doesn't guess your voice. It learns it.</span>
      </>
    ),
  },
  {
    icon: <Rocket className="w-5 h-5" />,
    step: "03",
    title: "Reply with confidence",
    description: (
      <>
        Now BizzyBee knows:
        <br />
        <span className="inline-block mt-1 ml-1">• How you write</span>
        <br />
        <span className="inline-block ml-1">• What you charge</span>
        <br />
        <span className="inline-block ml-1">• Where you work</span>
        <br /><br />
        When an email comes in, it drafts a reply that sounds like you wrote it.
        <br /><br />
        <span style={{ fontWeight: 600, color: "hsl(220, 9%, 15%)" }}>You review. You send. You move on.</span>
      </>
    ),
  },
];

const HowItWorks = () => {
  const [active, setActive] = useState(0);
  const [paused, setPaused] = useState(false);
  const timerRef = useRef<ReturnType<typeof setInterval>>();

  const advance = useCallback(() => {
    setActive((prev) => (prev + 1) % steps.length);
  }, []);

  useEffect(() => {
    if (paused) return;
    timerRef.current = setInterval(advance, 5000);
    return () => clearInterval(timerRef.current);
  }, [paused, advance]);

  const handleClick = (i: number) => {
    setActive(i);
    setPaused(true);
    setTimeout(() => setPaused(false), 10000);
  };

  return (
    <AnimatedSection id="features" className="py-24 md:py-32" style={{ background: "hsl(40, 30%, 99%)" }}>
      <div className="container mx-auto px-6">
        <AnimatedElement className="text-center mb-12">
          <span
            className="inline-block mb-4 uppercase"
            style={{ fontSize: 11, fontWeight: 700, letterSpacing: "0.2em", color: "hsl(35, 50%, 45%)" }}
          >
            How it works
          </span>
          <h2
            className="text-3xl md:text-4xl font-bold"
            style={{ color: "hsl(220, 9%, 15%)", letterSpacing: "-0.02em" }}
          >
            From payment to your first draft
          </h2>
        </AnimatedElement>

        <div
          className="max-w-2xl mx-auto"
          onMouseEnter={() => setPaused(true)}
          onMouseLeave={() => setPaused(false)}
        >
          {/* Stepper row */}
          <div className="flex items-center justify-center mb-8">
            {steps.map((step, i) => (
              <div key={i} className="flex items-center flex-1 last:flex-none">
                <button
                  onClick={() => handleClick(i)}
                  className="flex items-center gap-2.5 px-4 py-2.5 rounded-full transition-all duration-300 shrink-0 cursor-pointer"
                  style={{
                    background: active === i ? "hsl(35, 55%, 55%)" : "white",
                    color: active === i ? "white" : "hsl(220, 9%, 45%)",
                    border: active === i ? "1px solid transparent" : "1px solid #e5e7eb",
                    boxShadow: active === i ? "0 2px 8px rgba(213,149,67,0.2)" : "none",
                  }}
                >
                  {step.icon}
                  <span className="text-sm font-semibold whitespace-nowrap hidden sm:inline">{step.title}</span>
                  <span className="text-sm font-semibold sm:hidden">{step.step}</span>
                </button>
                {i < steps.length - 1 && (
                  <div className="flex-1 mx-2">
                    <div
                      className="h-px w-full transition-colors duration-300"
                      style={{ background: i < active ? "hsl(35, 55%, 55%)" : "#e5e7eb" }}
                    />
                  </div>
                )}
              </div>
            ))}
          </div>

          {/* Content area */}
          <div
            className="relative min-h-[340px] md:min-h-[300px]"
            style={{ background: "white", border: "1px solid #e5e7eb", borderRadius: 14, boxShadow: "0 1px 3px rgba(0,0,0,0.03)" }}
          >
            <AnimatePresence mode="wait">
              <motion.div
                key={active}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.25 }}
                className="absolute inset-0 p-6 md:p-8 flex items-center justify-center text-center"
              >
                <p style={{ fontSize: 14, lineHeight: 1.75, color: "hsl(220, 9%, 45%)", maxWidth: 480 }}>
                  {steps[active].description}
                </p>
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
      </div>
    </AnimatedSection>
  );
};

export default HowItWorks;
