'use client';
import { useState, useEffect } from 'react';
import { CheckCircle2, Circle, Ship, Package, AlertTriangle, Edit2, Check, Plus, Trash2, X, Droplets, MapPin, Star, Zap, Mountain, Beer, Tent, ExternalLink, ShoppingCart, Info, Briefcase, RefreshCw } from 'lucide-react';

// --- TYPES ---
interface ItineraryItem { id: number | string; day: string; title: string; desc: string; color: string; }
interface NoteItem { id: number; name: string; text: string; category: 'llevar' | 'aviso' | 'comprar'; date: string; }
interface GearCategory { id: number; name: string; items: string[]; }

const Skeleton = ({ h = "h-40" }) => <div className={`${h} w-full bg-slate-100 animate-pulse rounded-[2rem] border border-slate-50`} />;

// --- THE IMPERDIBLES ---
export const Highlights = () => {
  const data = [
    { title: 'Hito Año Nuevo', desc: 'Lago Falkner.', icon: <Star size={16} />, color: 'bg-yellow-50', link: 'https://www.google.com/maps/search/Lago+Falkner+Neuquen/' },
    { title: 'Días de Sol', desc: 'Playa Yuco.', icon: <Droplets size={16} />, color: 'bg-blue-50', link: 'https://www.google.com/maps/search/Playa+Yuco/' },
    { title: 'Trekking', desc: 'Ñivinco y Santa Ana.', icon: <Mountain size={16} />, color: 'bg-emerald-50', link: 'https://www.google.com/maps/search/Cascada+Ñivinco/' },
    { title: 'Adrenalina', desc: 'Puente Ruca Malen.', icon: <Zap size={16} />, color: 'bg-orange-50', link: 'https://www.google.com/maps/search/Puente+Ruca+Malen/' },
    { title: 'Cierre', desc: 'Refugio Patagonia.', icon: <Beer size={16} />, color: 'bg-amber-50', link: 'https://www.google.com/maps/search/Villa+Tacul+Bariloche/' },
    { title: 'Bases', desc: 'Pichi Traful.', icon: <Tent size={16} />, color: 'bg-indigo-50', link: 'https://www.google.com/maps/search/Lago+Espejo+Chico+Neuquen/' },
  ];
  return (
    <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
      {data.map((item, idx) => (
        <a key={idx} href={item.link} target="_blank" rel="noopener noreferrer" className={`${item.color} group p-5 rounded-[2rem] border border-white shadow-sm flex flex-col justify-between min-h-[120px]`}>
          <div className="bg-white p-2 rounded-xl shadow-sm w-fit mb-2">{item.icon}</div>
          <h4 className="font-black text-slate-800 text-[11px] uppercase tracking-tight">{item.title}</h4>
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

  const initial = [
    { id: 1, day: '27/12', title: 'Salida Rosario', desc: 'Parada en Rufino.', color: 'border-blue-500' },
    { id: 2, day: '28/12', title: 'Rumbo al Falkner', desc: '15 horas de manejo.', color: 'border-cyan-400' },
    { id: 3, day: '29/12 - 01/01', title: 'Base Falkner', desc: 'Año Nuevo.', color: 'border-emerald-500' },
  ];

  const fetchItems = async () => {
    const res = await fetch(`/api/db?t=${Date.now()}`);
    const data = await res.json();
    setItems(data.itinerary && data.itinerary.length > 0 ? data.itinerary : initial);
    setLoading(false);
  };

  useEffect(() => { fetchItems(); }, []);

  const save = async (newData: ItineraryItem[]) => {
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
      {saving && <div className="fixed top-4 right-4 bg-slate-900 text-white px-4 py-2 rounded-full text-xs font-bold flex items-center gap-2 shadow-xl z-50 animate-bounce"><RefreshCw size={12} className="animate-spin" /> Guardando en nube...</div>}
      {items.map((i) => (
        <div key={i.id} className="p-6 bg-white border-l-4 border-slate-100 rounded-r-[2rem] shadow-sm flex justify-between items-start">
          <div className="flex-1">
            {editingId === i.id ? (
              <div className="space-y-2 pr-4">
                <input className="w-full bg-slate-50 border p-2 rounded text-[10px] font-black uppercase" value={i.day} onChange={(e) => setItems(items.map(x => x.id === i.id ? {...x, day: e.target.value} : x))} />
                <input className="w-full bg-slate-50 border p-2 rounded text-sm font-bold" value={i.title} onChange={(e) => setItems(items.map(x => x.id === i.id ? {...x, title: e.target.value} : x))} />
                <textarea className="w-full bg-slate-50 border p-2 rounded text-xs" value={i.desc} onChange={(e) => setItems(items.map(x => x.id === i.id ? {...x, desc: e.target.value} : x))} />
              </div>
            ) : (
              <><span className="text-[9px] font-black text-slate-300 uppercase">{i.day}</span><h4 className="text-slate-800 font-bold text-sm mt-1">{i.title}</h4><p className="text-slate-500 text-xs mt-1 leading-relaxed">{i.desc}</p></>
            )}
          </div>
          <div className="flex gap-1 ml-2">
            <button onClick={() => { if(editingId === i.id) { save(items); setEditingId(null); } else { setEditingId(i.id); } }} className="p-2 text-slate-300">{editingId === i.id ? <Check size={16} className="text-forest font-bold" /> : <Edit2 size={14} />}</button>
            <button onClick={() => save(items.filter(x => x.id !== i.id))} className="p-2 text-slate-300"><Trash2 size={14} /></button>
          </div>
        </div>
      ))}
      <button onClick={() => { const id = Date.now(); const next = [...items, { id, day: 'Fecha', title: 'Nueva Etapa', desc: '...', color: 'border-slate-200' }]; save(next); setEditingId(id); }} className="w-full py-4 border-2 border-dashed border-slate-200 rounded-3xl text-slate-400 text-xs font-bold">+ Agregar Etapa</button>
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

  const fetchNotes = async () => {
    const res = await fetch(`/api/db?t=${Date.now()}`);
    const data = await res.json();
    setNotes(data.notes || []);
    setLoading(false);
  };

  useEffect(() => { fetchNotes(); }, []);

  const save = async (newNotes: NoteItem[]) => {
    setNotes(newNotes);
    await fetch('/api/db', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ type: 'notes', data: newNotes })
    });
  };

  if (loading) return <Skeleton h="h-40" />;

  return (
    <div className="space-y-4">
      <div className="bg-white p-6 rounded-[2.5rem] shadow-sm space-y-4">
        <div className="flex gap-2">
          {(['aviso', 'llevar', 'comprar'] as const).map(c => (
            <button key={c} onClick={() => setCat(c)} className={`px-4 py-2 rounded-full text-[9px] font-black uppercase tracking-widest ${cat === c ? 'bg-slate-900 text-white' : 'bg-slate-50 text-slate-400'}`}>
              {c === 'llevar' ? '🎒 Llevar' : c === 'comprar' ? '🛒 Comprar' : '💡 Aviso'}
            </button>
          ))}
        </div>
        <div className="grid grid-cols-2 gap-3 text-slate-900">
          <input placeholder="Nombre" className="bg-slate-50 border-none p-3 rounded-xl text-xs" value={name} onChange={e => setName(e.target.value)} />
          <button onClick={() => { if(name && text) { const n: NoteItem[] = [{id:Date.now(), name, text, category:cat, date:new Date().toLocaleDateString()}, ...notes]; save(n); setText(''); } }} className="bg-slate-900 text-white rounded-xl font-bold text-xs">Publicar</button>
        </div>
        <textarea placeholder="Mensaje..." className="w-full bg-slate-50 border-none p-4 rounded-xl text-xs h-24 text-slate-900" value={text} onChange={e => setText(e.target.value)} />
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
        {notes.map(n => (
          <div key={n.id} className="bg-white p-5 rounded-3xl border border-slate-50 shadow-sm relative group">
            <button onClick={() => save(notes.filter(x => x.id !== n.id))} className="absolute top-4 right-4 text-slate-200 hover:text-red-400"><X size={14} /></button>
            <span className={`px-2 py-0.5 rounded-full text-[7px] font-black uppercase mb-2 inline-block ${n.category === 'llevar' ? 'bg-blue-100 text-blue-600' : n.category === 'comprar' ? 'bg-emerald-100 text-emerald-600' : 'bg-amber-100 text-amber-600'}`}>{n.category}</span>
            <p className="text-[10px] font-black text-slate-800 uppercase block">{n.name}</p>
            <p className="text-slate-500 text-xs mt-1">{n.text}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

// --- GEAR CHECKLIST ---
export const GearChecklist = () => {
  const initial = [
    { id: 1, name: 'Náutica', items: ['4 Packrafts', '3 Paddle Surf', '3 Infladores'] },
    { id: 2, name: 'Logística', items: ['Generador', '15 Sillas', 'Gacebo', 'Walkies'] },
    { id: 3, name: 'Crucial', items: ['Parlante Grande', 'Alcohol', 'Hielo'] }
  ];
  const [categories, setCategories] = useState<GearCategory[]>([]);
  const [checked, setChecked] = useState<string[]>([]);
  const [loading, setLoading] = useState(true);
  const [newItem, setNewItem] = useState<{[key: number]: string}>({});

  useEffect(() => {
    fetch(`/api/db?t=${Date.now()}`).then(res => res.json()).then(data => {
      setCategories(data.gear && data.gear.length > 0 ? data.gear : initial);
      setChecked(data.checked || []);
      setLoading(false);
    });
  }, []);

  const save = async (newCat: GearCategory[], newCheck: string[]) => {
    setCategories(newCat);
    setChecked(newCheck);
    await Promise.all([
      fetch('/api/db', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ type: 'gear', data: newCat }) }),
      fetch('/api/db', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ type: 'checked', data: newCheck }) })
    ]);
  };

  if (loading) return <Skeleton h="h-60" />;

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-slate-900">
      {categories.map((cat) => (
        <div key={cat.id} className="bg-white p-6 rounded-[2.5rem] border border-slate-50 shadow-sm flex flex-col h-full">
          <h3 className="text-slate-800 font-black uppercase text-[10px] tracking-widest mb-4">{cat.name}</h3>
          <div className="space-y-2 flex-1 mb-6">
            {cat.items.map((item) => (
              <div key={item} className="flex items-center justify-between group">
                <button onClick={() => save(categories, checked.includes(item) ? checked.filter(x => x !== item) : [...checked, item])} className="flex items-center gap-3 flex-1 text-left">
                  {checked.includes(item) ? <CheckCircle2 size={16} className="text-emerald-500" /> : <Circle size={16} className="text-slate-200" />}
                  <span className={`text-[11px] ${checked.includes(item) ? 'text-slate-300 line-through' : 'text-slate-700 font-medium'}`}>{item}</span>
                </button>
                <button onClick={() => save(categories.map(c => c.id === cat.id ? {...c, items: c.items.filter(i => i !== item)} : c), checked)} className="text-slate-200 hover:text-red-400"><X size={12} /></button>
              </div>
            ))}
          </div>
          <div className="flex gap-2">
            <input placeholder="..." className="flex-1 bg-slate-50 border-none p-2 rounded-xl text-[10px]" value={newItem[cat.id] || ''} onChange={e => setNewItem({...newItem, [cat.id]: e.target.value})} />
            <button onClick={() => { if(newItem[cat.id]) { const n = categories.map(c => c.id === cat.id ? {...c, items: [...c.items, newItem[cat.id]]} : c); save(n, checked); setNewItem({...newItem, [cat.id]: ''}); } }} className="bg-slate-100 p-2 rounded-xl hover:bg-slate-900 hover:text-white transition-all"><Plus size={14} /></button>
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
      <div key={l} className="bg-white p-3 rounded-2xl border border-slate-50 text-center shadow-sm">
        <Droplets size={12} className="text-blue-400 mx-auto mb-1" />
        <h4 className="text-slate-800 font-black text-[9px] uppercase tracking-tight">{l}</h4>
      </div>
    ))}
  </div>
);

export const DiscardedPlaces = () => (
  <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-slate-900">
    {[
      { n: 'Playa Catritre', r: 'Muy familiar.', t: 'San Martín' },
      { n: 'Laguna Negra', r: 'Camping flojo.', t: 'Bariloche' }
    ].map(p => (
      <div key={p.n} className="bg-slate-50 p-4 rounded-2xl flex justify-between items-center opacity-60">
        <div><h4 className="text-xs font-bold text-slate-700 line-through">{p.n}</h4><p className="text-[10px] text-slate-400 italic">{p.r}</p></div>
        <MapPin size={14} className="text-slate-200" />
      </div>
    ))}
  </div>
);
