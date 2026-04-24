import React from 'react'
import { useLux } from './shell'

// Luxury — Admin Dashboard: CRUD posts
export const LuxDashboard = () => {
  const { settings, posts, savePost, deletePost, rule, subtle, bg, go } = useLux();
  const [tab, setTab] = React.useState('posts'); // 'posts' | 'edit' | 'new'
  const [editing, setEditing] = React.useState(null);
  const [filter, setFilter] = React.useState('All');

  const published = posts.filter(p => p.status === 'Published').length;
  const drafts = posts.filter(p => p.status === 'Draft').length;

  const openNew = () => {
    setEditing({ title: '', excerpt: '', body: '', author: '', date: new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: '2-digit' }), read: '5 min', tag: 'Atelier', status: 'Draft', featured: false, img: `https://picsum.photos/seed/new${Date.now()}/1200/800` });
    setTab('edit');
  };
  const openEdit = (p) => { setEditing({ ...p }); setTab('edit'); };
  const cancel = () => { setEditing(null); setTab('posts'); };
  const save = () => { savePost(editing); setEditing(null); setTab('posts'); };
  const onDel = (id) => { if (confirm('Remove this entry from the archive?')) deletePost(id); };

  const filtered = filter === 'All' ? posts : posts.filter(p => p.status === filter);

  const input = {
    width: '100%', padding: '12px 14px', background: subtle, color: 'inherit',
    border: `1px solid ${rule}`, fontFamily: `'${settings.bodyFont}', serif`, fontSize: 15, outline: 'none',
  };
  const labelStyle = { display: 'block', fontSize: 10, letterSpacing: '0.3em', textTransform: 'uppercase', marginBottom: 8, color: settings.accent };

  return (
    <>
      <section className="px-12 pt-16 pb-10 max-w-7xl mx-auto">
        <div className="flex items-start justify-between gap-8 mb-14">
          <div className="min-w-0">
            <div className="text-[10px] tracking-[0.4em] uppercase mb-3" style={{ color: settings.accent }}>— Atelier Privé · Dashboard —</div>
            <h1 className="text-6xl leading-[1.05]" style={{ fontFamily: `'${settings.headingFont}', serif`, fontWeight: 300, letterSpacing: '-0.01em' }}>Manage the Journal</h1>
          </div>
          <button onClick={openNew}
            className="shrink-0 whitespace-nowrap px-6 py-3 text-[11px] tracking-[0.2em] uppercase hover:opacity-80 transition mt-2"
            style={{ background: settings.accent, color: settings.bg, fontWeight: 600 }}>+ New Entry</button>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-4 gap-5 mb-10">
          {[
            ['Total entries', posts.length],
            ['Published', published],
            ['Drafts', drafts],
            ['Correspondents', new Set(posts.map(p => p.author)).size],
          ].map(([l, n]) => (
            <div key={l} className="border px-6 py-5" style={{ borderColor: rule, background: subtle }}>
              <div className="text-[10px] tracking-[0.3em] uppercase mb-2" style={{ opacity: 0.6 }}>{l}</div>
              <div className="text-5xl" style={{ fontFamily: `'${settings.headingFont}', serif`, fontWeight: 300, color: settings.accent }}>{n}</div>
            </div>
          ))}
        </div>
      </section>

      {tab === 'posts' && (
        <section className="max-w-7xl mx-auto px-12 pb-20">
          <div className="flex items-center justify-between border-y py-4 mb-4" style={{ borderColor: rule }}>
            <div className="flex gap-1">
              {['All', 'Published', 'Draft'].map(f => (
                <button key={f} onClick={() => setFilter(f)}
                  className="px-4 py-1.5 text-[10px] tracking-[0.3em] uppercase border transition"
                  style={{ borderColor: filter === f ? settings.accent : 'transparent', color: settings.accent, background: filter === f ? `${settings.accent}22` : 'transparent' }}>
                  {f} ({f === 'All' ? posts.length : posts.filter(p => p.status === f).length})
                </button>
              ))}
            </div>
            <div className="text-[10px] tracking-[0.3em] uppercase" style={{ opacity: 0.5 }}>Sorted by most recent</div>
          </div>

          {/* Table */}
          <div className="border" style={{ borderColor: rule }}>
            <div className="grid grid-cols-[80px_1fr_160px_140px_120px_160px] gap-4 px-5 py-3 text-[10px] tracking-[0.3em] uppercase border-b"
              style={{ borderColor: rule, color: settings.accent, background: subtle }}>
              <div></div><div>Title</div><div>Correspondent</div><div>Category</div><div>Status</div><div className="text-right">Actions</div>
            </div>
            {filtered.map((p, i) => (
              <div key={p.id}
                className="grid grid-cols-[80px_1fr_160px_140px_120px_160px] gap-4 px-5 py-4 items-center border-b hover:bg-white/[0.02] transition"
                style={{ borderColor: rule }}>
                <img src={p.img} className="w-14 h-14 object-cover" style={{ filter: 'brightness(0.8)' }} alt="" />
                <div>
                  <div className="text-lg leading-tight mb-1" style={{ fontFamily: `'${settings.headingFont}', serif` }}>{p.title} {p.featured && <span className="ml-2 text-[10px] tracking-[0.2em] uppercase" style={{ color: settings.accent }}>★ Featured</span>}</div>
                  <div className="text-[11px] italic" style={{ opacity: 0.55, fontFamily: `'${settings.headingFont}', serif` }}>{p.excerpt.slice(0, 90)}…</div>
                </div>
                <div className="text-[13px]" style={{ fontFamily: `'${settings.headingFont}', serif` }}>{p.author}</div>
                <div className="text-[10px] tracking-[0.25em] uppercase" style={{ color: settings.accent }}>{p.tag}</div>
                <div>
                  <span className="px-2.5 py-1 text-[9px] tracking-[0.25em] uppercase border"
                    style={{ borderColor: p.status === 'Published' ? settings.accent : rule, color: p.status === 'Published' ? settings.accent : 'inherit', opacity: p.status === 'Published' ? 1 : 0.6 }}>
                    {p.status}
                  </span>
                </div>
                <div className="flex gap-2 justify-end text-[10px] tracking-[0.25em] uppercase">
                  <button onClick={() => go('post', p.id)} className="px-3 py-1.5 border hover:bg-white/5" style={{ borderColor: rule, color: 'inherit' }}>View</button>
                  <button onClick={() => openEdit(p)} className="px-3 py-1.5 border hover:opacity-80" style={{ borderColor: settings.accent, color: settings.accent }}>Edit</button>
                  <button onClick={() => onDel(p.id)} className="px-3 py-1.5 border hover:bg-red-950/40" style={{ borderColor: 'rgba(180,60,60,0.5)', color: '#c66' }}>Delete</button>
                </div>
              </div>
            ))}
            {filtered.length === 0 && (
              <div className="text-center py-16 italic opacity-60" style={{ fontFamily: `'${settings.headingFont}', serif` }}>No entries in this view.</div>
            )}
          </div>
        </section>
      )}

      {tab === 'edit' && editing && (
        <section className="max-w-5xl mx-auto px-12 pb-20">
          <div className="flex items-center justify-between mb-8">
            <h2 className="text-4xl" style={{ fontFamily: `'${settings.headingFont}', serif`, fontWeight: 300, fontStyle: 'italic' }}>
              {editing.id ? 'Editing entry' : 'New entry'}
            </h2>
            <div className="flex gap-3">
              <button onClick={cancel} className="px-5 py-2.5 border text-[10px] tracking-[0.3em] uppercase" style={{ borderColor: rule, color: 'inherit' }}>Cancel</button>
              <button onClick={save} className="px-6 py-2.5 text-[10px] tracking-[0.3em] uppercase font-semibold" style={{ background: settings.accent, color: settings.bg }}>Save entry</button>
            </div>
          </div>

          <div className="grid grid-cols-[1fr_320px] gap-10">
            <div className="space-y-5">
              <div>
                <label style={labelStyle}>Title</label>
                <input style={{ ...input, fontSize: 28, fontFamily: `'${settings.headingFont}', serif`, fontWeight: 300 }} value={editing.title} onChange={e => setEditing({ ...editing, title: e.target.value })} />
              </div>
              <div>
                <label style={labelStyle}>Excerpt</label>
                <textarea rows={2} style={{ ...input, fontStyle: 'italic', fontFamily: `'${settings.headingFont}', serif` }} value={editing.excerpt} onChange={e => setEditing({ ...editing, excerpt: e.target.value })} />
              </div>
              <div>
                <label style={labelStyle}>Body</label>
                <textarea rows={14} style={{ ...input, lineHeight: 1.7 }} value={editing.body} onChange={e => setEditing({ ...editing, body: e.target.value })} />
              </div>
              <div>
                <label style={labelStyle}>Header image URL</label>
                <input style={input} value={editing.img} onChange={e => setEditing({ ...editing, img: e.target.value })} />
              </div>
            </div>

            <aside className="space-y-5">
              <div className="border p-5" style={{ borderColor: rule, background: subtle }}>
                <div className="text-[10px] tracking-[0.3em] uppercase mb-4" style={{ color: settings.accent }}>— Preview —</div>
                <div className="aspect-[4/3] overflow-hidden mb-4">
                  <img src={editing.img} className="w-full h-full object-cover" style={{ filter: 'brightness(0.8)' }} alt="" />
                </div>
                <div className="text-[9px] tracking-[0.3em] uppercase mb-1" style={{ color: settings.accent }}>— {editing.tag} —</div>
                <div className="text-lg leading-tight mb-2" style={{ fontFamily: `'${settings.headingFont}', serif` }}>{editing.title || 'Untitled entry'}</div>
                <div className="text-xs italic opacity-70" style={{ fontFamily: `'${settings.headingFont}', serif` }}>{editing.excerpt || 'Your excerpt will appear here.'}</div>
              </div>

              <div>
                <label style={labelStyle}>Status</label>
                <div className="flex gap-2">
                  {['Draft', 'Published'].map(s => (
                    <button key={s} onClick={() => setEditing({ ...editing, status: s })}
                      className="flex-1 px-3 py-2 text-[10px] tracking-[0.3em] uppercase border transition"
                      style={{ borderColor: editing.status === s ? settings.accent : rule, background: editing.status === s ? settings.accent : 'transparent', color: editing.status === s ? settings.bg : 'inherit' }}>
                      {s}
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <label style={labelStyle}>Category</label>
                <select style={input} value={editing.tag} onChange={e => setEditing({ ...editing, tag: e.target.value })}>
                  {['Spirits', 'Timepieces', 'Atelier', 'Travel', 'Correspondence'].map(t => <option key={t}>{t}</option>)}
                </select>
              </div>

              <div>
                <label style={labelStyle}>Correspondent</label>
                <input style={input} value={editing.author} onChange={e => setEditing({ ...editing, author: e.target.value })} />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label style={labelStyle}>Date</label>
                  <input style={input} value={editing.date} onChange={e => setEditing({ ...editing, date: e.target.value })} />
                </div>
                <div>
                  <label style={labelStyle}>Read time</label>
                  <input style={input} value={editing.read} onChange={e => setEditing({ ...editing, read: e.target.value })} />
                </div>
              </div>

              <label className="flex items-center gap-3 text-[11px] tracking-[0.25em] uppercase cursor-pointer pt-2 border-t" style={{ borderColor: rule, paddingTop: 16 }}>
                <input type="checkbox" checked={editing.featured} onChange={e => setEditing({ ...editing, featured: e.target.checked })} />
                <span>Mark as featured (home hero)</span>
              </label>

              {editing.id && (
                <button onClick={() => { onDel(editing.id); cancel(); }}
                  className="w-full px-4 py-2.5 border text-[10px] tracking-[0.3em] uppercase"
                  style={{ borderColor: 'rgba(180,60,60,0.5)', color: '#c66' }}>
                  Delete this entry
                </button>
              )}
            </aside>
          </div>
        </section>
      )}
    </>
  );
};
