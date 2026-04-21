'use client';
import { useState, useEffect } from 'react';
import { CheckCircle2, Circle, Ship, Package, AlertTriangle, Edit2, Check, Plus, Trash2, X, Droplets, MapPin, Star, Zap, Mountain, Beer, Tent, ExternalLink, ShoppingCart, Info, Briefcase, Cloud } from 'lucide-react';

// --- TYPES ---
interface ItineraryItem { id: number | string; day: string; title: string; desc: string; color: string; link?: string; }
interface NoteItem { id: number; name: string; text: string; category: 'llevar' | 'aviso' | 'comprar'; date: string; }
interface GearCategory { id: number; name: string; items: string[]; }

const Skeleton = ({ h = "h-40" }) => <div className={`${h} w-full bg-slate-100 animate-pulse rounded-[2rem] border border-slate-50`} />;

// --- THE IMPERDIBLES (ESTÁTICO) ---
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
            <div className="bg-white p-3 rounded-2xl shadow-sm h-fit text-slate-700">{item.icon}</div>
            <div className="text-slate-900 text-left">
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

// --- DYNAMIC ITINERARY ---
export const Itinerary = () => {
  const initial: ItineraryItem[] = [
    { id: 1, day: '27/12', title: 'Salida Rosario', desc: 'Salida -> Parada y noche en Rufino.', color: 'border-blue-500' },
    { id: 2, day: '28/12', title: 'Tramo Rufino -> Falkner', desc: '15 horas de manejo. Llegada al Falkner.', color: 'border-cyan-400' },
    { id: 3, day: '29/12 - 01/01', title: 'Base Lago Falkner (Año Nuevo)', desc: 'Relax, Cerro Falkner y festejos.', color: 'border-emerald-500' },
  ];

  const [items, setItems] = useState<ItineraryItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [editingId, setEditingId] = useState<number | string | null>(null);

  useEffect(() => {
    fetch('/api/db', { cache: 'no-store' }).then(res => res.json()).then(data => {
      setItems(data.itinerary || initial);
      setLoading(false);
    });
  }, []);

  const saveToCloud = async (newData: ItineraryItem[]) => {
    setItems(newData);
    await fetch('/api/db', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ type: 'itinerary', data: newData })
    });
  };

  if (loading) return <Skeleton h="h-60" />;

  return (
    <div className="space-y-4">
      {items.map((item) => (
        <div key={item.id} className={`p-6 bg-white border-l-4 ${item.color} rounded-r-[2.5rem] shadow-sm border-y border-r border-gray-100 flex justify-between items-start`}>
          <div className="flex-1 text-slate-900">
            {editingId === item.id ? (
              <div className="space-y-2 pr-4">
                <input className="w-full bg-slate-50 border p-2 rounded text-[10px] font-black uppercase" value={item.day} onChange={(e) => setItems(items.map(x => x.id === item.id ? {...x, day: e.target.value} : x))} />
                <input className="w-full bg-slate-50 border p-2 rounded text-sm font-bold" value={item.title} onChange={(e) => setItems(items.map(x => x.id === item.id ? {...x, title: e.target.value} : x))} />
                <textarea className="w-full bg-slate-50 border p-2 rounded text-xs" value={item.desc} onChange={(e) => setItems(items.map(x => x.id === item.id ? {...x, desc: e.target.value} : x))} />
              </div>
            ) : (
              <>
                <span className="text-[9px] font-black text-slate-400 uppercase tracking-widest">{item.day}</span>
                <h4 className="text-slate-800 font-bold text-base leading-tight mt-1">{item.title}</h4>
                <p className="text-slate-500 text-xs mt-2 leading-relaxed">{item.desc}</p>
              </>
            )}
          </div>
          <div className="flex gap-2">
            <button onClick={() => { if(editingId === item.id) { saveToCloud(items); setEditingId(null); } else { setEditingId(item.id); } }} className="p-2 text-slate-300 hover:text-glacier">{editingId === item.id ? <Check size={18} className="text-forest" /> : <Edit2 size={14} />}</button>
            <button onClick={() => saveToCloud(items.filter(i => i.id !== item.id))} className="p-2 text-slate-300 hover:text-red-400"><Trash2 size={14} /></button>
          </div>
        </div>
      ))}
      <button onClick={() => { const id = Date.now(); saveToCloud([...items, { id, day: 'Fecha', title: 'Nueva Etapa', desc: '...', color: 'border-slate-200' }]); setEditingId(id); }} className="w-full py-4 border-2 border-dashed border-slate-200 rounded-3xl text-slate-400 text-xs font-bold transition-all hover:border-glacier hover:text-glacier">+ Agregar Etapa</button>
    </div>
  );
};

