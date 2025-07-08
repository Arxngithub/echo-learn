
import { useAuth } from '@/hooks/useAuth';
import { useProfile } from '@/hooks/useProfile';
import AuthPage from '@/components/auth/AuthPage';
import Dashboard from '@/components/dashboard/Dashboard';
import { Loader2 } from 'lucide-react';

const Index = () => {
  const { user, loading: authLoading } = useAuth();
  const { profile, loading: profileLoading } = useProfile();

  // Show loading while checking auth state
  if (authLoading || (user && profileLoading)) {
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

  // Show dashboard if authenticated and profile exists
  if (profile) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
        <Dashboard 
          user={{
            role: profile.role as 'faculty' | 'student' | 'admin',
            name: profile.full_name || 'User'
          }}
        />
      </div>
    );
  }

  // Fallback loading state
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center">
      <div className="text-center">
        <Loader2 className="w-8 h-8 animate-spin mx-auto mb-4 text-blue-600" />
        <p className="text-gray-600">Setting up your profile...</p>
      </div>
    </div>
  );
};

export default Index;
