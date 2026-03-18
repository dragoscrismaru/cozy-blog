import type { FC } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom'
import { useCozyStore } from '../store'
import { BlockEditor } from './blocks/BlockEditor'
import type { Block } from '../lib/types'
import { useEffect, useState } from 'react'

const slugify = (s: string) =>
  s
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-|-$/g, '')

const defaultStyle = {
  backgroundColor: '#FAF3E0',
  accentColor: '#C4956A',
  fontFamily: 'Lora',
}

export const AdminPageEditor: FC = () => {
  const { id } = useParams<{ id: string }>()
  const isNew = !id || id === 'new'
  const navigate = useNavigate()

  const pages = useCozyStore((s) => s.pages)
  const upsertPage = useCozyStore((s) => s.upsertPage)
  const page = pages.find((p) => p.id === id)

  const [title, setTitle] = useState('')
  const [slug, setSlug] = useState('')
  const [blocks, setBlocks] = useState<Block[]>([])
  const [style, setStyle] = useState(defaultStyle)

  useEffect(() => {
    if (page) {
      setTitle(page.title)
      setSlug(page.slug)
      setBlocks(page.content.blocks)
      setStyle(page.style)
    } else if (isNew) {
      setTitle('')
      setSlug('')
      setBlocks([])
      setStyle(defaultStyle)
    }
  }, [page, isNew])

  const handleSave = () => {
    const newId = isNew ? crypto.randomUUID() : id!
    upsertPage({
      id: newId,
      title: title || 'Untitled page',
      slug: slug || slugify(title) || 'page',
      content: { blocks },
      style,
    })
    if (isNew) navigate(`/admin/pages/${newId}/edit`)
  }

  return (
    <div className="flex gap-6">
      <div className="min-w-0 flex-1 space-y-4">
        <Link to="/admin/pages" className="text-xs text-[#8B6B4A] hover:underline">
          ← Back to pages
        </Link>

        <input
          type="text"
          value={title}
          onChange={(e) => {
            setTitle(e.target.value)
            if (isNew) setSlug(slugify(e.target.value))
          }}
          placeholder="Page title (e.g. About)"
          className="w-full border-0 border-b-2 border-[#E2CFB5] bg-transparent py-2 text-2xl font-serif text-[#3E2723] outline-none placeholder:text-[#8B6B4A]"
        />

        <div>
          <label className="text-[11px] text-[#8B6B4A]">Slug (URL path)</label>
          <input
            type="text"
            value={slug}
            onChange={(e) => setSlug(e.target.value)}
            placeholder="about"
            className="mt-1 w-full rounded-lg border border-[#E2CFB5] bg-white/80 px-3 py-2 text-sm"
          />
        </div>

        <BlockEditor blocks={blocks} onChange={setBlocks} />

        <button
          type="button"
          onClick={handleSave}
          className="rounded-full bg-[#C4956A] px-5 py-2 text-xs font-semibold uppercase tracking-[0.18em] text-[#FFF9F1] shadow-[0_16px_40px_rgba(92,64,51,0.4)]"
        >
          Save page
        </button>
      </div>

      <aside className="hidden w-64 shrink-0 lg:block">
        <div className="rounded-2xl border border-[#E2CFB5] bg-[#FFF9F1]/90 p-4 shadow-[0_14px_36px_rgba(92,64,51,0.15)]">
          <p className="text-[11px] font-medium uppercase tracking-[0.24em] text-[#8B6B4A]">Page style</p>
          <div className="mt-3 space-y-3">
            <div>
              <label className="text-[11px] text-[#8B6B4A]">Background</label>
              <input
                type="color"
                value={style.backgroundColor}
                onChange={(e) => setStyle((s) => ({ ...s, backgroundColor: e.target.value }))}
                className="mt-1 block h-8 w-full cursor-pointer rounded border border-[#E2CFB5]"
              />
            </div>
            <div>
              <label className="text-[11px] text-[#8B6B4A]">Accent</label>
              <input
                type="color"
                value={style.accentColor}
                onChange={(e) => setStyle((s) => ({ ...s, accentColor: e.target.value }))}
                className="mt-1 block h-8 w-full cursor-pointer rounded border border-[#E2CFB5]"
              />
            </div>
            <div>
              <label className="text-[11px] text-[#8B6B4A]">Font</label>
              <select
                value={style.fontFamily}
                onChange={(e) => setStyle((s) => ({ ...s, fontFamily: e.target.value }))}
                className="mt-1 w-full rounded border border-[#E2CFB5] px-2 py-1.5 text-sm"
              >
                <option value="Lora">Lora</option>
                <option value="Merriweather">Merriweather</option>
                <option value="Playfair Display">Playfair Display</option>
              </select>
            </div>
          </div>
        </div>
      </aside>
    </div>
  )
}
