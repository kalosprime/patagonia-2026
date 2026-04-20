'use client';
import { useState, useEffect } from 'react';
import { ExternalLink, DollarSign, Wallet, ChevronDown, ChevronUp, Info } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

// --- TYPES ---
interface FinancialItem {
  name: string;
  total: string;
  pp?: string; // Optional property for "per person" cost
}

interface FinancialSection {
  id: string;
  type: 'usd' | 'ars';
  label: string;
  total: string;
  perPerson: string;
  items: FinancialItem[];
}

// --- COUNTDOWN ---
export const Countdown = () => {
  const [timeLeft, setTimeLeft] = useState({ días: 0, horas: 0, min: 0, seg: 0 });
  useEffect(() => {
    const targetDate = new Date('2026-12-27T08:00:00').getTime();
    const timer = setInterval(() => {
      const now = new Date().getTime();
      const distance = targetDate - now;
      setTimeLeft({
        días: Math.floor(distance / (1000 * 60 * 60 * 24)),
        horas: Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
        min: Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60)),
        seg: Math.floor((distance % (1000 * 60)) / 1000),
      });
    }, 1000);
    return () => clearInterval(timer);
  }, []);
  return (
    <div className="flex justify-center space-x-3 py-6">
      {Object.entries(timeLeft).map(([label, value]) => (
        <div key={label} className="flex flex-col items-center bg-white border border-slate-200 rounded-2xl p-4 w-20 shadow-sm">
          <span className="text-2xl font-black text-slate-800">{value < 0 ? 0 : value}</span>
          <span className="text-[9px] uppercase text-slate-400 font-bold tracking-widest">{label}</span>
        </div>
      ))}
    </div>
  );
};

