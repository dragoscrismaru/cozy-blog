import {
  DndContext,
  closestCenter,
  KeyboardSensor,
  PointerSensor,
  useSensor,
  useSensors,
  type DragEndEvent,
} from '@dnd-kit/core'
import { arrayMove, SortableContext, sortableKeyboardCoordinates, verticalListSortingStrategy } from '@dnd-kit/sortable'
import { useState, type FC } from 'react'
import { SingleBlockEditor } from './SingleBlockEditor'
import { blockTypes, createBlock, type BlockType } from './BlockEditors'
import type { Block } from '../../lib/types'

interface BlockEditorProps {
  blocks: Block[]
  onChange: (blocks: Block[]) => void
}

export const BlockEditor: FC<BlockEditorProps> = ({ blocks, onChange }) => {
  const sensors = useSensors(
    useSensor(PointerSensor, { activationConstraint: { distance: 8 } }),
    useSensor(KeyboardSensor, { coordinateGetter: sortableKeyboardCoordinates })
  )

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event
    if (!over || active.id === over.id) return
    const oldIndex = blocks.findIndex((b) => b.id === active.id)
    const newIndex = blocks.findIndex((b) => b.id === over.id)
    if (oldIndex === -1 || newIndex === -1) return
    onChange(arrayMove(blocks, oldIndex, newIndex))
  }

  const updateBlock = (index: number, updated: Block) => {
    const next = [...blocks]
    next[index] = updated
    onChange(next)
  }

  const deleteBlock = (index: number) => {
    onChange(blocks.filter((_, i) => i !== index))
  }

  const duplicateBlock = (index: number) => {
    const copy = { ...blocks[index], id: crypto.randomUUID() }
    const next = [...blocks]
    next.splice(index + 1, 0, copy)
    onChange(next)
  }

  const addBlock = (type: BlockType, index: number) => {
    const newBlock = createBlock(type)
    const next = [...blocks]
    next.splice(index, 0, newBlock)
    onChange(next)
  }

  return (
    <DndContext sensors={sensors} collisionDetection={closestCenter} onDragEnd={handleDragEnd}>
      <SortableContext items={blocks.map((b) => b.id)} strategy={verticalListSortingStrategy}>
        <div className="space-y-4">
          {blocks.map((block, index) => (
            <SingleBlockEditor
              key={block.id}
              block={block}
              onChange={(b) => updateBlock(index, b)}
              onDelete={() => deleteBlock(index)}
              onDuplicate={() => duplicateBlock(index)}
              onAddBlock={(t) => addBlock(t, index + 1)}
            />
          ))}
          <AddBlockBar onAdd={(type) => addBlock(type, blocks.length)} />
        </div>
      </SortableContext>
    </DndContext>
  )
}

const AddBlockBar: FC<{ onAdd: (type: BlockType) => void }> = ({ onAdd }) => {
  const [open, setOpen] = useState(false)
  return (
    <div className="relative">
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        className="flex w-full items-center justify-center gap-2 rounded-xl border-2 border-dashed border-[#E2CFB5] py-4 text-sm text-[#8B6B4A] hover:border-[#C4956A] hover:bg-[#FFF9F1]"
      >
        <span>+ Add block</span>
      </button>
      {open && (
        <div className="absolute left-0 right-0 top-full z-10 mt-2 rounded-xl border border-[#E2CFB5] bg-white p-2 shadow-xl">
          {blockTypes.map(({ type, label }) => (
            <button
              key={type}
              type="button"
              onClick={() => {
                onAdd(type)
                setOpen(false)
              }}
              className="block w-full rounded-lg px-3 py-2 text-left text-sm text-[#5C4033] hover:bg-[#F5E6D3]"
            >
              {label}
            </button>
          ))}
        </div>
      )}
    </div>
  )
}
