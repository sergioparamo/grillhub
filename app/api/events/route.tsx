const events = [
  { id: "1", name: "BBQ Party", location: "Parc de la Ciutadella", description: "A fun BBQ party in the park.", lat: 41.3884, lng: 2.1890 },
  { id: "2", name: "Grill Fest", location: "Parc del Laberint d'Horta", description: "Join us for a grilling extravaganza.", lat: 41.4134, lng: 2.1620 },
  { id: "3", name: "Beach BBQ", location: "Platja de la Barceloneta", description: "Enjoy a BBQ by the beach.", lat: 41.3784, lng: 2.1925 },
];

export async function GET() {
  await new Promise(resolve => setTimeout(resolve, 1000));

  return new Response(JSON.stringify(events), { status: 200, headers: { "Content-Type": "application/json" } });
}