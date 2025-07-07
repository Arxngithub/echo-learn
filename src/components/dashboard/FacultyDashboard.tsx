
import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { Mic, Upload, FileText, Brain, Share2, BarChart3, BookOpen, Users, Clock } from 'lucide-react';
import AudioRecorder from '@/components/faculty/AudioRecorder';
import ContentGenerator from '@/components/faculty/ContentGenerator';

const FacultyDashboard = () => {
  const [activeTab, setActiveTab] = useState<'record' | 'generate' | 'analytics'>('record');

  const stats = [
    { label: 'Lectures Recorded', value: '24', icon: Mic, color: 'text-blue-600' },
    { label: 'Materials Generated', value: '48', icon: FileText, color: 'text-green-600' },
    { label: 'Students Reached', value: '156', icon: Users, color: 'text-purple-600' },
    { label: 'Avg. Quiz Score', value: '78%', icon: BarChart3, color: 'text-orange-600' },
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="mb-8">
        <h2 className="text-3xl font-bold text-gray-900 mb-2">Faculty Dashboard</h2>
        <p className="text-gray-600">Create and share AI-powered learning materials</p>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {stats.map((stat, index) => (
          <Card key={index} className="bg-white shadow-sm hover:shadow-md transition-shadow">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-2xl font-bold text-gray-900">{stat.value}</p>
                  <p className="text-sm text-gray-600">{stat.label}</p>
                </div>
                <stat.icon className={`w-8 h-8 ${stat.color}`} />
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Navigation Tabs */}
      <div className="flex space-x-1 bg-gray-100 p-1 rounded-lg mb-6 w-fit">
        <Button
          variant={activeTab === 'record' ? 'default' : 'ghost'}
          onClick={() => setActiveTab('record')}
          className="flex items-center gap-2"
        >
          <Mic className="w-4 h-4" />
          Record Lecture
        </Button>
        <Button
          variant={activeTab === 'generate' ? 'default' : 'ghost'}
          onClick={() => setActiveTab('generate')}
          className="flex items-center gap-2"
        >
          <Brain className="w-4 h-4" />
          Generate Content
        </Button>
        <Button
          variant={activeTab === 'analytics' ? 'default' : 'ghost'}
          onClick={() => setActiveTab('analytics')}
          className="flex items-center gap-2"
        >
          <BarChart3 className="w-4 h-4" />
          Analytics
        </Button>
      </div>

      {/* Tab Content */}
      <div className="space-y-6">
        {activeTab === 'record' && <AudioRecorder />}
        {activeTab === 'generate' && <ContentGenerator />}
        {activeTab === 'analytics' && (
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <BarChart3 className="w-5 h-5" />
                Student Analytics
              </CardTitle>
              <CardDescription>Track student engagement and performance</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <h4 className="font-medium">Recent Lecture Performance</h4>
                  <div className="space-y-3">
                    <div className="flex justify-between items-center">
                      <span className="text-sm">Data Structures - Lecture 5</span>
                      <div className="flex items-center gap-2">
                        <Progress value={85} className="w-20" />
                        <span className="text-sm font-medium">85%</span>
                      </div>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-sm">Algorithms - Lecture 3</span>
                      <div className="flex items-center gap-2">
                        <Progress value={92} className="w-20" />
                        <span className="text-sm font-medium">92%</span>
                      </div>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-sm">Database Systems - Lecture 7</span>
                      <div className="flex items-center gap-2">
                        <Progress value={78} className="w-20" />
                        <span className="text-sm font-medium">78%</span>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="space-y-4">
                  <h4 className="font-medium">Student Engagement</h4>
                  <div className="space-y-3">
                    <div className="flex justify-between">
                      <span className="text-sm">Flashcards Viewed</span>
                      <span className="text-sm font-medium">1,247</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm">Quizzes Completed</span>
                      <span className="text-sm font-medium">423</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm">Study Materials Downloaded</span>
                      <span className="text-sm font-medium">189</span>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
};

export default FacultyDashboard;
