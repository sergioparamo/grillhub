'use client';
import { useEffect, useState } from 'react';
import { Tab, Tabs } from 'react-bootstrap';
import Link from 'next/link';
import 'bootstrap/dist/css/bootstrap.min.css';
import styles from './Events.module.css';
import Spinner from '../components/Spinner';
import { Card, CardContent, CardMedia, Typography, Box } from '@mui/material';

const FeaturedEvents = () => {
  const [events, setEvents] = useState([]);  // Estado para almacenar eventos
  const [loading, setLoading] = useState(true); // Estado de carga
  const [error, setError] = useState(null); // Estado de error

  useEffect(() => {
    const fetchEvents = async () => {
      setLoading(true);
      try {
        const response = await fetch('/api/events');
        const data = await response.json();
        setEvents(Array.isArray(data) ? data : []);
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchEvents();
  }, []);

  return (
    <div>
      <h2>Featured Events</h2>
      {error && <p style={{ color: 'red' }}>Error: {error}</p>}
      <Tabs defaultActiveKey="list" id="uncontrolled-tab-example" className="mb-3">
        <Tab eventKey="list" title="List View">
          <h3>List of Featured Events</h3>
          {loading ? (
            <Spinner />
          ) : events.length === 0 ? (
            <p>No events were found.</p>
          ) : (
            <Box display="flex" flexWrap="wrap" justifyContent="flex-start" gap={2}>
              {events.map((event) => (
                <Card
                  key={event.eventId}  // Usamos eventId como clave
                  sx={{
                    width: '300px',
                    marginBottom: '16px', // Añade espacio entre filas
                  }}
                >
                  <Link href={`/events/${event.eventId}`} passHref>  {/* Usamos eventId en la URL */}
                    <CardMedia
                      component="img"
                      height="140"
                      image={event.image || 'images/bbqpeople.jpg'}  // Usamos una imagen predeterminada si no hay
                      alt={event.title}
                    />
                  </Link>
                  <CardContent>
                    <Typography gutterBottom variant="h5" component="div">
                      {event.title}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      {event.location}
                    </Typography>
                    <Typography gutterBottom variant="h5" component="div">
                      {event.date}
                    </Typography>
                  </CardContent>
                </Card>
              ))}
            </Box>
          )}
        </Tab>
        <Tab eventKey="map" title="Map View">
          <h3>Events Map</h3>
          <div className={styles.mapContainer}>
            {loading && <Spinner />} {/* Muestra un spinner mientras se cargan los datos */}
          </div>
        </Tab>
      </Tabs>
    </div>
  );
};

export default FeaturedEvents;