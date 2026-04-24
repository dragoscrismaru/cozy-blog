import React from 'react'
import { useLux } from './shell'

// Luxury — About page
export const LuxAbout = () => {
  const { settings, rule, subtle } = useLux();
  const staff = [
    { name: 'Eleonore V. de Rothier', role: 'Editor-in-Chief', bio: 'Thirty years between Paris and Geneva. Keeper of the red pencil.', seed: 'e1' },
    { name: 'H. Cavendish', role: 'Atelier Correspondent', bio: 'Trained at Savile Row. Writes in longhand, still.', seed: 'e2' },
    { name: 'Y. Hasegawa', role: 'Kyoto Bureau', bio: 'Arrives early, listens long, files slowly.', seed: 'e3' },
    { name: 'É. Marchand', role: 'Cellars & Spirits', bio: 'Counts in vintages, not years.', seed: 'e4' },
  ];

  return (
    <>
      <section className="text-center px-12 pt-24 pb-12 max-w-3xl mx-auto">
        <div className="text-[10px] tracking-[0.5em] uppercase mb-4" style={{ color: settings.accent }}>— Our House —</div>
        <h1 className="text-7xl mb-8" style={{ fontFamily: `'${settings.headingFont}', serif`, fontWeight: 300, letterSpacing: '-0.015em' }}>About</h1>
        <p className="text-2xl italic leading-relaxed" style={{ opacity: 0.85, fontFamily: `'${settings.headingFont}', serif` }}>
          A private journal on the finer things — written slowly, printed rarely, and read, we hope, at length.
        </p>
      </section>

      {/* Manifesto */}
      <section className="grid grid-cols-2 gap-16 max-w-6xl mx-auto px-12 py-16 items-center">
        <img src="https://picsum.photos/seed/about-hero/900/1100" className="w-full aspect-[4/5] object-cover" style={{ filter: 'brightness(0.75) contrast(1.05)', boxShadow: '0 30px 80px rgba(0,0,0,0.5)' }} alt="" />
        <div className="text-[18px] leading-[1.9]" style={{ fontFamily: `'${settings.bodyFont}', serif` }}>
          <div className="text-[10px] tracking-[0.4em] uppercase mb-6" style={{ color: settings.accent }}>— Est. 1912 —</div>
          <h2 className="text-4xl mb-8 leading-tight" style={{ fontFamily: `'${settings.headingFont}', serif`, fontWeight: 400 }}>
            We began as a letter, and never quite stopped being one.
          </h2>
          <p className="mb-5">Maison Noir was founded in the winter of 1912 as a single-page dispatch posted from Paris to a list of twenty-three subscribers. The paper is finer now; the list, a little longer. The intent has not changed.</p>
          <p className="mb-5">We write about things that are made slowly — whiskies, watches, houses, meals, garments, gardens — and about the quiet discipline of making them. We do not review. We do not rank. We record.</p>
          <p>Our entries are published when they are ready, and not before.</p>
        </div>
      </section>

      {/* Numbers */}
      <section className="border-y py-16 my-10" style={{ borderColor: rule, background: subtle }}>
        <div className="max-w-5xl mx-auto px-12 grid grid-cols-4 gap-8 text-center">
          {[
            ['114', 'Years in print'],
            ['9,412', 'Private subscribers'],
            ['47', 'Correspondents'],
            ['0', 'Paid advertisements'],
          ].map(([n, l]) => (
            <div key={l}>
              <div className="text-6xl mb-3" style={{ fontFamily: `'${settings.headingFont}', serif`, fontWeight: 300, color: settings.accent }}>{n}</div>
              <div className="text-[10px] tracking-[0.3em] uppercase" style={{ opacity: 0.6 }}>{l}</div>
            </div>
          ))}
        </div>
      </section>

      {/* Staff */}
      <section className="max-w-5xl mx-auto px-12 py-16">
        <div className="text-center mb-14">
          <div className="text-[10px] tracking-[0.5em] uppercase" style={{ color: settings.accent }}>— Correspondents —</div>
          <h3 className="text-4xl mt-3" style={{ fontFamily: `'${settings.headingFont}', serif`, fontWeight: 300, fontStyle: 'italic' }}>Those who file these pages</h3>
        </div>
        <div className="grid grid-cols-4 gap-8">
          {staff.map(s => (
            <div key={s.name} className="text-center">
              <div className="aspect-square overflow-hidden mb-4 rounded-full mx-auto w-36" style={{ boxShadow: `0 0 0 1px ${settings.accent}` }}>
                <img src={`https://picsum.photos/seed/${s.seed}/300/300`} className="w-full h-full object-cover" style={{ filter: 'grayscale(0.4) brightness(0.85)' }} alt="" />
              </div>
              <div className="text-[10px] tracking-[0.3em] uppercase mb-2" style={{ color: settings.accent }}>— {s.role} —</div>
              <div className="text-lg mb-2" style={{ fontFamily: `'${settings.headingFont}', serif` }}>{s.name}</div>
              <p className="text-[13px] italic leading-relaxed" style={{ opacity: 0.7, fontFamily: `'${settings.headingFont}', serif` }}>{s.bio}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Correspond */}
      <section className="max-w-3xl mx-auto px-12 py-20 text-center">
        <div className="border-y py-14" style={{ borderColor: rule }}>
          <div className="text-[10px] tracking-[0.4em] uppercase mb-4" style={{ color: settings.accent }}>— Correspond —</div>
          <h3 className="text-4xl mb-6" style={{ fontFamily: `'${settings.headingFont}', serif`, fontWeight: 300, fontStyle: 'italic' }}>We welcome letters</h3>
          <p className="text-lg italic mb-8 leading-relaxed" style={{ opacity: 0.8, fontFamily: `'${settings.headingFont}', serif` }}>
            Should you wish to propose an entry, dispute a claim, or merely send kind words — we read every line.
          </p>
          <div className="text-[11px] tracking-[0.3em] uppercase" style={{ color: settings.accent }}>editor@maison-noir.co · Rue du Faubourg 7, Paris VIII</div>
        </div>
      </section>
    </>
  );
};
