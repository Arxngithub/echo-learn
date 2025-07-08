
-- Drop existing policies that might be causing recursion
DROP POLICY IF EXISTS "Users can view own profile" ON public.profiles;
DROP POLICY IF EXISTS "Users can update own profile" ON public.profiles;
DROP POLICY IF EXISTS "Users can insert own profile" ON public.profiles;

-- Create new policies without recursion
CREATE POLICY "Enable read access for users to their own profile" 
  ON public.profiles 
  FOR SELECT 
  USING (auth.uid() = id);

CREATE POLICY "Enable insert access for users to create their own profile" 
  ON public.profiles 
  FOR INSERT 
  WITH CHECK (auth.uid() = id);

CREATE POLICY "Enable update access for users to their own profile" 
  ON public.profiles 
  FOR UPDATE 
  USING (auth.uid() = id);
