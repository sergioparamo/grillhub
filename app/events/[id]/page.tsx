'use client'
import EventDetails from '@/app/components/EventDetails';

interface EventPageProps {
  params: {
    id: string;
  };
}

const EventPage = ({ params: { id } }: EventPageProps) => {

  return (
    <div>
      <h1>Event Details</h1>
      <EventDetails id={id} />
    </div>
  );
};

export default EventPage;
