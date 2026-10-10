import Link from "next/link";
import { ArrowLeft, SearchX } from "lucide-react";

export default function NotFound() {
  return (
    <main className="route-main not-found-state">
      <span className="not-found-number"><SearchX size={52} strokeWidth={1.5} /></span>
      <h1>এই পৃষ্ঠাটি খুঁজে পাওয়া যায়নি</h1>
      <p>ঠিকানাটি বদলে থাকতে পারে, অথবা এই পণ্য বা বিভাগটি আর উপলভ্য নেই।</p>
      <Link className="button button-primary" href="/"><ArrowLeft size={15} /> হোম পেজে ফিরে যান</Link>
    </main>
  );
}