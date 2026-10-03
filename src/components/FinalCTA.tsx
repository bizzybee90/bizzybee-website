import { useState } from "react";
import { Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { AnimatedSection, AnimatedElement } from "@/lib/motion";
import { ArrowRight } from "lucide-react";
import { MONEY_BACK_DAYS } from "@/lib/offer";

const FinalCTA = () => {
  const [clicked, setClicked] = useState(false);
  const [hovered, setHovered] = useState(false);

  return (
    <AnimatedSection className="py-24 md:py-32 relative overflow-hidden" style={{ background: "hsl(40, 30%, 99%)" }}>
      <div
        className="absolute inset-0 pointer-events-none"
        style={{ background: "radial-gradient(ellipse at center, rgba(213,149,67,0.06) 0%, transparent 70%)" }}
      />

      <div className="container mx-auto px-6 relative z-10">
        <AnimatedElement className="max-w-2xl mx-auto text-center">
          <div className="relative inline-block mb-6">
            <span className="text-5xl block">🐝</span>
            <AnimatePresence>
              {hovered && !clicked && (
                <motion.div
                  initial={{ scale: 0.8, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  exit={{ scale: 0.8, opacity: 0 }}
                  transition={{ type: "spring", stiffness: 140, damping: 14 }}
                  className="absolute -inset-3 rounded-full pointer-events-none"
                  style={{ boxShadow: "0 0 20px rgba(213,149,67,0.25)" }}
                />
              )}
            </AnimatePresence>

            <AnimatePresence>
              {clicked && Array.from({ length: 6 }).map((_, i) => (
                <motion.span
                  key={i}
                  initial={{ x: 0, y: 0, opacity: 1, scale: 1 }}
                  animate={{
                    x: (Math.random() - 0.5) * 120,
                    y: -(Math.random() * 80 + 20),
                    opacity: 0, scale: 0.3,
                  }}
                  transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
                  className="absolute top-1/2 left-1/2 text-xs pointer-events-none"
                  style={{ color: "hsl(35, 55%, 55%)" }}
                >
                  ✦
                </motion.span>
              ))}
            </AnimatePresence>
          </div>

          <h2
            className="text-3xl md:text-5xl font-bold mb-4 leading-tight"
            style={{ color: "hsl(220, 9%, 15%)", letterSpacing: "-0.02em" }}
          >
            Let BizzyBee give you your buzz back.
          </h2>
          <p className="mb-10" style={{ fontSize: 18, lineHeight: 1.7, color: "hsl(220, 9%, 45%)" }}>
            Your evenings aren't a luxury. They're the whole point.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link
              to="/pricing"
              className="inline-flex items-center gap-2 font-medium transition-all hover:scale-[1.02] active:scale-[0.98]"
              style={{
                background: "hsl(35, 55%, 55%)",
                color: "white",
                padding: "14px 32px",
                borderRadius: 12,
                fontSize: 15,
                boxShadow: "0 2px 12px rgba(213,149,67,0.2)",
              }}
              onMouseEnter={() => setHovered(true)}
              onMouseLeave={() => setHovered(false)}
              onClick={() => setClicked(true)}
            >
              Choose your plan <ArrowRight size={16} />
            </Link>
            <Link
              to="/contact"
              className="inline-flex items-center gap-2 font-medium transition-all"
              style={{
                color: "hsl(220, 9%, 30%)",
                border: "1px solid #e5e7eb",
                padding: "14px 32px",
                borderRadius: 12,
                fontSize: 15,
              }}
            >
              Talk to us
            </Link>
          </div>

          <p className="mt-6" style={{ fontSize: 12, color: "hsl(220, 9%, 55%)" }}>
            {MONEY_BACK_DAYS}-day money-back promise. No contracts. Cancel any time.
          </p>
        </AnimatedElement>
      </div>
    </AnimatedSection>
  );
};

export default FinalCTA;
