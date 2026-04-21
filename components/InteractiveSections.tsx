'use client';
import { useState, useEffect, useRef } from 'react';
import { CheckCircle2, Circle, Ship, Package, AlertTriangle, Edit2, Check, Plus, Trash2, X, Droplets, MapPin, Star, Zap, Mountain, Beer, Tent, ExternalLink, RefreshCw, ShoppingCart, Info, Briefcase } from 'lucide-react';

// --- TYPES ---
interface ItineraryItem { id: number | string; day: string; title: string; desc: string; color: string; }
interface NoteItem { id: number; name: string; text: string; category: 'llevar' | 'aviso' | 'comprar'; date: string; }
interface GearCategory { id: number; name: string; items: string[]; }

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
        <a key={idx} href={item.link} target="_blank" rel="noopener noreferrer" className={`${item.color} group p-6 rounded-[2.5rem] border border-white shadow-sm flex flex-col justify-between transition-all hover:shadow-xl min-h-[150px]`}>
          <div className="flex gap-4">
            <div className="bg-white p-3 rounded-2xl shadow-sm h-fit text-slate-700">{item.icon}</div>
            <div className="text-left text-slate-900">
              <h4 className="font-black text-sm uppercase tracking-tight">{item.title}</h4>
              <p className="text-slate-500 text-[11px] leading-tight mt-1">{item.desc}</p>
            </div>
          </div>
          <div className="mt-4 flex items-center gap-1.5 text-[9px] font-black text-slate-400 uppercase tracking-widest group-hover:text-glacier transition-colors text-slate-900">Google Maps <ExternalLink size={10} /></div>
        </a>
      ))}
    </div>
  );
};

// --- ITINERARY ---
export const Itinerary = () => {
  const [items, setItems] = useState<ItineraryItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [editingId, setEditingId] = useState<number | string | null>(null);
  const initialLoadDone = useRef(false);

  const initial = [
    { id: 1, day: '27/12', title: 'Salida Rosario', desc: 'Noche en Rufino.', color: 'border-blue-500' },
    { id: 2, day: '28/12', title: 'Tramo Rufino -> Falkner', desc: '15hs de manejo.', color: 'border-cyan-400' },
    { id: 3, day: '29/12 - 01/01', title: 'Base Falkner', desc: 'Año Nuevo.', color: 'border-emerald-500' },
  ];

  useEffect(() => {
    fetch('/api/db', { cache: 'no-store' }).then(res => res.json()).then(data => {
      setItems(data.itinerary && data.itinerary.length > 0 ? data.itinerary : initial);
      setLoading(false);
      initialLoadDone.current = true;
    });
  }, []);

  const save = async (newData: ItineraryItem[]) => {
    if (!initialLoadDone.current) return;
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
      {saving && <div className="fixed top-4 right-4 bg-slate-900 text-white px-4 py-2 rounded-full text-[10px] font-black z-50 flex items-center gap-2 shadow-2xl"><RefreshCw size={10} className="animate-spin" /> SYNC SUPABASE...</div>}
      {items.map((i) => (
        <div key={i.id} className={`p-6 bg-white border-l-4 border-slate-100 rounded-r-[2rem] shadow-sm flex justify-between items-start`}>
          <div className="flex-1 text-left text-slate-900">
            {editingId === i.id ? (
              <div className="space-y-2 pr-4">
                <input className="w-full bg-slate-50 border p-2 rounded text-[10px] font-black uppercase text-slate-800" value={i.day} onChange={(e) => setItems(items.map(x => x.id === i.id ? {...x, day: e.target.value} : x))} />
                <input className="w-full bg-slate-50 border p-2 rounded text-sm font-bold text-slate-800" value={i.title} onChange={(e) => setItems(items.map(x => x.id === i.id ? {...x, title: e.target.value} : x))} />
                <textarea className="w-full bg-slate-50 border p-2 rounded text-xs text-slate-600" value={i.desc} onChange={(e) => setItems(items.map(x => x.id === i.id ? {...x, desc: e.target.value} : x))} />
              </div>
            ) : (
              <><span className="text-[9px] font-black text-slate-300 uppercase">{i.day}</span><h4 className="text-slate-800 font-bold text-sm mt-1">{i.title}</h4><p className="text-slate-500 text-xs mt-1 leading-relaxed">{i.desc}</p></>
            )}
          </div>
          <div className="flex gap-1">
            <button onClick={() => { if(editingId === i.id) { save(items); setEditingId(null); } else { setEditingId(i.id); } }} className="p-2 text-slate-300 hover:text-glacier">{editingId === i.id ? <Check size={16} className="text-forest font-bold" /> : <Edit2 size={14} />}</button>
            <button onClick={() => save(items.filter(x => x.id !== i.id))} className="p-2 text-slate-300 hover:text-red-400"><Trash2 size={14} /></button>
          </div>
        </div>
      ))}
      <button onClick={() => { const id = Date.now(); const n = [...items, { id, day: 'Fecha', title: 'Destino', desc: '...', color: 'border-slate-200' }]; save(n); setEditingId(id); }} className="w-full py-4 border-2 border-dashed border-slate-200 rounded-3xl text-slate-400 text-xs font-bold uppercase tracking-widest hover:border-glacier transition-all">+ AGREGAR ETAPA</button>
    </div>
  );
};

