'use client';
import { useState } from 'react';
import { CheckCircle2, Circle, Ship, Package, AlertTriangle, MapPin } from 'lucide-react';
import { motion } from 'framer-motion';

// --- ITINERARY ---
const itinerary = [
  { day: 'Día 1', title: 'Villa La Angostura', desc: 'Retiro 12:00hs, Compra masiva, Noche en Lago Correntoso.', color: 'border-glacier' },
  { day: 'Días 2-4', title: 'Lago Falkner', desc: 'Base en Falkner. Actividades: Cerro Falkner, Cascada Ñivinco, Lago Hermoso.', color: 'border-forest' },
  { day: 'Días 5-7', title: 'SM de los Andes', desc: 'Playa Yuco, Quila Quina, Meliquina + Pozones de Caleufu.', color: 'border-stone' },
  { day: 'Días 8-9', title: 'Villa Traful', desc: 'Bosque Sumergido y Playa La Puntilla. (Verificar camino).', color: 'border-glacier' },
  { day: 'Días 10-12', title: 'Bariloche - Río Manso', desc: 'OBLIGATORIO: Camping La Pasarela. Villa Tacul, Playa Sin Viento, Cervecería Patagonia.', color: 'border-forest' },
  { day: 'Días 13-14', title: 'Bariloche Centro', desc: 'Limpieza y Devolución (08/01 10:00am).', color: 'border-stone' },
];

export const Itinerary = () => (
  <div className="space-y-4">
    {itinerary.map((item, idx) => (
      <motion.div 
        key={idx}
        initial={{ opacity: 0, x: -20 }}
        whileInView={{ opacity: 1, x: 0 }}
        transition={{ delay: idx * 0.1 }}
        className={`flex gap-4 p-4 bg-gray-900/30 border-l-4 ${item.color} rounded-r-xl`}
      >
        <div className="flex-shrink-0 w-20">
          <p className="text-xs font-bold text-stone uppercase tracking-tighter">{item.day}</p>
        </div>
        <div>
          <h4 className="text-white font-bold text-lg">{item.title}</h4>
          <p className="text-stone text-sm leading-tight mt-1">{item.desc}</p>
        </div>
      </motion.div>
    ))}
  </div>
);

// --- CHECKLIST ---
const gearData = [
  { category: 'Náutica', items: ['4 Packrafts dobles', '3 Paddle Surf', '3 Infladores eléctricos'], icon: <Ship className="text-glacier" size={18} /> },
  { category: 'Logística', items: ['Generador eléctrico', 'Mesa + 15 sillas', 'Gacebo', 'Walkie-Talkies', 'Luces colgantes'], icon: <Package className="text-forest" size={18} /> },
  { category: 'Crucial', items: ['Parlante grande', 'Distribuidora de alcohol', 'Hielo'], icon: <AlertTriangle className="text-yellow-500" size={18} /> },
];

export const GearChecklist = () => {
  const [checked, setChecked] = useState<string[]>([]);

  const toggle = (item: string) => {
    setChecked(prev => prev.includes(item) ? prev.filter(i => i !== item) : [...prev, item]);
  };

  return (
    <div className="space-y-8">
      {gearData.map((cat, i) => (
        <div key={i}>
          <div className="flex items-center gap-2 mb-4">
            {cat.icon}
            <h3 className="text-white font-bold uppercase tracking-wider text-sm">{cat.category}</h3>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
            {cat.items.map(item => (
              <button
                key={item}
                onClick={() => toggle(item)}
                className={`flex items-center gap-3 p-3 rounded-xl border transition-all ${
                  checked.includes(item) ? 'bg-forest/20 border-forest text-white' : 'bg-gray-900 border-white/5 text-stone'
                }`}
              >
                {checked.includes(item) ? <CheckCircle2 size={18} className="text-forest" /> : <Circle size={18} />}
                <span className="text-sm text-left">{item}</span>
              </button>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
};
