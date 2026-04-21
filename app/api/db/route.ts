import { createClient } from '@supabase/supabase-js';
import { NextResponse } from 'next/server';

const getSupabase = () => {
  let url = process.env.NEXT_PUBLIC_SUPABASE_URL || 
            process.env.SUPABASE_URL || 
            'https://wfhozfgdrztpanbgwjzc.supabase.co';
              
  const key = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || 
              process.env.SUPABASE_ANON_KEY || 
              process.env.SUPABASE_SERVICE_ROLE_KEY;
  
  if (!key) return null;

  // Limpieza de URL: quitar espacios y barra diagonal al final si existe
  url = url.trim().replace(/\/$/, "");
  
  return createClient(url, key);
};

export const dynamic = 'force-dynamic';
export const revalidate = 0;

export async function GET() {
  try {
    const supabase = getSupabase();
    if (!supabase) return NextResponse.json({ error: 'Faltan variables de entorno.' }, { status: 500 });

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
      headers: { 'Cache-Control': 'no-store' }
    });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    const supabase = getSupabase();
    if (!supabase) return NextResponse.json({ error: 'Faltan variables de entorno.' }, { status: 500 });

    const { type, data } = await request.json();
    
    const { error } = await supabase
      .from('trip_data')
      .upsert({ 
        key: type, 
        data: data, 
        updated_at: new Date().toISOString() 
      });

    if (error) return NextResponse.json({ error: error.message }, { status: 500 });
    return NextResponse.json({ success: true });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
