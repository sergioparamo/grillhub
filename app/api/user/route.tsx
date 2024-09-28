// app/api/user/route.ts
import { database } from '../../../lib/firebase/firebase'; // Adjust the path as necessary
import { ref, get, set } from 'firebase/database';

export async function POST(request: Request) {
    const user = await request.json(); // Get email and userId from the request body
    console.log(user)

    const { firstName, lastName, email, phone, uid } = user;

    try {
        // Save the user in Firebase Realtime Database
        await set(ref(database, `users/${uid}`), {
            firstName,
            lastName,
            email,
            phone,
            createdAt: new Date().toISOString()
        });

        return new Response(JSON.stringify({ message: 'User registered successfully!' }), { status: 201 });
    } catch (error: any) {
        console.error('Error saving user to database:', error);
        return new Response(JSON.stringify({ error: error.message }), { status: 500 });
    }
}