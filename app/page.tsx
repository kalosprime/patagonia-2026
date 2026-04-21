'use client';
import { useState, useEffect } from 'react';
import dynamic from 'next/dynamic';
import { Users, Map as MapIcon, Calendar, DollarSign, Wrench, MessageSquare, History, Droplets, Star } from 'lucide-react';

// Importaciones dinámicas estrictas sin SSR
const Countdown = dynamic(() => import('@/components/CoreComponents').then(m => m.Countdown), { ssr: false });
const Financials = dynamic(() => import('@/components/CoreComponents').then(m => m.Financials), { ssr: false });
const VehicleFleet = dynamic(() => import('@/components/CoreComponents').then(m => m.VehicleFleet), { ssr: false });
const Itinerary = dynamic(() => import('@/components/InteractiveSections').then(m => m.Itinerary), { ssr: false });
const GearChecklist = dynamic(() => import('@/components/InteractiveSections').then(m => m.GearChecklist), { ssr: false });
const CrewNotes = dynamic(() => import('@/components/InteractiveSections').then(m => m.CrewNotes), { ssr: false });
const Highlights = dynamic(() => import('@/components/InteractiveSections').then(m => m.Highlights), { ssr: false });
const LakeList = dynamic(() => import('@/components/InteractiveSections').then(m => m.LakeList), { ssr: false });
const DiscardedPlaces = dynamic(() => import('@/components/InteractiveSections').then(m => m.DiscardedPlaces), { ssr: false });
const MapComponent = dynamic(() => import('@/components/MapComponent'), { ssr: false });

const crew = ["Fela", "Juan", "Cardo", "Pato", "Pipo", "Justo", "Santi", "Bumbun", "Tato", "Goyo", "Joaco", "Luki", "Fede", "Jose", "Suaya"];

export default function PatagoniaDashboard() {
  const [ready, setReady] = useState(false);

  useEffect(() => {
    setReady(true);
  }, []);

  if (!ready) return <div className="min-h-screen bg-slate-50 flex items-center justify-center text-slate-400 font-bold uppercase tracking-widest animate-pulse">Iniciando Command Center...</div>;

  return (
    <main className="min-h-screen bg-slate-50 text-slate-900 px-4 pb-20 pt-10 font-sans">
      <div className="max-w-4xl mx-auto space-y-16">
        
        <section className="text-center space-y-4">
          <h1 className="text-4xl md:text-5xl font-black tracking-tighter text-slate-800 uppercase">VIAJE AL SUR <span className="text-glacier">CON LA BANDA</span></h1>
          <p className="text-slate-400 font-bold uppercase tracking-[0.2em] text-[10px]">Command Center • 15 Amigos • 3 Motorhomes</p>
          <Countdown />
        </section>

        <section>
          <div className="flex items-center gap-2 mb-6"><DollarSign className="text-glacier" size={20} /><h2 className="text-lg font-black uppercase text-slate-700 tracking-wider">Logística & Finanzas</h2></div>
          <Financials />
          <VehicleFleet />
        </section>

        <section>
          <div className="flex items-center gap-2 mb-6"><Star className="text-glacier" size={20} /><h2 className="text-lg font-black uppercase text-slate-700 tracking-wider">Los Imperdibles</h2></div>
          <Highlights />
        </section>

        <section>
          <div className="flex items-center gap-2 mb-6"><Droplets className="text-glacier" size={20} /><h2 className="text-lg font-black uppercase text-slate-700 tracking-wider">Lagos a Conocer</h2></div>
          <LakeList />
        </section>

        <section>
          <div className="flex items-center gap-2 mb-6"><Calendar className="text-glacier" size={20} /><h2 className="text-lg font-black uppercase text-slate-700 tracking-wider">Itinerario</h2></div>
          <Itinerary />
        </section>

        <section>
          <div className="flex items-center gap-2 mb-6"><MapIcon className="text-glacier" size={20} /><h2 className="text-lg font-black uppercase text-slate-700 tracking-wider">Ruta</h2></div>
          <MapComponent />
        </section>

        <section>
          <div className="flex items-center gap-2 mb-6"><Users className="text-glacier" size={20} /><h2 className="text-lg font-black uppercase text-slate-700 tracking-wider">La Tripulación</h2></div>
          <div className="flex flex-wrap gap-2">{crew.map(name => (<span key={name} className="px-4 py-2 bg-white border border-slate-200 shadow-sm rounded-full text-xs font-bold text-slate-600">{name}</span>))}</div>
        </section>

        <section>
          <div className="flex items-center gap-2 mb-6"><History className="text-glacier" size={20} /><h2 className="text-lg font-black uppercase text-slate-700 tracking-wider">Lugares Descartados</h2></div>
          <DiscardedPlaces />
        </section>

        <section>
          <div className="flex items-center gap-2 mb-6"><MessageSquare className="text-glacier" size={20} /><h2 className="text-lg font-black uppercase text-slate-700 tracking-wider">Notas</h2></div>
          <CrewNotes />
        </section>

        <section>
          <div className="flex items-center gap-2 mb-6"><Wrench className="text-glacier" size={20} /><h2 className="text-lg font-black uppercase text-slate-700 tracking-wider">Checklist</h2></div>
          <GearChecklist />
        </section>

        <footer className="text-center pt-10 border-t border-slate-200"><p className="text-slate-400 text-[10px] font-black uppercase tracking-[0.3em]">☁️ Cloud Sync Activo • © 2026 Viaje al Sur</p></footer>
      </div>
    </main>
  );
}
