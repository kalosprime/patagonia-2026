'use client';
import { useState } from 'react';
import { CheckCircle2, Circle, Ship, Package, AlertTriangle, Edit2, Check, Plus, Trash2, User, X, Info, Droplets, MapPin, ArrowRight, Star, Zap, Mountain, Beer, Tent, Camera, ExternalLink } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

// --- CARD LINK COMPONENT ---
const PhotoCard = ({ href, title, desc, icon, color }: { href: string, title: string, desc: string, icon: any, color: string }) => (
  <a 
    href={href} 
    target="_blank" 
    rel="noopener noreferrer"
    className={`${color} group relative p-6 rounded-[2.5rem] border border-white shadow-sm flex flex-col justify-between transition-all hover:shadow-xl hover:-translate-y-1 overflow-hidden min-h-[160px]`}
  >
    <div className="absolute top-0 right-0 p-6 opacity-5 group-hover:opacity-10 transition-opacity">
      <MapPin size={80} />
    </div>
    <div>
      <div className="bg-white p-3 rounded-2xl shadow-sm h-fit w-fit mb-4 text-slate-700">
        {icon}
      </div>
      <h4 className="font-black text-slate-800 text-sm uppercase tracking-tight">{title}</h4>
      <p className="text-slate-500 text-[11px] leading-tight mt-1 pr-8">{desc}</p>
    </div>
    <div className="mt-4 flex items-center gap-1.5 text-[9px] font-black text-slate-400 uppercase tracking-widest group-hover:text-glacier transition-colors">
      Ver en Mapa <ExternalLink size={10} />
    </div>
  </a>
);

// --- THE IMPERDIBLES (HIGHLIGHTS) ---
export const Highlights = () => {
  const data = [
    { title: 'Hito Año Nuevo', desc: 'Festejo en Lago Falkner.', icon: <Star size={16} />, color: 'bg-yellow-50', link: 'https://www.google.com/maps/search/Lago+Falkner+Neuquen/' },
    { title: 'Días de Sol', desc: 'Playa Yuco, La Islita y Playa Bonita.', icon: <Droplets size={16} />, color: 'bg-blue-50', link: 'https://www.google.com/maps/search/Playa+Yuco+San+Martin+de+los+Andes/' },
    { title: 'Trekking & Cascadas', desc: 'Ñivinco, Santa Ana y Dora.', icon: <Mountain size={16} />, color: 'bg-emerald-50', link: 'https://www.google.com/maps/search/Cascada+Ñivinco/' },
    { title: 'Adrenalina', desc: 'Salto al agua en el Puente Ruca Malen.', icon: <Zap size={16} />, color: 'bg-orange-50', link: 'https://www.google.com/maps/search/Puente+Ruca+Malen/' },
    { title: 'Cierre Épico', desc: 'Refugio Patagonia (Circuito Chico).', icon: <Beer size={16} />, color: 'bg-amber-50', link: 'https://www.google.com/maps/search/Villa+Tacul+Bariloche/' },
    { title: 'Bases Relax', desc: 'Camping Pichi Traful y Espejo Chico.', icon: <Tent size={16} />, color: 'bg-indigo-50', link: 'https://www.google.com/maps/search/Lago+Espejo+Chico+Neuquen/' },
  ];

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
      {data.map((item, idx) => (
        <PhotoCard key={idx} href={item.link} title={item.title} desc={item.desc} icon={item.icon} color={item.color} />
      ))}
    </div>
  );
};

// --- DYNAMIC ITINERARY ---
const initialItinerary = [
  { id: 1, day: '27/12', title: 'Salida Rosario', desc: 'Parada y noche en Rufino.', color: 'border-blue-500', link: 'https://www.google.com/maps/search/Rufino+Santa+Fe/' },
  { id: 2, day: '28/12', title: 'Tramo Rufino -> Falkner', desc: '15 horas de manejo. Llegada al Falkner.', color: 'border-cyan-400', link: 'https://www.google.com/maps/search/Lago+Falkner+Neuquen/' },
  { id: 3, day: '29/12 - 01/01', title: 'Festejos Año Nuevo', desc: '4 Noches de base en Camping Falkner.', color: 'border-emerald-500', link: 'https://www.google.com/maps/search/Lago+Falkner+Neuquen/' },
  { id: 4, day: '02/01 - 04/01', title: 'Ruta 7 Lagos & SMAndes', desc: 'Playa Yuco, Ñivinco y SMAndes.', color: 'border-orange-400', link: 'https://www.google.com/maps/search/Playa+Yuco+San+Martin+de+los+Andes/' },
  { id: 5, day: '05/01 - 07/01', title: 'Bariloche & Manso', desc: 'Río Manso, Puente Ruca Malen y Refugio Patagonia.', color: 'border-cyan-500', link: 'https://www.google.com/maps/search/Camping+La+Pasarela+Rio+Manso/' },
];

