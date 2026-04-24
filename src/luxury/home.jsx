import React from 'react'
import { useLux } from './shell'

// Luxury — Home page
export const LuxHome = () => {
  const { settings, posts, go } = useLux();
  const published = posts.filter(p => p.status === 'Published');
  const featured = published.find(p => p.featured) || published[0];
  const rest = published.filter(p => p.id !== featured.id).slice(0, 6);

  const cols = settings.gridCols;
  const gridClass = cols === 1 ? 'grid-cols-1' : cols === 2 ? 'grid-cols-2' : cols === 3 ? 'grid-cols-3' : 'grid-cols-3';
  const gap = `${Math.round(40 * settings.spacingScale)}px`;
  const padY = `${Math.round(80 * settings.spacingScale)}px`;

  const hoverClass = {
    none: '',
    lift: 'hover:-translate-y-2 transition duration-500',
    glow: 'transition duration-500',
    scale: 'hover:scale-[1.03] transition duration-500',
  }[settings.cardHover] || '';

  const cardGlow = settings.cardHover === 'glow' ? { boxShadow: `0 0 0 1px ${settings.accent}, 0 20px 60px ${settings.accent}33` } : {};

  return (
    <>
      <section className="relative h-[620px] overflow-hidden cursor-pointer group" onClick={() => go('post', featured.id)}>
        <img src={featured.img} className="w-full h-full object-cover group-hover:scale-[1.02] transition duration-[1200ms]" style={{ filter: 'brightness(0.5) contrast(1.1)' }} alt="" />
        <div className="absolute inset-0 flex items-end" style={{ background: `linear-gradient(180deg, transparent 35%, ${settings.bg} 100%)` }}>
          <div className="mx-auto px-12 pb-16 text-center" style={{ maxWidth: `min(${settings.maxWidth}px, 900px)` }}>
            <div className="text-[10px] tracking-[0.4em] uppercase mb-4" style={{ color: settings.accent }}>— {featured.tag} · The Feature —</div>
            <h2 className="mb-6 leading-[1.05]" style={{ fontFamily: 'var(--lux-heading-font)', fontWeight: 300, letterSpacing: '-0.01em', color: '#f5ecd4', fontSize: `calc(3.75rem * ${settings.fontScale})`, textTransform: settings.headingUppercase ? 'uppercase' : 'none' }}>{featured.title}</h2>
            <p className="text-xl italic leading-relaxed mb-6 max-w-xl mx-auto" style={{ opacity: 0.85, fontFamily: 'var(--lux-heading-font)', color: '#e8e0cc' }}>{featured.excerpt}</p>
            <div className="text-[11px] tracking-[0.25em] uppercase flex justify-center gap-5" style={{ color: settings.accent, opacity: 0.8 }}>
              {settings.showAuthor && <span>By {featured.author}</span>}
              {settings.showDate && <><span>·</span><span>{featured.date}</span></>}
              {settings.showReadTime && <><span>·</span><span>{featured.read}</span></>}
            </div>
          </div>
        </div>
      </section>

      <section className="px-12 mx-auto" style={{ maxWidth: settings.maxWidth, paddingTop: padY, paddingBottom: padY }}>
        <div className="text-center mb-14">
          <div className="text-[10px] tracking-[0.5em] uppercase" style={{ color: settings.accent }}>— The Journal —</div>
          <h3 className="mt-3" style={{ fontFamily: 'var(--lux-heading-font)', fontWeight: 300, fontStyle: 'italic', fontSize: `calc(2rem * ${settings.fontScale})`, textTransform: settings.headingUppercase ? 'uppercase' : 'none' }}>Selected entries</h3>
        </div>
        <div className={`grid ${gridClass}`} style={{ gap, gridAutoRows: cols === 'masonry' ? '20px' : undefined }}>
          {rest.map((p, i) => (
            <article key={p.id} onClick={() => go('post', p.id)}
              className={`group cursor-pointer scroll-anim-${settings.scrollAnim} ${hoverClass}`}
              style={{ ...cardGlow, animationDelay: `${i * 60}ms`, borderRadius: 'var(--lux-radius)' }}>
              <div className="overflow-hidden mb-5 aspect-[3/4]" style={{ boxShadow: '0 20px 60px rgba(0,0,0,0.5)', borderRadius: 'var(--lux-radius)' }}>
                <img src={p.img} className="w-full h-full object-cover group-hover:scale-105 transition duration-700" style={{ filter: 'brightness(0.75) contrast(1.05)' }} alt="" />
              </div>
              <div className="text-[10px] tracking-[0.3em] uppercase mb-3" style={{ color: settings.accent }}>— {p.tag} —</div>
              <h4 className="mb-3 leading-snug" style={{ fontFamily: 'var(--lux-heading-font)', fontWeight: 400, fontSize: `calc(1.5rem * ${settings.fontScale})`, textTransform: settings.headingUppercase ? 'uppercase' : 'none' }}>{p.title}</h4>
              <p className="text-base italic leading-relaxed mb-4" style={{ opacity: 0.75, fontFamily: 'var(--lux-heading-font)' }}>{p.excerpt}</p>
              <div className="text-[10px] tracking-[0.25em] uppercase" style={{ color: settings.accent, opacity: 0.7 }}>
                {settings.showAuthor && <span>{p.author}</span>}
                {settings.showDate && <span> · {p.date}</span>}
              </div>
            </article>
          ))}
        </div>
      </section>
    </>
  );
};
