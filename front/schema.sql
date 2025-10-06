-- 00000000000000_baseline.sql
BEGIN;

-- 0) 확장: gen_random_uuid()를 위해 필요
CREATE EXTENSION IF NOT EXISTS pgcrypto;

-- 1) 깨끗이 드롭 (순서 주의)
DROP TABLE IF EXISTS public.certifications CASCADE;
DROP TABLE IF EXISTS public.educations CASCADE;
DROP TABLE IF EXISTS public.awards CASCADE;
DROP TABLE IF EXISTS public.projects CASCADE;
DROP TABLE IF EXISTS public.users CASCADE;

-- 2) 스토리지 정책/버킷 정리
DROP POLICY IF EXISTS "Users can upload own files" ON storage.objects;
DROP POLICY IF EXISTS "Users can update own files" ON storage.objects;
DROP POLICY IF EXISTS "Users can delete own files" ON storage.objects;
DROP POLICY IF EXISTS "Public files are viewable by everyone" ON storage.objects;

DELETE FROM storage.objects WHERE bucket_id = 'uploads';
DELETE FROM storage.buckets WHERE id = 'uploads';

-- 3) 테이블 재생성 (auth.users는 외부 FK, NULL 허용)
CREATE TABLE public.users (
  _id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES auth.users(id) ON DELETE SET NULL,
  email TEXT UNIQUE NOT NULL,
  name TEXT NOT NULL,
  stacks TEXT[],
  description TEXT DEFAULT '자신을 자유롭게 표현해주세요.',
  profile_image TEXT DEFAULT NULL,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE public.projects (
  _id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES auth.users(id) ON DELETE SET NULL,
  title TEXT,
  role TEXT,
  start_date DATE,
  end_date DATE,
  description TEXT,
  author TEXT,  -- 과거 호환 필요하면 NOT NULL 빼는 게 편함
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE public.awards (
  _id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES auth.users(id) ON DELETE SET NULL,
  title TEXT,
  info TEXT,
  issuer TEXT,
  date DATE NOT NULL,
  author TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE public.educations (
  _id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES auth.users(id) ON DELETE SET NULL,
  title TEXT NOT NULL, -- 학교명
  major TEXT NOT NULL,
  grades INTEGER NOT NULL,
  start_date DATE NOT NULL,
  end_date DATE NOT NULL,
  author TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE public.certifications (
  _id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES auth.users(id) ON DELETE SET NULL,
  title TEXT NOT NULL,
  license INTEGER NOT NULL,
  issued_date DATE NOT NULL,
  issuer TEXT NOT NULL,
  langscore INTEGER,
  author TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- 3-1) FK/조회용 인덱스
CREATE INDEX IF NOT EXISTS idx_users_user_id ON public.users(user_id);
CREATE INDEX IF NOT EXISTS idx_projects_user_id ON public.projects(user_id);
CREATE INDEX IF NOT EXISTS idx_awards_user_id ON public.awards(user_id);
CREATE INDEX IF NOT EXISTS idx_educations_user_id ON public.educations(user_id);
CREATE INDEX IF NOT EXISTS idx_certifications_user_id ON public.certifications(user_id);

-- 4) 스토리지 버킷(멱등)
INSERT INTO storage.buckets (id, name, public)
VALUES ('uploads', 'uploads', true)
ON CONFLICT (id) DO NOTHING;

-- 5) updated_at 트리거
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER trg_users_updated_at BEFORE UPDATE ON public.users
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER trg_projects_updated_at BEFORE UPDATE ON public.projects
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER trg_awards_updated_at BEFORE UPDATE ON public.awards
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER trg_educations_updated_at BEFORE UPDATE ON public.educations
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER trg_certifications_updated_at BEFORE UPDATE ON public.certifications
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

-- 6) RLS 켜기
ALTER TABLE public.users ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.projects ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.awards ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.educations ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.certifications ENABLE ROW LEVEL SECURITY;

-- 7) RLS 정책
-- users
CREATE POLICY "Users can view own profile" ON public.users
  FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY "Users can update own profile" ON public.users
  FOR UPDATE USING (auth.uid() = user_id);
CREATE POLICY "Users can insert own profile" ON public.users
  FOR INSERT WITH CHECK (auth.uid() = user_id);

-- projects
CREATE POLICY "Users can view own projects" ON public.projects
  FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY "Users can insert own projects" ON public.projects
  FOR INSERT WITH CHECK (auth.uid() = user_id);
CREATE POLICY "Users can update own projects" ON public.projects
  FOR UPDATE USING (auth.uid() = user_id);
CREATE POLICY "Users can delete own projects" ON public.projects
  FOR DELETE USING (auth.uid() = user_id);

-- awards
CREATE POLICY "Users can view own awards" ON public.awards
  FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY "Users can insert own awards" ON public.awards
  FOR INSERT WITH CHECK (auth.uid() = user_id);
CREATE POLICY "Users can update own awards" ON public.awards
  FOR UPDATE USING (auth.uid() = user_id);
CREATE POLICY "Users can delete own awards" ON public.awards
  FOR DELETE USING (auth.uid() = user_id);

-- educations
CREATE POLICY "Users can view own educations" ON public.educations
  FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY "Users can insert own educations" ON public.educations
  FOR INSERT WITH CHECK (auth.uid() = user_id);
CREATE POLICY "Users can update own educations" ON public.educations
  FOR UPDATE USING (auth.uid() = user_id);
CREATE POLICY "Users can delete own educations" ON public.educations
  FOR DELETE USING (auth.uid() = user_id);

-- certifications
CREATE POLICY "Users can view own certifications" ON public.certifications
  FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY "Users can insert own certifications" ON public.certifications
  FOR INSERT WITH CHECK (auth.uid() = user_id);
CREATE POLICY "Users can update own certifications" ON public.certifications
  FOR UPDATE USING (auth.uid() = user_id);
CREATE POLICY "Users can delete own certifications" ON public.certifications
  FOR DELETE USING (auth.uid() = user_id);

-- storage
CREATE POLICY "Users can upload own files" ON storage.objects
  FOR INSERT WITH CHECK (auth.uid()::text = (storage.foldername(name))[1]);
CREATE POLICY "Users can update own files" ON storage.objects
  FOR UPDATE USING (auth.uid()::text = (storage.foldername(name))[1]);
CREATE POLICY "Users can delete own files" ON storage.objects
  FOR DELETE USING (auth.uid()::text = (storage.foldername(name))[1]);
CREATE POLICY "Public files are viewable by everyone" ON storage.objects
  FOR SELECT USING (bucket_id = 'uploads');

COMMIT;