export const Itinerary = () => {
  const [items, setItems] = useState(initialItinerary);
  const [editingId, setEditingId] = useState<number | string | null>(null);
  const handleUpdate = (id: number | string, field: string, value: string) => setItems(items.map(item => item.id === id ? { ...item, [field]: value } : item));
  const addItem = () => { const id = Date.now(); setItems([...items, { id, day: 'Fecha', title: 'Nueva Etapa', desc: '...', color: 'border-gray-200', link: '' }]); setEditingId(id); };
  const removeItem = (id: number | string) => setItems(items.filter(i => i.id !== id));

  return (
    <div className="space-y-4">
      <AnimatePresence>
        {items.map((item) => (
          <motion.div key={item.id} layout initial={{ opacity: 0 }} animate={{ opacity: 1 }} className={`relative p-6 bg-white border-l-4 ${item.color} rounded-r-[2rem] shadow-sm border-y border-r border-gray-100`}>
            <div className="flex justify-between items-start gap-4">
              <div className="flex-1">
                <span className="text-[9px] font-black text-slate-400 uppercase tracking-widest">{item.day}</span>
                {editingId === item.id ? (
                  <div className="mt-2 space-y-2">
                    <input className="w-full bg-slate-50 border border-slate-200 p-2 rounded-lg text-sm font-bold" value={item.title} onChange={(e) => handleUpdate(item.id, 'title', e.target.value)} />
                    <textarea className="w-full bg-slate-50 border border-slate-200 p-2 rounded-lg text-slate-600 text-xs" value={item.desc} onChange={(e) => handleUpdate(item.id, 'desc', e.target.value)} />
                  </div>
                ) : (
                  <>
                    <h4 className="text-slate-800 font-bold text-base leading-tight mt-1">{item.title}</h4>
                    <p className="text-slate-500 text-xs mt-2 leading-relaxed">{item.desc}</p>
                    {item.link && (
                      <a href={item.link} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1.5 mt-4 text-[10px] font-black text-glacier uppercase hover:text-blue-600 transition-colors">
                        Ver en Mapa <MapPin size={10} />
                      </a>
                    )}
                  </>
                )}
              </div>
              <div className="flex gap-1">
                <button onClick={() => setEditingId(editingId === item.id ? null : item.id)} className="p-2 text-slate-300 hover:text-glacier transition-colors">{editingId === item.id ? <Check size={16} /> : <Edit2 size={14} />}</button>
                <button onClick={() => removeItem(item.id)} className="p-2 text-slate-300 hover:text-red-400 transition-colors"><Trash2 size={14} /></button>
              </div>
            </div>
          </motion.div>
        ))}
      </AnimatePresence>
      <button onClick={addItem} className="w-full py-4 border-2 border-dashed border-slate-200 rounded-3xl text-slate-400 font-bold text-xs hover:border-glacier hover:text-glacier transition-all flex items-center justify-center gap-2"><Plus size={16} /> Agregar Etapa</button>
    </div>
  );
};

// --- THE LAKES ---
const lakes = [
  { name: 'Lago Falkner', highlight: '¡La gran base!', link: 'https://www.google.com/maps/search/Lago+Falkner+Neuquen/' },
  { name: 'Lago Lácar', highlight: 'Caribe del Sur', link: 'https://www.google.com/maps/search/Playa+Yuco+San+Martin+de+los+Andes/' },
  { name: 'Lago Correntoso', highlight: 'Aguas Esmeralda', link: 'https://www.google.com/maps/search/Lago+Correntoso+Villa+La+Angostura/' },
  { name: 'Lago Hermoso', highlight: 'Paz absoluta', link: 'https://www.google.com/maps/search/Lago+Hermoso+Neuquen/' },
  { name: 'Lago Traful', highlight: 'Bosque Sumergido', link: 'https://www.google.com/maps/search/Bosque+Sumergido+Villa+Traful/' },
  { name: 'Espejo Chico', highlight: 'Plan B Perfecto', link: 'https://www.google.com/maps/search/Lago+Espejo+Chico+Neuquen/' },
];

