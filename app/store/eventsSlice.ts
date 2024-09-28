// Definición del tipo de Evento
interface Event {
  id: string; // Añade todos los campos relevantes para tu evento
  name: string;
  location: string;
  description: string;
}

// eventsSlice.js
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

export const fetchEvents = createAsyncThunk<Event[]>("events/fetchEvents", async () => {
  const response = await fetch("/api/events");
  if (!response.ok) {
    throw new Error("Failed to fetch events");
  }
  return await response.json();
});

export const fetchEventById = createAsyncThunk<Event, string>(
  "events/fetchEventById",
  async (eventId) => {
    const response = await fetch(`/api/events/${eventId}`);
    if (!response.ok) {
      throw new Error("Failed to fetch event");
    }
    return await response.json();
  }
);

const eventsSlice = createSlice({
  name: "events",
  initialState: {
    events: [] as Event[],
    loading: false,
    currentEvent: null as Event | null, // Allow currentEvent to be an Event or null
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
        state.currentEvent = action.payload; // This is now an Event
        state.loading = false;
      })
      .addCase(fetchEventById.rejected, (state) => {
        state.loading = false;
      });
  },
});

// Selectores
export const selectEvents = (state: { events: { events: Event[] } }) => state.events.events;
export const selectLoading = (state: { events: { loading: boolean } }) => state.events.loading;
export const selectCurrentEvent = (state: { events: { currentEvent: Event | null } }) => state.events.currentEvent;

export default eventsSlice.reducer;