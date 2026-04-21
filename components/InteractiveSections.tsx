'use client';
import { useState, useEffect } from 'react';
import { CheckCircle2, Circle, Ship, Package, AlertTriangle, Edit2, Check, Plus, Trash2, X, MapPin, Star, Zap, Mountain, Beer, Tent, ExternalLink, RefreshCw, Droplets } from 'lucide-react';

const Skeleton = ({ h = "h-40" }) => <div className={`${h} w-full bg-slate-100 animate-pulse rounded-[2rem] border border-slate-50`} />;

// --- THE IMPERDIBLES ---
export const Highlights = () => {
  const data = [
    { title: 'Hito Año Nuevo', desc: 'Lago Falkner.', icon: <Star size={16} />, color: 'bg-yellow-50', link: 'https://www.google.com/maps/search/Lago+Falkner+Neuquen/' },
    { title: 'Días de Sol', desc: 'Playa Yuco.', icon: <Zap size={16} />, color: 'bg-blue-50', link: 'https://www.google.com/maps/search/Playa+Yuco/' },
    { title: 'Trekkings', desc: 'Cascadas.', icon: <Mountain size={16} />, color: 'bg-emerald-50', link: 'https://www.google.com/maps/search/Cascada+Ñivinco/' },
  ];
  return (
    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
      {data.map((item, idx) => (
        <a key={idx} href={item.link} target="_blank" rel="noopener noreferrer" className={`${item.color} group p-6 rounded-[2.5rem] border border-white shadow-sm flex flex-col justify-between min-h-[120px]`}>
          <div className="bg-white p-2 rounded-xl shadow-sm w-fit mb-2 text-slate-800">{item.icon}</div>
          <h4 className="font-black text-slate-800 text-sm uppercase tracking-tight">{item.title}</h4>
        </a>
      ))}
    </div>
  );
};

// --- ITINERARY ---
export const Itinerary = () => {
  const [items, setItems] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [editingId, setEditingId] = useState<any>(null);

  const initial = [
    { id: 1, day: '27/12', title: 'Salida Rosario', desc: 'Noche en Rufino.', color: 'border-blue-500' },
    { id: 2, day: '28/12', title: 'Tramo Rufino -> Falkner', desc: '15hs de manejo.', color: 'border-cyan-400' },
    { id: 3, day: '29/12 - 01/01', title: 'Base Falkner', desc: 'Año Nuevo.', color: 'border-emerald-500' },
  ];

  const fetchItems = async () => {
    try {
      const res = await fetch(`/api/db?t=${Date.now()}`, { cache: 'no-store' });
      const data = await res.json();
      setItems(data.itinerary && data.itinerary.length > 0 ? data.itinerary : initial);
    } catch (e) { setItems(initial); }
    setLoading(false);
  };

  useEffect(() => { fetchItems(); }, []);

  const save = async (newData: any[]) => {
    setSaving(true);
    setItems(newData);
    await fetch('/api/db', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ type: 'itinerary', data: newData })
    });
    setSaving(false);
  };

  if (loading) return <Skeleton h="h-60" />;

  return (
    <div className="space-y-4">
      {saving && <div className="fixed top-4 right-4 bg-slate-900 text-white px-4 py-2 rounded-full text-[10px] font-black z-50 flex items-center gap-2 shadow-2xl animate-pulse"><RefreshCw size={10} className="animate-spin" /> SINCRONIZANDO...</div>}
      {items.map((i) => (
        <div key={i.id} className={`p-6 bg-white border-l-4 ${i.color || 'border-slate-100'} rounded-r-[2rem] shadow-sm flex justify-between items-start`}>
          <div className="flex-1 text-slate-800">
            {editingId === i.id ? (
              <div className="space-y-2 pr-4">
                <input className="w-full bg-slate-50 border p-2 rounded text-[10px] font-black" value={i.day} onChange={(e) => setItems(items.map(x => x.id === i.id ? {...x, day: e.target.value} : x))} />
                <input className="w-full bg-slate-50 border p-2 rounded text-sm font-bold" value={i.title} onChange={(e) => setItems(items.map(x => x.id === i.id ? {...x, title: e.target.value} : x))} />
                <textarea className="w-full bg-slate-50 border p-2 rounded text-xs" value={i.desc} onChange={(e) => setItems(items.map(x => x.id === i.id ? {...x, desc: e.target.value} : x))} />
              </div>
            ) : (
              <><span className="text-[9px] font-black text-slate-300 uppercase">{i.day}</span><h4 className="text-slate-800 font-bold text-sm mt-1">{i.title}</h4><p className="text-slate-500 text-xs mt-1 leading-relaxed">{i.desc}</p></>
            )}
          </div>
          <div className="flex gap-1">
            <button onClick={() => { if(editingId === i.id) { save(items); setEditingId(null); } else { setEditingId(i.id); } }} className="p-2 text-slate-300">{editingId === i.id ? <Check size={16} className="text-forest" /> : <Edit2 size={14} />}</button>
            <button onClick={() => save(items.filter(x => x.id !== i.id))} className="p-2 text-slate-300 hover:text-red-400"><Trash2 size={14} /></button>
          </div>
        </div>
      ))}
      <button onClick={() => { const id = Date.now(); const n = [...items, { id, day: 'Fecha', title: 'Destino', desc: '...', color: 'border-slate-200' }]; save(n); setEditingId(id); }} className="w-full py-4 border-2 border-dashed border-slate-200 rounded-3xl text-slate-400 text-xs font-bold">+ AGREGAR ETAPA</button>
    </div>
  );
};

