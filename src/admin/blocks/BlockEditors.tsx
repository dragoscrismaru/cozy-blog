import { TextBlockEditor } from './TextBlockEditor'

const blockTypes = [
  { type: 'text', label: 'Text' },
  { type: 'image', label: 'Image' },
  { type: 'quote', label: 'Quote' },
  { type: 'divider', label: 'Divider' },
  { type: 'spacer', label: 'Spacer' },
  { type: 'gallery', label: 'Gallery' },
  { type: 'two-column', label: 'Two Column' },
  { type: 'code', label: 'Code' },
  { type: 'cta', label: 'Call to Action' },
] as const

export type BlockType = (typeof blockTypes)[number]['type']

export { blockTypes, TextBlockEditor }

export function createBlock(type: BlockType): { id: string; type: BlockType; data: Record<string, unknown> } {
  const id = crypto.randomUUID()
  switch (type) {
    case 'text':
      return { id, type: 'text', data: { html: '<p></p>', alignment: 'left' } }
    case 'image':
      return { id, type: 'image', data: { src: '', alt: '', caption: '', alignment: 'center', fullWidth: false, rounded: true, shadow: true } }
    case 'quote':
      return { id, type: 'quote', data: { text: '', author: '', style: 'decorative-marks', backgroundColor: null } }
    case 'divider':
      return { id, type: 'divider', data: { style: 'ornamental', color: '#C4956A', width: '50%' } }
    case 'spacer':
      return { id, type: 'spacer', data: { height: 48 } }
    case 'gallery':
      return { id, type: 'gallery', data: { images: [], layout: 'grid', columns: 3, gap: 8 } }
    case 'two-column':
      return { id, type: 'two-column', data: { ratio: '60/40', left: { blocks: [] }, right: { blocks: [] } } }
    case 'code':
      return { id, type: 'code', data: { code: '', language: 'javascript', theme: 'dark' } }
    case 'cta':
      return { id, type: 'cta', data: { heading: '', description: '', buttonText: 'Learn more', buttonLink: '/', buttonColor: '#D4A843', backgroundColor: '#F5E6D3', alignment: 'center' } }
    default:
      return { id, type: 'text', data: { html: '<p></p>', alignment: 'left' } }
  }
}
