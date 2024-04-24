import NextAuth from 'next-auth'
import EmailProvider from 'next-auth/providers/nodemailer'

import { PrismaAdapter } from '@auth/prisma-adapter'
import { prisma } from '../database'
// import { createStripeCustomer } from '../stripe'

import { PrismaClient } from '@prisma/client'
import { Adapter } from 'next-auth/adapters'

export function CustomPrismaAdapter(p: PrismaClient): Adapter {
  const origin = PrismaAdapter(p)
  return {
    ...origin,
    deleteSession: async (sessionToken: any) => {
      try {
        console.log('Deleting', { sessionToken })
        return await p.session.delete({ where: { sessionToken } })
      } catch (e) {
        console.error('Failed to delete session', e)
        return null
      }
    },
  } as unknown as Adapter
}

export const {
  handlers: { GET, POST },
  auth,
} = NextAuth({
  pages: {
    signIn: '/auth',
    signOut: '/auth',
    error: '/auth',
    verifyRequest: '/auth',
    newUser: '/app',
  },
  adapter: CustomPrismaAdapter(prisma),
  providers: [
    EmailProvider({
      server: process.env.EMAIL_SERVER,
      from: process.env.EMAIL_FROM,
      maxAge: 15 * 60, // 15 minutes
      generateVerificationToken: () => {
        const random = crypto.getRandomValues(new Uint8Array(8))
        const token = Buffer.from(random).toString('hex').slice(0, 6)

        return token
      },
      sendVerificationRequest(params) {
        const { url } = params
        const { host } = new URL(url)

        const escapedHost = host.replace(/\./g, '&#8203;.')

        console.log(`Sign in to ${host}\n${url}\n\n`)
        console.log(escapedHost)
      },
    }),
  ],
  // events: {
  //   createUser: async (message) => {
  //     await createStripeCustomer({
  //       name: message.user.name as string,
  //       email: message.user.email as string,
  //     })
  //   },
  // },
})
