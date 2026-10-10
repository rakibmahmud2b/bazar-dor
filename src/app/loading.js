export default function Loading() {
  return (
    <main className="loading-main" aria-label="পণ্য লোড হচ্ছে">
      <div className="loading-title" />
      <div className="skeleton-grid">
        {Array.from({ length: 8 }, (_, index) => <div className="skeleton-card" key={index} />)}
      </div>
    </main>
  );
}