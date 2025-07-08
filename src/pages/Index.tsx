
import { useAuth } from '@/hooks/useAuth';
import { useProfile } from '@/hooks/useProfile';
import AuthPage from '@/components/auth/AuthPage';
import Dashboard from '@/components/dashboard/Dashboard';
import { Loader2 } from 'lucide-react';
import { useEffect, useState } from 'react';

const Index = () => {
  const { user, loading: authLoading } = useAuth();
  const { profile, loading: profileLoading } = useProfile();
  const [forceShowDashboard, setForceShowDashboard] = useState(false);

  // Add timeout to prevent infinite loading
  useEffect(() => {
    if (user && profileLoading) {
      const timeout = setTimeout(() => {
        console.log('Profile loading timeout, forcing dashboard display');
        setForceShowDashboard(true);
      }, 5000); // 5 second timeout

      return () => clearTimeout(timeout);
    }
  }, [user, profileLoading]);

  // Show loading while checking auth state
  if (authLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center">
        <div className="text-center">
          <Loader2 className="w-8 h-8 animate-spin mx-auto mb-4 text-blue-600" />
          <p className="text-gray-600">Loading...</p>
        </div>
      </div>
    );
  }

  // Show auth page if not authenticated
  if (!user) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
        <AuthPage />
      </div>
    );
  }

  // Show dashboard if authenticated and either profile exists or we're forcing it
  if (profile || forceShowDashboard) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
        <Dashboard 
          user={{
            role: (profile?.role || user.user_metadata?.role || 'student') as 'faculty' | 'student' | 'admin',
            name: profile?.full_name || user.user_metadata?.full_name || user.email || 'User'
          }}
        />
      </div>
    );
  }

  // Show loading with timeout for profile setup
  if (profileLoading && !forceShowDashboard) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center">
        <div className="text-center">
          <Loader2 className="w-8 h-8 animate-spin mx-auto mb-4 text-blue-600" />
          <p className="text-gray-600">Setting up your profile...</p>
          <p className="text-sm text-gray-500 mt-2">This should only take a moment</p>
        </div>
      </div>
    );
  }

  // Fallback - show dashboard with user metadata
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      <Dashboard 
        user={{
          role: (user.user_metadata?.role || 'student') as 'faculty' | 'student' | 'admin',
          name: user.user_metadata?.full_name || user.email || 'User'
        }}
      />
    </div>
  );
};

export default Index;
