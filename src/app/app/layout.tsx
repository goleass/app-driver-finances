import { PropsWithChildren } from 'react'
import { MainSidebar } from './_components/main-sidebar'
import { auth } from '@/services/auth'

export default async function Layout({ children }: PropsWithChildren) {
  const session = await auth()

  console.log('session Layout', session)

  if (!session) {
    return
  }

  return (
    <div className="md:grid md:grid-cols-[16rem_1fr]">
      <MainSidebar user={session.user} />
      <main>{children}</main>
    </div>
  )
}
