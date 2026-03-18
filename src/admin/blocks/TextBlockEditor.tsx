import { useEditor, EditorContent, type Editor } from '@tiptap/react'
import StarterKit from '@tiptap/starter-kit'
import TextAlign from '@tiptap/extension-text-align'
import Link from '@tiptap/extension-link'
import Highlight from '@tiptap/extension-highlight'
import Color from '@tiptap/extension-color'
import { TextStyle } from '@tiptap/extension-text-style'
import Placeholder from '@tiptap/extension-placeholder'
import type { FC } from 'react'
import { useCallback, useEffect } from 'react'

interface TextBlockEditorProps {
  html: string
  onChange: (html: string) => void
  placeholder?: string
}

const MenuBar: FC<{ editor: Editor }> = ({ editor }) => {
  if (!editor) return null
  return (
    <div className="flex flex-wrap gap-1 border-b border-[#E2CFB5] pb-2 mb-2">
      <button
        type="button"
        onClick={() => editor.chain().focus().toggleBold().run()}
        className={`rounded px-2 py-1 text-xs ${editor.isActive('bold') ? 'bg-[#C4956A] text-white' : 'bg-[#F0E0CB] text-[#5C4033]'}`}
      >
        Bold
      </button>
      <button
        type="button"
        onClick={() => editor.chain().focus().toggleItalic().run()}
        className={`rounded px-2 py-1 text-xs ${editor.isActive('italic') ? 'bg-[#C4956A] text-white' : 'bg-[#F0E0CB] text-[#5C4033]'}`}
      >
        Italic
      </button>
      <button
        type="button"
        onClick={() => editor.chain().focus().toggleHeading({ level: 2 }).run()}
        className={`rounded px-2 py-1 text-xs ${editor.isActive('heading', { level: 2 }) ? 'bg-[#C4956A] text-white' : 'bg-[#F0E0CB] text-[#5C4033]'}`}
      >
        H2
      </button>
      <button
        type="button"
        onClick={() => editor.chain().focus().toggleHeading({ level: 3 }).run()}
        className={`rounded px-2 py-1 text-xs ${editor.isActive('heading', { level: 3 }) ? 'bg-[#C4956A] text-white' : 'bg-[#F0E0CB] text-[#5C4033]'}`}
      >
        H3
      </button>
      <button
        type="button"
        onClick={() => editor.chain().focus().toggleBulletList().run()}
        className={`rounded px-2 py-1 text-xs ${editor.isActive('bulletList') ? 'bg-[#C4956A] text-white' : 'bg-[#F0E0CB] text-[#5C4033]'}`}
      >
        List
      </button>
      <button
        type="button"
        onClick={() => editor.chain().focus().toggleOrderedList().run()}
        className={`rounded px-2 py-1 text-xs ${editor.isActive('orderedList') ? 'bg-[#C4956A] text-white' : 'bg-[#F0E0CB] text-[#5C4033]'}`}
      >
        Num
      </button>
      <button
        type="button"
        onClick={() => editor.chain().focus().toggleBlockquote().run()}
        className={`rounded px-2 py-1 text-xs ${editor.isActive('blockquote') ? 'bg-[#C4956A] text-white' : 'bg-[#F0E0CB] text-[#5C4033]'}`}
      >
        Quote
      </button>
      <button
        type="button"
        onClick={() => editor.chain().focus().setTextAlign('left').run()}
        className={`rounded px-2 py-1 text-xs ${editor.isActive({ textAlign: 'left' }) ? 'bg-[#C4956A] text-white' : 'bg-[#F0E0CB] text-[#5C4033]'}`}
      >
        ←
      </button>
      <button
        type="button"
        onClick={() => editor.chain().focus().setTextAlign('center').run()}
        className={`rounded px-2 py-1 text-xs ${editor.isActive({ textAlign: 'center' }) ? 'bg-[#C4956A] text-white' : 'bg-[#F0E0CB] text-[#5C4033]'}`}
      >
        ↔
      </button>
      <button
        type="button"
        onClick={() => editor.chain().focus().setTextAlign('right').run()}
        className={`rounded px-2 py-1 text-xs ${editor.isActive({ textAlign: 'right' }) ? 'bg-[#C4956A] text-white' : 'bg-[#F0E0CB] text-[#5C4033]'}`}
      >
        →
      </button>
      <button
        type="button"
        onClick={() => editor.chain().focus().toggleHighlight().run()}
        className={`rounded px-2 py-1 text-xs ${editor.isActive('highlight') ? 'bg-[#C4956A] text-white' : 'bg-[#F0E0CB] text-[#5C4033]'}`}
      >
        Highlight
      </button>
    </div>
  )
}

export const TextBlockEditor: FC<TextBlockEditorProps> = ({
  html,
  onChange,
  placeholder = 'Write something…',
}) => {
  const editor = useEditor({
    extensions: [
      StarterKit,
      TextAlign.configure({ types: ['heading', 'paragraph'] }),
      Link.configure({ openOnClick: false }),
      Highlight,
      Color,
      TextStyle,
      Placeholder.configure({ placeholder }),
    ],
    content: html,
    editorProps: {
      attributes: {
        class: 'prose prose-sm max-w-none min-h-[80px] outline-none focus:outline-none',
      },
    },
  })

  useEffect(() => {
    if (!editor) return
    if (editor.getHTML() !== html) editor.commands.setContent(html)
  }, [html])

  const handleUpdate = useCallback(() => {
    if (editor) onChange(editor.getHTML())
  }, [editor, onChange])

  useEffect(() => {
    if (!editor) return
    editor.on('update', handleUpdate)
    return () => {
      editor.off('update', handleUpdate)
    }
  }, [editor, handleUpdate])

  if (!editor) return null

  return (
    <div className="rounded-xl border border-[#E2CFB5] bg-white/90 p-3">
      <MenuBar editor={editor} />
      <EditorContent editor={editor} />
    </div>
  )
}
