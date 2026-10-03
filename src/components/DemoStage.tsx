import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { AnimatedSection, AnimatedElement } from "@/lib/motion";
import {
  Hexagon, Mic, GraduationCap, Layers, Brain, RotateCcw,
  Mail, Star, Clock, Tag, User, Sparkles,
} from "lucide-react";

const ease = [0.16, 1, 0.3, 1] as const;

/* ─── Demo scene data ─── */
type DemoScene = {
  id: string;
  icon: React.ReactNode;
  label: string;
  title: string;
  description: string;
};

const scenes: DemoScene[] = [
  {
    id: "sort",
    icon: <Hexagon className="w-4 h-4" />,
    label: "Sorted for you",
    title: "The urgent ones come first",
    description: "AI Assistant sorts every email by what it needs: urgent, quote, booking, or just for info. Junk gets out of your way.",
  },
  {
    id: "draft",
    icon: <Mic className="w-4 h-4" />,
    label: "Drafts in your voice",
    title: "Replies that sound like you",
    description: "AI Assistant learns your tone from emails you've already sent. Compare a generic reply with one written your way.",
  },
  {
    id: "training",
    icon: <GraduationCap className="w-4 h-4" />,
    label: "Your business details",
    title: "Tell it the basics, in plain English",
    description: "Your services, area and prices. No prompts, no code. AI Assistant uses them when it drafts quote and booking replies.",
  },
  {
    id: "history",
    icon: <Layers className="w-4 h-4" />,
    label: "Customer history",
    title: "Every customer's story in one place",
    description: "On both plans, your past emails come in when you connect, so you can see everything a customer has said before you reply.",
  },
  {
    id: "brain",
    icon: <Brain className="w-4 h-4" />,
    label: "Quotes",
    title: "Quote replies that use your prices",
    description: "When someone asks for a price, the draft uses the prices you've given it. You check the figure before anything is sent.",
  },
  {
    id: "feedback",
    icon: <RotateCcw className="w-4 h-4" />,
    label: "You're in charge",
    title: "Nothing goes out without your OK",
    description: "Every draft waits for you. Send it, change it, or bin it and write your own.",
  },
];

/* ─── Inbox message list data ─── */
const inboxMessages = [
  { id: 1, from: "Sarah M.", subject: "Re: Tap still dripping", channel: "email" as const, time: "2m", badge: "🔥 Urgent", badgeStyle: { background: "rgba(255, 59, 48, 0.08)", color: "#FF3B30", border: "1px solid rgba(255, 59, 48, 0.12)" }, unread: true },
  { id: 2, from: "James K.", subject: "Quote for bathroom refit", channel: "email" as const, time: "8m", badge: "💰 Quote", badgeStyle: { background: "rgba(52, 199, 89, 0.08)", color: "#34C759", border: "1px solid rgba(52, 199, 89, 0.12)" }, unread: true },
  { id: 3, from: "Priya S.", subject: "Emergency — tomorrow AM?", channel: "email" as const, time: "15m", badge: "📅 Booking", badgeStyle: { background: "rgba(175, 82, 222, 0.08)", color: "#AF52DE", border: "1px solid rgba(175, 82, 222, 0.12)" }, unread: true },
  { id: 4, from: "Checkatrade", subject: "New lead in your area", channel: "email" as const, time: "1h", badge: "💰 Quote", badgeStyle: { background: "rgba(52, 199, 89, 0.08)", color: "#34C759", border: "1px solid rgba(52, 199, 89, 0.12)" }, unread: false },
  { id: 5, from: "David T.", subject: "Thanks for last week", channel: "email" as const, time: "2h", badge: "ℹ️ Info", badgeStyle: { background: "rgba(0, 0, 0, 0.03)", color: "var(--text-secondary)", border: "1px solid rgba(0, 0, 0, 0.06)" }, unread: false },
];

const channelIcon = {
  email: <Mail className="w-3.5 h-3.5" />,
};

