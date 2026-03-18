import type { FC } from 'react'
import { useCozyStore } from '../store'

const FONTS = ['Lora', 'Merriweather', 'Playfair Display', 'Source Serif Pro']

export const AdminSettings: FC = () => {
  const settings = useCozyStore((s) => s.settings)
  const updateSettings = useCozyStore((s) => s.updateSettings)
  return (
    <div className="max-w-2xl space-y-8">
      <h1 className="font-serif text-2xl text-[#3E2723]">Settings</h1>

      <div className="rounded-2xl border border-[#E2CFB5] bg-[#FFF9F1]/90 p-6 shadow-[0_14px_36px_rgba(92,64,51,0.15)]">
        <h2 className="mb-4 text-sm font-semibold text-[#3E2723]">Blog identity</h2>
        <div className="space-y-4">
          <div>
            <label className="text-[11px] text-[#8B6B4A]">Blog name</label>
            <input
              type="text"
              value={settings.name}
              onChange={(e) => updateSettings({ name: e.target.value })}
              className="mt-1 w-full rounded-lg border border-[#E2CFB5] bg-white px-3 py-2"
            />
          </div>
          <div>
            <label className="text-[11px] text-[#8B6B4A]">Tagline</label>
            <input
              type="text"
              value={settings.tagline}
              onChange={(e) => updateSettings({ tagline: e.target.value })}
              className="mt-1 w-full rounded-lg border border-[#E2CFB5] bg-white px-3 py-2"
            />
          </div>
        </div>
      </div>

      <div className="rounded-2xl border border-[#E2CFB5] bg-[#FFF9F1]/90 p-6 shadow-[0_14px_36px_rgba(92,64,51,0.15)]">
        <h2 className="mb-4 text-sm font-semibold text-[#3E2723]">Global colors</h2>
        <div className="grid gap-4 sm:grid-cols-2">
          <div>
            <label className="text-[11px] text-[#8B6B4A]">Background</label>
            <div className="mt-1 flex gap-2">
              <input
                type="color"
                value={settings.globalBackground}
                onChange={(e) =>
                  updateSettings({ globalBackground: e.target.value })
                }
                className="h-10 w-14 cursor-pointer rounded border border-[#E2CFB5]"
              />
              <input
                type="text"
                value={settings.globalBackground}
                onChange={(e) =>
                  updateSettings({ globalBackground: e.target.value })
                }
                className="flex-1 rounded-lg border border-[#E2CFB5] bg-white px-2 py-1.5 text-sm"
              />
            </div>
          </div>
          <div>
            <label className="text-[11px] text-[#8B6B4A]">Accent</label>
            <div className="mt-1 flex gap-2">
              <input
                type="color"
                value={settings.globalAccent}
                onChange={(e) =>
                  updateSettings({ globalAccent: e.target.value })
                }
                className="h-10 w-14 cursor-pointer rounded border border-[#E2CFB5]"
              />
              <input
                type="text"
                value={settings.globalAccent}
                onChange={(e) =>
                  updateSettings({ globalAccent: e.target.value })
                }
                className="flex-1 rounded-lg border border-[#E2CFB5] bg-white px-2 py-1.5 text-sm"
              />
            </div>
          </div>
        </div>
      </div>

      <div className="rounded-2xl border border-[#E2CFB5] bg-[#FFF9F1]/90 p-6 shadow-[0_14px_36px_rgba(92,64,51,0.15)]">
        <h2 className="mb-4 text-sm font-semibold text-[#3E2723]">Typography</h2>
        <div className="grid gap-4 sm:grid-cols-2">
          <div>
            <label className="text-[11px] text-[#8B6B4A]">Body font</label>
            <select
              value={settings.bodyFont}
              onChange={(e) => updateSettings({ bodyFont: e.target.value })}
              className="mt-1 w-full rounded-lg border border-[#E2CFB5] bg-white px-3 py-2"
            >
              {FONTS.map((f) => (
                <option key={f} value={f}>
                  {f}
                </option>
              ))}
            </select>
          </div>
          <div>
            <label className="text-[11px] text-[#8B6B4A]">Heading font</label>
            <select
              value={settings.headingFont}
              onChange={(e) => updateSettings({ headingFont: e.target.value })}
              className="mt-1 w-full rounded-lg border border-[#E2CFB5] bg-white px-3 py-2"
            >
              {FONTS.map((f) => (
                <option key={f} value={f}>
                  {f}
                </option>
              ))}
            </select>
          </div>
        </div>
      </div>

      <p className="text-xs text-[#8B6B4A]">Settings auto-save to localStorage.</p>
    </div>
  )
}
