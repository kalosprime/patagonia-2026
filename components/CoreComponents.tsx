'use client';
import { useState, useEffect } from 'react';
import { MapPin, Users, DollarSign, Calendar, Info, ExternalLink, CheckSquare, Square } from 'lucide-react';
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
    <div className="flex justify-center space-x-4 py-8">
      {Object.entries(timeLeft).map(([label, value]) => (
        <div key={label} className="flex flex-col items-center bg-gray-900 border border-glacier/30 rounded-xl p-4 w-20 shadow-lg shadow-glacier/5">
          <span className="text-2xl font-bold text-glacier">{value < 0 ? 0 : value}</span>
          <span className="text-[10px] uppercase text-stone tracking-widest">{label}</span>
        </div>
      ))}
    </div>
  );
};

// --- FINANCIALS ---
export const Financials = () => {
  const data = [
    { label: 'Alquiler Total', value: 'USD 7.340', sub: 'USD 489,33 p/p' },
    { label: 'Garantía', value: 'USD 4.500', sub: 'USD 300 p/p (Recuperables)' },
    { label: 'Limpieza', value: 'USD 90', sub: 'Incluido en total' },
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
      {data.map((item, idx) => (
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          key={idx} 
          className="bg-gray-900/50 border border-white/10 p-5 rounded-2xl"
        >
          <p className="text-stone text-sm mb-1">{item.label}</p>
          <p className="text-2xl font-bold text-white mb-1">{item.value}</p>
          <p className="text-forest text-xs font-semibold">{item.sub}</p>
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
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-8">
      {vehicles.map((v, i) => (
        <div key={i} className="group relative overflow-hidden bg-gray-900 border border-white/5 rounded-3xl p-6 transition-all hover:border-glacier/50">
          <div className="flex justify-between items-start mb-4">
            <h3 className="text-xl font-bold text-white">{v.name}</h3>
            <span className="bg-forest/20 text-forest px-3 py-1 rounded-full text-xs font-bold">{v.pax}</span>
          </div>
          <p className="text-stone mb-6">Precio: <span className="text-white font-mono">{v.price}</span></p>
          {v.link !== '#' && (
            <a href={v.link} target="_blank" rel="noopener" className="flex items-center justify-center gap-2 w-full bg-white text-black py-3 rounded-xl font-bold hover:bg-glacier transition-colors">
              Ver en Instagram <ExternalLink size={16} />
            </a>
          )}
        </div>
      ))}
    </div>
  );
};
