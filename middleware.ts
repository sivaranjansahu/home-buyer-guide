import { createMiddlewareClient } from '@supabase/auth-helpers-nextjs'
import { NextResponse,NextRequest, NextFetchEvent } from 'next/server'
import { Redis } from '@upstash/redis'
import type { Database } from '@/types_db'

// const redis = new Redis({
//   url: 'https://usw1-included-marmot-34003.upstash.io',
//   token: 'AYTTACQgYTUxNzQwMGEtOWYwOS00YWU3LTlkYWEtYWNmOTJkMjQwYzVlMWU3NDU3ZGFjMmZlNGU2YWE3MjllNTY3ZTM0NDcyMmE=',
// })
// const ratelimit = new Ratelimit({
//   redis: redis,
//   limiter: Ratelimit.slidingWindow(5, "10 s"),
// });


export async function middleware(req: NextRequest,event:NextFetchEvent) {
  console.log('middleare hit')
  const res = NextResponse.next()
  const supabase = createMiddlewareClient<Database>({ req, res })
  await supabase.auth.getSession()
  return res
}

export const config = {
  matcher: "/",
};
