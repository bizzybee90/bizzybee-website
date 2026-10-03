import { motion, AnimatePresence } from "framer-motion";
import { useRef, useState, useEffect, useCallback } from "react";
import { useIsMobile } from "@/hooks/use-mobile";

// ─── Message cards (the raw inbox) ───
// These show the owner's life *before* BizzyBee, across every channel they
// juggle today. They are the problem, not a list of what BizzyBee handles.
// before-story:start
const MESSAGE_CARDS = [
  { id: 1, type: "email", from: "Sarah Mitchell", subject: "Quote for 3-bed clean?", preview: "Hi, wondering if you could give me a quote for a 3-bed semi in Luton...", time: "10:32 AM", channel: "Email", urgent: false, unread: true },
  { id: 2, type: "whatsapp", from: "Jim Henderson", subject: "Emergency leak", preview: "Got a leak under the kitchen sink, any chance you can come today?", time: "11:15 AM", channel: "WhatsApp", urgent: true, unread: true },
  { id: 11, type: "email", from: "Google Reviews", subject: "New 5-star review", preview: "★★★★★ Brilliant service, came same day and fixed it perfectly. Highly recommend!", time: "11:45 AM", channel: "Review", urgent: false, unread: true },
  { id: 3, type: "sms", from: "07734 882991", subject: "Booking change", preview: "Need to move Thursday to Friday if poss", time: "9:48 AM", channel: "SMS", urgent: false, unread: true },
  { id: 4, type: "email", from: "Tom Baker", subject: "Re: Re: Re: Quote", preview: "Sorry to chase again but did you get my email about the...", time: "Yesterday", channel: "Email", urgent: false, unread: true },
  { id: 5, type: "whatsapp", from: "Karen Price", subject: "Not happy", preview: "I've been waiting 3 days for a reply. This isn't good enough.", time: "2 days ago", channel: "WhatsApp", urgent: true, unread: true },
  { id: 6, type: "call", from: "Missed Call", subject: "Unknown Number", preview: "Voicemail: Hi, I got your number from Google, wondering if you could...", time: "Yesterday", channel: "Phone", urgent: false, unread: true },
  { id: 7, type: "facebook", from: "Dave's Plumbing FB", subject: "New message", preview: "Hi do you cover the MK area? Need a plumber ASAP", time: "3 days ago", channel: "Facebook", urgent: false, unread: true },
  { id: 8, type: "email", from: "Google Reviews", subject: "New 1-star review", preview: "★☆☆☆☆ Called twice, never got back to me. Went with someone else.", time: "Yesterday", channel: "Review", urgent: true, unread: true },
  { id: 9, type: "whatsapp", from: "Lisa Chen", subject: "Photo attached", preview: "Here's the photo of the tap I mentioned — can you fix this type?", time: "Monday", channel: "WhatsApp", urgent: false, unread: true },
  { id: 10, type: "email", from: "NO REPLY", subject: "Special offer!!!", preview: "UNBEATABLE DEALS ON PLUMBING SUPPLIES — CLICK NOW", time: "Today", channel: "Spam", urgent: false, unread: false },
];
// before-story:end

// ─── BizzyBee organised inbox ───
const ORGANISED_CARDS = [
  { id: 1, label: "Quote", summary: "Sarah wants a quote for a 3-bed in Luton. Asked twice, seems frustrated.", status: "Draft reply ready", color: "#FF3B30" },
  { id: 4, label: "Follow-up", summary: "Tom is chasing his quote for the third time.", status: "Draft reply ready", color: "#FF9500" },
  { id: 12, label: "Complaint", summary: "Customer unhappy with a missed visit. Needs you today.", status: "Apology drafted", color: "#FF3B30" },
  { id: 13, label: "Booking", summary: "Asks to move Thursday's visit to Friday.", status: "Draft reply ready", color: "#eab308" },
  { id: 14, label: "Enquiry", summary: "Do you cover the MK area?", status: "Draft reply ready", color: "#6b7280" },
  { id: 10, label: "Junk", summary: "Supplier spam moved out of the way.", status: "Filed as junk", color: "#d1d5db" },
];

