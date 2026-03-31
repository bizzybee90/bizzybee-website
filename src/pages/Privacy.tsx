import { AnimatedSection, AnimatedElement } from "@/lib/motion";

const Privacy = () => (
  <main>
    <AnimatedSection className="py-24 md:py-32 pt-36" style={{ background: "hsl(40, 30%, 99%)" }}>
      <div className="container mx-auto px-6">
        <AnimatedElement className="max-w-3xl mx-auto prose prose-neutral">
          <h1
            className="text-3xl md:text-4xl font-bold mb-8"
            style={{ color: "hsl(220, 9%, 15%)", letterSpacing: "-0.02em" }}
          >
            Privacy Policy
          </h1>
          <p className="text-sm mb-8" style={{ color: "hsl(220, 9%, 50%)" }}>
            Last updated: March 2026
          </p>

          <div className="space-y-8" style={{ color: "hsl(220, 9%, 30%)", fontSize: 15, lineHeight: 1.8 }}>
            <section>
              <h2 className="text-xl font-bold mb-3" style={{ color: "hsl(220, 9%, 15%)" }}>1. Who we are</h2>
              <p>
                BizzyBee Ltd is a company registered in England &amp; Wales. We provide AI-powered
                customer service tools for UK service businesses. This policy explains how we collect,
                use and protect your personal data.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-bold mb-3" style={{ color: "hsl(220, 9%, 15%)" }}>2. What data we collect</h2>
              <p>When you use BizzyBee, we may collect:</p>
              <ul className="list-disc pl-6 mt-2 space-y-1">
                <li>Account information (name, email address, business name)</li>
                <li>Email content you connect to BizzyBee for AI processing</li>
                <li>WhatsApp and SMS messages routed through BizzyBee</li>
                <li>Usage data and analytics</li>
                <li>Payment and billing information (processed by Stripe)</li>
              </ul>
            </section>

            <section>
              <h2 className="text-xl font-bold mb-3" style={{ color: "hsl(220, 9%, 15%)" }}>3. How we use your data</h2>
              <p>We use your data to:</p>
              <ul className="list-disc pl-6 mt-2 space-y-1">
                <li>Provide and improve our AI customer service tools</li>
                <li>Learn your communication style to draft accurate responses</li>
                <li>Classify and route incoming messages</li>
                <li>Process payments and manage subscriptions</li>
                <li>Send service-related communications</li>
              </ul>
            </section>

            <section>
              <h2 className="text-xl font-bold mb-3" style={{ color: "hsl(220, 9%, 15%)" }}>4. Data storage and security</h2>
              <p>
                Your data is stored securely on servers within the European Union. We use
                industry-standard encryption in transit and at rest. We do not sell your data
                to third parties.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-bold mb-3" style={{ color: "hsl(220, 9%, 15%)" }}>5. Cookies</h2>
              <p>
                We use essential cookies to keep you logged in and functional cookies to remember
                your preferences. We do not use advertising or tracking cookies.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-bold mb-3" style={{ color: "hsl(220, 9%, 15%)" }}>6. Your rights</h2>
              <p>Under UK GDPR, you have the right to:</p>
              <ul className="list-disc pl-6 mt-2 space-y-1">
                <li>Access the personal data we hold about you</li>
                <li>Request correction of inaccurate data</li>
                <li>Request deletion of your data</li>
                <li>Object to processing of your data</li>
                <li>Data portability</li>
              </ul>
            </section>

            <section>
              <h2 className="text-xl font-bold mb-3" style={{ color: "hsl(220, 9%, 15%)" }}>7. Contact us</h2>
              <p>
                For privacy-related enquiries, email us at{" "}
                <a href="mailto:hello@bizzybee.co.uk" style={{ color: "hsl(35, 55%, 55%)" }}>
                  hello@bizzybee.co.uk
                </a>.
              </p>
            </section>
          </div>
        </AnimatedElement>
      </div>
    </AnimatedSection>
  </main>
);

export default Privacy;
