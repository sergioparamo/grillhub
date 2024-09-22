// components/Header.js
import Link from 'next/link';
import styles from './Header.module.css';

const Header = () => {
  return (
    <header className={styles.header}>
      <div className={styles.logo}>
        <Link href="/">
          GrillHub
        </Link>
      </div>
      <nav>
        <ul className={styles.navList}>
          <li><Link href="#features">Características</Link></li>
          <li><Link href="#events">Eventos</Link></li>
          <li><Link href="#testimonials">Testimonios</Link></li>
          <li><Link href="#contact">Contacto</Link></li>
        </ul>
      </nav>
    </header>
  );
};

export default Header;

