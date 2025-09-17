import React, { useState } from "react";

const Home = () => {
  const [pgs, setPgs] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [searchTriggered, setSearchTriggered] = useState(false);

  const [searchMode, setSearchMode] = useState("near"); // "location" | "near"
  const [search, setSearch] = useState("");
  const [latLon, setLatLon] = useState({ lat: null, lon: null });
  const [rangeKm, setRangeKm] = useState(15);

  const [currentPage, setCurrentPage] = useState(1);
  const [limit] = useState(10);
  const [noMoreResults, setNoMoreResults] = useState(false);

  const fetchPGs = async (page = currentPage) => {
    if (searchMode === "location" && !search.trim()) {
      alert("Enter a location");
      return;
    }

    setLoading(true);
    setError(null);

    const body =
      searchMode === "near"
        ? {
            latitude: parseFloat(latLon.lat.toFixed(4)),
            longitude: parseFloat(latLon.lon.toFixed(4)),
            range: rangeKm,
            page,
            limit,
          }
        : { location: search.trim(), page, limit };

    try {
      const res = await fetch("https://api.pg4u.in/pg/search", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify(body),
      });

      if (!res.ok) throw new Error(`HTTP error! status: ${res.status}`);

      const data = await res.json();
      setPgs(data.data || []);
      setCurrentPage(page);
      setNoMoreResults(data.data?.length === 0);
    } catch (err) {
      console.error(err);
      setError("Failed to fetch PGs");
      setPgs([]);
    } finally {
      setLoading(false);
    }
  };

  const handleNearMe = () => {
    if (!navigator.geolocation) {
      alert("Geolocation is not supported by your browser.");
      return;
    }

    navigator.geolocation.getCurrentPosition(
      (position) => {
        const lat = position.coords.latitude;
        const lon = position.coords.longitude;

        setLatLon({ lat, lon });
        setSearch(`Near Me (${lat.toFixed(3)}, ${lon.toFixed(3)})`);
        setSearchMode("near");
        setSearchTriggered(true);
        setCurrentPage(1);
        fetchPGs(1);
      },
      () =>
        alert("Unable to fetch your location. Please allow location access."),
      { enableHighAccuracy: true }
    );
  };

  const handleInputChange = (e) => {
    const value = e.target.value;
    setSearch(value);

    // ✅ If user types anything, we switch to location mode
    if (searchMode === "near") {
      setSearchMode("location");
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 py-6 bg-gray-50 min-h-screen">
      <h1 className="text-3xl md:text-4xl font-bold text-center text-blue-700 tracking-tight mb-6">
        Find Your Perfect PG
      </h1>

      {/* Search Controls */}
      <div className="sticky top-0 z-10 bg-white shadow-md rounded-xl p-4 mb-6 flex flex-col gap-4">
        <div className="flex flex-col md:flex-row gap-3">
          <input
            type="text"
            placeholder="Enter city or locality..."
            value={search}
            onChange={handleInputChange}
            onFocus={() => searchMode === "near" && setSearchMode("location")} // ✅ Switch to location mode on focus too
            className="border border-gray-300 rounded-lg p-2 flex-1 focus:outline-none focus:ring-2 focus:ring-blue-400"
          />
          <button
            onClick={handleNearMe}
            className="px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 transition"
          >
            📍 Near Me
          </button>
        </div>

        {searchMode === "near" && latLon.lat && (
          <div className="text-sm text-gray-600">
            Searching near: {latLon.lat.toFixed(4)}, {latLon.lon.toFixed(4)} —{" "}
            <input
              type="number"
              value={rangeKm}
              onChange={(e) => setRangeKm(Number(e.target.value))}
              className="border p-1 rounded w-16 ml-1"
            />{" "}
            km
          </div>
        )}

        <div className="flex justify-end">
          <button
            onClick={() => {
              setSearchTriggered(true);
              setCurrentPage(1);
              fetchPGs(1);
            }}
            className="px-6 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition"
          >
            Search
          </button>
        </div>
      </div>

      {/* Results */}
      {!searchTriggered && (
        <div className="text-center py-10">
          <h2 className="text-2xl font-semibold mb-4 text-blue-800">
            Why Choose PG4U?
          </h2>
          <p className="text-gray-600 max-w-xl mx-auto mb-8">
            Find trusted PG accommodations with verified owners, detailed
            amenities, and real reviews. We make your move-in experience safe
            and smooth.
          </p>

          {/* Features Section */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl mx-auto">
            <div className="bg-white p-6 rounded-xl shadow-md hover:shadow-lg transition">
              <div className="text-3xl mb-2">🏠</div>
              <h3 className="text-lg font-semibold mb-1">Verified Listings</h3>
              <p className="text-sm text-gray-500">
                Every PG on PG4U is verified for accuracy and trust.
              </p>
            </div>

            <div className="bg-white p-6 rounded-xl shadow-md hover:shadow-lg transition">
              <div className="text-3xl mb-2">✨</div>
              <h3 className="text-lg font-semibold mb-1">Modern Amenities</h3>
              <p className="text-sm text-gray-500">
                WiFi, food, laundry, and more — filter PGs based on your
                lifestyle.
              </p>
            </div>

            <div className="bg-white p-6 rounded-xl shadow-md hover:shadow-lg transition">
              <div className="text-3xl mb-2">🛡️</div>
              <h3 className="text-lg font-semibold mb-1">Safe & Secure</h3>
              <p className="text-sm text-gray-500">
                We prioritize safety by listing only trusted PG owners.
              </p>
            </div>
          </div>
        </div>
      )}

      {searchTriggered && (
        <>
          {loading ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {[...Array(6)].map((_, i) => (
                <div
                  key={i}
                  className="animate-pulse bg-white p-6 rounded-xl shadow-md h-48"
                >
                  <div className="h-6 bg-gray-200 rounded w-3/4 mb-3"></div>
                  <div className="h-4 bg-gray-200 rounded w-1/2 mb-2"></div>
                  <div className="h-3 bg-gray-200 rounded w-5/6"></div>
                </div>
              ))}
            </div>
          ) : error ? (
            <div className="text-center text-red-500 py-10 text-lg">
              {error}
            </div>
          ) : pgs.length === 0 ? (
            <div className="text-center text-gray-500 py-10 text-xl">
              No PGs found.
            </div>
          ) : (
            <>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {pgs.map((pg) => (
                  <div
                    key={pg.uuid}
                    className="border border-gray-200 rounded-xl p-6 shadow-md bg-white hover:shadow-xl hover:scale-[1.01] transition-all duration-200 flex flex-col justify-between"
                  >
                    <div>
                      <h2 className="text-xl font-semibold text-blue-800 mb-2">
                        {pg.pgName}
                      </h2>
                      <p className="text-gray-700 font-medium">
                        {pg.locality}, {pg.city}
                      </p>
                      <a
                        href={pg.googleMapLink}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-blue-500 text-sm mt-1 inline-block"
                      >
                        View on Google Maps
                      </a>
                      <div className="text-xs text-gray-400 mt-2">
                        Owner: {pg.owner?.fullName} ({pg.owner?.mobileNumber})
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {/* Pagination */}
              <div className="flex justify-center items-center gap-4 mt-6">
                <button
                  disabled={currentPage === 1}
                  onClick={() => fetchPGs(currentPage - 1)}
                  className={`px-4 py-2 rounded-lg ${
                    currentPage === 1
                      ? "bg-gray-300 text-gray-600 cursor-not-allowed"
                      : "bg-blue-500 text-white hover:bg-blue-600"
                  }`}
                >
                  Previous
                </button>

                <span className="text-gray-700">Page {currentPage}</span>

                <button
                  disabled={noMoreResults}
                  onClick={() => fetchPGs(currentPage + 1)}
                  className={`px-4 py-2 rounded-lg ${
                    noMoreResults
                      ? "bg-gray-300 text-gray-600 cursor-not-allowed"
                      : "bg-blue-500 text-white hover:bg-blue-600"
                  }`}
                >
                  Next
                </button>
              </div>
            </>
          )}
        </>
      )}
    </div>
  );
};

export default Home;
