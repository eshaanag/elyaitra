export default function ContactPage() {
  return (
    <main className="min-h-screen bg-background text-foreground px-6 py-12">
      <div className="max-w-3xl mx-auto">
        <h1 className="text-3xl font-bold mb-6">Contact Us</h1>

        <p className="text-sm text-muted-foreground mb-8">
          We’re here to help. Reach out if you have questions or face any issues
          while using Elyaitra.
        </p>

        <section className="space-y-6 text-base leading-relaxed">
          <p>
            Elyaitra is designed to be simple and reliable, but if you need
            support related to access, payments, or technical issues, feel free
            to contact us.
          </p>

          <h2 className="text-xl font-semibold">How to Reach Us</h2>
          <p>
            You can email us at:
          </p>

          <p className="font-medium">support@elyaitra.com</p>

          <p>
            Please include your registered email address and a brief description
            of the issue so we can assist you faster.
          </p>

          <h2 className="text-xl font-semibold">Support Scope</h2>
          <ul className="list-disc pl-6 space-y-2">
            <li>Login or access issues</li>
            <li>Payment or refund-related queries</li>
            <li>Technical problems with the platform</li>
            <li>General product questions</li>
          </ul>

          <h2 className="text-xl font-semibold">Response Time</h2>
          <p>
            We aim to respond to all support emails within <strong>24–48 hours</strong>.
          </p>

          <h2 className="text-xl font-semibold">Note</h2>
          <p>
            Elyaitra provides exam-focused academic assistance. We do not offer
            personal tutoring, live support, or exam guarantees.
          </p>
        </section>
      </div>
    </main>
  );
}
