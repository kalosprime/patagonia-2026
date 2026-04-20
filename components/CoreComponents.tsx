'use client';
import { useState, useEffect } from 'react';
import { ExternalLink, DollarSign, Wallet, CreditCard } from 'lucide-react';
import { motion } from 'framer-motion';

// --- COUNTDOWN ---
export const Countdown = () => {
  const [timeLeft, setTimeLeft] = useState({ días: 0, horas: 0, min: 0, seg: 0 });
  useEffect(() => {
    const targetDate = new Date('2026-12-27T08:00:00').getTime(); // Salida Rosario
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

// --- FINANCIALS (USD & ARS) ---
export const Financials = () => {
  const usdData = [
    { label: 'Alquiler Motorhomes', value: 'USD 7.340', sub: 'USD 489,33 p/p' },
    { label: 'Garantía (Reembolsable)', value: 'USD 4.500', sub: 'USD 300 p/p' },
  ];

  const arsData = [
    { label: 'Camping Falkner (4 Noches)', value: '$1.740.000', sub: '$116.000 p/p', detail: '3 MH + 15 Pax' },
    { label: 'Equipamiento Extra', value: '$1.545.000', sub: '$103.000 p/p', detail: 'Náutica, Gacebo, Walkies' },
  ];

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {usdData.map((item, idx) => (
          <div key={idx} className="bg-white border border-blue-50 p-6 rounded-3xl shadow-sm relative overflow-hidden">
            <DollarSign className="absolute -right-2 -bottom-2 text-blue-50/50" size={80} />
            <p className="text-slate-400 text-[10px] font-black uppercase tracking-widest mb-1">{item.label}</p>
            <p className="text-3xl font-black text-slate-800 mb-1">{item.value}</p>
            <p className="text-blue-500 text-sm font-bold">{item.sub}</p>
          </div>
        ))}
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {arsData.map((item, idx) => (
          <div key={idx} className="bg-white border border-emerald-50 p-6 rounded-3xl shadow-sm relative overflow-hidden">
            <Wallet className="absolute -right-2 -bottom-2 text-emerald-50/50" size={80} />
            <p className="text-slate-400 text-[10px] font-black uppercase tracking-widest mb-1">{item.label}</p>
            <p className="text-3xl font-black text-slate-800 mb-1">{item.value}</p>
            <div className="flex justify-between items-center">
              <p className="text-emerald-600 text-sm font-bold">{item.sub}</p>
              <span className="text-[10px] bg-emerald-50 text-emerald-600 px-2 py-1 rounded-lg font-bold">{item.detail}</span>
            </div>
          </div>
        ))}
      </div>
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
          <p className="text-slate-400 text-xs font-bold uppercase mb-1">Precio Alquiler</p>
          <p className="text-2xl font-black text-slate-800 mb-6">{v.price}</p>
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
