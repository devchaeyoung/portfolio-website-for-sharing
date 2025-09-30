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