// ─── Exact approved copy ───
const STAGES = [
  {
    label: "The Beginning",
    description: "You started this business and it was your baby. Just you, doing great work. You picked up the phone every time. You replied to every email that evening. You gave quotes the same day. Customers chose you because the last company they called never got back to them — but you did. You were the one with the great reviews. The one people recommended.", // before-story
    closingLine: "",
  },
  {
    label: "The Growth",
    description: "Word spread. More customers came. More calls, more emails, more WhatsApps. You got busier and busier. That was the dream, right?", // before-story
    closingLine: "",
  },
  {
    label: "The Tipping Point",
    description: "Except now you're so busy doing the work that you can't keep up with the messages. Quote requests sit for two days. Missed calls go unreturned. That email from a new customer on Monday? You didn't see it until Thursday. By then, they'd booked someone else.",
    closingLine: "",
  },
  {
    label: "The Reversal",
    description: "You've become the company you replaced. The one customers couldn't get hold of. The one with the slow replies. A customer isn't happy with a job — they message you, but you're too buried in other work to get back to them. One bad review turns into two. The business that was your baby starts to feel like a trap.",
    closingLine: "",
  },
  {
    label: "The Way Out",
    description: "BizzyBee exists because this story shouldn't have to end that way. It gives you back the thing you lost when you got busy: time. Not by doing the work for you, but by handling everything around it: the emails, the quotes, the follow-ups. Every customer in one inbox, every reply drafted in your voice, ready for you to send.",
    closingLine: "You keep doing the work you love. BizzyBee keeps your customer emails from getting buried.",
  },
];

// before-story:start
const CHANNEL_ICONS: Record<string, string> = {
  email: "✉️", whatsapp: "💬", sms: "📱", call: "📞", facebook: "👤",
};
// before-story:end

// ─── Card chaos positions per visual stage ───
const getCardTransform = (visualStage: number, i: number) => {
  if (visualStage <= 0)
    return { x: 0, y: i * 72, rotate: 0, scale: i < 3 ? 1 : 0, opacity: i < 3 ? (visualStage === -1 ? 0.4 : 1) : 0 };
  switch (visualStage) {
    case 1:
      return { x: 0, y: i * 64, rotate: 0, scale: i < 7 ? 1 : 0, opacity: i < 7 ? (i < 5 ? 1 : 0.7) : 0 };
    case 2:
      return { x: (i % 2 === 0 ? -1 : 1) * (6 + i * 3), y: i * 48 - (i > 5 ? 35 : 0), rotate: (i % 2 === 0 ? -1 : 1) * (1.5 + i * 0.7), scale: 1, opacity: 1 };
    case 3:
      return { x: Math.sin(i * 1.8) * 24, y: i * 40 - 15 + Math.cos(i * 2.1) * 12, rotate: Math.sin(i * 1.3) * 5, scale: 0.96, opacity: 1 };
    default:
      return { x: 0, y: i * 58, rotate: 0, scale: 1, opacity: 1 };
  }
};

const TYPO_STYLES = [
  { lineHeight: 1.85, letterSpacing: "0.01em", fontWeight: 400 },
  { lineHeight: 1.75, letterSpacing: "0.005em", fontWeight: 400 },
  { lineHeight: 1.55, letterSpacing: "-0.005em", fontWeight: 450 },
  { lineHeight: 1.35, letterSpacing: "-0.01em", fontWeight: 500 },
  { lineHeight: 1.85, letterSpacing: "0.01em", fontWeight: 400 },
];

const BG_COLORS: Record<number, string> = {
  [-1]: "#FFFDF9", 0: "#FFFDF9", 1: "#FAF7F0", 2: "#2A1A0E", 3: "#1E120A", 4: "#FFFBF0",
};
const TEXT_COLORS: Record<number, string> = {
  [-1]: "#1a1a1a", 0: "#46464E", 1: "#46464E", 2: "#C8BEAA", 3: "#C8BEAA", 4: "#46464E",
};
const LABEL_COLORS: Record<number, string> = {
  [-1]: "#9E7A3C", 0: "#9E7A3C", 1: "#9E7A3C", 2: "#BE9650", 3: "#BE9650", 4: "#9E7A3C",
};

