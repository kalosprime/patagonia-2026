'use client';
import dynamic from 'next/dynamic';
import { Countdown, Financials, VehicleFleet } from '@/components/CoreComponents';
import { Itinerary, GearChecklist, CrewNotes, DiscardedPlaces, LakeList, Highlights } from '@/components/InteractiveSections';
import { Users, Map as MapIcon, Calendar, DollarSign, Wrench, MessageSquare, History, Droplets, Star } from 'lucide-react';

// Dynamic import for Leaflet (No SSR)
const MapComponent = dynamic(() => import('@/components/MapComponent'), { 
  ssr: false,
  loading: () => <div className="h-[400px] w-full bg-slate-100 animate-pulse rounded-3xl" />
});

const crew = ["Fela", "Juan", "Cardo", "Pato", "Pipo", "Justo", "Santi", "Bumbun", "Tato", "Goyo", "Joaco", "Luki", "Fede", "Jose", "Suaya"];

export default function PatagoniaDashboard() {
  return (
    <main className="min-h-screen bg-slate-50 text-slate-900 px-4 pb-20 pt-10 font-sans">
      <div className="max-w-4xl mx-auto space-y-16">
        
        {/* HERO SECTION */}
        <section className="text-center space-y-4">
          <h1 className="text-4xl md:text-6xl font-black tracking-tighter text-slate-800">
            PATAGONIA <span className="text-glacier">2026</span>
          </h1>
          <p className="text-slate-400 font-bold uppercase tracking-[0.2em] text-[10px]">Command Center • 15 Amigos • 3 Motorhomes</p>
          <Countdown />
        </section>

        {/* FINANCIALS SECTION */}
        <section>
          <div className="flex items-center gap-2 mb-6">
            <DollarSign className="text-glacier" size={20} />
            <h2 className="text-lg font-black uppercase text-slate-700 tracking-wider">Logística & Finanzas</h2>
          </div>
          <Financials />
          <VehicleFleet />
        </section>

        {/* HIGHLIGHTS SECTION */}
        <section>
          <div className="flex items-center gap-2 mb-6">
            <Star className="text-glacier" size={20} />
            <h2 className="text-lg font-black uppercase text-slate-700 tracking-wider">Los Imperdibles</h2>
          </div>
          <Highlights />
        </section>

        {/* LAKES SECTION */}
        <section>
          <div className="flex items-center gap-2 mb-6">
            <Droplets className="text-glacier" size={20} />
            <h2 className="text-lg font-black uppercase text-slate-700 tracking-wider">Lagos a Conocer</h2>
          </div>
          <LakeList />
        </section>

        {/* ITINERARY SECTION */}
        <section>
          <div className="flex items-center gap-2 mb-6">
            <Calendar className="text-glacier" size={20} />
            <h2 className="text-lg font-black uppercase text-slate-700 tracking-wider">Itinerario Dinámico</h2>
          </div>
          <Itinerary />
        </section>

        {/* MAP SECTION */}
        <section>
          <div className="flex items-center gap-2 mb-6">
            <MapIcon className="text-glacier" size={20} />
            <h2 className="text-lg font-black uppercase text-slate-700 tracking-wider">Ruta de los 7 Lagos</h2>
          </div>
          <MapComponent />
        </section>

        {/* CREW SECTION */}
        <section>
          <div className="flex items-center gap-2 mb-6">
            <Users className="text-glacier" size={20} />
            <h2 className="text-lg font-black uppercase text-slate-700 tracking-wider">La Tripulación</h2>
          </div>
          <div className="flex flex-wrap gap-2">
            {crew.map(name => (
              <span key={name} className="px-4 py-2 bg-white border border-slate-200 shadow-sm rounded-full text-xs font-bold text-slate-600">
                {name}
              </span>
            ))}
          </div>
        </section>

        {/* DISCARDED SECTION */}
        <section>
          <div className="flex items-center gap-2 mb-6">
            <History className="text-glacier" size={20} />
            <h2 className="text-lg font-black uppercase text-slate-700 tracking-wider">Lugares Descartados</h2>
          </div>
          <DiscardedPlaces />
        </section>

        {/* NOTES SECTION */}
        <section>
          <div className="flex items-center gap-2 mb-6">
            <MessageSquare className="text-glacier" size={20} />
            <h2 className="text-lg font-black uppercase text-slate-700 tracking-wider">Notas del Grupo</h2>
          </div>
          <CrewNotes />
        </section>

        {/* GEAR SECTION */}
        <section>
          <div className="flex items-center gap-2 mb-6">
            <Wrench className="text-glacier" size={20} />
            <h2 className="text-lg font-black uppercase text-slate-700 tracking-wider">Checklist & Tareas</h2>
          </div>
          <GearChecklist />
        </section>

        <footer className="text-center pt-10 border-t border-slate-200">
          <p className="text-slate-400 text-[10px] font-black uppercase tracking-[0.3em]">© 2026 Patagonia Trip • Command Center</p>
        </footer>
      </div>
    </main>
  );
}
