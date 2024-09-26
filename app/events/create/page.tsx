// pages/events/create.js
'use client'
import { FormEvent, useState } from 'react';
import { useRouter } from 'next/navigation';

const CreateEvent = () => {
  const [name, setName] = useState('');
  const [location, setLocation] = useState('');
  const [description, setDescription] = useState('');
  const [lat, setLat] = useState('');
  const [lng, setLng] = useState('');
  const router = useRouter();

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const newEvent = {
      name,
      location,
      description,
      lat: parseFloat(lat),
      lng: parseFloat(lng),
    };

    try {
      const response = await fetch('/api/events', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(newEvent), // Enviar el nuevo evento como JSON
      });

      if (!response.ok) {
        throw new Error('Error al crear el evento');
      }

      const data = await response.json();
      router.push('/events/' + data.id); // Redirige a la página del nuevo evento
    } catch (error) {
      console.error("Error al crear el evento:", error);
    }
  };

  return (
    <div>
      <h1>Crear Evento</h1>
      <form onSubmit={handleSubmit}>
        <label>
          Nombre:
          <input type="text" value={name} onChange={(e) => setName(e.target.value)} required />
        </label>
        <label>
          Ubicación:
          <input type="text" value={location} onChange={(e) => setLocation(e.target.value)} required />
        </label>
        <label>
          Descripción:
          <textarea value={description} onChange={(e) => setDescription(e.target.value)} required />
        </label>
        <label>
          Latitud:
          <input type="number" value={lat} onChange={(e) => setLat(e.target.value)} required />
        </label>
        <label>
          Longitud:
          <input type="number" value={lng} onChange={(e) => setLng(e.target.value)} required />
        </label>
        <button type="submit">Crear Evento</button>
      </form>
    </div>
  );
};

export default CreateEvent;