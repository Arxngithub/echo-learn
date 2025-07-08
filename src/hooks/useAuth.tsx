
import { useState, useEffect } from 'react';
import { User, Session } from '@supabase/supabase-js';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';

export const useAuth = () => {
  const [user, setUser] = useState<User | null>(null);
  const [session, setSession] = useState<Session | null>(null);
  const [loading, setLoading] = useState(true);
  const { toast } = useToast();

  useEffect(() => {
    // Set up auth state listener
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      (event, session) => {
        console.log('Auth state changed:', event, session);
        setSession(session);
        setUser(session?.user ?? null);
        setLoading(false);

        // Show success message for sign in
        if (event === 'SIGNED_IN') {
          toast({
            title: "Welcome!",
            description: "You have successfully signed in.",
          });
        }
      }
    );

    // Check for existing session
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
      setUser(session?.user ?? null);
      setLoading(false);
    });

    return () => subscription.unsubscribe();
  }, [toast]);

  const signUp = async (email: string, password: string, fullName: string, role: 'faculty' | 'student') => {
    try {
      const { error } = await supabase.auth.signUp({
        email,
        password,
        options: {
          emailRedirectTo: `${window.location.origin}/`,
          data: {
            full_name: fullName,
            role: role
          }
        }
      });

      if (error) {
        if (error.message.includes('User already registered')) {
          toast({
            title: "Account Already Exists",
            description: "An account with this email already exists. Please sign in instead.",
            variant: "destructive"
          });
        } else {
          toast({
            title: "Sign Up Error",
            description: error.message,
            variant: "destructive"
          });
        }
        return { error };
      }

      toast({
        title: "Account Created!",
        description: "Please check your email to verify your account. If you don't see the email, check your spam folder.",
      });

      return { error: null };
    } catch (error) {
      console.error('Sign up error:', error);
      toast({
        title: "Unexpected Error",
        description: "Something went wrong during sign up. Please try again.",
        variant: "destructive"
      });
      return { error };
    }
  };

  const signIn = async (email: string, password: string) => {
    try {
      const { error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });

      if (error) {
        if (error.message.includes('Invalid login credentials')) {
          toast({
            title: "Invalid Credentials",
            description: "Please check your email and password and try again.",
            variant: "destructive"
          });
        } else if (error.message.includes('Email not confirmed')) {
          toast({
            title: "Email Not Verified",
            description: "Please check your email and click the verification link before signing in.",
            variant: "destructive"
          });
        } else {
          toast({
            title: "Sign In Error",
            description: error.message,
            variant: "destructive"
          });
        }
        return { error };
      }

      return { error: null };
    } catch (error) {
      console.error('Sign in error:', error);
      toast({
        title: "Unexpected Error",
        description: "Something went wrong during sign in. Please try again.",
        variant: "destructive"
      });
      return { error };
    }
  };

  const signOut = async () => {
    try {
      const { error } = await supabase.auth.signOut();
      if (error) {
        toast({
          title: "Sign Out Error",
          description: error.message,
          variant: "destructive"
        });
      } else {
        toast({
          title: "Signed Out",
          description: "You have been successfully signed out.",
        });
      }
    } catch (error) {
      console.error('Sign out error:', error);
      toast({
        title: "Unexpected Error",
        description: "Something went wrong during sign out.",
        variant: "destructive"
      });
    }
  };

  return {
    user,
    session,
    loading,
    signUp,
    signIn,
    signOut
  };
};
