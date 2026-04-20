'use client';
import { useState, useEffect } from 'react';
import { CheckCircle2, Circle, Ship, Package, AlertTriangle, Edit2, Check, Plus, Trash2, X, Droplets, MapPin, Star, Zap, Mountain, Beer, Tent, ExternalLink } from 'lucide-react';

// --- THE IMPERDIBLES ---
export const Highlights = () => {
  const data = [
    { title: 'Hito Año Nuevo', desc: 'Festejo en Lago Falkner.', icon: <Star size={16} />, color: 'bg-yellow-50', link: 'https://www.google.com/maps/search/Lago+Falkner+Neuquen/' },
    { title: 'Días de Sol', desc: 'Playa Yuco, La Islita y Playa Bonita.', icon: <Droplets size={16} />, color: 'bg-blue-50', link: 'https://www.google.com/maps/search/Playa+Yuco+San+Martin+de+los+Andes/' },
    { title: 'Trekking & Cascadas', desc: 'Ñivinco, Santa Ana y Dora.', icon: <Mountain size={16} />, color: 'bg-emerald-50', link: 'https://www.google.com/maps/search/Cascada+Ñivinco/' },
    { title: 'Adrenalina', desc: 'Salto al agua en el Puente Ruca Malen.', icon: <Zap size={16} />, color: 'bg-orange-50', link: 'https://www.google.com/maps/search/Puente+Ruca+Malen/' },
    { title: 'Cierre Épico', desc: 'Refugio Patagonia.', icon: <Beer size={16} />, color: 'bg-amber-50', link: 'https://www.google.com/maps/search/Villa+Tacul+Bariloche/' },
    { title: 'Bases Relax', desc: 'Camping Pichi Traful.', icon: <Tent size={16} />, color: 'bg-indigo-50', link: 'https://www.google.com/maps/search/Lago+Espejo+Chico+Neuquen/' },
  ];
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
      {data.map((item, idx) => (
        <a key={idx} href={item.link} target="_blank" rel="noopener noreferrer" className={`${item.color} p-6 rounded-[2rem] border border-white shadow-sm flex flex-col justify-between min-h-[140px]`}>
          <div>
            <div className="bg-white p-3 rounded-2xl shadow-sm w-fit mb-4">{item.icon}</div>
            <h4 className="font-black text-slate-800 text-sm uppercase tracking-tight">{item.title}</h4>
            <p className="text-slate-500 text-[11px] leading-tight mt-1">{item.desc}</p>
          </div>
        </a>
      ))}
    </div>
  );
};

// --- ITINERARY ---
export const Itinerary = () => {
  const [items, setItems] = useState<any[]>([]);
  const [editingId, setEditingId] = useState<any>(null);

  useEffect(() => {
    const saved = localStorage.getItem('p_iti');
    setItems(saved ? JSON.parse(saved) : [
      { id: 1, day: '27/12', title: 'Salida Rosario', desc: 'Noche en Rufino.', color: 'border-blue-500' },
      { id: 2, day: '28/12', title: 'Tramo Rufino -> Falkner', desc: 'Llegada al Lago.', color: 'border-cyan-400' },
      { id: 3, day: '29/12 - 01/01', title: 'Festejos Año Nuevo', desc: 'Base Falkner.', color: 'border-emerald-500' }
    ]);
  }, []);

  useEffect(() => {
    if (items.length > 0) localStorage.setItem('p_iti', JSON.stringify(items));
  }, [items]);

  const handleUpdate = (id: any, field: string, val: string) => setItems(items.map(i => i.id === id ? { ...i, [field]: val } : i));

  return (
    <div className="space-y-4">
      {items.map((i) => (
        <div key={i.id} className={`p-6 bg-white border-l-4 ${i.color} rounded-r-[2rem] shadow-sm flex justify-between items-start`}>
          <div className="flex-1">
            <span className="text-[9px] font-black text-slate-400 uppercase">{i.day}</span>
            {editingId === i.id ? (
              <div className="mt-2 space-y-2">
                <input className="w-full bg-slate-50 border p-2 rounded text-sm" value={i.title} onChange={(e) => handleUpdate(i.id, 'title', e.target.value)} />
                <textarea className="w-full bg-slate-50 border p-2 rounded text-xs" value={i.desc} onChange={(e) => handleUpdate(i.id, 'desc', e.target.value)} />
              </div>
            ) : (
              <><h4 className="text-slate-800 font-bold text-base mt-1">{i.title}</h4><p className="text-slate-500 text-xs mt-2">{i.desc}</p></>
            )}
          </div>
          <button onClick={() => setEditingId(editingId === i.id ? null : i.id)} className="p-2 text-slate-300"><Edit2 size={14} /></button>
        </div>
      ))}
    </div>
  );
};