// --- CREW NOTES ---
export const CrewNotes = () => {
  const [notes, setNotes] = useState<NoteItem[]>([]);
  const [name, setName] = useState('');
  const [text, setText] = useState('');
  const [cat, setCat] = useState<'aviso' | 'llevar' | 'comprar'>('aviso');
  const [loading, setLoading] = useState(true);
  const initialLoadDone = useRef(false);

  useEffect(() => {
    fetch('/api/db', { cache: 'no-store' }).then(res => res.json()).then(data => {
      setNotes(data.notes || []);
      setLoading(false);
      initialLoadDone.current = true;
    });
  }, []);

  const save = async (n: NoteItem[]) => {
    if (!initialLoadDone.current) return;
    setNotes(n);
    await fetch('/api/db', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ type: 'notes', data: n }) });
  };

  if (loading) return <Skeleton h="h-40" />;

  return (
    <div className="space-y-4">
      <div className="bg-white p-6 rounded-[2.5rem] shadow-sm border border-slate-100 space-y-4">
        <div className="flex gap-2">
          {(['aviso', 'llevar', 'comprar'] as const).map(c => (
            <button key={c} onClick={() => setCat(c)} className={`px-4 py-2 rounded-full text-[9px] font-black uppercase tracking-widest transition-all border ${cat === c ? 'bg-slate-900 text-white border-slate-900' : 'bg-slate-50 text-slate-400 border-slate-100'}`}>
              {c === 'llevar' ? '🎒 Llevar' : c === 'comprar' ? '🛒 Comprar' : '💡 Aviso'}
            </button>
          ))}
        </div>
        <div className="grid grid-cols-2 gap-3 text-slate-900">
          <input placeholder="Nombre" className="bg-slate-50 border-none p-3 rounded-xl text-xs" value={name} onChange={e => setName(e.target.value)} />
          <button onClick={() => { if(name && text) { const n: NoteItem[] = [{id:Date.now(), name, text, category:cat, date:new Date().toLocaleDateString()}, ...notes]; save(n); setText(''); } }} className="bg-slate-900 text-white py-3 rounded-xl font-bold text-xs uppercase tracking-widest">Publicar</button>
        </div>
        <textarea placeholder="Mensaje..." className="w-full bg-slate-50 border-none p-4 rounded-xl text-xs h-24 text-slate-900 outline-none" value={text} onChange={e => setText(e.target.value)} />
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-slate-900">
        {notes.map(n => (
          <div key={n.id} className="bg-white p-5 rounded-3xl border border-slate-50 shadow-sm relative group text-left">
            <button onClick={() => save(notes.filter(x => x.id !== n.id))} className="absolute top-4 right-4 text-slate-200 hover:text-red-400 opacity-0 group-hover:opacity-100"><X size={14} /></button>
            <span className={`px-2 py-0.5 rounded-full text-[7px] font-black uppercase mb-2 inline-block ${n.category === 'llevar' ? 'bg-blue-100 text-blue-600' : n.category === 'comprar' ? 'bg-emerald-100 text-emerald-600' : 'bg-amber-100 text-amber-600'}`}>{n.category}</span>
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
  const [cat, setCat] = useState<GearCategory[]>([]);
  const [checked, setChecked] = useState<string[]>([]);
  const [loading, setLoading] = useState(true);
  const [newItem, setNewItem] = useState<{[key: number]: string}>({});
  const initialLoadDone = useRef(false);

  const initial = [
    { id: 1, name: 'Náutica', items: ['4 Packrafts dobles', '3 Paddle Surf', '3 Infladores'] },
    { id: 2, name: 'Logística', items: ['Generador', 'Mesa + 15 Sillas', 'Gacebo', 'Walkies'] },
    { id: 3, name: 'Crucial', items: ['Parlante Grande', 'Alcohol (Distribuidora)', 'Hielo'] }
  ];

  useEffect(() => {
    fetch('/api/db', { cache: 'no-store' }).then(res => res.json()).then(data => {
      setCat(data.gear && data.gear.length > 0 ? data.gear : initial);
      setChecked(data.checked || []);
      setLoading(false);
      initialLoadDone.current = true;
    });
  }, []);

  const save = async (nc: GearCategory[], nch: string[]) => {
    if (!initialLoadDone.current) return;
    setCat(nc); setChecked(nch);
    await Promise.all([
      fetch('/api/db', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ type: 'gear', data: nc }) }),
      fetch('/api/db', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ type: 'checked', data: nch }) })
    ]);
  };

  if (loading) return <Skeleton h="h-60" />;

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-slate-900">
      {cat.map((c) => (
        <div key={c.id} className="bg-white p-6 rounded-[2.5rem] border border-slate-50 shadow-sm flex flex-col h-full text-left">
          <h3 className="text-slate-800 font-black uppercase text-[10px] tracking-widest mb-4">{c.name}</h3>
          <div className="space-y-2 flex-1">
            {c.items.map((item) => (
              <div key={item} className="flex items-center justify-between group">
                <button onClick={() => save(cat, checked.includes(item) ? checked.filter(x => x !== item) : [...checked, item])} className="flex items-center gap-3 flex-1 text-left">
                  {checked.includes(item) ? <CheckCircle2 size={16} className="text-emerald-500" /> : <Circle size={16} className="text-slate-200" />}
                  <span className={`text-[11px] font-medium ${checked.includes(item) ? 'text-slate-300 line-through' : 'text-slate-700'}`}>{item}</span>
                </button>
                <button onClick={() => save(cat.map(x => x.id === c.id ? {...x, items: x.items.filter(y => y !== item)} : x), checked)} className="text-slate-200 hover:text-red-400 opacity-0 group-hover:opacity-100 transition-all"><X size={12} /></button>
              </div>
            ))}
          </div>
          <div className="flex gap-2 pt-4 border-t border-slate-50 mt-4">
            <input placeholder="..." className="flex-1 bg-slate-50 border-none p-2 rounded-xl text-[10px]" value={newItem[c.id] || ''} onChange={e => setNewItem({...newItem, [c.id]: e.target.value})} onKeyDown={e => { if(e.key==='Enter' && newItem[c.id]) { const n = cat.map(x => x.id === c.id ? {...x, items: [...x.items, newItem[c.id]]} : x); save(n, checked); setNewItem({...newItem, [c.id]: ''}); } }} />
            <button onClick={() => { if(newItem[c.id]) { const n = cat.map(x => x.id === c.id ? {...x, items: [...x.items, newItem[c.id]]} : x); save(n, checked); setNewItem({...newItem, [c.id]: ''}); } }} className="bg-slate-100 p-2 rounded-xl text-slate-400 hover:bg-slate-900 hover:text-white transition-all"><Plus size={14} /></button>
          </div>
        </div>
      ))}
    </div>
  );
};

// --- OTROS ---
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
  <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-slate-900 text-left opacity-60">
    {[
      { n: 'Playa Catritre', r: 'Muy familiar.', t: 'San Martín' },
      { n: 'Laguna Negra', r: 'Camping medio pelo.', t: 'Bariloche' }
    ].map(p => (
      <div key={p.n} className="bg-slate-50 border border-slate-100 p-4 rounded-2xl flex justify-between items-center">
        <div><h4 className="text-xs font-bold text-slate-700 line-through">{p.n}</h4><p className="text-[10px] text-slate-400 italic">{p.r}</p></div>
        <MapPin size={14} className="text-slate-200" />
      </div>
    ))}
  </div>
);
