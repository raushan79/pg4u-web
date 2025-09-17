import React from "react";

const SearchBar = ({
  mode,
  query,
  coordinates,
  rangeKm,
  isLoading,
  onQueryChange,
  onQueryFocus,
  onRequestNearMe,
  onRangeChange,
  onSearch,
}) => (
  <section className="sticky top-[64px] z-40 mb-6 px-0 sm:px-2">
    <div className="rounded-2xl bg-white p-4 shadow-md sm:p-5 md:p-6">
      <div className="flex flex-col gap-3 md:flex-row md:items-center">
        <div className="w-full md:flex-1">
          <label className="sr-only" htmlFor="pg-search-input">
            Search city or locality
          </label>
          <input
            id="pg-search-input"
            type="text"
            value={query}
            onChange={(event) => onQueryChange(event.target.value)}
            onFocus={onQueryFocus}
            placeholder="Search by city or locality..."
            className="h-12 w-full rounded-xl border border-gray-200 px-3 text-base shadow-sm transition focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-200 sm:px-4"
          />
        </div>

        <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:gap-2 md:gap-3">
          <button
            type="button"
            onClick={onRequestNearMe}
            className={`inline-flex h-12 w-full items-center justify-center gap-2 rounded-xl px-3 text-sm font-semibold shadow-sm transition sm:w-auto sm:px-4 md:min-w-[130px] ${
              mode === "near"
                ? "bg-green-500 text-white"
                : "bg-slate-100 text-slate-700 hover:bg-slate-200"
            }`}
          >
            <span role="img" aria-label="location pin">
              📍
            </span>
            Near Me
          </button>

          <button
            type="button"
            onClick={onSearch}
            disabled={isLoading}
            className={`inline-flex h-12 w-full items-center justify-center rounded-xl px-6 text-sm font-semibold transition md:w-auto ${
              isLoading
                ? "cursor-not-allowed bg-blue-300 text-white"
                : "bg-blue-600 text-white shadow-sm hover:bg-blue-700"
            }`}
          >
            {isLoading ? "Searching..." : "Search"}
          </button>
        </div>
      </div>

      {mode === "near" && (
        <div className="mt-4 flex flex-col gap-4 rounded-xl border border-green-100 bg-green-50 p-4 text-sm text-gray-700 md:flex-row md:items-center md:justify-between">
          <div className="text-sm font-medium text-green-800">
            {typeof coordinates?.lat === "number" && typeof coordinates?.lon === "number"
              ? `Searching near: ${coordinates.lat.toFixed(4)}, ${coordinates.lon.toFixed(4)}`
              : "Fetching your location..."}
          </div>
          <div className="flex flex-1 flex-col gap-2 sm:px-2 md:px-6">
            <label className="flex flex-col gap-1 text-xs font-semibold tracking-wide text-green-700">
              Range (0 – 50 km)
              <div className="flex items-center gap-3">
                <input
                  type="range"
                  min={0}
                  max={50}
                  step={1}
                  value={rangeKm}
                  onChange={(event) => onRangeChange(Number(event.target.value))}
                  className="h-2 w-full appearance-none rounded-full bg-green-200 accent-green-600"
                />
                <span className="w-14 text-right text-xs font-semibold text-green-800 sm:text-sm">
                  {rangeKm} km
                </span>
              </div>
            </label>
          </div>
        </div>
      )}
    </div>
  </section>
);

export default SearchBar;
