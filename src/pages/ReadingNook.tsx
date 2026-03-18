import type { FC } from 'react'

export const ReadingNook: FC = () => {
  return (
    <div className="grid gap-10 lg:grid-cols-[1.3fr_minmax(0,1fr)] items-start mt-4">
      <section className="relative rounded-3xl bg-[#FFF9F1]/90 p-8 shadow-[0_30px_80px_rgba(92,64,51,0.25)] border border-[#F0E0CB] overflow-hidden">
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top_left,_rgba(212,168,67,0.15),_transparent_55%),radial-gradient(circle_at_bottom,_rgba(196,149,106,0.09),_transparent_60%)]" />
        <div className="relative flex items-start gap-6">
          <div className="mt-1 hidden h-40 w-32 flex-none rotate-[-2deg] rounded-xl border border-[#E2CFB5] bg-[#F5E6D3]/80 shadow-[0_18px_40px_rgba(0,0,0,0.18)] lg:flex flex-col overflow-hidden">
            <div className="flex items-center justify-between px-3 py-2 text-[11px] font-medium tracking-[0.18em] uppercase text-[#8B6B4A] bg-[#E3CFB4]">
              <span>Reading log</span>
              <span className="text-[9px]">No. 027</span>
            </div>
            <div className="flex flex-1 flex-col justify-between px-3 py-2 text-[11px] text-[#5C4033]/90">
              <p className="font-semibold">Today&apos;s mood</p>
              <p className="italic">Rain on the window, pen on paper.</p>
              <p className="mt-2 text-[10px] leading-relaxed text-[#8B6B4A]">
                A space for slow thoughts and tender stories.
              </p>
            </div>
          </div>

          <div>
            <p className="text-xs tracking-[0.32em] uppercase text-[#8B6B4A]">
              Design 1 · The Reading Nook
            </p>
            <h1 className="mt-3 font-serif text-4xl sm:text-5xl leading-tight text-[#3E2723]">
              Essays, stories &amp; quiet reflections for slow mornings.
            </h1>
            <p className="mt-4 max-w-xl text-sm leading-relaxed text-[#6F4D3C]">
              Welcome to my cozy corner of the internet. Brew something warm,
              curl up in your favourite chair, and stay for a while. Each piece
              is a carefully bound page from my ongoing journal.
            </p>

            <div className="mt-6 flex flex-wrap items-center gap-4">
              <button className="group inline-flex items-center gap-2 rounded-full border border-[#C4956A] bg-[#C4956A] px-5 py-2.5 text-xs font-semibold uppercase tracking-[0.18em] text-[#FFF9F1] shadow-[0_16px_40px_rgba(92,64,51,0.4)] transition-transform hover:-translate-y-0.5">
                Start reading
                <span className="inline-flex h-4 w-4 items-center justify-center rounded-full bg-[#F5E6D3]/20">
                  →
                </span>
              </button>
              <button className="inline-flex items-center gap-2 rounded-full border border-dashed border-[#D4A574]/70 bg-transparent px-4 py-2 text-xs font-medium text-[#8B6B4A]">
                Browse by category
              </button>
            </div>

            <div className="mt-6 flex flex-wrap gap-3 text-[11px] text-[#8B6B4A]">
              <span className="rounded-full border border-[#E4D2BC] bg-[#FFF9F1] px-3 py-1">
                ★ New this week: &quot;Letters to my future self&quot;
              </span>
              <span className="rounded-full border border-[#E4D2BC] bg-[#FAF3E0] px-3 py-1">
                47 stories · 3 categories · 2 min–14 min reads
              </span>
            </div>
          </div>
        </div>
      </section>

      <aside className="space-y-4">
        <div className="rounded-3xl border border-[#E2CFB5] bg-[#FFF9F1]/90 p-5 shadow-[0_20px_50px_rgba(92,64,51,0.2)]">
          <p className="text-xs font-medium tracking-[0.24em] uppercase text-[#8B6B4A]">
            Featured today
          </p>
          <div className="mt-4 space-y-3">
            <article className="group rounded-2xl border border-[#E7D6C0] bg-white/80 px-4 py-3 hover:-translate-y-0.5 hover:shadow-[0_16px_40px_rgba(92,64,51,0.18)] transition-all">
              <p className="text-[11px] uppercase tracking-[0.22em] text-[#B2855D]">
                Long read · 14 min
              </p>
              <h2 className="mt-1 font-serif text-lg text-[#3E2723]">
                The ritual of slow Sundays
              </h2>
              <p className="mt-1 text-xs leading-relaxed text-[#6F4D3C]">
                On learning to move at the pace of a kettle, not a calendar.
              </p>
            </article>

            <article className="group rounded-2xl border border-dashed border-[#E7D6C0] bg-[#FAF3E0]/80 px-4 py-3 hover:bg-[#FFF9F1] transition-colors">
              <p className="text-[11px] uppercase tracking-[0.22em] text-[#8B6B4A]">
                Short note · 3 min
              </p>
              <h3 className="mt-1 font-serif text-base text-[#3E2723]">
                A bookshelf is a time machine
              </h3>
            </article>
          </div>
        </div>

        <div className="grid gap-3 rounded-3xl border border-[#E2CFB5] bg-[#FFF9F1]/90 p-5 shadow-[0_16px_40px_rgba(92,64,51,0.18)]">
          <div className="flex items-center justify-between text-[11px] text-[#8B6B4A]">
            <span className="uppercase tracking-[0.28em]">Shelves</span>
            <span>Browse by mood</span>
          </div>
          <div className="grid grid-cols-2 gap-2 text-xs">
            <button className="flex flex-col items-start gap-1 rounded-2xl border border-[#E7D6C0] bg-white/90 px-3 py-2 text-left hover:bg-[#FAF3E0]">
              <span className="text-[10px] uppercase tracking-[0.22em] text-[#B2855D]">
                Gentle reads
              </span>
              <span className="font-medium text-[#3E2723]">
                Soft essays for quiet evenings
              </span>
            </button>
            <button className="flex flex-col items-start gap-1 rounded-2xl border border-[#E7D6C0] bg-[#F5E6D3]/80 px-3 py-2 text-left hover:bg-[#F0E0CB]">
              <span className="text-[10px] uppercase tracking-[0.22em] text-[#8B6B4A]">
                Field notes
              </span>
              <span className="font-medium text-[#3E2723]">
                Observations from daily life
              </span>
            </button>
            <button className="flex flex-col items-start gap-1 rounded-2xl border border-dashed border-[#E7D6C0] bg-white/80 px-3 py-2 text-left hover:bg-[#FAF3E0]">
              <span className="text-[10px] uppercase tracking-[0.22em] text-[#8B6B4A]">
                Letters
              </span>
              <span className="font-medium text-[#3E2723]">
                Open letters to future selves
              </span>
            </button>
            <button className="flex flex-col items-start gap-1 rounded-2xl border border-dashed border-[#E7D6C0] bg-[#FAF3E0]/80 px-3 py-2 text-left hover:bg-[#FFF9F1]">
              <span className="text-[10px] uppercase tracking-[0.22em] text-[#8B6B4A]">
                Tiny poems
              </span>
              <span className="font-medium text-[#3E2723]">
                Pocket-sized poems &amp; lines
              </span>
            </button>
          </div>
        </div>
      </aside>
    </div>
  )
}

