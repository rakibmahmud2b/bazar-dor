"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { LogOut, UserRound } from "lucide-react";
import toast from "react-hot-toast";
import { authClient } from "@/lib/auth-client";

const fallbackCategories = [
  { slug: "chal", nameBn: "চাল", icon: "🍚" },
  { slug: "dal", nameBn: "ডাল", icon: "🫘" },
  { slug: "tel", nameBn: "তেল", icon: "🛢️" },
  { slug: "sobji", nameBn: "সবজি", icon: "🥬" },
  { slug: "mach", nameBn: "মাছ", icon: "🐟" },
  { slug: "mangsho", nameBn: "মাংস", icon: "🍗" },
  { slug: "dim-dui", nameBn: "ডিম-দুধ", icon: "🥛" },
  { slug: "mosla", nameBn: "মসলা", icon: "🌶️" },
];

export default function SiteHeader({ categories, banglaDate }) {
  const pathname = usePathname();
  const router = useRouter();
  const { data: session, isPending } = authClient.useSession();
  const items = categories.length ? categories : fallbackCategories;

  async function handleSignOut() {
    const { error } = await authClient.signOut();
    if (error) {
      toast.error(error.message || "সাইন আউট করা যায়নি");
      return;
    }

    toast.success("সাইন আউট সম্পন্ন হয়েছে");
    router.push("/");
    router.refresh();
  }

  return (
    <header className="site-header">
      <div className="header-main page-container">
        <Link className="brand-lockup" href="/" aria-label="বাজার দর হোম পেজ">
          <span className="brand-icon">
            <Image src="/logo-icon.png" alt="" width={42} height={42} priority />
          </span>
          <span className="brand-copy">
            <strong>বাজার দর</strong>
            <span>ঢাকার বাজার · {banglaDate}</span>
          </span>
        </Link>

        <div className="header-actions">
          {isPending ? (
            <span className="auth-loading" aria-label="লোড হচ্ছে" />
          ) : session?.user ? (
            <>
              <Link className="profile-link" href="/profile">
                <span className="avatar-small">{session.user.name?.slice(0, 1) || <UserRound size={16} />}</span>
                <span className="profile-name">{session.user.name}</span>
              </Link>
              <button className="icon-button" type="button" onClick={handleSignOut} aria-label="সাইন আউট" title="সাইন আউট">
                <LogOut size={17} />
              </button>
            </>
          ) : (
            <>
              <Link className="button button-quiet" href="/signin">সাইন ইন</Link>
              <Link className="button button-primary" href="/signup">সাইন আপ</Link>
            </>
          )}
        </div>
      </div>

      <nav className="category-nav page-container" aria-label="পণ্যের বিভাগ">
        <Link className={`category-link${pathname === "/" ? " is-active" : ""}`} href="/#সব-পণ্য">
          সব পণ্য
        </Link>
        {items.map((category) => {
          const slug = category.slug || category.id;
          const active = pathname === `/category/${slug}`;

          return (
            <Link className={`category-link${active ? " is-active" : ""}`} href={`/category/${slug}`} key={slug}>
              <span aria-hidden="true">{category.icon}</span>
              {category.nameBn}
            </Link>
          );
        })}
      </nav>
    </header>
  );
}