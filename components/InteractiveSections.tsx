'use client';
import { useState } from 'react';
import { CheckCircle2, Circle, Ship, Package, AlertTriangle, Edit2, Check, Plus, Trash2, User, X, Info, Droplets, MapPin, ArrowRight } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

// --- DYNAMIC ITINERARY ---
const initialItinerary = [
  { id: 1, day: '27/12', title: 'Salida Rosario', desc: 'Salida de Rosario -> Parada y noche en Rufino.', color: 'border-blue-500' },
  { id: 2, day: '28/12', title: 'Tramo Rufino -> Falkner', desc: 'Tramo Rufino -> Lago Falkner (15 horas de manejo).', color: 'border-cyan-400' },
  { id: 3, id_original: 'falkner', day: '29/12 - 01/01', title: 'Base Lago Falkner', desc: 'Estadía fija. Año Nuevo, Cerro Falkner y Relax.', color: 'border-forest' },
  { id: 4, day: '02/01 - 04/01', title: 'SM de los Andes', desc: 'Playa Yuco, Quila Quina y Meliquina.', color: 'border-orange-400' },
  { id: 5, day: '05/01 - 07/01', title: 'Villa Traful & Manso', desc: 'Bosque Sumergido y Río Manso (Camping La Pasarela).', color: 'border-cyan-500' },
];

export const Itinerary = () => {
  const [items, setItems] = useState(initialItinerary);
  const [editingId, setEditingId] = useState<number | string | null>(null);

  const addItem = () => {
    const newId = Date.now();
    setItems([...items, { id: newId, day: 'Fecha', title: 'Nuevo Destino', desc: 'Descripción de la actividad...', color: 'border-gray-300' }]);
    setEditingId(newId);
  };

  const removeItem = (id: number | string) => setItems(items.filter(i => i.id !== id));

  const handleUpdate = (id: number | string, field: string, value: string) => {
    setItems(items.map(item => item.id === id ? { ...item, [field]: value } : item));
  };

  return (
    <div className="space-y-4">
      <AnimatePresence>
        {items.map((item) => (
          <motion.div 
            key={item.id}
            layout
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, scale: 0.95 }}
            className={`relative group p-5 bg-white border-l-4 ${item.color} rounded-r-2xl shadow-sm border-y border-r border-gray-100 transition-all hover:shadow-md`}
          >
            <div className="flex justify-between items-start">
              <div className="flex-1">
                <span className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">{item.day}</span>
                {editingId === item.id ? (
                  <div className="mt-2 space-y-2">
                    <div className="flex gap-2">
                      <input className="w-1/4 bg-gray-50 border border-gray-200 p-2 rounded-lg text-xs" value={item.day} onChange={(e) => handleUpdate(item.id, 'day', e.target.value)} placeholder="Fecha" />
                      <input className="flex-1 bg-gray-50 border border-gray-200 p-2 rounded-lg text-sm font-bold" value={item.title} onChange={(e) => handleUpdate(item.id, 'title', e.target.value)} placeholder="Título" />
                    </div>
                    <textarea className="w-full bg-gray-50 border border-gray-200 p-2 rounded-lg text-gray-600 text-sm h-20" value={item.desc} onChange={(e) => handleUpdate(item.id, 'desc', e.target.value)} placeholder="Descripción" />
                  </div>
                ) : (
                  <>
                    <h4 className="text-gray-800 font-bold text-lg leading-tight mt-1">{item.title}</h4>
                    <p className="text-gray-500 text-sm leading-tight mt-2">{item.desc}</p>
                  </>
                )}
              </div>
              
              <div className="flex items-center gap-1">
                <button onClick={() => setEditingId(editingId === item.id ? null : item.id)} className="p-2 text-gray-300 hover:text-glacier transition-colors">
                  {editingId === item.id ? <Check size={18} className="text-forest" /> : <Edit2 size={16} className="opacity-0 group-hover:opacity-100" />}
                </button>
                <button onClick={() => removeItem(item.id)} className="p-2 text-gray-200 hover:text-red-400 opacity-0 group-hover:opacity-100 transition-colors">
                  <Trash2 size={16} />
                </button>
              </div>
            </div>
          </motion.div>
        ))}
      </AnimatePresence>
      <button onClick={addItem} className="w-full py-4 border-2 border-dashed border-gray-200 rounded-2xl text-gray-400 font-bold text-sm hover:border-glacier hover:text-glacier transition-all flex items-center justify-center gap-2">
        <Plus size={18} /> Agregar Etapa al Viaje
      </button>
    </div>
  );
};

