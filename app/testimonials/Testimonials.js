// components/Testimonials.js
import styles from './Testimonials.module.css';

const Testimonials = () => {
  const testimonials = [
    {
      name: 'Juan Pérez',
      feedback: 'GrillHub me ayudó a encontrar el mejor evento de barbacoa en mi ciudad. ¡Fue una experiencia increíble!',
      avatar: '/avatars/avatar1.jpg',
    },
    {
      name: 'María López',
      feedback: 'Organizar mi propio evento fue muy fácil gracias a GrillHub. ¡Recomiendo esta plataforma a todos los amantes de la barbacoa!',
      avatar: '/avatars/avatar2.jpg',
    },
    {
      name: 'Carlos García',
      feedback: 'La comunidad de GrillHub es fantástica. Conocí a gente maravillosa en el último evento al que asistí.',
      avatar: '/avatars/avatar3.jpg',
    },
  ];

  return (
    <section id="testimonials" className={styles.testimonials}>
      <h2>Testimonios</h2>
      <div className={styles.testimonialList}>
        {testimonials.map((testimonial, index) => (
          <div key={index} className={styles.testimonial}>
            <img src={testimonial.avatar} alt={testimonial.name} />
            <p>{testimonial.feedback}</p>
            <h4>{testimonial.name}</h4>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Testimonials;

