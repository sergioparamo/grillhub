// pages/featured-events.js
import Header from '../components/Header';
import FeaturedEvents from '../events/Events';
import Footer from '../components/Footer';

export default function FeaturedEventsPage() {
  return (
    <div>

      <Header />
      <main>
        <FeaturedEvents />
      </main>
      <Footer />
    </div>
  );
}