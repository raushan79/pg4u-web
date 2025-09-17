import PGCard from "../PGCard";

const featureTiles = [
  {
    icon: "🏠",
    title: "Verified Listings",
    description: "Every PG on PG4U is verified for accuracy and trust.",
  },
  {
    icon: "✨",
    title: "Modern Amenities",
    description: "Filter PGs by WiFi, meals, laundry, and more lifestyle perks.",
  },
  {
    icon: "🛡️",
    title: "Safe & Secure",
    description: "We list only trusted owners so your move-in stays worry free.",
  },
];

const IntroState = () => (
  <div className="py-10 text-center">
    <h2 className="mb-4 text-2xl font-semibold text-blue-800">
      Why Choose PG4U?
    </h2>
    <p className="mx-auto mb-8 max-w-xl text-gray-600">
      Discover verified PG accommodations across major cities. Compare amenities,
      connect with owners instantly, and move in with confidence.
    </p>
    <div className="mx-auto grid max-w-4xl gap-6 md:grid-cols-3">
      {featureTiles.map(({ icon, title, description }) => (
        <article
          key={title}
          className="rounded-xl bg-white p-6 shadow-md transition hover:-translate-y-1 hover:shadow-lg"
        >
          <div className="mb-2 text-3xl">{icon}</div>
          <h3 className="mb-1 text-lg font-semibold text-gray-800">{title}</h3>
          <p className="text-sm text-gray-500">{description}</p>
        </article>
      ))}
    </div>
  </div>
);

const LoadingState = () => (
  <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
    {Array.from({ length: 6 }).map((_, index) => (
      <div
        key={`pg-skeleton-${index}`}
        className="h-48 animate-pulse rounded-xl bg-white p-6 shadow-md"
      >
        <div className="mb-3 h-6 w-3/4 rounded bg-gray-200" />
        <div className="mb-2 h-6 w-1/2 rounded bg-gray-200" />
        <div className="h-3 w-5/6 rounded bg-gray-200" />
      </div>
    ))}
  </div>
);

const ErrorState = ({ message, onRetry }) => (
  <div className="py-10 text-center text-lg text-red-500">
    <p>{message}</p>
    {onRetry && (
      <button
        type="button"
        onClick={onRetry}
        className="mt-4 rounded-full bg-blue-600 px-5 py-2 text-sm font-semibold text-white shadow-sm transition hover:bg-blue-700"
      >
        Try Again
      </button>
    )}
  </div>
);

const EmptyState = () => (
  <div className="py-10 text-center text-xl text-gray-500">No PGs found.</div>
);

const Pagination = ({ currentPage, hasMore, isLoading, onPrev, onNext }) => (
  <div className="mt-6 flex items-center justify-center gap-4">
    <button
      type="button"
      onClick={onPrev}
      disabled={currentPage === 1 || isLoading}
      className={`rounded-full px-4 py-2 text-sm font-semibold transition ${
        currentPage === 1 || isLoading
          ? "cursor-not-allowed bg-gray-200 text-gray-500"
          : "bg-blue-600 text-white shadow-sm hover:bg-blue-700"
      }`}
    >
      Previous
    </button>
    <span className="text-sm font-medium text-gray-700">Page {currentPage}</span>
    <button
      type="button"
      onClick={onNext}
      disabled={!hasMore || isLoading}
      className={`rounded-full px-4 py-2 text-sm font-semibold transition ${
        !hasMore || isLoading
          ? "cursor-not-allowed bg-gray-200 text-gray-500"
          : "bg-blue-600 text-white shadow-sm hover:bg-blue-700"
      }`}
    >
      Next
    </button>
  </div>
);

const PGResults = ({
  listings,
  status,
  error,
  searchTriggered,
  currentPage,
  hasMore,
  onPrevPage,
  onNextPage,
  onRetry,
}) => {
  if (!searchTriggered) {
    return <IntroState />;
  }

  if (status === "loading") {
    return <LoadingState />;
  }

  if (error) {
    return <ErrorState message={error} onRetry={onRetry} />;
  }

  if (!listings.length) {
    return <EmptyState />;
  }

  return (
    <>
      <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
        {listings.map((pg) => (
          <PGCard key={pg.uuid || pg.id} pg={pg} />
        ))}
      </div>
      <Pagination
        currentPage={currentPage}
        hasMore={hasMore}
        isLoading={status === "loading"}
        onPrev={onPrevPage}
        onNext={onNextPage}
      />
    </>
  );
};

export default PGResults;
