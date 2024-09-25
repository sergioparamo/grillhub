import { NextRequest } from "next/server";

const events = [
    { id: "1", name: "BBQ Party", location: "Parc de la Ciutadella", description: "A fun BBQ party in the park.", lat: 41.3884, lng: 2.1890 },
    { id: "2", name: "Grill Fest", location: "Parc del Laberint d'Horta", description: "Join us for a grilling extravaganza.", lat: 41.4134, lng: 2.1620 },
    { id: "3", name: "Beach BBQ", location: "Platja de la Barceloneta", description: "Enjoy a BBQ by the beach.", lat: 41.3784, lng: 2.1925 },
  ];
  
  // Obtener un evento por ID
  export async function GET(req: Request | NextRequest) {
    const url = new URL(req.url);
    const id = url.pathname.split('/').pop(); // Extraer el ID de la URL
  
    // Simular un tiempo de carga de 2 segundos
    await new Promise(resolve => setTimeout(resolve, 1000));
  
    const event = events.find(event => event.id === id);
    if (event) {
      return new Response(JSON.stringify(event), { status: 200, headers: { "Content-Type": "application/json" } });
    }
    return new Response(JSON.stringify({ error: 'Evento no encontrado' }), { status: 404 });
  }  