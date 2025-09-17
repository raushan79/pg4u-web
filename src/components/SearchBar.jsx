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
  <section className="sticky top-[72px] z-40 mb-6 rounded-2xl bg-white p-6 shadow-md">
    <div className="flex flex-col gap-3 md:flex-row md:items-center">
      <input
        type="text"
        value={query}
        onChange={(event) => onQueryChange(event.target.value)}
        onFocus={onQueryFocus}
        placeholder="Search by city or locality..."
        className="h-14 w-full flex-1 rounded-xl border border-gray-200 px-4 text-base shadow-sm transition focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-200"
      />
      <button
        type="button"
        onClick={onRequestNearMe}
        className={`flex h-14 items-center justify-center rounded-xl px-4 text-sm font-semibold shadow-sm transition md:min-w-[120px] ${
          mode === "near"
            ? "bg-green-500 text-white"
            : "bg-slate-100 text-slate-700 hover:bg-slate-200"
        }`}
      >
        <span role="img" aria-label="location pin" className="mr-1">
          📍
        </span>
        Near Me
      </button>
    </div>

    {mode === "near" && (
      <div className="mt-3 flex flex-col gap-4 rounded-xl border border-green-100 bg-green-50 p-4 text-sm text-gray-700 md:flex-row md:items-center md:justify-between">
        <div className="text-sm font-medium text-green-800">
          {typeof coordinates?.lat === "number" && typeof coordinates?.lon === "number"
            ? `Searching near: ${coordinates.lat.toFixed(4)}, ${coordinates.lon.toFixed(4)}`
            : "Fetching your location..."}
        </div>
        <div className="flex flex-1 flex-col gap-2 md:px-6">
          <label className="flex flex-col gap-1 text-xs uppercase tracking-wide text-green-700">
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
              <span className="w-14 text-right text-sm font-semibold text-green-800">
                {rangeKm} km
              </span>
            </div>
          </label>
        </div>
      </div>
    )}

    <div className="mt-4 flex justify-end">
      <button
        type="button"
        onClick={onSearch}
        disabled={isLoading}
        className={`rounded-full px-6 py-2 text-sm font-semibold transition ${
          isLoading
            ? "cursor-not-allowed bg-blue-300 text-white"
            : "bg-blue-600 text-white shadow-sm hover:bg-blue-700"
        }`}
      >
        {isLoading ? "Searching..." : "Search"}
      </button>
    </div>
  </section>
);

export default SearchBar;
