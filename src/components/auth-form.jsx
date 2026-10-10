"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { CodeXml, Globe } from "lucide-react";
import toast from "react-hot-toast";
import { authClient } from "@/lib/auth-client";

export default function AuthForm({ mode, callbackURL = "/", reason, registered, providers }) {
  const router = useRouter();
  const [submitting, setSubmitting] = useState(false);
  const isSignUp = mode === "signup";
  const safeCallback = callbackURL.startsWith("/") && !callbackURL.startsWith("//") ? callbackURL : "/";

  useEffect(() => {
    if (reason === "protected") toast("পণ্যের বিস্তারিত দেখতে আগে সাইন ইন করুন।", { id: "protected-route" });
    if (registered) toast.success("অ্যাকাউন্ট তৈরি হয়েছে। এবার সাইন ইন করুন।", { id: "registered-route" });
  }, [reason, registered]);

  async function submitForm(event) {
    event.preventDefault();
    setSubmitting(true);
    const formData = new FormData(event.currentTarget);
    const email = String(formData.get("email") || "");
    const password = String(formData.get("password") || "");

    try {
      const result = isSignUp
        ? await authClient.signUp.email({
            name: String(formData.get("name") || "").trim(),
            email,
            password,
            callbackURL: "/signin?registered=1",
          })
        : await authClient.signIn.email({ email, password, callbackURL: safeCallback });

      if (result.error) throw new Error(result.error.message || "অনুরোধটি সম্পন্ন করা যায়নি");

      if (isSignUp) {
        router.push("/signin?registered=1");
      } else {
        toast.success("সাইন ইন সফল হয়েছে");
        router.push(safeCallback);
        router.refresh();
      }
    } catch (error) {
      toast.error(error.message || "আবার চেষ্টা করুন");
    } finally {
      setSubmitting(false);
    }
  }

  async function socialSignIn(provider) {
    if (!providers[provider]) {
      toast.error(`${provider === "google" ? "Google" : "GitHub"} সাইন ইন চালু করতে OAuth credentials যোগ করুন।`);
      return;
    }

    setSubmitting(true);
    try {
      const { error } = await authClient.signIn.social({ provider, callbackURL: safeCallback });
      if (error) throw new Error(error.message || "সোশ্যাল সাইন ইন করা যায়নি");
    } catch (error) {
      toast.error(error.message || "আবার চেষ্টা করুন");
      setSubmitting(false);
    }
  }

  return (
    <section className="auth-panel">
      <div className="auth-panel-top">
        <span className="route-kicker">বাজার দর অ্যাকাউন্ট</span>
        <h1>{isSignUp ? "নতুন অ্যাকাউন্ট তৈরি করুন" : "আপনার অ্যাকাউন্টে সাইন ইন করুন"}</h1>
        <p>{isSignUp ? "আপনার বাজারদরের পছন্দগুলো এক জায়গায় রাখুন।" : "বাজারের বিস্তারিত দর দেখতে আপনার অ্যাকাউন্টে প্রবেশ করুন।"}</p>
      </div>

      <form
        className="auth-form"
        onInvalidCapture={(event) => {
          event.preventDefault();
          toast.error("সব তথ্য সঠিকভাবে পূরণ করুন।", { id: "auth-validation" });
        }}
        onSubmit={submitForm}
      >
        {isSignUp && <label className="field-label">নাম<input className="field-input" type="text" name="name" autoComplete="name" placeholder="আপনার নাম" minLength={2} required /></label>}
        <label className="field-label">ইমেইল<input className="field-input" type="email" name="email" autoComplete="email" placeholder="name@example.com" required /></label>
        <label className="field-label">পাসওয়ার্ড<input className="field-input" type="password" name="password" autoComplete={isSignUp ? "new-password" : "current-password"} placeholder="কমপক্ষে ৮ অক্ষর" minLength={8} required /></label>
        <button className="auth-submit" type="submit" disabled={submitting}>{submitting ? "অপেক্ষা করুন…" : isSignUp ? "অ্যাকাউন্ট তৈরি করুন" : "সাইন ইন"}</button>
      </form>

      <div className="auth-divider">অথবা সোশ্যাল অ্যাকাউন্ট ব্যবহার করুন</div>
      <div className="social-buttons">
        <button className="social-button" type="button" onClick={() => socialSignIn("google")} disabled={submitting}><Globe size={16} /> Google</button>
        <button className="social-button" type="button" onClick={() => socialSignIn("github")} disabled={submitting}><CodeXml size={16} /> GitHub</button>
      </div>

      <p className="auth-switch">
        {isSignUp ? "আগে থেকেই অ্যাকাউন্ট আছে? " : "নতুন এখানে? "}
        <Link href={isSignUp ? "/signin" : "/signup"}>{isSignUp ? "সাইন ইন করুন" : "সাইন আপ করুন"}</Link>
      </p>
    </section>
  );
}