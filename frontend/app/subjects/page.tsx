"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { API_BASE_URL } from "@/lib/api";

export default function SubjectsPage() {
  const router = useRouter();

  useEffect(() => {
    const userId = localStorage.getItem("user_id");

    if (!userId) {
      router.push("/auth");
      return;
    }

    async function checkPayment() {
      const res = await fetch(
  `${API_BASE_URL}/payments/status?user_id=${userId}`
);


      const data = await res.json();

      if (!data.paid) {
        router.push("/payment");
      }
    }

    checkPayment();
  }, [router]);

  return (
    <div style={{ padding: 40 }}>
      <h1>Subjects</h1>
      <p>You have access. Subjects will be listed here.</p>
    </div>
  );
}
