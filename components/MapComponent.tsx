'use client';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import { useEffect, useState } from 'react';

export default function MapComponent() {
  const [icon, setIcon] = useState<any>(null);

  useEffect(() => {
    // Importamos Leaflet solo en el cliente
    const L = require('leaflet');
    const customIcon = new L.Icon({
      iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png',
      shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png',
      iconSize: [25, 41],
      iconAnchor: [12, 41],
    });
    setIcon(customIcon);
  }, []);

  const locations = [
    { name: "Villa La Angostura", pos: [-40.7626, -71.6434] },
    { name: "Lago Falkner", pos: [-40.4682, -71.4947] },
    { name: "San Martín de los Andes", pos: [-40.1554, -71.3548] },
    { name: "Villa Traful", pos: [-40.6558, -71.4035] },
    { name: "Río Manso", pos: [-41.5936, -71.6111] }
  ];

  if (!icon) return <div className="h-[400px] w-full bg-slate-100 animate-pulse rounded-3xl" />;

  return (
    <div className="h-[400px] w-full rounded-3xl overflow-hidden border border-gray-300 shadow-xl">
      <MapContainer 
        center={[-40.45, -71.55]} 
        zoom={10} 
        style={{ height: '100%', width: '100%' }}
      >
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution='&copy; OpenStreetMap'
        />
        {locations.map((loc, idx) => (
          <Marker key={idx} position={loc.pos as [number, number]} icon={icon}>
            <Popup><span className="font-bold text-gray-800">{loc.name}</span></Popup>
          </Marker>
        ))}
      </MapContainer>
    </div>
  );
}
