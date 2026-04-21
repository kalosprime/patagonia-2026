import { kv } from '@vercel/kv';
import { NextResponse } from 'next/server';

export const dynamic = 'force-dynamic';

export async function GET() {
  try {
    const itinerary = await kv.get('banda_v1_iti');
    const notes = await kv.get('banda_v1_notes');
    const gear = await kv.get('banda_v1_gear');
    const checked = await kv.get('banda_v1_check');

    return NextResponse.json({ itinerary, notes, gear, checked });
  } catch (error: any) {
    return NextResponse.json({ error: 'DB_ERROR', message: error.message }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    // Verificar si las variables existen antes de intentar usar KV
    if (!process.env.KV_REST_API_URL || !process.env.KV_REST_API_TOKEN) {
      return NextResponse.json({ 
        error: 'MISSING_ENV_VARS', 
        message: 'Faltan las variables KV en Vercel Settings.' 
      }, { status: 500 });
    }

    const { type, data } = await request.json();
    
    if (type === 'itinerary') await kv.set('banda_v1_iti', data);
    else if (type === 'notes') await kv.set('banda_v1_notes', data);
    else if (type === 'gear') await kv.set('banda_v1_gear', data);
    else if (type === 'checked') await kv.set('banda_v1_check', data);

    return NextResponse.json({ success: true });
  } catch (error: any) {
    return NextResponse.json({ 
      error: 'WRITE_ERROR', 
      message: error.message 
    }, { status: 500 });
  }
}
