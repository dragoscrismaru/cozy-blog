import { create } from 'zustand'
import type { Block } from './lib/types'

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
  content: { blocks: Block[] }
  style: PostStyle
  createdAt: string
  updatedAt: string
}

export interface PageStyle {
  backgroundColor: string
  accentColor: string
  fontFamily: string
}

export interface Page {
  id: string
  title: string
  slug: string
  content: { blocks: Block[] }
  style: PageStyle
  createdAt: string
  updatedAt: string
}

export interface MediaItem {
  id: string
  name: string
  size: number
  width?: number
  height?: number
  createdAt: string
  dataUrl: string
  collection?: string
}

export interface BlogSettings {
  name: string
  tagline: string
  globalBackground: string
  globalAccent: string
  bodyFont: string
  headingFont: string
}

interface CozyState {
  posts: Post[]
  pages: Page[]
  media: MediaItem[]
  settings: BlogSettings
  upsertPost: (post: Omit<Post, 'createdAt' | 'updatedAt'>) => void
  deletePost: (id: string) => void
  upsertPage: (page: Omit<Page, 'createdAt' | 'updatedAt'>) => void
  deletePage: (id: string) => void
  addMedia: (item: MediaItem) => void
  deleteMedia: (id: string) => void
  updateSettings: (settings: Partial<BlogSettings>) => void
}

const STORAGE_KEY = 'my-cozy-space-state-v3'

const seedPost: Post = {
  id: crypto.randomUUID(),
  title: 'Welcome to My Cozy Space',
  slug: 'welcome-to-my-cozy-space',
  status: 'published',
  category: 'thoughts',
  tags: ['welcome'],
  excerpt: 'A warm welcome and an invitation to slow down.',
  coverImage: null,
  content: {
    blocks: [
      {
        id: crypto.randomUUID(),
        type: 'text',
        data: {
          html: '<p>Hello! This is my little corner of the internet — a place for slow thoughts and tender stories.</p>',
          alignment: 'left',
        },
      },
      {
        id: crypto.randomUUID(),
        type: 'quote',
        data: {
          text: 'Brew something warm, curl up, and stay for a while.',
          author: '— Me',
          style: 'decorative-marks',
          backgroundColor: null,
        },
      },
    ],
  },
  style: {
    backgroundColor: '#FAF3E0',
    accentColor: '#C4956A',
    fontFamily: 'Lora',
    layout: 'single-column',
    headerStyle: 'static',
  },
  createdAt: new Date().toISOString(),
  updatedAt: new Date().toISOString(),
}

const defaultSettings: BlogSettings = {
  name: 'My Cozy Space',
  tagline: 'Essays, stories & quiet reflections for slow mornings.',
  globalBackground: '#FAF3E0',
  globalAccent: '#C4956A',
  bodyFont: 'Lora',
  headingFont: 'Lora',
}

function loadState(): {
  posts: Post[]
  pages: Page[]
  media: MediaItem[]
  settings: BlogSettings
} {
  if (typeof window === 'undefined') {
    return { posts: [seedPost], pages: [], media: [], settings: defaultSettings }
  }
  try {
    let raw = window.localStorage.getItem(STORAGE_KEY)
    if (!raw) {
      const v2 = window.localStorage.getItem('my-cozy-space-state-v2')
      if (v2) {
        raw = v2
        window.localStorage.removeItem('my-cozy-space-state-v2')
      }
    }
    if (!raw) return { posts: [seedPost], pages: [], media: [], settings: defaultSettings }
    const parsed = JSON.parse(raw) as {
      posts?: Post[]
      pages?: Page[]
      media?: MediaItem[]
      settings?: Partial<BlogSettings>
    }
    const posts = parsed.posts?.length ? parsed.posts : [seedPost]
    return {
      posts,
      pages: parsed.pages ?? [],
      media: parsed.media ?? [],
      settings: { ...defaultSettings, ...parsed.settings },
    }
  } catch {
    return { posts: [seedPost], pages: [], media: [], settings: defaultSettings }
  }
}

function persist(
  posts: Post[],
  pages: Page[],
  media: MediaItem[],
  settings: BlogSettings
) {
  if (typeof window !== 'undefined') {
    window.localStorage.setItem(
      STORAGE_KEY,
      JSON.stringify({ posts, pages, media, settings })
    )
  }
}

export const useCozyStore = create<CozyState>((set, get) => ({
  ...loadState(),

  upsertPost: (postInput) => {
    const now = new Date().toISOString()
    const existing = get().posts.find((p) => p.id === postInput.id)
    const post: Post = {
      ...postInput,
      createdAt: existing?.createdAt ?? now,
      updatedAt: now,
    }
    set((state) => {
      const posts = existing
        ? state.posts.map((p) => (p.id === post.id ? post : p))
        : [...state.posts, post]
      persist(posts, state.pages, state.media, state.settings)
      return { ...state, posts }
    })
  },

  deletePost: (id) => {
    set((state) => {
      const posts = state.posts.filter((p) => p.id !== id)
      persist(posts, state.pages, state.media, state.settings)
      return { ...state, posts }
    })
  },

  upsertPage: (pageInput) => {
    const now = new Date().toISOString()
    const existing = get().pages.find((p) => p.id === pageInput.id)
    const page: Page = {
      ...pageInput,
      createdAt: existing?.createdAt ?? now,
      updatedAt: now,
    }
    set((state) => {
      const pages = existing
        ? state.pages.map((p) => (p.id === page.id ? page : p))
        : [...state.pages, page]
      persist(state.posts, pages, state.media, state.settings)
      return { ...state, pages }
    })
  },

  deletePage: (id) => {
    set((state) => {
      const pages = state.pages.filter((p) => p.id !== id)
      persist(state.posts, pages, state.media, state.settings)
      return { ...state, pages }
    })
  },

  addMedia: (item) => {
    set((state) => {
      const media = [...state.media, item]
      persist(state.posts, state.pages, media, state.settings)
      return { ...state, media }
    })
  },

  deleteMedia: (id) => {
    set((state) => {
      const media = state.media.filter((m) => m.id !== id)
      persist(state.posts, state.pages, media, state.settings)
      return { ...state, media }
    })
  },

  updateSettings: (patch) => {
    set((state) => {
      const settings = { ...state.settings, ...patch }
      persist(state.posts, state.pages, state.media, settings)
      return { ...state, settings }
    })
  },
}))