// --- CREW NOTES ---
export const CrewNotes = () => {
  const [notes, setNotes] = useState<any[]>([]);
  const [name, setName] = useState('');
  const [text, setText] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch(`/api/db?t=${Date.now()}`, { cache: 'no-store' }).then(res => res.json()).then(data => {
      setNotes(data.notes || []);
      setLoading(false);
    });
  }, []);

  const save = async (n: any[]) => {
    setNotes(n);
    await fetch('/api/db', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ type: 'notes', data: n }) });
  };

  if (loading) return <Skeleton h="h-40" />;

  return (
    <div className="space-y-4">
      <div className="bg-white p-6 rounded-[2.5rem] shadow-sm space-y-3">
        <input placeholder="Nombre" className="w-full bg-slate-50 border p-3 rounded-xl text-xs text-slate-800 outline-none" value={name} onChange={e => setName(e.target.value)} />
        <textarea placeholder="Mensaje..." className="w-full bg-slate-50 border p-3 rounded-xl text-xs h-20 text-slate-800 outline-none" value={text} onChange={e => setText(e.target.value)} />
        <button onClick={() => { if(name && text) { const n = [{ id: Date.now(), name, text, date: new Date().toLocaleDateString() }, ...notes]; save(n); setText(''); } }} className="bg-slate-900 text-white py-3 rounded-xl font-bold text-xs text-center">PUBLICAR</button>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-slate-900">
        {notes.map(n => (
          <div key={n.id} className="bg-white p-5 rounded-3xl border border-slate-50 shadow-sm relative group text-slate-800 text-left">
            <button onClick={() => save(notes.filter(x => x.id !== n.id))} className="absolute top-4 right-4 text-slate-200 hover:text-red-400 opacity-0 group-hover:opacity-100"><X size={14} /></button>
            <p className="text-[10px] font-black uppercase">{n.name} <span className="text-slate-300 ml-1 font-medium">{n.date}</span></p>
            <p className="text-slate-600 text-xs mt-1 leading-relaxed">{n.text}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

// --- GEAR CHECKLIST ---
export const GearChecklist = () => {
  const [cat, setCat] = useState<any[]>([]);
  const [checked, setChecked] = useState<string[]>([]);
  const [loading, setLoading] = useState(true);

  const initial = [
    { id: 1, name: 'Náutica', items: ['Packrafts', 'Paddle Surf'] },
    { id: 2, name: 'Logística', items: ['Generador', 'Mesa + Sillas'] },
    { id: 3, name: 'Crucial', items: ['Parlante', 'Alcohol'] }
  ];

  useEffect(() => {
    fetch(`/api/db?t=${Date.now()}`, { cache: 'no-store' }).then(res => res.json()).then(data => {
      setCat(data.gear && data.gear.length > 0 ? data.gear : initial);
      setChecked(data.checked || []);
      setLoading(false);
    });
  }, []);

  const save = async (nc: any[], nch: string[]) => {
    setCat(nc); setChecked(nch);
    await Promise.all([
      fetch('/api/db', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ type: 'gear', data: nc }) }),
      fetch('/api/db', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ type: 'checked', data: nch }) })
    ]);
  };

  if (loading) return <Skeleton h="h-60" />;

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-slate-900">
      {cat.map((c: any) => (
        <div key={c.id} className="bg-white p-6 rounded-[2.5rem] border border-slate-50 shadow-sm flex flex-col h-full text-left">
          <h3 className="text-slate-800 font-black uppercase text-[10px] tracking-widest mb-4">{c.name}</h3>
          <div className="space-y-2 flex-1">
            {c.items.map((item: string) => (
              <div key={item} className="flex items-center justify-between group">
                <button onClick={() => save(cat, checked.includes(item) ? checked.filter(x => x !== item) : [...checked, item])} className="flex items-center gap-3 flex-1 text-left">
                  {checked.includes(item) ? <CheckCircle2 size={16} className="text-emerald-500" /> : <Circle size={16} className="text-slate-200" />}
                  <span className={`text-[11px] font-medium ${checked.includes(item) ? 'text-slate-300 line-through' : 'text-slate-700'}`}>{item}</span>
                </button>
                <button onClick={() => save(cat.map(x => x.id === c.id ? {...x, items: x.items.filter(y => y !== item)} : x), checked)} className="text-slate-200 hover:text-red-400 opacity-0 group-hover:opacity-100"><X size={12} /></button>
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
};

// --- OTROS (ESTOS FALTABAN) ---
export const LakeList = () => {
  const lakes = ['Falkner', 'Lácar', 'Hermoso', 'Traful', 'Correntoso', 'Espejo'];
  return (
    <div className="grid grid-cols-2 sm:grid-cols-6 gap-3 text-slate-900">
      {lakes.map((lake, i) => (
        <div key={i} className="bg-white p-4 rounded-3xl border border-slate-100 shadow-sm text-center">
          <Droplets size={16} className="text-blue-400 mx-auto mb-2" />
          <h4 className="text-slate-800 font-black text-[9px] uppercase tracking-tight">{lake}</h4>
        </div>
      ))}
    </div>
  );
};

export const DiscardedPlaces = () => {
  const data = [
    { n: 'Playa Catritre', r: 'Muy familiar.', t: 'San Martín' },
    { n: 'Laguna Negra', r: 'Camping flojo.', t: 'Bariloche' }
  ];
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-slate-900 text-left">
      {data.map((p, i) => (
        <div key={i} className="bg-slate-50 border border-slate-100 p-5 rounded-2xl flex justify-between items-center opacity-60">
          <div><h4 className="text-xs font-bold text-slate-700 line-through">{p.n}</h4><p className="text-[10px] text-slate-400 italic leading-tight">{p.r}</p></div>
          <MapPin size={14} className="text-slate-200" />
        </div>
      ))}
    </div>
  );
};