export const LakeList = () => (
  <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
    {lakes.map((lake, i) => (
      <a 
        key={i} 
        href={lake.link} 
        target="_blank" 
        rel="noopener noreferrer"
        className="bg-white p-4 rounded-3xl border border-slate-100 shadow-sm flex flex-col items-center text-center group hover:border-glacier hover:shadow-md transition-all"
      >
        <div className="bg-blue-50 p-2.5 rounded-2xl text-blue-500 mb-3 group-hover:bg-glacier group-hover:text-white transition-colors">
          <Droplets size={16} />
        </div>
        <h4 className="text-slate-800 font-black text-[10px] uppercase tracking-tight leading-none mb-1">{lake.name}</h4>
        <span className="text-[8px] font-bold text-glacier uppercase block mb-2">{lake.highlight}</span>
        <div className="text-[8px] font-black text-slate-300 uppercase mt-auto flex items-center gap-1">Mapa <MapPin size={8} /></div>
      </a>
    ))}
  </div>
);

// --- DISCARDED PLACES ---
const discardedData = [
  { name: 'Playa Catritre', reason: 'Muy familiar.', tag: 'San Martín', link: 'https://www.google.com/maps/search/La+Islita+San+Martin+de+los+Andes/' },
  { name: 'Laguna Negra', reason: 'Camping básico.', tag: 'Bariloche', link: 'https://www.google.com/maps/search/Villa+Tacul+Bariloche/' },
  { name: 'Cascada Vullignanco', reason: 'No destaca.', tag: 'Ruta 40', link: 'https://www.google.com/maps/search/Cascada+Ñivinco/' },
  { name: 'El Bolsón', reason: 'Demasiado manejo.', tag: 'Sur Profundo', link: 'https://www.google.com/maps/search/Casa+de+Piedra+Rio+Caleufu/' },
];

export const DiscardedPlaces = () => (
  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
    {discardedData.map((place, i) => (
      <a key={i} href={place.link} target="_blank" rel="noopener noreferrer" className="bg-slate-50 border border-slate-100 p-5 rounded-2xl group hover:border-slate-200 transition-all flex justify-between items-center text-left">
        <div>
          <span className="text-[9px] font-bold text-slate-400 uppercase tracking-widest mb-1 block">{place.tag}</span>
          <h4 className="text-slate-700 font-bold text-sm line-through opacity-50">{place.name}</h4>
          <p className="text-slate-500 text-[10px] italic">"{place.reason}"</p>
        </div>
        <MapPin size={16} className="text-slate-200 group-hover:text-slate-400 transition-colors" />
      </a>
    ))}
  </div>
);

