
import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { BookOpen, Brain, HelpCircle, Calendar, GraduationCap, Award, Clock, Target } from 'lucide-react';
import FlashcardViewer from '@/components/student/FlashcardViewer';
import QuizInterface from '@/components/student/QuizInterface';
import StudyMaterials from '@/components/student/StudyMaterials';

const StudentDashboard = () => {
  const [activeView, setActiveView] = useState<'overview' | 'flashcards' | 'quiz' | 'materials'>('overview');

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

      {/* Welcome Card for New Students */}
      <Card className="mb-8 bg-gradient-to-r from-green-50 to-emerald-50 border-green-200">
        <CardContent className="p-6">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 bg-gradient-to-r from-green-600 to-emerald-600 rounded-lg flex items-center justify-center">
              <GraduationCap className="w-6 h-6 text-white" />
            </div>
            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-1">Welcome to Your Learning Journey!</h3>
              <p className="text-gray-600">Your study materials will appear here once your faculty starts uploading lectures.</p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Progress Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
        <Card>
          <CardContent className="p-4 text-center">
            <Award className="w-8 h-8 text-yellow-600 mx-auto mb-2" />
            <div className="text-xl font-bold text-gray-900">-</div>
            <p className="text-xs text-gray-600">Quizzes Completed</p>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-4 text-center">
            <Brain className="w-8 h-8 text-blue-600 mx-auto mb-2" />
            <div className="text-xl font-bold text-gray-900">-</div>
            <p className="text-xs text-gray-600">Flashcards Studied</p>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-4 text-center">
            <Clock className="w-8 h-8 text-green-600 mx-auto mb-2" />
            <div className="text-xl font-bold text-gray-900">-</div>
            <p className="text-xs text-gray-600">Study Hours</p>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-4 text-center">
            <Target className="w-8 h-8 text-purple-600 mx-auto mb-2" />
            <div className="text-xl font-bold text-gray-900">-</div>
            <p className="text-xs text-gray-600">Average Score</p>
          </CardContent>
        </Card>
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
        {/* Recent Lectures - Empty State */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <BookOpen className="w-5 h-5" />
              Recent Lectures
            </CardTitle>
            <CardDescription>Your latest study materials</CardDescription>
          </CardHeader>
          <CardContent className="py-12">
            <div className="text-center">
              <BookOpen className="w-16 h-16 text-gray-300 mx-auto mb-4" />
              <h3 className="text-lg font-medium text-gray-900 mb-2">No Lectures Yet</h3>
              <p className="text-gray-500">
                Lectures will appear here once your faculty starts uploading content.
              </p>
            </div>
          </CardContent>
        </Card>

        {/* Study Plan - Empty State */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Calendar className="w-5 h-5" />
              Study Plan
            </CardTitle>
            <CardDescription>AI-recommended tasks for this week</CardDescription>
          </CardHeader>
          <CardContent className="py-12">
            <div className="text-center">
              <Calendar className="w-16 h-16 text-gray-300 mx-auto mb-4" />
              <h3 className="text-lg font-medium text-gray-900 mb-2">No Study Plan Yet</h3>
              <p className="text-gray-500">
                Your personalized study plan will be generated based on your learning progress.
              </p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default StudentDashboard;
