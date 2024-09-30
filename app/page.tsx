"use client";
import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAuthState } from "react-firebase-hooks/auth";
import { getFirebaseApp } from "../lib/firebase/firebase";
import Hero from "./hero/Hero";
import Features from "./features/Features";
import Testimonials from "./testimonials/Testimonials";
import Spinner from "./components/Spinner";

const { auth } = getFirebaseApp();

const Home = () => {
  const router = useRouter();
  const [user, loading] = useAuthState(auth);

  useEffect(() => {
    if (!loading && !user) {
      router.push("/auth");
    }
  }, [user, loading, router]);

  if (loading) return <Spinner />;

  return (
    <div>
      <main>
        <Hero />
        <Features />
        <Testimonials />
      </main>
    </div>
  );
};

export default Home;
