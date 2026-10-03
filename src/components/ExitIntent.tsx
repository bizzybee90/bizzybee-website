import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { X, ArrowRight } from "lucide-react";
import { MONEY_BACK_DAYS } from "@/lib/offer";

const ExitIntent = () => {
  const [show, setShow] = useState(false);

  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (e.clientY <= 5 && !sessionStorage.getItem("exitShown")) {
        setShow(true);
        sessionStorage.setItem("exitShown", "1");
      }
    };
    document.addEventListener("mouseleave", handler);
    return () => document.removeEventListener("mouseleave", handler);
  }, []);

  return (
    <AnimatePresence>
      {show && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-[100] flex items-center justify-center bg-foreground/60 backdrop-blur-sm p-6"
          onClick={() => setShow(false)}
        >
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.9, opacity: 0 }}
            transition={{ ease: [0.16, 1, 0.3, 1] }}
            className="relative bg-background rounded-2xl p-10 max-w-md w-full shadow-2xl text-center"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={() => setShow(false)}
              className="absolute top-4 right-4 text-muted-foreground hover:text-foreground"
            >
              <X size={20} />
            </button>
            <span className="text-4xl mb-4 block">🐝</span>
            <h3 className="text-2xl font-bold text-foreground mb-2" style={{ letterSpacing: "-0.015em" }}>
              Not sure yet? Test it on your real customers.
            </h3>
            <p className="text-muted-foreground mb-6 text-sm leading-relaxed">
              Use BizzyBee for {MONEY_BACK_DAYS} days. If it doesn't earn its place, email us and we'll refund your first payment in full.
            </p>
            <Link
              to="/pricing"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-lg text-sm font-medium shadow-md hover:shadow-lg transition-all"
              style={{ background: "hsl(35, 55%, 55%)", color: "white" }}
              onClick={() => setShow(false)}
            >
              See the two plans <ArrowRight size={16} />
            </Link>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default ExitIntent;
