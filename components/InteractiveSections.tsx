'use client';
import { useState, useEffect } from 'react';
import { CheckCircle2, Circle, Ship, Package, AlertTriangle, Edit2, Check, Plus, Trash2, X, Droplets, MapPin, Star, Zap, Mountain, Beer, Tent, ExternalLink, ShoppingCart, Info, Briefcase } from 'lucide-react';

// --- TYPES ---
interface ItineraryItem { id: number | string; day: string; title: string; desc: string; color: string; link?: string; }
interface NoteItem { id: number; name: string; text: string; category: 'llevar' | 'aviso' | 'comprar'; date: string; }
interface GearCategory { id: number; name: string; items: string[]; }

const Skeleton = ({ h = "h-40" }) => <div className={`${h} w-full bg-slate-100 animate-pulse rounded-[2rem] border border-slate-50`} />;

// --- GLOBAL DB FETCH HELPER ---
const syncDB = async (type: string, data: any) => {
  await fetch('/api/db', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ type, data })
  });
};

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
    <div className="grid grid-cols-2 md:grid-cols-3 gap-4 text-slate-900">
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
  const [items, setItems] = useState<ItineraryItem[]>([]);
  const [editingId, setEditingId] = useState<number | string | null>(null);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    fetch('/api/db').then(res => res.json()).then(data => {
      setItems(data.itinerary || [
        { id: 1, day: '27/12', title: 'Salida Rosario', desc: 'Noche en Rufino.', color: 'border-blue-500' },
        { id: 2, day: '28/12', title: 'Rumbo al Falkner', desc: '15hs de manejo.', color: 'border-cyan-400' },
        { id: 3, day: '29/12 - 01/01', title: 'Año Nuevo', desc: 'Base Falkner.', color: 'border-emerald-500' }
      ]);
      setMounted(true);
    });
  }, []);

  const update = (newItems: ItineraryItem[]) => { setItems(newItems); syncDB('itinerary', newItems); };

  if (!mounted) return <Skeleton h="h-60" />;

  return (
    <div className="space-y-4">
      {items.map((i) => (
        <div key={i.id} className={`p-6 bg-white border-l-4 ${i.color} rounded-r-[2rem] shadow-sm flex justify-between items-start text-slate-800`}>
          <div className="flex-1">
            <span className="text-[9px] font-black text-slate-400 uppercase">{i.day}</span>
            {editingId === i.id ? (
              <div className="mt-2 space-y-2">
                <input 
                  className="w-full bg-slate-50 border p-2 rounded text-[10px] font-black uppercase" 
                  value={i.day} 
                  onChange={(e) => setItems(items.map(x => x.id === i.id ? {...x, day: e.target.value} : x))} 
                  placeholder="Fecha (ej: 27/12)"
                />
                <input 
                  className="w-full bg-slate-50 border p-2 rounded text-sm font-bold" 
                  value={i.title} 
                  onChange={(e) => setItems(items.map(x => x.id === i.id ? {...x, title: e.target.value} : x))} 
                  placeholder="Título del lugar"
                />
                <textarea 
                  className="w-full bg-slate-50 border p-2 rounded text-xs" 
                  value={i.desc} 
                  onChange={(e) => setItems(items.map(x => x.id === i.id ? {...x, desc: e.target.value} : x))} 
                  placeholder="Descripción"
                />
              </div>
            ) : (
              <><h4 className="font-bold text-sm mt-1">{i.title}</h4><p className="text-xs mt-1 text-slate-500">{i.desc}</p></>
            )}
          </div>
          <div className="flex gap-1 ml-2">
            <button onClick={() => setEditingId(editingId === i.id ? null : i.id)} className="p-2 text-slate-300">{editingId === i.id ? <Check size={16} /> : <Edit2 size={14} />}</button>
            <button onClick={() => update(items.filter(x => x.id !== i.id))} className="p-2 text-slate-300 hover:text-red-400"><Trash2 size={14} /></button>
          </div>
        </div>
      ))}
      <button onClick={() => { const id = Date.now(); update([...items, { id, day: 'Fecha', title: 'Nueva Etapa', desc: '...', color: 'border-slate-200' }]); setEditingId(id); }} className="w-full py-4 border-2 border-dashed border-slate-200 rounded-3xl text-slate-400 text-xs font-bold">+ Agregar Etapa</button>
    </div>
  );
};

