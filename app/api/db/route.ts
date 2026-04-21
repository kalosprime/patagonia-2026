import { createClient } from '@supabase/supabase-js';
import { NextResponse } from 'next/server';

const getSupabase = () => {
  // Probamos todos los nombres posibles que Vercel suele poner
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL || 
              process.env.SUPABASE_URL || 
              'https://wfhozfgdrztpanbgwjzc.supabase.co';
              
  const key = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || 
              process.env.SUPABASE_ANON_KEY || 
              process.env.SUPABASE_SERVICE_ROLE_KEY;
  
  if (!key) {
    console.error("CRITICAL: Supabase Key missing in environment");
    return null;
  }
  
  return createClient(url, key);
};

export const dynamic = 'force-dynamic';
export const revalidate = 0;

export async function GET() {
  try {
    const supabase = getSupabase();
    if (!supabase) return NextResponse.json({ error: 'Falta configurar las variables de Supabase en Vercel.' }, { status: 500 });

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
    }, {
      headers: {
        'Cache-Control': 'no-store, max-age=0, must-revalidate',
        'Pragma': 'no-cache'
      }
    });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    const supabase = getSupabase();
    if (!supabase) return NextResponse.json({ error: 'Falta configurar las variables de Supabase en Vercel.' }, { status: 500 });

    const { type, data } = await request.json();
    if (!type || !data) return NextResponse.json({ error: 'Missing type or data' }, { status: 400 });

    const { error } = await supabase
      .from('trip_data')
      .upsert({ 
        key: type, 
        data: data, 
        updated_at: new Date().toISOString() 
      }, { onConflict: 'key' });

    if (error) return NextResponse.json({ error: error.message }, { status: 500 });
    
    return NextResponse.json({ success: true });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
