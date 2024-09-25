// store/eventsSlice.js
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

export const fetchEvents = createAsyncThunk('events/fetchEvents', async () => {
  const response = await fetch('/api/events');
  const data = await response.json();
  return data;
});

const eventsSlice = createSlice({
  name: 'events',
  initialState: {
    events: [],
    loading: false,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchEvents.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchEvents.fulfilled, (state, action) => {
        state.loading = false;
        state.events = action.payload; // Almacena los eventos
      })
      .addCase(fetchEvents.rejected, (state) => {
        state.loading = false; // Manejar el error adecuadamente
      });
  },
});

export const selectEvents = (state) => state.events.events;
export const selectLoading = (state) => state.events.loading;

export default eventsSlice.reducer;
