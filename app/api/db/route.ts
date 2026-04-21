import { kv } from '@vercel/kv';
import { NextResponse } from 'next/server';

export const dynamic = 'force-dynamic';

export async function GET() {
  try {
    const itinerary = await kv.get('banda_itinerary');
    const notes = await kv.get('banda_notes');
    const gear = await kv.get('banda_gear');
    const checked = await kv.get('banda_checked');
    return NextResponse.json({ itinerary, notes, gear, checked });
  } catch (error) {
    return NextResponse.json({ error: 'DB_READ_ERROR' }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    const { type, data } = await request.json();
    
    // Validación de seguridad: No guardar si la data es nula o vacía accidentalmente
    if (!data && type !== 'notes') {
      return NextResponse.json({ error: 'DATA_EMPTY' }, { status: 400 });
    }

    if (type === 'itinerary') await kv.set('banda_itinerary', data);
    if (type === 'notes') await kv.set('banda_notes', data);
    if (type === 'gear') await kv.set('banda_gear', data);
    if (type === 'checked') await kv.set('banda_checked', data);

    return NextResponse.json({ success: true, timestamp: Date.now() });
  } catch (error) {
    return NextResponse.json({ error: 'DB_WRITE_ERROR' }, { status: 500 });
  }
}
