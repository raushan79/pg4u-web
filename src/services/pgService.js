import api from "../api/api";

const extractListings = (response) => {
  const listings = response?.data?.data;
  return Array.isArray(listings) ? listings : [];
};

export const searchPGsByLocation = async ({ location, page = 1, limit }) => {
  const response = await api.post("/pg/search", {
    location,
    page,
    limit,
  });

  return {
    listings: extractListings(response),
  };
};

export const searchPGsNearCoordinates = async ({
  latitude,
  longitude,
  range,
  page = 1,
  limit,
}) => {
  const response = await api.post("/pg/search", {
    latitude,
    longitude,
    range,
    page,
    limit,
  });

  return {
    listings: extractListings(response),
  };
};
