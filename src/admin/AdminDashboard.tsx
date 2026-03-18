import type { FC } from 'react'
import { Link } from 'react-router-dom'
import { useCozyStore } from '../store'

export const AdminDashboard: FC = () => {
  const posts = useCozyStore((s) => s.posts)
  const pages = useCozyStore((s) => s.pages)
  const media = useCozyStore((s) => s.media)
  const settings = useCozyStore((s) => s.settings)

  const totalPosts = posts.length
  const drafts = posts.filter((p) => p.status === 'draft').length
  const published = posts.filter((p) => p.status === 'published').length
  const recentDrafts = posts
    .filter((p) => p.status === 'draft')
    .sort(
      (a, b) =>
        new Date(b.updatedAt).getTime() - new Date(a.updatedAt).getTime()
    )
    .slice(0, 3)

  return (
    <div className="space-y-8">
      <div>
        <h1 className="font-serif text-2xl text-[#3E2723]">
          Welcome to {settings.name}
        </h1>
        <p className="mt-1 text-sm text-[#6F4D3C]">{settings.tagline}</p>
      </div>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <Link
          to="/admin/posts/new"
          className="flex items-center justify-between rounded-2xl border border-[#E2CFB5] bg-[#FFF9F1]/90 p-4 shadow-[0_14px_36px_rgba(92,64,51,0.15)] transition hover:-translate-y-0.5"
        >
          <span className="text-sm text-[#5C4033]">New post</span>
          <span className="text-2xl">✎</span>
        </Link>
        <Link
          to="/admin/pages/new"
          className="flex items-center justify-between rounded-2xl border border-[#E2CFB5] bg-[#FFF9F1]/90 p-4 shadow-[0_14px_36px_rgba(92,64,51,0.15)] transition hover:-translate-y-0.5"
        >
          <span className="text-sm text-[#5C4033]">New page</span>
          <span className="text-2xl">📄</span>
        </Link>
        <Link
          to="/admin/media"
          className="flex items-center justify-between rounded-2xl border border-[#E2CFB5] bg-[#FFF9F1]/90 p-4 shadow-[0_14px_36px_rgba(92,64,51,0.15)] transition hover:-translate-y-0.5"
        >
          <span className="text-sm text-[#5C4033]">Media</span>
          <span className="text-2xl">{media.length}</span>
        </Link>
        <Link
          to="/admin/settings"
          className="flex items-center justify-between rounded-2xl border border-[#E2CFB5] bg-[#FFF9F1]/90 p-4 shadow-[0_14px_36px_rgba(92,64,51,0.15)] transition hover:-translate-y-0.5"
        >
          <span className="text-sm text-[#5C4033]">Settings</span>
          <span className="text-2xl">⚙</span>
        </Link>
      </div>

      <section className="grid gap-6 lg:grid-cols-2">
        <div className="rounded-2xl border border-[#E2CFB5] bg-[#FFF9F1]/90 p-4 shadow-[0_14px_36px_rgba(92,64,51,0.15)]">
          <div className="flex items-center justify-between">
            <h2 className="text-sm font-semibold text-[#3E2723]">Posts</h2>
            <Link to="/admin/posts" className="text-xs text-[#8B6B4A] hover:underline">
              View all
            </Link>
          </div>
          <div className="mt-3 flex gap-4 text-sm">
            <span>{totalPosts} total</span>
            <span>{drafts} drafts</span>
            <span>{published} published</span>
          </div>
          {recentDrafts.length > 0 && (
            <ul className="mt-3 space-y-2">
              {recentDrafts.map((post) => (
                <li key={post.id}>
                  <Link
                    to={`/admin/posts/${post.id}/edit`}
                    className="text-xs text-[#8B6B4A] hover:underline"
                  >
                    {post.title}
                  </Link>
                </li>
              ))}
            </ul>
          )}
        </div>

        <div className="rounded-2xl border border-[#E2CFB5] bg-[#FFF9F1]/90 p-4 shadow-[0_14px_36px_rgba(92,64,51,0.15)]">
          <div className="flex items-center justify-between">
            <h2 className="text-sm font-semibold text-[#3E2723]">Pages</h2>
            <Link to="/admin/pages" className="text-xs text-[#8B6B4A] hover:underline">
              View all
            </Link>
          </div>
          <p className="mt-3 text-sm text-[#5C4033]">{pages.length} pages</p>
          {pages.slice(0, 3).map((p) => (
            <Link
              key={p.id}
              to={`/admin/pages/${p.id}/edit`}
              className="mt-2 block text-xs text-[#8B6B4A] hover:underline"
            >
              {p.title}
            </Link>
          ))}
        </div>
      </section>
    </div>
  )
}
