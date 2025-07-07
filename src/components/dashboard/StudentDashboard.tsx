
import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { BookOpen, Brain, HelpCircle, Calendar, Award, TrendingUp, Clock, CheckCircle } from 'lucide-react';
import FlashcardViewer from '@/components/student/FlashcardViewer';
import QuizInterface from '@/components/student/QuizInterface';
import StudyMaterials from '@/components/student/StudyMaterials';

const StudentDashboard = () => {
  const [activeView, setActiveView] = useState<'overview' | 'flashcards' | 'quiz' | 'materials'>('overview');

  const stats = [
    { label: 'Lectures Studied', value: '18', icon: BookOpen, color: 'text-blue-600' },
    { label: 'Flashcards Reviewed', value: '247', icon: Brain, color: 'text-green-600' },
    { label: 'Quizzes Completed', value: '12', icon: HelpCircle, color: 'text-purple-600' },
    { label: 'Average Score', value: '85%', icon: Award, color: 'text-orange-600' },
  ];

  const recentLectures = [
    {
      id: 1,
      subject: 'Data Structures',
      topic: 'Binary Trees - Traversal Methods',
      date: '2024-01-15',
      completed: true,
      score: 92
    },
    {
      id: 2,
      subject: 'Algorithms',
      topic: 'Sorting Algorithms Comparison',
      date: '2024-01-14',
      completed: true,
      score: 88
    },
    {
      id: 3,
      subject: 'Database Systems',
      topic: 'SQL Joins and Relationships',
      date: '2024-01-13',
      completed: false,
      score: null
    }
  ];

  const upcomingTasks = [
    { task: 'Review Binary Tree concepts', due: 'Today', priority: 'high' },
    { task: 'Complete SQL Quiz', due: 'Tomorrow', priority: 'medium' },
    { task: 'Study Sorting Algorithms', due: 'Jan 18', priority: 'low' }
  ];

  if (activeView === 'flashcards') {
    return <FlashcardViewer onBack={() => setActiveView('overview')} />;
  }

  if (activeView === 'quiz') {
    return <QuizInterface onBack={() => setActiveView('overview')} />;
  }

  if (activeView === 'materials') {
    return <StudyMaterials onBack={() => setActiveView('overview')} />;
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="mb-8">
        <h2 className="text-3xl font-bold text-gray-900 mb-2">Student Portal</h2>
        <p className="text-gray-600">Access your AI-generated study materials and track progress</p>
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

      {/* Quick Actions */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
        <Button
          onClick={() => setActiveView('materials')}
          className="h-20 bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white flex flex-col items-center justify-center gap-2"
        >
          <BookOpen className="w-6 h-6" />
          Study Materials
        </Button>
        <Button
          onClick={() => setActiveView('flashcards')}
          className="h-20 bg-gradient-to-r from-green-600 to-green-700 hover:from-green-700 hover:to-green-800 text-white flex flex-col items-center justify-center gap-2"
        >
          <Brain className="w-6 h-6" />
          Flashcards
        </Button>
        <Button
          onClick={() => setActiveView('quiz')}
          className="h-20 bg-gradient-to-r from-purple-600 to-purple-700 hover:from-purple-700 hover:to-purple-800 text-white flex flex-col items-center justify-center gap-2"
        >
          <HelpCircle className="w-6 h-6" />
          Take Quiz
        </Button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Recent Lectures */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <BookOpen className="w-5 h-5" />
              Recent Lectures
            </CardTitle>
            <CardDescription>Your latest study materials</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {recentLectures.map((lecture) => (
                <div key={lecture.id} className="flex items-center justify-between p-3 border rounded-lg hover:bg-gray-50">
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-1">
                      <h4 className="font-medium text-sm">{lecture.topic}</h4>
                      {lecture.completed && (
                        <CheckCircle className="w-4 h-4 text-green-600" />
                      )}
                    </div>
                    <div className="flex items-center gap-3 text-xs text-gray-600">
                      <span>{lecture.subject}</span>
                      <span>{lecture.date}</span>
                      {lecture.score && (
                        <Badge variant="secondary" className="text-xs">
                          {lecture.score}%
                        </Badge>
                      )}
                    </div>
                  </div>
                  <Button size="sm" variant="outline">
                    {lecture.completed ? 'Review' : 'Start'}
                  </Button>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Upcoming Tasks */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Calendar className="w-5 h-5" />
              Study Plan
            </CardTitle>
            <CardDescription>AI-recommended tasks for this week</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {upcomingTasks.map((task, index) => (
                <div key={index} className="flex items-center justify-between p-3 border rounded-lg">
                  <div className="flex-1">
                    <p className="font-medium text-sm">{task.task}</p>
                    <div className="flex items-center gap-2 mt-1">
                      <Clock className="w-3 h-3 text-gray-500" />
                      <span className="text-xs text-gray-600">{task.due}</span>
                      <Badge 
                        variant={task.priority === 'high' ? 'destructive' : task.priority === 'medium' ? 'default' : 'secondary'}
                        className="text-xs"
                      >
                        {task.priority}
                      </Badge>
                    </div>
                  </div>
                  <Button size="sm" variant="ghost">
                    <CheckCircle className="w-4 h-4" />
                  </Button>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default StudentDashboard;
