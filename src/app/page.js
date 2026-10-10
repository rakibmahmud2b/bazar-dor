import Image from "next/image";
import Link from "next/link";
import { Suspense } from "react";
import { ArrowDownRight, ArrowRight, ArrowUpRight, ChartNoAxesCombined, MapPin, PackageCheck, Store } from "lucide-react";
import ProductGrid from "@/components/product-grid";
import ProductLoadingState from "@/components/product-loading-state";
import { getProducts } from "@/lib/bazardor.mjs";

function SectionHeading({ icon: Icon, title, subtitle }) {
  return (
    <div className="section-heading">
      <div className="section-heading-copy">
        <span className="section-icon"><Icon size={19} /></span>
        <div><h2>{title}</h2><p>{subtitle}</p></div>
      </div>
    </div>
  );
}

function EmptyNotice({ message }) {
  return (
    <div className="empty-state">
      <span className="empty-state-icon"><Store size={40} strokeWidth={1.5} /></span>
      <h2>{message}</h2>
      <p>কিছুক্ষণ পর আবার চেষ্টা করুন।</p>
    </div>
  );
}

export default function Home() {
  return (
    <Suspense fallback={<ProductLoadingState className="home-loading" />}>
      <HomeContent />
    </Suspense>
  );
}

async function HomeContent() {
  const products = await getProducts().catch(() => []);
  const risers = products.filter((product) => product.change.dir === "up")
    .sort((first, second) => second.change.pct - first.change.pct).slice(0, 6);
  const fallers = products.filter((product) => product.change.dir === "down")
    .sort((first, second) => first.change.pct - second.change.pct).slice(0, 6);
  const productCount = new Intl.NumberFormat("bn-BD").format(products.length);
  const upCount = new Intl.NumberFormat("bn-BD").format(products.filter((product) => product.change.dir === "up").length);
  const downCount = new Intl.NumberFormat("bn-BD").format(products.filter((product) => product.change.dir === "down").length);

  return (
    <main className="home-main">
      <section className="hero">
        <div className="hero-copy">
          <span className="eyebrow"><span className="eyebrow-mark" /> প্রতিদিনের বাজার, হাতের মুঠোয়</span>
          <h1>আজকের বাজারদর,<br /><em>এক নজরে জানুন।</em></h1>
          <p className="hero-description">নিত্যপ্রয়োজনীয় পণ্যের সর্বশেষ দাম, বাজারভিত্তিক তুলনা এবং প্রতিদিনের ওঠানামা খুঁজে নিন সহজেই।</p>
          <Link className="hero-cta" href="#সব-পণ্য">আজকের সব দাম দেখুন <ArrowRight size={17} /></Link>
        </div>
        <div className="hero-visual" aria-label="বাজারের তাজা সবজির ছবি">
          <div className="hero-art-frame"><Image src="/bazar-hero.png" alt="তাজা বাজারের শাকসবজি" width={300} height={250} priority /></div>
          <div className="hero-sticker"><ChartNoAxesCombined size={17} /> ৩৩টি পণ্যের দৈনিক দর</div>
        </div>
      </section>

      <section className="market-summary" aria-label="বাজারের আজকের সংক্ষিপ্ত হিসাব">
        <div className="summary-item"><span className="summary-icon"><PackageCheck size={19} /></span><div><strong>{productCount}</strong><span>পণ্যের আজকের দর</span></div></div>
        <div className="summary-item"><span className="summary-icon"><ArrowUpRight size={19} /></span><div><strong>{upCount}</strong><span>পণ্যের দাম বেড়েছে</span></div></div>
        <div className="summary-item"><span className="summary-icon"><ArrowDownRight size={19} /></span><div><strong>{downCount}</strong><span>পণ্যের দাম কমেছে</span></div></div>
        <div className="summary-item"><span className="summary-icon"><MapPin size={19} /></span><div><strong>৮ বিভাগ</strong><span>বাজারের তথ্য</span></div></div>
      </section>

      <section className="product-section">
        <SectionHeading icon={ArrowUpRight} title="আজ দাম বেড়েছে ▲" subtitle="আজকের বাজারে সবচেয়ে বেশি বেড়েছে" />
        {risers.length ? <ProductGrid products={risers} /> : <EmptyNotice message="দাম বৃদ্ধির তথ্য পাওয়া যায়নি" />}
      </section>

      <section className="product-section">
        <SectionHeading icon={ArrowDownRight} title="আজ দাম কমেছে ▼" subtitle="আজকের বাজারে সবচেয়ে বেশি কমেছে" />
        {fallers.length ? <ProductGrid products={fallers} /> : <EmptyNotice message="দাম কমার তথ্য পাওয়া যায়নি" />}
      </section>

      <section className="product-section" id="সব-পণ্য">
        <SectionHeading icon={Store} title="সব পণ্য" subtitle="প্রয়োজনীয় পণ্যের আজকের গড় বাজারদর" />
        {products.length ? <ProductGrid products={products} /> : <EmptyNotice message="এই মুহূর্তে বাজারের তথ্য পাওয়া যাচ্ছে না" />}
      </section>
    </main>
  );
}