// before-story:start
const NOTIF_ITEMS = [
  { icon: "📧", text: "3 unread", x: 2, y: 6 },
  { icon: "📞", text: "Missed call", x: 76, y: 3 },
  { icon: "💬", text: "WhatsApp (7)", x: 0, y: 88 },
  { icon: "⭐", text: "1★ review", x: 70, y: 90 },
];
const EXTRA_NOTIFS = [
  { icon: "📱", text: "Facebook (4)", x: 78, y: 45 },
  { icon: "🔔", text: "Reminder", x: 4, y: 50 },
];
// before-story:end
const FEATURE_CHIPS = ["One inbox", "AI Drafts", "Voice Learning", "Your Prices", "Smart Sort"];

// ─── Sub-components ───
interface CardTransform { x: number; y: number; rotate: number; scale: number; opacity: number; }

const ChaosCard = ({ card, transform, isDark, stage }: { card: (typeof MESSAGE_CARDS)[0]; transform: CardTransform; isDark: boolean; stage: number; }) => {
  const showBadge = stage >= 2 && card.urgent;
  const showDot = stage >= 1 && card.unread && !showBadge;
  return (
    <div data-before-story="" className="absolute top-0 left-0 w-full" style={{
      transform: `translate(${transform.x}px, ${transform.y}px) rotate(${transform.rotate}deg) scale(${transform.scale})`,
      opacity: transform.opacity,
      zIndex: 10 - MESSAGE_CARDS.indexOf(card) + (card.urgent && stage >= 2 ? 5 : 0),
      transition: "all 0.85s cubic-bezier(0.16, 1, 0.3, 1)",
    }}>
      <div className="relative rounded-xl" style={{
        background: isDark ? "rgba(255,255,255,0.06)" : "white",
        border: `1px solid ${showBadge ? "rgba(252,165,165,0.5)" : isDark ? "rgba(255,255,255,0.08)" : "#e5e7eb"}`,
        padding: "10px 12px",
        boxShadow: isDark ? "0 2px 12px rgba(0,0,0,0.3)" : "0 1px 3px rgba(0,0,0,0.04)",
        backdropFilter: isDark ? "blur(8px)" : "none",
      }}>
        {showBadge && <div className="absolute -top-1.5 -right-1.5 uppercase" style={{ background: "#FF3B30", color: "white", fontSize: 8, fontWeight: 700, padding: "2px 5px", borderRadius: 5, letterSpacing: "0.05em" }}>URGENT</div>}
        {showDot && <div className="absolute rounded-full" style={{ top: 10, right: 10, width: 7, height: 7, background: "#d59543" }} />}
        <div className="flex items-center gap-1.5 mb-0.5">
          <span style={{ fontSize: 12 }}>{CHANNEL_ICONS[card.type] || "📧"}</span>
          <span className="flex-1 truncate" style={{ fontSize: 11, fontWeight: 600, color: isDark ? "rgba(255,255,255,0.85)" : "#1a1a1a" }}>{card.from}</span>
          <span className="shrink-0" style={{ fontSize: 9, color: isDark ? "rgba(255,255,255,0.4)" : "#9ca3af" }}>{card.time}</span>
        </div>
        <div style={{ fontSize: 10, fontWeight: 500, color: isDark ? "rgba(255,255,255,0.7)" : "#374151", marginBottom: 1 }}>{card.subject}</div>
        <div className="truncate" style={{ fontSize: 10, color: isDark ? "rgba(255,255,255,0.4)" : "#9ca3af" }}>{card.preview}</div>
        <div className="inline-block mt-1 rounded" style={{ fontSize: 8, fontWeight: 600, color: isDark ? "rgba(255,255,255,0.35)" : "#9ca3af", background: isDark ? "rgba(255,255,255,0.05)" : "#f3f4f6", padding: "1px 6px", letterSpacing: "0.03em" }}>{card.channel}</div>
      </div>
    </div>
  );
};

