'use client';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';

// Fix for default marker icons in Leaflet + Next.js
const customIcon = new L.Icon({
  iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png',
  shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png',
  iconSize: [25, 41],
  iconAnchor: [12, 41],
});

const locations = [
  { name: "Villa La Angostura", pos: [-40.7626, -71.6434] },
  { name: "Lago Falkner", pos: [-40.4682, -71.4947] },
  { name: "San Martín de los Andes", pos: [-40.1554, -71.3548] },
  { name: "Villa Traful", pos: [-40.6558, -71.4035] },
  { name: "Río Manso", pos: [-41.5936, -71.6111] }
];

export default function MapComponent() {
  return (
    <div className="h-[400px] w-full rounded-3xl overflow-hidden border border-white/10">
      <MapContainer center={[-40.6, -71.5]} zoom={8} style={{ height: '100%', width: '100%' }}>
        <TileLayer
          url="https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png"
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/attributions">CARTO</a>'
        />
        {locations.map((loc, idx) => (
          <Marker key={idx} position={loc.pos as [number, number]} icon={customIcon}>
            <Popup>
              <span className="font-bold">{loc.name}</span>
            </Popup>
          </Marker>
        ))}
      </MapContainer>
    </div>
  );
}