/* ─── Reading pane content per scene ─── */
const ReadingPane = ({ sceneId }: { sceneId: string }) => {
  const [voiceMode, setVoiceMode] = useState<"generic" | "yours">("generic");

  switch (sceneId) {
    case "sort":
      return (
        <div className="space-y-3">
          <div className="flex items-center gap-2 mb-4">
            <span className="text-sm font-semibold text-foreground">Sarah M.</span>
            <span className="text-[10px] font-semibold uppercase tracking-wider px-2 py-0.5 rounded-full" style={{ background: "rgba(255, 59, 48, 0.08)", color: "#FF3B30", border: "1px solid rgba(255, 59, 48, 0.12)" }}>Urgent</span>
          </div>
          <p className="text-sm text-foreground/80 leading-relaxed">"Hi, just following up again on the tap. It's been two days now and the dripping's got worse. Could you pop over this week?"</p>
          <div className="mt-4 p-3 rounded-xl bg-primary-glow/30 border border-primary/10">
            <div className="flex items-center gap-1.5 mb-1">
              <Sparkles className="w-3 h-3 text-primary" />
              <span className="uppercase" style={{ fontSize: 10, fontWeight: 600, letterSpacing: "0.1em", color: "hsl(35, 55%, 55%)" }}>Summary</span>
            </div>
            <p className="text-xs text-foreground/70">Repeat follow-up. Customer has waited 2 days for the leaking tap. Needs a reply today.</p>
          </div>
        </div>
      );
    case "draft":
      return (
        <div className="space-y-3">
          <div className="flex gap-2 mb-3">
            <button onClick={() => setVoiceMode("generic")} className={`text-xs font-medium px-3 py-1.5 rounded-lg transition-all ${voiceMode === "generic" ? "bg-muted/20 text-foreground border border-border" : "text-muted-foreground"}`}>Generic</button>
            <button onClick={() => setVoiceMode("yours")} className={`text-xs font-medium px-3 py-1.5 rounded-lg transition-all ${voiceMode === "yours" ? "text-white" : "text-muted-foreground"}`}>Your voice</button>
          </div>
          <AnimatePresence mode="wait">
            <motion.div key={voiceMode} initial={{ opacity: 0, y: 6 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -6 }} transition={{ duration: 0.3, ease }}>
              {voiceMode === "generic" ? (
                <div className="p-4 rounded-xl border border-border bg-background-alt">
                  <p className="text-sm text-foreground/70 leading-relaxed">"Dear Customer, Thank you for your enquiry. We will respond within 24–48 business hours. Kind regards, [Business Name]."</p>
                </div>
              ) : (
                <div className="p-4 rounded-xl border border-primary/20 bg-primary-glow/10">
                  <p className="text-sm text-foreground leading-relaxed">"Hiya! A leaky tap is usually a quick fix — most of the time it's just a washer. I charge £65 for the first hour including callout. When suits you this week? Cheers, Dave"</p>
                </div>
              )}
            </motion.div>
          </AnimatePresence>
        </div>
      );
    case "training":
      return (
        <div className="space-y-2.5">
          {[
            { label: "Services", value: "Plumbing, Heating, Bathroom Fitting", done: true },
            { label: "Service area", value: "SW London, Surrey, within 15 miles", done: true },
            { label: "Pricing", value: "£65/hr first hour, £45/hr after", done: true },
            { label: "Working hours", value: "Mon–Fri 8am–6pm", done: true },
          ].map((item, i) => (
            <div key={i} className="flex items-center justify-between p-3 rounded-xl border border-border bg-background">
              <div>
                <span className="uppercase block" style={{ fontSize: 10, fontWeight: 600, letterSpacing: "0.1em", color: "hsl(220, 9%, 55%)" }}>{item.label}</span>
                <span className="text-sm text-foreground">{item.value}</span>
              </div>
              <span className={`text-[10px] font-medium px-2 py-0.5 rounded-full ${item.done ? "bg-emerald-50 text-emerald-600" : "bg-primary-glow text-primary"}`}>
                {item.done ? "Saved" : "To add"}
              </span>
            </div>
          ))}
        </div>
      );
    case "history":
      return (
        <div className="space-y-2.5">
          <div className="flex items-center gap-2 mb-2">
            <span className="text-sm font-semibold text-foreground">Sarah M.</span>
            <span className="text-[10px] text-muted-foreground">Customer since March 2024</span>
          </div>
          {[
            { date: "Today", text: "Re: Tap still dripping" },
            { date: "12 Aug", text: "Thanks for sorting the boiler so quickly" },
            { date: "3 Aug", text: "Boiler service booking" },
            { date: "Mar 2024", text: "Quote for new radiator" },
          ].map((m, i) => (
            <motion.div key={i} initial={{ opacity: 0, y: 6 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.06, ease }} className="flex items-center justify-between p-3 rounded-xl border border-border bg-background">
              <span className="text-sm text-foreground truncate">{m.text}</span>
              <span className="uppercase shrink-0 ml-3" style={{ fontSize: 10, fontWeight: 600, letterSpacing: "0.1em", color: "hsl(220, 9%, 55%)" }}>{m.date}</span>
            </motion.div>
          ))}
        </div>
      );
    case "brain":
      return (
        <div className="space-y-3">
          <div className="p-4 rounded-xl border border-border bg-background-alt">
            <p className="text-sm text-foreground/80 leading-relaxed mb-3">"Hi, how much for a full bathroom refit?"</p>
          </div>
          <div className="p-4 rounded-xl border border-primary/20 bg-primary-glow/10">
            <p className="text-sm text-foreground leading-relaxed">
              "Bathroom refits typically start from{" "}
              <motion.span initial={{ opacity: 0, x: -8 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.4, type: "spring", stiffness: 120, damping: 16 }} className="inline-flex items-center gap-1 bg-primary/10 text-primary font-semibold px-2 py-0.5 rounded-lg text-xs border border-primary/20">
                <Tag className="w-3 h-3" /> £3,500
              </motion.span>
              {" "}for a standard size. I'd love to pop over and give you an exact quote. When would suit you?"
            </p>
          </div>
        </div>
      );
    case "feedback":
      return (
        <div className="space-y-3">
          <div className="p-4 rounded-xl border border-primary/20 bg-primary-glow/10">
            <span className="uppercase block mb-1" style={{ fontSize: 10, fontWeight: 600, letterSpacing: "0.1em", color: "hsl(220, 9%, 55%)" }}>Draft · waiting for you</span>
            <p className="text-sm text-foreground leading-relaxed">"Hi Sarah, sorry the tap's still going. I can come round this week to sort it. When suits you? Cheers, Dave"</p>
          </div>
          <div className="flex gap-2">
            <button className="flex-1 py-2 rounded-xl border border-emerald-200 text-emerald-600 text-xs font-medium bg-emerald-50/50 hover:bg-emerald-50 transition-colors">✓ Send</button>
            <button className="flex-1 py-2 rounded-xl border border-border text-foreground text-xs font-medium hover:bg-background-alt transition-colors">✏️ Edit</button>
            <button className="flex-1 py-2 rounded-xl border border-destructive/20 text-destructive text-xs font-medium hover:bg-red-50/50 transition-colors">✗ Bin it</button>
          </div>
        </div>
      );
    default:
      return null;
  }
};