export const CrewNotes = () => {
  const [notes, setNotes] = useState<NoteItem[]>([]);
  const [name, setName] = useState('');
  const [text, setText] = useState('');
  const [category, setCategory] = useState<'llevar' | 'aviso' | 'comprar'>('aviso');
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    fetch('/api/db').then(res => res.json()).then(data => {
      setNotes(data.notes || []);
      setMounted(true);
    });
  }, []);

  if (!mounted) return <Skeleton h="h-32" />;

  const add = () => {
    if (name && text) {
      const newNotes: NoteItem[] = [{ id: Date.now(), name, text, category, date: new Date().toLocaleDateString() }, ...notes];
      setNotes(newNotes);
      syncDB('notes', newNotes);
      setText('');
    }
  };

  const remove = (id: number) => {
    const newNotes = notes.filter(n => n.id !== id);
    setNotes(newNotes);
    syncDB('notes', newNotes);
  };

  return (
    <div className="space-y-4 text-slate-900">
      <div className="bg-white p-6 rounded-[2.5rem] shadow-sm border border-slate-100 space-y-4">
        <div className="flex flex-wrap gap-2">
          {(['aviso', 'llevar', 'comprar'] as const).map(cat => (
            <button key={cat} onClick={() => setCategory(cat)} className={`px-4 py-2 rounded-full text-[10px] font-black uppercase tracking-widest transition-all border ${category === cat ? 'bg-slate-900 text-white border-slate-900' : 'bg-slate-50 text-slate-400 border-slate-100'}`}>
              {cat === 'llevar' ? '🎒 Llevar' : cat === 'comprar' ? '🛒 Comprar' : '💡 Aviso'}
            </button>
          ))}
        </div>
        <div className="grid grid-cols-2 gap-3 text-slate-900">
          <input placeholder="Nombre" className="bg-slate-50 border border-slate-100 p-3 rounded-xl text-xs" value={name} onChange={e => setName(e.target.value)} />
          <button onClick={add} className="bg-slate-900 text-white px-4 py-2 rounded-xl font-bold text-xs">Publicar</button>
        </div>
        <textarea placeholder="Mensaje..." className="w-full bg-slate-50 border border-slate-100 p-4 rounded-xl text-xs h-24" value={text} onChange={e => setText(e.target.value)} />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
        {notes.map(n => (
          <div key={n.id} className={`bg-white p-5 rounded-3xl border border-slate-100 shadow-sm relative group`}>
            <button onClick={() => remove(n.id)} className="absolute top-4 right-4 text-slate-300 hover:text-red-400"><X size={14} /></button>
            <div className="flex items-center gap-2 mb-2">
              <span className={`px-2 py-0.5 rounded-full text-[8px] font-black uppercase tracking-tighter ${n.category === 'llevar' ? 'bg-blue-100 text-blue-600' : n.category === 'comprar' ? 'bg-emerald-100 text-emerald-600' : 'bg-amber-100 text-amber-600'}`}>
                {n.category}
              </span>
              <span className="text-[10px] font-black text-slate-800 uppercase">{n.name}</span>
            </div>
            <p className="text-slate-600 text-xs leading-relaxed">{n.text}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export const GearChecklist = () => {
  const [categories, setCategories] = useState<GearCategory[]>([]);
  const [checked, setChecked] = useState<string[]>([]);
  const [mounted, setMounted] = useState(false);
  const [newItem, setNewItem] = useState<{[key: number]: string}>({});

  useEffect(() => {
    fetch('/api/db').then(res => res.json()).then(data => {
      setCategories(data.gear || [
        { id: 1, name: 'Náutica', items: ['Packrafts', 'Paddle Surf'] },
        { id: 2, name: 'Logística', items: ['Generador', 'Mesa + 15 Sillas'] },
        { id: 3, name: 'Crucial', items: ['Parlante', 'Alcohol'] }
      ]);
      setChecked(data.checked || []);
      setMounted(true);
    });
  }, []);

  const update = (newCat: GearCategory[], newCheck: string[]) => {
    setCategories(newCat);
    setChecked(newCheck);
    syncDB('gear', newCat);
    syncDB('checked', newCheck);
  };

  if (!mounted) return <Skeleton h="h-60" />;

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-slate-900">
      {categories.map((cat) => (
        <div key={cat.id} className="bg-white p-6 rounded-[2.5rem] border border-slate-100 shadow-sm flex flex-col h-full">
          <h3 className="text-slate-800 font-black uppercase text-[10px] tracking-widest mb-4 flex items-center gap-2">
            {cat.name}
          </h3>
          <div className="space-y-2 flex-1 mb-6">
            {cat.items.map((item) => (
              <div key={item} className="flex items-center justify-between group">
                <button onClick={() => update(categories, checked.includes(item) ? checked.filter(x => x !== item) : [...checked, item])} className="flex items-center gap-3 flex-1 text-left">
                  {checked.includes(item) ? <CheckCircle2 size={16} className="text-emerald-500" /> : <Circle size={16} className="text-slate-200" />}
                  <span className={`text-[11px] ${checked.includes(item) ? 'text-slate-300 line-through' : 'text-slate-700 font-medium'}`}>{item}</span>
                </button>
                <button onClick={() => update(categories.map(c => c.id === cat.id ? {...c, items: c.items.filter(i => i !== item)} : c), checked)} className="text-slate-200 hover:text-red-400 px-1"><X size={12} /></button>
              </div>
            ))}
          </div>
          <div className="flex gap-2">
            <input placeholder="..." className="flex-1 bg-slate-50 border p-2 rounded-xl text-[10px]" value={newItem[cat.id] || ''} onChange={e => setNewItem({...newItem, [cat.id]: e.target.value})} />
            <button onClick={() => { if(newItem[cat.id]) update(categories.map(c => c.id === cat.id ? {...c, items: [...c.items, newItem[cat.id]]} : c), checked); setNewItem({...newItem, [cat.id]: ''}); }} className="bg-slate-100 p-2 rounded-xl"><Plus size={14} /></button>
          </div>
        </div>
      ))}
    </div>
  );
};

// ... (LakeList y DiscardedPlaces se mantienen iguales)
export const LakeList = () => (
  <div className="grid grid-cols-3 sm:grid-cols-6 gap-2 text-slate-900">
    {['Falkner', 'Lácar', 'Hermoso', 'Traful', 'Correntoso', 'Espejo'].map(l => (
      <div key={l} className="bg-white p-3 rounded-2xl border border-slate-100 text-center shadow-sm">
        <h4 className="text-slate-800 font-black text-[9px] uppercase">{l}</h4>
      </div>
    ))}
  </div>
);

export const DiscardedPlaces = () => (
  <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-slate-900 text-left">
    {[
      { n: 'Playa Catritre', r: 'Ambiente familiar.', t: 'San Martín' },
      { n: 'Laguna Negra', r: 'Camping medio pelo.', t: 'Bariloche' }
    ].map(p => (
      <div key={p.n} className="bg-slate-50 p-4 rounded-2xl flex justify-between items-center opacity-60">
        <div><h4 className="text-xs font-bold text-slate-700 line-through">{p.n}</h4><p className="text-[10px] text-slate-400 italic">{p.r}</p></div>
        <MapPin size={14} className="text-slate-200" />
      </div>
    ))}
  </div>
);
