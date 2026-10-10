import Link from "next/link";
import Image from "next/image";
import { Suspense } from "react";
import { headers } from "next/headers";
import { redirect } from "next/navigation";
import { ArrowRight, Mail, UserRound } from "lucide-react";
import { auth } from "@/lib/auth";

export default function ProfilePage() {
  return (
    <main className="route-main form-page">
      <Suspense fallback={<div className="profile-panel" aria-label="প্রোফাইল লোড হচ্ছে"><div className="loading-title" /></div>}>
        <ProfileContent />
      </Suspense>
    </main>
  );
}

async function ProfileContent() {
  const session = await auth.api.getSession({ headers: await headers() });
  if (!session) redirect("/signin?reason=protected&callbackURL=%2Fprofile");

  return (
    <section className="profile-panel">
      <span className="route-kicker">আপনার অ্যাকাউন্ট</span>
      <div className="profile-summary">
        <span className="profile-avatar-large">
          {session.user.image
            ? <Image src={session.user.image} alt="" width={58} height={58} unoptimized />
            : <UserRound size={26} />}
        </span>
        <div><h1>{session.user.name}</h1><p>বাজার দর সদস্য</p></div>
      </div>
      <div className="profile-contact"><Mail size={16} /><span>{session.user.email}</span></div>
      <div className="profile-actions">
        <Link className="button button-primary" href="/profile/update">তথ্য আপডেট করুন <ArrowRight size={15} /></Link>
      </div>
    </section>
  );
}