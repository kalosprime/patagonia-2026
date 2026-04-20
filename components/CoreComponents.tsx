'use client';
import { useState, useEffect } from 'react';
import { ExternalLink } from 'lucide-react';
import { motion } from 'framer-motion';

// --- COUNTDOWN ---
export const Countdown = () => {
  const [timeLeft, setTimeLeft] = useState({ days: 0, hours: 0, minutes: 0, seconds: 0 });

  useEffect(() => {
    const targetDate = new Date('2026-12-26T12:00:00').getTime();
    const timer = setInterval(() => {
      const now = new Date().getTime();
      const distance = targetDate - now;
      setTimeLeft({
        days: Math.floor(distance / (1000 * 60 * 60 * 24)),
        hours: Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
        minutes: Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60)),
        seconds: Math.floor((distance % (1000 * 60)) / 1000),
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

// --- FINANCIALS ---
export const Financials = () => {
  const data = [
    { label: 'Alquiler Total', value: 'USD 7.340', sub: 'USD 489,33 p/p' },
    { label: 'Garantía', value: 'USD 4.500', sub: 'USD 300 p/p (Reembolsable)' },
    { label: 'Limpieza', value: 'USD 90', sub: 'Ya incluido' },
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
      {data.map((item, idx) => (
        <motion.div 
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          key={idx} 
          className="bg-white border border-slate-100 p-6 rounded-3xl shadow-sm"
        >
          <p className="text-slate-400 text-[10px] font-bold uppercase tracking-wider mb-1">{item.label}</p>
          <p className="text-2xl font-black text-slate-800 mb-1">{item.value}</p>
          <p className="text-forest text-xs font-bold">{item.sub}</p>
        </motion.div>
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
        <div key={i} className="bg-white border border-slate-100 rounded-[2rem] p-8 shadow-sm hover:shadow-md transition-shadow">
          <div className="flex justify-between items-start mb-6">
            <h3 className="text-xl font-black text-slate-800 tracking-tight">{v.name}</h3>
            <span className="bg-glacier/10 text-glacier px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-widest">{v.pax}</span>
          </div>
          <div className="mb-8">
            <p className="text-slate-400 text-xs font-bold uppercase mb-1">Precio Total</p>
            <p className="text-2xl font-black text-slate-800">{v.price}</p>
          </div>
          {v.link !== '#' && (
            <a href={v.link} target="_blank" rel="noopener" className="flex items-center justify-center gap-2 w-full bg-slate-900 text-white py-4 rounded-2xl font-bold text-sm hover:bg-slate-800 transition-colors">
              Ver Galería <ExternalLink size={14} />
            </a>
          )}
        </div>
      ))}
    </div>
  );
};
