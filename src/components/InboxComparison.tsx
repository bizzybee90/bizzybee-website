import React, { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence, useInView } from "framer-motion";

type Email = {
  id: number;
  from: string;
  subject: string;
  time: string;
  preview: string;
  priority: "urgent" | "booking" | "quote" | "follow-up" | "info";
  aiSummary: string;
  sortOrder: number;
};

const PRIORITY_CONFIG: Record<Email["priority"], { label: string; style: React.CSSProperties }> = {
  urgent:     { label: "Urgent",    style: { background: "rgba(255, 59, 48, 0.08)", color: "#FF3B30", border: "1px solid rgba(255, 59, 48, 0.12)" } },
  booking:    { label: "Booking",   style: { background: "rgba(175, 82, 222, 0.08)", color: "#AF52DE", border: "1px solid rgba(175, 82, 222, 0.12)" } },
  quote:      { label: "Quote",     style: { background: "rgba(52, 199, 89, 0.08)", color: "#34C759", border: "1px solid rgba(52, 199, 89, 0.12)" } },
  "follow-up":{ label: "Follow-up", style: { background: "rgba(0, 122, 255, 0.08)", color: "#007AFF", border: "1px solid rgba(0, 122, 255, 0.12)" } },
  info:       { label: "Info",      style: { background: "rgba(0, 0, 0, 0.03)", color: "var(--text-secondary)", border: "1px solid rgba(0, 0, 0, 0.06)" } },
};

const emails: Email[] = [
  {
    id: 1,
    from: "Sarah M.",
    subject: "Re: Re: Re: Tap still dripping",
    time: "2 days ago",
    preview: "Hi, just following up again on the tap issue we discussed last...",
    priority: "urgent",
    aiSummary: "Repeat follow-up — customer waiting 2 days for a leaking tap fix.",
    sortOrder: 0,
  },
  {
    id: 2,
    from: "James K.",
    subject: "quote for full bathroom refit??",
    time: "Yesterday",
    preview: "hiya mate can you give us a price for doing our bathroom its about...",
    priority: "quote",
    aiSummary: "New quote request — full bathroom refit, needs site visit.",
    sortOrder: 2,
  },
  {
    id: 3,
    from: "Priya S.",
    subject: "Can you come tmrw?",
    time: "3 hrs ago",
    preview: "hi is anyone available tomorrow morning got an emergency with...",
    priority: "booking",
    aiSummary: "Emergency booking — customer needs availability tomorrow AM.",
    sortOrder: 1,
  },
  {
    id: 4,
    from: "no-reply@checkatrade",
    subject: "You have a new lead!",
    time: "5 hrs ago",
    preview: "A customer in your area is looking for a plumber. View lead...",
    priority: "quote",
    aiSummary: "Checkatrade lead — new customer enquiry in your area.",
    sortOrder: 3,
  },
  {
    id: 5,
    from: "David T.",
    subject: "Thanks for last week",
    time: "1 day ago",
    preview: "Just wanted to say cheers for sorting the boiler so quickly you...",
    priority: "info",
    aiSummary: "Happy customer — thank-you note, no action needed.",
    sortOrder: 5,
  },
  {
    id: 6,
    from: "Mrs. Patel",
    subject: "Fw: Fw: Fw: Invoice query",
    time: "4 days ago",
    preview: "I still haven't received the updated invoice you mentioned on...",
    priority: "follow-up",
    aiSummary: "Invoice chase — customer waiting 4 days, send updated PDF.",
    sortOrder: 4,
  },
];

const CHAOTIC_ORDER = [3, 5, 0, 2, 4, 1]; // jumbled index order
const SORTED_ORDER = [0, 1, 2, 3, 4, 5];  // by sortOrder (already the array order above sorted)

const ease = [0.16, 1, 0.3, 1] as const;

