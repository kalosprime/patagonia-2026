'use client';
import { useState, useEffect } from 'react';
import { CheckCircle2, Circle, Ship, Package, AlertTriangle, Edit2, Check, Plus, Trash2, User, X, Info, Droplets, MapPin, Star, Zap, Mountain, Beer, Tent, ExternalLink } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

// --- TYPES ---
interface ItineraryItem { id: number | string; day: string; title: string; desc: string; color: string; link?: string; }
interface NoteItem { id: number; author: string; text: string; date: string; }
interface GearCategory { id: number; name: string; items: string[]; icon: React.ReactNode; }

const Skeleton = ({ h = "h-40" }) => <div className={`${h} w-full bg-slate-100 animate-pulse rounded-[2rem] border border-slate-50`} />;

// --- THE IMPERDIBLES ---
export const Highlights = () => {
  const data = [
    { title: 'Hito Año Nuevo', desc: 'Festejo épico en Lago Falkner. Llegada el 28/12.', icon: <Star className="text-yellow-500" />, color: 'bg-yellow-50', link: 'https://www.google.com/maps/search/Lago+Falkner+Neuquen/' },
    { title: 'Días de Sol', desc: 'Playa Yuco, La Islita y Playa Bonita.', icon: <Droplets className="text-blue-500" />, color: 'bg-blue-50', link: 'https://www.google.com/maps/search/Playa+Yuco/' },
    { title: 'Trekking & Cascadas', desc: 'Ñivinco, Santa Ana y Dora.', icon: <Mountain className="text-emerald-500" />, color: 'bg-emerald-50', link: 'https://www.google.com/maps/search/Cascada+Ñivinco/' },
    { title: 'Adrenalina', desc: 'Salto al agua en el Puente Ruca Malen.', icon: <Zap className="text-orange-500" />, color: 'bg-orange-50', link: 'https://www.google.com/maps/search/Puente+Ruca+Malen/' },
    { title: 'Cierre Épico', desc: 'Refugio Patagonia (Circuito Chico).', icon: <Beer className="text-amber-600" />, color: 'bg-amber-50', link: 'https://www.google.com/maps/search/Villa+Tacul+Bariloche/' },
    { title: 'Bases Relax', desc: 'Camping Pichi Traful y Espejo Chico.', icon: <Tent className="text-indigo-500" />, color: 'bg-indigo-50', link: 'https://www.google.com/maps/search/Lago+Espejo+Chico+Neuquen/' },
  ];
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
      {data.map((item, idx) => (
        <a key={idx} href={item.link} target="_blank" rel="noopener noreferrer" className={`${item.color} group p-6 rounded-[2.5rem] border border-white shadow-sm flex flex-col justify-between transition-all hover:shadow-xl hover:-translate-y-1 min-h-[150px]`}>
          <div className="flex gap-4">
            <div className="bg-white p-3 rounded-2xl shadow-sm h-fit">{item.icon}</div>
            <div>
              <h4 className="font-black text-slate-800 text-sm uppercase tracking-tight">{item.title}</h4>
              <p className="text-slate-500 text-[11px] leading-tight mt-1">{item.desc}</p>
            </div>
          </div>
          <div className="mt-4 flex items-center gap-1.5 text-[9px] font-black text-slate-400 uppercase tracking-widest group-hover:text-glacier transition-colors">Mapa <ExternalLink size={10} /></div>
        </a>
      ))}
    </div>
  );
};

