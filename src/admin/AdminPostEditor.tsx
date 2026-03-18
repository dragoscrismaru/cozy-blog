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
  layout: 'single-column' as const,
  headerStyle: 'static' as const,
}

export const AdminPostEditor: FC = () => {
  const { id } = useParams<{ id: string }>()
  const isNew = !id || id === 'new'
  const navigate = useNavigate()

  const posts = useCozyStore((s) => s.posts)
  const upsertPost = useCozyStore((s) => s.upsertPost)
  const post = posts.find((p) => p.id === id)

  const [title, setTitle] = useState('')
  const [excerpt, setExcerpt] = useState('')
  const [slug, setSlug] = useState('')
  const [status, setStatus] = useState<'draft' | 'published'>('draft')
  const [category, setCategory] = useState('')
  const [tags, setTags] = useState<string[]>([])
  const [coverImage, setCoverImage] = useState<string | null>(null)
  const [blocks, setBlocks] = useState<Block[]>([])
  const [style, setStyle] = useState(defaultStyle)
  const [saving, setSaving] = useState(false)

  useEffect(() => {
    if (post) {
      setTitle(post.title)
      setExcerpt(post.excerpt)
      setSlug(post.slug)
      setStatus(post.status)
      setCategory(post.category)
      setTags(post.tags)
      setCoverImage(post.coverImage)
      setBlocks(post.content.blocks)
      setStyle(post.style)
    } else if (isNew) {
      setTitle('')
      setExcerpt('')
      setSlug('')
      setStatus('draft')
      setCategory('')
      setTags([])
      setCoverImage(null)
      setBlocks([])
      setStyle(defaultStyle)
    }
  }, [post, isNew])

  const handleSave = () => {
    setSaving(true)
    const newId = isNew ? crypto.randomUUID() : id!
    upsertPost({
      id: newId,
      title: title || 'Untitled',
      slug: slug || slugify(title) || 'untitled',
      excerpt,
      status,
      category,
      tags,
      coverImage,
      content: { blocks },
      style,
    })
    setSaving(false)
    if (isNew) navigate(`/admin/posts/${newId}/edit`)
  }

  const handleTitleChange = (v: string) => {
    setTitle(v)
    if (isNew) setSlug(slugify(v))
  }

  return (
    <div className="flex gap-6">
      <div className="min-w-0 flex-1 space-y-4">
        <Link to="/admin/posts" className="text-xs text-[#8B6B4A] hover:underline">
          ← Back to posts
        </Link>

        <input
          type="text"
          value={title}
          onChange={(e) => handleTitleChange(e.target.value)}
          placeholder="Post title"
          className="w-full border-0 border-b-2 border-[#E2CFB5] bg-transparent py-2 text-2xl font-serif text-[#3E2723] outline-none placeholder:text-[#8B6B4A]"
        />

        <textarea
          value={excerpt}
          onChange={(e) => setExcerpt(e.target.value)}
          placeholder="Short excerpt for previews..."
          rows={2}
          className="w-full resize-none rounded-xl border border-[#E2CFB5] bg-white/80 px-3 py-2 text-sm text-[#5C4033] outline-none placeholder:text-[#8B6B4A]"
        />

        <BlockEditor blocks={blocks} onChange={setBlocks} />

        <div className="flex items-center gap-3 pt-4">
          <button
            type="button"
            onClick={handleSave}
            disabled={saving}
            className="rounded-full bg-[#C4956A] px-5 py-2 text-xs font-semibold uppercase tracking-[0.18em] text-[#FFF9F1] shadow-[0_16px_40px_rgba(92,64,51,0.4)] disabled:opacity-60"
          >
            {saving ? 'Saving…' : 'Save'}
          </button>
          {!isNew && (
            <Link to={`/post/${slug || id}`} target="_blank" className="text-xs text-[#8B6B4A] hover:underline">
              Preview
            </Link>
          )}
        </div>
      </div>

      <aside className="hidden w-64 shrink-0 space-y-4 lg:block">
        <div className="rounded-2xl border border-[#E2CFB5] bg-[#FFF9F1]/90 p-4 shadow-[0_14px_36px_rgba(92,64,51,0.15)]">
          <p className="text-[11px] font-medium uppercase tracking-[0.24em] text-[#8B6B4A]">Style</p>
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
                <option value="Source Serif Pro">Source Serif Pro</option>
              </select>
            </div>
            <div>
              <label className="text-[11px] text-[#8B6B4A]">Layout</label>
              <select
                value={style.layout}
                onChange={(e) =>
                  setStyle((s) => ({ ...s, layout: e.target.value as (typeof style)['layout'] }))
                }
                className="mt-1 w-full rounded border border-[#E2CFB5] px-2 py-1.5 text-sm"
              >
                <option value="single-column">Single column</option>
                <option value="sidebar">With sidebar</option>
                <option value="magazine">Magazine</option>
              </select>
            </div>
          </div>
        </div>

        <div className="rounded-2xl border border-[#E2CFB5] bg-[#FFF9F1]/90 p-4 shadow-[0_14px_36px_rgba(92,64,51,0.15)]">
          <p className="text-[11px] font-medium uppercase tracking-[0.24em] text-[#8B6B4A]">Post meta</p>
          <div className="mt-3 space-y-3">
            <div>
              <label className="text-[11px] text-[#8B6B4A]">Category</label>
              <input
                type="text"
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                placeholder="thoughts"
                className="mt-1 w-full rounded border border-[#E2CFB5] px-2 py-1.5 text-sm"
              />
            </div>
            <div>
              <label className="text-[11px] text-[#8B6B4A]">Tags (comma)</label>
              <input
                type="text"
                value={tags.join(', ')}
                onChange={(e) =>
                  setTags(
                    e.target.value
                      .split(',')
                      .map((t) => t.trim())
                      .filter(Boolean)
                  )
                }
                placeholder="personal, reflection"
                className="mt-1 w-full rounded border border-[#E2CFB5] px-2 py-1.5 text-sm"
              />
            </div>
            <div>
              <label className="text-[11px] text-[#8B6B4A]">Slug</label>
              <input
                type="text"
                value={slug}
                onChange={(e) => setSlug(e.target.value)}
                placeholder="my-post-slug"
                className="mt-1 w-full rounded border border-[#E2CFB5] px-2 py-1.5 text-sm"
              />
            </div>
            <div>
              <label className="text-[11px] text-[#8B6B4A]">Status</label>
              <select
                value={status}
                onChange={(e) => setStatus(e.target.value as 'draft' | 'published')}
                className="mt-1 w-full rounded border border-[#E2CFB5] px-2 py-1.5 text-sm"
              >
                <option value="draft">Draft</option>
                <option value="published">Published</option>
              </select>
            </div>
          </div>
        </div>
      </aside>
    </div>
  )
}
