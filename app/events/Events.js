'use client';  // Marcar este archivo como un componente de cliente
import { GoogleMap, LoadScript, Marker } from '@react-google-maps/api';
import { Tab, Tabs } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css'; // Import Bootstrap CSS if not already imported
import styles from './Events.module.css'; // Import your CSS module
const gmapsApiKey = process.env.GOOGLE_MAPS_API_KEY; // or NEXT_PUBLIC_GMAPS_API_KEY if using Next.js

// Sample data: list of events with lat/lng for Google Maps
const events = [
  { id: 1, name: 'BBQ Party', location: 'Central Park', lat: 40.785091, lng: -73.968285 },
  { id: 2, name: 'Grill Fest', location: 'Prospect Park', lat: 40.660204, lng: -73.968956 },
  { id: 3, name: 'Beach BBQ', location: 'Coney Island', lat: 40.574926, lng: -73.985941 },
];

const containerStyle = {
  width: '100%',
  height: '400px',
};

const center = {
  lat: 40.712776,
  lng: -74.005974,
};

const FeaturedEvents = () => {
  return (
    <div>
      <h2>Featured Events</h2>
      <Tabs defaultActiveKey="list" id="uncontrolled-tab-example" className="mb-3">
        <Tab eventKey="list" title="List View">
          <h3>List of Featured Events</h3>
          <ul className={styles.eventList}> {/* Added className here */}
            {events.map((event) => (
              <li key={event.id}>
                <strong>{event.name}</strong> - {event.location}
              </li>
            ))}
          </ul>
        </Tab>
        <Tab eventKey="map" title="Map View">
          <h3>Events Map</h3>
          <div className={styles.mapContainer}>
            <LoadScript googleMapsApiKey={gmapsApiKey}>
              <GoogleMap mapContainerStyle={containerStyle} center={center} zoom={12}>
                {/* Markers for each event */}
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
