'use client'
import EventDetails from '@/app/components/EventDetails';
import { getFirebaseApp } from '@/lib/firebase/firebase'; // Asegúrate de importar tu configuración de Firebase para autenticar al usuario
import { useAuthState } from 'react-firebase-hooks/auth';

const EventPage = ({ params: { id } }) => {
  //get auth 
  const { auth } = getFirebaseApp()
  const [user] = useAuthState(auth);
  const userId = user?.uid;

  return (
    <div>
      <h1>Event Details</h1>
      <EventDetails id={id} currentUserId={userId} />
    </div>
  );
};

export default EventPage;