// --- DYNAMIC ITINERARY ---
export const Itinerary = () => {
  const initial: ItineraryItem[] = [
    { id: 1, day: '27/12', title: 'Salida Rosario', desc: 'Salida -> Parada y noche en Rufino.', color: 'border-blue-500', link: 'https://www.google.com/maps/search/Rufino+Santa+Fe/' },
    { id: 2, day: '28/12', title: 'Tramo Rufino -> Falkner', desc: '15 horas de manejo. Llegada al Falkner.', color: 'border-cyan-400', link: 'https://www.google.com/maps/search/Lago+Falkner+Neuquen/' },
    { id: 3, day: '29/12 - 01/01', title: 'Base Lago Falkner (Año Nuevo)', desc: 'Relax, Cerro Falkner y festejos.', color: 'border-emerald-500', link: 'https://www.google.com/maps/search/Lago+Falkner+Neuquen/' },
    { id: 4, day: '02/01 - 04/01', title: 'Ruta 7 Lagos & SMAndes', desc: 'Playa Yuco, Ñivinco y Quila Quina.', color: 'border-orange-400', link: 'https://www.google.com/maps/search/Playa+Yuco/' },
    { id: 5, day: '05/01 - 07/01', title: 'Bariloche & Manso', desc: 'Río Manso, Ruca Malen y Refugio Patagonia.', color: 'border-cyan-500', link: 'https://www.google.com/maps/search/Camping+La+Pasarela+Rio+Manso/' },
  ];

  const [items, setItems] = useState<ItineraryItem[]>([]);
  const [mounted, setMounted] = useState(false);
  const [editingId, setEditingId] = useState<number | string | null>(null);

  useEffect(() => {
    const saved = localStorage.getItem('banda_vfinal_iti');
    setItems(saved ? JSON.parse(saved) : initial);
    setMounted(true);
  }, []);

  useEffect(() => { if (mounted) localStorage.setItem('banda_vfinal_iti', JSON.stringify(items)); }, [items, mounted]);

  if (!mounted) return <Skeleton h="h-60" />;

  const handleUpdate = (id: number | string, field: keyof ItineraryItem, value: string) => setItems(items.map(i => i.id === id ? { ...i, [field]: value } : i));

  return (
    <div className="space-y-4">
      {items.map((item) => (
        <div key={item.id} className={`relative p-6 bg-white border-l-4 ${item.color} rounded-r-[2.5rem] shadow-sm border-y border-r border-gray-100`}>
          <div className="flex justify-between items-start gap-4">
            <div className="flex-1 text-slate-900">
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
                  {item.link && <a href={item.link} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1.5 mt-4 text-[10px] font-black text-glacier uppercase hover:text-blue-600">Mapa <MapPin size={10} /></a>}
                </>
              )}
            </div>
            <div className="flex gap-1">
              <button onClick={() => setEditingId(editingId === item.id ? null : item.id)} className="p-2 text-slate-300 hover:text-glacier">{editingId === item.id ? <Check size={16} /> : <Edit2 size={14} />}</button>
              <button onClick={() => setItems(items.filter(i => i.id !== item.id))} className="p-2 text-slate-300 hover:text-red-400"><Trash2 size={14} /></button>
            </div>
          </div>
        </div>
      ))}
      <button onClick={() => { const id = Date.now(); setItems([...items, { id, day: 'Fecha', title: 'Nueva Etapa', desc: '...', color: 'border-slate-200', link: '' }]); setEditingId(id); }} className="w-full py-4 border-2 border-dashed border-slate-200 rounded-3xl text-slate-400 font-bold text-xs hover:border-glacier hover:text-glacier transition-all flex items-center justify-center gap-2"><Plus size={16} /> Agregar Etapa</button>
    </div>
  );
};

