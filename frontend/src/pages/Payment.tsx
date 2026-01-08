import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const API_URL = import.meta.env.VITE_API_URL;
const RAZORPAY_KEY = import.meta.env.VITE_RAZORPAY_KEY_ID;

const Payment = () => {
  const navigate = useNavigate();

  const [checking, setChecking] = useState(true);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [razorpayReady, setRazorpayReady] = useState(false);

  // 1️⃣ Load Razorpay script
  useEffect(() => {
    const script = document.createElement("script");
    script.src = "https://checkout.razorpay.com/v1/checkout.js";
    script.async = true;

    script.onload = () => setRazorpayReady(true);
    script.onerror = () =>
      setError("Failed to load payment system. Please refresh.");

    document.body.appendChild(script);

    return () => {
      document.body.removeChild(script);
    };
  }, []);

  // 2️⃣ Check payment status
  useEffect(() => {
    const checkPaymentStatus = async () => {
      const userId = localStorage.getItem("user_id");

      if (!userId) {
        navigate("/login", { replace: true });
        return;
      }

      try {
        const res = await fetch(
          `${API_URL}/access/subjects?user_id=${userId}`
        );
        const data = await res.json();

        if (data.allowed) {
          navigate("/subjects", { replace: true });
          return;
        }
      } catch {
        setError("Failed to verify payment status");
      } finally {
        setChecking(false);
      }
    };

    checkPaymentStatus();
  }, [navigate]);

  // 3️⃣ Handle payment
  const handlePayment = async () => {
    if (!razorpayReady) {
      setError("Payment system not ready. Please wait.");
      return;
    }

    setLoading(true);
    setError("");

    try {
      // Create order
      const orderRes = await fetch(`${API_URL}/payments/create-order`, {
        method: "POST",
      });
      const order = await orderRes.json();

      const razorpay = new (window as any).Razorpay({
        key: RAZORPAY_KEY,
        amount: order.amount,
        currency: "INR",
        order_id: order.id,
        name: "Elyaitra",
        description: "IA-2 Complete Access",

        handler: async (response: any) => {
          await fetch(`${API_URL}/payments/record`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
              user_id: Number(localStorage.getItem("user_id")),
              amount: 1,
              razorpay_payment_id: response.razorpay_payment_id,
              razorpay_order_id: response.razorpay_order_id,
              razorpay_signature: response.razorpay_signature,
            }),
          });

          navigate("/subjects", { replace: true });
        },
      });

      razorpay.open();
    } catch {
      setError("Payment failed. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  // UI
  if (checking) {
    return (
      <div className="min-h-screen flex items-center justify-center text-white">
        Checking payment status...
      </div>
    );
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-background px-4">
      <div className="w-full max-w-md rounded-xl bg-white p-8 text-center">
        <h1 className="text-2xl font-bold mb-2">IA-2 Complete Access</h1>
        <p className="text-gray-600 mb-6">
          One-time payment • No subscription
        </p>

        <div className="text-4xl font-extrabold mb-4">₹1</div>

        {error && (
          <p className="text-sm text-red-500 mb-4">{error}</p>
        )}

        <button
          onClick={handlePayment}
          disabled={loading || !razorpayReady}
          className="w-full rounded-lg bg-black py-3 text-white font-semibold disabled:opacity-60"
        >
          {loading
            ? "Processing..."
            : razorpayReady
            ? "Pay & Continue"
            : "Loading payment..."}
        </button>

        <p className="mt-4 text-xs text-gray-500">
          Secure payments powered by Razorpay
        </p>
      </div>
    </div>
  );
};

export default Payment;
