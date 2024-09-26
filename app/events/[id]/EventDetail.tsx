import Event from '../../models/Event'
// app/events/[id]/EventDetail.js
const EventDetail = (event: Event) => {
    return (
      <div>
        <h1>{event.name}</h1>
        <p>Ubicación: {event.location}</p>
        <p>Descripción: {event.description}</p>
        {/* Agrega más información si lo deseas */}
      </div>
    );
  };
  
  export default EventDetail;
  