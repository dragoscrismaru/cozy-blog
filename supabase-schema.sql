-- Run this in your Supabase project: SQL Editor → New query → paste → Run

CREATE TABLE IF NOT EXISTS cozy_documents (
  id          TEXT        PRIMARY KEY,
  type        TEXT        NOT NULL,
  data        JSONB       NOT NULL,
  updated_at  TIMESTAMPTZ DEFAULT NOW()
);

-- Auto-update updated_at on every UPDATE
CREATE OR REPLACE FUNCTION _set_updated_at()
RETURNS TRIGGER LANGUAGE plpgsql AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$;

DROP TRIGGER IF EXISTS trg_cozy_documents_updated_at ON cozy_documents;
CREATE TRIGGER trg_cozy_documents_updated_at
  BEFORE UPDATE ON cozy_documents
  FOR EACH ROW EXECUTE FUNCTION _set_updated_at();

-- Row Level Security — fully open (personal blog, no auth needed)
ALTER TABLE cozy_documents ENABLE ROW LEVEL SECURITY;

CREATE POLICY "anon select" ON cozy_documents FOR SELECT TO anon USING (true);
CREATE POLICY "anon insert" ON cozy_documents FOR INSERT TO anon WITH CHECK (true);
CREATE POLICY "anon update" ON cozy_documents FOR UPDATE TO anon USING (true);
CREATE POLICY "anon delete" ON cozy_documents FOR DELETE TO anon USING (true);

-- Enable Realtime (optional — lets live-updates work across tabs)
ALTER PUBLICATION supabase_realtime ADD TABLE cozy_documents;
