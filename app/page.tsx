'use client';
import dynamic from 'next/dynamic';
import { Countdown, Financials, VehicleFleet } from '@/components/CoreComponents';
import { Itinerary, GearChecklist } from '@/components/InteractiveSections';
import { Users, Map as MapIcon, Calendar, DollarSign, Tool } from 'lucide-react';

// Dynamic import for Leaflet (No SSR)
const MapComponent = dynamic(() => import('@/components/MapComponent'), { 
  ssr: false,
  loading: () => <div className="h-[400px] w-full bg-gray-900 animate-pulse rounded-3xl" />
});

const crew = ["Fela", "Juan", "Cardo", "Pato", "Pipo", "Justo", "Santi", "Bumbun", "Tato", "Goyo", "Joaco", "Luki", "Fede", "Jose", "Suaya"];

export default function PatagoniaDashboard() {
  return (
    <main className="min-h-screen bg-black text-white px-4 pb-20 pt-10 font-sans">
      <div className="max-w-4xl mx-auto space-y-12">
        
        {/* HERO SECTION */}
        <section className="text-center space-y-4">
          <h1 className="text-4xl md:text-6xl font-black tracking-tighter bg-gradient-to-b from-white to-stone bg-clip-text text-transparent">
            PATAGONIA <span className="text-glacier">2026</span>
          </h1>
          <p className="text-stone font-medium uppercase tracking-[0.2em] text-xs">Command Center • 15 Amigos • 3 Motorhomes</p>
          <Countdown />
        </section>

        {/* CREW SECTION */}
        <section>
          <div className="flex items-center gap-2 mb-6">
            <Users className="text-glacier" size={20} />
            <h2 className="text-xl font-bold uppercase">La Tripulación ({crew.length})</h2>
          </div>
          <div className="flex flex-wrap gap-2">
            {crew.map(name => (
              <span key={name} className="px-4 py-2 bg-gray-900 border border-white/5 rounded-full text-sm font-medium hover:border-glacier/50 transition-colors">
                {name}
              </span>
            ))}
          </div>
        </section>

        {/* LOGISTICS SECTION */}
        <section>
          <div className="flex items-center gap-2 mb-6">
            <DollarSign className="text-glacier" size={20} />
            <h2 className="text-xl font-bold uppercase">Logística & Finanzas</h2>
          </div>
          <Financials />
          <VehicleFleet />
        </section>

        {/* MAP SECTION */}
        <section>
          <div className="flex items-center gap-2 mb-6">
            <MapIcon className="text-glacier" size={20} />
            <h2 className="text-xl font-bold uppercase">Ruta 7 Lagos</h2>
          </div>
          <MapComponent />
        </section>

        {/* ITINERARY SECTION */}
        <section>
          <div className="flex items-center gap-2 mb-6">
            <Calendar className="text-glacier" size={20} />
            <h2 className="text-xl font-bold uppercase">Itinerario Unificado</h2>
          </div>
          <Itinerary />
        </section>

        {/* GEAR SECTION */}
        <section>
          <div className="flex items-center gap-2 mb-6">
            <Tool className="text-glacier" size={20} />
            <h2 className="text-xl font-bold uppercase">Equipamiento & Tareas</h2>
          </div>
          <GearChecklist />
        </section>

        <footer className="text-center pt-10 border-t border-white/5">
          <p className="text-stone text-xs">© 2026 Patagonia Trip Command Center • Built for Vercel</p>
        </footer>
      </div>
    </main>
  );
}
