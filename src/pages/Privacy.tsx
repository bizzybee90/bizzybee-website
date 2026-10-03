import { AnimatedSection, AnimatedElement } from "@/lib/motion";
import PendingMarker, { LegalDraftBanner } from "@/components/PendingMarker";

// DRAFT for legal review (3 October 2026). Built from what the app actually
// sends to whom; see the review on bizzybee-website#1. Not legal advice.

const h2 = { color: "hsl(220, 9%, 15%)" };
const link = { color: "hsl(35, 55%, 55%)" };

const processors: { name: string; purpose: string; data: string; where: React.ReactNode }[] = [
  {
    name: "Supabase",
    purpose: "Hosts our database, file storage and server functions",
    data: "Everything stored in your BizzyBee account, including emails",
    where: <PendingMarker>Region to confirm</PendingMarker>,
  },
  {
    name: "Nylas",
    purpose: "Connects your mailbox, brings in past emails, receives new ones and sends your replies",
    data: "Email content, senders, recipients and attachments",
    where: (
      <>
        USA (default data centre) <PendingMarker>Confirm region used at launch</PendingMarker>
      </>
    ),
  },
  {
    name: "Aurinko",
    purpose: "Older mailbox connector",
    data: "Email content, senders, recipients and attachments",
    where: <PendingMarker>Confirm whether used at launch, and where</PendingMarker>,
  },
  {
    name: "OpenAI",
    purpose: "AI Assistant plan only: sorts emails, drafts replies and learns your writing style",
    data: "Email content and the business details you add",
    where: "USA",
  },
  {
    name: "xAI",
    purpose: "Alternative AI provider",
    data: "Email content and the business details you add",
    where: <PendingMarker>Remove if not enabled at launch</PendingMarker>,
  },
  {
    name: "Google (Places)",
    purpose: "Looks up your business name and address while you set up your account",
    data: "The business name and location you search for",
    where: "USA",
  },
  {
    name: "Stripe",
    purpose: "Takes payments and manages subscriptions",
    data: "Name, email address and billing details. We never see your full card number",
    where: "UK, EU and USA",
  },
  {
    name: "Postmark",
    purpose: "Sends account emails, such as sign-in links and receipts",
    data: "Name and email address",
    where: "USA",
  },
  {
    name: "Sentry",
    purpose: "Reports errors in the app so we can fix them",
    data: "Technical details of the error. It is set up not to collect personal data by default",
    where: <PendingMarker>Region to confirm</PendingMarker>,
  },
  {
    name: "Cloudflare",
    purpose: "Hosts and protects the website and app",
    data: "IP address and request logs",
    where: "Global network",
  },
];

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
          <p className="text-sm mb-4" style={{ color: "hsl(220, 9%, 50%)" }}>
            Last updated: <PendingMarker>Draft, 3 October 2026</PendingMarker>
          </p>
          <LegalDraftBanner />

          <div className="space-y-8" style={{ color: "hsl(220, 9%, 30%)", fontSize: 15, lineHeight: 1.8 }}>
            <section>
              <h2 className="text-xl font-bold mb-3" style={h2}>1. Who we are</h2>
              <p>
                BizzyBee is run by <PendingMarker>BizzyBee Ltd: confirm legal name</PendingMarker>, a company
                registered in England &amp; Wales, company number <PendingMarker>to confirm</PendingMarker>,
                registered office <PendingMarker>to confirm</PendingMarker>. Our ICO registration number is{" "}
                <PendingMarker>to confirm</PendingMarker>.
              </p>
              <p className="mt-3">
                BizzyBee gives UK service businesses one inbox for their customer email and, on the AI Assistant
                plan, AI sorting and draft replies. This policy explains what personal data we handle, why, who
                else handles it for us, and your rights.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-bold mb-3" style={h2}>2. Our role: controller and processor</h2>
              <ul className="list-disc pl-6 mt-2 space-y-1">
                <li>
                  For your own account details and billing, BizzyBee is the <strong>controller</strong>.
                </li>
                <li>
                  For the emails of your customers that come through the mailbox you connect, your business is the
                  controller, and BizzyBee is your <strong>processor</strong>. We handle them only to run BizzyBee
                  for you, under the data processing terms in our Terms of Service{" "}
                  <PendingMarker>Data processing terms to be added</PendingMarker>.
                </li>
              </ul>
            </section>

            <section>
              <h2 className="text-xl font-bold mb-3" style={h2}>3. What data we handle</h2>
              <ul className="list-disc pl-6 mt-2 space-y-1">
                <li>Account details: your name, email address and business name</li>
                <li>
                  Emails from the mailbox you connect, including the past emails brought in when you connect it
                </li>
                <li>Business details you add, such as your services, prices and the areas you cover</li>
                <li>Billing details, handled by Stripe</li>
                <li>Technical data needed to run and secure the service, such as IP addresses and error reports</li>
              </ul>
            </section>

            <section>
              <h2 className="text-xl font-bold mb-3" style={h2}>4. Why we use it, and our lawful basis</h2>
              <ul className="list-disc pl-6 mt-2 space-y-1">
                <li>
                  <strong>To provide the service you pay for</strong> (contract): your account, your connected
                  mailbox, your inbox and, on the AI Assistant plan, sorting and draft replies.
                </li>
                <li>
                  <strong>To keep the service secure and working</strong> (legitimate interests): preventing misuse,
                  and finding and fixing errors.
                </li>
                <li>
                  <strong>To meet legal duties</strong> (legal obligation): keeping billing and tax records.
                </li>
              </ul>
              <p className="mt-3">
                On the Inbox plan, your emails are not sent to any AI provider. We do not sell your data or your
                customers' data.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-bold mb-3" style={h2}>5. Who handles data for us</h2>
              <p>These companies process data on our behalf, under contract:</p>
              <div className="overflow-x-auto mt-3">
                <table className="w-full text-sm" style={{ borderCollapse: "collapse" }}>
                  <thead>
                    <tr style={{ textAlign: "left", borderBottom: "1px solid #e5e7eb" }}>
                      <th className="py-2 pr-3">Provider</th>
                      <th className="py-2 pr-3">What for</th>
                      <th className="py-2 pr-3">Data</th>
                      <th className="py-2">Where</th>
                    </tr>
                  </thead>
                  <tbody>
                    {processors.map((p) => (
                      <tr key={p.name} style={{ borderBottom: "1px solid #f0f0f0", verticalAlign: "top" }}>
                        <td className="py-2 pr-3 font-medium">{p.name}</td>
                        <td className="py-2 pr-3">{p.purpose}</td>
                        <td className="py-2 pr-3">{p.data}</td>
                        <td className="py-2">{p.where}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </section>

            <section>
              <h2 className="text-xl font-bold mb-3" style={h2}>6. Transfers outside the UK</h2>
              <p>
                Some of these providers process data outside the UK, mainly in the USA. Where they do, we rely on{" "}
                <PendingMarker>
                  Safeguard to confirm for each provider, for example UK–US data bridge certification or the UK
                  International Data Transfer Addendum
                </PendingMarker>
                .
              </p>
            </section>

            <section>
              <h2 className="text-xl font-bold mb-3" style={h2}>7. How long we keep it</h2>
              <ul className="list-disc pl-6 mt-2 space-y-1">
                <li>
                  Account details: while your subscription is active, then{" "}
                  <PendingMarker>period to confirm</PendingMarker>
                </li>
                <li>
                  Emails and business details: while your subscription is active. What happens when you disconnect
                  a mailbox or close your account: <PendingMarker>to confirm</PendingMarker>
                </li>
                <li>
                  Billing records: <PendingMarker>period to confirm; UK tax rules usually need 6 years</PendingMarker>
                </li>
                <li>
                  Error reports and logs: <PendingMarker>period to confirm</PendingMarker>
                </li>
              </ul>
            </section>

            <section>
              <h2 className="text-xl font-bold mb-3" style={h2}>8. Security</h2>
              <p>
                Data is encrypted in transit and at rest by our hosting and mailbox providers. Access to your
                account is limited to the people you allow.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-bold mb-3" style={h2}>9. Cookies</h2>
              <p>
                The website uses no advertising, analytics or tracking cookies. The app uses essential cookies and
                local storage to keep you signed in and remember your settings.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-bold mb-3" style={h2}>10. Your rights</h2>
              <p>Under UK GDPR, you have the right to:</p>
              <ul className="list-disc pl-6 mt-2 space-y-1">
                <li>Access the personal data we hold about you</li>
                <li>Ask us to correct inaccurate data</li>
                <li>Ask us to delete your data</li>
                <li>Ask us to restrict how we use it, or object to our use of it</li>
                <li>Receive your data in a portable format</li>
              </ul>
              <p className="mt-3">
                If your customer contacts us about their data in your inbox, we'll pass the request to you, because
                your business is the controller for it.
              </p>
              <p className="mt-3">
                You can also complain to the Information Commissioner's Office at{" "}
                <a href="https://ico.org.uk/make-a-complaint/" style={link}>
                  ico.org.uk
                </a>
                . We'd appreciate the chance to put things right first.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-bold mb-3" style={h2}>11. Contact us</h2>
              <p>
                For privacy questions or requests, email{" "}
                <a href="mailto:hello@bizzybee.co.uk" style={link}>
                  hello@bizzybee.co.uk
                </a>
                .
              </p>
            </section>
          </div>
        </AnimatedElement>
      </div>
    </AnimatedSection>
  </main>
);

export default Privacy;
