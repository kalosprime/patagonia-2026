import { createClient } from '@supabase/supabase-js';
import { NextResponse } from 'next/server';

// Inicialización diferida para evitar errores durante el build de Vercel
const getSupabase = () => {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL || 'https://wfhozfgdrztpanbgwjzc.supabase.co';
  const key = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

  if (!key) {
    throw new Error('NEXT_PUBLIC_SUPABASE_ANON_KEY is missing');
  }

  return createClient(url, key);
};

export const dynamic = 'force-dynamic';

export async function GET() {
  try {
    const supabase = getSupabase();
    const { data, error } = await supabase.from('trip_data').select('*');
    if (error) throw error;

    const result = data.reduce((acc: any, item: any) => {
      acc[item.key] = item.data;
      return acc;
    }, {});

    return NextResponse.json({
      itinerary: result.itinerary || [],
      notes: result.notes || [],
      gear: result.gear || [],
      checked: result.checked || []
    }, { headers: { 'Cache-Control': 'no-store' } });
  } catch (error: any) {
    console.error('Database Error:', error.message);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    const supabase = getSupabase();
    const { type, data } = await request.json();
    if (!data) return NextResponse.json({ error: 'Data empty' }, { status: 400 });

    const { error } = await supabase
      .from('trip_data')
      .upsert({ 
        key: type, 
        data: data, 
        updated_at: new Date().toISOString() 
      }, { onConflict: 'key' });

    if (error) throw error;
    return NextResponse.json({ success: true });
  } catch (error: any) {
    console.error('Database Error:', error.message);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