const OrganisedCard = ({ card, index }: { card: (typeof ORGANISED_CARDS)[0]; index: number }) => (
  <motion.div className="absolute top-0 left-0 w-full" initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.6, delay: index * 0.06, ease: [0.16, 1, 0.3, 1] }} style={{ transform: `translateY(${index * 56}px)` }}>
    <div className="flex items-center gap-2" style={{ background: "white", border: "1px solid #e5e7eb", borderRadius: 10, padding: "8px 12px", boxShadow: "0 1px 3px rgba(0,0,0,0.03)" }}>
      <div className="shrink-0 rounded" style={{ width: 4, height: 28, background: card.color }} />
      <div className="flex-1 min-w-0">
        <div className="flex items-center gap-1.5 mb-0.5">
          <span className="uppercase rounded" style={{ fontSize: 8, fontWeight: 700, color: card.color, background: `${card.color}14`, padding: "1px 5px", letterSpacing: "0.05em" }}>{card.label}</span>
        </div>
        <div className="truncate" style={{ fontSize: 11, fontWeight: 500, color: "#1a1a1a" }}>{card.summary}</div>
      </div>
      <div className="shrink-0 whitespace-nowrap" style={{
        fontSize: 9, fontWeight: 600,
        color: card.status.includes("✓") || card.status.includes("junk") ? "#4a7c59" : "#d59543",
        background: card.status.includes("✓") || card.status.includes("junk") ? "rgba(74,124,89,0.06)" : "rgba(213,149,67,0.06)",
        padding: "2px 7px", borderRadius: 5,
      }}>{card.status}</div>
    </div>
  </motion.div>
);

// ═══════════════════════════════════════════════════════
// DESKTOP — Body-lock approach
// ═══════════════════════════════════════════════════════
// How it works:
// 1. Section sits in normal page flow at height: 100vh
// 2. When it scrolls into view → snap it to top, lock body scroll
// 3. Wheel events step through stages (one per gesture, with cooldown)
// 4. At last stage + scroll down → unlock body, resume normal page scroll
// 5. Scrolling back up re-engages the lock
//
// This is the same pattern Apple uses for iPhone product pages.
// It's the most reliable because there is ZERO scroll-position mapping.
// ═══════════════════════════════════════════════════════

