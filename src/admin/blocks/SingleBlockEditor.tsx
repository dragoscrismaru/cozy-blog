import type { FC } from 'react'
import { useSortable } from '@dnd-kit/sortable'
import { CSS } from '@dnd-kit/utilities'
import { TextBlockEditor } from './TextBlockEditor'
import { blockTypes, type BlockType } from './BlockEditors'
import type { Block } from '../../lib/types'
import { useCallback, useState } from 'react'
import { useCozyStore } from '../../store'

interface SingleBlockEditorProps {
  block: Block
  onChange: (block: Block) => void
  onDelete: () => void
  onDuplicate: () => void
  onAddBlock: (type: BlockType) => void
}

export const SingleBlockEditor: FC<SingleBlockEditorProps> = ({
  block,
  onChange,
  onDelete,
  onDuplicate,
  onAddBlock,
}) => {
  const [showAddMenu, setShowAddMenu] = useState(false)

  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({ id: block.id })

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  }

  const updateData = useCallback(
    (patch: Record<string, unknown>) => {
      onChange({
        ...block,
        data: { ...block.data, ...patch },
      })
    },
    [block, onChange]
  )

  const addMedia = useCozyStore((s) => s.addMedia)

  const handleImageUpload = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const file = e.target.files?.[0]
      if (!file) return
      const reader = new FileReader()
      reader.onload = () => {
        const dataUrl = reader.result as string
        const item = {
          id: crypto.randomUUID(),
          name: file.name,
          size: file.size,
          createdAt: new Date().toISOString(),
          dataUrl,
        }
        addMedia(item)
        updateData({ src: dataUrl })
      }
      reader.readAsDataURL(file)
    },
    [addMedia, updateData]
  )

  const renderBlock = () => {
    switch (block.type) {
      case 'text':
        return (
          <TextBlockEditor
            html={(block.data.html as string) || '<p></p>'}
            onChange={(html) => updateData({ html })}
          />
        )
      case 'image': {
        const src = block.data.src as string
        return (
          <div className="rounded-xl border border-[#E2CFB5] bg-white/90 p-3">
            {src ? (
              <div className="relative">
                <img
                  src={src}
                  alt={(block.data.alt as string) || ''}
                  className="max-h-64 w-full rounded-lg object-cover"
                />
                <label className="mt-2 block">
                  <span className="text-[11px] text-[#8B6B4A]">Caption</span>
                  <input
                    type="text"
                    value={(block.data.caption as string) || ''}
                    onChange={(e) => updateData({ caption: e.target.value })}
                    placeholder="Image caption"
                    className="mt-1 w-full rounded border border-[#E2CFB5] px-2 py-1 text-sm"
                  />
                </label>
                <label className="mt-2 flex items-center gap-2">
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handleImageUpload}
                    className="text-xs"
                  />
                  <span className="text-xs text-[#8B6B4A]">Replace</span>
                </label>
              </div>
            ) : (
              <label className="flex cursor-pointer flex-col items-center justify-center rounded-lg border-2 border-dashed border-[#E2CFB5] py-8 text-[#8B6B4A] hover:border-[#C4956A]">
                <span className="text-sm">Drop image or click to upload</span>
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleImageUpload}
                  className="hidden"
                />
              </label>
            )}
          </div>
        )
      }
      case 'quote':
        return (
          <div className="rounded-xl border border-[#E2CFB5] bg-[#FFF9F1] p-3">
            <textarea
              value={(block.data.text as string) || ''}
              onChange={(e) => updateData({ text: e.target.value })}
              placeholder="Quote text"
              className="w-full resize-none border-0 bg-transparent text-lg italic text-[#3E2723] outline-none"
              rows={2}
            />
            <input
              type="text"
              value={(block.data.author as string) || ''}
              onChange={(e) => updateData({ author: e.target.value })}
              placeholder="— Author"
              className="mt-2 w-full border-0 border-b border-[#E2CFB5] bg-transparent text-sm text-[#8B6B4A] outline-none"
            />
          </div>
        )
      case 'divider':
        return (
          <div className="rounded-xl border border-[#E2CFB5] bg-white/90 p-3">
            <select
              value={(block.data.style as string) || 'ornamental'}
              onChange={(e) => updateData({ style: e.target.value })}
              className="rounded border border-[#E2CFB5] px-2 py-1 text-xs"
            >
              <option value="thin">Thin line</option>
              <option value="thick">Thick line</option>
              <option value="dotted">Dotted</option>
              <option value="dashed">Dashed</option>
              <option value="ornamental">Ornamental</option>
            </select>
            <div className="mt-2 flex items-center gap-2">
              <span className="text-[11px] text-[#8B6B4A]">Color</span>
              <input
                type="color"
                value={(block.data.color as string) || '#C4956A'}
                onChange={(e) => updateData({ color: e.target.value })}
                className="h-6 w-12 cursor-pointer rounded border border-[#E2CFB5]"
              />
              <select
                value={(block.data.width as string) || '50%'}
                onChange={(e) => updateData({ width: e.target.value })}
                className="rounded border border-[#E2CFB5] px-2 py-1 text-xs"
              >
                <option value="50%">50%</option>
                <option value="75%">75%</option>
                <option value="100%">100%</option>
              </select>
            </div>
          </div>
        )
      case 'spacer':
        return (
          <div className="rounded-xl border border-dashed border-[#E2CFB5] bg-white/60 p-3">
            <select
              value={(block.data.height as number) || 48}
              onChange={(e) => updateData({ height: Number(e.target.value) })}
              className="rounded border border-[#E2CFB5] px-2 py-1 text-xs"
            >
              <option value={24}>Small (24px)</option>
              <option value={48}>Medium (48px)</option>
              <option value={96}>Large (96px)</option>
            </select>
            <span className="ml-2 text-[11px] text-[#8B6B4A]">Spacer</span>
          </div>
        )
      case 'gallery': {
        const images = (block.data.images as { src: string; alt?: string; caption?: string }[]) || []
        return (
          <div className="rounded-xl border border-[#E2CFB5] bg-white/90 p-3">
            <p className="text-[11px] text-[#8B6B4A]">Gallery ({images.length} images)</p>
            <div className="mt-2 grid grid-cols-3 gap-2">
              {images.map((img, i) => (
                <div key={i} className="relative">
                  <img
                    src={img.src}
                    alt={img.alt || ''}
                    className="h-20 w-full rounded object-cover"
                  />
                  <button
                    type="button"
                    onClick={() => {
                      const next = images.filter((_, j) => j !== i)
                      updateData({ images: next })
                    }}
                    className="absolute right-1 top-1 rounded bg-red-500 px-1 text-[10px] text-white"
                  >
                    ×
                  </button>
                </div>
              ))}
              <label className="flex h-20 cursor-pointer items-center justify-center rounded border-2 border-dashed border-[#E2CFB5] text-[#8B6B4A] hover:border-[#C4956A]">
                <span className="text-xs">+ Add</span>
                <input
                  type="file"
                  accept="image/*"
                  className="hidden"
                  onChange={(e) => {
                    const file = e.target.files?.[0]
                    if (!file) return
                    const reader = new FileReader()
                    reader.onload = () => {
                      const dataUrl = reader.result as string
                      addMedia({
                        id: crypto.randomUUID(),
                        name: file.name,
                        size: file.size,
                        createdAt: new Date().toISOString(),
                        dataUrl,
                      })
                      updateData({ images: [...images, { src: dataUrl }] })
                    }
                    reader.readAsDataURL(file)
                  }}
                />
              </label>
            </div>
            <div className="mt-2 flex gap-2">
              <select
                value={(block.data.layout as string) || 'grid'}
                onChange={(e) => updateData({ layout: e.target.value })}
                className="rounded border border-[#E2CFB5] px-2 py-1 text-xs"
              >
                <option value="grid">Grid</option>
                <option value="masonry">Masonry</option>
                <option value="carousel">Carousel</option>
              </select>
              <select
                value={(block.data.columns as number) || 3}
                onChange={(e) => updateData({ columns: Number(e.target.value) })}
                className="rounded border border-[#E2CFB5] px-2 py-1 text-xs"
              >
                <option value={2}>2 columns</option>
                <option value={3}>3 columns</option>
                <option value={4}>4 columns</option>
              </select>
            </div>
          </div>
        )
      }
      case 'two-column': {
        const left = (block.data.left as { blocks: Block[] })?.blocks || []
        const right = (block.data.right as { blocks: Block[] })?.blocks || []
        return (
          <div className="rounded-xl border border-[#E2CFB5] bg-white/90 p-3">
            <div className="mb-2 flex gap-2">
              <select
                value={(block.data.ratio as string) || '60/40'}
                onChange={(e) => updateData({ ratio: e.target.value })}
                className="rounded border border-[#E2CFB5] px-2 py-1 text-xs"
              >
                <option value="50/50">50/50</option>
                <option value="60/40">60/40</option>
                <option value="40/60">40/60</option>
                <option value="70/30">70/30</option>
                <option value="30/70">30/70</option>
              </select>
              <span className="text-[11px] text-[#8B6B4A]">Two-column layout</span>
            </div>
            <div className="grid grid-cols-2 gap-3">
              <div className="rounded border border-dashed border-[#E2CFB5] p-2 text-center text-[11px] text-[#8B6B4A]">
                Left column ({left.length} blocks)
              </div>
              <div className="rounded border border-dashed border-[#E2CFB5] p-2 text-center text-[11px] text-[#8B6B4A]">
                Right column ({right.length} blocks)
              </div>
            </div>
          </div>
        )
      }
      case 'code':
        return (
          <div className="rounded-xl border border-[#E2CFB5] bg-[#1e1e1e] p-3">
            <div className="mb-2 flex gap-2">
              <select
                value={(block.data.language as string) || 'javascript'}
                onChange={(e) => updateData({ language: e.target.value })}
                className="rounded border border-[#444] bg-[#2d2d2d] px-2 py-1 text-xs text-[#ccc]"
              >
                <option value="javascript">JavaScript</option>
                <option value="typescript">TypeScript</option>
                <option value="html">HTML</option>
                <option value="css">CSS</option>
                <option value="json">JSON</option>
              </select>
            </div>
            <textarea
              value={(block.data.code as string) || ''}
              onChange={(e) => updateData({ code: e.target.value })}
              placeholder="// code"
              className="h-32 w-full resize-y rounded border-0 bg-[#2d2d2d] p-2 font-mono text-sm text-[#d4d4d4] outline-none"
              spellCheck={false}
            />
          </div>
        )
      case 'cta':
        return (
          <div className="rounded-xl border border-[#E2CFB5] bg-white/90 p-3">
            <input
              type="text"
              value={(block.data.heading as string) || ''}
              onChange={(e) => updateData({ heading: e.target.value })}
              placeholder="Heading"
              className="mb-2 w-full rounded border border-[#E2CFB5] px-2 py-1 text-sm font-semibold"
            />
            <input
              type="text"
              value={(block.data.description as string) || ''}
              onChange={(e) => updateData({ description: e.target.value })}
              placeholder="Description"
              className="mb-2 w-full rounded border border-[#E2CFB5] px-2 py-1 text-xs"
            />
            <div className="flex gap-2">
              <input
                type="text"
                value={(block.data.buttonText as string) || 'Learn more'}
                onChange={(e) => updateData({ buttonText: e.target.value })}
                placeholder="Button text"
                className="flex-1 rounded border border-[#E2CFB5] px-2 py-1 text-xs"
              />
              <input
                type="text"
                value={(block.data.buttonLink as string) || '/'}
                onChange={(e) => updateData({ buttonLink: e.target.value })}
                placeholder="Button link"
                className="flex-1 rounded border border-[#E2CFB5] px-2 py-1 text-xs"
              />
            </div>
            <div className="mt-2 flex gap-2">
              <span className="text-[11px] text-[#8B6B4A]">Button</span>
              <input
                type="color"
                value={(block.data.buttonColor as string) || '#D4A843'}
                onChange={(e) => updateData({ buttonColor: e.target.value })}
                className="h-6 w-10 cursor-pointer rounded border border-[#E2CFB5]"
              />
              <span className="text-[11px] text-[#8B6B4A]">BG</span>
              <input
                type="color"
                value={(block.data.backgroundColor as string) || '#F5E6D3'}
                onChange={(e) => updateData({ backgroundColor: e.target.value })}
                className="h-6 w-10 cursor-pointer rounded border border-[#E2CFB5]"
              />
            </div>
          </div>
        )
      default:
        return <div className="rounded-xl border border-[#E2CFB5] p-3 text-sm text-[#8B6B4A]">Unknown block type</div>
    }
  }

  return (
    <div
      ref={setNodeRef}
      style={style}
      className={`group relative ${isDragging ? 'opacity-50' : ''}`}
    >
      <div className="flex items-start gap-2">
        <div
          {...attributes}
          {...listeners}
          className="mt-4 cursor-grab rounded p-1 text-[#8B6B4A] hover:bg-[#F0E0CB] active:cursor-grabbing"
        >
          <svg width="16" height="16" viewBox="0 0 16 16" fill="currentColor">
            <circle cx="4" cy="4" r="1.5" />
            <circle cx="12" cy="4" r="1.5" />
            <circle cx="4" cy="8" r="1.5" />
            <circle cx="12" cy="8" r="1.5" />
            <circle cx="4" cy="12" r="1.5" />
            <circle cx="12" cy="12" r="1.5" />
          </svg>
        </div>
        <div className="flex-1">
          {renderBlock()}
          <div className="mt-1 flex items-center gap-1 opacity-0 transition group-hover:opacity-100">
            <button
              type="button"
              onClick={() => setShowAddMenu((v) => !v)}
              className="rounded px-2 py-0.5 text-[11px] text-[#8B6B4A] hover:bg-[#F0E0CB]"
            >
              + Add block
            </button>
            <button
              type="button"
              onClick={onDuplicate}
              className="rounded px-2 py-0.5 text-[11px] text-[#8B6B4A] hover:bg-[#F0E0CB]"
            >
              Duplicate
            </button>
            <button
              type="button"
              onClick={onDelete}
              className="rounded px-2 py-0.5 text-[11px] text-red-600 hover:bg-red-50"
            >
              Delete
            </button>
          </div>
          {showAddMenu && (
            <div className="mt-2 rounded-lg border border-[#E2CFB5] bg-white p-2 shadow-lg">
              {blockTypes.map(({ type, label }) => (
                <button
                  key={type}
                  type="button"
                  onClick={() => {
                    onAddBlock(type)
                    setShowAddMenu(false)
                  }}
                  className="block w-full rounded px-2 py-1 text-left text-xs text-[#5C4033] hover:bg-[#F5E6D3]"
                >
                  {label}
                </button>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