const InboxComparison = () => {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-120px" });
  const [phase, setPhase] = useState<"chaotic" | "sorting" | "sorted">("chaotic");

  useEffect(() => {
    if (!inView) return;
    // Start sorting after a beat
    const t1 = setTimeout(() => setPhase("sorting"), 1200);
    const t2 = setTimeout(() => setPhase("sorted"), 2800);
    return () => { clearTimeout(t1); clearTimeout(t2); };
  }, [inView]);

  const displayOrder = phase === "chaotic" ? CHAOTIC_ORDER : SORTED_ORDER;
  const orderedEmails = displayOrder.map(i => emails[i]);

  return (
    <section className="py-24 md:py-32" style={{ background: "hsl(40, 20%, 98%)" }} ref={ref}>
      <div className="container mx-auto px-6">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <span className="inline-block mb-4 uppercase" style={{ fontSize: 11, fontWeight: 700, letterSpacing: "0.2em", color: "hsl(35, 50%, 45%)" }}>Before vs After</span>
          <h2 className="text-3xl md:text-4xl font-bold" style={{ color: "hsl(220, 9%, 15%)", letterSpacing: "-0.02em" }}>
            Your inbox, transformed
          </h2>
        </motion.div>

        {/* Inbox panel */}
        <div className="max-w-2xl mx-auto">
          <div className="rounded-2xl overflow-hidden" style={{ background: "white", border: "1px solid #e5e7eb", boxShadow: "0 4px 24px rgba(0,0,0,0.06)" }}>
            {/* Toolbar */}
            <div className="flex items-center justify-between px-5 py-3" style={{ borderBottom: "1px solid #e5e7eb", background: "hsl(40, 20%, 98%)" }}>
              <div className="flex items-center gap-2">
                <div className="flex gap-1.5">
                  <div className="w-3 h-3 rounded-full bg-destructive/50" />
                  <div className="w-3 h-3 rounded-full bg-primary/40" />
                  <div className="w-3 h-3 rounded-full bg-green-500/40" />
                </div>
                <span className="ml-2 uppercase" style={{ fontSize: 10, fontWeight: 600, letterSpacing: "0.1em", color: "hsl(220, 9%, 55%)" }}>Inbox</span>
              </div>

              {/* Phase indicator */}
              <AnimatePresence mode="wait">
                <motion.span
                  key={phase}
                  initial={{ opacity: 0, y: 6 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -6 }}
                  className="uppercase" style={{ fontSize: 10, fontWeight: 600, letterSpacing: "0.1em" }}
                  style={{
                    color: phase === "chaotic"
                      ? "hsl(220, 9%, 46%)"
                      : phase === "sorting"
                        ? "hsl(35, 58%, 55%)"
                        : "hsl(142, 50%, 40%)",
                  }}
                >
                  {phase === "chaotic" && "6 unread · unsorted"}
                  {phase === "sorting" && "🐝 sorting…"}
                  {phase === "sorted" && "✓ prioritised"}
                </motion.span>
              </AnimatePresence>
            </div>

            {/* Email rows */}
            <div className="divide-y divide-border">
              <AnimatePresence mode="popLayout">
                {orderedEmails.map((email) => (
                  <motion.div
                    key={email.id}
                    layout
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.5, ease, layout: { duration: 0.6, ease } }}
                    className="px-5 py-4 flex flex-col gap-1.5 relative"
                  >
                    {/* Top row: from + time */}
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2.5">
                        <span className="text-sm font-semibold text-foreground">{email.from}</span>
                        {/* Priority badge — appears after sort */}
                        <AnimatePresence>
                          {phase === "sorted" && (
                            <motion.span
                              initial={{ opacity: 0, scale: 0.7 }}
                              animate={{ opacity: 1, scale: 1 }}
                              transition={{ duration: 0.35, delay: 0.3 + email.sortOrder * 0.08, ease }}
                              className="text-[10px] font-semibold uppercase tracking-wider px-2 py-0.5 rounded-full"
                              style={PRIORITY_CONFIG[email.priority].style}
                            >
                              {PRIORITY_CONFIG[email.priority].label}
                            </motion.span>
                          )}
                        </AnimatePresence>
                      </div>
                      <span className="text-xs text-muted-foreground shrink-0">{email.time}</span>
                    </div>

                    {/* Subject */}
                    <p className="text-sm text-foreground/80 truncate">{email.subject}</p>

                    {/* Preview (chaotic) or AI summary (sorted) */}
                    <AnimatePresence mode="wait">
                      {phase === "sorted" ? (
                        <motion.p
                          key="summary"
                          initial={{ opacity: 0, y: 4 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ duration: 0.4, delay: 0.4 + email.sortOrder * 0.08, ease }}
                          className="text-xs text-primary font-medium flex items-center gap-1.5"
                        >
                          <span className="shrink-0">🐝</span>
                          {email.aiSummary}
                        </motion.p>
                      ) : (
                        <motion.p
                          key="preview"
                          initial={{ opacity: 1 }}
                          exit={{ opacity: 0 }}
                          className="text-xs text-muted-foreground truncate"
                        >
                          {email.preview}
                        </motion.p>
                      )}
                    </AnimatePresence>
                  </motion.div>
                ))}
              </AnimatePresence>
            </div>
          </div>

          {/* Bee traversal — visible during sorting phase */}
          <AnimatePresence>
            {phase === "sorting" && (
              <motion.div
                initial={{ x: "-10%", opacity: 0 }}
                animate={{ x: "110%", opacity: [0, 1, 1, 0] }}
                exit={{ opacity: 0 }}
                transition={{ duration: 1.6, ease, times: [0, 0.1, 0.85, 1] }}
                className="relative -mt-1 h-8 pointer-events-none"
              >
                <span className="text-xl absolute top-0">🐝</span>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
};

export default InboxComparison;