// --- CREW NOTES ---
export const CrewNotes = () => {
  const [notes, setNotes] = useState<any[]>([]);
  const [text, setText] = useState('');
  const [name, setName] = useState('');

  useEffect(() => {
    const saved = localStorage.getItem('p_notes');
    if (saved) setNotes(JSON.parse(saved));
  }, []);

  useEffect(() => {
    localStorage.setItem('p_notes', JSON.stringify(notes));
  }, [notes]);

  const add = () => { if (name && text) { setNotes([{ id: Date.now(), name, text, date: new Date().toLocaleDateString() }, ...notes]); setText(''); } };

  return (
    <div className="space-y-4">
      <div className="bg-white p-6 rounded-[2rem] shadow-sm space-y-3">
        <input placeholder="Nombre" className="w-full bg-slate-50 border p-3 rounded-xl text-xs" value={name} onChange={e => setName(e.target.value)} />
        <textarea placeholder="Mensaje..." className="w-full bg-slate-50 border p-3 rounded-xl text-xs h-20" value={text} onChange={e => setText(e.target.value)} />
        <button onClick={add} className="w-full bg-slate-900 text-white py-3 rounded-xl font-bold text-xs">Publicar</button>
      </div>
      {notes.map((n) => (
        <div key={n.id} className="bg-white p-5 rounded-[2rem] border border-slate-100 shadow-sm relative group">
          <button onClick={() => setNotes(notes.filter(x => x.id !== n.id))} className="absolute top-4 right-4 text-slate-300 hover:text-red-500 opacity-0 group-hover:opacity-100 transition-opacity"><Trash2 size={14} /></button>
          <p className="text-[10px] font-black text-slate-800 uppercase mb-1">{n.name} <span className="text-slate-300 font-medium ml-1">{n.date}</span></p>
          <p className="text-slate-500 text-xs leading-tight">{n.text}</p>
        </div>
      ))}
    </div>
  );
};

// --- GEAR CHECKLIST ---
export const GearChecklist = () => {
  const [categories, setCategories] = useState<any[]>([]);
  const [checked, setChecked] = useState<string[]>([]);

  useEffect(() => {
    const sCat = localStorage.getItem('p_gear');
    const sCheck = localStorage.getItem('p_checked');
    setCategories(sCat ? JSON.parse(sCat) : [
      { id: 1, name: 'Náutica', items: ['Packrafts', 'Paddle Surf'], icon: <Ship className="text-blue-400" /> },
      { id: 2, name: 'Logística', items: ['Generador', 'Gacebo'], icon: <Package className="text-emerald-500" /> },
      { id: 3, name: 'Crucial', items: ['Parlante', 'Alcohol'], icon: <AlertTriangle className="text-orange-500" /> }
    ]);
    if (sCheck) setChecked(JSON.parse(sCheck));
  }, []);

  useEffect(() => {
    if (categories.length > 0) {
      localStorage.setItem('p_gear', JSON.stringify(categories));
      localStorage.setItem('p_checked', JSON.stringify(checked));
    }
  }, [categories, checked]);

  const toggle = (item: string) => setChecked(checked.includes(item) ? checked.filter(i => i !== item) : [...checked, item]);

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
      {categories.map((cat: any) => (
        <div key={cat.id} className="bg-white p-6 rounded-[2rem] border border-slate-100 shadow-sm">
          <div className="flex items-center gap-2 mb-4">{cat.icon}<h3 className="text-slate-800 font-black uppercase text-[10px] tracking-widest">{cat.name}</h3></div>
          <div className="space-y-2">
            {cat.items.map((item: string) => (
              <button key={item} onClick={() => toggle(item)} className="flex items-center gap-3 w-full text-left">
                {checked.includes(item) ? <CheckCircle2 size={16} className="text-emerald-500" /> : <Circle size={16} className="text-slate-200" />}
                <span className={`text-xs ${checked.includes(item) ? 'text-slate-300 line-through' : 'text-slate-600'}`}>{item}</span>
              </button>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
};

// --- OTROS ---
export const LakeList = () => (
  <div className="grid grid-cols-2 sm:grid-cols-6 gap-3">
    {['Falkner', 'Lácar', 'Correntoso', 'Hermoso', 'Traful', 'Espejo Chico'].map((lake, i) => (
      <div key={i} className="bg-white p-4 rounded-3xl border border-slate-100 text-center shadow-sm">
        <Droplets size={14} className="text-blue-400 mx-auto mb-2" />
        <h4 className="text-slate-800 font-black text-[9px] uppercase tracking-tight">{lake}</h4>
      </div>
    ))}
  </div>
);

export const DiscardedPlaces = () => (
  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
    {[
      { n: 'Playa Catritre', r: 'Muy familiar.', t: 'San Martín' },
      { n: 'Laguna Negra', r: 'Camping básico.', t: 'Bariloche' }
    ].map((p, i) => (
      <div key={i} className="bg-slate-50 p-5 rounded-2xl flex justify-between items-center">
        <div><span className="text-[8px] font-bold text-slate-400 uppercase mb-1 block">{p.t}</span><h4 className="text-slate-700 font-bold text-sm line-through opacity-50">{p.n}</h4><p className="text-slate-500 text-[10px] italic">{p.r}</p></div>
        <MapPin size={14} className="text-slate-200" />
      </div>
    ))}
  </div>
);
