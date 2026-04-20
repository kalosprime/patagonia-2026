'use client';
import { useState, useEffect } from 'react';
import { CheckCircle2, Circle, Ship, Package, AlertTriangle, Edit2, Check, Plus, Trash2, X, Droplets, MapPin, Star, Zap, Mountain, Beer, Tent, ExternalLink } from 'lucide-react';

// --- DATA INICIAL ---
const initialItinerary = [
  { id: 1, day: '27/12', title: 'Salida Rosario', desc: 'Salida -> Parada y noche en Rufino.', color: 'border-blue-500', link: 'https://www.google.com/maps/search/Rufino+Santa+Fe/' },
  { id: 2, day: '28/12', title: 'Tramo Rufino -> Falkner', desc: '15 horas de manejo. Llegada al Falkner.', color: 'border-cyan-400', link: 'https://www.google.com/maps/search/Lago+Falkner+Neuquen/' },
  { id: 3, day: '29/12 - 01/01', title: 'Base Lago Falkner', desc: 'Año Nuevo y relax en el lago.', color: 'border-emerald-500', link: 'https://www.google.com/maps/search/Lago+Falkner+Neuquen/' },
  { id: 4, day: '02/01 - 04/01', title: 'Ruta 7 Lagos & SMAndes', desc: 'Playa Yuco, Ñivinco y Quila Quina.', color: 'border-orange-400', link: 'https://www.google.com/maps/search/Playa+Yuco/' },
  { id: 5, day: '05/01 - 07/01', title: 'Bariloche & Manso', desc: 'Río Manso y Refugio Patagonia.', color: 'border-cyan-500', link: 'https://www.google.com/maps/search/Camping+La+Pasarela+Rio+Manso/' },
];

const initialGear = [
  { id: 1, name: 'Náutica', items: ['4 Packrafts dobles', '3 Paddle Surf', '3 Infladores'] },
  { id: 2, name: 'Logística', items: ['Generador', 'Mesa + 15 Sillas', 'Gacebo', 'Walkies'] },
  { id: 3, name: 'Crucial', items: ['Parlante Grande', 'Alcohol', 'Hielo'] }
];

// --- COMPONENTES ---

export const Highlights = () => {
  const data = [
    { title: 'Hito Año Nuevo', desc: 'Festejo en Lago Falkner.', icon: <Star size={16} />, color: 'bg-yellow-50', link: 'https://www.google.com/maps/search/Lago+Falkner+Neuquen/' },
    { title: 'Días de Sol', desc: 'Playa Yuco y La Islita.', icon: <Droplets size={16} />, color: 'bg-blue-50', link: 'https://www.google.com/maps/search/Playa+Yuco/' },
    { title: 'Trekking', desc: 'Ñivinco y Santa Ana.', icon: <Mountain size={16} />, color: 'bg-emerald-50', link: 'https://www.google.com/maps/search/Cascada+Ñivinco/' },
    { title: 'Adrenalina', desc: 'Puente Ruca Malen.', icon: <Zap size={16} />, color: 'bg-orange-50', link: 'https://www.google.com/maps/search/Puente+Ruca+Malen/' },
    { title: 'Cierre', desc: 'Refugio Patagonia.', icon: <Beer size={16} />, color: 'bg-amber-50', link: 'https://www.google.com/maps/search/Villa+Tacul+Bariloche/' },
    { title: 'Bases', desc: 'Pichi Traful.', icon: <Tent size={16} />, color: 'bg-indigo-50', link: 'https://www.google.com/maps/search/Lago+Espejo+Chico+Neuquen/' },
  ];
  return (
    <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
      {data.map((item, idx) => (
        <a key={idx} href={item.link} target="_blank" rel="noopener noreferrer" className={`${item.color} group p-5 rounded-[2rem] border border-white shadow-sm flex flex-col justify-between min-h-[130px]`}>
          <div className="bg-white p-2 rounded-xl shadow-sm w-fit mb-2">{item.icon}</div>
          <h4 className="font-black text-slate-800 text-[11px] uppercase leading-tight">{item.title}</h4>
          <p className="text-slate-500 text-[9px] mt-1">{item.desc}</p>
        </a>
      ))}
    </div>
  );
};

