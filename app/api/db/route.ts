import { kv } from '@vercel/kv';
import { NextResponse } from 'next/server';

export const dynamic = 'force-dynamic';
export const revalidate = 0;

export async function GET() {
  try {
    // Usamos un nombre de tabla único y limpio
    const itinerary = await kv.get('trip_iti_v1');
    const notes = await kv.get('trip_notes_v1');
    const gear = await kv.get('trip_gear_v1');
    const checked = await kv.get('trip_check_v1');

    return NextResponse.json({ 
      itinerary: itinerary || [], 
      notes: notes || [], 
      gear: gear || [], 
      checked: checked || [] 
    }, {
      headers: {
        'Cache-Control': 'no-store, max-age=0, must-revalidate',
        'Pragma': 'no-cache'
      }
    });
  } catch (error) {
    return NextResponse.json({ error: 'READ_FAIL' }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    const { type, data } = await request.json();
    if (type === 'itinerary') await kv.set('trip_iti_v1', data);
    if (type === 'notes') await kv.set('trip_notes_v1', data);
    if (type === 'gear') await kv.set('trip_gear_v1', data);
    if (type === 'checked') await kv.set('trip_check_v1', data);

    return NextResponse.json({ success: true });
  } catch (error) {
    return NextResponse.json({ error: 'WRITE_FAIL' }, { status: 500 });
  }
}
