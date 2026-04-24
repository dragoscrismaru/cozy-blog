import { create } from 'zustand'
import type { Block } from './lib/types'
import {
  fetchDocuments,
  removeDocument,
  subscribeToDocuments,
  upsertDocument,
} from './lib/content-sync'

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
  isSyncing: boolean
  syncError: string | null
  initializeRemoteSync: () => Promise<void>
  subscribeToLiveUpdates: () => () => void
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

function hydrateFromRemoteDocs(docs: Array<{ id: string; type: string; data: unknown }>) {
  const state = loadState()
  const posts = docs
    .filter((d) => d.type === 'post')
    .map((d) => d.data as Post)
    .filter(Boolean)
  const pages = docs
    .filter((d) => d.type === 'page')
    .map((d) => d.data as Page)
    .filter(Boolean)
  const media = docs
    .filter((d) => d.type === 'media')
    .map((d) => d.data as MediaItem)
    .filter(Boolean)
  const settingsDoc = docs.find((d) => d.id === 'settings')
  return {
    posts: posts.length ? posts : state.posts,
    pages,
    media,
    settings: settingsDoc ? ({ ...defaultSettings, ...(settingsDoc.data as BlogSettings) }) : state.settings,
  }
}

export const useCozyStore = create<CozyState>((set, get) => ({
  ...loadState(),
  isSyncing: false,
  syncError: null,

  initializeRemoteSync: async () => {
    set({ isSyncing: true, syncError: null })
    try {
      const docs = await fetchDocuments()
      if (!docs) {
        set({ isSyncing: false })
        return
      }
      const next = hydrateFromRemoteDocs(docs)
      persist(next.posts, next.pages, next.media, next.settings)
      set({ ...next, isSyncing: false, syncError: null })
    } catch (error) {
      const message = error instanceof Error ? error.message : 'Failed to sync'
      set({ isSyncing: false, syncError: message })
    }
  },

  subscribeToLiveUpdates: () =>
    subscribeToDocuments(() => {
      void get().initializeRemoteSync()
    }),

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
    void upsertDocument({ id: `post:${post.id}`, type: 'post', data: post }).catch(() =>
      set({ syncError: 'Could not save post to Supabase' })
    )
  },

  deletePost: (id) => {
    set((state) => {
      const posts = state.posts.filter((p) => p.id !== id)
      persist(posts, state.pages, state.media, state.settings)
      return { ...state, posts }
    })
    void removeDocument(`post:${id}`).catch(() =>
      set({ syncError: 'Could not delete post from Supabase' })
    )
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
    void upsertDocument({ id: `page:${page.id}`, type: 'page', data: page }).catch(() =>
      set({ syncError: 'Could not save page to Supabase' })
    )
  },

  deletePage: (id) => {
    set((state) => {
      const pages = state.pages.filter((p) => p.id !== id)
      persist(state.posts, pages, state.media, state.settings)
      return { ...state, pages }
    })
    void removeDocument(`page:${id}`).catch(() =>
      set({ syncError: 'Could not delete page from Supabase' })
    )
  },

  addMedia: (item) => {
    set((state) => {
      const media = [...state.media, item]
      persist(state.posts, state.pages, media, state.settings)
      return { ...state, media }
    })
    void upsertDocument({ id: `media:${item.id}`, type: 'media', data: item }).catch(() =>
      set({ syncError: 'Could not save media to Supabase' })
    )
  },

  deleteMedia: (id) => {
    set((state) => {
      const media = state.media.filter((m) => m.id !== id)
      persist(state.posts, state.pages, media, state.settings)
      return { ...state, media }
    })
    void removeDocument(`media:${id}`).catch(() =>
      set({ syncError: 'Could not delete media from Supabase' })
    )
  },

  updateSettings: (patch) => {
    set((state) => {
      const settings = { ...state.settings, ...patch }
      persist(state.posts, state.pages, state.media, settings)
      return { ...state, settings }
    })
    void upsertDocument({
      id: 'settings',
      type: 'settings',
      data: { ...get().settings, ...patch },
    }).catch(() => set({ syncError: 'Could not save settings to Supabase' }))
  },
}))
