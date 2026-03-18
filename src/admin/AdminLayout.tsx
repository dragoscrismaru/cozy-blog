import type { FC, ReactNode } from 'react'
import { Link, NavLink } from 'react-router-dom'
import { useCozyStore } from '../store'

interface AdminLayoutProps {
  children: ReactNode
}

const navItems = [
  { to: '/admin', label: 'Dashboard' },
  { to: '/admin/posts', label: 'Posts' },
  { to: '/admin/pages', label: 'Pages' },
  { to: '/admin/media', label: 'Media' },
  { to: '/admin/settings', label: 'Settings' },
]

export const AdminLayout: FC<AdminLayoutProps> = ({ children }) => {
  const settings = useCozyStore((s) => s.settings)
  return (
    <div className="min-h-screen bg-[#F5E6D3] text-[#3E2723] flex">
      <aside className="hidden md:flex w-64 flex-col border-r border-[#E2CFB5] bg-[#FFF9F1]/95 shadow-[0_20px_60px_rgba(92,64,51,0.28)]">
        <Link
          to="/"
          className="flex items-center gap-3 px-6 py-5 border-b border-[#E2CFB5] bg-[radial-gradient(circle_at_top,_#F5E6D3,_#FAF3E0)]"
        >
          <span className="inline-flex h-9 w-9 items-center justify-center rounded-full bg-[#D4A574]/20 shadow-[0_10px_30px_rgba(0,0,0,0.12)]">
            <span className="h-6 w-6 rounded-md bg-[#C4956A]" />
          </span>
          <div className="leading-tight">
            <p className="text-xs uppercase tracking-[0.22em] text-[#8B6B4A]">
              {settings.name}
            </p>
            <p className="text-xs text-[#6F4D3C]">Admin studio</p>
          </div>
        </Link>

        <nav className="flex-1 px-3 py-4 space-y-1 text-sm">
          {navItems.map((item) => (
            <NavLink
              key={item.to}
              to={item.to}
              end={item.to === '/admin'}
              className={({ isActive }) =>
                [
                  'flex items-center gap-2 rounded-2xl px-3 py-2 transition-colors',
                  isActive
                    ? 'bg-[#C4956A] text-[#FFF9F1] shadow-[0_14px_36px_rgba(92,64,51,0.5)]'
                    : 'text-[#6F4D3C] hover:bg-[#F0E0CB]',
                ].join(' ')
              }
            >
              <span className="h-1.5 w-1.5 rounded-full bg-current" />
              <span>{item.label}</span>
            </NavLink>
          ))}
        </nav>

        <div className="px-4 py-4 text-[11px] text-[#8B6B4A] border-t border-[#E2CFB5]">
          <p className="font-medium">Studio tip</p>
          <p className="mt-1">
            Drafts auto-save as you write. Publishing is always a deliberate
            click.
          </p>
        </div>
      </aside>

      <main className="flex-1 flex flex-col">
        <header className="flex items-center justify-between border-b border-[#E2CFB5] bg-[#FFF9F1]/80 px-4 py-3 md:px-6 backdrop-blur">
          <div>
            <p className="text-xs uppercase tracking-[0.24em] text-[#8B6B4A]">
              Studio
            </p>
            <p className="text-sm text-[#5C4033]">Backstage of your cozy blog</p>
          </div>
          <Link
            to="/"
            className="rounded-full border border-[#D4A574]/70 bg-transparent px-3 py-1.5 text-xs font-medium text-[#8B6B4A] hover:bg-[#F5E6D3]"
          >
            View public blog
          </Link>
        </header>

        <div className="flex-1 px-4 py-4 md:px-8 md:py-6">
          <div className="mx-auto w-full max-w-6xl">{children}</div>
        </div>
      </main>
    </div>
  )
}

