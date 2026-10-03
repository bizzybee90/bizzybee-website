import { AnimatedSection, AnimatedElement } from "@/lib/motion";
import FinalCTA from "@/components/FinalCTA";
import StatsBar from "@/components/StatsBar";

const About = () => (
  <main>
    <AnimatedSection className="pt-32 pb-24 bg-background">
      <div className="container mx-auto px-6">
        <div className="max-w-3xl mx-auto">
          <AnimatedElement>
            <span className="font-mono-label text-primary mb-3 inline-block">Our Story</span>
          </AnimatedElement>
          <AnimatedElement>
            <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-8">
              We built BizzyBee because we lived the problem
            </h1>
          </AnimatedElement>
          <AnimatedElement>
            <div className="prose prose-lg max-w-none">
              <p className="text-muted-foreground leading-relaxed mb-6">
                BizzyBee was born from frustration. Our founder ran a window cleaning business with 840 customers and hit the wall every growing service business hits: more customers meant more chaos.
              </p>
              <p className="text-muted-foreground leading-relaxed mb-6">
                An inbox that never stopped filling. Quotes typed out on the sofa at 10 PM. Leads going cold because you couldn't reply fast enough. Sound familiar?
              </p>
              <p className="text-muted-foreground leading-relaxed mb-6">
                We knew AI could fix this — but every solution on the market was built for enterprise. None of them understood the reality of a sole trader or small team juggling tools, vans and an inbox that never stops.
              </p>
              <p className="text-muted-foreground leading-relaxed mb-6">
                So we built BizzyBee for UK service businesses: one calm inbox for every customer email, and, if you want it, an assistant that drafts each reply in your voice for you to check and send.
              </p>
              <p className="text-foreground leading-relaxed font-medium">
                We're opening to our first customers now. If that's you, the first 50 on the AI Assistant plan keep a founder price for as long as they stay.
              </p>
            </div>
          </AnimatedElement>
        </div>
      </div>
    </AnimatedSection>
    <StatsBar />
    <FinalCTA />
  </main>
);

export default About;
