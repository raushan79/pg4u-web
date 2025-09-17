import { useCallback, useState } from "react";
import SearchBar from "../components/SearchBar";
import PGResults from "../components/home/PGResults";
import usePGSearch from "../hooks/usePGSearch";

const DEFAULT_LIMIT = 15;
const DEFAULT_RANGE = 15;

const Home = () => {
  const [mode, setMode] = useState("location");
  const [query, setQuery] = useState("");
  const [coordinates, setCoordinates] = useState(null);
  const [rangeKm, setRangeKm] = useState(DEFAULT_RANGE);

  const {
    listings,
    status,
    error,
    currentPage,
    hasMore,
    searchTriggered,
    searchByLocation,
    searchNear,
    goToPage,
    retry,
    showError,
    resetError,
  } = usePGSearch({ limit: DEFAULT_LIMIT });

  const isLoading = status === "loading";

  const handleQueryChange = useCallback(
    (value) => {
      setQuery(value);
      if (mode === "near") {
        setMode("location");
      }
    },
    [mode]
  );

  const handleModeChange = useCallback(
    (nextMode) => {
      setMode(nextMode);
      if (nextMode === "location") {
        setCoordinates(null);
      }
      resetError();
    },
    [resetError]
  );

  const handleSearch = useCallback(() => {
    if (mode === "near") {
      searchNear({ coordinates, rangeKm, page: 1 });
    } else {
      searchByLocation({ query, page: 1 });
    }
  }, [mode, searchNear, coordinates, rangeKm, searchByLocation, query]);

  const requestUserCoordinates = useCallback(
    () =>
      new Promise((resolve, reject) => {
        if (!navigator.geolocation) {
          reject(new Error("Geolocation is not supported by this browser."));
          return;
        }

        navigator.geolocation.getCurrentPosition(
          (position) => {
            resolve({
              lat: position.coords.latitude,
              lon: position.coords.longitude,
            });
          },
          (error) => reject(error),
          { enableHighAccuracy: true }
        );
      }),
    []
  );

  const handleNearMe = useCallback(async () => {
    resetError();

    try {
      const coords = await requestUserCoordinates();
      setCoordinates(coords);
      setMode("near");
      setQuery(`Near Me (${coords.lat.toFixed(3)}, ${coords.lon.toFixed(3)})`);

      await searchNear({ coordinates: coords, rangeKm, page: 1 });
    } catch (geoError) {
      showError(
        geoError?.message === "Geolocation is not supported by this browser."
          ? "Geolocation is not supported by this browser."
          : "Unable to access your location. Please allow permission and try again."
      );
      setMode("location");
    }
  }, [resetError, searchNear, rangeKm, showError, requestUserCoordinates]);

  const handlePrevPage = useCallback(() => {
    if (currentPage > 1) {
      goToPage(currentPage - 1);
    }
  }, [currentPage, goToPage]);

  const handleNextPage = useCallback(() => {
    if (hasMore) {
      goToPage(currentPage + 1);
    }
  }, [currentPage, goToPage, hasMore]);

  return (
    <div className="min-h-screen bg-gray-50 px-4 py-6">
      <div className="mx-auto max-w-7xl">
        <header className="mb-6 text-center">
          <h1 className="text-3xl font-bold tracking-tight text-blue-700 md:text-4xl">
            Find Your Perfect PG
          </h1>
          <p className="mt-2 text-sm text-gray-600 md:text-base">
            Search across trusted PG listings, explore amenities, and connect
            with owners instantly.
          </p>
        </header>

        <SearchBar
          mode={mode}
          query={query}
          coordinates={coordinates}
          rangeKm={rangeKm}
          isLoading={isLoading}
          onQueryChange={handleQueryChange}
          onQueryFocus={() => handleModeChange("location")}
          onRequestNearMe={handleNearMe}
          onRangeChange={setRangeKm}
          onSearch={handleSearch}
        />

        <PGResults
          listings={listings}
          status={status}
          error={error}
          searchTriggered={searchTriggered}
          currentPage={currentPage}
          hasMore={hasMore}
          onPrevPage={handlePrevPage}
          onNextPage={handleNextPage}
          onRetry={retry}
        />
      </div>
    </div>
  );
};

export default Home;
