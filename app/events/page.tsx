// pages/featured-events.js
import Header from "../components/Header";
import FeaturedEvents from "../events/Events";
import Footer from "../components/Footer";
import { Paper } from "@mui/material";

export default function FeaturedEventsPage() {
  return (
    <div>
      <Header />
      <main>
        <Paper elevation={3} style={{ padding: "20px", marginTop: "80px" }}>
          <FeaturedEvents />
        </Paper>
      </main>
      <Footer />
    </div>
  );
}
