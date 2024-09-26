// app/api/events/route.tsx
import { database } from '../../../lib/firebase/firebase'; // Asegúrate de ajustar la ruta según sea necesario
import { ref, get, child, set } from 'firebase/database';

export async function GET() {
  // Espera un segundo (opcional, puedes eliminar esto)
  await new Promise(resolve => setTimeout(resolve, 1000));

  const dbRef = ref(database);
  try {
    const snapshot = await get(child(dbRef, 'events')); // Accede a la referencia 'events' en la base de datos
    if (snapshot.exists()) {
      const eventsObj = snapshot.val(); // Obtiene los eventos

      // Convierte el objeto a un array
      const eventsArray = Object.values(eventsObj);

      return new Response(JSON.stringify(eventsArray), { status: 200, headers: { "Content-Type": "application/json" } });
    } else {
      return new Response(JSON.stringify([]), { status: 200, headers: { "Content-Type": "application/json" } }); // Retorna un array vacío si no hay eventos
    }
  } catch (error) {
    console.error(error);
    return new Response(JSON.stringify({ error: "Failed to fetch events" }), { status: 500, headers: { "Content-Type": "application/json" } });
  }
}


export async function POST(request: Request) {
  try {
    const event = await request.json(); // Obtiene el evento del cuerpo de la solicitud

    // Genera un ID único para el nuevo evento
    const newEventId = Date.now().toString(); // Puedes cambiar esto a un método más robusto si es necesario

    const eventRef = ref(database, 'events/' + newEventId);
    await set(eventRef, { ...event, id: newEventId }); // Guarda el evento en la base de datos

    return new Response(JSON.stringify({ id: newEventId }), { status: 201 });
  } catch (error) {
    console.error("Error al crear el evento:", error);
    return new Response(JSON.stringify({ error: "Error al crear el evento" }), { status: 500 });
  }
}
