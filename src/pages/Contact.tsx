import { useState } from "react";
import { AnimatedSection, AnimatedElement } from "@/lib/motion";
import { ArrowRight, CheckCircle2 } from "lucide-react";

const Contact = () => {
  const [submitted, setSubmitted] = useState(false);
  const [form, setForm] = useState({ name: "", email: "", business: "", message: "" });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <main>
      <AnimatedSection className="py-24 md:py-32 pt-36" style={{ background: "hsl(40, 30%, 99%)" }}>
        <div className="container mx-auto px-6">
          <AnimatedElement className="max-w-xl mx-auto">
            <div className="text-center mb-12">
              <h1
                className="text-3xl md:text-4xl font-bold mb-4"
                style={{ color: "hsl(220, 9%, 15%)", letterSpacing: "-0.02em" }}
              >
                Talk to us
              </h1>
              <p style={{ color: "hsl(220, 9%, 50%)", maxWidth: 420, margin: "0 auto" }}>
                Got questions? We'd love to hear from you. Drop us a message and we'll get back to you within 24 hours.
              </p>
            </div>

            {submitted ? (
              <div className="text-center py-16">
                <CheckCircle2 className="mx-auto mb-4" style={{ width: 48, height: 48, color: "hsl(142, 71%, 45%)" }} />
                <h2 className="text-2xl font-bold mb-2" style={{ color: "hsl(220, 9%, 15%)" }}>
                  Message sent!
                </h2>
                <p style={{ color: "hsl(220, 9%, 50%)" }}>
                  We'll be in touch shortly. Usually within a few hours.
                </p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-5">
                <div>
                  <label className="block text-sm font-medium mb-1.5" style={{ color: "hsl(220, 9%, 30%)" }}>
                    Name
                  </label>
                  <input
                    type="text"
                    required
                    value={form.name}
                    onChange={(e) => setForm({ ...form, name: e.target.value })}
                    className="w-full px-4 py-3 rounded-xl text-sm transition-all focus:outline-none focus:ring-2"
                    style={{
                      border: "1px solid #e5e7eb",
                      background: "white",
                      color: "hsl(220, 9%, 15%)",
                      focusRingColor: "hsl(35, 55%, 55%)",
                    }}
                    placeholder="Your name"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1.5" style={{ color: "hsl(220, 9%, 30%)" }}>
                    Email
                  </label>
                  <input
                    type="email"
                    required
                    value={form.email}
                    onChange={(e) => setForm({ ...form, email: e.target.value })}
                    className="w-full px-4 py-3 rounded-xl text-sm transition-all focus:outline-none focus:ring-2"
                    style={{ border: "1px solid #e5e7eb", background: "white", color: "hsl(220, 9%, 15%)" }}
                    placeholder="you@company.co.uk"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1.5" style={{ color: "hsl(220, 9%, 30%)" }}>
                    Business name
                  </label>
                  <input
                    type="text"
                    value={form.business}
                    onChange={(e) => setForm({ ...form, business: e.target.value })}
                    className="w-full px-4 py-3 rounded-xl text-sm transition-all focus:outline-none focus:ring-2"
                    style={{ border: "1px solid #e5e7eb", background: "white", color: "hsl(220, 9%, 15%)" }}
                    placeholder="Your business name"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1.5" style={{ color: "hsl(220, 9%, 30%)" }}>
                    Message
                  </label>
                  <textarea
                    required
                    rows={5}
                    value={form.message}
                    onChange={(e) => setForm({ ...form, message: e.target.value })}
                    className="w-full px-4 py-3 rounded-xl text-sm transition-all focus:outline-none focus:ring-2 resize-none"
                    style={{ border: "1px solid #e5e7eb", background: "white", color: "hsl(220, 9%, 15%)" }}
                    placeholder="Tell us about your business and what you need..."
                  />
                </div>
                <button
                  type="submit"
                  className="w-full inline-flex items-center justify-center gap-2 font-medium transition-all hover:scale-[1.01] active:scale-[0.99]"
                  style={{
                    background: "hsl(35, 55%, 55%)",
                    color: "white",
                    padding: "14px 32px",
                    borderRadius: 12,
                    fontSize: 15,
                    boxShadow: "0 2px 12px rgba(213,149,67,0.2)",
                    border: "none",
                    cursor: "pointer",
                  }}
                >
                  Send message <ArrowRight size={16} />
                </button>
              </form>
            )}
          </AnimatedElement>
        </div>
      </AnimatedSection>
    </main>
  );
};

export default Contact;
