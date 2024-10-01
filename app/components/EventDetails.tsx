"use client";
import { useEffect, useState } from "react";
import EventForm from "@/app/components/EventForm";
import { Event } from "@/app/models/Event";
import {
  Button,
  Card,
  CardContent,
  Typography,
  Box,
  CircularProgress,
  Grid,
  Divider,
} from "@mui/material";
import { styled } from "@mui/system";
import {
  Email as EmailIcon,
  Phone as PhoneIcon,
  LocationOn as LocationIcon,
  DateRange as DateRangeIcon,
  Description as DescriptionIcon,
} from "@mui/icons-material";
import MessageSnackbar, { SnackbarSeverity } from "@/app/components/MessageSnackbar"; // Import the Snackbar component
import { User } from "@/app/models/User"; // Cambié la importación de modelos aquí

const StyledCard = styled(Card)(() => ({
  borderRadius: "12px",
  boxShadow: "0 4px 12px rgba(0, 0, 0, 0.2)",
  margin: "20px auto",
  maxWidth: 800,
  backgroundColor: "white",
  padding: "40px", // Aumenta el padding interno para dar más espacio dentro del card
}));

interface EventDetailsProps {
  id: string; // Assuming 'id' is a string, you can change this type if necessary
}

const EventDetails: React.FC<EventDetailsProps> = ({ id }) => {
  const [event, setEvent] = useState<Event | undefined>(undefined);
  const [loading, setLoading] = useState(true);
  const [isEditing, setIsEditing] = useState(false);
  const [user, setUser] = useState<User | null>(null); // Estado para el usuario
  const [uid, setUid] = useState<string | null>(null); // Estado para el UID

  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState("");
  const [snackbarSeverity, setSnackbarSeverity] = useState<SnackbarSeverity>("success"); // default to "success"

  // Hook para acceder a localStorage solo cuando el componente se haya montado
  useEffect(() => {
    const storedUserInfo = localStorage.getItem("userInfo");

    if (storedUserInfo) {
      const parsedUserInfo = JSON.parse(storedUserInfo);
      const localUser: User | null = parsedUserInfo.user
        ? parsedUserInfo.user
        : null;
      const localUid: string | null = parsedUserInfo.uid || null;

      setUser(localUser); // Guardar el usuario en el estado
      setUid(localUid); // Guardar el UID en el estado
    } else {
      console.log("No user information found in localStorage.");
    }
  }, []); // Solo ejecuta cuando el componente se monta

  // Hook para cargar el evento desde la API
  useEffect(() => {
    const fetchEvent = async () => {
      try {
        const response = await fetch(`/api/events/${id}`);
        const data = await response.json();
        setEvent(data);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };

    fetchEvent();
  }, [id]);

  const handleUpdate = async (
    updatedEvent: Omit<Event, "eventId" | "adminId" | "createdAt">
  ) => {
    try {
      const eventData = {
        updatedEvent,
        userId: uid, // Añadir el UID del usuario a la solicitud
      };

      const response = await fetch(`/api/events/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(eventData),
      });

      if (!response.ok) {
        throw new Error("Failed to update event");
      }

      // Get the updated event from the response
      const updatedEventData = await response.json();

      // Update the event state with the new data
      setEvent((prevEvent) => ({
        ...prevEvent,
        ...updatedEventData, // Spread the previous event properties and overwrite with updated data
      }));

      // Mostrar el mensaje de éxito
      setSnackbarMessage("Event updated successfully!");
      setSnackbarSeverity("success");
      setSnackbarOpen(true);

      // Reset isEditing to false to switch back to detail mode
      setIsEditing(false); // Switch to detail mode after update
    } catch (error) {
      console.error(error);
      // Mostrar el mensaje de error
      setSnackbarMessage("Failed to update event.");
      setSnackbarSeverity("error");
      setSnackbarOpen(true);
    }
  };

  const handleSnackbarClose = () => {
    setSnackbarOpen(false);
  };

  if (loading) {
    return (
      <Box
        display="flex"
        justifyContent="center"
        alignItems="center"
        height="100vh"
      >
        <CircularProgress />
      </Box>
    );
  }

  return (
    <StyledCard>
      <CardContent>
        <Typography
          variant="h4"
          component="div"
          gutterBottom
          align="center"
          fontWeight="bold"
        >
          Event Details
        </Typography>
        {isEditing ? (
          <EventForm event={event} onSubmit={handleUpdate} />
        ) : (
          <Grid container spacing={3}>
            <Grid item xs={12}>
              <Typography variant="h5" component="div" gutterBottom>
                {event?.title}
              </Typography>
            </Grid>
            <Grid item xs={12}>
              <Divider />
            </Grid>
            <Grid item xs={12}>
              <Typography variant="h6" gutterBottom>
                <DescriptionIcon sx={{ marginRight: "8px" }} />
                Description:
              </Typography>
              <Typography variant="body1" color="text.secondary">
                {event?.description}
              </Typography>
            </Grid>
            <Grid item xs={12} sm={6}>
              <Typography variant="h6" display="flex" alignItems="center">
                <LocationIcon sx={{ marginRight: "8px" }} />
                Location:
              </Typography>
              <Typography variant="body1" color="text.secondary">
                {event?.location} <br />
                <Button
                  variant="outlined"
                  startIcon={<LocationIcon />}
                  onClick={() =>
                    window.open(
                      `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(
                        event?.location || "" // Default to empty string if undefined
                      )}`,
                      "_blank"
                    )
                  }
                >
                  Open in Maps
                </Button>
              </Typography>
            </Grid>
            <Grid item xs={12} sm={6}>
              <Typography variant="h6" display="flex" alignItems="center">
                <DateRangeIcon sx={{ marginRight: "8px" }} />
                Date:
              </Typography>
              <Typography variant="body1" color="text.secondary">
                {event?.date}
              </Typography>
            </Grid>
            <Grid item xs={12} sm={6}>
              <Typography variant="h6" display="flex" alignItems="center">
                <DateRangeIcon sx={{ marginRight: "8px" }} />
                Time:
              </Typography>
              <Typography variant="body1" color="text.secondary">
                {event?.time}
              </Typography>
            </Grid>
            <Grid item xs={12} sm={6}>
              <Typography variant="h6" display="flex" alignItems="center">
                <DateRangeIcon sx={{ marginRight: "8px" }} />
                Max Participants:
              </Typography>
              <Typography variant="body1" color="text.secondary">
                {event?.maxParticipants}
              </Typography>
            </Grid>
            <Grid item xs={12}>
              <Divider />
            </Grid>
            <Grid item xs={12}>
              <Typography variant="h5" display="flex" alignItems="center">
                Contact Information:
              </Typography>
              {user && (
                <Grid container spacing={2}>
                  <Grid item xs={12} sm={6}>
                    <Typography variant="h6" display="flex" alignItems="center">
                      <EmailIcon sx={{ marginRight: "8px" }} />
                      Email:
                    </Typography>
                    <Typography variant="body1" color="text.secondary">
                      {user.email}
                    </Typography>
                  </Grid>

                  <Grid item xs={12} sm={6}>
                    <Typography variant="h6" display="flex" alignItems="center">
                      <PhoneIcon sx={{ marginRight: "8px" }} />
                      Phone:
                    </Typography>
                    <Typography variant="body1" color="text.secondary">
                      {user.phone}
                    </Typography>
                  </Grid>
                </Grid>
              )}
            </Grid>
            <Grid item xs={12} display="flex" justifyContent="center">
              {uid === event?.adminId && (
                <Button
                  variant="contained"
                  color="primary"
                  onClick={() => setIsEditing(true)}
                  sx={{
                    "&:hover": {
                      backgroundColor: "#0056b3",
                    },
                  }}
                >
                  Edit Event
                </Button>
              )}
            </Grid>
          </Grid>
        )}
      </CardContent>

      {/* Snackbar Component */}
      <MessageSnackbar
        open={snackbarOpen}
        handleClose={handleSnackbarClose}
        message={snackbarMessage}
        severity={snackbarSeverity}
      />
    </StyledCard>
  );
};

export default EventDetails;
