import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowRight } from "lucide-react";

const StickyCTA = () => {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const onScroll = () => setVisible(window.scrollY > 800);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          initial={{ y: 100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: 100, opacity: 0 }}
          transition={{ duration: 0.3 }}
          className="fixed bottom-6 left-1/2 -translate-x-1/2 z-40 md:hidden"
        >
          <Link
            to="/pricing"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-full text-sm font-medium shadow-lg animate-pulse-glow"
            style={{ background: "hsl(35, 55%, 55%)", color: "white" }}
          >
            Start Free Trial <ArrowRight size={16} />
          </Link>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default StickyCTA;
