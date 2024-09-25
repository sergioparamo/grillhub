'use client'
import { useEffect } from 'react';
import { GoogleMap, LoadScript, Marker } from '@react-google-maps/api';
import { Tab, Tabs } from 'react-bootstrap';
import Link from 'next/link';
import 'bootstrap/dist/css/bootstrap.min.css';
import styles from './Events.module.css';
import Spinner from '../components/Spinner';
import { useDispatch, useSelector } from 'react-redux';
import { fetchEvents, selectEvents, selectLoading } from '../store/eventsSlice';

const gmapsApiKey = process.env.GOOGLE_MAPS_API_KEY;

const containerStyle = {
  width: '100%',
  height: '400px',
};

const center = {
  lat: 40.712776,
  lng: -74.005974,
};

const FeaturedEvents = () => {
  const dispatch = useDispatch();
  const events = useSelector(selectEvents);
  const loading = useSelector(selectLoading);

  useEffect(() => {
    // Solo despachar la acción si no hay eventos en el estado
    if (events.length === 0) {
      dispatch(fetchEvents());
    }
  }, [dispatch, events.length]);

  return (
    <div>
      <h2>Featured Events</h2>
      <Tabs defaultActiveKey="list" id="uncontrolled-tab-example" className="mb-3">
        <Tab eventKey="list" title="List View">
          <h3>List of Featured Events</h3>
          <ul className={styles.eventList}>
            {loading ? (  
              <Spinner />
            ) : (
              events.map((event) => (
                <li key={event.id}>
                  <Link href={`/events/${event.id}`}>
                    <strong>{event.name}</strong> - {event.location}
                  </Link>
                </li>
              ))
            )}
          </ul>
        </Tab>
        <Tab eventKey="map" title="Map View">
          <h3>Events Map</h3>
          <div className={styles.mapContainer}>
            <LoadScript googleMapsApiKey={gmapsApiKey}>
              <GoogleMap mapContainerStyle={containerStyle} center={center} zoom={12}>
                {events.map((event) => (
                  <Marker key={event.id} position={{ lat: event.lat, lng: event.lng }} />
                ))}
              </GoogleMap>
            </LoadScript>
          </div>
        </Tab>
      </Tabs>
    </div>
  );
};

export default FeaturedEvents;