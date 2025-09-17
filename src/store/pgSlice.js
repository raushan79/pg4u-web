import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  pgs: [],
  filters: {
    city: 'All',
    gender: 'All',
    roomType: 'All',
    amenities: [],
  },
  loading: false,
  error: null,
};

const pgSlice = createSlice({
  name: 'pg',
  initialState,
  reducers: {
    setPGs: (state, action) => {
      state.pgs = action.payload;
    },
    setFilters: (state, action) => {
      state.filters = { ...state.filters, ...action.payload };
    },
    setLoading: (state, action) => {
      state.loading = action.payload;
    },
    setError: (state, action) => {
      state.error = action.payload;
    },
  },
});

export const { setPGs, setFilters, setLoading, setError } = pgSlice.actions;
export default pgSlice.reducer;
