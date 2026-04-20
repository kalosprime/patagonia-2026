'use client';
import { useState, useEffect } from 'react';
import { CheckCircle2, Circle, Edit2, Check, Plus, Trash2, X, Droplets, MapPin, Star, Zap, Mountain, Beer, Tent, ExternalLink } from 'lucide-react';

export const Highlights = () => {
  const data = [
    { title: 'Hito Año Nuevo', desc: 'Lago Falkner.', icon: <Star size={16} />, color: 'bg-yellow-50', link: 'https://www.google.com/maps/search/Lago+Falkner+Neuquen/' },
    { title: 'Días de Sol', desc: 'Playa Yuco.', icon: <Droplets size={16} />, color: 'bg-blue-50', link: 'https://www.google.com/maps/search/Playa+Yuco/' },
    { title: 'Trekkings', desc: 'Ñivinco y Santa Ana.', icon: <Mountain size={16} />, color: 'bg-emerald-50', link: 'https://www.google.com/maps/search/Cascada+Ñivinco/' },
    { title: 'Adrenalina', desc: 'Puente Ruca Malen.', icon: <Zap size={16} />, color: 'bg-orange-50', link: 'https://www.google.com/maps/search/Puente+Ruca+Malen/' },
    { title: 'Cierre', desc: 'Refugio Patagonia.', icon: <Beer size={16} />, color: 'bg-amber-50', link: 'https://www.google.com/maps/search/Villa+Tacul+Bariloche/' },
    { title: 'Bases', desc: 'Pichi Traful.', icon: <Tent size={16} />, color: 'bg-indigo-50', link: 'https://www.google.com/maps/search/Lago+Espejo+Chico+Neuquen/' },
  ];
  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
      {data.map((item, idx) => (
        <a key={idx} href={item.link} target="_blank" rel="noopener noreferrer" className={`${item.color} p-4 rounded-[2rem] border border-white shadow-sm flex flex-col justify-between min-h-[120px]`}>
          <div className="bg-white p-2 rounded-xl shadow-sm w-fit mb-2">{item.icon}</div>
          <h4 className="font-black text-slate-800 text-[11px] uppercase leading-tight">{item.title}</h4>
        </a>
      ))}
    </div>
  );
};

export const Itinerary = () => {
  const [items, setItems] = useState<any[]>([]);
  const [editingId, setEditingId] = useState<any>(null);

  useEffect(() => {
    const saved = localStorage.getItem('banda_vfinal_iti');
    setItems(saved ? JSON.parse(saved) : [
      { id: 1, day: '27/12', title: 'Salida Rosario', desc: 'Noche en Rufino.', color: 'border-blue-500' },
      { id: 2, day: '28/12', title: 'Rumbo al Falkner', desc: '15hs de manejo.', color: 'border-cyan-400' },
      { id: 3, day: '29/12 - 01/01', title: 'Año Nuevo', desc: 'Base Falkner.', color: 'border-emerald-500' }
    ]);
  }, []);

  useEffect(() => {
    if (items.length > 0) localStorage.setItem('banda_vfinal_iti', JSON.stringify(items));
  }, [items]);

  if (items.length === 0) return null;

  return (
    <div className="space-y-4">
      {items.map((i) => (
        <div key={i.id} className="p-5 bg-white border-l-4 border-slate-200 rounded-r-[2rem] shadow-sm flex justify-between items-center text-slate-800">
          <div>
            <span className="text-[9px] font-black text-slate-400">{i.day}</span>
            <h4 className="font-bold text-sm">{i.title}</h4>
          </div>
          <button onClick={() => setEditingId(editingId === i.id ? null : i.id)} className="p-2 text-slate-300"><Edit2 size={14} /></button>
        </div>
      ))}
    </div>
  );
};

export const CrewNotes = () => {
  const [notes, setNotes] = useState<any[]>([]);
  const [text, setText] = useState('');

  useEffect(() => {
    const saved = localStorage.getItem('banda_vfinal_notes');
    if (saved) setNotes(JSON.parse(saved));
  }, []);

  useEffect(() => {
    localStorage.setItem('banda_vfinal_notes', JSON.stringify(notes));
  }, [notes]);

  if (!notes) return null;

  return (
    <div className="space-y-4">
      <div className="bg-white p-5 rounded-[2rem] shadow-sm space-y-3">
        <textarea placeholder="Anota algo..." className="w-full bg-slate-50 p-3 rounded-xl text-xs h-20 text-slate-800 outline-none" value={text} onChange={e => setText(e.target.value)} />
        <button onClick={() => { if(text) { setNotes([{id:Date.now(), text}, ...notes]); setText(''); } }} className="w-full bg-slate-900 text-white py-3 rounded-xl text-xs font-bold">Guardar Nota</button>
      </div>
      {notes.map(n => (
        <div key={n.id} className="bg-white p-4 rounded-2xl border border-slate-100 shadow-sm flex justify-between items-center text-slate-800">
          <p className="text-xs">{n.text}</p>
          <button onClick={() => setNotes(notes.filter(x => x.id !== n.id))} className="text-slate-300"><Trash2 size={14} /></button>
        </div>
      ))}
    </div>
  );
};

export const GearChecklist = () => {
  const [checked, setChecked] = useState<string[]>([]);
  useEffect(() => {
    const saved = localStorage.getItem('banda_vfinal_check');
    if (saved) setChecked(JSON.parse(saved));
  }, []);
  useEffect(() => {
    localStorage.setItem('banda_vfinal_check', JSON.stringify(checked));
  }, [checked]);

  const items = ['Generador', 'Packrafts', 'Paddle Surf', 'Walkies', 'Gacebo', 'Parlante', 'Alcohol'];

  return (
    <div className="grid grid-cols-2 gap-3">
      {items.map(i => (
        <button key={i} onClick={() => setChecked(checked.includes(i) ? checked.filter(x => x !== i) : [...checked, i])} className="bg-white p-4 rounded-2xl border border-slate-100 shadow-sm flex items-center gap-3 text-slate-800">
          {checked.includes(i) ? <CheckCircle2 size={16} className="text-emerald-500" /> : <Circle size={16} className="text-slate-200" />}
          <span className="text-[11px] font-bold">{i}</span>
        </button>
      ))}
    </div>
  );
};

export const LakeList = () => (
  <div className="grid grid-cols-3 gap-2">
    {['Falkner', 'Lácar', 'Hermoso', 'Traful', 'Correntoso', 'Espejo'].map(l => (
      <div key={l} className="bg-white p-3 rounded-xl border border-slate-100 text-center shadow-sm">
        <h4 className="text-slate-800 font-black text-[9px] uppercase">{l}</h4>
      </div>
    ))}
  </div>
);

export const DiscardedPlaces = () => (
  <div className="grid grid-cols-1 gap-2">
    {[{n:'Catritre', r:'Muy familiar'}, {n:'Laguna Negra', r:'Camping flojo'}].map(p => (
      <div key={p.n} className="bg-slate-50 p-4 rounded-xl flex justify-between items-center opacity-60">
        <span className="text-xs font-bold text-slate-700 line-through">{p.n}</span>
        <span className="text-[10px] text-slate-400 italic">{p.r}</span>
      </div>
    ))}
  </div>
);
