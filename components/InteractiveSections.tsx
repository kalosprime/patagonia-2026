'use client';
import { useState, useEffect } from 'react';
import { CheckCircle2, Circle, Ship, Package, AlertTriangle, Edit2, Check, Plus, Trash2, User, X, Info, Droplets, MapPin, Star, Zap, Mountain, Beer, Tent, ExternalLink } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

// --- COMPONENTE DE CARGA SEGURO ---
const Skeleton = ({ h = "h-40" }) => <div className={`${h} w-full bg-slate-100 animate-pulse rounded-[2rem] border border-slate-50`} />;

// --- THE IMPERDIBLES (ESTÁTICO - SEGURO) ---
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
        <a key={idx} href={item.link} target="_blank" rel="noopener noreferrer" className={`${item.color} group p-6 rounded-[2rem] border border-white shadow-sm flex flex-col justify-between transition-all hover:shadow-xl hover:-translate-y-1 min-h-[140px]`}>
          <div>
            <div className="bg-white p-3 rounded-2xl shadow-sm h-fit w-fit mb-4 text-slate-700">{item.icon}</div>
            <h4 className="font-black text-slate-800 text-sm uppercase tracking-tight">{item.title}</h4>
            <p className="text-slate-500 text-[11px] leading-tight mt-1">{item.desc}</p>
          </div>
          <div className="mt-4 flex items-center gap-1.5 text-[9px] font-black text-slate-400 uppercase tracking-widest group-hover:text-glacier transition-colors">Mapa <ExternalLink size={10} /></div>
        </a>
      ))}
    </div>
  );
};

// --- ITINERARY ---
export const Itinerary = () => {
  const initial = [
    { id: 1, day: '27/12', title: 'Salida Rosario', desc: 'Parada y noche en Rufino.', color: 'border-blue-500', link: 'https://www.google.com/maps/search/Rufino+Santa+Fe/' },
    { id: 2, day: '28/12', title: 'Tramo Rufino -> Falkner', desc: 'Llegada al Falkner.', color: 'border-cyan-400', link: 'https://www.google.com/maps/search/Lago+Falkner+Neuquen/' },
    { id: 3, day: '29/12 - 01/01', title: 'Festejos Año Nuevo', desc: 'Base en Camping Falkner.', color: 'border-emerald-500', link: 'https://www.google.com/maps/search/Lago+Falkner+Neuquen/' },
  ];

  const [items, setItems] = useState<any[]>([]);
  const [hasMounted, setHasMounted] = useState(false);
  const [editingId, setEditingId] = useState<number | string | null>(null);

  useEffect(() => {
    try {
      const saved = localStorage.getItem('banda_final_iti');
      setItems(saved ? JSON.parse(saved) : initial);
    } catch (e) {
      setItems(initial);
    }
    setHasMounted(true);
  }, []);

  useEffect(() => {
    if (hasMounted) localStorage.setItem('banda_final_iti', JSON.stringify(items));
  }, [items, hasMounted]);

  if (!hasMounted) return <Skeleton h="h-60" />;

  const handleUpdate = (id: number | string, field: string, value: string) => setItems(items.map(i => i.id === id ? { ...i, [field]: value } : i));
  const addItem = () => { const id = Date.now(); setItems([...items, { id, day: 'Fecha', title: 'Nueva Etapa', desc: '...', color: 'border-slate-200', link: '' }]); setEditingId(id); };
  const removeItem = (id: number | string) => setItems(items.filter(i => i.id !== id));

  return (
    <div className="space-y-4">
      {items.map((item) => (
        <div key={item.id} className={`relative p-6 bg-white border-l-4 ${item.color} rounded-r-[2rem] shadow-sm border-y border-r border-gray-100`}>
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
                  {item.link && <a href={item.link} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1.5 mt-4 text-[10px] font-black text-glacier uppercase">Mapa <MapPin size={10} /></a>}
                </>
              )}
            </div>
            <div className="flex gap-1">
              <button onClick={() => setEditingId(editingId === item.id ? null : item.id)} className="p-2 text-slate-300 hover:text-glacier">{editingId === item.id ? <Check size={16} /> : <Edit2 size={14} />}</button>
              <button onClick={() => removeItem(item.id)} className="p-2 text-slate-300 hover:text-red-400"><Trash2 size={14} /></button>
            </div>
          </div>
        </div>
      ))}
      <button onClick={addItem} className="w-full py-4 border-2 border-dashed border-slate-200 rounded-3xl text-slate-400 font-bold text-xs hover:border-glacier hover:text-glacier transition-all flex items-center justify-center gap-2"><Plus size={16} /> Agregar Etapa</button>
    </div>
  );
};

