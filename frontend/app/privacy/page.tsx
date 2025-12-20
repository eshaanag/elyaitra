export default function PrivacyPolicyPage() {
  return (
    <main className="min-h-screen bg-background text-foreground px-6 py-12">
      <div className="max-w-3xl mx-auto">
        <h1 className="text-3xl font-bold mb-6">Privacy Policy</h1>

        <p className="text-sm text-muted-foreground mb-8">
          Last updated: {new Date().toLocaleDateString("en-IN")}
        </p>

        <section className="space-y-6 text-base leading-relaxed">
          <p>
            Elyaitra values your privacy. This Privacy Policy explains how we
            collect, use, and protect your information when you use our website
            and services.
          </p>

          <h2 className="text-xl font-semibold">1. Information We Collect</h2>
          <p>We collect only the minimum information required to operate the product.</p>
          <ul className="list-disc pl-6 space-y-2">
            <li>Email address (used for login and identification)</li>
            <li>Payment status (paid or unpaid)</li>
            <li>Basic usage data for service stability</li>
          </ul>

          <p>
            We do <strong>not</strong> collect passwords, OTPs, phone numbers, or
            personal academic records.
          </p>

          <h2 className="text-xl font-semibold">2. How We Use Your Information</h2>
          <ul className="list-disc pl-6 space-y-2">
            <li>To authenticate access to Elyaitra</li>
            <li>To verify payment status</li>
            <li>To provide access to the AI tutor</li>
            <li>To maintain platform security and reliability</li>
          </ul>

          <h2 className="text-xl font-semibold">3. AI & Data Usage</h2>
          <p>
            Questions you ask the AI tutor may be processed by third-party AI
            providers (such as OpenAI or Google Gemini) strictly for generating
            responses.
          </p>
          <p>
            Your queries are <strong>not</strong> used to train our own models,
            and we do not sell or reuse them for marketing purposes.
          </p>

          <h2 className="text-xl font-semibold">4. Payments</h2>
          <p>
            Payments are processed securely through Razorpay. Elyaitra does not
            store your card, UPI, or bank details.
          </p>

          <h2 className="text-xl font-semibold">5. Data Sharing</h2>
          <p>
            We do not sell, rent, or trade your personal information. Data may
            only be shared if required by law or to operate essential services
            such as payment processing.
          </p>

          <h2 className="text-xl font-semibold">6. Data Security</h2>
          <p>
            We take reasonable technical and organizational measures to protect
            your data from unauthorized access, misuse, or disclosure.
          </p>

          <h2 className="text-xl font-semibold">7. Your Rights</h2>
          <p>
            You may request deletion of your account data by contacting us. We
            will process such requests where legally and technically feasible.
          </p>

          <h2 className="text-xl font-semibold">8. Policy Updates</h2>
          <p>
            This Privacy Policy may be updated from time to time. Any changes
            will be reflected on this page.
          </p>

          <h2 className="text-xl font-semibold">9. Contact Us</h2>
          <p>If you have questions about this Privacy Policy, contact us at:</p>
          <p className="font-medium">support@elyaitra.com</p>
        </section>
      </div>
    </main>
  );
}
