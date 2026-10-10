import { Suspense } from "react";
import { headers } from "next/headers";
import { redirect } from "next/navigation";
import ProfileUpdateForm from "@/components/profile-update-form";
import { auth } from "@/lib/auth";

export default function ProfileUpdatePage() {
  return (
    <main className="route-main form-page">
      <Suspense fallback={<div className="profile-panel" aria-label="প্রোফাইল লোড হচ্ছে"><div className="loading-title" /></div>}>
        <ProfileUpdateContent />
      </Suspense>
    </main>
  );
}

async function ProfileUpdateContent() {
  const session = await auth.api.getSession({ headers: await headers() });
  if (!session) redirect("/signin?reason=protected&callbackURL=%2Fprofile%2Fupdate");

  return <ProfileUpdateForm currentName={session.user.name} />;
}