// --- CREW NOTES ---
export const CrewNotes = () => {
  const [notes, setNotes] = useState<any[]>([]);
  const [hasMounted, setHasMounted] = useState(false);
  const [newNote, setNewNote] = useState({ author: '', text: '' });

  useEffect(() => {
    try {
      const saved = localStorage.getItem('banda_final_notes');
      if (saved) setNotes(JSON.parse(saved));
    } catch (e) {}
    setHasMounted(true);
  }, []);

  useEffect(() => {
    if (hasMounted) localStorage.setItem('banda_final_notes', JSON.stringify(notes));
  }, [notes, hasMounted]);

  if (!hasMounted) return <Skeleton h="h-32" />;

  const addNote = () => { if (newNote.author && newNote.text) { setNotes([{ id: Date.now(), ...newNote, date: new Date().toLocaleDateString() }, ...notes]); setNewNote({ author: '', text: '' }); } };
  const deleteNote = (id: number) => setNotes(notes.filter(n => n.id !== id));

  return (
    <div className="space-y-4">
      <div className="bg-white p-5 rounded-[2rem] border border-slate-100 shadow-sm space-y-3">
        <div className="grid grid-cols-2 gap-3">
          <input placeholder="Nombre" className="bg-slate-50 border border-slate-200 p-3 rounded-xl text-xs outline-none font-bold text-slate-800" value={newNote.author} onChange={e => setNewNote({...newNote, author: e.target.value})} />
          <button onClick={addNote} className="bg-slate-900 text-white px-4 py-2 rounded-xl font-bold text-xs">Publicar</button>
        </div>
        <textarea placeholder="Mensaje..." className="w-full bg-slate-50 border border-slate-200 p-4 rounded-2xl text-xs outline-none h-24 text-slate-800" value={newNote.text} onChange={e => setNewNote({...newNote, text: e.target.value})} />
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {notes.map((note) => (
          <div key={note.id} className="bg-white p-5 rounded-[2rem] border border-slate-100 shadow-sm relative group">
            <button onClick={() => deleteNote(note.id)} className="absolute top-4 right-4 text-slate-200 hover:text-red-400 opacity-0 group-hover:opacity-100"><X size={16} /></button>
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
  const initial = [
    { id: 1, name: 'Náutica', items: ['4 Packrafts dobles', '3 Paddle Surf', '3 Infladores'], icon: <Ship className="text-blue-400" /> },
    { id: 2, name: 'Logística', items: ['Generador', '15 Sillas', 'Gacebo', 'Walkies'], icon: <Package className="text-emerald-500" /> },
    { id: 3, name: 'Crucial', items: ['Parlante Grande', 'Alcohol', 'Hielo'], icon: <AlertTriangle className="text-orange-500" /> }
  ];
  const [categories, setCategories] = useState<any[]>([]);
  const [checked, setChecked] = useState<string[]>([]);
  const [hasMounted, setHasMounted] = useState(false);
  const [newItemText, setNewItemText] = useState<{ [key: number]: string }>({});

  useEffect(() => {
    try {
      const sCat = localStorage.getItem('banda_final_gear');
      const sCheck = localStorage.getItem('banda_final_checked');
      setCategories(sCat ? JSON.parse(sCat) : initial);
      setChecked(sCheck ? JSON.parse(sCheck) : []);
    } catch (e) {
      setCategories(initial);
      setChecked([]);
    }
    setHasMounted(true);
  }, []);

  useEffect(() => {
    if (hasMounted) {
      localStorage.setItem('banda_final_gear', JSON.stringify(categories));
      localStorage.setItem('banda_final_checked', JSON.stringify(checked));
    }
  }, [categories, checked, hasMounted]);

  if (!hasMounted) return <Skeleton h="h-60" />;

  const toggleItem = (item: string) => setChecked(checked.includes(item) ? checked.filter(i => i !== item) : [...checked, item]);
  const addItem = (catId: number) => { const text = newItemText[catId]; if (!text) return; setCategories(categories.map(cat => cat.id === catId ? { ...cat, items: [...cat.items, text] } : cat)); setNewItemText({ ...newItemText, [catId]: '' }); };
  const removeItem = (catId: number, itemToRemove: string) => { setCategories(categories.map(cat => cat.id === catId ? { ...cat, items: cat.items.filter(i => i !== itemToRemove) } : cat)); setChecked(checked.filter(i => i !== itemToRemove)); };

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 text-slate-900">
      {categories.map((cat: any) => (
        <div key={cat.id} className="bg-white p-6 rounded-[2rem] border border-slate-100 shadow-sm flex flex-col h-full">
          <div className="flex items-center gap-2 mb-6">{cat.icon}<h3 className="text-slate-800 font-black uppercase text-[10px] tracking-widest">{cat.name}</h3></div>
          <div className="space-y-2 flex-1 mb-6">
            {cat.items.map((item: string, idx: number) => (
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

// --- OTROS COMPONENTES ---
export const LakeList = () => {
  const lakes = [
    { name: 'Lago Falkner', highlight: '¡La gran base!', link: 'https://www.google.com/maps/search/Lago+Falkner+Neuquen/' },
    { name: 'Lago Lácar', highlight: 'Caribe del Sur', link: 'https://www.google.com/maps/search/Playa+Yuco+San+Martin+de+los+Andes/' },
    { name: 'Lago Correntoso', highlight: 'Aguas Esmeralda', link: 'https://www.google.com/maps/search/Lago+Correntoso+Villa+La+Angostura/' },
    { name: 'Lago Hermoso', highlight: 'Paz absoluta', link: 'https://www.google.com/maps/search/Lago+Hermoso+Neuquen/' },
    { name: 'Lago Traful', highlight: 'Bosque Sumergido', link: 'https://www.google.com/maps/search/Bosque+Sumergido+Villa+Traful/' },
    { name: 'Espejo Chico', highlight: 'Plan B Perfecto', link: 'https://www.google.com/maps/search/Lago+Espejo+Chico+Neuquen/' },
  ];
  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3 text-slate-900">
      {lakes.map((lake, i) => (
        <a key={i} href={lake.link} target="_blank" rel="noopener noreferrer" className="bg-white p-4 rounded-3xl border border-slate-100 shadow-sm flex flex-col items-center text-center group hover:border-glacier hover:shadow-md transition-all">
          <div className="bg-blue-50 p-2.5 rounded-2xl text-blue-500 mb-3 group-hover:bg-glacier group-hover:text-white transition-colors"><Droplets size={16} /></div>
          <h4 className="text-slate-800 font-black text-[10px] uppercase tracking-tight leading-none mb-1">{lake.name}</h4>
          <span className="text-[8px] font-bold text-glacier uppercase block">{lake.highlight}</span>
        </a>
      ))}
    </div>
  );
};

export const DiscardedPlaces = () => {
  const data = [
    { name: 'Playa Catritre', reason: 'Muy familiar.', tag: 'San Martín', link: 'https://www.google.com/maps/search/La+Islita+San+Martin+de+los+Andes/' },
    { name: 'Laguna Negra', reason: 'Camping básico.', tag: 'Bariloche', link: 'https://www.google.com/maps/search/Villa+Tacul+Bariloche/' },
    { name: 'Cascada Vullignanco', reason: 'No destaca.', tag: 'Ruta 40', link: 'https://www.google.com/maps/search/Cascada+Ñivinco/' },
    { name: 'El Bolsón', reason: 'Demasiado manejo.', tag: 'Sur Profundo', link: 'https://www.google.com/maps/search/Casa+de+Piedra+Rio+Caleufu/' },
  ];
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-slate-900">
      {data.map((place, i) => (
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
};