export const Itinerary = () => {
  const [items, setItems] = useState<any[]>([]);
  const [editingId, setEditingId] = useState<any>(null);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    try {
      const saved = localStorage.getItem('v6_iti');
      setItems(saved ? JSON.parse(saved) : initialItinerary);
    } catch (e) { setItems(initialItinerary); }
    setMounted(true);
  }, []);

  useEffect(() => { if (mounted) localStorage.setItem('v6_iti', JSON.stringify(items)); }, [items, mounted]);

  if (!mounted) return null;

  const handleUpdate = (id: any, field: string, val: string) => setItems(items.map(i => i.id === id ? { ...i, [field]: val } : i));

  return (
    <div className="space-y-4">
      {items.map((i) => (
        <div key={i.id} className={`p-6 bg-white border-l-4 ${i.color} rounded-r-[2rem] shadow-sm flex justify-between items-start`}>
          <div className="flex-1">
            <span className="text-[9px] font-black text-slate-400 uppercase">{i.day}</span>
            {editingId === i.id ? (
              <div className="mt-2 space-y-2">
                <input className="w-full bg-slate-50 border p-2 rounded text-sm text-slate-800" value={i.title} onChange={(e) => handleUpdate(i.id, 'title', e.target.value)} />
                <textarea className="w-full bg-slate-50 border p-2 rounded text-xs text-slate-600" value={i.desc} onChange={(e) => handleUpdate(i.id, 'desc', e.target.value)} />
              </div>
            ) : (
              <><h4 className="text-slate-800 font-bold text-sm mt-1">{i.title}</h4><p className="text-slate-500 text-xs mt-1 leading-relaxed">{i.desc}</p></>
            )}
          </div>
          <div className="flex gap-1 ml-2">
            <button onClick={() => setEditingId(editingId === i.id ? null : i.id)} className="p-2 text-slate-300">{editingId === i.id ? <Check size={16} /> : <Edit2 size={14} />}</button>
            <button onClick={() => setItems(items.filter(x => x.id !== i.id))} className="p-2 text-slate-300 hover:text-red-400"><Trash2 size={14} /></button>
          </div>
        </div>
      ))}
      <button onClick={() => { const id = Date.now(); setItems([...items, { id, day: 'Fecha', title: 'Nueva Etapa', desc: '...', color: 'border-slate-200' }]); setEditingId(id); }} className="w-full py-4 border-2 border-dashed border-slate-200 rounded-3xl text-slate-400 text-xs font-bold">+ Agregar Etapa</button>
    </div>
  );
};

