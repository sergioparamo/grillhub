import { NextRequest } from "next/server";
import { database } from "../../../../lib/firebase/firebase";
import { ref, get, child, update } from 'firebase/database';

// Fetch a single event by Firebase key
export async function GET(req: Request | NextRequest) {
  const url = new URL(req.url);
  const id = url.pathname.split('/').pop(); // Extract the Firebase key from URL

  const dbRef = ref(database);
  try {
    const snapshot = await get(child(dbRef, `events/${id}`)); // Access specific event by Firebase key
    if (snapshot.exists()) {
      const event = snapshot.val();
      return new Response(JSON.stringify(event), {
        status: 200,
        headers: { "Content-Type": "application/json" }
      });
    } else {
      return new Response(JSON.stringify({ error: 'Event not found' }), {
        status: 404,
      });
    }
  } catch (error) {
    console.error(error);
    return new Response(JSON.stringify({ error: "Failed to fetch event" }), {
      status: 500,
    });
  }
}

export async function PUT(request: Request | NextRequest) {

  const url = new URL(request.url);
  const id = url.pathname.split('/').pop(); // Extract the ID from the URL

  const dbRef = ref(database);

  try {
    // Get existing event data
    const snapshot = await get(child(dbRef, `events/${id}`)); // Access specific event reference
    if (!snapshot.exists()) {
      return new Response(JSON.stringify({ error: 'Evento no encontrado' }), { status: 404 });
    }
    const event = snapshot.val();

    // Update the event with new data
    const { updatedEvent, userId } = await request.json(); // Get updated event data from the request

    // Check if the current user is the admin of the event
    if (userId !== event.adminId) {
      return new Response(JSON.stringify({ error: 'No tienes permisos para editar este evento' }), { status: 403 });
    }

    console.log(updatedEvent)

    // Ensure updatedEvent is an object
    if (typeof updatedEvent !== 'object' || updatedEvent === null) {
      return new Response(JSON.stringify({ error: 'Invalid event data' }), { status: 400 });
    }

    // Create an object for the updates
    const updates = {
      [`events/${id}`]: updatedEvent // Specify the path for the update
    };

    await update(dbRef, updates); // Update in the database

    return new Response(JSON.stringify({ message: 'Evento actualizado correctamente' }), { status: 200 });
  } catch (error) {
    console.error(error);
    return new Response(JSON.stringify({ error: 'Error al actualizar el evento' }), { status: 500 });
  }
}