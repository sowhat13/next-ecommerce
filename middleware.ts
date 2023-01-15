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

export default async function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl
  // const token = req?.cookies?.get('token')?.value
  // const reqHeaders = Object.fromEntries(req.headers);
  // if(token){
  //   const options: any = {};
  //   if (req && req.headers) options.headers = reqHeaders
  //   // const userRes = await api.request('/user/profile', undefined, options);
  //   // const user = userRes;
  //   // console.log(user)
  // }
  console.log('middlewareeeeeeeee')
  console.log(pathname)

  // const locale = req.cookies.get('locale')?.value

  // if (!locale) {
  //   const response = NextResponse.redirect(req.url)
  //   response.cookies.set('locale', 'en')
  //   req.cookies.set('locale', 'en')
  //   console.log('no locale')
    
  //   return response
  // } else {
  //   const response = NextResponse.next()
  //   req.cookies.set('locale', locale)
  //   // res.next().cookie("locale", locale);
  //   req.cookies.set('NEXT_LOCALE', locale)

  //   console.log(locale, 'locale')

  //   return response
  // }


}