// --- DISCARDED PLACES ---
const discardedData = [
  { name: 'Playa Catritre', reason: 'Ambiente muy familiar. Playa Yuco tiene mejor onda para el grupo.', tag: 'San Martín' },
  { name: 'Laguna Negra', reason: 'Camping con instalaciones básicas. Preferimos asegurar Falkner/Hermoso.', tag: 'Bariloche' },
  { name: 'Cascada Vullignanco', reason: 'No destaca tanto frente a Ñivinco y Santa Ana.', tag: 'Ruta 40' },
  { name: 'El Bolsón / Cajón del Azul', reason: 'Suma demasiadas horas de manejo. Priorizamos descanso en Río Manso.', tag: 'Sur Profundo' },
];

export const DiscardedPlaces = () => (
  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
    {discardedData.map((place, i) => (
      <div key={i} className="bg-gray-50 border border-gray-100 p-5 rounded-2xl relative overflow-hidden group">
        <div className="absolute top-0 right-0 p-3">
          <Info size={14} className="text-gray-300" />
        </div>
        <span className="text-[9px] font-bold text-gray-400 uppercase tracking-widest mb-2 block">{place.tag}</span>
        <h4 className="text-gray-700 font-bold text-sm mb-1 line-through opacity-60">{place.name}</h4>
        <p className="text-gray-500 text-xs leading-relaxed italic">"{place.reason}"</p>
        <button className="mt-4 text-[10px] font-bold text-glacier flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-all uppercase tracking-tighter">
          ¿Lo sumamos igual? <ArrowRight size={12} />
        </button>
      </div>
    ))}
  </div>
);

// --- THE LAKES ---
const lakes = [
  { name: 'Lago Falkner', highlight: '¡La gran base!', desc: 'Acampe largo, trekking al cerro y recibida de Año Nuevo.' },
  { name: 'Lago Lácar', highlight: 'Caribe del Sur', desc: 'Visita a Playa Yuco y La Islita en San Martín de los Andes.' },
  { name: 'Lago Correntoso', highlight: 'Aguas Esmeralda', desc: 'Parada estratégica cerca de Villa La Angostura.' },
  { name: 'Lago Hermoso', highlight: 'El nombre lo dice todo', desc: 'Camping tranquilo y paisajes imponentes.' },
  { name: 'Lago Traful', highlight: 'Bosque Sumergido', desc: 'Excursión en lancha obligatoria en la zona de Villa Traful.' },
  { name: 'Lago Espejo Chico', highlight: 'El Plan B perfecto', desc: 'Refugio cristalino si el Pichi Traful está lleno.' },
];

export const LakeList = () => (
  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
    {lakes.map((lake, i) => (
      <div key={i} className="bg-white p-5 rounded-3xl border border-gray-100 shadow-sm flex flex-col items-start gap-3">
        <div className="bg-blue-50 p-2 rounded-xl text-blue-500">
          <Droplets size={20} />
        </div>
        <div>
          <h4 className="text-gray-800 font-black text-sm uppercase tracking-tight">{lake.name}</h4>
          <span className="text-[10px] font-bold text-glacier uppercase mb-2 block">{lake.highlight}</span>
          <p className="text-gray-500 text-xs leading-tight">{lake.desc}</p>
        </div>
      </div>
    ))}
  </div>
);

