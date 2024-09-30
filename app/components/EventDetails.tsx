// app/eventDetails/[id]/EventDetails.js
'use client';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import EventForm from '@/app/components/EventForm';
import { Event } from '@/app/models/Event';
import {
  Button,
  Card,
  CardContent,
  Typography,
  Box,
  CircularProgress,
  Grid,
  Divider,
} from '@mui/material';
import { styled } from '@mui/system';
import { Email as EmailIcon, Phone as PhoneIcon, LocationOn as LocationIcon, DateRange as DateRangeIcon, Description as DescriptionIcon } from '@mui/icons-material';
import { getFirebaseApp } from '@/lib/firebase/firebase';
import { useAuthState } from 'react-firebase-hooks/auth';
import MessageSnackbar from '@/app/components/MessageSnackbar'; // Import the Snackbar component

const StyledCard = styled(Card)( {
  borderRadius: '12px',
  boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)',
  margin: '20px',
  backgroundColor: '#f9f9f9',
});

const { auth } = getFirebaseApp();

const EventDetails = (id: string) => {
  const [user] = useAuthState(auth);
  const [event, setEvent] = useState<Event | undefined>(undefined);
  const [loading, setLoading] = useState(true);
  const [isEditing, setIsEditing] = useState(false);
  const [userInfo, setUserInfo] = useState(null);
  
  // Snackbar state
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState('');
  const [snackbarSeverity, setSnackbarSeverity] = useState('success'); // default to success

  const router = useRouter();

  useEffect(() => {
    const fetchEvent = async () => {
      try {
        const response = await fetch(`/api/events/${id}`);
        const data = await response.json();
        setEvent(data);

        const userResponse = await fetch(`/api/user/${data.adminId}`);
        const userData = await userResponse.json();
        setUserInfo(userData);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };

    fetchEvent();
  }, [id]);

  const handleUpdate = async (updatedEvent: Omit<Event, 'eventId' | 'adminId' | 'createdAt'>) => {
    try {
      const eventData = {
        updatedEvent,
        userId: user?.uid // Add the user's UID to the request body
      };

      const response = await fetch(`/api/events/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(eventData),
      });

      if (!response.ok) {
        throw new Error('Failed to update event');
      }

      // Show success snackbar message
      setSnackbarMessage('Event updated successfully!');
      setSnackbarSeverity('success');
      setSnackbarOpen(true);

      // Redirect to the event details page after successful update
      router.push(`/events/${id}`);
    } catch (error) {
      console.error(error);
      // Show error snackbar message
      setSnackbarMessage('Failed to update event.');
      setSnackbarSeverity('error');
      setSnackbarOpen(true);
    }
  };

  const handleSnackbarClose = () => {
    setSnackbarOpen(false);
  };

  if (loading) {
    return (
      <Box display="flex" justifyContent="center" alignItems="center" height="100vh">
        <CircularProgress />
      </Box>
    );
  }

  return (
    <StyledCard>
      <CardContent>
        <Typography variant="h4" component="div" gutterBottom align="center" fontWeight="bold">
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
                <DescriptionIcon sx={{ marginRight: '8px' }} />
                Description:
              </Typography>
              <Typography variant="body1" color="text.secondary">
                {event?.description}
              </Typography>
            </Grid>
            <Grid item xs={12} sm={6}>
              <Typography variant="h6" display="flex" alignItems="center">
                <LocationIcon sx={{ marginRight: '8px' }} />
                Location:
              </Typography>
              <Typography variant="body1" color="text.secondary">
                {event?.location}
              </Typography>
            </Grid>
            <Grid item xs={12} sm={6}>
              <Typography variant="h6" display="flex" alignItems="center">
                <DateRangeIcon sx={{ marginRight: '8px' }} />
                Date:
              </Typography>
              <Typography variant="body1" color="text.secondary">
                {event?.date}
              </Typography>
            </Grid>
            <Grid item xs={12}>
              <Divider />
            </Grid>
            <Grid item xs={12}>
              <Typography variant="h6">Contact Information:</Typography>
              {userInfo && (
                <Grid container spacing={2}>
                  <Grid item xs={12} sm={6}>
                    <Typography variant="body1" display="flex" alignItems="center">
                      <EmailIcon sx={{ marginRight: '8px' }} />
                      Email: {userInfo.email}
                    </Typography>
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <Typography variant="body1" display="flex" alignItems="center">
                      <PhoneIcon sx={{ marginRight: '8px' }} />
                      Phone: {userInfo.phone}
                    </Typography>
                  </Grid>
                </Grid>
              )}
            </Grid>
            <Grid item xs={12} display="flex" justifyContent="center">
              {user?.uid === event?.adminId && (
                <Button
                  variant="contained"
                  color="primary"
                  onClick={() => setIsEditing(true)}
                  sx={{
                    '&:hover': {
                      backgroundColor: '#0056b3',
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