// --- CREW NOTES (Mantenido) ---
export const CrewNotes = () => {
  const [notes, setNotes] = useState<{id: number, author: string, text: string, date: string}[]>([]);
  const [newNote, setNewNote] = useState({ author: '', text: '' });
  const addNote = () => { if (newNote.author && newNote.text) { setNotes([{ id: Date.now(), ...newNote, date: new Date().toLocaleDateString() }, ...notes]); setNewNote({ author: '', text: '' }); } };
  const deleteNote = (id: number) => setNotes(notes.filter(n => n.id !== id));
  return (
    <div className="space-y-4">
      <div className="bg-white p-5 rounded-[2rem] border border-slate-100 shadow-sm space-y-3 text-slate-900">
        <div className="grid grid-cols-2 gap-3">
          <input placeholder="Tu Nombre" className="bg-slate-50 border border-slate-200 p-3 rounded-2xl text-xs outline-none focus:border-glacier font-bold" value={newNote.author} onChange={e => setNewNote({...newNote, author: e.target.value})} />
          <button onClick={addNote} className="bg-slate-900 text-white px-4 py-2 rounded-2xl font-black text-[10px] uppercase tracking-widest hover:bg-slate-800 transition-all shadow-lg shadow-slate-200">Publicar</button>
        </div>
        <textarea placeholder="Deja un mensaje..." className="w-full bg-slate-50 border border-slate-200 p-4 rounded-2xl text-xs outline-none focus:border-glacier h-24" value={newNote.text} onChange={e => setNewNote({...newNote, text: e.target.value})} />
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <AnimatePresence>
          {notes.map(note => (
            <motion.div key={note.id} initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.9 }} className="bg-white p-5 rounded-[2rem] border border-slate-100 shadow-sm relative group">
              <button onClick={() => deleteNote(note.id)} className="absolute top-4 right-4 text-slate-200 hover:text-red-400 opacity-0 group-hover:opacity-100 transition-all"><X size={16} /></button>
              <p className="text-[10px] font-black text-slate-800 uppercase tracking-tighter mb-1">{note.author} <span className="text-slate-300 font-bold ml-1">{note.date}</span></p>
              <p className="text-slate-500 text-xs leading-relaxed">{note.text}</p>
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
    { id: 1, name: 'Náutica', items: ['4 Packrafts dobles', '3 Paddle Surf', '3 Infladores'], icon: <Ship className="text-blue-400" /> },
    { id: 2, name: 'Logística', items: ['Generador', '15 Sillas', 'Gacebo', 'Walkies'], icon: <Package className="text-emerald-500" /> },
    { id: 3, name: 'Crucial', items: ['Parlante Grande', 'Alcohol (Distribuidora)', 'Hielo'], icon: <AlertTriangle className="text-orange-500" /> }
  ]);
  const [checked, setChecked] = useState<string[]>([]);
  const [newItemText, setNewItemText] = useState<{ [key: number]: string }>({});
  const toggleItem = (item: string) => setChecked(prev => prev.includes(item) ? prev.filter(i => i !== item) : [...prev, item]);
  const addItem = (catId: number) => { const text = newItemText[catId]; if (!text) return; setCategories(prev => prev.map(cat => cat.id === catId ? { ...cat, items: [...cat.items, text] } : cat)); setNewItemText({ ...newItemText, [catId]: '' }); };
  const removeItem = (catId: number, itemToRemove: string) => { setCategories(prev => prev.map(cat => cat.id === catId ? { ...cat, items: cat.items.filter(i => i !== itemToRemove) } : cat)); setChecked(prev => prev.filter(i => i !== itemToRemove)); };
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {categories.map((cat) => (
        <div key={cat.id} className="bg-white p-6 rounded-[2.5rem] border border-slate-100 shadow-sm flex flex-col h-full">
          <div className="flex items-center gap-2 mb-6">{cat.icon}<h3 className="text-slate-800 font-black uppercase text-[10px] tracking-widest">{cat.name}</h3></div>
          <div className="space-y-2 flex-1 mb-6">
            {cat.items.map((item, idx) => (
              <div key={item + idx} className="flex items-center justify-between group">
                <button onClick={() => toggleItem(item)} className="flex items-center gap-3 flex-1 text-left">
                  {checked.includes(item) ? <CheckCircle2 size={16} className="text-emerald-500" /> : <Circle size={16} className="text-slate-200" />}
                  <span className={`text-xs font-medium ${checked.includes(item) ? 'text-slate-300 line-through' : 'text-slate-600'}`}>{item}</span>
                </button>
                <button onClick={() => removeItem(cat.id, item)} className="text-slate-200 hover:text-red-400 opacity-0 group-hover:opacity-100 transition-all"><X size={12} /></button>
              </div>
            ))}
          </div>
          <div className="flex gap-2">
            <input type="text" placeholder="..." className="flex-1 bg-slate-50 border border-slate-100 p-2 rounded-xl text-[10px] outline-none text-slate-700 font-bold" value={newItemText[cat.id] || ''} onChange={(e) => setNewItemText({ ...newItemText, [cat.id]: e.target.value })} onKeyDown={(e) => e.key === 'Enter' && addItem(cat.id)} />
            <button onClick={() => addItem(cat.id)} className="bg-slate-100 text-slate-400 p-2 rounded-xl hover:bg-slate-900 hover:text-white transition-all shadow-sm"><Plus size={14} /></button>
          </div>
        </div>
      ))}
    </div>
  );
};
