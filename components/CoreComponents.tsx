'use client';
import { useState, useEffect } from 'react';
import { ExternalLink, DollarSign, Wallet, ChevronDown, Info } from 'lucide-react';

// --- COUNTDOWN ---
export const Countdown = () => {
  const [timeLeft, setTimeLeft] = useState<any>(null);

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

  if (!timeLeft) return null;

  return (
    <div className="flex justify-center space-x-3 py-6">
      {Object.entries(timeLeft).map(([label, value]: [string, any]) => (
        <div key={label} className="flex flex-col items-center bg-white border border-slate-200 rounded-2xl p-4 w-20 shadow-sm">
          <span className="text-2xl font-black text-slate-800">{value < 0 ? 0 : value}</span>
          <span className="text-[9px] uppercase text-slate-400 font-bold tracking-widest">{label}</span>
        </div>
      ))}
    </div>
  );
};

// --- FINANCIALS ---
export const Financials = () => {
  const [expanded, setExpanded] = useState<string | null>(null);

  const sections = [
    { id: 'alquiler', type: 'usd', label: 'Alquiler Motorhomes', total: 'USD 7.340', pp: 'USD 489,33', items: [{ n: 'Mercedes Sprinter', t: 'USD 2.750' }, { n: 'Jumper', t: 'USD 2.500' }, { n: 'Ford Transit', t: 'USD 2.000' }, { n: 'Limpieza', t: 'USD 90' }] },
    { id: 'falkner', type: 'ars', label: 'Camping Falkner', total: '$1.740.000', pp: '$116.000', items: [{ n: '3 MH ($20k x 4n)', t: '$240.000' }, { n: '15 Pax ($25k x 4n)', t: '$1.500.000' }] },
    { id: 'equip', type: 'ars', label: 'Equipamiento Extra', total: '$1.545.000', pp: '$103.000', items: [{ n: 'Generador', t: '$300k' }, { n: 'Gacebo', t: '$150k' }, { n: 'Walkies', t: '$90k' }, { n: 'Náutica', t: '$1.005M' }] },
    { id: 'garantia', type: 'usd', label: 'Garantía', total: 'USD 4.500', pp: 'USD 300', items: [{ n: 'Total Reembolsable', t: 'USD 4.500' }] }
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      {sections.map((s) => (
        <div key={s.id} className="bg-white border border-slate-100 rounded-[2rem] overflow-hidden shadow-sm">
          <button onClick={() => setExpanded(expanded === s.id ? null : s.id)} className="w-full p-6 text-left flex justify-between items-center">
            <div>
              <p className="text-slate-400 text-[9px] font-black uppercase tracking-widest mb-1">{s.label}</p>
              <p className="text-2xl font-black text-slate-800">{s.total}</p>
              <p className="text-blue-500 text-xs font-bold">{s.pp} p/p</p>
            </div>
            <ChevronDown size={20} className={`text-slate-300 transition-transform ${expanded === s.id ? 'rotate-180' : ''}`} />
          </button>
          {expanded === s.id && (
            <div className="bg-slate-50 p-6 pt-0 space-y-2">
              {s.items.map((item, i) => (
                <div key={i} className="flex justify-between text-xs border-b border-slate-200 pb-2">
                  <span className="text-slate-600">{item.n}</span>
                  <span className="font-bold text-slate-800">{item.t}</span>
                </div>
              ))}
            </div>
          )}
        </div>
      ))}
    </div>
  );
};

export const VehicleFleet = () => {
  const vehicles = [
    { name: 'Ford Transit', pax: '4 pax', price: 'USD 2.000', link: 'https://www.instagram.com/reel/DDuxHnlSf4z/' },
    { name: 'Mercedes Sprinter', pax: '7 pax', price: 'USD 2.750', link: 'https://www.instagram.com/reel/DShw-ugDo4d/' },
    { name: 'Jumper', pax: '4 pax', price: 'USD 2.500', link: '#' },
  ];
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-6">
      {vehicles.map((v, i) => (
        <div key={i} className="bg-white border border-slate-100 rounded-[2rem] p-8 shadow-sm">
          <h3 className="text-xl font-black text-slate-800 mb-4">{v.name}</h3>
          <p className="text-slate-400 text-xs font-bold uppercase">Precio Alquiler</p>
          <p className="text-2xl font-black text-slate-800 mb-6">{v.price}</p>
          {v.link !== '#' && (
            <a href={v.link} target="_blank" rel="noopener noreferrer" className="block text-center bg-slate-900 text-white py-4 rounded-2xl font-bold text-sm">Ver Galería</a>
          )}
        </div>
      ))}
    </div>
  );
};