// --- CREW NOTES ---
export const CrewNotes = () => {
  const [notes, setNotes] = useState<NoteItem[]>([]);
  const [mounted, setMounted] = useState(false);
  const [newNote, setNewNote] = useState({ author: '', text: '' });
  useEffect(() => {
    const saved = localStorage.getItem('banda_vfinal_notes');
    if (saved) setNotes(JSON.parse(saved));
    setMounted(true);
  }, []);
  useEffect(() => { if (mounted) localStorage.setItem('banda_vfinal_notes', JSON.stringify(notes)); }, [notes, mounted]);
  if (!mounted) return <Skeleton h="h-32" />;
  return (
    <div className="space-y-4">
      <div className="bg-white p-5 rounded-[2.5rem] border border-slate-100 shadow-sm space-y-3">
        <div className="grid grid-cols-2 gap-3">
          <input placeholder="Tu Nombre" className="bg-slate-50 border border-slate-200 p-3 rounded-xl text-xs outline-none font-bold text-slate-800" value={newNote.author} onChange={e => setNewNote({...newNote, author: e.target.value})} />
          <button onClick={() => { if(newNote.author && newNote.text) { setNotes([{ id: Date.now(), ...newNote, date: new Date().toLocaleDateString() }, ...notes]); setNewNote({ author: '', text: '' }); } }} className="bg-slate-900 text-white px-4 py-2 rounded-xl font-bold text-xs">Publicar</button>
        </div>
        <textarea placeholder="Deja un mensaje..." className="w-full bg-slate-50 border border-slate-200 p-4 rounded-2xl text-xs outline-none h-24 text-slate-800" value={newNote.text} onChange={e => setNewNote({...newNote, text: e.target.value})} />
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {notes.map((note) => (
          <div key={note.id} className="bg-white p-5 rounded-[2rem] border border-slate-100 shadow-sm relative group">
            <button onClick={() => setNotes(notes.filter(n => n.id !== note.id))} className="absolute top-4 right-4 text-slate-200 hover:text-red-400 opacity-0 group-hover:opacity-100 transition-all"><X size={16} /></button>
            <p className="text-[10px] font-black text-slate-800 uppercase mb-1">{note.author} <span className="text-slate-300 font-bold ml-1">{note.date}</span></p>
            <p className="text-slate-500 text-xs leading-relaxed">{note.text}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

// --- GEAR CHECKLIST ---
export const GearChecklist = () => {
  const initial: GearCategory[] = [
    { id: 1, name: 'Náutica', items: ['4 Packrafts dobles', '3 Paddle Surf', '3 Infladores'], icon: <Ship className="text-blue-400" /> },
    { id: 2, name: 'Logística', items: ['Generador', 'Mesa + 15 Sillas', 'Gacebo', 'Walkies', 'Luces'], icon: <Package className="text-emerald-500" /> },
    { id: 3, name: 'Crucial', items: ['Parlante Grande', 'Alcohol (Distribuidora)', 'Hielo'], icon: <AlertTriangle className="text-orange-500" /> }
  ];
  const [categories, setCategories] = useState<GearCategory[]>([]);
  const [checked, setChecked] = useState<string[]>([]);
  const [mounted, setMounted] = useState(false);
  const [newItemText, setNewItemText] = useState<{ [key: number]: string }>({});

  useEffect(() => {
    const savedCat = localStorage.getItem('banda_vfinal_gear');
    const savedCheck = localStorage.getItem('banda_vfinal_checked');
    setCategories(savedCat ? JSON.parse(savedCat) : initial);
    setChecked(savedCheck ? JSON.parse(savedCheck) : []);
    setMounted(true);
  }, []);

  useEffect(() => { if (mounted) { localStorage.setItem('banda_vfinal_gear', JSON.stringify(categories)); localStorage.setItem('banda_vfinal_checked', JSON.stringify(checked)); } }, [categories, checked, mounted]);

  if (!mounted) return <Skeleton h="h-60" />;

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 text-slate-900">
      {categories.map((cat) => (
        <div key={cat.id} className="bg-white p-6 rounded-[2.5rem] border border-slate-100 shadow-sm flex flex-col h-full">
          <div className="flex items-center gap-2 mb-6">{cat.icon}<h3 className="text-slate-800 font-black uppercase text-[10px] tracking-widest">{cat.name}</h3></div>
          <div className="space-y-3 flex-1 mb-6">
            {cat.items.map((item, idx) => (
              <div key={item + idx} className="flex items-center justify-between group">
                <button onClick={() => setChecked(checked.includes(item) ? checked.filter(i => i !== item) : [...checked, item])} className="flex items-center gap-3 flex-1 text-left">
                  {checked.includes(item) ? <CheckCircle2 size={16} className="text-emerald-500" /> : <Circle size={16} className="text-slate-200" />}
                  <span className={`text-xs font-bold ${checked.includes(item) ? 'text-slate-300 line-through' : 'text-slate-600'}`}>{item}</span>
                </button>
                <button onClick={() => setCategories(categories.map(c => c.id === cat.id ? { ...c, items: c.items.filter(i => i !== item) } : c))} className="text-slate-200 hover:text-red-400 opacity-0 group-hover:opacity-100 transition-all"><X size={14} /></button>
              </div>
            ))}
          </div>
          <div className="flex gap-2">
            <input placeholder="Nuevo..." className="flex-1 bg-slate-50 border border-slate-100 p-2 rounded-xl text-[10px] outline-none text-slate-700 font-bold" value={newItemText[cat.id] || ''} onChange={(e) => setNewItemText({ ...newItemText, [cat.id]: e.target.value })} onKeyDown={(e) => { if(e.key==='Enter' && newItemText[cat.id]) { setCategories(categories.map(c => c.id === cat.id ? { ...c, items: [...c.items, newItemText[cat.id]] } : c)); setNewItemText({ ...newItemText, [cat.id]: '' }); } }} />
            <button onClick={() => { if(newItemText[cat.id]) { setCategories(categories.map(c => c.id === cat.id ? { ...c, items: [...c.items, newItemText[cat.id]] } : c)); setNewItemText({ ...newItemText, [cat.id]: '' }); } }} className="bg-slate-100 text-slate-400 p-2 rounded-xl hover:bg-slate-900 hover:text-white transition-all shadow-sm"><Plus size={14} /></button>
          </div>
        </div>
      ))}
    </div>
  );
};

// --- LAKES & DISCARDED ---
export const LakeList = () => {
  const lakes = [
    { name: 'Lago Falkner', link: 'https://www.google.com/maps/search/Lago+Falkner+Neuquen/' },
    { name: 'Lago Lácar', link: 'https://www.google.com/maps/search/Playa+Yuco/' },
    { name: 'Lago Hermoso', link: 'https://www.google.com/maps/search/Lago+Hermoso+Neuquen/' },
    { name: 'Lago Traful', link: 'https://www.google.com/maps/search/Bosque+Sumergido+Villa+Traful/' },
    { name: 'Lago Correntoso', link: 'https://www.google.com/maps/search/Lago+Correntoso+Villa+La+Angostura/' },
    { name: 'Espejo Chico', link: 'https://www.google.com/maps/search/Lago+Espejo+Chico+Neuquen/' },
  ];
  return (
    <div className="grid grid-cols-2 sm:grid-cols-6 gap-3">
      {lakes.map((lake, i) => (
        <a key={i} href={lake.link} target="_blank" rel="noopener noreferrer" className="bg-white p-4 rounded-3xl border border-slate-100 shadow-sm text-center group hover:border-glacier transition-all">
          <Droplets size={16} className="text-blue-400 mx-auto mb-2" />
          <h4 className="text-slate-800 font-black text-[9px] uppercase leading-none">{lake.name}</h4>
        </a>
      ))}
    </div>
  );
};

export const DiscardedPlaces = () => {
  const data = [
    { n: 'Playa Catritre', r: 'Ambiente muy familiar. Playa Yuco tiene mejor onda.', t: 'San Martín', link: 'https://www.google.com/maps/search/La+Islita/' },
    { n: 'Laguna Negra', r: 'Camping medio pelo. Preferimos Falkner o Hermoso.', t: 'Bariloche', link: 'https://www.google.com/maps/search/Villa+Tacul/' },
    { n: 'Cascada Vullignanco', r: 'No parece la gran cosa comparado con Ñivinco.', t: 'Ruta 40', link: 'https://www.google.com/maps/search/Cascada+Ñivinco/' },
    { n: 'El Bolsón / Cajón del Azul', r: 'Suma demasiadas horas de manejo.', t: 'Sur Profundo', link: 'https://www.google.com/maps/search/Casa+de+Piedra+Rio+Caleufu/' },
  ];
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      {data.map((p, i) => (
        <a key={i} href={p.link} target="_blank" rel="noopener noreferrer" className="bg-slate-50 border border-slate-100 p-5 rounded-2xl group flex justify-between items-center text-left">
          <div>
            <span className="text-[9px] font-bold text-slate-400 uppercase mb-1 block">{p.t}</span>
            <h4 className="text-slate-700 font-bold text-sm line-through opacity-50">{p.n}</h4>
            <p className="text-slate-500 text-[10px] italic leading-tight">"{p.r}"</p>
          </div>
          <MapPin size={14} className="text-slate-200 group-hover:text-slate-400 transition-colors" />
        </a>
      ))}
    </div>
  );
};
