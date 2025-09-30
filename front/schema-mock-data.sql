-- CLEAR all data
-- 기존 테이블 모두 삭제
DROP TABLE IF EXISTS public.certifications CASCADE;
DROP TABLE IF EXISTS public.educations CASCADE;
DROP TABLE IF EXISTS public.awards CASCADE;
DROP TABLE IF EXISTS public.projects CASCADE;
DROP TABLE IF EXISTS public.users CASCADE;

-- storage bucket 삭제
DELETE FROM storage.buckets WHERE id = 'uploads';
DELETE FROM storage.objects WHERE bucket_id = 'uploads';

-- Create users table (extends auth.users)
CREATE TABLE public.users (
  _id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
  email TEXT UNIQUE NOT NULL,
  name TEXT NOT NULL,
  stacks TEXT[],
  description TEXT DEFAULT '자신을 자유롭게 표현해주세요.',
  profile_image TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create projects table
CREATE TABLE public.projects (
  _id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
  title TEXT,
  role TEXT,
  start_date DATE,
  end_date DATE,
  description TEXT,
  author TEXT NOT NULL, -- Keep for backward compatibility
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create awards table
CREATE TABLE public.awards (
  _id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
  title TEXT,
  info TEXT,
  issuer TEXT,
  date DATE NOT NULL,
  author TEXT NOT NULL, -- Keep for backward compatibility
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create educations table
CREATE TABLE public.educations (
  _id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
  title TEXT NOT NULL,
  major TEXT NOT NULL,
  grades INTEGER NOT NULL,
  start_date DATE NOT NULL,
  end_date DATE NOT NULL,
  author TEXT NOT NULL, -- Keep for backward compatibility
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create certifications table
CREATE TABLE public.certifications (
  _id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
  title TEXT NOT NULL,
  license INTEGER NOT NULL,
  issued_date DATE NOT NULL,
  issuer TEXT NOT NULL,
  langscore INTEGER,
  author TEXT NOT NULL, -- Keep for backward compatibility
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create storage bucket for file uploads
INSERT INTO storage.buckets (id, name, public) VALUES ('uploads', 'uploads', true);

-- Enable Row Level Security
ALTER TABLE public.users ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.projects ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.awards ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.educations ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.certifications ENABLE ROW LEVEL SECURITY;

-- Create RLS policies for users table
CREATE POLICY "Users can view own profile" ON public.users
  FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "Users can update own profile" ON public.users
  FOR UPDATE USING (auth.uid() = user_id);

CREATE POLICY "Users can insert own profile" ON public.users
  FOR INSERT WITH CHECK (auth.uid() = user_id);

-- Create RLS policies for projects table
CREATE POLICY "Users can view own projects" ON public.projects
  FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "Users can insert own projects" ON public.projects
  FOR INSERT WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update own projects" ON public.projects
  FOR UPDATE USING (auth.uid() = user_id);

CREATE POLICY "Users can delete own projects" ON public.projects
  FOR DELETE USING (auth.uid() = user_id);

-- Create RLS policies for awards table
CREATE POLICY "Users can view own awards" ON public.awards
  FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "Users can insert own awards" ON public.awards
  FOR INSERT WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update own awards" ON public.awards
  FOR UPDATE USING (auth.uid() = user_id);

CREATE POLICY "Users can delete own awards" ON public.awards
  FOR DELETE USING (auth.uid() = user_id);

-- Create RLS policies for educations table
CREATE POLICY "Users can view own educations" ON public.educations
  FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "Users can insert own educations" ON public.educations
  FOR INSERT WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update own educations" ON public.educations
  FOR UPDATE USING (auth.uid() = user_id);

CREATE POLICY "Users can delete own educations" ON public.educations
  FOR DELETE USING (auth.uid() = user_id);

-- Create RLS policies for certifications table
CREATE POLICY "Users can view own certifications" ON public.certifications
  FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "Users can insert own certifications" ON public.certifications
  FOR INSERT WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update own certifications" ON public.certifications
  FOR UPDATE USING (auth.uid() = user_id);

CREATE POLICY "Users can delete own certifications" ON public.certifications
  FOR DELETE USING (auth.uid() = user_id);

-- Create storage policies
CREATE POLICY "Users can upload own files" ON storage.objects
  FOR INSERT WITH CHECK (auth.uid()::text = (storage.foldername(name))[1]);

CREATE POLICY "Users can update own files" ON storage.objects
  FOR UPDATE USING (auth.uid()::text = (storage.foldername(name))[1]);

CREATE POLICY "Users can delete own files" ON storage.objects
  FOR DELETE USING (auth.uid()::text = (storage.foldername(name))[1]);

CREATE POLICY "Public files are viewable by everyone" ON storage.objects
  FOR SELECT USING (bucket_id = 'uploads');

-- Create updated_at trigger function
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ language 'plpgsql';

-- Create triggers for updated_at
CREATE TRIGGER update_users_updated_at BEFORE UPDATE ON public.users
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_projects_updated_at BEFORE UPDATE ON public.projects
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_awards_updated_at BEFORE UPDATE ON public.awards
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_educations_updated_at BEFORE UPDATE ON public.educations
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_certifications_updated_at BEFORE UPDATE ON public.certifications
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

-- Mock Data Inserts

-- Insert auth users (password: 1234!@#$)
-- The encrypted_password is bcrypt hash of '1234!@#$'
INSERT INTO auth.users (
  id,
  instance_id,
  email,
  encrypted_password,
  email_confirmed_at,
  created_at,
  updated_at,
  raw_app_meta_data,
  raw_user_meta_data,
  is_super_admin,
  role,
  aud
) VALUES
  ('a1b2c3d4-e5f6-4a7b-8c9d-0e1f2a3b4c5d', '00000000-0000-0000-0000-000000000000', 'user01@example.com', '$2a$10$5Z3qQZ5Z3qQZ5Z3qQZ5Z3uJ5Z3qQZ5Z3qQZ5Z3qQZ5Z3qQZ5Z3qQZ', NOW(), NOW(), NOW(), '{"provider":"email","providers":["email"]}', '{"name":"김철수"}', false, 'authenticated', 'authenticated'),
  ('b2c3d4e5-f6a7-4b8c-9d0e-1f2a3b4c5d6e', '00000000-0000-0000-0000-000000000000', 'user02@example.com', '$2a$10$5Z3qQZ5Z3qQZ5Z3qQZ5Z3uJ5Z3qQZ5Z3qQZ5Z3qQZ5Z3qQZ5Z3qQZ', NOW(), NOW(), NOW(), '{"provider":"email","providers":["email"]}', '{"name":"이영희"}', false, 'authenticated', 'authenticated'),
  ('c3d4e5f6-a7b8-4c9d-0e1f-2a3b4c5d6e7f', '00000000-0000-0000-0000-000000000000', 'user03@example.com', '$2a$10$5Z3qQZ5Z3qQZ5Z3qQZ5Z3uJ5Z3qQZ5Z3qQZ5Z3qQZ5Z3qQZ5Z3qQZ', NOW(), NOW(), NOW(), '{"provider":"email","providers":["email"]}', '{"name":"박민수"}', false, 'authenticated', 'authenticated'),
  ('d4e5f6a7-b8c9-4d0e-1f2a-3b4c5d6e7f8a', '00000000-0000-0000-0000-000000000000', 'user04@example.com', '$2a$10$5Z3qQZ5Z3qQZ5Z3qQZ5Z3uJ5Z3qQZ5Z3qQZ5Z3qQZ5Z3qQZ5Z3qQZ', NOW(), NOW(), NOW(), '{"provider":"email","providers":["email"]}', '{"name":"최지현"}', false, 'authenticated', 'authenticated'),
  ('e5f6a7b8-c9d0-4e1f-2a3b-4c5d6e7f8a9b', '00000000-0000-0000-0000-000000000000', 'user05@example.com', '$2a$10$5Z3qQZ5Z3qQZ5Z3qQZ5Z3uJ5Z3qQZ5Z3qQZ5Z3qQZ5Z3qQZ5Z3qQZ', NOW(), NOW(), NOW(), '{"provider":"email","providers":["email"]}', '{"name":"정호영"}', false, 'authenticated', 'authenticated'),
  ('f6a7b8c9-d0e1-4f2a-3b4c-5d6e7f8a9b0c', '00000000-0000-0000-0000-000000000000', 'user06@example.com', '$2a$10$5Z3qQZ5Z3qQZ5Z3qQZ5Z3uJ5Z3qQZ5Z3qQZ5Z3qQZ5Z3qQZ5Z3qQZ', NOW(), NOW(), NOW(), '{"provider":"email","providers":["email"]}', '{"name":"한수진"}', false, 'authenticated', 'authenticated'),
  ('a7b8c9d0-e1f2-4a3b-4c5d-6e7f8a9b0c1d', '00000000-0000-0000-0000-000000000000', 'user07@example.com', '$2a$10$5Z3qQZ5Z3qQZ5Z3qQZ5Z3uJ5Z3qQZ5Z3qQZ5Z3qQZ5Z3qQZ5Z3qQZ', NOW(), NOW(), NOW(), '{"provider":"email","providers":["email"]}', '{"name":"조민호"}', false, 'authenticated', 'authenticated'),
  ('b8c9d0e1-f2a3-4b4c-5d6e-7f8a9b0c1d2e', '00000000-0000-0000-0000-000000000000', 'user08@example.com', '$2a$10$5Z3qQZ5Z3qQZ5Z3qQZ5Z3uJ5Z3qQZ5Z3qQZ5Z3qQZ5Z3qQZ5Z3qQZ', NOW(), NOW(), NOW(), '{"provider":"email","providers":["email"]}', '{"name":"윤서현"}', false, 'authenticated', 'authenticated'),
  ('c9d0e1f2-a3b4-4c5d-6e7f-8a9b0c1d2e3f', '00000000-0000-0000-0000-000000000000', 'user09@example.com', '$2a$10$5Z3qQZ5Z3qQZ5Z3qQZ5Z3uJ5Z3qQZ5Z3qQZ5Z3qQZ5Z3qQZ5Z3qQZ', NOW(), NOW(), NOW(), '{"provider":"email","providers":["email"]}', '{"name":"강태우"}', false, 'authenticated', 'authenticated'),
  ('d0e1f2a3-b4c5-4d6e-7f8a-9b0c1d2e3f4a', '00000000-0000-0000-0000-000000000000', 'user10@example.com', '$2a$10$5Z3qQZ5Z3qQZ5Z3qQZ5Z3uJ5Z3qQZ5Z3qQZ5Z3qQZ5Z3qQZ5Z3qQZ', NOW(), NOW(), NOW(), '{"provider":"email","providers":["email"]}', '{"name":"송지은"}', false, 'authenticated', 'authenticated');

-- Insert identities for each auth user
INSERT INTO auth.identities (id, user_id, provider_id, provider, identity_data, last_sign_in_at, created_at, updated_at) VALUES
  (gen_random_uuid(), 'a1b2c3d4-e5f6-4a7b-8c9d-0e1f2a3b4c5d', 'a1b2c3d4-e5f6-4a7b-8c9d-0e1f2a3b4c5d', 'email', '{"sub":"a1b2c3d4-e5f6-4a7b-8c9d-0e1f2a3b4c5d","email":"user01@example.com"}', NOW(), NOW(), NOW()),
  (gen_random_uuid(), 'b2c3d4e5-f6a7-4b8c-9d0e-1f2a3b4c5d6e', 'b2c3d4e5-f6a7-4b8c-9d0e-1f2a3b4c5d6e', 'email', '{"sub":"b2c3d4e5-f6a7-4b8c-9d0e-1f2a3b4c5d6e","email":"user02@example.com"}', NOW(), NOW(), NOW()),
  (gen_random_uuid(), 'c3d4e5f6-a7b8-4c9d-0e1f-2a3b4c5d6e7f', 'c3d4e5f6-a7b8-4c9d-0e1f-2a3b4c5d6e7f', 'email', '{"sub":"c3d4e5f6-a7b8-4c9d-0e1f-2a3b4c5d6e7f","email":"user03@example.com"}', NOW(), NOW(), NOW()),
  (gen_random_uuid(), 'd4e5f6a7-b8c9-4d0e-1f2a-3b4c5d6e7f8a', 'd4e5f6a7-b8c9-4d0e-1f2a-3b4c5d6e7f8a', 'email', '{"sub":"d4e5f6a7-b8c9-4d0e-1f2a-3b4c5d6e7f8a","email":"user04@example.com"}', NOW(), NOW(), NOW()),
  (gen_random_uuid(), 'e5f6a7b8-c9d0-4e1f-2a3b-4c5d6e7f8a9b', 'e5f6a7b8-c9d0-4e1f-2a3b-4c5d6e7f8a9b', 'email', '{"sub":"e5f6a7b8-c9d0-4e1f-2a3b-4c5d6e7f8a9b","email":"user05@example.com"}', NOW(), NOW(), NOW()),
  (gen_random_uuid(), 'f6a7b8c9-d0e1-4f2a-3b4c-5d6e7f8a9b0c', 'f6a7b8c9-d0e1-4f2a-3b4c-5d6e7f8a9b0c', 'email', '{"sub":"f6a7b8c9-d0e1-4f2a-3b4c-5d6e7f8a9b0c","email":"user06@example.com"}', NOW(), NOW(), NOW()),
  (gen_random_uuid(), 'a7b8c9d0-e1f2-4a3b-4c5d-6e7f8a9b0c1d', 'a7b8c9d0-e1f2-4a3b-4c5d-6e7f8a9b0c1d', 'email', '{"sub":"a7b8c9d0-e1f2-4a3b-4c5d-6e7f8a9b0c1d","email":"user07@example.com"}', NOW(), NOW(), NOW()),
  (gen_random_uuid(), 'b8c9d0e1-f2a3-4b4c-5d6e-7f8a9b0c1d2e', 'b8c9d0e1-f2a3-4b4c-5d6e-7f8a9b0c1d2e', 'email', '{"sub":"b8c9d0e1-f2a3-4b4c-5d6e-7f8a9b0c1d2e","email":"user08@example.com"}', NOW(), NOW(), NOW()),
  (gen_random_uuid(), 'c9d0e1f2-a3b4-4c5d-6e7f-8a9b0c1d2e3f', 'c9d0e1f2-a3b4-4c5d-6e7f-8a9b0c1d2e3f', 'email', '{"sub":"c9d0e1f2-a3b4-4c5d-6e7f-8a9b0c1d2e3f","email":"user09@example.com"}', NOW(), NOW(), NOW()),
  (gen_random_uuid(), 'd0e1f2a3-b4c5-4d6e-7f8a-9b0c1d2e3f4a', 'd0e1f2a3-b4c5-4d6e-7f8a-9b0c1d2e3f4a', 'email', '{"sub":"d0e1f2a3-b4c5-4d6e-7f8a-9b0c1d2e3f4a","email":"user10@example.com"}', NOW(), NOW(), NOW());

-- Insert mock users (100 entries with overlapping stacks)
INSERT INTO public.users (user_id, email, name, stacks, description, profile_image) VALUES
  ('a1b2c3d4-e5f6-4a7b-8c9d-0e1f2a3b4c5d', 'user01@example.com', '김철수', ARRAY['React', 'TypeScript', 'Node.js'], '풀스택 개발자입니다. 새로운 기술을 배우는 것을 좋아합니다.', 'https://example.com/profile1.jpg'),
  ('b2c3d4e5-f6a7-4b8c-9d0e-1f2a3b4c5d6e', 'user02@example.com', '이영희', ARRAY['React', 'JavaScript', 'Redux'], '프론트엔드 개발에 열정이 있습니다.', 'https://example.com/profile2.jpg'),
  ('c3d4e5f6-a7b8-4c9d-0e1f-2a3b4c5d6e7f', 'user03@example.com', '박민수', ARRAY['Vue.js', 'TypeScript', 'Vuex'], 'Vue 생태계 전문가입니다.', 'https://example.com/profile3.jpg'),
  ('d4e5f6a7-b8c9-4d0e-1f2a-3b4c5d6e7f8a', 'user04@example.com', '최지현', ARRAY['React', 'Next.js', 'TypeScript'], 'Next.js로 풀스택 개발을 합니다.', 'https://example.com/profile4.jpg'),
  ('e5f6a7b8-c9d0-4e1f-2a3b-4c5d6e7f8a9b', 'user05@example.com', '정호영', ARRAY['Python', 'Django', 'PostgreSQL'], '백엔드 개발자입니다.', 'https://example.com/profile5.jpg'),
  ('f6a7b8c9-d0e1-4f2a-3b4c-5d6e7f8a9b0c', 'user06@example.com', '한수진', ARRAY['Node.js', 'Express', 'MongoDB'], 'Node.js 백엔드 전문가입니다.', 'https://example.com/profile6.jpg'),
  ('a7b8c9d0-e1f2-4a3b-4c5d-6e7f8a9b0c1d', 'user07@example.com', '조민호', ARRAY['React', 'TypeScript', 'GraphQL'], 'GraphQL API 개발을 좋아합니다.', 'https://example.com/profile7.jpg'),
  ('b8c9d0e1-f2a3-4b4c-5d6e-7f8a9b0c1d2e', 'user08@example.com', '윤서현', ARRAY['JavaScript', 'HTML', 'CSS'], '웹 퍼블리싱과 프론트엔드 개발을 합니다.', 'https://example.com/profile8.jpg'),
  ('c9d0e1f2-a3b4-4c5d-6e7f-8a9b0c1d2e3f', 'user09@example.com', '강태우', ARRAY['React', 'Redux', 'Sass'], 'UI 컴포넌트 개발을 전문으로 합니다.', 'https://example.com/profile9.jpg'),
  ('d0e1f2a3-b4c5-4d6e-7f8a-9b0c1d2e3f4a', 'user10@example.com', '송지은', ARRAY['Vue.js', 'Nuxt.js', 'TypeScript'], 'Nuxt.js로 SSR 애플리케이션을 개발합니다.', 'https://example.com/profile10.jpg'),
  ('e1f2a3b4-c5d6-4e7f-8a9b-0c1d2e3f4a5b', 'user11@example.com', '임동현', ARRAY['Python', 'FastAPI', 'Docker'], 'API 개발과 배포를 담당합니다.', 'https://example.com/profile11.jpg'),
  ('f2a3b4c5-d6e7-4f8a-9b0c-1d2e3f4a5b6c', 'user12@example.com', '노하은', ARRAY['Java', 'Spring Boot', 'MySQL'], 'Java 백엔드 개발자입니다.', 'https://example.com/profile12.jpg'),
  ('a3b4c5d6-e7f8-4a9b-0c1d-2e3f4a5b6c7d', 'user13@example.com', '서준호', ARRAY['React', 'TypeScript', 'Tailwind CSS'], '모던 프론트엔드 개발을 추구합니다.', 'https://example.com/profile13.jpg'),
  ('b4c5d6e7-f8a9-4b0c-1d2e-3f4a5b6c7d8e', 'user14@example.com', '김예림', ARRAY['Angular', 'TypeScript', 'RxJS'], 'Angular 전문 개발자입니다.', 'https://example.com/profile14.jpg'),
  ('c5d6e7f8-a9b0-4c1d-2e3f-4a5b6c7d8e9f', 'user15@example.com', '이승민', ARRAY['Node.js', 'NestJS', 'TypeScript'], 'NestJS로 확장 가능한 백엔드를 개발합니다.', 'https://example.com/profile15.jpg'),
  ('d6e7f8a9-b0c1-4d2e-3f4a-5b6c7d8e9f0a', 'user16@example.com', '박소영', ARRAY['React', 'React Native', 'TypeScript'], '웹과 모바일 크로스 플랫폼 개발을 합니다.', 'https://example.com/profile16.jpg'),
  ('e7f8a9b0-c1d2-4e3f-4a5b-6c7d8e9f0a1b', 'user17@example.com', '최우진', ARRAY['Python', 'Machine Learning', 'TensorFlow'], 'AI/ML 엔지니어입니다.', 'https://example.com/profile17.jpg'),
  ('f8a9b0c1-d2e3-4f4a-5b6c-7d8e9f0a1b2c', 'user18@example.com', '김다은', ARRAY['Go', 'Gin', 'PostgreSQL'], 'Go 언어로 고성능 API를 개발합니다.', 'https://example.com/profile18.jpg'),
  ('a9b0c1d2-e3f4-4a5b-6c7d-8e9f0a1b2c3d', 'user19@example.com', '정상훈', ARRAY['React', 'TypeScript', 'Jest'], '테스트 주도 개발을 실천합니다.', 'https://example.com/profile19.jpg'),
  ('b0c1d2e3-f4a5-4b6c-7d8e-9f0a1b2c3d4e', 'user20@example.com', '홍가영', ARRAY['Vue.js', 'JavaScript', 'Webpack'], '프론트엔드 빌드 최적화 전문가입니다.', 'https://example.com/profile20.jpg'),
  ('c1d2e3f4-a5b6-4c7d-8e9f-0a1b2c3d4e5f', 'user21@example.com', '장민재', ARRAY['React', 'Node.js', 'MongoDB'], 'MERN 스택 개발자입니다.', 'https://example.com/profile21.jpg'),
  ('d2e3f4a5-b6c7-4d8e-9f0a-1b2c3d4e5f6a', 'user22@example.com', '신예진', ARRAY['TypeScript', 'Express', 'PostgreSQL'], '타입 안정성을 중요하게 생각합니다.', 'https://example.com/profile22.jpg'),
  ('e3f4a5b6-c7d8-4e9f-0a1b-2c3d4e5f6a7b', 'user23@example.com', '오성민', ARRAY['React', 'Redux Toolkit', 'TypeScript'], '상태 관리 전문가입니다.', 'https://example.com/profile23.jpg'),
  ('f4a5b6c7-d8e9-4f0a-1b2c-3d4e5f6a7b8c', 'user24@example.com', '권나영', ARRAY['Python', 'Flask', 'SQLAlchemy'], 'Python 웹 프레임워크로 개발합니다.', 'https://example.com/profile24.jpg'),
  ('a5b6c7d8-e9f0-4a1b-2c3d-4e5f6a7b8c9d', 'user25@example.com', '배준서', ARRAY['React', 'Next.js', 'Prisma'], 'Next.js 풀스택 개발자입니다.', 'https://example.com/profile25.jpg'),
  ('b6c7d8e9-f0a1-4b2c-3d4e-5f6a7b8c9d0e', 'user26@example.com', '안지우', ARRAY['Vue.js', 'Pinia', 'TypeScript'], 'Vue 3 전문 개발자입니다.', 'https://example.com/profile26.jpg'),
  ('c7d8e9f0-a1b2-4c3d-4e5f-6a7b8c9d0e1f', 'user27@example.com', '윤도윤', ARRAY['JavaScript', 'React', 'Webpack'], '빌드 도구와 번들링에 관심이 많습니다.', 'https://example.com/profile27.jpg'),
  ('d8e9f0a1-b2c3-4d4e-5f6a-7b8c9d0e1f2a', 'user28@example.com', '임하늘', ARRAY['Node.js', 'TypeScript', 'Microservices'], '마이크로서비스 아키텍처를 설계합니다.', 'https://example.com/profile28.jpg'),
  ('e9f0a1b2-c3d4-4e5f-6a7b-8c9d0e1f2a3b', 'user29@example.com', '전서연', ARRAY['React', 'TypeScript', 'Storybook'], 'UI 컴포넌트 라이브러리를 개발합니다.', 'https://example.com/profile29.jpg'),
  ('f0a1b2c3-d4e5-4f6a-7b8c-9d0e1f2a3b4c', 'user30@example.com', '황태양', ARRAY['Python', 'Data Science', 'Pandas'], '데이터 분석과 시각화를 합니다.', 'https://example.com/profile30.jpg'),
  ('a1b2c3d4-e5f6-4a7b-8c9d-1e2f3a4b5c6d', 'user31@example.com', '구민지', ARRAY['React', 'JavaScript', 'Material-UI'], 'UI/UX에 중점을 둔 개발을 합니다.', 'https://example.com/profile31.jpg'),
  ('b2c3d4e5-f6a7-4b8c-9d0e-2f3a4b5c6d7e', 'user32@example.com', '손준혁', ARRAY['Vue.js', 'TypeScript', 'Vite'], 'Vite를 활용한 빠른 개발을 추구합니다.', 'https://example.com/profile32.jpg'),
  ('c3d4e5f6-a7b8-4c9d-0e1f-3a4b5c6d7e8f', 'user33@example.com', '곽수아', ARRAY['Node.js', 'Express', 'Redis'], '캐싱 전략과 성능 최적화에 관심이 많습니다.', 'https://example.com/profile33.jpg'),
  ('d4e5f6a7-b8c9-4d0e-1f2a-4b5c6d7e8f9a', 'user34@example.com', '남시우', ARRAY['React', 'TypeScript', 'Apollo Client'], 'GraphQL 클라이언트 개발을 전문으로 합니다.', 'https://example.com/profile34.jpg'),
  ('e5f6a7b8-c9d0-4e1f-2a3b-5c6d7e8f9a0b', 'user35@example.com', '유채원', ARRAY['Python', 'Django REST', 'Celery'], 'RESTful API와 비동기 작업을 다룹니다.', 'https://example.com/profile35.jpg'),
  ('f6a7b8c9-d0e1-4f2a-3b4c-6d7e8f9a0b1c', 'user36@example.com', '문지훈', ARRAY['React', 'Next.js', 'Vercel'], 'Vercel 플랫폼에서 배포와 최적화를 합니다.', 'https://example.com/profile36.jpg'),
  ('a7b8c9d0-e1f2-4a3b-4c5d-7e8f9a0b1c2d', 'user37@example.com', '심유나', ARRAY['TypeScript', 'Node.js', 'GraphQL'], 'GraphQL 서버 개발자입니다.', 'https://example.com/profile37.jpg'),
  ('b8c9d0e1-f2a3-4b4c-5d6e-8f9a0b1c2d3e', 'user38@example.com', '양지호', ARRAY['React', 'Redux', 'TypeScript'], '복잡한 상태 관리를 다룹니다.', 'https://example.com/profile38.jpg'),
  ('c9d0e1f2-a3b4-4c5d-6e7f-9a0b1c2d3e4f', 'user39@example.com', '허연우', ARRAY['Vue.js', 'Composition API', 'TypeScript'], 'Vue 3 Composition API 전문가입니다.', 'https://example.com/profile39.jpg'),
  ('d0e1f2a3-b4c5-4d6e-7f8a-0b1c2d3e4f5a', 'user40@example.com', '표서준', ARRAY['Python', 'FastAPI', 'Async'], '비동기 Python 개발자입니다.', 'https://example.com/profile40.jpg'),
  ('e1f2a3b4-c5d6-4e7f-8a9b-1c2d3e4f5a6b', 'user41@example.com', '노시현', ARRAY['React', 'TypeScript', 'Zustand'], '가벼운 상태 관리를 선호합니다.', 'https://example.com/profile41.jpg'),
  ('f2a3b4c5-d6e7-4f8a-9b0c-2d3e4f5a6b7c', 'user42@example.com', '소민서', ARRAY['JavaScript', 'Node.js', 'Socket.io'], '실시간 통신 애플리케이션을 개발합니다.', 'https://example.com/profile42.jpg'),
  ('a3b4c5d6-e7f8-4a9b-0c1d-3e4f5a6b7c8d', 'user43@example.com', '차하준', ARRAY['React', 'Next.js', 'TypeScript'], 'SEO 최적화에 관심이 많습니다.', 'https://example.com/profile43.jpg'),
  ('b4c5d6e7-f8a9-4b0c-1d2e-4f5a6b7c8d9e', 'user44@example.com', '고은서', ARRAY['Vue.js', 'Vuetify', 'JavaScript'], 'Material Design을 Vue로 구현합니다.', 'https://example.com/profile44.jpg'),
  ('c5d6e7f8-a9b0-4c1d-2e3f-5a6b7c8d9e0f', 'user45@example.com', '우지안', ARRAY['Node.js', 'TypeScript', 'Prisma'], 'ORM을 활용한 데이터베이스 설계를 합니다.', 'https://example.com/profile45.jpg'),
  ('d6e7f8a9-b0c1-4d2e-3f4a-6b7c8d9e0f1a', 'user46@example.com', '변수빈', ARRAY['React', 'TypeScript', 'React Query'], '서버 상태 관리 전문가입니다.', 'https://example.com/profile46.jpg'),
  ('e7f8a9b0-c1d2-4e3f-4a5b-7c8d9e0f1a2b', 'user47@example.com', '석도현', ARRAY['Python', 'Scikit-learn', 'NumPy'], '머신러닝 모델을 개발합니다.', 'https://example.com/profile47.jpg'),
  ('f8a9b0c1-d2e3-4f4a-5b6c-8d9e0f1a2b3c', 'user48@example.com', '추예은', ARRAY['React', 'JavaScript', 'D3.js'], '데이터 시각화를 전문으로 합니다.', 'https://example.com/profile48.jpg'),
  ('a9b0c1d2-e3f4-4a5b-6c7d-9e0f1a2b3c4d', 'user49@example.com', '목준우', ARRAY['Vue.js', 'TypeScript', 'Vue Router'], 'SPA 라우팅 전문가입니다.', 'https://example.com/profile49.jpg'),
  ('b0c1d2e3-f4a5-4b6c-7d8e-0f1a2b3c4d5e', 'user50@example.com', '피아인', ARRAY['Node.js', 'Koa', 'MongoDB'], 'Koa 프레임워크로 개발합니다.', 'https://example.com/profile50.jpg'),
  ('c1d2e3f4-a5b6-4c7d-8e9f-1a2b3c4d5e6f', 'user51@example.com', '탁서윤', ARRAY['React', 'TypeScript', 'Emotion'], 'CSS-in-JS를 활용한 스타일링을 합니다.', 'https://example.com/profile51.jpg'),
  ('d2e3f4a5-b6c7-4d8e-9f0a-2b3c4d5e6f7a', 'user52@example.com', '채시원', ARRAY['Python', 'PyTorch', 'Deep Learning'], '딥러닝 연구를 하고 있습니다.', 'https://example.com/profile52.jpg'),
  ('e3f4a5b6-c7d8-4e9f-0a1b-3c4d5e6f7a8b', 'user53@example.com', '진다온', ARRAY['React', 'Next.js', 'Sass'], '스타일링과 레이아웃에 집중합니다.', 'https://example.com/profile53.jpg'),
  ('f4a5b6c7-d8e9-4f0a-1b2c-4d5e6f7a8b9c', 'user54@example.com', '갈하율', ARRAY['Vue.js', 'JavaScript', 'Bootstrap'], 'Bootstrap과 Vue를 결합합니다.', 'https://example.com/profile54.jpg'),
  ('a5b6c7d8-e9f0-4a1b-2c3d-5e6f7a8b9c0d', 'user55@example.com', '천지율', ARRAY['Node.js', 'TypeScript', 'Jest'], '백엔드 테스트 코드 작성을 중요하게 생각합니다.', 'https://example.com/profile55.jpg'),
  ('b6c7d8e9-f0a1-4b2c-3d4e-6f7a8b9c0d1e', 'user56@example.com', '빈지아', ARRAY['React', 'TypeScript', 'Framer Motion'], '애니메이션과 인터랙션을 구현합니다.', 'https://example.com/profile56.jpg'),
  ('c7d8e9f0-a1b2-4c3d-4e5f-7a8b9c0d1e2f', 'user57@example.com', '복하온', ARRAY['Python', 'OpenCV', 'Computer Vision'], '컴퓨터 비전 프로젝트를 진행합니다.', 'https://example.com/profile57.jpg'),
  ('d8e9f0a1-b2c3-4d4e-5f6a-8b9c0d1e2f3a', 'user58@example.com', '제시후', ARRAY['React', 'JavaScript', 'Chart.js'], '차트와 그래프를 구현합니다.', 'https://example.com/profile58.jpg'),
  ('e9f0a1b2-c3d4-4e5f-6a7b-9c0d1e2f3a4b', 'user59@example.com', '경수현', ARRAY['Vue.js', 'TypeScript', 'Quasar'], 'Quasar 프레임워크 개발자입니다.', 'https://example.com/profile59.jpg'),
  ('f0a1b2c3-d4e5-4f6a-7b8c-0d1e2f3a4b5c', 'user60@example.com', '범지우', ARRAY['Node.js', 'Express', 'JWT'], '인증과 보안을 담당합니다.', 'https://example.com/profile60.jpg'),
  ('a1b2c3d4-e5f6-4a7b-8c9d-1e2f3a4b5c6d', 'user61@example.com', '금서아', ARRAY['React', 'TypeScript', 'MobX'], 'MobX로 상태 관리를 합니다.', 'https://example.com/profile61.jpg'),
  ('b2c3d4e5-f6a7-4b8c-9d0e-2f3a4b5c6d7e', 'user62@example.com', '간도훈', ARRAY['Python', 'Scrapy', 'BeautifulSoup'], '웹 크롤링과 스크래핑을 합니다.', 'https://example.com/profile62.jpg'),
  ('c3d4e5f6-a7b8-4c9d-0e1f-3a4b5c6d7e8f', 'user63@example.com', '예하영', ARRAY['React', 'Next.js', 'MDX'], '문서화와 블로그 개발을 합니다.', 'https://example.com/profile63.jpg'),
  ('d4e5f6a7-b8c9-4d0e-1f2a-4b5c6d7e8f9a', 'user64@example.com', '나수안', ARRAY['Vue.js', 'JavaScript', 'Axios'], 'API 통신과 데이터 페칭을 다룹니다.', 'https://example.com/profile64.jpg'),
  ('e5f6a7b8-c9d0-4e1f-2a3b-5c6d7e8f9a0b', 'user65@example.com', '좌지완', ARRAY['Node.js', 'TypeScript', 'Swagger'], 'API 문서화를 중요하게 생각합니다.', 'https://example.com/profile65.jpg'),
  ('f6a7b8c9-d0e1-4f2a-3b4c-6d7e8f9a0b1c', 'user66@example.com', '뢰지훈', ARRAY['React', 'TypeScript', 'Vite'], 'Vite로 빠른 개발 환경을 구축합니다.', 'https://example.com/profile66.jpg'),
  ('a7b8c9d0-e1f2-4a3b-4c5d-7e8f9a0b1c2d', 'user67@example.com', '창민준', ARRAY['Python', 'Matplotlib', 'Seaborn'], '데이터 시각화 전문가입니다.', 'https://example.com/profile67.jpg'),
  ('b8c9d0e1-f2a3-4b4c-5d6e-8f9a0b1c2d3e', 'user68@example.com', '설예준', ARRAY['React', 'JavaScript', 'Three.js'], '3D 웹 그래픽을 구현합니다.', 'https://example.com/profile68.jpg'),
  ('c9d0e1f2-a3b4-4c5d-6e7f-9a0b1c2d3e4f', 'user69@example.com', '어연서', ARRAY['Vue.js', 'TypeScript', 'Element Plus'], 'Element Plus UI 라이브러리를 사용합니다.', 'https://example.com/profile69.jpg'),
  ('d0e1f2a3-b4c5-4d6e-7f8a-0b1c2d3e4f5a', 'user70@example.com', '황보우진', ARRAY['Node.js', 'Fastify', 'PostgreSQL'], 'Fastify로 고성능 API를 개발합니다.', 'https://example.com/profile70.jpg'),
  ('e1f2a3b4-c5d6-4e7f-8a9b-1c2d3e4f5a6b', 'user71@example.com', '선우서준', ARRAY['React', 'TypeScript', 'SWR'], 'SWR로 데이터 페칭을 관리합니다.', 'https://example.com/profile71.jpg'),
  ('f2a3b4c5-d6e7-4f8a-9b0c-2d3e4f5a6b7c', 'user72@example.com', '독고시은', ARRAY['Python', 'Keras', 'Neural Networks'], '신경망 모델을 설계합니다.', 'https://example.com/profile72.jpg'),
  ('a3b4c5d6-e7f8-4a9b-0c1d-3e4f5a6b7c8d', 'user73@example.com', '남궁하은', ARRAY['React', 'Next.js', 'TypeScript'], 'SSR과 SSG를 활용합니다.', 'https://example.com/profile73.jpg'),
  ('b4c5d6e7-f8a9-4b0c-1d2e-4f5a6b7c8d9e', 'user74@example.com', '사공지후', ARRAY['Vue.js', 'JavaScript', 'Vuex'], 'Vuex로 중앙 집중식 상태 관리를 합니다.', 'https://example.com/profile74.jpg'),
  ('c5d6e7f8-a9b0-4c1d-2e3f-5a6b7c8d9e0f', 'user75@example.com', '제갈도윤', ARRAY['Node.js', 'TypeScript', 'TypeORM'], 'TypeORM으로 엔티티를 관리합니다.', 'https://example.com/profile75.jpg'),
  ('d6e7f8a9-b0c1-4d2e-3f4a-6b7c8d9e0f1a', 'user76@example.com', '선예원', ARRAY['React', 'TypeScript', 'Ant Design'], 'Ant Design으로 엔터프라이즈 UI를 개발합니다.', 'https://example.com/profile76.jpg'),
  ('e7f8a9b0-c1d2-4e3f-4a5b-7c8d9e0f1a2b', 'user77@example.com', '동방하준', ARRAY['Python', 'Pytest', 'TDD'], '테스트 주도 개발을 실천합니다.', 'https://example.com/profile77.jpg'),
  ('f8a9b0c1-d2e3-4f4a-5b6c-8d9e0f1a2b3c', 'user78@example.com', '서문지우', ARRAY['React', 'JavaScript', 'Leaflet'], '지도 기반 애플리케이션을 개발합니다.', 'https://example.com/profile77.jpg'),
  ('a9b0c1d2-e3f4-4a5b-6c7d-9e0f1a2b3c4d', 'user79@example.com', '장곡시우', ARRAY['Vue.js', 'TypeScript', 'Pinia'], 'Vue 3의 새로운 상태 관리를 사용합니다.', 'https://example.com/profile79.jpg'),
  ('b0c1d2e3-f4a5-4b6c-7d8e-0f1a2b3c4d5e', 'user80@example.com', '망절준서', ARRAY['Node.js', 'Express', 'Passport'], '소셜 로그인 구현을 전문으로 합니다.', 'https://example.com/profile80.jpg'),
  ('c1d2e3f4-a5b6-4c7d-8e9f-1a2b3c4d5e6f', 'user81@example.com', '강전하린', ARRAY['React', 'TypeScript', 'Cypress'], 'E2E 테스트를 작성합니다.', 'https://example.com/profile81.jpg'),
  ('d2e3f4a5-b6c7-4d8e-9f0a-2b3c4d5e6f7a', 'user82@example.com', '진평다은', ARRAY['Python', 'SQLAlchemy', 'Alembic'], '데이터베이스 마이그레이션을 관리합니다.', 'https://example.com/profile82.jpg'),
  ('e3f4a5b6-c7d8-4e9f-0a1b-3c4d5e6f7a8b', 'user83@example.com', '황선서진', ARRAY['React', 'Next.js', 'Contentful'], 'Headless CMS를 활용한 개발을 합니다.', 'https://example.com/profile83.jpg'),
  ('f4a5b6c7-d8e9-4f0a-1b2c-4d5e6f7a8b9c', 'user84@example.com', '공손지원', ARRAY['Vue.js', 'JavaScript', 'Vue Test Utils'], 'Vue 컴포넌트 테스트를 작성합니다.', 'https://example.com/profile84.jpg'),
  ('a5b6c7d8-e9f0-4a1b-2c3d-5e6f7a8b9c0d', 'user85@example.com', '제하민', ARRAY['Node.js', 'TypeScript', 'Bull'], '작업 큐와 백그라운드 작업을 다룹니다.', 'https://example.com/profile85.jpg'),
  ('b6c7d8e9-f0a1-4b2c-3d4e-6f7a8b9c0d1e', 'user86@example.com', '순아린', ARRAY['React', 'TypeScript', 'Formik'], '폼 validation 전문가입니다.', 'https://example.com/profile86.jpg'),
  ('c7d8e9f0-a1b2-4c3d-4e5f-7a8b9c0d1e2f', 'user87@example.com', '돈유진', ARRAY['Python', 'NumPy', 'SciPy'], '과학 계산과 수치 해석을 합니다.', 'https://example.com/profile87.jpg'),
  ('d8e9f0a1-b2c3-4d4e-5f6a-8b9c0d1e2f3a', 'user88@example.com', '국준영', ARRAY['React', 'JavaScript', 'WebSocket'], '실시간 채팅 애플리케이션을 개발합니다.', 'https://example.com/profile88.jpg'),
  ('e9f0a1b2-c3d4-4e5f-6a7b-9c0d1e2f3a4b', 'user89@example.com', '묵서윤', ARRAY['Vue.js', 'TypeScript', 'Tailwind CSS'], 'Tailwind로 빠른 UI 개발을 합니다.', 'https://example.com/profile89.jpg'),
  ('f0a1b2c3-d4e5-4f6a-7b8c-0d1e2f3a4b5c', 'user90@example.com', '옹현우', ARRAY['Node.js', 'Hapi', 'RabbitMQ'], '메시지 큐를 활용한 시스템을 구축합니다.', 'https://example.com/profile90.jpg'),
  ('a1b2c3d4-e5f6-4a7b-8c9d-1e2f3a4b5c6e', 'user91@example.com', '등지훈', ARRAY['React', 'TypeScript', 'i18next'], '다국어 지원 애플리케이션을 개발합니다.', 'https://example.com/profile91.jpg'),
  ('b2c3d4e5-f6a7-4b8c-9d0e-2f3a4b5c6d7f', 'user92@example.com', '견윤서', ARRAY['Python', 'Streamlit', 'Data Apps'], '데이터 앱을 빠르게 프로토타이핑합니다.', 'https://example.com/profile92.jpg'),
  ('c3d4e5f6-a7b8-4c9d-0e1f-3a4b5c6d7e8a', 'user93@example.com', '팽시윤', ARRAY['React', 'Next.js', 'Stripe'], '결제 시스템 통합을 담당합니다.', 'https://example.com/profile93.jpg'),
  ('d4e5f6a7-b8c9-4d0e-1f2a-4b5c6d7e8f9b', 'user94@example.com', '옥채은', ARRAY['Vue.js', 'JavaScript', 'D3.js'], 'Vue와 D3로 데이터 시각화를 합니다.', 'https://example.com/profile94.jpg'),
  ('e5f6a7b8-c9d0-4e1f-2a3b-5c6d7e8f9a0c', 'user95@example.com', '뇌지환', ARRAY['Node.js', 'TypeScript', 'Nodemailer'], '이메일 발송 시스템을 구축합니다.', 'https://example.com/profile95.jpg'),
  ('f6a7b8c9-d0e1-4f2a-3b4c-6d7e8f9a0b1d', 'user96@example.com', '교도경', ARRAY['React', 'TypeScript', 'PWA'], 'Progressive Web App을 개발합니다.', 'https://example.com/profile96.jpg'),
  ('a7b8c9d0-e1f2-4a3b-4c5d-7e8f9a0b1c2e', 'user97@example.com', '팔윤아', ARRAY['Python', 'Airflow', 'ETL'], '데이터 파이프라인을 구축합니다.', 'https://example.com/profile97.jpg'),
  ('b8c9d0e1-f2a3-4b4c-5d6e-8f9a0b1c2d3f', 'user98@example.com', '추연호', ARRAY['React', 'JavaScript', 'Electron'], '데스크톱 애플리케이션을 개발합니다.', 'https://example.com/profile98.jpg'),
  ('c9d0e1f2-a3b4-4c5d-6e7f-9a0b1c2d3e4a', 'user99@example.com', '석하람', ARRAY['Vue.js', 'TypeScript', 'Vue I18n'], '국제화 프로젝트를 진행합니다.', 'https://example.com/profile99.jpg'),
  ('d0e1f2a3-b4c5-4d6e-7f8a-0b1c2d3e4f5b', 'user100@example.com', '낭준혁', ARRAY['Node.js', 'Express', 'Elasticsearch'], '검색 엔진을 구축하고 최적화합니다.', 'https://example.com/profile100.jpg');
