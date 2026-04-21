import { createClient } from '@supabase/supabase-js';
import { NextResponse } from 'next/server';

const getSupabase = () => {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL || 'https://wfhozfgdrztpanbgwjzc.supabase.co';
  const key = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
  if (!key) throw new Error('Falta la ANON_KEY en Vercel');
  return createClient(url, key);
};

export const dynamic = 'force-dynamic';

export async function GET() {
  try {
    const supabase = getSupabase();
    const { data, error } = await supabase.from('trip_data').select('*');
    if (error) return NextResponse.json({ error: error.message }, { status: 500 });

    const result = (data || []).reduce((acc: any, item: any) => {
      acc[item.key] = item.data;
      return acc;
    }, {});

    return NextResponse.json({
      itinerary: result.itinerary || [],
      notes: result.notes || [],
      gear: result.gear || [],
      checked: result.checked || []
    });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    const supabase = getSupabase();
    const { type, data } = await request.json();
    
    // UPSERT: Si existe la llave (itinerary, notes, etc) la actualiza, si no la crea.
    const { error } = await supabase
      .from('trip_data')
      .upsert({ 
        key: type, 
        data: data, 
        updated_at: new Date().toISOString() 
      });

    if (error) {
      console.error("Supabase Write Error:", error.message);
      return NextResponse.json({ error: error.message }, { status: 500 });
    }
    
    return NextResponse.json({ success: true });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
