import { useCallback, useState } from "react";
import {
  searchPGsByLocation,
  searchPGsNearCoordinates,
} from "../services/pgService";

const DEFAULT_LIMIT = 10;

const initialState = {
  listings: [],
  status: "idle",
  error: null,
  currentPage: 1,
  hasMore: false,
  searchTriggered: false,
};

const buildErrorMessage = (error) => {
  if (error?.response?.data?.message) {
    return error.response.data.message;
  }

  if (error?.message) {
    return error.message;
  }

  return "Failed to fetch PGs. Please try again.";
};

const normalizeCoordinate = (value) =>
  typeof value === "number" ? Number(value.toFixed(4)) : undefined;

const usePGSearch = ({ limit = DEFAULT_LIMIT } = {}) => {
  const [state, setState] = useState(initialState);
  const [lastRequest, setLastRequest] = useState(null);

  const showError = useCallback((message) => {
    setState({
      listings: [],
      status: "idle",
      error: message,
      currentPage: 1,
      hasMore: false,
      searchTriggered: true,
    });
  }, []);

  const runSearch = useCallback(
    async (request) => {
      setState((prev) => ({
        ...prev,
        status: "loading",
        error: null,
        searchTriggered: true,
      }));

      try {
        if (request.mode === "near") {
          const { listings } = await searchPGsNearCoordinates({
            latitude: normalizeCoordinate(request.coordinates.lat),
            longitude: normalizeCoordinate(request.coordinates.lon),
            range: request.rangeKm,
            page: request.page,
            limit,
          });

          setState({
            listings,
            status: "succeeded",
            error: null,
            currentPage: request.page,
            hasMore: listings.length === limit,
            searchTriggered: true,
          });
        } else {
          const { listings } = await searchPGsByLocation({
            location: request.location,
            page: request.page,
            limit,
          });

          setState({
            listings,
            status: "succeeded",
            error: null,
            currentPage: request.page,
            hasMore: listings.length === limit,
            searchTriggered: true,
          });
        }
      } catch (error) {
        setState({
          listings: [],
          status: "failed",
          error: buildErrorMessage(error),
          currentPage: 1,
          hasMore: false,
          searchTriggered: true,
        });
      }
    },
    [limit]
  );

  const searchByLocation = useCallback(
    async ({ query, page = 1 }) => {
      const trimmedQuery = (query ?? "").trim();

      if (!trimmedQuery) {
        showError("Please enter a city or locality to search.");
        return;
      }

      const request = {
        mode: "location",
        location: trimmedQuery,
        page,
      };
      setLastRequest(request);
      await runSearch(request);
    },
    [runSearch, showError]
  );

  const searchNear = useCallback(
    async ({ coordinates, rangeKm, page = 1 }) => {
      const lat = coordinates?.lat;
      const lon = coordinates?.lon;

      if (typeof lat !== "number" || typeof lon !== "number") {
        showError("We could not determine your location. Please try again.");
        return;
      }

      const request = {
        mode: "near",
        coordinates: { lat, lon },
        rangeKm,
        page,
      };
      setLastRequest(request);
      await runSearch(request);
    },
    [runSearch, showError]
  );

  const goToPage = useCallback(
    async (page) => {
      if (!lastRequest) return;

      if (lastRequest.mode === "location") {
        await searchByLocation({ query: lastRequest.location, page });
      } else {
        await searchNear({
          coordinates: lastRequest.coordinates,
          rangeKm: lastRequest.rangeKm,
          page,
        });
      }
    },
    [lastRequest, searchByLocation, searchNear]
  );

  const retry = useCallback(async () => {
    if (!lastRequest) return;
    await runSearch(lastRequest);
  }, [lastRequest, runSearch]);

  const resetError = useCallback(() => {
    setState((prev) => ({ ...prev, error: null }));
  }, []);

  return {
    ...state,
    searchByLocation,
    searchNear,
    goToPage,
    retry,
    resetError,
    showError,
  };
};

export default usePGSearch;
