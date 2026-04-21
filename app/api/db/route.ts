import { kv } from '@vercel/kv';
import { NextResponse } from 'next/server';

export const dynamic = 'force-dynamic';

export async function GET() {
  try {
    console.log("Intentando leer de KV...");
    const [itinerary, notes, gear, checked] = await Promise.all([
      kv.get('banda_v1_iti'),
      kv.get('banda_v1_notes'),
      kv.get('banda_v1_gear'),
      kv.get('banda_v1_check')
    ]);

    return NextResponse.json({ 
      itinerary: itinerary || [], 
      notes: notes || [], 
      gear: gear || [], 
      checked: checked || [] 
    });
  } catch (error: any) {
    console.error('Error en GET KV:', error.message);
    return NextResponse.json({ error: 'READ_FAIL', details: error.message }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    const { type, data } = await request.json();
    console.log(`Guardando ${type} en KV...`);
    
    if (type === 'itinerary') await kv.set('banda_v1_iti', data);
    if (type === 'notes') await kv.set('banda_v1_notes', data);
    if (type === 'gear') await kv.set('banda_v1_gear', data);
    if (type === 'checked') await kv.set('banda_v1_check', data);

    return NextResponse.json({ success: true });
  } catch (error: any) {
    console.error('Error en POST KV:', error.message);
    return NextResponse.json({ error: 'WRITE_FAIL', details: error.message }, { status: 500 });
  }
}
