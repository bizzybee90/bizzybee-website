import { motion } from "framer-motion";
import { AnimatedSection, AnimatedElement } from "@/lib/motion";

const Testimonials = () => (
  <AnimatedSection className="py-24 md:py-32" style={{ background: "hsl(40, 30%, 99%)" }}>
    <div className="container mx-auto px-6">
      <div className="max-w-3xl mx-auto text-center">
        <AnimatedElement>
          <span
            className="inline-block mb-6 uppercase"
            style={{ fontSize: 11, fontWeight: 700, letterSpacing: "0.2em", color: "hsl(35, 50%, 45%)" }}
          >
            From the founder
          </span>
        </AnimatedElement>

        <AnimatedElement>
          <blockquote>
            <p
              className="text-balance"
              style={{
                fontSize: "clamp(18px, 2vw, 24px)",
                lineHeight: 1.7,
                fontWeight: 400,
                color: "hsl(220, 9%, 25%)",
                fontStyle: "italic",
              }}
            >
              "I built BizzyBee because I lived this story myself. Running a window cleaning business
              with 840 customers, I was drowning in messages every evening. The irony? The busier I got,
              the worse my customer service became. I knew AI could fix this — not by replacing me,
              but by giving me my evenings back."
            </p>
          </blockquote>
        </AnimatedElement>

        <AnimatedElement>
          <div className="mt-8 flex items-center justify-center gap-3">
            <div
              className="w-10 h-10 rounded-full flex items-center justify-center"
              style={{ background: "hsl(35, 55%, 55%)", color: "white", fontSize: 14, fontWeight: 700 }}
            >
              MC
            </div>
            <div className="text-left">
              <span className="block text-sm font-semibold" style={{ color: "hsl(220, 9%, 20%)" }}>
                Michael Carbon
              </span>
              <span
                className="block uppercase"
                style={{ fontSize: 10, fontWeight: 600, letterSpacing: "0.1em", color: "hsl(220, 9%, 55%)" }}
              >
                Founder, BizzyBee
              </span>
            </div>
          </div>
        </AnimatedElement>

        <AnimatedElement>
          <div
            className="mt-10 flex items-center justify-center gap-6 flex-wrap"
            style={{ fontSize: 12, fontWeight: 500, color: "hsl(220, 9%, 55%)" }}
          >
            <span className="flex items-center gap-1.5">
              <span style={{ color: "hsl(35, 55%, 55%)" }}>✦</span> 840 customers managed
            </span>
            <span className="flex items-center gap-1.5">
              <span style={{ color: "hsl(35, 55%, 55%)" }}>✦</span> Built for real trades businesses
            </span>
            <span className="flex items-center gap-1.5">
              <span style={{ color: "hsl(35, 55%, 55%)" }}>✦</span> For UK service businesses
            </span>
          </div>
        </AnimatedElement>
      </div>
    </div>
  </AnimatedSection>
);

export default Testimonials;
