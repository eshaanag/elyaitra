"use client";

import { useEffect } from "react";
import { useParams, useRouter } from "next/navigation";
import TutorChat from "@/components/tutor/TutorChat";

const ALLOWED_SUBJECTS = [
  "maths",
  "programming",
  "physics",
  "electrical",
];

export default function TutorPage() {
  const params = useParams();
  const router = useRouter();

  const rawSubject = params.subject;
  const subject =
    typeof rawSubject === "string"
      ? rawSubject
      : Array.isArray(rawSubject)
      ? rawSubject[0]
      : "";

  useEffect(() => {
    if (!subject || !ALLOWED_SUBJECTS.includes(subject)) {
      router.replace("/subjects");
    }
  }, [subject, router]);

  if (!subject) return null;

  return <TutorChat subject={subject} />;
}
