'use client';
import { useState } from 'react';
import { CheckCircle2, Circle, Ship, Package, AlertTriangle, Edit2, Check, Plus, Trash2, User } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

// --- EDITABLE ITINERARY ---
const initialItinerary = [
  { id: 1, day: '27/12', title: 'Salida Rosario', desc: 'Salida de Rosario -> Parada y noche en Rufino.', color: 'border-blue-500' },
  { id: 2, day: '28/12', title: 'Tramo Rufino -> Falkner', desc: 'Tramo Rufino -> Lago Falkner (15 horas de manejo). Llegada y armado de base.', color: 'border-glacier' },
  { id: 3, day: '29/12 - 01/01', title: 'Base Lago Falkner', desc: 'Estadía fija en Lago Falkner. Actividades: Cerro Falkner, Cascada Ñivinco, Relax.', color: 'border-forest' },
  { id: 4, day: '02/01 - 04/01', title: 'SM de los Andes', desc: 'Playa Yuco, Quila Quina, Meliquina + Pozones de Caleufu.', color: 'border-orange-400' },
  { id: 5, day: '05/01 - 07/01', title: 'Villa Traful & Manso', desc: 'Bosque Sumergido y Río Manso (Camping La Pasarela). Villa Tacul y Cervecería Patagonia.', color: 'border-glacier' },
  { id: 6, day: '08/01', title: 'Devolución', desc: 'Bariloche Centro, limpieza y entrega 10:00am.', color: 'border-stone' },
];

export const Itinerary = () => {
  const [items, setItems] = useState(initialItinerary);
  const [editingId, setEditingId] = useState<number | null>(null);

  const handleUpdate = (id: number, field: string, value: string) => {
    setItems(items.map(item => item.id === id ? { ...item, [field]: value } : item));
  };

  return (
    <div className="space-y-4">
      {items.map((item) => (
        <motion.div 
          key={item.id}
          layout
          className={`relative group p-5 bg-white border-l-4 ${item.color} rounded-r-2xl shadow-sm border-y border-r border-gray-100 transition-all hover:shadow-md`}
        >
          <div className="flex justify-between items-start">
            <div className="flex-1">
              <span className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">{item.day}</span>
              {editingId === item.id ? (
                <div className="mt-2 space-y-2">
                  <input 
                    className="w-full bg-gray-50 border border-gray-200 p-2 rounded-lg text-gray-800 font-bold outline-none focus:border-glacier"
                    value={item.title}
                    onChange={(e) => handleUpdate(item.id, 'title', e.target.value)}
                  />
                  <textarea 
                    className="w-full bg-gray-50 border border-gray-200 p-2 rounded-lg text-gray-600 text-sm outline-none focus:border-glacier"
                    value={item.desc}
                    onChange={(e) => handleUpdate(item.id, 'desc', e.target.value)}
                  />
                </div>
              ) : (
                <>
                  <h4 className="text-gray-800 font-bold text-lg leading-tight mt-1">{item.title}</h4>
                  <p className="text-gray-500 text-sm leading-tight mt-2">{item.desc}</p>
                </>
              )}
            </div>
            
            <button 
              onClick={() => setEditingId(editingId === item.id ? null : item.id)}
              className="p-2 text-gray-300 hover:text-glacier transition-colors"
            >
              {editingId === item.id ? <Check size={18} className="text-forest" /> : <Edit2 size={16} className="opacity-0 group-hover:opacity-100" />}
            </button>
          </div>
        </motion.div>
      ))}
    </div>
  );
};

// --- PROFESSIONAL CREW NOTES ---
export const CrewNotes = () => {
  const [notes, setNotes] = useState<{id: number, author: string, text: string, date: string}[]>([]);
  const [newNote, setNewNote] = useState({ author: '', text: '' });

  const addNote = () => {
    if (newNote.author && newNote.text) {
      setNotes([{ id: Date.now(), ...newNote, date: new Date().toLocaleDateString() }, ...notes]);
      setNewNote({ author: '', text: '' });
    }
  };

  const deleteNote = (id: number) => setNotes(notes.filter(n => n.id !== id));

  return (
    <div className="space-y-6">
      <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <input 
            placeholder="Tu nombre (ej: Cardo)"
            className="bg-gray-50 border border-gray-200 p-3 rounded-xl text-sm outline-none focus:border-glacier text-gray-800"
            value={newNote.author}
            onChange={e => setNewNote({...newNote, author: e.target.value})}
          />
          <button 
            onClick={addNote}
            className="bg-forest text-white px-6 py-3 rounded-xl font-bold text-sm flex items-center justify-center gap-2 hover:bg-forest/90 transition-all"
          >
            <Plus size={18} /> Agregar Nota
          </button>
        </div>
        <textarea 
          placeholder="Escribe algo importante para el grupo..."
          className="w-full bg-gray-50 border border-gray-200 p-4 rounded-xl text-sm outline-none focus:border-glacier text-gray-800 h-24"
          value={newNote.text}
          onChange={e => setNewNote({...newNote, text: e.target.value})}
        />
      </div>

      <div className="grid grid-cols-1 gap-4">
        <AnimatePresence>
          {notes.map(note => (
            <motion.div 
              key={note.id}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="bg-white p-5 rounded-2xl border border-gray-100 shadow-sm relative group"
            >
              <button onClick={() => deleteNote(note.id)} className="absolute top-4 right-4 text-gray-300 hover:text-red-500 opacity-0 group-hover:opacity-100 transition-all">
                <Trash2 size={16} />
              </button>
              <div className="flex items-center gap-2 mb-3">
                <div className="w-8 h-8 bg-glacier/20 rounded-full flex items-center justify-center text-glacier">
                  <User size={14} />
                </div>
                <div>
                  <p className="text-sm font-bold text-gray-800">{note.author}</p>
                  <p className="text-[10px] text-gray-400 uppercase">{note.date}</p>
                </div>
              </div>
              <p className="text-gray-600 text-sm leading-relaxed">{note.text}</p>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>
    </div>
  );
};

// --- CHECKLIST ---
export const GearChecklist = () => {
  const [checked, setChecked] = useState<string[]>([]);
  const toggle = (item: string) => setChecked(prev => prev.includes(item) ? prev.filter(i => i !== item) : [...prev, item]);

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {[
        { category: 'Náutica', items: ['4 Packrafts dobles', '3 Paddle Surf', '3 Infladores eléctricos'], icon: <Ship className="text-glacier" /> },
        { category: 'Logística', items: ['Generador', '15 Sillas', 'Gacebo', 'Walkies', 'Luces'], icon: <Package className="text-forest" /> },
        { category: 'Crucial', items: ['Parlante Grande', 'Alcohol (Distribuidora)', 'Hielo'], icon: <AlertTriangle className="text-orange-500" /> }
      ].map((cat, i) => (
        <div key={i} className="bg-white p-5 rounded-2xl border border-gray-100 shadow-sm">
          <div className="flex items-center gap-2 mb-4">
            {cat.icon}
            <h3 className="text-gray-800 font-bold uppercase text-xs tracking-widest">{cat.category}</h3>
          </div>
          <div className="space-y-2">
            {cat.items.map(item => (
              <button key={item} onClick={() => toggle(item)} className="flex items-center gap-3 w-full text-left group">
                {checked.includes(item) ? <CheckCircle2 size={18} className="text-forest" /> : <Circle size={18} className="text-gray-200 group-hover:text-glacier" />}
                <span className={`text-sm ${checked.includes(item) ? 'text-gray-400 line-through' : 'text-gray-600'}`}>{item}</span>
              </button>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
};
