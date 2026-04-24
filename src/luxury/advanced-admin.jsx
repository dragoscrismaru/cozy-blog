import React from 'react'

const useLux = () => window.useLux()

// AdvancedAdmin — tabbed settings drawer for Maison Noir
export const AdvancedAdmin = () => {
  const { settings, update, updateMany, reset, savePreset, loadPreset, deletePreset, exportJson, importJson, BUILTIN_PRESETS } = useLux();
  const [tab, setTab] = React.useState('theme');
  const [presetName, setPresetName] = React.useState('');

  const TABS = [
    ['theme', 'Theme'],
    ['type', 'Type'],
    ['atmos', 'Atmosphere'],
    ['layout', 'Layout'],
    ['motion', 'Motion'],
    ['content', 'Content'],
    ['io', 'Import / Export'],
  ];

  const accent = settings.accent, rule = 'var(--lux-border)', bg = settings.bg, text = settings.text;
  const subtle = settings.dark ? 'rgba(255,255,255,0.03)' : 'rgba(0,0,0,0.03)';

  const Row = ({ label, hint, children }) => (
    <div style={{ marginBottom: 18 }}>
      <label style={{ display: 'block', fontSize: 10, letterSpacing: '0.3em', textTransform: 'uppercase', marginBottom: 8, color: accent, opacity: 0.9 }}>{label}</label>
      {children}
      {hint && <div style={{ fontSize: 11, fontStyle: 'italic', opacity: 0.55, marginTop: 4 }}>{hint}</div>}
    </div>
  );
  const inp = { width: '100%', padding: '8px 12px', background: subtle, color: text, border: `1px solid ${rule}`, borderRadius: 2, fontFamily: `'Cormorant', serif`, fontSize: 14, outline: 'none' };
  const colorSwatch = (k) => (
    <div className="flex items-center gap-2">
      <input type="color" value={settings[k]?.startsWith('#') ? settings[k] : '#d4af37'} onChange={e => update(k, e.target.value)}
        style={{ width: 40, height: 34, border: `1px solid ${rule}`, background: 'transparent', cursor: 'pointer', borderRadius: 2, padding: 0 }} />
      <input style={{ ...inp, fontFamily: 'monospace', fontSize: 12 }} value={settings[k]} onChange={e => update(k, e.target.value)} />
    </div>
  );

  const Slider = ({ val, onChange, min, max, step = 1, suffix = '' }) => (
    <div className="flex items-center gap-3">
      <input type="range" min={min} max={max} step={step} value={val} onChange={e => onChange(parseFloat(e.target.value))} className="flex-1"
        style={{ accentColor: accent }} />
      <span style={{ fontSize: 12, fontFamily: 'monospace', color: accent, minWidth: 48, textAlign: 'right' }}>{val}{suffix}</span>
    </div>
  );

  const Chips = ({ val, onChange, options }) => (
    <div className="flex gap-1 flex-wrap">
      {options.map(o => {
        const v = typeof o === 'string' ? o : o.value;
        const label = typeof o === 'string' ? o : o.label;
        return (
          <button key={v} onClick={() => onChange(v)}
            className="px-3 py-1.5 text-[10px] tracking-[0.2em] uppercase border transition"
            style={{ borderColor: val === v ? accent : rule, background: val === v ? accent : 'transparent', color: val === v ? bg : text, borderRadius: 2 }}>
            {label}
          </button>
        );
      })}
    </div>
  );

  const Toggle = ({ val, onChange, label }) => (
    <label className="flex items-center gap-3 py-1.5 cursor-pointer" style={{ fontSize: 13 }}>
      <input type="checkbox" checked={val} onChange={e => onChange(e.target.checked)} style={{ accentColor: accent }} />
      <span>{label}</span>
    </label>
  );

  const fileRef = React.useRef();
  const handleImport = (e) => {
    const f = e.target.files?.[0]; if (!f) return;
    const r = new FileReader();
    r.onload = () => { importJson(r.result); };
    r.readAsText(f);
  };

  return (
    <div className="fixed top-0 right-0 bottom-0 z-40 flex flex-col"
      style={{ width: 380, background: bg, color: text, borderLeft: `1px solid ${rule}`, boxShadow: '-20px 0 60px rgba(0,0,0,0.4)', fontFamily: `'Cormorant', serif` }}>
      {/* Header */}
      <div className="px-5 pt-16 pb-4 border-b" style={{ borderColor: rule }}>
        <div className="text-[10px] tracking-[0.4em] uppercase" style={{ color: accent }}>— Atelier Privé —</div>
        <div className="text-3xl mt-1" style={{ fontFamily: `'Cormorant Garamond', serif`, fontWeight: 300, fontStyle: 'italic' }}>Customize</div>
      </div>

      {/* Tab rail */}
      <div className="flex border-b overflow-x-auto" style={{ borderColor: rule }}>
        {TABS.map(([id, label]) => (
          <button key={id} onClick={() => setTab(id)}
            className="px-3 py-3 text-[10px] tracking-[0.25em] uppercase whitespace-nowrap transition"
            style={{
              color: tab === id ? accent : text,
              opacity: tab === id ? 1 : 0.55,
              borderBottom: tab === id ? `1px solid ${accent}` : '1px solid transparent',
              background: tab === id ? subtle : 'transparent',
            }}>{label}</button>
        ))}
      </div>

      {/* Body */}
      <div className="flex-1 overflow-y-auto p-5">
        {tab === 'theme' && (
          <>
            <Row label="Active preset">
              <select style={inp} value={settings.activePreset} onChange={e => loadPreset(e.target.value)}>
                <optgroup label="Built-in">
                  {Object.keys(BUILTIN_PRESETS).map(p => <option key={p}>{p}</option>)}
                </optgroup>
                {Object.keys(settings.presets || {}).length > 0 && (
                  <optgroup label="Saved">
                    {Object.keys(settings.presets).map(p => <option key={p}>{p}</option>)}
                  </optgroup>
                )}
              </select>
              <div className="flex gap-2 mt-2">
                <input placeholder="preset name…" value={presetName} onChange={e => setPresetName(e.target.value)} style={inp} />
                <button onClick={() => { if (presetName.trim()) { savePreset(presetName.trim()); setPresetName(''); } }}
                  className="px-3 py-2 text-[10px] tracking-[0.25em] uppercase whitespace-nowrap"
                  style={{ background: accent, color: bg, borderRadius: 2 }}>Save</button>
              </div>
              {settings.presets?.[settings.activePreset] && (
                <button onClick={() => deletePreset(settings.activePreset)} className="text-[10px] tracking-[0.25em] uppercase mt-2 opacity-60 hover:opacity-100">
                  Delete "{settings.activePreset}"
                </button>
              )}
            </Row>
            <Row label="Primary">{colorSwatch('primary')}</Row>
            <Row label="Secondary">{colorSwatch('secondary')}</Row>
            <Row label="Accent">{colorSwatch('accent')}</Row>
            <Row label="Background">{colorSwatch('bg')}</Row>
            <Row label="Text">{colorSwatch('text')}</Row>
            <Row label="Links">{colorSwatch('link')}</Row>
            <Row label="Borders (rgba)"><input style={{ ...inp, fontFamily: 'monospace', fontSize: 12 }} value={settings.border} onChange={e => update('border', e.target.value)} /></Row>
            <Toggle val={settings.dark} onChange={v => update('dark', v)} label="Dark mode" />
            <Row label="Global radius" hint="Sharp → pill">
              <Slider val={settings.radius} onChange={v => update('radius', v)} min={0} max={40} suffix="px" />
            </Row>
            <Row label="Spacing scale" hint="Compact → airy">
              <Slider val={settings.spacingScale} onChange={v => update('spacingScale', v)} min={0.6} max={1.8} step={0.05} suffix="×" />
            </Row>
          </>
        )}

        {tab === 'type' && (
          <>
            <Row label="Heading font">
              <select style={inp} value={settings.headingFont} onChange={e => update('headingFont', e.target.value)}>
                {['Cormorant Garamond','Cormorant','Playfair Display','Lora','EB Garamond','DM Serif Display','Crimson Pro','Noto Serif JP','Inter','Work Sans','Space Grotesk','Syne','JetBrains Mono','IBM Plex Mono','Fredoka','Nunito'].map(f => <option key={f}>{f}</option>)}
              </select>
            </Row>
            <Row label="Body font">
              <select style={inp} value={settings.bodyFont} onChange={e => update('bodyFont', e.target.value)}>
                {['Cormorant','Cormorant Garamond','EB Garamond','Lora','Crimson Pro','Inter','Work Sans','Nunito','JetBrains Mono'].map(f => <option key={f}>{f}</option>)}
              </select>
            </Row>
            <Row label="Font size scale" hint={`Base ≈ ${Math.round(16 * settings.fontScale)}px`}>
              <Slider val={settings.fontScale} onChange={v => update('fontScale', v)} min={0.8} max={1.4} step={0.05} suffix="×" />
            </Row>
            <Row label="Letter spacing">
              <Slider val={settings.letterSpacing} onChange={v => update('letterSpacing', v)} min={-0.02} max={0.1} step={0.005} suffix="em" />
            </Row>
            <Row label="Line height">
              <Slider val={settings.lineHeight} onChange={v => update('lineHeight', v)} min={1.2} max={2.2} step={0.05} />
            </Row>
            <Toggle val={settings.headingUppercase} onChange={v => update('headingUppercase', v)} label="Uppercase headings" />
          </>
        )}

        {tab === 'atmos' && (
          <>
            <Row label="Background mode">
              <Chips val={settings.bgMode} onChange={v => update('bgMode', v)} options={['solid','gradient','pattern']} />
            </Row>
            {settings.bgMode === 'gradient' && (
              <>
                <Row label="Gradient from">{colorSwatch('gradientFrom')}</Row>
                <Row label="Gradient to">{colorSwatch('gradientTo')}</Row>
              </>
            )}
            {settings.bgMode === 'pattern' && (
              <Row label="Pattern">
                <Chips val={settings.pattern} onChange={v => update('pattern', v)} options={['dots','grid','diagonals','noise']} />
              </Row>
            )}
            <Row label="Animated background">
              <Chips val={settings.bgAnim} onChange={v => update('bgAnim', v)} options={[
                {value:'none', label:'None'}, {value:'petals', label:'Petals'}, {value:'particles', label:'Particles'}, {value:'snow', label:'Snow'}, {value:'fireflies', label:'Fireflies'}, {value:'bubbles', label:'Bubbles'}, {value:'aurora', label:'Aurora'},
              ]} />
            </Row>
            <Row label="Animation speed">
              <Slider val={settings.animSpeed} onChange={v => update('animSpeed', v)} min={0.2} max={3} step={0.1} suffix="×" />
            </Row>
            <Row label="Intensity">
              <Slider val={settings.animIntensity} onChange={v => update('animIntensity', v)} min={0.1} max={1.5} step={0.05} />
            </Row>
            <Toggle val={settings.reducedMotion} onChange={v => update('reducedMotion', v)} label="Disable animations (accessibility)" />
          </>
        )}

        {tab === 'layout' && (
          <>
            <Row label="Content max-width" hint={`${settings.maxWidth}px — narrow columns read better`}>
              <Slider val={settings.maxWidth} onChange={v => update('maxWidth', v)} min={720} max={1600} step={20} suffix="px" />
            </Row>
            <Row label="Sidebar">
              <Chips val={settings.sidebar} onChange={v => update('sidebar', v)} options={[{value:'none',label:'None'},{value:'left',label:'Left'},{value:'right',label:'Right'}]} />
            </Row>
            <Row label="Post grid columns">
              <Chips val={settings.gridCols} onChange={v => update('gridCols', v)} options={[{value:1,label:'1 col'},{value:2,label:'2 cols'},{value:3,label:'3 cols'},{value:'masonry',label:'Masonry'}]} />
            </Row>
          </>
        )}

        {tab === 'motion' && (
          <>
            <Row label="Page transition">
              <Chips val={settings.pageTransition} onChange={v => update('pageTransition', v)} options={['none','fade','slide','blur']} />
            </Row>
            <Row label="Card hover effect">
              <Chips val={settings.cardHover} onChange={v => update('cardHover', v)} options={['none','lift','glow','scale']} />
            </Row>
            <Row label="Scroll animation">
              <Chips val={settings.scrollAnim} onChange={v => update('scrollAnim', v)} options={[{value:'none',label:'None'},{value:'fade-in',label:'Fade in'},{value:'slide-up',label:'Slide up'}]} />
            </Row>
          </>
        )}

        {tab === 'content' && (
          <>
            <Row label="Blog name"><input style={inp} value={settings.name} onChange={e => update('name', e.target.value)} /></Row>
            <Row label="Tagline"><input style={inp} value={settings.tagline} onChange={e => update('tagline', e.target.value)} /></Row>
            <Row label="Navigation">
              {settings.nav.map((n, i) => (
                <div key={i} className="flex gap-1 mb-1">
                  <input style={{ ...inp, flex: 1 }} value={n} onChange={e => update('nav', settings.nav.map((x, j) => j === i ? e.target.value : x))} />
                  <button onClick={() => update('nav', settings.nav.filter((_, j) => j !== i))} className="px-3 border" style={{ borderColor: rule, borderRadius: 2 }}>×</button>
                </div>
              ))}
              <button onClick={() => update('nav', [...settings.nav, 'New'])} className="w-full mt-1 py-2 text-[10px] tracking-[0.25em] uppercase border" style={{ borderColor: rule, borderRadius: 2 }}>+ Add link</button>
            </Row>
            <Row label="Post metadata visibility">
              <Toggle val={settings.showAuthor} onChange={v => update('showAuthor', v)} label="Author" />
              <Toggle val={settings.showDate} onChange={v => update('showDate', v)} label="Date" />
              <Toggle val={settings.showReadTime} onChange={v => update('showReadTime', v)} label="Read time" />
              <Toggle val={settings.showTags} onChange={v => update('showTags', v)} label="Tags" />
            </Row>
          </>
        )}

        {tab === 'io' && (
          <>
            <Row label="Export theme" hint="Downloads a JSON file with every setting">
              <button onClick={exportJson} className="w-full py-3 text-[11px] tracking-[0.3em] uppercase" style={{ background: accent, color: bg, borderRadius: 2 }}>Download theme.json</button>
            </Row>
            <Row label="Import theme" hint="Load a previously exported JSON file">
              <input type="file" ref={fileRef} onChange={handleImport} accept="application/json" style={{ display: 'none' }} />
              <button onClick={() => fileRef.current?.click()} className="w-full py-3 text-[11px] tracking-[0.3em] uppercase border" style={{ borderColor: accent, color: accent, borderRadius: 2 }}>Choose .json file</button>
            </Row>
            <Row label="Danger zone">
              <button onClick={() => { if (confirm('Reset every setting to Maison Noir defaults?')) reset(); }}
                className="w-full py-3 text-[11px] tracking-[0.3em] uppercase border" style={{ borderColor: 'rgba(200,70,70,0.6)', color: '#d88', borderRadius: 2 }}>
                Reset to defaults
              </button>
            </Row>
            <div className="text-[10px] tracking-[0.2em] uppercase mt-6 pt-4 border-t" style={{ borderColor: rule, opacity: 0.5 }}>
              ● Settings auto-saved to localStorage
            </div>
          </>
        )}
      </div>
    </div>
  );
};
