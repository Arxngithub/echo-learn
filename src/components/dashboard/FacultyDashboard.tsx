
import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Mic, Brain, BarChart3, Upload, FileText, Users, BookOpen, TrendingUp, Clock, CheckCircle, AlertCircle } from 'lucide-react';
import AudioRecorder from '@/components/faculty/AudioRecorder';
import ContentGenerator from '@/components/faculty/ContentGenerator';
import { useLectures } from '@/hooks/useLectures';
import { useLectureMaterials } from '@/hooks/useLectureMaterials';

const FacultyDashboard = () => {
  const [activeTab, setActiveTab] = useState<'record' | 'generate' | 'analytics'>('record');
  const { lectures, loading: lecturesLoading } = useLectures();
  const { materials, loading: materialsLoading } = useLectureMaterials();

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'completed':
        return <CheckCircle className="w-4 h-4 text-green-600" />;
      case 'processing':
      case 'generating_content':
        return <Clock className="w-4 h-4 text-blue-600 animate-spin" />;
      case 'failed':
        return <AlertCircle className="w-4 h-4 text-red-600" />;
      default:
        return <Clock className="w-4 h-4 text-gray-600" />;
    }
  };

  const getStatusText = (status: string) => {
    switch (status) {
      case 'completed':
        return 'Completed';
      case 'processing':
        return 'Processing Audio';
      case 'generating_content':
        return 'Generating Content';
      case 'failed':
        return 'Failed';
      case 'pending':
        return 'Pending';
      default:
        return 'Unknown';
    }
  };

  const completedLectures = lectures.filter(l => l.processing_status === 'completed');
  const processingLectures = lectures.filter(l => ['processing', 'generating_content', 'pending'].includes(l.processing_status));

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="mb-8">
        <h2 className="text-3xl font-bold text-gray-900 mb-2">Faculty Dashboard</h2>
        <p className="text-gray-600">Create and share AI-powered learning materials</p>
      </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
        <Card>
          <CardContent className="p-6 text-center">
            <BookOpen className="w-12 h-12 text-blue-600 mx-auto mb-4" />
            <div className="text-2xl font-bold text-gray-900 mb-1">
              {lecturesLoading ? '-' : lectures.length}
            </div>
            <p className="text-sm text-gray-600">Total Lectures</p>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-6 text-center">
            <CheckCircle className="w-12 h-12 text-green-600 mx-auto mb-4" />
            <div className="text-2xl font-bold text-gray-900 mb-1">
              {lecturesLoading ? '-' : completedLectures.length}
            </div>
            <p className="text-sm text-gray-600">Processed Lectures</p>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-6 text-center">
            <Brain className="w-12 h-12 text-purple-600 mx-auto mb-4" />
            <div className="text-2xl font-bold text-gray-900 mb-1">
              {materialsLoading ? '-' : materials.length}
            </div>
            <p className="text-sm text-gray-600">Materials Generated</p>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-6 text-center">
            <Clock className="w-12 h-12 text-orange-600 mx-auto mb-4" />
            <div className="text-2xl font-bold text-gray-900 mb-1">
              {lecturesLoading ? '-' : processingLectures.length}
            </div>
            <p className="text-sm text-gray-600">Processing Queue</p>
          </CardContent>
        </Card>
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
          My Lectures
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
        
        {activeTab === 'generate' && (
          <div className="space-y-6">
            {lectures.length === 0 && !lecturesLoading ? (
              <Card>
                <CardContent className="py-12">
                  <div className="text-center">
                    <Upload className="w-16 h-16 text-gray-300 mx-auto mb-4" />
                    <h3 className="text-lg font-medium text-gray-900 mb-2">No Lectures Yet</h3>
                    <p className="text-gray-500 mb-4">
                      Start by recording or uploading your first lecture to generate AI-powered learning materials.
                    </p>
                    <Button onClick={() => setActiveTab('record')}>
                      <Mic className="w-4 h-4 mr-2" />
                      Record Your First Lecture
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ) : (
              <div className="grid gap-6">
                {lectures.map((lecture) => (
                  <Card key={lecture.id}>
                    <CardHeader>
                      <div className="flex items-start justify-between">
                        <div>
                          <CardTitle className="text-lg">{lecture.title}</CardTitle>
                          <CardDescription>
                            {lecture.subject} • Created {new Date(lecture.created_at).toLocaleDateString()}
                          </CardDescription>
                        </div>
                        <div className="flex items-center gap-2">
                          {getStatusIcon(lecture.processing_status)}
                          <span className="text-sm font-medium">
                            {getStatusText(lecture.processing_status)}
                          </span>
                        </div>
                      </div>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-2">
                        <p><strong>Topic:</strong> {lecture.topic}</p>
                        {lecture.description && (
                          <p><strong>Description:</strong> {lecture.description}</p>
                        )}
                        {lecture.duration && (
                          <p><strong>Duration:</strong> {Math.floor(lecture.duration / 60)}:{String(lecture.duration % 60).padStart(2, '0')}</p>
                        )}
                        {lecture.processing_status === 'completed' && (
                          <div className="mt-4 p-3 bg-green-50 rounded-lg">
                            <p className="text-sm text-green-700 font-medium">
                              ✓ AI processing completed! Study materials have been generated.
                            </p>
                          </div>
                        )}
                        {lecture.processing_status === 'failed' && (
                          <div className="mt-4 p-3 bg-red-50 rounded-lg">
                            <p className="text-sm text-red-700 font-medium">
                              ✗ Processing failed. Please try uploading again.
                            </p>
                          </div>
                        )}
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            )}
          </div>
        )}
        
        {activeTab === 'analytics' && (
          <div className="space-y-6">
            {/* Recent Activity */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <BarChart3 className="w-5 h-5" />
                  Recent Activity
                </CardTitle>
                <CardDescription>Latest lecture uploads and processing status</CardDescription>
              </CardHeader>
              <CardContent>
                {lectures.length === 0 ? (
                  <div className="text-center py-8">
                    <FileText className="w-16 h-16 text-gray-300 mx-auto mb-4" />
                    <h3 className="text-lg font-medium text-gray-900 mb-2">No Activity Yet</h3>
                    <p className="text-gray-500">
                      Analytics will appear here once you start uploading lectures.
                    </p>
                  </div>
                ) : (
                  <div className="space-y-4">
                    {lectures.slice(0, 5).map((lecture) => (
                      <div key={lecture.id} className="flex items-center justify-between p-3 border rounded-lg">
                        <div>
                          <p className="font-medium">{lecture.title}</p>
                          <p className="text-sm text-gray-500">
                            {new Date(lecture.created_at).toLocaleDateString()} • {lecture.subject}
                          </p>
                        </div>
                        <div className="flex items-center gap-2">
                          {getStatusIcon(lecture.processing_status)}
                          <span className="text-sm">{getStatusText(lecture.processing_status)}</span>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </CardContent>
            </Card>
          </div>
        )}
      </div>
    </div>
  );
};

export default FacultyDashboard;
