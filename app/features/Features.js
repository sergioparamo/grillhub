// components/Features.js
'use client';
import styles from './Features.module.css';

const Features = () => {
  const features = [
    {
      title: 'Buscar Fácilmente',
      description: 'Encuentra eventos de barbacoa cerca de ti con filtros personalizados.',
      icon: '/icons/search.svg',
    },
    {
      title: 'Crear Eventos',
      description: 'Organiza y comparte tus propios eventos de barbacoa con la comunidad.',
      icon: '/icons/create.svg',
    },
    {
      title: 'Opiniones y Reseñas',
      description: 'Lee y escribe reseñas de eventos para mejorar la experiencia de todos.',
      icon: '/icons/reviews.svg',
    },
  ];

  return (
    <section id="features" className={styles.features}>
      <h2>Características Principales</h2>
      <div className={styles.featureList}>
        {features.map((feature, index) => (
          <div key={index} className={styles.feature}>
            <img src={feature.icon} alt={feature.title} />
            <h3>{feature.title}</h3>
            <p>{feature.description}</p>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Features;

