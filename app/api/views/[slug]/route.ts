import { NextRequest, NextResponse } from 'next/server';
import { supabaseAdmin } from '@/lib/supabase';

export async function GET(
  req: NextRequest,
  { params }: { params: Promise<{ slug: string }> }
) {
  const { slug } = await params;
  if (!supabaseAdmin) {
    return NextResponse.json({ count: Math.floor(Math.random() * 5000) + 500 });
  }
  const { data } = await supabaseAdmin
    .from('views')
    .select('count')
    .eq('slug', slug)
    .single();
  return NextResponse.json({ count: data?.count ?? 0 });
}

export async function POST(
  req: NextRequest,
  { params }: { params: Promise<{ slug: string }> }
) {
  const { slug } = await params;
  if (!supabaseAdmin) {
    return NextResponse.json({ count: Math.floor(Math.random() * 5000) + 500 });
  }
  const { data } = await supabaseAdmin.rpc('increment_view', { page_slug: slug });
  return NextResponse.json({ count: data ?? 0 });
}
