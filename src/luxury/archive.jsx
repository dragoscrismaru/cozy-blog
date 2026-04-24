import React from 'react'
import { useLux } from './shell'

// Luxury — Archive / post list with tag filters + search
export const LuxArchive = () => {
  const { settings, posts, go, rule, subtle } = useLux();
  const [tag, setTag] = React.useState('All');
  const [sort, setSort] = React.useState('Newest');
  const [query, setQuery] = React.useState('');

  const published = posts.filter(p => p.status === 'Published');
  const tags = ['All', ...Array.from(new Set(published.map(p => p.tag)))];
  let filtered = published.filter(p => tag === 'All' || p.tag === tag);
  if (query) filtered = filtered.filter(p => (p.title + p.excerpt + p.author).toLowerCase().includes(query.toLowerCase()));
  if (sort === 'Oldest') filtered = [...filtered].reverse();
  else if (sort === 'A–Z') filtered = [...filtered].sort((a, b) => a.title.localeCompare(b.title));

  return (
    <>
      <section className="text-center px-12 pt-20 pb-12">
        <div className="text-[10px] tracking-[0.5em] uppercase mb-4" style={{ color: settings.accent }}>— The Complete Archive —</div>
        <h1 className="text-6xl mb-4" style={{ fontFamily: `'${settings.headingFont}', serif`, fontWeight: 300, letterSpacing: '-0.01em' }}>Every entry, ever printed</h1>
        <p className="text-lg italic max-w-xl mx-auto" style={{ opacity: 0.7, fontFamily: `'${settings.headingFont}', serif` }}>
          Our correspondents have filed {published.length} entries. Filter by category, search by phrase, or browse in the order they arrived.
        </p>
      </section>

      {/* Filter bar */}
      <div className="max-w-6xl mx-auto px-12 mb-10">
        <div className="flex items-center justify-between flex-wrap gap-6 py-5 border-y" style={{ borderColor: rule }}>
          <div className="flex gap-1 flex-wrap items-center">
            <span className="text-[10px] tracking-[0.3em] uppercase mr-3" style={{ opacity: 0.5 }}>Category</span>
            {tags.map(t => (
              <button key={t} onClick={() => setTag(t)}
                className="px-4 py-1.5 text-[11px] tracking-[0.25em] uppercase border transition"
                style={{ borderColor: tag === t ? settings.accent : rule, color: tag === t ? settings.bg : settings.accent, background: tag === t ? settings.accent : 'transparent' }}>
                {t}
              </button>
            ))}
          </div>
          <div className="flex gap-4 items-center">
            <div className="relative">
              <input value={query} onChange={e => setQuery(e.target.value)} placeholder="search…"
                className="bg-transparent border-b px-2 py-1 text-[13px] italic outline-none w-48"
                style={{ borderColor: rule, color: 'inherit', fontFamily: `'${settings.headingFont}', serif` }} />
            </div>
            <select value={sort} onChange={e => setSort(e.target.value)}
              className="bg-transparent border px-3 py-1.5 text-[11px] tracking-[0.25em] uppercase outline-none"
              style={{ borderColor: rule, color: settings.accent }}>
              <option>Newest</option><option>Oldest</option><option>A–Z</option>
            </select>
          </div>
        </div>
        <div className="text-[10px] tracking-[0.25em] uppercase mt-4" style={{ opacity: 0.5 }}>
          Showing {filtered.length} of {published.length} entries {tag !== 'All' && `in ${tag}`}{query && ` · matching "${query}"`}
        </div>
      </div>

      {/* Entries list */}
      <section className="max-w-6xl mx-auto px-12 pb-20">
        {filtered.length === 0 && (
          <div className="text-center py-20 italic opacity-60" style={{ fontFamily: `'${settings.headingFont}', serif` }}>No entries match this filter.</div>
        )}
        {filtered.map((p, i) => (
          <article key={p.id} onClick={() => go('post', p.id)}
            className="grid grid-cols-[260px_1fr_auto] gap-10 items-center py-10 border-b cursor-pointer group"
            style={{ borderColor: rule }}>
            <div className="overflow-hidden aspect-[4/3]">
              <img src={p.img} className="w-full h-full object-cover group-hover:scale-105 transition duration-700" style={{ filter: 'brightness(0.75) contrast(1.05)' }} alt="" />
            </div>
            <div>
              <div className="flex items-center gap-3 mb-3">
                <span className="text-[10px] tracking-[0.3em] uppercase" style={{ color: settings.accent }}>— {p.tag}</span>
                <span className="text-[10px] tracking-[0.25em] uppercase" style={{ opacity: 0.5 }}>
                  {settings.showDate && p.date}
                  {settings.showReadTime && ` · ${p.read}`}
                </span>
              </div>
              <h3 className="text-[30px] mb-3 leading-tight group-hover:opacity-80 transition" style={{ fontFamily: `'${settings.headingFont}', serif`, fontWeight: 400 }}>{p.title}</h3>
              <p className="text-base italic leading-relaxed max-w-xl" style={{ opacity: 0.75, fontFamily: `'${settings.headingFont}', serif` }}>{p.excerpt}</p>
              {settings.showAuthor && (
                <div className="text-[10px] tracking-[0.25em] uppercase mt-3" style={{ opacity: 0.55 }}>By {p.author}</div>
              )}
            </div>
            <div className="text-4xl opacity-0 group-hover:opacity-100 transition" style={{ color: settings.accent, fontFamily: `'${settings.headingFont}', serif`, fontWeight: 300 }}>→</div>
          </article>
        ))}
      </section>
    </>
  );
};