const DesktopGrowthTrap = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const [visualStage, setVisualStage] = useState(-1);
  const [showTransformed, setShowTransformed] = useState(true);
  const isLockedRef = useRef(false);
  const [isLocked, setIsLocked] = useState(false);
  const cooldownRef = useRef(false);
  const touchStartRef = useRef(0);
  const wheelAccumRef = useRef(0);
  const hasEnteredRef = useRef(false);
  const savedScrollRef = useRef(0);

  // Threshold: how much wheel delta to accumulate before stepping
  const WHEEL_THRESHOLD = 80;
  const COOLDOWN_MS = 700;

  // ─── Lock body scroll ───
  const lockBody = useCallback(() => {
    if (isLockedRef.current) return;
    isLockedRef.current = true;
    setIsLocked(true);

    // Save current scroll and snap section to top
    const rect = sectionRef.current?.getBoundingClientRect();
    if (rect) {
      const targetScroll = window.scrollY + rect.top;
      savedScrollRef.current = targetScroll;
      window.scrollTo({ top: targetScroll, behavior: "instant" as ScrollBehavior });
    }

    // Lock the body
    document.body.style.overflow = "hidden";
    document.body.style.position = "fixed";
    document.body.style.top = `-${savedScrollRef.current}px`;
    document.body.style.left = "0";
    document.body.style.right = "0";
  }, []);

  // ─── Unlock body scroll ───
  const unlockBody = useCallback((direction: "up" | "down") => {
    if (!isLockedRef.current) return;
    isLockedRef.current = false;
    setIsLocked(false);

    document.body.style.overflow = "";
    document.body.style.position = "";
    document.body.style.top = "";
    document.body.style.left = "";
    document.body.style.right = "";

    // Restore scroll position, offset slightly so page continues naturally
    const offset = direction === "down" ? 2 : -2;
    window.scrollTo({ top: savedScrollRef.current + offset, behavior: "instant" as ScrollBehavior });
  }, []);

  // ─── Step through stages ───
  const step = useCallback((direction: "up" | "down") => {
    if (cooldownRef.current) return;

    setVisualStage((prev) => {
      if (direction === "down" && prev >= 4) {
        unlockBody("down");
        return prev;
      }
      if (direction === "up" && prev <= -1) {
        unlockBody("up");
        return prev;
      }
      return direction === "down" ? prev + 1 : prev - 1;
    });

    cooldownRef.current = true;
    setTimeout(() => {
      cooldownRef.current = false;
      wheelAccumRef.current = 0;
    }, COOLDOWN_MS);
  }, [unlockBody]);

  // ─── IntersectionObserver: detect when section enters viewport ───
  useEffect(() => {
    const el = sectionRef.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !isLockedRef.current && !cooldownRef.current) {
          // Determine if we're entering from top (scrolling down) or bottom (scrolling up)
          const rect = el.getBoundingClientRect();
          if (rect.top <= window.innerHeight * 0.5 && rect.top >= -10) {
            // Entering from top — start at intro
            hasEnteredRef.current = true;
            setVisualStage(-1);
            lockBody();
          } else if (rect.bottom >= window.innerHeight * 0.5 && rect.top < 0) {
            // Re-entering from bottom (scrolled back up) — start at last stage
            hasEnteredRef.current = true;
            setVisualStage(4);
            lockBody();
          }
        }
      },
      { threshold: [0.1, 0.5, 0.9] }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, [lockBody]);

  // ─── Wheel events (accumulator for trackpad smoothness) ───
  useEffect(() => {
    const handleWheel = (e: WheelEvent) => {
      if (!isLockedRef.current) return;
      e.preventDefault();
      e.stopPropagation();

      // Accumulate delta — trackpads fire many small events, mice fire fewer large ones
      wheelAccumRef.current += e.deltaY;

      if (Math.abs(wheelAccumRef.current) >= WHEEL_THRESHOLD) {
        step(wheelAccumRef.current > 0 ? "down" : "up");
        wheelAccumRef.current = 0;
      }
    };

    window.addEventListener("wheel", handleWheel, { passive: false });
    return () => window.removeEventListener("wheel", handleWheel);
  }, [step]);

  // ─── Touch events ───
  useEffect(() => {
    const handleTouchStart = (e: TouchEvent) => {
      touchStartRef.current = e.touches[0].clientY;
    };
    const handleTouchMove = (e: TouchEvent) => {
      if (!isLockedRef.current) return;
      e.preventDefault();
    };
    const handleTouchEnd = (e: TouchEvent) => {
      if (!isLockedRef.current) return;
      const delta = touchStartRef.current - e.changedTouches[0].clientY;
      if (Math.abs(delta) < 40) return;
      step(delta > 0 ? "down" : "up");
    };

    window.addEventListener("touchstart", handleTouchStart, { passive: true });
    window.addEventListener("touchmove", handleTouchMove, { passive: false });
    window.addEventListener("touchend", handleTouchEnd, { passive: true });
    return () => {
      window.removeEventListener("touchstart", handleTouchStart);
      window.removeEventListener("touchmove", handleTouchMove);
      window.removeEventListener("touchend", handleTouchEnd);
    };
  }, [step]);

  // ─── Keyboard ───
  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      if (!isLockedRef.current) return;
      if (e.key === "ArrowDown" || e.key === " ") { e.preventDefault(); step("down"); }
      if (e.key === "ArrowUp") { e.preventDefault(); step("up"); }
    };
    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, [step]);

  // ─── Auto-cycle between chaos/organized on stage 4 ───
  useEffect(() => {
    if (visualStage !== 4) {
      setShowTransformed(true);
      return;
    }
    const interval = setInterval(() => {
      setShowTransformed((prev) => !prev);
    }, 4000);
    return () => clearInterval(interval);
  }, [visualStage]);

  // ─── Cleanup on unmount ───
  useEffect(() => {
    return () => {
      document.body.style.overflow = "";
      document.body.style.position = "";
      document.body.style.top = "";
      document.body.style.left = "";
      document.body.style.right = "";
    };
  }, []);

  // ─── Derived state ───
  const isIntro = visualStage === -1;
  const isDark = visualStage === 2 || visualStage === 3;
  const isWayout = visualStage === 4;
  const stageData = isIntro ? null : STAGES[visualStage];
  const typo = isIntro ? TYPO_STYLES[0] : TYPO_STYLES[visualStage];
  const bgColor = (isWayout && !showTransformed) ? BG_COLORS[3] : (BG_COLORS[visualStage] ?? BG_COLORS[-1]);
  const textColor = (isWayout && !showTransformed) ? TEXT_COLORS[3] : (TEXT_COLORS[visualStage] ?? TEXT_COLORS[-1]);
  const labelColor = (isWayout && !showTransformed) ? LABEL_COLORS[3] : (LABEL_COLORS[visualStage] ?? LABEL_COLORS[-1]);
  const showNotifs = visualStage === 2 || visualStage === 3 || (isWayout && !showTransformed);
  const cardStage = isIntro ? -1 : visualStage;

  return (
    <div ref={sectionRef} data-growth-trap-story="" style={{ height: "100vh", position: "relative" }}>
      <div className="flex overflow-hidden" style={{
        height: "100vh",
        background: bgColor,
        transition: "background 0.9s cubic-bezier(0.16, 1, 0.3, 1)",
      }}>
        {/* ─── LEFT: Story text ─── */}
        <div className="flex-1 flex flex-col justify-center relative z-10" style={{ padding: "0 48px 0 64px" }}>
          <AnimatePresence mode="wait">
            {isIntro ? (
              <motion.div key="intro" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -30 }}
                transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }} exit={{ opacity: 0, transition: { duration: 0.15 } }} className="max-w-[480px]">
                <h2 className="font-bold" style={{ fontSize: "clamp(28px, 3vw, 38px)", color: "#1a1a1a", lineHeight: 1.2, letterSpacing: "-0.02em" }}>
                  You didn't start a business to answer emails at 10pm.
                </h2>
                <div className="flex items-center gap-2 mt-6" style={{ color: "#9ca3af", fontSize: 13 }}>
                  <motion.div animate={{ y: [0, 4, 0] }} transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}>↓</motion.div>
                  <span style={{ fontStyle: "italic" }}>Scroll to read the story</span>
                </div>
              </motion.div>
            ) : (
              <motion.div key={visualStage} data-before-story={isWayout ? undefined : ""} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -8 }}
                transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1], exit: { duration: 0.12 } }} className="max-w-[460px]">
                <div className="uppercase" style={{ fontSize: 11, fontWeight: 700, letterSpacing: "0.2em", color: labelColor, marginBottom: 16 }}>
                  {stageData!.label}
                </div>
                <div style={{ fontSize: "clamp(15px, 1.2vw, 18px)", lineHeight: typo.lineHeight, letterSpacing: typo.letterSpacing, fontWeight: typo.fontWeight, color: textColor, transition: "color 0.6s ease" }}>
                  {stageData!.description}
                </div>
                {stageData!.closingLine && (
                  <motion.div initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2, duration: 0.5 }}
                    style={{ fontSize: "clamp(15px, 1.2vw, 18px)", lineHeight: 1.85, fontWeight: 700, color: textColor, marginTop: 20 }}>
                    {stageData!.closingLine}
                  </motion.div>
                )}
                <div className="flex gap-1.5 mt-8">
                  {STAGES.map((_, i) => (
                    <div key={i} className="rounded-full" style={{
                      height: 5, width: i === visualStage ? 32 : 8,
                      background: i === visualStage ? "#d59543" : isDark ? "rgba(200,180,150,0.2)" : "rgba(0,0,0,0.1)",
                      transition: "all 0.5s cubic-bezier(0.16, 1, 0.3, 1)",
                    }} />
                  ))}
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* ─── RIGHT: Card visualisation ─── */}
        <div className="flex-1 flex items-center justify-center relative" style={{ padding: "0 48px" }}>
          <div className="relative w-full" style={{ maxWidth: 360, height: isWayout ? 470 : 540, transition: "height 0.8s cubic-bezier(0.16, 1, 0.3, 1)" }}>
            {/* Before/After cycle label */}
            <AnimatePresence mode="wait">
              {isWayout && (
                <motion.div key={showTransformed ? "after" : "before"}
                  initial={{ opacity: 0, y: -4 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: 4 }}
                  transition={{ duration: 0.3 }}
                  className="absolute -top-16 left-0 right-0 text-center z-10">
                  <span style={{ fontSize: 11, fontWeight: 700, letterSpacing: "0.15em", textTransform: "uppercase",
                    color: showTransformed ? "#d59543" : "rgba(255,255,255,0.5)",
                    background: showTransformed ? "rgba(213,149,67,0.08)" : "rgba(255,255,255,0.05)",
                    padding: "4px 12px", borderRadius: 6 }}>
                    {showTransformed ? "✨ After BizzyBee" : "Before"}
                  </span>
                </motion.div>
              )}
            </AnimatePresence>
            {/* BizzyBee header */}
            <motion.div className="absolute -top-10 left-0 right-0 flex items-center justify-between"
              animate={{ opacity: isWayout && showTransformed ? 1 : 0, y: isWayout && showTransformed ? 0 : 8 }} transition={{ duration: 0.5, delay: 0.15 }}>
              <div className="flex items-center gap-1.5">
                <span style={{ fontSize: 16 }}>🐝</span>
                <span style={{ fontSize: 13, fontWeight: 700, color: "#1a1a1a" }}>BizzyBee Inbox</span>
              </div>
              <div className="rounded-md" style={{ fontSize: 10, fontWeight: 600, color: "#4a7c59", background: "rgba(74,124,89,0.07)", padding: "3px 8px" }}>Sorted, drafts ready ✓</div>
            </motion.div>

            {/* Feature chips */}
            <AnimatePresence>
              {isWayout && showTransformed && (
                <motion.div className="absolute -bottom-9 left-0 right-0 flex gap-1.5 justify-center flex-wrap"
                  initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }} transition={{ delay: 0.3, duration: 0.5 }}>
                  {FEATURE_CHIPS.map((f, i) => (
                    <span key={i} className="whitespace-nowrap rounded-md" style={{ fontSize: 9, fontWeight: 600, color: "#d59543", background: "rgba(213,149,67,0.06)", padding: "3px 8px" }}>{f}</span>
                  ))}
                </motion.div>
              )}
            </AnimatePresence>

            {/* Chaotic cards */}
            {(!isWayout || !showTransformed) && MESSAGE_CARDS.map((card, i) => (
              <ChaosCard key={card.id} card={card} transform={getCardTransform(isWayout ? 3 : cardStage, i)} isDark={isWayout ? true : isDark} stage={isWayout ? 3 : cardStage} />
            ))}

            {/* Organised cards */}
            <AnimatePresence>
              {isWayout && showTransformed && ORGANISED_CARDS.map((card, i) => (
                <OrganisedCard key={card.id} card={card} index={i} />
              ))}
            </AnimatePresence>
          </div>

          {/* Floating notifications */}
          {showNotifs && (
            <>
              {[...NOTIF_ITEMS, ...(visualStage === 3 ? EXTRA_NOTIFS : [])].map((n, i) => (
                <div key={`notif-${i}`} data-before-story="" className="absolute pointer-events-none z-[5]" style={{
                  left: `${n.x}%`, top: `${n.y}%`,
                  opacity: visualStage === 3 ? 0.9 : 0.55,
                  transform: `scale(${visualStage === 3 ? 1 : 0.85})`,
                  transition: `all 0.5s ease ${i * 0.06}s`,
                }}>
                  <div className="flex items-center gap-1.5 rounded-lg" style={{
                    background: "rgba(255,255,255,0.07)", backdropFilter: "blur(6px)",
                    border: "1px solid rgba(255,255,255,0.1)", padding: "4px 8px",
                    boxShadow: "0 3px 10px rgba(0,0,0,0.3)",
                  }}>
                    <span style={{ fontSize: 11 }}>{n.icon}</span>
                    <span className="whitespace-nowrap" style={{ fontSize: 9, fontWeight: 600, color: "rgba(255,255,255,0.65)" }}>{n.text}</span>
                  </div>
                </div>
              ))}
            </>
          )}

          {/* Golden glow */}
          {isWayout && showTransformed && (
            <motion.div className="absolute pointer-events-none rounded-full" style={{
              top: "50%", left: "50%", width: 380, height: 380, x: "-50%", y: "-50%",
              background: "radial-gradient(circle, rgba(213,149,67,0.07) 0%, transparent 70%)",
            }} animate={{ opacity: [0.5, 1, 0.5], scale: [1, 1.04, 1] }}
              transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }} />
          )}
        </div>
      </div>
    </div>
  );
};

