import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { MONEY_BACK_DAYS } from "@/lib/offer";

const capabilities = [
  { icon: "📥", label: "Inbox", value: "One", detail: "Every customer email and its history in one place" },
  { icon: "✋", label: "Sent without your OK", value: "Never", detail: "Every AI draft waits for you to approve it" },
  { icon: "🛡️", label: "Money-back promise", value: `${MONEY_BACK_DAYS} days`, detail: "Full refund of your first payment if it isn't for you" },
  { icon: "🔒", label: "Payments", value: "Stripe", detail: "Secure checkout. We never see your card details" },
];

const StatsBar = () => {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section
      ref={ref}
      className="py-14"
      style={{ background: "hsl(25, 30%, 14%)" }}
    >
      <div className="container mx-auto px-6">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-8">
          {capabilities.map((cap, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 12 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: i * 0.1, ease: [0.16, 1, 0.3, 1] }}
              className="text-center"
            >
              <span className="block text-lg mb-1">{cap.icon}</span>
              <span
                className="block font-bold"
                style={{ fontSize: "clamp(22px, 2.5vw, 30px)", color: "hsl(35, 55%, 55%)" }}
              >
                {cap.value}
              </span>
              <span
                className="block mt-1 uppercase"
                style={{ fontSize: 10, fontWeight: 700, letterSpacing: "0.15em", color: "hsl(40, 20%, 70%)" }}
              >
                {cap.label}
              </span>
              <span
                className="block mt-1 hidden md:block"
                style={{ fontSize: 11, color: "hsl(40, 20%, 50%)" }}
              >
                {cap.detail}
              </span>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default StatsBar;
