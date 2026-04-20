'use client';
import { useState } from 'react';
import { CheckCircle2, Circle, Ship, Package, AlertTriangle, Edit2, Check } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

// --- EDITABLE ITINERARY ---
const initialItinerary = [
  { id: 1, day: '27/12', title: 'Salida Rosario', desc: 'Salida de Rosario -> Parada y noche en Rufino.', color: 'border-white' },
  { id: 2, day: '28/12', title: 'Tramo Rufino -> Falkner', desc: 'Tramo Rufino -> Lago Falkner (15 horas de manejo). Llegada y armado de base.', color: 'border-glacier' },
  { id: 3, day: '29/12 - 01/01', title: 'Base Lago Falkner', desc: 'Estadía fija en Lago Falkner. Actividades: Cerro Falkner, Cascada Ñivinco, Relax.', color: 'border-forest' },
  { id: 4, day: '02/01 - 04/01', title: 'SM de los Andes', desc: 'Playa Yuco, Quila Quina, Meliquina + Pozones de Caleufu.', color: 'border-stone' },
  { id: 5, day: '05/01 - 07/01', title: 'Villa Traful & Manso', desc: 'Bosque Sumergido y Río Manso (Camping La Pasarela). Villa Tacul y Cervecería Patagonia.', color: 'border-glacier' },
  { id: 6, day: '08/01', title: 'Devolución', desc: 'Bariloche Centro, limpieza y entrega 10:00am.', color: 'border-stone' },
];

export const Itinerary = () => {
  const [items, setItems] = useState(initialItinerary);
  const [editingId, setEditingId] = useState<number | null>(null);

  const handleUpdate = (id: number, field: string, value: string) => {
    setItems(items.map(item => item.id === id ? { ...item, [field]: value } : item));
  };

  return (
    <div className="space-y-4">
      {items.map((item) => (
        <motion.div 
          key={item.id}
          layout
          className={`relative group p-4 bg-gray-900/30 border-l-4 ${item.color} rounded-r-xl transition-all`}
        >
          <div className="flex justify-between items-start">
            <div className="flex-1">
              <span className="text-[10px] font-bold text-stone uppercase tracking-widest">{item.day}</span>
              {editingId === item.id ? (
                <div className="mt-2 space-y-2">
                  <input 
                    className="w-full bg-black border border-white/10 p-2 rounded text-white font-bold"
                    value={item.title}
                    onChange={(e) => handleUpdate(item.id, 'title', e.target.value)}
                  />
                  <textarea 
                    className="w-full bg-black border border-white/10 p-2 rounded text-stone text-sm"
                    value={item.desc}
                    onChange={(e) => handleUpdate(item.id, 'desc', e.target.value)}
                  />
                </div>
              ) : (
                <>
                  <h4 className="text-white font-bold text-lg leading-tight mt-1">{item.title}</h4>
                  <p className="text-stone text-sm leading-tight mt-2">{item.desc}</p>
                </>
              )}
            </div>
            
            <button 
              onClick={() => setEditingId(editingId === item.id ? null : item.id)}
              className="p-2 text-stone hover:text-glacier transition-colors"
            >
              {editingId === item.id ? <Check size={18} /> : <Edit2 size={16} className="opacity-0 group-hover:opacity-100" />}
            </button>
          </div>
        </motion.div>
      ))}
    </div>
  );
};

// --- CHECKLIST (Mantenido) ---
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
