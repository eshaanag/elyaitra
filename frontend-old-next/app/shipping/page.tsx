export default function ShippingPolicyPage() {
  return (
    <main className="min-h-screen bg-background text-foreground px-6 py-12">
      <div className="max-w-3xl mx-auto">
        <h1 className="text-3xl font-bold mb-6">Shipping Policy</h1>

        <p className="text-sm text-muted-foreground mb-8">
          Last updated: {new Date().toLocaleDateString("en-IN")}
        </p>

        <section className="space-y-6 text-base leading-relaxed">
          <p>
            Elyaitra is a digital service and does not ship any physical goods.
            This Shipping Policy explains how access to our service is delivered
            after payment.
          </p>

          <h2 className="text-xl font-semibold">1. Digital Delivery</h2>
          <p>
            All products offered by Elyaitra are delivered digitally. No physical
            items are shipped to your address.
          </p>

          <h2 className="text-xl font-semibold">2. Access Timeline</h2>
          <ul className="list-disc pl-6 space-y-2">
            <li>Access is granted immediately after successful payment</li>
            <li>No shipping charges apply</li>
            <li>No delivery delays or transit times</li>
          </ul>

          <h2 className="text-xl font-semibold">3. Delivery Method</h2>
          <p>
            Once payment is confirmed, access to the AI tutor is unlocked for
            your account. You can use the service by logging in with your
            registered email.
          </p>

          <h2 className="text-xl font-semibold">4. Failed or Delayed Access</h2>
          <p>
            In rare cases, if payment is successful but access is not granted
            due to a technical issue, please contact us within 48 hours.
          </p>

          <p className="font-medium mt-2">support@elyaitra.com</p>

          <h2 className="text-xl font-semibold">5. International Availability</h2>
          <p>
            Since Elyaitra is a digital service, it can be accessed from any
            location with an internet connection. Availability may depend on
            payment provider support.
          </p>

          <h2 className="text-xl font-semibold">6. Policy Updates</h2>
          <p>
            This Shipping Policy may be updated from time to time. Any changes
            will be reflected on this page.
          </p>
        </section>
      </div>
    </main>
  );
}
