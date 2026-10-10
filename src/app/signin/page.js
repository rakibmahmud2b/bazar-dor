import { Suspense } from "react";
import AuthForm from "@/components/auth-form";
import { getSocialProviderStatus } from "@/lib/auth";

export default function SignInPage({ searchParams }) {
  return (
    <main className="route-main form-page">
      <Suspense fallback={<div className="auth-panel" aria-label="সাইন ইন লোড হচ্ছে"><div className="loading-title" /></div>}>
        <SignInContent searchParams={searchParams} />
      </Suspense>
    </main>
  );
}

async function SignInContent({ searchParams }) {
  const query = await searchParams;

  return (
    <AuthForm
      mode="signin"
      callbackURL={query.callbackURL || "/"}
      reason={query.reason}
      registered={query.registered === "1"}
      providers={getSocialProviderStatus()}
    />
  );
}