// --- CREW NOTES (Mantenido) ---
export const CrewNotes = () => {
  const [notes, setNotes] = useState<{id: number, author: string, text: string, date: string}[]>([]);
  const [newNote, setNewNote] = useState({ author: '', text: '' });
  const addNote = () => {
    if (newNote.author && newNote.text) {
      setNotes([{ id: Date.now(), ...newNote, date: new Date().toLocaleDateString() }, ...notes]);
      setNewNote({ author: '', text: '' });
    }
  };
  const deleteNote = (id: number) => setNotes(notes.filter(n => n.id !== id));
  return (
    <div className="space-y-6">
      <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <input placeholder="Tu nombre" className="bg-gray-50 border border-gray-200 p-3 rounded-xl text-sm outline-none focus:border-glacier text-gray-800" value={newNote.author} onChange={e => setNewNote({...newNote, author: e.target.value})} />
          <button onClick={addNote} className="bg-forest text-white px-6 py-3 rounded-xl font-bold text-sm flex items-center justify-center gap-2 hover:bg-forest/90 transition-all"><Plus size={18} /> Agregar Nota</button>
        </div>
        <textarea placeholder="Escribe algo para el grupo..." className="w-full bg-gray-50 border border-gray-200 p-4 rounded-xl text-sm outline-none focus:border-glacier text-gray-800 h-24" value={newNote.text} onChange={e => setNewNote({...newNote, text: e.target.value})} />
      </div>
      <div className="grid grid-cols-1 gap-4">
        <AnimatePresence>
          {notes.map(note => (
            <motion.div key={note.id} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, scale: 0.95 }} className="bg-white p-5 rounded-2xl border border-gray-100 shadow-sm relative group">
              <button onClick={() => deleteNote(note.id)} className="absolute top-4 right-4 text-gray-300 hover:text-red-500 opacity-0 group-hover:opacity-100 transition-all"><Trash2 size={16} /></button>
              <div className="flex items-center gap-2 mb-3">
                <div className="w-8 h-8 bg-glacier/20 rounded-full flex items-center justify-center text-glacier"><User size={14} /></div>
                <div><p className="text-sm font-bold text-gray-800">{note.author}</p><p className="text-[10px] text-gray-400 uppercase">{note.date}</p></div>
              </div>
              <p className="text-gray-600 text-sm leading-relaxed">{note.text}</p>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>
    </div>
  );
};

// --- DYNAMIC GEAR CHECKLIST (Mantenido) ---
export const GearChecklist = () => {
  const [categories, setCategories] = useState([
    { id: 1, name: 'Náutica', items: ['4 Packrafts dobles', '3 Paddle Surf', '3 Infladores'], icon: <Ship className="text-glacier" /> },
    { id: 2, name: 'Logística', items: ['Generador', '15 Sillas', 'Gacebo', 'Walkies'], icon: <Package className="text-forest" /> },
    { id: 3, name: 'Crucial', items: ['Parlante Grande', 'Alcohol (Distribuidora)', 'Hielo'], icon: <AlertTriangle className="text-orange-500" /> }
  ]);
  const [checked, setChecked] = useState<string[]>([]);
  const [newItemText, setNewItemText] = useState<{ [key: number]: string }>({});
  const toggleItem = (item: string) => setChecked(prev => prev.includes(item) ? prev.filter(i => i !== item) : [...prev, item]);
  const addItem = (catId: number) => {
    const text = newItemText[catId];
    if (!text) return;
    setCategories(prev => prev.map(cat => cat.id === catId ? { ...cat, items: [...cat.items, text] } : cat));
    setNewItemText({ ...newItemText, [catId]: '' });
  };
  const removeItem = (catId: number, itemToRemove: string) => {
    setCategories(prev => prev.map(cat => cat.id === catId ? { ...cat, items: cat.items.filter(i => i !== itemToRemove) } : cat));
    setChecked(prev => prev.filter(i => i !== itemToRemove));
  };
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {categories.map((cat) => (
        <div key={cat.id} className="bg-white p-6 rounded-3xl border border-gray-100 shadow-sm flex flex-col h-full">
          <div className="flex items-center gap-2 mb-6">{cat.icon}<h3 className="text-gray-800 font-black uppercase text-xs tracking-[0.2em]">{cat.name}</h3></div>
          <div className="space-y-3 flex-1 mb-6">
            <AnimatePresence>{cat.items.map((item, idx) => (
              <motion.div key={item + idx} initial={{ opacity: 0, x: -5 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, scale: 0.9 }} className="flex items-center justify-between group">
                <button onClick={() => toggleItem(item)} className="flex items-center gap-3 flex-1 text-left">{checked.includes(item) ? <CheckCircle2 size={18} className="text-forest flex-shrink-0" /> : <Circle size={18} className="text-gray-200 group-hover:text-glacier flex-shrink-0" />}<span className={`text-sm font-medium ${checked.includes(item) ? 'text-gray-300 line-through' : 'text-gray-600'}`}>{item}</span></button>
                <button onClick={() => removeItem(cat.id, item)} className="text-gray-200 hover:text-red-400 opacity-0 group-hover:opacity-100 transition-all p-1"><X size={14} /></button>
              </motion.div>
            ))}</AnimatePresence>
          </div>
          <div className="pt-4 border-t border-gray-50 mt-auto flex gap-2">
            <input type="text" placeholder="Nueva tarea..." className="flex-1 bg-gray-50 border border-gray-100 p-2 rounded-xl text-xs outline-none focus:border-glacier text-gray-700" value={newItemText[cat.id] || ''} onChange={(e) => setNewItemText({ ...newItemText, [cat.id]: e.target.value })} onKeyDown={(e) => e.key === 'Enter' && addItem(cat.id)} />
            <button onClick={() => addItem(cat.id)} className="bg-gray-100 text-gray-400 p-2 rounded-xl hover:bg-glacier hover:text-white transition-all"><Plus size={16} /></button>
          </div>
        </div>
      ))}
    </div>
  );
};
