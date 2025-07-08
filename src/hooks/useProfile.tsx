
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

        if (error) {
          console.error('Error fetching profile:', error);
          
          // If profile doesn't exist, create one
          if (error.code === 'PGRST116') {
            console.log('Profile not found, creating new profile...');
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
            } else {
              console.log('Profile created successfully:', newProfile);
              setProfile(newProfile);
            }
          }
        } else if (data) {
          console.log('Profile found:', data);
          setProfile(data);
        } else {
          // No profile found, create one
          console.log('No profile found, creating new profile...');
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
          } else {
            console.log('Profile created successfully:', newProfile);
            setProfile(newProfile);
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
