import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { supabaseServerClient } from './app/utils/supabase';

export async function middleware(req: NextRequest) {
  const supabase = await supabaseServerClient();
  const { data, error } = await supabase.auth.getUser();

  if (error || !data.user) {
    return NextResponse.redirect(new URL('/auth', req.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/', '/employee', '/project']
};
