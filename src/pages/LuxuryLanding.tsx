import type { FC } from 'react'
import { Link } from 'react-router-dom'
import { useCozyStore } from '../store'

const toPlainText = (html: string) => html.replace(/<[^>]*>/g, '').trim()

export const LuxuryLanding: FC = () => {
  const allPosts = useCozyStore((s) => s.posts)
  const settings = useCozyStore((s) => s.settings)
  const posts = allPosts.filter((p) => p.status === 'published')
  const featured = posts[0]
  const rest = posts.slice(1, 7)

  return (
    <div className="space-y-14 pb-16">
      <section className="relative min-h-[55vh] overflow-hidden rounded-3xl border border-white/10">
        <div
          className="absolute inset-0"
          style={{
            background:
              'radial-gradient(circle at 20% 20%, rgba(212,175,55,.2), transparent 50%), linear-gradient(180deg, #0d0b08, #1f140a)',
          }}
        />
        <div className="relative z-10 mx-auto max-w-4xl px-6 py-20 text-center sm:py-28">
          <p className="text-[11px] uppercase tracking-[0.38em] text-amber-300/80">Luxury Journal</p>
          <h1
            className="mt-5 text-4xl font-light sm:text-6xl"
            style={{ fontFamily: settings.headingFont }}
          >
            {settings.name}
          </h1>
          <p className="mx-auto mt-5 max-w-2xl text-base italic text-amber-100/80">
            {settings.tagline}
          </p>
          <div className="mt-8 flex items-center justify-center gap-3">
            <Link
              to="/admin"
              className="rounded-full border border-amber-400/70 px-5 py-2 text-xs uppercase tracking-[0.24em] text-amber-200"
            >
              Open Atelier
            </Link>
          </div>
        </div>
      </section>

      {featured && (
        <section className="grid gap-6 lg:grid-cols-[1.2fr_1fr]">
          <article className="rounded-3xl border border-white/10 bg-black/20 p-8">
            <p className="text-[10px] uppercase tracking-[0.3em] text-amber-300/75">Featured</p>
            <h2 className="mt-3 text-3xl font-light sm:text-5xl" style={{ fontFamily: settings.headingFont }}>
              {featured.title}
            </h2>
            <p className="mt-4 text-base text-white/75">{featured.excerpt}</p>
            <p className="mt-4 text-sm text-amber-200/75">{featured.category || 'Journal'}</p>
          </article>
          <div className="rounded-3xl border border-white/10 bg-black/20 p-6">
            <p className="text-[10px] uppercase tracking-[0.3em] text-amber-300/75">Quick Stats</p>
            <div className="mt-6 grid grid-cols-2 gap-4">
              <div className="rounded-2xl border border-white/10 p-4">
                <p className="text-[10px] uppercase tracking-[0.24em] text-white/50">Published</p>
                <p className="mt-2 text-3xl text-amber-300">{posts.length}</p>
              </div>
              <div className="rounded-2xl border border-white/10 p-4">
                <p className="text-[10px] uppercase tracking-[0.24em] text-white/50">Categories</p>
                <p className="mt-2 text-3xl text-amber-300">
                  {new Set(posts.map((p) => p.category).filter(Boolean)).size}
                </p>
              </div>
            </div>
          </div>
        </section>
      )}

      <section>
        <div className="mb-6 flex items-center justify-between">
          <h3 className="text-2xl font-light sm:text-3xl" style={{ fontFamily: settings.headingFont }}>
            Recent Entries
          </h3>
          <span className="text-[11px] uppercase tracking-[0.3em] text-amber-200/65">Live from admin</span>
        </div>
        <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
          {rest.map((post) => (
            <article key={post.id} className="rounded-2xl border border-white/10 bg-black/25 p-5">
              <p className="text-[10px] uppercase tracking-[0.24em] text-amber-300/70">
                {post.category || 'Journal'}
              </p>
              <h4 className="mt-2 text-xl" style={{ fontFamily: settings.headingFont }}>
                {post.title}
              </h4>
              <p className="mt-3 line-clamp-4 text-sm text-white/70">
                {toPlainText(String(post.content.blocks[0]?.data?.html ?? post.excerpt))}
              </p>
            </article>
          ))}
        </div>
      </section>
    </div>
  )
}

