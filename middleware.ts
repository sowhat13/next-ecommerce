// middleware.ts

import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
import api from './api';

export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - api (API routes)
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     */
    '/((?!api|_next/static|_next/image|favicon.ico).*)',

  ],
}
const PUBLIC_FILE = /\.(.*)$/
export default async function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl
  if (
    req.nextUrl.pathname.startsWith('/_next') ||
    req.nextUrl.pathname.includes('/api/') ||
    PUBLIC_FILE.test(req.nextUrl.pathname)
  ) {
    return
  }
  console.log('middlewareeeeeeeee')
  console.log(pathname)




}