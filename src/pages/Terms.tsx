import { AnimatedSection, AnimatedElement } from "@/lib/motion";
import PendingMarker, { LegalDraftBanner } from "@/components/PendingMarker";

const Terms = () => (
  <main>
    <AnimatedSection className="py-24 md:py-32 pt-36" style={{ background: "hsl(40, 30%, 99%)" }}>
      <div className="container mx-auto px-6">
        <AnimatedElement className="max-w-3xl mx-auto prose prose-neutral">
          <h1
            className="text-3xl md:text-4xl font-bold mb-8"
            style={{ color: "hsl(220, 9%, 15%)", letterSpacing: "-0.02em" }}
          >
            Terms of Service
          </h1>
          <p className="text-sm mb-4" style={{ color: "hsl(220, 9%, 50%)" }}>
            Last updated: <PendingMarker>Draft, 3 October 2026</PendingMarker>
          </p>
          <LegalDraftBanner />

          <div className="space-y-8" style={{ color: "hsl(220, 9%, 30%)", fontSize: 15, lineHeight: 1.8 }}>
            <section>
              <h2 className="text-xl font-bold mb-3" style={{ color: "hsl(220, 9%, 15%)" }}>1. Agreement</h2>
              <p>
                By accessing or using BizzyBee, you agree to be bound by these Terms of Service.
                BizzyBee is operated by{" "}
                <PendingMarker>Legal entity to be confirmed: name and address</PendingMarker>.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-bold mb-3" style={{ color: "hsl(220, 9%, 15%)" }}>2. Service description</h2>
              <p>
                BizzyBee provides a shared business inbox for email (BizzyBee Inbox) and, on the
                AI Assistant plan, AI sorting and draft replies, for UK service businesses.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-bold mb-3" style={{ color: "hsl(220, 9%, 15%)" }}>3. Subscriptions and billing</h2>
              <p>
                BizzyBee operates on a monthly subscription basis, paid in advance before you connect
                a mailbox. Prices are shown excluding VAT, which is added at checkout. Payments are
                processed securely via Stripe. You may cancel your subscription at any time, with no
                contracts and no penalties. If you ask within 30 days of your first payment, we will
                refund that payment in full.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-bold mb-3" style={{ color: "hsl(220, 9%, 15%)" }}>4. Your responsibilities</h2>
              <ul className="list-disc pl-6 mt-2 space-y-1">
                <li>You must provide accurate account information</li>
                <li>You are responsible for the content processed through BizzyBee</li>
                <li>You must not use BizzyBee for unlawful purposes</li>
                <li>You must keep your login credentials secure</li>
              </ul>
            </section>

            <section>
              <h2 className="text-xl font-bold mb-3" style={{ color: "hsl(220, 9%, 15%)" }}>5. AI-generated content</h2>
              <p>
                BizzyBee uses AI to draft responses and classify messages. While we strive for
                accuracy, AI-generated content may occasionally contain errors. You are responsible
                for reviewing AI-drafted messages before they are sent on your behalf.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-bold mb-3" style={{ color: "hsl(220, 9%, 15%)" }}>6. Data and privacy</h2>
              <p>
                Your use of BizzyBee is also governed by our{" "}
                <a href="/privacy" style={{ color: "hsl(35, 55%, 55%)" }}>Privacy Policy</a>.
                We take data protection seriously and comply with UK GDPR.
              </p>
              <p className="mt-3">
                For the emails of your customers that pass through BizzyBee, your business is the controller and
                BizzyBee processes them on your behalf.{" "}
                <PendingMarker>Data processing terms (UK GDPR Article 28) to be added after legal review</PendingMarker>
              </p>
            </section>

            <section>
              <h2 className="text-xl font-bold mb-3" style={{ color: "hsl(220, 9%, 15%)" }}>7. Limitation of liability</h2>
              <p>
                BizzyBee is provided "as is". We do not guarantee uninterrupted service or
                that AI-generated content will be error-free. Our liability is limited to the
                amount you have paid for the service in the preceding 12 months.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-bold mb-3" style={{ color: "hsl(220, 9%, 15%)" }}>8. Changes to terms</h2>
              <p>
                We may update these terms from time to time. We will notify you of significant
                changes via email. Continued use of the service constitutes acceptance of
                updated terms.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-bold mb-3" style={{ color: "hsl(220, 9%, 15%)" }}>9. Contact</h2>
              <p>
                Questions about these terms? Email us at{" "}
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

export default Terms;