export const CrewNotes = () => {
  const [notes, setNotes] = useState<any[]>([]);
  const [name, setName] = useState('');
  const [text, setText] = useState('');
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    try {
      const saved = localStorage.getItem('v6_notes');
      if (saved) setNotes(JSON.parse(saved));
    } catch (e) {}
    setMounted(true);
  }, []);

  useEffect(() => { if (mounted) localStorage.setItem('v6_notes', JSON.stringify(notes)); }, [notes, mounted]);

  if (!mounted) return null;

  return (
    <div className="space-y-4">
      <div className="bg-white p-6 rounded-[2.5rem] shadow-sm space-y-3 text-slate-900">
        <div className="grid grid-cols-2 gap-3 text-slate-900">
          <input placeholder="Tu Nombre" className="bg-slate-50 border p-3 rounded-xl text-xs" value={name} onChange={e => setName(e.target.value)} />
          <button onClick={() => { if(name && text) { setNotes([{id:Date.now(), name, text, date:new Date().toLocaleDateString()}, ...notes]); setText(''); } }} className="bg-slate-900 text-white px-4 py-2 rounded-xl font-bold text-xs">Publicar</button>
        </div>
        <textarea placeholder="Mensaje..." className="w-full bg-slate-50 border p-3 rounded-xl text-xs h-20" value={text} onChange={e => setText(e.target.value)} />
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-slate-900">
        {notes.map(n => (
          <div key={n.id} className="bg-white p-5 rounded-3xl border border-slate-100 shadow-sm relative group">
            <button onClick={() => setNotes(notes.filter(x => x.id !== n.id))} className="absolute top-4 right-4 text-slate-300 hover:text-red-400 opacity-0 group-hover:opacity-100 transition-opacity"><X size={14} /></button>
            <p className="text-[10px] font-black uppercase mb-1">{n.name} <span className="text-slate-300 ml-1">{n.date}</span></p>
            <p className="text-slate-500 text-xs leading-relaxed">{n.text}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export const GearChecklist = () => {
  const [categories, setCategories] = useState<any[]>([]);
  const [checked, setChecked] = useState<string[]>([]);
  const [mounted, setMounted] = useState(false);
  const [newItem, setNewItem] = useState<{[key: number]: string}>({});

  useEffect(() => {
    try {
      const sCat = localStorage.getItem('v6_gear');
      const sCheck = localStorage.getItem('v6_check');
      setCategories(sCat ? JSON.parse(sCat) : initialGear);
      setChecked(sCheck ? JSON.parse(sCheck) : []);
    } catch (e) { setCategories(initialGear); }
    setMounted(true);
  }, []);

  useEffect(() => { if (mounted) { localStorage.setItem('v6_gear', JSON.stringify(categories)); localStorage.setItem('v6_check', JSON.stringify(checked)); } }, [categories, checked, mounted]);

  if (!mounted) return null;

  const addItem = (catId: number) => {
    const val = newItem[catId];
    if (!val) return;
    setCategories(categories.map(c => c.id === catId ? {...c, items: [...c.items, val]} : c));
    setNewItem({...newItem, [catId]: ''});
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-slate-900">
      {categories.map((cat: any) => (
        <div key={cat.id} className="bg-white p-6 rounded-[2.5rem] border border-slate-100 shadow-sm flex flex-col h-full">
          <h3 className="text-slate-800 font-black uppercase text-[10px] tracking-widest mb-4 flex items-center gap-2">
            {cat.name === 'Náutica' ? <Ship size={14} className="text-blue-400" /> : cat.name === 'Logística' ? <Package size={14} className="text-emerald-500" /> : <AlertTriangle size={14} className="text-orange-500" />}
            {cat.name}
          </h3>
          <div className="space-y-2 flex-1 mb-6">
            {cat.items.map((item: string) => (
              <div key={item} className="flex items-center justify-between group">
                <button onClick={() => setChecked(checked.includes(item) ? checked.filter(x => x !== item) : [...checked, item])} className="flex items-center gap-3 flex-1 text-left">
                  {checked.includes(item) ? <CheckCircle2 size={16} className="text-emerald-500" /> : <Circle size={16} className="text-slate-200" />}
                  <span className={`text-[11px] ${checked.includes(item) ? 'text-slate-300 line-through' : 'text-slate-700 font-medium'}`}>{item}</span>
                </button>
                <button onClick={() => setCategories(categories.map(c => c.id === cat.id ? {...c, items: c.items.filter(x => x !== item)} : c))} className="text-slate-200 hover:text-red-400 opacity-0 group-hover:opacity-100 transition-all"><X size={12} /></button>
              </div>
            ))}
          </div>
          <div className="flex gap-2 pt-4 border-t border-slate-50">
            <input placeholder="..." className="flex-1 bg-slate-50 border p-2 rounded-xl text-[10px]" value={newItem[cat.id] || ''} onChange={e => setNewItem({...newItem, [cat.id]: e.target.value})} onKeyDown={e => e.key === 'Enter' && addItem(cat.id)} />
            <button onClick={() => addItem(cat.id)} className="bg-slate-100 text-slate-400 p-2 rounded-xl hover:bg-slate-900 hover:text-white transition-all"><Plus size={14} /></button>
          </div>
        </div>
      ))}
    </div>
  );
};

export const LakeList = () => (
  <div className="grid grid-cols-3 sm:grid-cols-6 gap-2 text-slate-900">
    {['Falkner', 'Lácar', 'Hermoso', 'Traful', 'Correntoso', 'Espejo'].map(l => (
      <div key={l} className="bg-white p-3 rounded-2xl border border-slate-100 text-center shadow-sm">
        <Droplets size={12} className="text-blue-400 mx-auto mb-1" />
        <h4 className="text-slate-800 font-black text-[9px] uppercase tracking-tight">{l}</h4>
      </div>
    ))}
  </div>
);

export const DiscardedPlaces = () => (
  <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-slate-900">
    {[
      { n: 'Playa Catritre', r: 'Ambiente muy familiar.' },
      { n: 'Laguna Negra', r: 'Camping medio pelo.' },
      { n: 'Cascada Vullignanco', r: 'No destaca tanto.' },
      { n: 'El Bolsón', r: 'Suma mucho manejo.' }
    ].map(p => (
      <div key={p.n} className="bg-slate-50 p-4 rounded-2xl flex justify-between items-center opacity-60">
        <div><h4 className="text-xs font-bold text-slate-700 line-through">{p.n}</h4><p className="text-[10px] text-slate-400 italic">{p.r}</p></div>
        <MapPin size={14} className="text-slate-200" />
      </div>
    ))}
  </div>
);
