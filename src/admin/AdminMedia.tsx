import type { FC } from 'react'
import { useCozyStore } from '../store'
import { useCallback, useState } from 'react'

export const AdminMedia: FC = () => {
  const media = useCozyStore((s) => s.media)
  const addMedia = useCozyStore((s) => s.addMedia)
  const deleteMedia = useCozyStore((s) => s.deleteMedia)
  const [search, setSearch] = useState('')

  const filtered = media.filter((m) =>
    m.name.toLowerCase().includes(search.toLowerCase())
  )

  const handleDrop = useCallback(
    (e: React.DragEvent) => {
      e.preventDefault()
      const files = Array.from(e.dataTransfer.files).filter((f) =>
        f.type.startsWith('image/')
      )
      files.forEach((file) => {
        const reader = new FileReader()
        reader.onload = () => {
          addMedia({
            id: crypto.randomUUID(),
            name: file.name,
            size: file.size,
            createdAt: new Date().toISOString(),
            dataUrl: reader.result as string,
          })
        }
        reader.readAsDataURL(file)
      })
    },
    [addMedia]
  )

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files ? Array.from(e.target.files) : []
    files.forEach((file) => {
      const reader = new FileReader()
      reader.onload = () => {
        addMedia({
          id: crypto.randomUUID(),
          name: file.name,
          size: file.size,
          createdAt: new Date().toISOString(),
          dataUrl: reader.result as string,
        })
      }
      reader.readAsDataURL(file)
    })
    e.target.value = ''
  }

  const formatSize = (bytes: number) => {
    if (bytes < 1024) return `${bytes} B`
    if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`
    return `${(bytes / 1024 / 1024).toFixed(1)} MB`
  }

  return (
    <div className="space-y-6">
      <h1 className="font-serif text-2xl text-[#3E2723]">Media library</h1>

      <div
        onDragOver={(e) => e.preventDefault()}
        onDrop={handleDrop}
        className="rounded-2xl border-2 border-dashed border-[#E2CFB5] bg-[#FFF9F1]/60 p-8 text-center transition hover:border-[#C4956A]"
      >
        <p className="text-sm text-[#6F4D3C]">Drop images here or</p>
        <label className="mt-2 inline-block cursor-pointer rounded-full bg-[#C4956A] px-4 py-2 text-xs font-semibold uppercase tracking-[0.18em] text-[#FFF9F1]">
          Choose files
          <input
            type="file"
            accept="image/*"
            multiple
            className="hidden"
            onChange={handleFileSelect}
          />
        </label>
      </div>

      <div>
        <input
          type="search"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Search by filename..."
          className="w-full max-w-xs rounded-xl border border-[#E2CFB5] bg-white/80 px-3 py-2 text-sm"
        />
      </div>

      {filtered.length === 0 ? (
        <p className="text-sm text-[#8B6B4A]">
          {media.length === 0 ? 'No images yet.' : 'No matches.'}
        </p>
      ) : (
        <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5">
          {filtered.map((item) => (
            <div
              key={item.id}
              className="group relative overflow-hidden rounded-2xl border border-[#E2CFB5] bg-white shadow-[0_8px_24px_rgba(92,64,51,0.12)]"
            >
              <img
                src={item.dataUrl}
                alt={item.name}
                className="aspect-square w-full object-cover"
              />
              <div className="p-2">
                <p className="truncate text-xs text-[#5C4033]">{item.name}</p>
                <p className="text-[11px] text-[#8B6B4A]">{formatSize(item.size)}</p>
              </div>
              <button
                type="button"
                onClick={() => {
                  if (confirm('Delete this image?')) deleteMedia(item.id)
                }}
                className="absolute right-2 top-2 rounded-full bg-red-500/90 px-2 py-0.5 text-[10px] text-white opacity-0 transition group-hover:opacity-100"
              >
                Delete
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
