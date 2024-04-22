'use client'

import {
  DashboardSidebar,
  DashboardSidebarHeader,
  DashboardSidebarMain,
  DashboardSidebarNav,
  DashboardSidebarNavMain,
  DashboardSidebarNavLink,
  DashboardSidebarNavHeader,
  DashboardSidebarNavHeaderTitle,
  DashboardSidebarFooter,
} from '@/components/dashboard/sidebar'
import { usePathname } from 'next/navigation'
import {
  HomeIcon,
  MixerVerticalIcon,
  HamburgerMenuIcon,
  Cross2Icon,
} from '@radix-ui/react-icons'
import { UserDropdown } from './user-dropdown'
import { Logo } from '@/components/logo'
import { Session } from 'next-auth'
import { useState } from 'react'

type MainSidebarProps = {
  user: Session['user']
}

export function MainSidebar({ user }: MainSidebarProps) {
  const pathname = usePathname()
  const [state, setState] = useState(false)

  const isActive = (path: string) => {
    return pathname === path
  }

  return (
    <div className="md:flex">
      <div
        className={`${state ? 'hidden' : ''} px-6 h-12 flex items-center justify-between border-b border-border md:hidden`}
      >
        <button
          className="text-gray-700 outline-none rounded-md focus:border-gray-400 focus:border"
          onClick={() => setState(!state)}
        >
          <HamburgerMenuIcon className="w-5 h-5" />
        </button>
        <Logo />
      </div>
      <DashboardSidebar
        className={`${state ? 'flex z-[500] w-screen bg-background fixed' : 'hidden'} h-screen md:w-fit md:flex`}
      >
        <DashboardSidebarHeader className="justify-between md:justify-start">
          <Logo />
          <button className="block md:hidden" onClick={() => setState(!state)}>
            <Cross2Icon />
          </button>
        </DashboardSidebarHeader>
        <DashboardSidebarMain className="flex flex-col flex-grow">
          <DashboardSidebarNav>
            <DashboardSidebarNavMain>
              <DashboardSidebarNavLink href="/app" active={isActive('/app')}>
                <HomeIcon className="w-3 h-3 mr-3" />
                Home
              </DashboardSidebarNavLink>
              <DashboardSidebarNavLink
                href="/app/todos"
                active={isActive('/app/todos')}
              >
                <HomeIcon className="w-3 h-3 mr-3" />
                Tarefas
              </DashboardSidebarNavLink>
              <DashboardSidebarNavLink
                href="/app/settings"
                active={isActive('/app/settings')}
              >
                <MixerVerticalIcon className="w-3 h-3 mr-3" />
                Configurações
              </DashboardSidebarNavLink>
            </DashboardSidebarNavMain>
          </DashboardSidebarNav>

          <DashboardSidebarNav className="mt-auto">
            <DashboardSidebarNavHeader>
              <DashboardSidebarNavHeaderTitle>
                Links extras
              </DashboardSidebarNavHeaderTitle>
            </DashboardSidebarNavHeader>
            <DashboardSidebarNavMain>
              <DashboardSidebarNavLink href="/">
                Precisa de ajuda?
              </DashboardSidebarNavLink>
              <DashboardSidebarNavLink href="/">Site</DashboardSidebarNavLink>
            </DashboardSidebarNavMain>
          </DashboardSidebarNav>
        </DashboardSidebarMain>
        <DashboardSidebarFooter>
          <UserDropdown user={user} />
        </DashboardSidebarFooter>
      </DashboardSidebar>
    </div>
  )
}
