// app/events/[id]/page.js
"use client"; // Asegúrate de que sea un componente de cliente
import { useEffect, useState } from "react";
import Header from "@/app/components/Header";
import Footer from "@/app/components/Footer";
import Spinner from "@/app/components/Spinner";
import { NextPage } from "next";
import { Paper } from "@mui/material";
import { useAppDispatch } from "../../../hooks/useDispatch"; // Use your custom dispatch hook
import {
  fetchEventById,
  selectCurrentEvent,
  selectLoading,
} from "../../store/eventsSlice";
import { useSelector } from "react-redux";

interface EventPageProps {
  params: {
    id: string;
  };
}

const EventPage: NextPage<EventPageProps> = ({ params }) => {
  const { id } = params;
  const dispatch = useAppDispatch(); // Use the typed dispatch
  const event = useSelector(selectCurrentEvent);
  const loading = useSelector(selectLoading);
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    location: "",
    description: "",
  });

  useEffect(() => {
    console.log('CURRENT EVENT')
    console.log(event)
    if (!loading && !event) {
      dispatch(fetchEventById(id));
    }
  }, [dispatch, id, loading]);

  useEffect(() => {
    if (event) {
      setFormData({
        name: event.name,
        location: event.location,
        description: event.description,
      });
    }
  }, [event]);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
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

  if (loading) {
    return (
      <div>
        <Header />
        <main>
          <Paper elevation={3} style={{ padding: "20px", marginTop: "80px" }}>
            <Spinner />
          </Paper>
        </main>
        <Footer />
      </div>
    ); // Show loading message while fetching data
  }

  if (!event) {
    return (
      <div>
        <Header />
        <main>
          <Paper elevation={3} style={{ padding: "20px", marginTop: "80px" }}>
            <p>No se encontró el evento.</p>
          </Paper>
        </main>
        <Footer />
      </div>
    ); // Show message if the event is not found
  }

  return (
    <div>
      <Header />
      <main>
        <Paper elevation={3} style={{ padding: "20px", marginTop: "80px" }}>
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
              <button type="button" onClick={() => setIsEditing(false)}>
                Cancelar
              </button>
            </form>
          ) : (
            <div>
              <h1>{event.name}</h1> {/* Change 'e' to 'event' */}
              <p>Ubicación: {event.location}</p>
              <p>Descripción: {event.description}</p>
              <button onClick={() => setIsEditing(true)}>Editar Evento</button>
            </div>
          )}
        </Paper>
      </main>
      <Footer />
    </div>
  );
};

export default EventPage;
