import { useMemo } from "react";
import PGCard from "./PGCard";

const PAGE_SIZE = 6;

const PGList = ({ pgs, loading, error, currentPage, setCurrentPage }) => {
  const totalPages = Math.ceil(pgs.length / PAGE_SIZE);

  const paginatedPGs = useMemo(() => {
    const start = (currentPage - 1) * PAGE_SIZE;
    return pgs.slice(start, start + PAGE_SIZE);
  }, [pgs, currentPage]);

  if (loading) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {[...Array(PAGE_SIZE)].map((_, i) => (
          <div
            key={i}
            className="animate-pulse bg-white p-6 rounded-xl shadow-md h-48"
          />
        ))}
      </div>
    );
  }

  if (error)
    return <div className="text-center text-red-500 py-10">{error}</div>;

  if (pgs.length === 0)
    return <div className="text-center text-gray-500 py-10">No PGs found.</div>;

  return (
    <>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {paginatedPGs.map((pg) => (
          <PGCard key={pg.uuid} pg={pg} />
        ))}
      </div>

      {totalPages > 1 && (
        <div className="flex justify-center gap-4 mt-6">
          <button
            disabled={currentPage === 1}
            onClick={() => setCurrentPage((p) => p - 1)}
            className="px-4 py-2 bg-gray-200 rounded-lg disabled:opacity-50"
          >
            Back
          </button>
          <span className="px-4 py-2">
            {currentPage} / {totalPages}
          </span>
          <button
            disabled={currentPage === totalPages}
            onClick={() => setCurrentPage((p) => p + 1)}
            className="px-4 py-2 bg-gray-200 rounded-lg disabled:opacity-50"
          >
            Next
          </button>
        </div>
      )}
    </>
  );
};

export default PGList;
