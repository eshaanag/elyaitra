export default function RefundPolicyPage() {
  return (
    <main className="min-h-screen bg-background text-foreground px-6 py-12">
      <div className="max-w-3xl mx-auto">
        <h1 className="text-3xl font-bold mb-6">
          Cancellation & Refund Policy
        </h1>

        <p className="text-sm text-muted-foreground mb-8">
          Last updated: {new Date().toLocaleDateString("en-IN")}
        </p>

        <section className="space-y-6 text-base leading-relaxed">
          <p>
            Elyaitra provides instant digital access to a syllabus-specific AI
            tutor for first-semester engineering students. Please read this
            policy carefully before making a payment.
          </p>

          <h2 className="text-xl font-semibold">1. Nature of the Product</h2>
          <ul className="list-disc pl-6 space-y-2">
            <li>One-time payment of ₹50</li>
            <li>Instant access to a digital AI tutor</li>
            <li>Not a subscription</li>
            <li>No physical goods involved</li>
          </ul>

          <h2 className="text-xl font-semibold">2. Cancellation Policy</h2>
          <p>
            Once payment is completed and access is granted, the purchase cannot
            be cancelled. There is no trial period or pause option.
          </p>

          <h2 className="text-xl font-semibold">3. Refund Policy</h2>

          <p className="font-medium">
            Refunds are <span className="underline">not</span> provided if:
          </p>
          <ul className="list-disc pl-6 space-y-2">
            <li>You have accessed the tutor after payment</li>
            <li>You did not use the product after purchase</li>
            <li>You expected features not mentioned on the website</li>
            <li>You changed your mind after payment</li>
            <li>You found the product not useful for your exam</li>
          </ul>

          <p className="font-medium mt-4">
            Refunds may be considered only if:
          </p>
          <ul className="list-disc pl-6 space-y-2">
            <li>Payment was successful but access was not granted</li>
            <li>A confirmed technical error prevented usage</li>
            <li>A duplicate payment was made for the same account</li>
          </ul>

          <h2 className="text-xl font-semibold">4. Refund Requests</h2>
          <p>
            If you believe you are eligible for a refund, email us within{" "}
            <strong>48 hours</strong> of the transaction at:
          </p>

          <p className="font-medium mt-2">support@elyaitra.com</p>

          <p className="mt-2">
            Please include your registered email and payment reference ID.
          </p>

          <h2 className="text-xl font-semibold">5. Payment Processing</h2>
          <p>
            Payments are handled through Razorpay. Elyaitra is not responsible
            for bank delays or UPI processing issues.
          </p>

          <h2 className="text-xl font-semibold">6. Policy Updates</h2>
          <p>
            This policy may be updated periodically. Any changes will be posted
            on this page.
          </p>
        </section>
      </div>
    </main>
  );
}
