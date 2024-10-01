'use client';
import { useRouter } from 'next/navigation';
import EventForm from '@/app/components/EventForm';
import { Event } from '@/app/models/Event';
import { getFirebaseApp } from '@/lib/firebase/firebase';
import { useAuthState } from 'react-firebase-hooks/auth';

const CreateEventPage = () => {
  //get auth 
  const { auth } = getFirebaseApp()
  const [user] = useAuthState(auth);
  const userId = user?.uid;
  const router = useRouter();

  const handleCreate = async (newEvent: Omit<Event, 'eventId' | 'adminId' | 'createdAt'>) => {
    try {
      const response = await fetch('/api/events', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ ...newEvent, adminId: userId }), // Include userId as adminId
      });

      if (!response.ok) {
        throw new Error('Failed to create event');
      }

      const data = await response.json();
      router.push(`/events/${data.id}`);
    } catch (error) {
      console.error(error);
    }
  };

  // Ensure the form is rendered only if the user is authenticated
  if (!userId) {
    return <div>Loading...</div>; // Or redirect the user to login
  }

  return <EventForm onSubmit={handleCreate} />;
};

export default CreateEventPage;