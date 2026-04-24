import React from 'react'
import { AdvancedAdmin } from './advanced-admin'
import { BgAnim, PatternLayer } from './bg-anim'

// Luxury shared shell — extended: CSS vars, localStorage, background FX, advanced settings.
const LuxuryCtx = React.createContext(null);
export const useLux = () => React.useContext(LuxuryCtx);

const SEED_POSTS = [
  { id: 1, title: 'The Hands That Shape a Single Cask', excerpt: 'In a quiet valley of the Hebrides, three distillers still mark their barrels with chalk and memory.', body: 'There is a mist that rises from the sea at Oban, thick enough to hold a whisper. The distillers rise with it. For four generations, the Ashgrove family has marked each cask with a slip of chalk and the initial of the hand that filled it — an accounting that no ledger could replace.\n\nWhat follows is not a story about whisky. It is a story about time, and the men and women who have agreed, quietly, to keep it.', author: 'Viscount L. Ashgrove', date: 'March 12, 2026', read: '12 min', tag: 'Spirits', status: 'Published', featured: true, img: 'https://picsum.photos/seed/lux1/1600/1000' },
  { id: 2, title: 'A Patek Returns Home', excerpt: 'After sixty-two years in a Swiss vault, a perpetual calendar finds its original owner.', body: 'The reference 2499 had waited. Now it would wait no longer.', author: 'M. de Rothier', date: 'March 08, 2026', read: '9 min', tag: 'Timepieces', status: 'Published', featured: false, img: 'https://picsum.photos/seed/lux2/900/1100' },
  { id: 3, title: 'Silk, Slowly', excerpt: 'Inside a Kyoto atelier where a single kimono takes nine months to finish.', body: 'The loom has not moved faster than a breath for three hundred years.', author: 'Y. Hasegawa', date: 'February 28, 2026', read: '14 min', tag: 'Atelier', status: 'Published', featured: false, img: 'https://picsum.photos/seed/lux3/900/1100' },
  { id: 4, title: 'Dinner at the Edge of the World', excerpt: 'A restaurant with no sign, no menu, and a waiting list measured in years.', body: 'You do not find it. It finds you.', author: 'C. Béranger', date: 'February 20, 2026', read: '8 min', tag: 'Travel', status: 'Published', featured: false, img: 'https://picsum.photos/seed/lux4/900/1100' },
  { id: 5, title: 'The Last Bespoke Shirtmaker on Jermyn Street', excerpt: 'Thirty-two measurements, eleven fittings, and a single garment that will outlast its wearer.', body: 'The shears are older than the king.', author: 'H. Cavendish', date: 'February 14, 2026', read: '10 min', tag: 'Atelier', status: 'Published', featured: false, img: 'https://picsum.photos/seed/lux5/900/1100' },
  { id: 6, title: 'A Cellar Beneath Bordeaux', excerpt: 'Forty thousand bottles. One man. Forty-three years of listening.', body: 'He calls them by name.', author: 'É. Marchand', date: 'February 02, 2026', read: '11 min', tag: 'Spirits', status: 'Published', featured: false, img: 'https://picsum.photos/seed/lux6/900/1100' },
  { id: 7, title: 'The Courier Who Rides By Night', excerpt: 'Between Geneva and Milan, a single rider still carries what cannot be entrusted to the post.', body: 'She is paid in silence.', author: 'V. Moreau', date: 'January 24, 2026', read: '7 min', tag: 'Travel', status: 'Published', featured: false, img: 'https://picsum.photos/seed/lux7/900/1100' },
  { id: 8, title: 'On the Proper Polish of a Cordovan Shell', excerpt: 'A lesson, in seven strokes, from a man who has polished shoes for the House of Windsor.', body: 'Begin with less than you think.', author: 'R. Fairbanks', date: 'January 12, 2026', read: '6 min', tag: 'Atelier', status: 'Draft', featured: false, img: 'https://picsum.photos/seed/lux8/900/1100' },
];

