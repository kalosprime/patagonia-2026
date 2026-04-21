import { kv } from '@vercel/kv';
import { NextResponse } from 'next/server';

export const dynamic = 'force-dynamic';

export async function GET() {
  try {
    // Verificar conexión
    if (!process.env.KV_REST_API_URL) {
      return NextResponse.json({ error: 'KV_NOT_CONNECTED' }, { status: 500 });
    }

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
    }, {
      headers: { 'Cache-Control': 'no-store' }
    });
  } catch (error) {
    console.error('DB GET Error:', error);
    return NextResponse.json({ error: 'READ_FAIL' }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    const { type, data } = await request.json();
    
    if (type === 'itinerary') await kv.set('banda_v1_iti', data);
    if (type === 'notes') await kv.set('banda_v1_notes', data);
    if (type === 'gear') await kv.set('banda_v1_gear', data);
    if (type === 'checked') await kv.set('banda_v1_check', data);

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('DB POST Error:', error);
    return NextResponse.json({ error: 'WRITE_FAIL' }, { status: 500 });
  }
}
