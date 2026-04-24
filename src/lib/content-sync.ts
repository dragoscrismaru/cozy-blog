import { hasSupabaseConfig, supabase } from './supabase'

const TABLE = 'cozy_documents'

export type DocType = 'post' | 'page' | 'media' | 'settings'

export interface SyncDocument<T = unknown> {
  id: string
  type: DocType
  data: T
  updated_at?: string
}

export async function fetchDocuments() {
  if (!supabase) return null
  const { data, error } = await supabase
    .from(TABLE)
    .select('id, type, data, updated_at')
    .order('updated_at', { ascending: true })

  if (error) throw error
  return (data ?? []) as SyncDocument[]
}

export async function upsertDocument(doc: SyncDocument) {
  if (!supabase) return
  const { error } = await supabase.from(TABLE).upsert(doc, { onConflict: 'id' })
  if (error) throw error
}

export async function removeDocument(id: string) {
  if (!supabase) return
  const { error } = await supabase.from(TABLE).delete().eq('id', id)
  if (error) throw error
}

export function subscribeToDocuments(onChange: () => void) {
  if (!supabase || !hasSupabaseConfig) return () => {}
  const client = supabase
  const channel = client
    .channel('cozy-documents-live')
    .on(
      'postgres_changes',
      { event: '*', schema: 'public', table: TABLE },
      () => onChange()
    )
    .subscribe()

  return () => {
    void client.removeChannel(channel)
  }
}

