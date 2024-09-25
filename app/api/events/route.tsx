// app/api/events/route.js
let events = [
  { id: "1", name: "BBQ Party", location: "Central Park", description: "A fun BBQ party in the park." },
  { id: "2", name: "Grill Fest", location: "Prospect Park", description: "Join us for a grilling extravaganza." },
  { id: "3", name: "Beach BBQ", location: "Coney Island", description: "Enjoy a BBQ by the beach." },
];

// Obtener todos los eventos
export async function GET(req) {
  const url = new URL(req.url);
  const id = url.searchParams.get('id');

  if (id) {
    const event = events.find(event => event.id === id);
    if (event) {
      return new Response(JSON.stringify(event), { status: 200, headers: { "Content-Type": "application/json" } });
    }
    return new Response(JSON.stringify({ error: 'Evento no encontrado' }), { status: 404 });
  }

  // Simular un tiempo de carga de 5 segundos
  await new Promise(resolve => setTimeout(resolve, 5000));

  return new Response(JSON.stringify(events), { status: 200, headers: { "Content-Type": "application/json" } });
}