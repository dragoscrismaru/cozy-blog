export interface Block {
  id: string
  type: string
  data: Record<string, unknown>
}

export interface Content {
  blocks: Block[]
}

export interface PostStyle {
  backgroundColor: string
  accentColor: string
  fontFamily: string
  layout: 'single-column' | 'sidebar' | 'magazine'
  headerStyle: 'parallax' | 'fade' | 'static'
}

export interface Post {
  id: string
  title: string
  slug: string
  status: 'draft' | 'published'
  category: string
  tags: string[]
  excerpt: string
  coverImage: string | null
  content: Content
  style: PostStyle
  createdAt: string
  updatedAt: string
}