// --- INTERACTIVE FINANCIALS ---
export const Financials = () => {
  const [expanded, setExpanded] = useState<string | null>(null);

  const sections: FinancialSection[] = [
    {
      id: 'alquiler',
      type: 'usd',
      label: 'Alquiler Motorhomes',
      total: 'USD 7.340',
      perPerson: 'USD 489,33',
      items: [
        { name: 'Mercedes Sprinter (7 pax)', total: 'USD 2.750' },
        { name: 'Jumper (4 pax)', total: 'USD 2.500' },
        { name: 'Ford Transit (4 pax)', total: 'USD 2.000' },
        { name: 'Limpieza Unificada', total: 'USD 90' },
      ]
    },
    {
      id: 'falkner',
      type: 'ars',
      label: 'Camping Falkner (4 Noches)',
      total: '$1.740.000',
      perPerson: '$116.000',
      items: [
        { name: '3 Motorhomes ($20k x 4 noches)', total: '$240.000', pp: '$16.000' },
        { name: '15 Personas ($25k x 4 noches)', total: '$1.500.000', pp: '$100.000' },
      ]
    },
    {
      id: 'equipamiento',
      type: 'ars',
      label: 'Equipamiento Extra',
      total: '$1.545.000',
      perPerson: '$103.000',
      items: [
        { name: 'Generador Eléctrico', total: '$300.000', pp: '$20.000' },
        { name: 'Gacebo Reforzado', total: '$150.000', pp: '$10.000' },
        { name: 'Walkie-Talkies (Set)', total: '$90.000', pp: '$6.000' },
        { name: 'Náutica (Packrafts/Paddle)', total: '$1.005.000', pp: '$67.000' },
      ]
    },
    {
      id: 'garantia',
      type: 'usd',
      label: 'Garantía (Reembolsable)',
      total: 'USD 4.500',
      perPerson: 'USD 300',
      items: [
        { name: 'Fondo de Garantía Total', total: 'USD 4.500' },
        { name: 'Nota:', total: 'Se recupera al devolver los vehículos sin daños.' },
      ]
    }
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      {sections.map((section) => (
        <div 
          key={section.id}
          className={`bg-white border transition-all duration-300 rounded-[2rem] overflow-hidden ${
            expanded === section.id ? 'ring-2 ring-glacier border-transparent shadow-xl' : 'border-slate-100 shadow-sm hover:border-glacier/30'
          }`}
        >
          <button 
            onClick={() => setExpanded(expanded === section.id ? null : section.id)}
            className="w-full p-6 text-left flex justify-between items-center"
          >
            <div>
              <div className="flex items-center gap-2 mb-1">
                <span className={`p-1.5 rounded-lg ${section.type === 'usd' ? 'bg-blue-50 text-blue-500' : 'bg-emerald-50 text-emerald-500'}`}>
                  {section.type === 'usd' ? <DollarSign size={14} /> : <Wallet size={14} />}
                </span>
                <p className="text-slate-400 text-[10px] font-black uppercase tracking-[0.15em]">{section.label}</p>
              </div>
              <p className="text-2xl font-black text-slate-800">{section.total}</p>
              <p className={`${section.type === 'usd' ? 'text-blue-500' : 'text-emerald-600'} text-xs font-bold mt-1`}>
                {section.perPerson} p/p
              </p>
            </div>
            <div className={`transition-transform duration-300 ${expanded === section.id ? 'rotate-180 text-glacier' : 'text-slate-300'}`}>
              <ChevronDown size={20} />
            </div>
          </button>

          <AnimatePresence>
            {expanded === section.id && (
              <motion.div 
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: 'auto', opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                className="bg-slate-50/50 border-t border-slate-100"
              >
                <div className="p-6 space-y-4">
                  <div className="flex items-center gap-2 text-slate-400 mb-2">
                    <Info size={12} />
                    <span className="text-[10px] font-bold uppercase tracking-widest">Desglose de compra</span>
                  </div>
                  <div className="space-y-3">
                    {section.items.map((item, i) => (
                      <div key={i} className="flex justify-between items-end border-b border-slate-100 pb-2">
                        <div>
                          <p className="text-xs font-bold text-slate-700">{item.name}</p>
                          {item.pp && <p className="text-[9px] text-slate-400 font-bold uppercase">Por persona: {item.pp}</p>}
                        </div>
                        <p className="text-sm font-black text-slate-800 font-mono">{item.total}</p>
                      </div>
                    ))}
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      ))}
    </div>
  );
};

// --- VEHICLE CARDS ---
export const VehicleFleet = () => {
  const vehicles = [
    { name: 'Ford Transit', pax: '4 pax', price: 'USD 2.000', link: 'https://www.instagram.com/reel/DDuxHnlSf4z/' },
    { name: 'Mercedes Sprinter', pax: '7 pax', price: 'USD 2.750', link: 'https://www.instagram.com/reel/DShw-ugDo4d/' },
    { name: 'Jumper', pax: '4 pax', price: 'USD 2.500', link: '#' },
  ];
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-6">
      {vehicles.map((v, i) => (
        <div key={i} className="bg-white border border-slate-100 rounded-[2rem] p-8 shadow-sm hover:shadow-md transition-shadow group">
          <div className="flex justify-between items-start mb-6">
            <h3 className="text-xl font-black text-slate-800 tracking-tight group-hover:text-glacier transition-colors">{v.name}</h3>
            <span className="bg-slate-50 text-slate-400 px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-widest">{v.pax}</span>
          </div>
          <div className="mb-8">
            <p className="text-slate-400 text-xs font-bold uppercase mb-1">Precio Total</p>
            <p className="text-2xl font-black text-slate-800 font-mono">{v.price}</p>
          </div>
          {v.link !== '#' && (
            <a href={v.link} target="_blank" rel="noopener" className="flex items-center justify-center gap-2 w-full bg-slate-900 text-white py-4 rounded-2xl font-bold text-sm hover:bg-slate-800 transition-all shadow-lg shadow-slate-200">
              Ver Galería <ExternalLink size={14} />
            </a>
          )}
        </div>
      ))}
    </div>
  );
};
