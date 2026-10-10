"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { ArrowLeft } from "lucide-react";
import Link from "next/link";
import toast from "react-hot-toast";
import { authClient } from "@/lib/auth-client";

export default function ProfileUpdateForm({ currentName }) {
  const router = useRouter();
  const [name, setName] = useState(currentName);
  const [saving, setSaving] = useState(false);

  async function updateName(event) {
    event.preventDefault();
    setSaving(true);
    const { error } = await authClient.updateUser({ name: name.trim() });

    if (error) {
      toast.error(error.message || "তথ্য আপডেট করা যায়নি");
      setSaving(false);
      return;
    }

    toast.success("নাম আপডেট হয়েছে");
    router.push("/profile");
    router.refresh();
    setSaving(false);
  }

  return (
    <section className="profile-panel">
      <div className="auth-panel-top">
        <span className="route-kicker">প্রোফাইল সেটিংস</span>
        <h1>ব্যক্তিগত তথ্য আপডেট</h1>
        <p>আপনার প্রোফাইলে দেখানো নাম পরিবর্তন করুন।</p>
      </div>
      <form className="auth-form" onSubmit={updateName}>
        <label className="field-label">নাম<input className="field-input" value={name} onChange={(event) => setName(event.target.value)} minLength={2} required /></label>
        <div className="profile-actions">
          <button className="button button-primary" type="submit" disabled={saving}>{saving ? "আপডেট হচ্ছে…" : "তথ্য আপডেট করুন"}</button>
          <Link className="button button-quiet" href="/profile"><ArrowLeft size={15} /> ফিরে যান</Link>
        </div>
      </form>
    </section>
  );
}