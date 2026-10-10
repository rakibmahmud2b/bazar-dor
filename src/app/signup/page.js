import AuthForm from "@/components/auth-form";
import { getSocialProviderStatus } from "@/lib/auth";

export default function SignUpPage() {
  return (
    <main className="route-main form-page">
      <AuthForm mode="signup" providers={getSocialProviderStatus()} />
    </main>
  );
}