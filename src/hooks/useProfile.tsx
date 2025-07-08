
import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from './useAuth';

interface Profile {
  id: string;
  full_name: string | null;
  role: string | null;
  department: string | null;
  avatar_url: string | null;
  created_at: string | null;
}

export const useProfile = () => {
  const [profile, setProfile] = useState<Profile | null>(null);
  const [loading, setLoading] = useState(true);
  const { user } = useAuth();

  useEffect(() => {
    if (!user) {
      setProfile(null);
      setLoading(false);
      return;
    }

    const fetchProfile = async () => {
      try {
        console.log('Fetching profile for user:', user.id);
        
        const { data, error } = await supabase
          .from('profiles')
          .select('*')
          .eq('id', user.id)
          .maybeSingle();

        if (error && error.code !== 'PGRST116') {
          console.error('Error fetching profile:', error);
          setLoading(false);
          return;
        }

        if (data) {
          console.log('Profile found:', data);
          setProfile(data);
        } else {
          // Try to create profile if it doesn't exist
          console.log('No profile found, creating new profile...');
          try {
            const { data: newProfile, error: insertError } = await supabase
              .from('profiles')
              .insert({
                id: user.id,
                full_name: user.user_metadata?.full_name || null,
                role: user.user_metadata?.role || 'student',
                department: null,
                avatar_url: null
              })
              .select()
              .single();

            if (insertError) {
              console.error('Error creating profile:', insertError);
              // Don't block the app if profile creation fails
            } else {
              console.log('Profile created successfully:', newProfile);
              setProfile(newProfile);
            }
          } catch (createError) {
            console.error('Failed to create profile:', createError);
            // Don't block the app if profile creation fails
          }
        }
      } catch (error) {
        console.error('Error in fetchProfile:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchProfile();
  }, [user]);

  return { profile, loading };
};
