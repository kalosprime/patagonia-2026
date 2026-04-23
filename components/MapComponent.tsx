'use client';
import { MapContainer, TileLayer, Marker, Popup, Polyline } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import { useEffect, useState } from 'react';

// Función para calcular distancia entre dos puntos (haversine formula)
const getDistance = (pos1: [number, number], pos2: [number, number]) => {
  const R = 6371; // Radio de la Tierra en km
  const dLat = (pos2[0] - pos1[0]) * Math.PI / 180;
  const dLon = (pos2[1] - pos1[1]) * Math.PI / 180;
  const a = 
    Math.sin(dLat/2) * Math.sin(dLat/2) +
    Math.cos(pos1[0] * Math.PI / 180) * Math.cos(pos2[0] * Math.PI / 180) * 
    Math.sin(dLon/2) * Math.sin(dLon/2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));
  return Math.round(R * c);
};

export default function MapComponent() {
  const [icon, setIcon] = useState<any>(null);

  useEffect(() => {
    const L = require('leaflet');
    const customIcon = new L.Icon({
      iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png',
      shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png',
      iconSize: [25, 41],
      iconAnchor: [12, 41],
    });
    setIcon(customIcon);
  }, []);

  // Definimos la ruta lógica de los pibes
  const locations = [
    { name: "Villa La Angostura", pos: [-40.7626, -71.6434] as [number, number] },
    { name: "Villa Traful", pos: [-40.6558, -71.4035] as [number, number] },
    { name: "Lago Falkner", pos: [-40.4682, -71.4947] as [number, number] },
    { name: "San Martín de los Andes", pos: [-40.1554, -71.3548] as [number, number] },
    { name: "Bariloche (Centro)", pos: [-41.1335, -71.3103] as [number, number] },
    { name: "Río Manso (La Pasarela)", pos: [-41.5936, -71.6111] as [number, number] }
  ];

  if (!icon) return <div className="h-[400px] w-full bg-slate-100 animate-pulse rounded-3xl" />;

  const routePositions = locations.map(l => l.pos);

  return (
    <div className="h-[450px] w-full rounded-3xl overflow-hidden border border-gray-300 shadow-xl relative">
      <MapContainer 
        center={[-40.8, -71.4]} 
        zoom={9} 
        style={{ height: '100%', width: '100%' }}
      >
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution='&copy; OpenStreetMap'
        />
        
        {/* Línea que une los puntos */}
        <Polyline positions={routePositions} color="#A2D2FF" weight={4} opacity={0.6} dashArray="10, 10" />

        {locations.map((loc, idx) => {
          const nextLoc = locations[idx + 1];
          const distToNext = nextLoc ? getDistance(loc.pos, nextLoc.pos) : null;
          
          return (
            <Marker key={idx} position={loc.pos} icon={icon}>
              <Popup>
                <div className="text-slate-800 p-1">
                  <p className="font-black text-sm uppercase mb-1">{loc.name}</p>
                  {distToNext ? (
                    <div className="bg-blue-50 p-2 rounded-lg border border-blue-100">
                      <p className="text-[10px] font-bold text-blue-600 uppercase tracking-tighter">Próxima parada:</p>
                      <p className="text-xs font-black text-slate-700">{nextLoc.name}</p>
                      <p className="text-sm font-black text-blue-600 mt-1">~{distToNext} KM</p>
                    </div>
                  ) : (
                    <p className="text-[10px] font-bold text-forest uppercase tracking-tighter">¡Fin de la ruta! 🏁</p>
                  )}
                  <a 
                    href={`https://www.google.com/maps/dir/?api=1&destination=${loc.pos[0]},${loc.pos[1]}`} 
                    target="_blank" 
                    className="block mt-3 text-center bg-slate-900 text-white text-[10px] font-bold py-2 rounded-lg hover:bg-slate-800"
                  >
                    CÓMO LLEGAR (GPS)
                  </a>
                </div>
              </Popup>
            </Marker>
          );
        })}
      </MapContainer>
      
      {/* Mini Leyenda Distancia Total */}
      <div className="absolute bottom-4 left-4 z-[1000] bg-white/90 backdrop-blur-sm p-3 rounded-2xl shadow-lg border border-slate-200">
        <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1">Recorrido Total 7 Lagos</p>
        <p className="text-xl font-black text-slate-800">~210 KM</p>
      </div>
    </div>
  );
}
