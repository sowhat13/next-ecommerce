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

export default async function middleware(req: NextRequest, res: NextResponse) {
    const { pathname } = req.nextUrl
    const token = req?.cookies?.get('token')?.value
    const reqHeaders = Object.fromEntries(req.headers);
    if(token){
      const options: any = {};
      if (req && req.headers) options.headers = reqHeaders
      // const userRes = await api.request('/user/profile', undefined, options);
      // const user = userRes;
      // console.log(user)
    }

    console.log(pathname)
  }