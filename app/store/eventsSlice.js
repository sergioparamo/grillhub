// eventsSlice.js
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

// Fetch all events
export const fetchEvents = createAsyncThunk('events/fetchEvents', async () => {
  const response = await fetch('/api/events');
  return await response.json();
});

// Fetch a single event by ID
export const fetchEventById = createAsyncThunk('events/fetchEventById', async (eventId) => {
  const response = await fetch(`/api/events/${eventId}`); // Adjust this URL as necessary
  if (!response.ok) {
    throw new Error('Failed to fetch event');
  }
  return await response.json();
});

const eventsSlice = createSlice({
  name: 'events',
  initialState: {
    events: [],
    loading: false,
    currentEvent: null,  // For storing the currently fetched event
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchEvents.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchEvents.fulfilled, (state, action) => {
        state.events = action.payload;
        state.loading = false;
      })
      .addCase(fetchEvents.rejected, (state) => {
        state.loading = false;
      })
      .addCase(fetchEventById.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchEventById.fulfilled, (state, action) => {
        state.currentEvent = action.payload; // Store the fetched event
        state.loading = false;
      })
      .addCase(fetchEventById.rejected, (state) => {
        state.loading = false;
      });
  },
});

export const selectEvents = (state) => state.events.events;
export const selectLoading = (state) => state.events.loading;
export const selectCurrentEvent = (state) => state.events.currentEvent; // Selector for the current event

export default eventsSlice.reducer;