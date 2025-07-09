
-- Create storage bucket for audio files
INSERT INTO storage.buckets (id, name, public, file_size_limit, allowed_mime_types)
VALUES (
  'lecture-audio',
  'lecture-audio',
  false,
  524288000, -- 500MB limit
  ARRAY['audio/mpeg', 'audio/wav', 'audio/m4a', 'audio/flac', 'audio/webm']
);

-- Create storage policies for lecture audio bucket
CREATE POLICY "Faculty can upload audio files"
ON storage.objects
FOR INSERT
WITH CHECK (
  bucket_id = 'lecture-audio' AND
  EXISTS (
    SELECT 1 FROM profiles 
    WHERE id = auth.uid() AND role = 'faculty'
  )
);

CREATE POLICY "Faculty can view their audio files"
ON storage.objects
FOR SELECT
USING (
  bucket_id = 'lecture-audio' AND
  EXISTS (
    SELECT 1 FROM profiles 
    WHERE id = auth.uid() AND role = 'faculty'
  )
);

CREATE POLICY "Faculty can delete their audio files"
ON storage.objects
FOR DELETE
USING (
  bucket_id = 'lecture-audio' AND
  EXISTS (
    SELECT 1 FROM profiles 
    WHERE id = auth.uid() AND role = 'faculty'
  )
);

-- Update lectures table to add more fields
ALTER TABLE lectures 
ADD COLUMN IF NOT EXISTS subject TEXT,
ADD COLUMN IF NOT EXISTS topic TEXT,
ADD COLUMN IF NOT EXISTS description TEXT,
ADD COLUMN IF NOT EXISTS duration INTEGER, -- duration in seconds
ADD COLUMN IF NOT EXISTS processing_status TEXT DEFAULT 'pending', -- pending, processing, completed, failed
ADD COLUMN IF NOT EXISTS updated_at TIMESTAMP WITH TIME ZONE DEFAULT now();

-- Create function to update updated_at timestamp
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = now();
    RETURN NEW;
END;
$$ language 'plpgsql';

-- Create trigger for lectures table
CREATE TRIGGER update_lectures_updated_at 
    BEFORE UPDATE ON lectures 
    FOR EACH ROW 
    EXECUTE FUNCTION update_updated_at_column();

-- Update lecture_materials table to add more structure
ALTER TABLE lecture_materials 
ADD COLUMN IF NOT EXISTS title TEXT,
ADD COLUMN IF NOT EXISTS updated_at TIMESTAMP WITH TIME ZONE DEFAULT now();

-- Create trigger for lecture_materials table
CREATE TRIGGER update_lecture_materials_updated_at 
    BEFORE UPDATE ON lecture_materials 
    FOR EACH ROW 
    EXECUTE FUNCTION update_updated_at_column();
