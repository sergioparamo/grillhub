"use client";
import { useState } from "react";
import { Event } from "@/app/models/Event"; // Ajusta la ruta según sea necesario
import { TextField, Button, Paper, Typography } from "@mui/material";
import { LoadScript } from "@react-google-maps/api";

interface EventFormProps {
  event?: Event; // Opcional, si estás editando un evento
  onSubmit: (
    eventData: Omit<Event, "eventId" | "adminId" | "createdAt">
  ) => Promise<void>;
}

const EventForm = ({ event, onSubmit }: EventFormProps) => {
  const [title, setTitle] = useState(event?.title || "");
  const [location, setLocation] = useState(event?.location || "");
  const [description, setDescription] = useState(event?.description || "");
  const [date, setDate] = useState(event?.date || "");
  const [time, setTime] = useState(event?.time || "");
  const [maxParticipants, setMaxParticipants] = useState(
    event?.maxParticipants?.toString() || ""
  );

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const eventData = {
      title,
      location,
      description,
      date,
      time,
      maxParticipants: maxParticipants ? parseInt(maxParticipants) : undefined,
    };

    await onSubmit(eventData);
  };

  return (
    <LoadScript googleMapsApiKey={process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY || ''} libraries={["places"]}>
      <Paper elevation={3} style={{ padding: "20px" }}>
        <Typography variant="h4">
          {event ? "Edit Event" : "Create Event"}
        </Typography>
        <form onSubmit={handleSubmit}>
          <TextField
            label="Title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            fullWidth
            required
            margin="normal"
          />
            <TextField
              label="Location"
              value={location}
              onChange={(e) => setLocation(e.target.value)}
              fullWidth
              required
              margin="normal"
              placeholder="Search for a location"
            />
          <TextField
            label="Description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            fullWidth
            required
            margin="normal"
          />
          <TextField
            label="Date"
            type="date"
            value={date}
            onChange={(e) => setDate(e.target.value)}
            fullWidth
            required
            margin="normal"
          />
          <TextField
            label="Time"
            type="time"
            value={time}
            onChange={(e) => setTime(e.target.value)}
            fullWidth
            required
            margin="normal"
          />
          <TextField
            label="Max Participants"
            value={maxParticipants}
            onChange={(e) => setMaxParticipants(e.target.value)}
            fullWidth
            margin="normal"
            type="number"
          />
          <Button variant="contained" color="primary" type="submit">
            {event ? "Save Changes" : "Create Event"}
          </Button>
        </form>
      </Paper>
    </LoadScript>
  );
};

export default EventForm;