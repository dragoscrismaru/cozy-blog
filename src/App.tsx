import { BrowserRouter, Route, Routes, Link } from 'react-router-dom'

import { AdminDashboard } from './admin/AdminDashboard'
import { AdminLayout } from './admin/AdminLayout'
import { AdminMedia } from './admin/AdminMedia'
import { AdminPageEditor } from './admin/AdminPageEditor'
import { AdminPagesList } from './admin/AdminPagesList'
import { AdminPostEditor } from './admin/AdminPostEditor'
import { AdminPostsList } from './admin/AdminPostsList'
import { AdminSettings } from './admin/AdminSettings'
import { ReadingNook } from './pages/ReadingNook'
import { useCozyStore } from './store'

function AppHeader() {
  const settings = useCozyStore((s) => s.settings)
  return (
    <header className="flex items-center justify-between px-8 py-5 max-w-6xl mx-auto">
      <Link to="/" className="group inline-flex items-center gap-3">
        <span className="inline-flex h-9 w-9 items-center justify-center rounded-full bg-[#D4A574]/20 shadow-[0_10px_30px_rgba(0,0,0,0.12)] backdrop-blur">
          <span className="h-6 w-6 rounded-md bg-[#C4956A] group-hover:rotate-6 transition-transform duration-300" />
        </span>
        <div className="leading-tight">
          <p className="text-xs uppercase tracking-[0.22em] text-[#8B6B4A]">
            {settings.name}
          </p>
          <p className="text-sm text-[#5C4033]">{settings.tagline}</p>
        </div>
      </Link>
          <nav className="flex items-center gap-3 text-xs font-medium text-[#8B6B4A]">
            <span className="px-2 py-1 rounded-full bg-white/70 shadow-sm border border-[#F5E6D3]">
              Public blog
            </span>
            <Link
              to="/admin"
              className="rounded-full border border-[#D4A574]/70 bg-transparent px-3 py-1.5 hover:bg-[#F5E6D3]"
            >
              Admin studio
            </Link>
          </nav>
        </header>
  )
}

function App() {
  return (
    <BrowserRouter>
      <div className="min-h-screen bg-[radial-gradient(circle_at_top,_#F5E6D3_0,_#FAF3E0_35%,_#E8C4B8_100%)] text-[#3E2723]">
        <AppHeader />

        <main className="max-w-6xl mx-auto pb-16 px-4 sm:px-6">
          <Routes>
            <Route path="/" element={<ReadingNook />} />
            <Route
              path="/admin/*"
              element={
                <AdminLayout>
                  <Routes>
                    <Route path="" element={<AdminDashboard />} />
                    <Route path="posts" element={<AdminPostsList />} />
                    <Route path="posts/new" element={<AdminPostEditor />} />
                    <Route path="posts/:id/edit" element={<AdminPostEditor />} />
                    <Route path="pages" element={<AdminPagesList />} />
                    <Route path="pages/new" element={<AdminPageEditor />} />
                    <Route path="pages/:id/edit" element={<AdminPageEditor />} />
                    <Route path="media" element={<AdminMedia />} />
                    <Route path="settings" element={<AdminSettings />} />
                  </Routes>
                </AdminLayout>
              }
            />
          </Routes>
        </main>
      </div>
    </BrowserRouter>
  )
}

export default App