const DEFAULT_SETTINGS = {
  // palette
  primary: '#d4af37', secondary: '#8a6d2e', accent: '#d4af37',
  bg: '#0d0b08', text: '#e8e0cc', link: '#d4af37', border: 'rgba(212,175,55,0.22)',
  dark: true,
  // identity
  name: 'MAISON NOIR', tagline: 'A private journal on the finer things',
  nav: ['Journal', 'Archive', 'About', 'Members'],
  // type
  headingFont: 'Cormorant Garamond', bodyFont: 'Cormorant',
  fontScale: 1, letterSpacing: 0, lineHeight: 1.7, headingUppercase: false,
  // shape / space
  radius: 2, spacingScale: 1,
  // layout
  maxWidth: 1200, sidebar: 'none', gridCols: 3,
  // bg / atmosphere
  bgMode: 'solid', // 'solid' | 'gradient' | 'pattern'
  gradientFrom: '#0d0b08', gradientTo: '#1a1308',
  pattern: 'dots', // 'dots' | 'grid' | 'diagonals' | 'noise'
  bgAnim: 'none', // none | petals | particles | snow | fireflies | bubbles | aurora
  animSpeed: 1, animIntensity: 0.6, reducedMotion: false,
  // effects
  pageTransition: 'fade', // none | fade | slide | blur
  cardHover: 'lift', // none | lift | glow | scale
  scrollAnim: 'fade-in', // none | fade-in | slide-up
  // metadata
  showAuthor: true, showDate: true, showReadTime: true, showTags: false,
  // presets
  activePreset: 'Noir Classique',
  presets: {},
};

const BUILTIN_PRESETS = {
  'Noir Classique': { primary: '#d4af37', accent: '#d4af37', secondary: '#8a6d2e', bg: '#0d0b08', text: '#e8e0cc', link: '#d4af37', border: 'rgba(212,175,55,0.22)', dark: true, bgMode: 'solid', bgAnim: 'none' },
  'Ivoire': { primary: '#8a6d2e', accent: '#b8860b', secondary: '#6b5220', bg: '#faf5ea', text: '#2a2520', link: '#8a6d2e', border: 'rgba(42,37,32,0.15)', dark: false, bgMode: 'solid', bgAnim: 'none' },
  'Velours Bordeaux': { primary: '#b8929f', accent: '#c49a6c', secondary: '#8a4a5a', bg: '#1a0a10', text: '#f3e4d8', link: '#c49a6c', border: 'rgba(196,154,108,0.25)', dark: true, bgMode: 'gradient', gradientFrom: '#1a0a10', gradientTo: '#2a0e18', bgAnim: 'petals' },
  'Nuit de Verre': { primary: '#7dd3fc', accent: '#a5b4fc', secondary: '#475569', bg: '#06080f', text: '#dbeafe', link: '#a5b4fc', border: 'rgba(165,180,252,0.22)', dark: true, bgMode: 'gradient', gradientFrom: '#06080f', gradientTo: '#0f172a', bgAnim: 'fireflies' },
  'Émeraude': { primary: '#b5a642', accent: '#9ec3a6', secondary: '#2f4a3a', bg: '#0a140f', text: '#e8efe3', link: '#9ec3a6', border: 'rgba(158,195,166,0.22)', dark: true, bgMode: 'solid', bgAnim: 'particles' },
};

const STORAGE_KEY = 'maison-noir-settings-v2';

const loadSettings = () => {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return DEFAULT_SETTINGS;
    return { ...DEFAULT_SETTINGS, ...JSON.parse(raw) };
  } catch { return DEFAULT_SETTINGS; }
};

const applyCssVars = (s) => {
  const r = document.documentElement.style;
  r.setProperty('--lux-primary', s.primary);
  r.setProperty('--lux-secondary', s.secondary);
  r.setProperty('--lux-accent', s.accent);
  r.setProperty('--lux-bg', s.bg);
  r.setProperty('--lux-text', s.text);
  r.setProperty('--lux-link', s.link);
  r.setProperty('--lux-border', s.border);
  r.setProperty('--lux-radius', s.radius + 'px');
  r.setProperty('--lux-space', s.spacingScale);
  r.setProperty('--lux-font-scale', s.fontScale);
  r.setProperty('--lux-letter-spacing', s.letterSpacing + 'em');
  r.setProperty('--lux-line-height', s.lineHeight);
  r.setProperty('--lux-heading-font', `'${s.headingFont}', serif`);
  r.setProperty('--lux-body-font', `'${s.bodyFont}', serif`);
  r.setProperty('--lux-max-width', s.maxWidth + 'px');
};

