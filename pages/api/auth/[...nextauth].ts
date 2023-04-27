import NextAuth, { NextAuthOptions } from 'next-auth'
import GoogleProvider from 'next-auth/providers/google'
import CredentialsProvider from 'next-auth/providers/credentials'

import { SignInForm } from '@/model/user.model'
import { Provider } from 'next-auth/providers'
import { redirect } from 'next/dist/server/api-utils'
import UserAuthenticationService from '@/services/api/UserAuthenticationService'

const providers: Provider[] = [
  CredentialsProvider({
    credentials: {},
    async authorize(credentials) {
      return UserAuthenticationService.signIn(credentials as SignInForm)
    },
  }),
  GoogleProvider({
    clientId: process.env.GOOGLE_CLIENT_ID || '',
    clientSecret: process.env.GOOGLE_CLIENT_SECRET || '',
  }),
]
export const authOptions: NextAuthOptions = {
  session: {
    strategy: 'jwt',
  },
  providers,
  callbacks: {
    async jwt({ token, user }: any) {
      return { ...token, ...user }
    },
    async session({ session, token }: any) {
      session.user = token.data
      return session
    },
  },
  jwt: {
    secret: '1993',
  },
  pages: {
    signIn: '/auth/login',
  },
}
export default NextAuth(authOptions)
