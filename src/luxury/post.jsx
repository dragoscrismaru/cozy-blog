import React from 'react'
import { useLux } from './shell'

// Luxury — Single post page
export const LuxPost = () => {
  const { settings, posts, page, go, rule, subtle } = useLux();
  const post = posts.find(p => p.id === page.postId) || posts[0];
  const related = posts.filter(p => p.id !== post.id && p.tag === post.tag && p.status === 'Published').slice(0, 3);
  if (related.length < 3) related.push(...posts.filter(p => p.id !== post.id && p.status === 'Published' && !related.includes(p)).slice(0, 3 - related.length));

  return (
    <>
      {/* Crumb */}
      <div className="px-12 pt-10 max-w-4xl mx-auto text-[10px] tracking-[0.3em] uppercase" style={{ color: settings.accent, opacity: 0.7 }}>
        <button onClick={() => go('home')} className="hover:opacity-100">Journal</button>
        <span className="mx-3">/</span>
        <button onClick={() => go('archive')} className="hover:opacity-100">{post.tag}</button>
      </div>

      {/* Title */}
      <header className="max-w-3xl mx-auto px-12 pt-10 pb-14 text-center">
        <div className="text-[10px] tracking-[0.4em] uppercase mb-6" style={{ color: settings.accent }}>— {post.tag} —</div>
        <h1 className="text-[64px] leading-[1.03] mb-7" style={{ fontFamily: `'${settings.headingFont}', serif`, fontWeight: 300, letterSpacing: '-0.01em' }}>{post.title}</h1>
        <p className="text-xl italic leading-relaxed mb-8" style={{ opacity: 0.8, fontFamily: `'${settings.headingFont}', serif` }}>{post.excerpt}</p>
        <div className="text-[11px] tracking-[0.25em] uppercase flex justify-center gap-5" style={{ color: settings.accent, opacity: 0.8 }}>
          {settings.showAuthor && <span>By {post.author}</span>}
          {settings.showDate && <><span>·</span><span>{post.date}</span></>}
          {settings.showReadTime && <><span>·</span><span>{post.read}</span></>}
        </div>
      </header>

      {/* Hero image */}
      <figure className="max-w-5xl mx-auto px-12 mb-14">
        <img src={post.img} className="w-full h-[520px] object-cover" style={{ filter: 'brightness(0.85) contrast(1.05)', boxShadow: '0 30px 80px rgba(0,0,0,0.5)' }} alt="" />
        <figcaption className="text-[10px] tracking-[0.3em] uppercase mt-4 text-center" style={{ opacity: 0.5 }}>Photograph — Reserved for our correspondents</figcaption>
      </figure>

      {/* Body */}
      <article className="max-w-2xl mx-auto px-12 pb-20 text-[19px] leading-[1.85]" style={{ fontFamily: `'${settings.bodyFont}', serif` }}>
        <p className="first-letter:text-[72px] first-letter:float-left first-letter:mr-3 first-letter:leading-[0.85] first-letter:font-light" style={{ color: 'inherit' }}>{post.body.split('\n\n')[0]}</p>
        <div className="flex justify-center my-10 text-2xl" style={{ color: settings.accent, letterSpacing: '1em' }}>· · ·</div>
        {post.body.split('\n\n').slice(1).map((para, i) => <p key={i} className="mb-6">{para}</p>)}
        <p className="mb-6">It is tempting, in a world rehearsing speed, to mistake slowness for idleness. The men and women whose work fills these pages would remind us otherwise. What they do is not slow — it is exact. And exactness, like grief, takes the time it takes.</p>
        <p className="mb-6">We leave them now, as we found them: at the edge of their craft, unhurried, and entirely unafraid of the dark.</p>

        <div className="my-14 px-10 py-10 border-y text-center" style={{ borderColor: rule }}>
          <div className="text-[28px] italic leading-snug" style={{ fontFamily: `'${settings.headingFont}', serif`, color: settings.accent }}>"Quality is remembered long after the price is forgotten."</div>
          <div className="text-[10px] tracking-[0.3em] uppercase mt-4" style={{ opacity: 0.5 }}>— Sir H. Royce</div>
        </div>

        <p className="mb-6">This entry was filed from the road. Subsequent correspondence may appear in a later volume; our readers will be the first to know.</p>
      </article>

      {/* Author bio */}
      <section className="max-w-3xl mx-auto px-12 pb-20">
        <div className="border-t border-b py-10 grid grid-cols-[auto_1fr] gap-8 items-center" style={{ borderColor: rule }}>
          <div className="w-24 h-24 rounded-full overflow-hidden" style={{ boxShadow: `0 0 0 1px ${settings.accent}, 0 0 0 4px ${subtle}` }}>
            <img src={`https://picsum.photos/seed/${post.id}author/200/200`} className="w-full h-full object-cover" style={{ filter: 'grayscale(0.4) brightness(0.9)' }} alt="" />
          </div>
          <div>
            <div className="text-[10px] tracking-[0.35em] uppercase mb-2" style={{ color: settings.accent }}>— Correspondent —</div>
            <div className="text-2xl mb-2" style={{ fontFamily: `'${settings.headingFont}', serif`, fontWeight: 400 }}>{post.author}</div>
            <p className="text-[15px] italic leading-relaxed" style={{ opacity: 0.75, fontFamily: `'${settings.headingFont}', serif` }}>
              Writes for Maison Noir on matters of {post.tag.toLowerCase()}, patience, and the objects we inherit. Based, when the season permits, between Geneva and the Scottish coast.
            </p>
          </div>
        </div>
      </section>

      {/* Related */}
      <section className="px-12 pb-24 max-w-6xl mx-auto">
        <div className="text-center mb-10">
          <div className="text-[10px] tracking-[0.5em] uppercase" style={{ color: settings.accent }}>— You may also read —</div>
        </div>
        <div className="grid grid-cols-3 gap-10">
          {related.map(r => (
            <article key={r.id} onClick={() => go('post', r.id)} className="group cursor-pointer">
              <div className="overflow-hidden mb-5 aspect-[4/5]">
                <img src={r.img} className="w-full h-full object-cover group-hover:scale-105 transition duration-700" style={{ filter: 'brightness(0.75)' }} alt="" />
              </div>
              <div className="text-[10px] tracking-[0.3em] uppercase mb-2" style={{ color: settings.accent }}>— {r.tag} —</div>
              <h4 className="text-xl mb-2 leading-snug" style={{ fontFamily: `'${settings.headingFont}', serif` }}>{r.title}</h4>
              <div className="text-[10px] tracking-[0.25em] uppercase" style={{ color: settings.accent, opacity: 0.7 }}>
                {settings.showAuthor && r.author}{settings.showDate && ` · ${r.date}`}
              </div>
            </article>
          ))}
        </div>
      </section>
    </>
  );
};
