// app/events/[id]/page.js
'use client'; // Asegúrate de que sea un componente de cliente
import { useEffect, useState } from 'react';
import Header from "@/app/components/Header";
import Footer from "@/app/components/Footer";

const EventPage = ({ params }) => {
  const { id } = params;
  const [event, setEvent] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    location: '',
    description: '',
  });

  useEffect(() => {
    // Llamar a la API para obtener el evento específico
    const fetchEvent = async () => {
      const response = await fetch(`/api/events?id=${id}`);
      const data = await response.json();
      setEvent(data);
      setFormData(data || { name: '', location: '', description: '' }); // Inicializa el formulario con datos vacíos si no hay evento
    };

    fetchEvent();
  }, [id]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Aquí puedes manejar el envío de datos si decides hacerlo más tarde
    setIsEditing(false); // Salir del modo de edición
  };

  if (!event) {
    return <div>Cargando...</div>; // Mostrar un mensaje de carga mientras se obtienen los datos
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
            <h1>{event.name}</h1>
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
