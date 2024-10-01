// app/api/user/route.ts
import { database } from '../../../lib/firebase/firebase'; // Adjust the path as necessary
import { ref, set } from 'firebase/database';

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
    } catch (error) {
        console.error('Error saving user to database:', (error as Error).message);
        return new Response(JSON.stringify({ error: 'Failed to save user' }), { status: 500 });
    }
}