import NextAuth from 'next-auth'
import EmailProvider from 'next-auth/providers/email'

import { PrismaAdapter } from "@next-auth/prisma-adapter"
import { prisma } from '../database'
// import { createStripeCustomer } from '../stripe'

export const { handlers, auth, } = NextAuth({
  pages: {
    signIn: '/auth',
    // signOut: '/auth',
    error: '/auth',
    // verifyRequest: '/auth',
    // newUser: '/app',
  },
  adapter: PrismaAdapter(prisma),
  providers: [
    EmailProvider({
      server: {
        host: process.env.EMAIL_SERVER_HOST,
        port: process.env.EMAIL_SERVER_PORT,
        auth: {
          user: process.env.EMAIL_SERVER_USER,
          pass: process.env.EMAIL_SERVER_PASSWORD,
        },
      },
    }),
  ],
  callbacks: {
    session: async ({ session, user }) => {
      if (session?.user) {
        session.user.id = user.id;
      }
      return session;
    },
  },
  // events: {
  //   createUser: async (message) => {
  //     await createStripeCustomer({
  //       name: message.user.name as string,
  //       email: message.user.email as string,
  //     })
  //   },
  // },
})
