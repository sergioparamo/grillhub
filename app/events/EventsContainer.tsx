// app/events/EventsContainer.js
'use client';
import { useEffect, useState } from 'react';
import FeaturedEvents from './Events'; // Ajusta la ruta según tu estructura
import { useRouter } from 'next/router';

const EventsContainer = () => {
  const [events, setEvents] = useState([]); // Inicializa como un array vacío
  const router = useRouter();

  useEffect(() => {
    const fetchEvents = async () => {
      const response = await fetch('/api/events');
      const data = await response.json();
      setEvents(data);
    };

    fetchEvents();
  }, []);

  const handleEventClick = (id) => {
    router.push(`/events/${id}`);
  };

  return (
    <>
      <FeaturedEvents events={events} onEventClick={handleEventClick} />
      {/* Aquí puedes agregar otras rutas, como el evento específico */}
    </>
  );
};

export default EventsContainer;