// ─── MOBILE: Stacked cards, no scroll hijack ───
const MobileGrowthTrap = () => (
  <div className="py-16 px-5" data-growth-trap-story="">
    <h2 className="text-2xl font-bold text-center mb-12 max-w-sm mx-auto" style={{ color: "#1a1a1a", letterSpacing: "-0.015em" }}>
      You didn't start a business to answer emails at 10pm.
    </h2>
    {STAGES.map((stage, i) => {
      const isDark = i === 2 || i === 3;
      const isWayout = i === 4;
      const typo = TYPO_STYLES[i];
      return (
        <motion.div key={i} data-before-story={isWayout ? undefined : ""} initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }} viewport={{ once: true, margin: "-60px" }}
          className="max-w-md mx-auto mb-12 rounded-2xl p-6"
          style={{ backgroundColor: isDark ? "hsl(20, 44%, 12%)" : isWayout ? "hsl(44, 70%, 96%)" : "hsl(40, 20%, 98%)" }}>
          <span className="uppercase inline-block mb-2" style={{ fontSize: 10, fontWeight: 700, letterSpacing: "0.2em", color: "hsl(35, 58%, 55%)" }}>{stage.label}</span>
          <p style={{ fontSize: 15, lineHeight: typo.lineHeight, letterSpacing: typo.letterSpacing, fontWeight: typo.fontWeight, color: isDark ? "hsl(40,20%,75%)" : "hsl(220,9%,30%)" }}>{stage.description}</p>
          {stage.closingLine && <p className="mt-4" style={{ fontSize: 15, lineHeight: 1.85, fontWeight: 700, color: "#1a1a1a" }}>{stage.closingLine}</p>}
          {i === 0 && (
            <div className="mt-5 space-y-2">
              {MESSAGE_CARDS.slice(0, 3).map((card) => (
                <div key={card.id} className="rounded-lg flex items-center gap-2" style={{ background: "white", border: "1px solid #e5e7eb", padding: "8px 10px" }}>
                  <span style={{ fontSize: 12 }}>{CHANNEL_ICONS[card.type] || "📧"}</span>
                  <span className="truncate" style={{ fontSize: 11, fontWeight: 500, color: "#1a1a1a" }}>{card.subject}</span>
                </div>
              ))}
            </div>
          )}
          {isWayout && (
            <div className="mt-5 space-y-2">
              {ORGANISED_CARDS.slice(0, 4).map((card) => (
                <div key={card.id} className="rounded-lg flex items-center gap-2" style={{ background: "white", border: "1px solid #e5e7eb", padding: "8px 10px" }}>
                  <div className="rounded shrink-0" style={{ width: 3, height: 22, background: card.color }} />
                  <span className="truncate flex-1" style={{ fontSize: 11, fontWeight: 500, color: "#1a1a1a" }}>{card.summary}</span>
                  <span className="shrink-0 rounded" style={{ fontSize: 8, fontWeight: 600, color: card.status.includes("✓") ? "#4a7c59" : "#d59543", background: card.status.includes("✓") ? "rgba(74,124,89,0.06)" : "rgba(213,149,67,0.06)", padding: "2px 6px" }}>{card.status}</span>
                </div>
              ))}
            </div>
          )}
        </motion.div>
      );
    })}
  </div>
);

const GrowthTrapStory = () => {
  const isMobile = useIsMobile();
  return isMobile ? <MobileGrowthTrap /> : <DesktopGrowthTrap />;
};

export default GrowthTrapStory;
