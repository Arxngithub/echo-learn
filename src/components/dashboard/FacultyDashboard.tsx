
import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Mic, Brain, BarChart3, Upload, FileText } from 'lucide-react';
import AudioRecorder from '@/components/faculty/AudioRecorder';
import ContentGenerator from '@/components/faculty/ContentGenerator';

const FacultyDashboard = () => {
  const [activeTab, setActiveTab] = useState<'record' | 'generate' | 'analytics'>('record');

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="mb-8">
        <h2 className="text-3xl font-bold text-gray-900 mb-2">Faculty Dashboard</h2>
        <p className="text-gray-600">Create and share AI-powered learning materials</p>
      </div>

      {/* Welcome Card for New Users */}
      <Card className="mb-8 bg-gradient-to-r from-blue-50 to-indigo-50 border-blue-200">
        <CardContent className="p-6">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 bg-gradient-to-r from-blue-600 to-indigo-600 rounded-lg flex items-center justify-center">
              <Upload className="w-6 h-6 text-white" />
            </div>
            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-1">Welcome to ProfEchoX!</h3>
              <p className="text-gray-600">Start by recording or uploading your first lecture to generate AI-powered learning materials.</p>
            </div>
          </div>
        </CardContent>
      </Card>

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
            <CardContent className="py-12">
              <div className="text-center">
                <FileText className="w-16 h-16 text-gray-300 mx-auto mb-4" />
                <h3 className="text-lg font-medium text-gray-900 mb-2">No Data Yet</h3>
                <p className="text-gray-500 mb-4">
                  Analytics will appear here once you start uploading lectures and students begin engaging with your content.
                </p>
              </div>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
};

export default FacultyDashboard;