// --- CREW NOTES ---
export const CrewNotes = () => {
  const [notes, setNotes] = useState<NoteItem[]>([]);
  const [name, setName] = useState('');
  const [text, setText] = useState('');
  const [category, setCategory] = useState<'llevar' | 'aviso' | 'comprar'>('aviso');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('/api/db', { cache: 'no-store' }).then(res => res.json()).then(data => {
      setNotes(data.notes || []);
      setLoading(false);
    });
  }, []);

  const saveNotes = async (newNotes: NoteItem[]) => {
    setNotes(newNotes);
    await fetch('/api/db', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ type: 'notes', data: newNotes })
    });
  };

  if (loading) return <Skeleton h="h-32" />;

  return (
    <div className="space-y-4 text-slate-900">
      <div className="bg-white p-6 rounded-[2.5rem] shadow-sm border border-slate-100 space-y-4">
        <div className="flex gap-2">
          {(['aviso', 'llevar', 'comprar'] as const).map(cat => (
            <button key={cat} onClick={() => setCategory(cat)} className={`px-4 py-2 rounded-full text-[10px] font-black uppercase transition-all ${category === cat ? 'bg-slate-900 text-white' : 'bg-slate-50 text-slate-400 border border-slate-100'}`}>
              {cat === 'llevar' ? '🎒 Llevar' : cat === 'comprar' ? '🛒 Comprar' : '💡 Aviso'}
            </button>
          ))}
        </div>
        <div className="grid grid-cols-2 gap-3">
          <input placeholder="Nombre" className="bg-slate-50 border border-slate-100 p-3 rounded-xl text-xs outline-none" value={name} onChange={e => setName(e.target.value)} />
          <button onClick={() => { if(name && text) { const n = [{ id: Date.now(), name, text, category, date: new Date().toLocaleDateString() }, ...notes]; saveNotes(n); setText(''); } }} className="bg-slate-900 text-white px-4 py-2 rounded-xl font-bold text-xs">Publicar</button>
        </div>
        <textarea placeholder="Mensaje..." className="w-full bg-slate-50 border border-slate-100 p-4 rounded-xl text-xs h-24 outline-none" value={text} onChange={e => setText(e.target.value)} />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
        {notes.map(n => (
          <div key={n.id} className={`bg-white p-5 rounded-3xl border border-slate-100 shadow-sm relative group`}>
            <button onClick={() => saveNotes(notes.filter(x => x.id !== n.id))} className="absolute top-4 right-4 text-slate-300 hover:text-red-400 opacity-0 group-hover:opacity-100 transition-all"><X size={14} /></button>
            <div className="flex items-center gap-2 mb-2">
              <span className={`px-2 py-0.5 rounded-full text-[8px] font-black uppercase tracking-tighter ${n.category === 'llevar' ? 'bg-blue-100 text-blue-600' : n.category === 'comprar' ? 'bg-emerald-100 text-emerald-600' : 'bg-amber-100 text-amber-600'}`}>{n.category}</span>
              <span className="text-[10px] font-black text-slate-800 uppercase">{n.name}</span>
            </div>
            <p className="text-slate-600 text-xs leading-relaxed">{n.text}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

// --- GEAR CHECKLIST ---
export const GearChecklist = () => {
  const initialGear: GearCategory[] = [
    { id: 1, name: 'Náutica', items: ['4 Packrafts dobles', '3 Paddle Surf', '3 Infladores'] },
    { id: 2, name: 'Logística', items: ['Generador', 'Mesa + 15 Sillas', 'Gacebo', 'Walkies', 'Luces'] },
    { id: 3, name: 'Crucial', items: ['Parlante Grande', 'Alcohol', 'Hielo'] }
  ];
  const [categories, setCategories] = useState<GearCategory[]>([]);
  const [checked, setChecked] = useState<string[]>([]);
  const [loading, setLoading] = useState(true);
  const [newItem, setNewItem] = useState<{[key: number]: string}>({});

  useEffect(() => {
    fetch('/api/db', { cache: 'no-store' }).then(res => res.json()).then(data => {
      setCategories(data.gear || initialGear);
      setChecked(data.checked || []);
      setLoading(false);
    });
  }, []);

  const save = (newCat: GearCategory[], newCheck: string[]) => {
    setCategories(newCat);
    setChecked(newCheck);
    syncDB('gear', newCat);
    syncDB('checked', newCheck);
  };

  if (loading) return <Skeleton h="h-60" />;

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-slate-900">
      {categories.map((cat) => (
        <div key={cat.id} className="bg-white p-6 rounded-[2.5rem] border border-slate-100 shadow-sm flex flex-col h-full">
          <h3 className="text-slate-800 font-black uppercase text-[10px] tracking-widest mb-4 flex items-center gap-2">
            {cat.name === 'Náutica' ? <Ship size={14} className="text-blue-400" /> : cat.name === 'Logística' ? <Package size={14} className="text-emerald-500" /> : <AlertTriangle size={14} className="text-orange-500" />}
            {cat.name}
          </h3>
          <div className="space-y-2 flex-1 mb-6">
            {cat.items.map((item) => (
              <div key={item} className="flex items-center justify-between group">
                <button onClick={() => save(categories, checked.includes(item) ? checked.filter(x => x !== item) : [...checked, item])} className="flex items-center gap-3 flex-1 text-left">
                  {checked.includes(item) ? <CheckCircle2 size={16} className="text-emerald-500" /> : <Circle size={16} className="text-slate-200" />}
                  <span className={`text-[11px] ${checked.includes(item) ? 'text-slate-300 line-through' : 'text-slate-700 font-medium'}`}>{item}</span>
                </button>
                <button onClick={() => save(categories.map(c => c.id === cat.id ? {...c, items: c.items.filter(i => i !== item)} : c), checked)} className="text-slate-200 hover:text-red-400 opacity-0 group-hover:opacity-100 transition-all px-1"><X size={12} /></button>
              </div>
            ))}
          </div>
          <div className="flex gap-2 pt-4 border-t border-slate-50">
            <input placeholder="..." className="flex-1 bg-slate-50 border p-2 rounded-xl text-[10px]" value={newItem[cat.id] || ''} onChange={e => setNewItem({...newItem, [cat.id]: e.target.value})} onKeyDown={e => e.key === 'Enter' && newItem[cat.id] && save(categories.map(c => c.id === cat.id ? {...c, items: [...c.items, newItem[cat.id]]} : c), checked)} />
            <button onClick={() => { if(newItem[cat.id]) { save(categories.map(c => c.id === cat.id ? {...c, items: [...c.items, newItem[cat.id]]} : c), checked); setNewItem({...newItem, [cat.id]: ''}); } }} className="bg-slate-100 text-slate-400 p-2 rounded-xl hover:bg-slate-900 hover:text-white transition-all shadow-sm"><Plus size={14} /></button>
          </div>
        </div>
      ))}
    </div>
  );
};

// --- OTROS ---
export const LakeList = () => (
  <div className="grid grid-cols-2 sm:grid-cols-6 gap-3 text-slate-900">
    {['Falkner', 'Lácar', 'Hermoso', 'Traful', 'Correntoso', 'Espejo'].map(l => (
      <div key={l} className="bg-white p-4 rounded-3xl border border-slate-100 shadow-sm text-center group hover:border-glacier transition-all">
        <Droplets size={16} className="text-blue-400 mx-auto mb-2" />
        <h4 className="text-slate-800 font-black text-[9px] uppercase tracking-tight">{l}</h4>
      </div>
    ))}
  </div>
);

export const DiscardedPlaces = () => (
  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-slate-900 text-left">
    {[
      { n: 'Playa Catritre', r: 'Ambiente familiar. Playa Yuco tiene mejor onda.', t: 'San Martín', link: 'https://www.google.com/maps/search/La+Islita/' },
      { n: 'Laguna Negra', r: 'Camping medio pelo. Preferimos Falkner o Hermoso.', t: 'Bariloche', link: 'https://www.google.com/maps/search/Villa+Tacul/' }
    ].map((p, i) => (
      <a key={i} href={p.link} target="_blank" rel="noopener noreferrer" className="bg-slate-50 border border-slate-100 p-5 rounded-2xl group flex justify-between items-center text-left">
        <div><span className="text-[9px] font-bold text-slate-400 uppercase mb-1 block">{p.t}</span><h4 className="text-slate-700 font-bold text-sm line-through opacity-50">{p.n}</h4><p className="text-slate-500 text-[10px] italic leading-tight">"{p.r}"</p></div>
        <MapPin size={14} className="text-slate-200 group-hover:text-slate-400 transition-colors" />
      </a>
    ))}
  </div>
);