const pageFromLocation = () => {
  const pathname = window.location.pathname
  if (pathname === '/archive') return { name: 'archive', postId: null }
  if (pathname === '/about') return { name: 'about', postId: null }
  if (pathname === '/dashboard') return { name: 'dashboard', postId: null }
  if (pathname.startsWith('/post/')) {
    const id = Number(pathname.replace('/post/', ''))
    return { name: 'post', postId: Number.isNaN(id) ? null : id }
  }
  return { name: 'home', postId: null }
}

export const LuxuryProvider = ({ children }) => {
  const [settings, setSettings] = React.useState(loadSettings);
  const [posts, setPosts] = React.useState(SEED_POSTS);
  const [page, setPage] = React.useState(pageFromLocation);
  React.useEffect(() => {
    const onPopState = () => setPage(pageFromLocation())
    window.addEventListener('popstate', onPopState)
    return () => window.removeEventListener('popstate', onPopState)
  }, [])

  const [adminOpen, setAdminOpen] = React.useState(false);
  const [transitionKey, setTransitionKey] = React.useState(0);

  React.useEffect(() => { applyCssVars(settings); try { localStorage.setItem(STORAGE_KEY, JSON.stringify(settings)); } catch {} }, [settings]);

  const update = (k, v) => setSettings(s => ({ ...s, [k]: v }));
  const updateMany = (obj) => setSettings(s => ({ ...s, ...obj }));
  const reset = () => setSettings(DEFAULT_SETTINGS);
  const savePreset = (name) => {
    const snap = { ...settings };
    delete snap.presets; delete snap.activePreset;
    setSettings(s => ({ ...s, activePreset: name, presets: { ...s.presets, [name]: snap } }));
  };
  const loadPreset = (name) => {
    const p = BUILTIN_PRESETS[name] || settings.presets?.[name];
    if (p) setSettings(s => ({ ...s, ...p, activePreset: name }));
  };
  const deletePreset = (name) => setSettings(s => { const { [name]: _, ...rest } = s.presets || {}; return { ...s, presets: rest }; });
  const exportJson = () => {
    const blob = new Blob([JSON.stringify(settings, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a'); a.href = url; a.download = 'maison-noir-theme.json'; a.click();
    URL.revokeObjectURL(url);
  };
  const importJson = (text) => {
    try { const parsed = JSON.parse(text); setSettings(s => ({ ...s, ...parsed })); return true; } catch { return false; }
  };

  const savePost = (p) => setPosts(ps => p.id ? ps.map(x => x.id === p.id ? p : x) : [...ps, { ...p, id: Date.now() }]);
  const deletePost = (id) => setPosts(ps => ps.filter(p => p.id !== id));
  const go = (name, postId = null) => {
    let nextPath = '/'
    if (name === 'archive') nextPath = '/archive'
    else if (name === 'about') nextPath = '/about'
    else if (name === 'dashboard') nextPath = '/dashboard'
    else if (name === 'post' && postId != null) nextPath = `/post/${postId}`
    window.history.pushState({}, '', nextPath)
    setPage({ name, postId })
    setTransitionKey(k => k + 1)
    window.scrollTo?.(0, 0)
  };

  const rule = settings.border;
  const subtle = settings.dark ? `color-mix(in oklab, ${settings.bg} 85%, ${settings.accent} 4%)` : `color-mix(in oklab, ${settings.bg} 92%, ${settings.text} 4%)`;

  return (
    <LuxuryCtx.Provider value={{
      settings, update, updateMany, reset, savePreset, loadPreset, deletePreset, exportJson, importJson,
      posts, savePost, deletePost, page, go, transitionKey,
      adminOpen, setAdminOpen,
      bg: settings.bg, text: settings.text, rule, subtle,
      BUILTIN_PRESETS,
    }}>
      {children}
    </LuxuryCtx.Provider>
  );
};

// Shell with background layer + admin mount
export const LuxShell = ({ children }) => {
  const { settings, adminOpen, setAdminOpen, go, page, transitionKey } = useLux();
  const navItems = [
    { label: 'Journal', name: 'home' },
    { label: 'Archive', name: 'archive' },
    { label: 'About', name: 'about' },
    { label: 'Dashboard', name: 'dashboard' },
  ];

  // Layered background
  let bgStyle = { background: settings.bg };
  if (settings.bgMode === 'gradient') bgStyle = { background: `linear-gradient(140deg, ${settings.gradientFrom}, ${settings.gradientTo})` };
  else if (settings.bgMode === 'pattern') bgStyle = { background: settings.bg };

  const fontStyle = {
    color: settings.text,
    fontFamily: `var(--lux-body-font)`,
    fontSize: `calc(16px * ${settings.fontScale})`,
    letterSpacing: `${settings.letterSpacing}em`,
    lineHeight: settings.lineHeight,
  };

  const transitionClass = {
    none: '',
    fade: 'animate-lux-fade',
    slide: 'animate-lux-slide',
    blur: 'animate-lux-blur',
  }[settings.pageTransition] || '';

  return (
    <div style={{ ...bgStyle, ...fontStyle, transition: 'background 0.6s, color 0.6s' }} className="min-h-full relative">
      {settings.bgMode === 'pattern' && <PatternLayer pattern={settings.pattern} color={settings.accent} />}
      {!settings.reducedMotion && settings.bgAnim !== 'none' && <BgAnim type={settings.bgAnim} speed={settings.animSpeed} intensity={settings.animIntensity} color={settings.accent} />}

      <div className="relative z-10">
        <header className="flex items-center justify-between px-12 py-7 border-b" style={{ borderColor: 'var(--lux-border)' }}>
          <div className="text-[10px] tracking-[0.35em] uppercase" style={{ color: settings.accent, opacity: 0.8 }}>Est. 1912 · Private Circulation</div>
          <button onClick={() => go('home')} className="text-center cursor-pointer">
            <div className="tracking-[0.4em]" style={{ fontFamily: 'var(--lux-heading-font)', fontWeight: 300, color: settings.accent, fontSize: `calc(1.5rem * ${settings.fontScale})`, textTransform: settings.headingUppercase ? 'uppercase' : 'none' }}>{settings.name}</div>
            <div className="h-px w-16 mx-auto my-2" style={{ background: settings.accent, opacity: 0.5 }}></div>
            <div className="text-[11px] italic" style={{ opacity: 0.6, fontFamily: 'var(--lux-heading-font)' }}>{settings.tagline}</div>
          </button>
          <button className="text-[10px] tracking-[0.3em] uppercase px-5 py-2 border hover:bg-black/10 transition" style={{ borderColor: settings.accent, color: settings.accent, borderRadius: `calc(var(--lux-radius) * 1)` }}>Subscribe</button>
        </header>

        <nav className="flex justify-center gap-12 py-5 border-b text-[11px] tracking-[0.3em] uppercase" style={{ borderColor: 'var(--lux-border)' }}>
          {navItems.map((n, i) => (
            <button key={i} onClick={() => go(n.name)} className="hover:opacity-100 transition relative" style={{ color: settings.accent, opacity: page.name === n.name ? 1 : 0.6 }}>
              {n.label}
              {page.name === n.name && <span className="absolute -bottom-2 left-1/2 -translate-x-1/2 w-1 h-1 rounded-full" style={{ background: settings.accent }}></span>}
            </button>
          ))}
        </nav>

        <div key={transitionKey} className={transitionClass}>{children}</div>

        <footer className="border-t px-12 py-10 text-center" style={{ borderColor: 'var(--lux-border)' }}>
          <div className="tracking-[0.4em] mb-3" style={{ fontFamily: 'var(--lux-heading-font)', color: settings.accent, fontWeight: 300, fontSize: `calc(1.5rem * ${settings.fontScale})` }}>{settings.name}</div>
          <div className="text-[10px] tracking-[0.3em] uppercase mb-4" style={{ opacity: 0.5 }}>Rue du Faubourg · Paris · Geneva · Tokyo · New York</div>
          <div className="flex justify-center gap-6 text-[10px] tracking-[0.25em] uppercase" style={{ color: settings.accent, opacity: 0.6 }}>
            <span>Correspondence</span><span>·</span><span>Archive</span><span>·</span><span>Privé</span>
          </div>
        </footer>
      </div>

      <button onClick={() => setAdminOpen(!adminOpen)} className="fixed top-6 right-6 z-50 px-5 py-2 border text-[10px] tracking-[0.3em] uppercase hover:bg-black/20 transition" style={{ borderColor: settings.accent, background: settings.bg, color: settings.accent, borderRadius: 'var(--lux-radius)' }}>
        {adminOpen ? 'Close' : 'Atelier'}
      </button>

      {adminOpen && <AdvancedAdmin />}
    </div>
  );
};
