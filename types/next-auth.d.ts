import NextAuth from 'next-auth/next'

declare module 'next-auth' {
  interface Session {
    user: {
      id: number
      email: string
      firstName: string
      lastName: string
      accessToken: strin
    }
  }
}