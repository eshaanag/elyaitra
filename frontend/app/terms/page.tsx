export default function TermsAndConditionsPage() {
  return (
    <main className="min-h-screen bg-background text-foreground px-6 py-12">
      <div className="max-w-3xl mx-auto">
        <h1 className="text-3xl font-bold mb-6">
          Terms & Conditions
        </h1>

        <p className="text-sm text-muted-foreground mb-8">
          Last updated: {new Date().toLocaleDateString("en-IN")}
        </p>

        <section className="space-y-6 text-base leading-relaxed">
          <p>
            These Terms & Conditions govern your use of Elyaitra. By accessing or
            using our website and services, you agree to be bound by these terms.
            If you do not agree, please do not use the service.
          </p>

          <h2 className="text-xl font-semibold">1. Service Description</h2>
          <p>
            Elyaitra provides a paid, syllabus-specific AI tutor designed to help
            first-semester engineering students prepare for exams. The service
            offers instant digital access after a one-time payment.
          </p>

          <h2 className="text-xl font-semibold">2. Eligibility</h2>
          <p>
            You must be at least 18 years old or have permission from a parent or
            guardian to use Elyaitra.
          </p>

          <h2 className="text-xl font-semibold">3. Account Access</h2>
          <ul className="list-disc pl-6 space-y-2">
            <li>Login is email-based only</li>
            <li>You are responsible for access to your account</li>
            <li>Sharing access with others is not permitted</li>
          </ul>

          <h2 className="text-xl font-semibold">4. Payments</h2>
          <ul className="list-disc pl-6 space-y-2">
            <li>Access requires a one-time payment of ₹50</li>
            <li>No subscriptions or recurring charges</li>
            <li>Payments are processed securely via Razorpay</li>
          </ul>

          <h2 className="text-xl font-semibold">5. Refunds & Cancellations</h2>
          <p>
            Refunds and cancellations are governed by our Cancellation & Refund
            Policy. Once access is granted, the service is considered delivered.
          </p>

          <h2 className="text-xl font-semibold">6. Acceptable Use</h2>
          <p>You agree not to:</p>
          <ul className="list-disc pl-6 space-y-2">
            <li>Misuse or attempt to disrupt the service</li>
            <li>Reverse engineer or copy the platform</li>
            <li>Use the service for unlawful purposes</li>
            <li>Attempt to bypass payment or access controls</li>
          </ul>

          <h2 className="text-xl font-semibold">7. AI Limitations</h2>
          <p>
            Elyaitra provides exam-focused assistance strictly based on the
            syllabus. We do not guarantee marks, grades, or exam outcomes.
          </p>

          <h2 className="text-xl font-semibold">8. Service Availability</h2>
          <p>
            We aim to keep Elyaitra available at all times, but uninterrupted
            access is not guaranteed. Temporary downtime may occur due to
            maintenance or technical issues.
          </p>

          <h2 className="text-xl font-semibold">9. Limitation of Liability</h2>
          <p>
            Elyaitra is provided on an “as-is” basis. We are not liable for any
            direct or indirect losses arising from use of the service.
          </p>

          <h2 className="text-xl font-semibold">10. Changes to Terms</h2>
          <p>
            We may update these Terms & Conditions from time to time. Continued
            use of the service implies acceptance of updated terms.
          </p>

          <h2 className="text-xl font-semibold">11. Contact</h2>
          <p>
            If you have any questions regarding these Terms, contact us at:
          </p>
          <p className="font-medium">support@elyaitra.com</p>
        </section>
      </div>
    </main>
  );
}
