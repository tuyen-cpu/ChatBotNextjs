import { SignJWT, jwtVerify, type JWTPayload } from 'jose';
import { NextRequestWithAuth, withAuth } from 'next-auth/middleware'
import { NextResponse } from 'next/server'
import { verify } from '@/utils/fn'

export default withAuth(
  async function middleware(req: NextRequestWithAuth) {
    console.log('Enter middleware')
    const {pathname} = req.nextUrl
    const { accessToken } = req.nextauth.token?.data as any
    console.log(pathname)
    // if(pathname.startsWith("/auth")){
    //   if (!accessToken) {
    //     console.error('Token không tồn tại')
    //     return null
    //   }
    //   try {
    //     // @ts-ignore
    //     const decodedToken = await verify(accessToken, process.env.JWT_SECRET)
    //     console.log('🚀 ~ file: middleware.ts:16:', decodedToken)
    //     console.log('🚀 ~ file: middleware.ts:17:', req.url)
    //     NextResponse.rewrite("/")
    //   } catch (error) {
    //     console.error('Token không hợp lệ', error)
    //     return null
    //   }
    // }

  },
  {
    callbacks: {
      authorized({ req, token }) {
        console.log('Has Token:', !!token)
        return !!token
      },
    },
  }
)
export const config = { matcher: ['/chatform/:path*'] }