/* ─── Insights sidebar per scene ─── */
const InsightsPane = ({ sceneId }: { sceneId: string }) => {
  const insights: Record<string, { items: { icon: React.ReactNode; label: string; value: string }[] }> = {
    sort: {
      items: [
        { icon: <Star className="w-3 h-3 text-primary" />, label: "Priority", value: "Urgent" },
        { icon: <Clock className="w-3 h-3 text-primary" />, label: "Waiting", value: "2 days" },
        { icon: <User className="w-3 h-3 text-primary" />, label: "Customer", value: "Repeat" },
      ],
    },
    draft: {
      items: [
        { icon: <Mic className="w-3 h-3 text-primary" />, label: "Tone", value: "Friendly" },
        { icon: <User className="w-3 h-3 text-primary" />, label: "Sign-off", value: "Cheers, Dave" },
        { icon: <Clock className="w-3 h-3 text-primary" />, label: "Status", value: "Waiting for you" },
      ],
    },
    training: {
      items: [
        { icon: <Brain className="w-3 h-3 text-primary" />, label: "Services", value: "3" },
        { icon: <Tag className="w-3 h-3 text-primary" />, label: "Prices", value: "Saved" },
        { icon: <Clock className="w-3 h-3 text-primary" />, label: "Hours", value: "Saved" },
      ],
    },
    history: {
      items: [
        { icon: <Mail className="w-3 h-3 text-primary" />, label: "Emails", value: "14" },
        { icon: <User className="w-3 h-3 text-primary" />, label: "Customer since", value: "Mar 2024" },
        { icon: <Star className="w-3 h-3 text-primary" />, label: "Last job", value: "Boiler service" },
      ],
    },
    brain: {
      items: [
        { icon: <Tag className="w-3 h-3 text-primary" />, label: "Price used", value: "£3,500" },
        { icon: <Brain className="w-3 h-3 text-primary" />, label: "From", value: "Your price list" },
        { icon: <Clock className="w-3 h-3 text-primary" />, label: "Status", value: "Waiting for you" },
      ],
    },
    feedback: {
      items: [
        { icon: <RotateCcw className="w-3 h-3 text-primary" />, label: "Sent without you", value: "Never" },
        { icon: <Star className="w-3 h-3 text-primary" />, label: "Edit first", value: "Always possible" },
      ],
    },
  };

  const data = insights[sceneId] || insights.sort;

  return (
    <div className="space-y-3">
      <span className="uppercase" style={{ fontSize: 10, fontWeight: 600, letterSpacing: "0.1em", color: "hsl(220, 9%, 55%)" }}>Insights</span>
      {data.items.map((item, i) => (
        <motion.div key={i} initial={{ opacity: 0, x: 8 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: i * 0.1, ease }} className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            {item.icon}
            <span className="text-xs text-muted-foreground">{item.label}</span>
          </div>
          <span className="text-xs font-semibold text-foreground">{item.value}</span>
        </motion.div>
      ))}
    </div>
  );
};

