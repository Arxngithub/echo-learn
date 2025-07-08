
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Users, BookOpen, TrendingUp, Activity, Settings, Shield, Server, Database } from 'lucide-react';

const AdminDashboard = () => {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="mb-8">
        <h2 className="text-3xl font-bold text-gray-900 mb-2">Admin Dashboard</h2>
        <p className="text-gray-600">Monitor platform performance and user analytics</p>
      </div>

      {/* Welcome Card for New Admin */}
      <Card className="mb-8 bg-gradient-to-r from-purple-50 to-violet-50 border-purple-200">
        <CardContent className="p-6">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 bg-gradient-to-r from-purple-600 to-violet-600 rounded-lg flex items-center justify-center">
              <Shield className="w-6 h-6 text-white" />
            </div>
            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-1">Admin Control Center</h3>
              <p className="text-gray-600">Monitor platform usage, manage users, and track system performance.</p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* System Overview Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
        <Card>
          <CardContent className="p-6 text-center">
            <Users className="w-12 h-12 text-blue-600 mx-auto mb-4" />
            <div className="text-2xl font-bold text-gray-900 mb-1">-</div>
            <p className="text-sm text-gray-600">Total Users</p>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-6 text-center">
            <BookOpen className="w-12 h-12 text-green-600 mx-auto mb-4" />
            <div className="text-2xl font-bold text-gray-900 mb-1">-</div>
            <p className="text-sm text-gray-600">Total Lectures</p>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-6 text-center">
            <Server className="w-12 h-12 text-purple-600 mx-auto mb-4" />
            <div className="text-2xl font-bold text-gray-900 mb-1">-</div>
            <p className="text-sm text-gray-600">API Calls Today</p>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-6 text-center">
            <Database className="w-12 h-12 text-orange-600 mx-auto mb-4" />
            <div className="text-2xl font-bold text-gray-900 mb-1">-</div>
            <p className="text-sm text-gray-600">Storage Used</p>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
        {/* User Management - Empty State */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Users className="w-5 h-5" />
              User Management
            </CardTitle>
            <CardDescription>Manage faculty and student accounts</CardDescription>
          </CardHeader>
          <CardContent className="py-12">
            <div className="text-center">
              <Users className="w-16 h-16 text-gray-300 mx-auto mb-4" />
              <h3 className="text-lg font-medium text-gray-900 mb-2">No Users Yet</h3>
              <p className="text-gray-500 mb-4">
                User accounts will appear here once registration begins.
              </p>
            </div>
          </CardContent>
        </Card>

        {/* System Health - Empty State */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Activity className="w-5 h-5" />
              System Health
            </CardTitle>
            <CardDescription>Real-time platform performance metrics</CardDescription>
          </CardHeader>
          <CardContent className="py-12">
            <div className="text-center">
              <Activity className="w-16 h-16 text-gray-300 mx-auto mb-4" />
              <h3 className="text-lg font-medium text-gray-900 mb-2">Monitoring Ready</h3>
              <p className="text-gray-500">
                System metrics will display here once the platform becomes active.
              </p>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Recent Activity - Empty State */}
      <Card className="mb-8">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <TrendingUp className="w-5 h-5" />
            Recent Activity
          </CardTitle>
          <CardDescription>Latest platform activities and user interactions</CardDescription>
        </CardHeader>
        <CardContent className="py-12">
          <div className="text-center">
            <TrendingUp className="w-16 h-16 text-gray-300 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-gray-900 mb-2">No Activity Yet</h3>
            <p className="text-gray-500">
              Platform activities will be tracked and displayed here once users start engaging with the system.
            </p>
          </div>
        </CardContent>
      </Card>

      {/* Platform Health Summary */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card>
          <CardContent className="p-6 text-center">
            <Settings className="w-12 h-12 text-blue-600 mx-auto mb-4" />
            <div className="text-2xl font-bold text-green-600 mb-1">Ready</div>
            <p className="text-sm text-gray-600">System Status</p>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-6 text-center">
            <Shield className="w-12 h-12 text-green-600 mx-auto mb-4" />
            <div className="text-2xl font-bold text-green-600 mb-1">Secure</div>
            <p className="text-sm text-gray-600">Security Status</p>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-6 text-center">
            <Activity className="w-12 h-12 text-purple-600 mx-auto mb-4" />
            <div className="text-2xl font-bold text-gray-900 mb-1">-</div>
            <p className="text-sm text-gray-600">Uptime</p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default AdminDashboard;
