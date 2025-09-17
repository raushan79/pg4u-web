import React from "react";

const SearchBar = ({
  search,
  setSearch,
  searchMode,
  setSearchMode,
  latLon,
  setLatLon,
  rangeKm,
  setRangeKm,
  onSearch,
}) => {
  const handleNearMe = () => {
    if (!navigator.geolocation) return alert("Geolocation not supported");
    navigator.geolocation.getCurrentPosition(
      (pos) => {
        setLatLon({ lat: pos.coords.latitude, lon: pos.coords.longitude });
        setSearchMode("near");
      },
      () => alert("Could not get your location"),
      { enableHighAccuracy: true }
    );
  };

  return (
    <div className="sticky top-0 bg-white shadow-md rounded-xl p-6 mb-6 flex flex-col md:flex-row md:items-center gap-4">
      {searchMode === "location" ? (
        <input
          type="text"
          placeholder="Enter city/locality..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="flex-1 border rounded-lg p-3 focus:ring-2 focus:ring-blue-400"
        />
      ) : (
        <div className="flex-1 flex gap-2">
          <div className="flex-1 p-3 bg-gray-100 rounded-lg">
            {latLon.lat
              ? `Lat: ${latLon.lat.toFixed(4)}, Lon: ${latLon.lon.toFixed(4)}`
              : "Fetching location..."}
          </div>
          <input
            type="number"
            min={1}
            max={50}
            placeholder="Range (km)"
            value={rangeKm}
            onChange={(e) => setRangeKm(Number(e.target.value))}
            className="w-28 border rounded-lg p-3 focus:ring-2 focus:ring-green-400"
          />
        </div>
      )}

      <div className="flex gap-2 md:gap-3">
        <button
          onClick={() => setSearchMode("location")}
          className={`px-4 py-2 rounded-lg ${
            searchMode === "location" ? "bg-blue-500 text-white" : "bg-gray-200"
          }`}
        >
          Location
        </button>
        <button
          onClick={handleNearMe}
          className={`px-4 py-2 rounded-lg ${
            searchMode === "near" ? "bg-green-500 text-white" : "bg-gray-200"
          }`}
        >
          Near Me
        </button>
        <button
          onClick={onSearch}
          className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
        >
          Search
        </button>
      </div>
    </div>
  );
};

export default SearchBar;
