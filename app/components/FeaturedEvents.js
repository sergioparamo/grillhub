// components/FeaturedEvents.js
import styles from './FeaturedEvents.module.css';

const FeaturedEvents = () => {
  const events = [
    {
      title: 'Barbacoa en el Parque Central',
      date: '15 de Mayo, 2024',
      location: 'Parque Central, Ciudad',
      image: '/images/event1.jpg',
    },
    {
      title: 'Festival de Parrillas',
      date: '20 de Junio, 2024',
      location: 'Avenida Principal, Ciudad',
      image: '/images/event2.jpg',
    },
    {
      title: 'Noche de Asado y Vino',
      date: '10 de Julio, 2024',
      location: 'Bodega Local, Ciudad',
      image: '/images/event3.jpg',
    },
  ];

  return (
    <section id="events" className={styles.events}>
      <h2>Eventos Destacados</h2>
      <div className={styles.eventList}>
        {events.map((event, index) => (
          <div key={index} className={styles.event}>
            <img src={event.image} alt={event.title} />
            <div className={styles.eventInfo}>
              <h3>{event.title}</h3>
              <p>{event.date}</p>
              <p>{event.location}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default FeaturedEvents;

