// app/api/events/route.tsx
import { database } from '../../../lib/firebase/firebase'; // Asegúrate de ajustar la ruta según sea necesario
import { ref, get, child, set } from 'firebase/database';

export async function GET() {
  const dbRef = ref(database);
  try {
    const snapshot = await get(child(dbRef, 'events')); // Access all events
    if (snapshot.exists()) {
      const eventsObj = snapshot.val();

      // Convert the object into an array with keys (Firebase keys as event IDs)
      const eventsArray = Object.entries(eventsObj).map(([key, value]) => ({
        ...(value as Event),
        eventId: key,  // Assign Firebase key as eventId
      }));

      return new Response(JSON.stringify(eventsArray), {
        status: 200,
        headers: { "Content-Type": "application/json" }
      });
    } else {
      return new Response(JSON.stringify({ error: 'No events found' }), {
        status: 404,
      });
    }
  } catch (error) {
    console.error(error);
    return new Response(JSON.stringify({ error: "Failed to fetch events" }), {
      status: 500,
      headers: { "Content-Type": "application/json" }
    });
  }
}

export async function POST(request: Request) {
  try {
    const event = await request.json(); // Obtiene el evento del cuerpo de la solicitud

    console.log(event)

    // Genera un ID único para el nuevo evento userId+datetime
    const newEventId = event.adminId + '' + Date.now().toString(); // Puedes cambiar esto a un método más robusto si es necesario

    const eventRef = ref(database, 'events/' + newEventId);
    await set(eventRef, { ...event, createdAt: Date.now().toString() });

    return new Response(JSON.stringify({ id: newEventId }), { status: 201 });
  } catch (error) {
    console.error("Error al crear el evento:", error);
    return new Response(JSON.stringify({ error: "Error al crear el evento" }), { status: 500 });
  }
}
