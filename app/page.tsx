// pages/index.js
import Head from 'next/head';
import Header from './components/Header';
import Hero from './hero/Hero';
import Features from './features/Features';
import Testimonials from './testimonials/Testimonials';
import Footer from './components/Footer';

export default function Home() {
  return (
    <div>
      <Head>
        <title>GrillHub - Encuentra Eventos de Barbacoa</title>
        <meta name="description" content="GrillHub te ayuda a encontrar y organizar eventos de barbacoa cerca de ti." />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Header />
      <main>
        <Hero />
        <Features />
        <Testimonials />
      </main>
      <Footer />
    </div>
  );
}