import { NextRequest } from "next/server";
import { database } from "../../../../lib/firebase/firebase"
import { ref, get, child } from 'firebase/database';

// Obtener un evento por ID
export async function GET(req: Request | NextRequest) {
  const url = new URL(req.url);
  const id = url.pathname.split('/').pop(); // Extraer el ID de la URL

  const dbRef = ref(database);
  try {
    const snapshot = await get(child(dbRef, `events/${id}`)); // Accede a la referencia del evento específico
    if (snapshot.exists()) {
      const event = snapshot.val(); // Obtener el evento
      return new Response(JSON.stringify(event), { status: 200, headers: { "Content-Type": "application/json" } });
    } else {
      return new Response(JSON.stringify({ error: 'Evento no encontrado' }), { status: 404 });
    }
  } catch (error) {
    console.error(error);
    return new Response(JSON.stringify({ error: 'Error al obtener el evento' }), { status: 500 });
  }
}