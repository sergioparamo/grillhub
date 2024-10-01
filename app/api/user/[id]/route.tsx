// app/api/user/route.ts
import { NextRequest } from 'next/server';
import { database } from '../../../../lib/firebase/firebase'; // Adjust the path as necessary
import { ref, get, set, child } from 'firebase/database';

export async function GET(req: Request | NextRequest) {
    const url = new URL(req.url);
    const id = url.pathname.split('/').pop(); // Extraer el ID de la URL
  
    const dbRef = ref(database);
    try {
      const snapshot = await get(child(dbRef, `users/${id}`)); // Accede a la referencia del evento específico
      if (snapshot.exists()) {
        const user = snapshot.val(); // Obtener el evento
        return new Response(JSON.stringify(user), { status: 200, headers: { "Content-Type": "application/json" } });
      } else {
        return new Response(JSON.stringify({ error: 'User no encontrado' }), { status: 404 });
      }
    } catch (error) {
      console.error(error);
      return new Response(JSON.stringify({ error: 'Error al obtener el user' }), { status: 500 });
    }
  }

export async function PUT(request: Request, { params }: { params: { userId: string } }) {
    const { userId } = params; // Get the userId from the route parameters
    const updatedData = await request.json(); // Get the updated user data from the request body

    try {
        // Update the user data in Firebase Realtime Database
        const userRef = ref(database, `users/${userId}`);
        await set(userRef, { ...updatedData, userId }); // Keep userId unchanged

        return new Response(JSON.stringify({ message: 'User updated successfully!' }), { status: 200 });
    } catch (error) {
        console.error('Error updating user:', (error as Error).message);
        return new Response(JSON.stringify({ error: 'Failed to update user' }), { status: 500 });
    }
}