/* ─── Main component ─── */
const DemoStage = () => {
  const [active, setActive] = useState(0);
  const [selectedMsg, setSelectedMsg] = useState(0);

  return (
    <AnimatedSection className="py-24 md:py-32" style={{ background: "hsl(40, 30%, 99%)" }}>
      <div className="container mx-auto px-6">
        <AnimatedElement className="text-center mb-16">
          <span className="inline-block mb-4 uppercase" style={{ fontSize: 11, fontWeight: 700, letterSpacing: "0.2em", color: "hsl(35, 50%, 45%)" }}>See it work</span>
          <h2 className="text-3xl md:text-4xl font-bold mb-4" style={{ color: "hsl(220, 9%, 15%)", letterSpacing: "-0.02em" }}>
            Your words. Your tone. Your prices. Just… faster.
          </h2>
          <p style={{ color: "hsl(220, 9%, 50%)", maxWidth: 480 }} className="mx-auto">
            Click through a normal morning in BizzyBee. Example data only.
          </p>
        </AnimatedElement>

        {/* Tab bar */}
        <div className="flex flex-wrap justify-center gap-2 mb-10">
          {scenes.map((scene, i) => (
            <button
              key={scene.id}
              onClick={() => setActive(i)}
              className={`inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-xs font-medium transition-all ${
                active === i
                  ? ""
                  : "text-muted-foreground hover:text-foreground bg-background-alt border border-border hover:border-border-hover"
              }`}
            >
              {scene.icon}
              <span className="hidden sm:inline">{scene.label}</span>
            </button>
          ))}
        </div>

        {/* 3-pane demo */}
        <AnimatePresence mode="wait">
          <motion.div
            key={active}
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.35, ease }}
            className="max-w-6xl mx-auto"
          >
            {/* Scene description */}
            <div className="text-center mb-6">
              <h3 className="text-xl font-bold text-foreground mb-1" style={{ letterSpacing: "-0.01em" }}>{scenes[active].title}</h3>
              <p className="text-sm text-muted-foreground">{scenes[active].description}</p>
            </div>

            {/* App chrome */}
            <div className="rounded-2xl overflow-hidden" style={{ background: "white", border: "1px solid #e5e7eb", boxShadow: "0 4px 24px rgba(0,0,0,0.06)" }}>
              {/* Title bar */}
              <div className="flex items-center gap-2 px-4 py-2.5" style={{ borderBottom: "1px solid #e5e7eb", background: "hsl(40, 20%, 98%)" }}>
                <div className="flex gap-1.5">
                  <div className="w-2.5 h-2.5 rounded-full bg-destructive/50" />
                  <div className="w-2.5 h-2.5 rounded-full bg-primary/40" />
                  <div className="w-2.5 h-2.5 rounded-full bg-emerald-500/40" />
                </div>
                <span className="ml-2 uppercase" style={{ fontSize: 10, fontWeight: 600, letterSpacing: "0.1em", color: "hsl(220, 9%, 55%)" }}>Example · BizzyBee AI Assistant</span>

                {/* AI briefing strip */}
                <div className="ml-auto flex items-center gap-1.5 px-2.5 py-1 rounded-lg" style={{ background: "rgba(213,149,67,0.08)", border: "1px solid rgba(213,149,67,0.12)" }}>
                  <Sparkles className="w-3 h-3 text-primary" />
                  <span className="text-[10px] font-medium text-primary">3 drafts waiting for you</span>
                </div>
              </div>

              {/* 3-pane grid */}
              <div className="grid grid-cols-1 md:grid-cols-[220px_1fr_180px] min-h-[360px]">
                {/* Pane 1: Message list */}
                <div className="border-r border-border bg-background-alt/50 hidden md:block">
                  <div className="p-3">
                    <span className="uppercase block mb-2" style={{ fontSize: 10, fontWeight: 600, letterSpacing: "0.1em", color: "hsl(220, 9%, 55%)" }}>Inbox</span>
                  </div>
                  <div className="divide-y divide-border">
                    {inboxMessages.map((msg, i) => (
                      <button
                        key={msg.id}
                        onClick={() => setSelectedMsg(i)}
                        className={`w-full text-left px-3 py-2.5 transition-colors ${
                          selectedMsg === i ? "bg-primary-glow/20" : "hover:bg-background-alt"
                        }`}
                      >
                        <div className="flex items-center gap-1.5 mb-0.5">
                          <span className="text-muted-foreground">{channelIcon[msg.channel]}</span>
                          <span className={`text-xs font-medium truncate ${msg.unread ? "text-foreground" : "text-muted-foreground"}`}>{msg.from}</span>
                          <span className="uppercase ml-auto shrink-0" style={{ letterSpacing: "0.05em", color: "var(--text-secondary)", fontSize: "9px" }}>{msg.time}</span>
                        </div>
                        <p className="text-[11px] text-muted-foreground truncate">{msg.subject}</p>
                        {msg.unread && (
                          <span className="inline-block mt-1 text-[9px] font-semibold uppercase tracking-wider px-1.5 py-0.5 rounded-full" style={msg.badgeStyle}>
                            {msg.badge}
                          </span>
                        )}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Pane 2: Reading / Demo content */}
                <div className="p-5 md:p-6 bg-background">
                  <ReadingPane sceneId={scenes[active].id} />
                </div>

                {/* Pane 3: Insights */}
                <div className="border-l border-border p-4 bg-background-alt/30 hidden md:block">
                  <InsightsPane sceneId={scenes[active].id} />
                </div>
              </div>
            </div>
          </motion.div>
        </AnimatePresence>
      </div>
    </AnimatedSection>
  );
};

export default DemoStage;
