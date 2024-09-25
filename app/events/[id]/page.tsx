// app/events/[id]/page.js
'use client'; // Asegúrate de que sea un componente de cliente
import { useEffect, useState } from 'react';
import Header from "@/app/components/Header";
import Footer from "@/app/components/Footer";
import Spinner from '@/app/components/Spinner';
import { NextPage } from 'next';
import Event from '../../models/Event'

interface EventPageProps {
  params: {
    id: string;
  };
}

const EventPage: NextPage<EventPageProps> = ({ params }) => {
  const { id } = params;
  const [event, setEvent] = useState<Event | null>(null); // Use 'any' type or define a proper type if you have one
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    location: '',
    description: '',
  });

  useEffect(() => {
    const fetchEvent = async () => {
      const response = await fetch(`/api/events/${id}`);
      const data = await response.json();
      setEvent(data);
      setFormData(data || { name: '', location: '', description: '' }); // Initialize form with empty data if no event
    };

    fetchEvent();
  }, [id]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    // Here you can handle form submission later
    setIsEditing(false); // Exit edit mode
  };

  if (!event) {
    return (<div><Header /><Spinner /><Footer /></div>); // Show loading message while fetching data
  }

  return (
    <div>
      <Header />
      <main>
        {isEditing ? (
          <form onSubmit={handleSubmit}>
            <h1>Editar Evento</h1>
            <div>
              <label>
                Título:
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                />
              </label>
            </div>
            <div>
              <label>
                Ubicación:
                <input
                  type="text"
                  name="location"
                  value={formData.location}
                  onChange={handleChange}
                />
              </label>
            </div>
            <div>
              <label>
                Descripción:
                <textarea
                  name="description"
                  value={formData.description}
                  onChange={handleChange}
                />
              </label>
            </div>
            <button type="submit">Guardar Cambios</button>
            <button type="button" onClick={() => setIsEditing(false)}>Cancelar</button>
          </form>
        ) : (
          <div>
            <h1>{event.name}</h1> {/* Change 'e' to 'event' */}
            <p>Ubicación: {event.location}</p>
            <p>Descripción: {event.description}</p>
            <button onClick={() => setIsEditing(true)}>Editar Evento</button>
          </div>
        )}
      </main>
      <Footer />
    </div>
  );
};

export default EventPage;