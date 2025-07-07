
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';
import { Users, BookOpen, TrendingUp, Activity, Award, Clock, FileText, Brain } from 'lucide-react';

const AdminDashboard = () => {
  const stats = [
    { label: 'Total Users', value: '2,847', icon: Users, color: 'text-blue-600', change: '+12%' },
    { label: 'Active Faculty', value: '45', icon: BookOpen, color: 'text-green-600', change: '+5%' },
    { label: 'Student Engagement', value: '78%', icon: TrendingUp, color: 'text-purple-600', change: '+8%' },
    { label: 'Content Generated', value: '1,234', icon: Brain, color: 'text-orange-600', change: '+23%' },
  ];

  const facultyPerformance = [
    { name: 'Dr. Smith', department: 'Computer Science', lectures: 24, engagement: 92 },
    { name: 'Prof. Johnson', department: 'Mathematics', lectures: 18, engagement: 87 },
    { name: 'Dr. Williams', department: 'Physics', lectures: 21, engagement: 84 },
    { name: 'Prof. Brown', department: 'Chemistry', lectures: 16, engagement: 89 }
  ];

  const systemMetrics = [
    { metric: 'Audio Processing', value: 95, status: 'excellent' },
    { metric: 'AI Generation', value: 88, status: 'good' },
    { metric: 'Student Satisfaction', value: 91, status: 'excellent' },
    { metric: 'Platform Uptime', value: 99.8, status: 'excellent' }
  ];

  const recentActivity = [
    { action: 'New lecture uploaded', user: 'Dr. Smith', time: '2 minutes ago', type: 'upload' },
    { action: 'Quiz completed', user: 'Student batch CS-A', time: '5 minutes ago', type: 'quiz' },
    { action: 'Materials shared', user: 'Prof. Johnson', time: '12 minutes ago', type: 'share' },
    { action: 'Flashcards generated', user: 'Dr. Williams', time: '18 minutes ago', type: 'generate' }
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="mb-8">
        <h2 className="text-3xl font-bold text-gray-900 mb-2">Admin Dashboard</h2>
        <p className="text-gray-600">Monitor platform performance and user analytics</p>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {stats.map((stat, index) => (
          <Card key={index} className="bg-white shadow-sm hover:shadow-md transition-shadow">
            <CardContent className="p-6">
              <div className="flex items-center justify-between mb-2">
                <stat.icon className={`w-8 h-8 ${stat.color}`} />
                <Badge variant="secondary" className="text-xs">
                  {stat.change}
                </Badge>
              </div>
              <div>
                <p className="text-2xl font-bold text-gray-900">{stat.value}</p>
                <p className="text-sm text-gray-600">{stat.label}</p>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
        {/* Faculty Performance */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Users className="w-5 h-5" />
              Faculty Performance
            </CardTitle>
            <CardDescription>Top performing faculty members this month</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {facultyPerformance.map((faculty, index) => (
                <div key={index} className="flex items-center justify-between p-3 border rounded-lg">
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-1">
                      <h4 className="font-medium">{faculty.name}</h4>
                      <Badge variant="outline" className="text-xs">
                        {faculty.department}
                      </Badge>
                    </div>
                    <p className="text-sm text-gray-600">{faculty.lectures} lectures uploaded</p>
                  </div>
                  <div className="text-right">
                    <div className="flex items-center gap-2">
                      <Progress value={faculty.engagement} className="w-16" />
                      <span className="text-sm font-medium">{faculty.engagement}%</span>
                    </div>
                    <p className="text-xs text-gray-500">Engagement</p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* System Metrics */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Activity className="w-5 h-5" />
              System Health
            </CardTitle>
            <CardDescription>Real-time platform performance metrics</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {systemMetrics.map((metric, index) => (
                <div key={index} className="space-y-2">
                  <div className="flex justify-between items-center">
                    <span className="text-sm font-medium">{metric.metric}</span>
                    <div className="flex items-center gap-2">
                      <span className="text-sm">{metric.value}%</span>
                      <Badge 
                        variant={metric.status === 'excellent' ? 'default' : 'secondary'}
                        className="text-xs"
                      >
                        {metric.status}
                      </Badge>
                    </div>
                  </div>
                  <Progress 
                    value={metric.value} 
                    className={`w-full ${
                      metric.value >= 90 ? 'text-green-600' : 
                      metric.value >= 80 ? 'text-yellow-600' : 'text-red-600'
                    }`} 
                  />
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Recent Activity */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Clock className="w-5 h-5" />
            Recent Activity
          </CardTitle>
          <CardDescription>Latest platform activities and user interactions</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {recentActivity.map((activity, index) => (
              <div key={index} className="flex items-center gap-4 p-3 border-l-4 border-blue-200 bg-blue-50/50">
                <div className="flex-shrink-0">
                  {activity.type === 'upload' && <FileText className="w-5 h-5 text-blue-600" />}
                  {activity.type === 'quiz' && <Award className="w-5 h-5 text-green-600" />}
                  {activity.type === 'share' && <Users className="w-5 h-5 text-purple-600" />}
                  {activity.type === 'generate' && <Brain className="w-5 h-5 text-orange-600" />}
                </div>
                <div className="flex-1">
                  <p className="font-medium text-sm">{activity.action}</p>
                  <p className="text-xs text-gray-600">by {activity.user}</p>
                </div>
                <span className="text-xs text-gray-500">{activity.time}</span>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Usage Analytics */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-8">
        <Card>
          <CardContent className="p-6 text-center">
            <BookOpen className="w-12 h-12 text-blue-600 mx-auto mb-4" />
            <div className="text-2xl font-bold text-gray-900 mb-1">156</div>
            <p className="text-sm text-gray-600">Lectures This Week</p>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-6 text-center">
            <Brain className="w-12 h-12 text-green-600 mx-auto mb-4" />
            <div className="text-2xl font-bold text-gray-900 mb-1">2,847</div>
            <p className="text-sm text-gray-600">AI Materials Generated</p>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-6 text-center">
            <Award className="w-12 h-12 text-purple-600 mx-auto mb-4" />
            <div className="text-2xl font-bold text-gray-900 mb-1">89%</div>
            <p className="text-sm text-gray-600">Avg. Student Score</p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default AdminDashboard;
