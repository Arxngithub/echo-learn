
import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';
import { ArrowLeft, Clock, Award, CheckCircle, X } from 'lucide-react';
import { toast } from '@/hooks/use-toast';

interface QuizInterfaceProps {
  onBack: () => void;
}

const QuizInterface = ({ onBack }: QuizInterfaceProps) => {
  const [quizStarted, setQuizStarted] = useState(false);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedAnswers, setSelectedAnswers] = useState<number[]>([]);
  const [quizCompleted, setQuizCompleted] = useState(false);
  const [score, setScore] = useState(0);

  const quiz = {
    title: "Binary Trees - Traversal Methods",
    subject: "Data Structures",
    timeLimit: 10, // minutes
    questions: [
      {
        question: "What is the time complexity of tree traversal algorithms?",
        options: ["O(log n)", "O(n)", "O(n²)", "O(1)"],
        correct: 1,
        explanation: "Tree traversal visits each node exactly once, so the time complexity is O(n) where n is the number of nodes."
      },
      {
        question: "Which traversal method visits the root node first?",
        options: ["In-order", "Pre-order", "Post-order", "Level-order"],
        correct: 1,
        explanation: "Pre-order traversal visits nodes in the order: root → left subtree → right subtree."
      },
      {
        question: "In a Binary Search Tree, which traversal gives values in sorted order?",
        options: ["Pre-order", "In-order", "Post-order", "Any order"],
        correct: 1,
        explanation: "In-order traversal of a BST visits nodes in ascending order: left → root → right."
      },
      {
        question: "Which traversal is best for safely deleting a tree?",
        options: ["Pre-order", "In-order", "Post-order", "Level-order"],
        correct: 2,
        explanation: "Post-order traversal deletes children before parent, preventing memory leaks."
      },
      {
        question: "What is the space complexity of recursive tree traversal?",
        options: ["O(1)", "O(log n)", "O(n)", "O(n²)"],
        correct: 2,
        explanation: "In the worst case (skewed tree), the recursion stack can be O(n). For balanced trees, it's O(log n)."
      }
    ]
  };

  const handleStartQuiz = () => {
    setQuizStarted(true);
    setCurrentQuestion(0);
    setSelectedAnswers([]);
    setQuizCompleted(false);
  };

  const handleAnswerSelect = (answerIndex: number) => {
    const newAnswers = [...selectedAnswers];
    newAnswers[currentQuestion] = answerIndex;
    setSelectedAnswers(newAnswers);
  };

  const handleNext = () => {
    if (currentQuestion < quiz.questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
    } else {
      handleCompleteQuiz();
    }
  };

  const handleCompleteQuiz = () => {
    const correctAnswers = selectedAnswers.filter(
      (answer, index) => answer === quiz.questions[index].correct
    ).length;
    
    const finalScore = Math.round((correctAnswers / quiz.questions.length) * 100);
    setScore(finalScore);
    setQuizCompleted(true);
    
    toast({
      title: "Quiz Completed!",
      description: `You scored ${finalScore}% (${correctAnswers}/${quiz.questions.length})`,
    });
  };

  const progress = ((currentQuestion + 1) / quiz.questions.length) * 100;

  if (!quizStarted) {
    return (
      <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8">
        <Button
          variant="ghost"
          onClick={onBack}
          className="mb-4 flex items-center gap-2"
        >
          <ArrowLeft className="w-4 h-4" />
          Back to Dashboard
        </Button>

        <Card className="shadow-lg">
          <CardHeader className="text-center">
            <CardTitle className="text-2xl">{quiz.title}</CardTitle>
            <CardDescription>{quiz.subject}</CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-center">
              <div className="space-y-2">
                <div className="text-2xl font-bold text-blue-600">{quiz.questions.length}</div>
                <p className="text-sm text-gray-600">Questions</p>
              </div>
              <div className="space-y-2">
                <div className="text-2xl font-bold text-green-600">{quiz.timeLimit}</div>
                <p className="text-sm text-gray-600">Minutes</p>
              </div>
              <div className="space-y-2">
                <div className="text-2xl font-bold text-purple-600">80%</div>
                <p className="text-sm text-gray-600">Pass Mark</p>
              </div>
            </div>
            
            <div className="space-y-3 text-sm text-gray-600">
              <h4 className="font-medium">Instructions:</h4>
              <ul className="space-y-1 list-disc list-inside">
                <li>Answer all questions to complete the quiz</li>
                <li>You can review and change answers before submitting</li>
                <li>Each question has only one correct answer</li>
                <li>Take your time to read each question carefully</li>
              </ul>
            </div>
            
            <Button
              onClick={handleStartQuiz}
              className="w-full h-12 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white text-lg"
            >
              Start Quiz
            </Button>
          </CardContent>
        </Card>
      </div>
    );
  }

  if (quizCompleted) {
    return (
      <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8">
        <Card className="shadow-lg">
          <CardHeader className="text-center">
            <div className="mx-auto w-16 h-16 bg-gradient-to-r from-green-500 to-blue-500 rounded-full flex items-center justify-center mb-4">
              <Award className="w-8 h-8 text-white" />
            </div>
            <CardTitle className="text-2xl">Quiz Completed!</CardTitle>
            <CardDescription>Your results for {quiz.title}</CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="text-center">
              <div className="text-4xl font-bold text-gray-900 mb-2">{score}%</div>
              <p className="text-gray-600">
                {selectedAnswers.filter((answer, index) => answer === quiz.questions[index].correct).length} out of {quiz.questions.length} correct
              </p>
              <Badge 
                variant={score >= 80 ? "default" : "secondary"}
                className="mt-2"
              >
                {score >= 80 ? "Passed" : "Needs Review"}
              </Badge>
            </div>

            <div className="space-y-4">
              <h4 className="font-medium">Review Your Answers:</h4>
              {quiz.questions.map((question, index) => (
                <div key={index} className="border rounded-lg p-4">
                  <div className="flex items-start gap-2 mb-2">
                    {selectedAnswers[index] === question.correct ? (
                      <CheckCircle className="w-5 h-5 text-green-600 mt-0.5" />
                    ) : (
                      <X className="w-5 h-5 text-red-600 mt-0.5" />
                    )}
                    <div className="flex-1">
                      <p className="font-medium text-sm">{question.question}</p>
                      <p className="text-xs text-gray-600 mt-1">
                        Your answer: {question.options[selectedAnswers[index]]}
                      </p>
                      {selectedAnswers[index] !== question.correct && (
                        <p className="text-xs text-green-600 mt-1">
                          Correct: {question.options[question.correct]}
                        </p>
                      )}
                      <p className="text-xs text-gray-500 mt-2">{question.explanation}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <div className="flex gap-4">
              <Button variant="outline" onClick={onBack} className="flex-1">
                Back to Dashboard
              </Button>
              <Button onClick={handleStartQuiz} className="flex-1">
                Retake Quiz
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8">
      {/* Header */}
      <div className="mb-6">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-xl font-bold text-gray-900">{quiz.title}</h2>
          <div className="flex items-center gap-2 text-sm text-gray-600">
            <Clock className="w-4 h-4" />
            <span>Question {currentQuestion + 1} of {quiz.questions.length}</span>
          </div>
        </div>
        <Progress value={progress} className="w-full" />
      </div>

      {/* Question */}
      <Card className="shadow-lg">
        <CardHeader>
          <CardTitle className="text-lg">
            {quiz.questions[currentQuestion].question}
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-3">
            {quiz.questions[currentQuestion].options.map((option, index) => (
              <button
                key={index}
                onClick={() => handleAnswerSelect(index)}
                className={`w-full text-left p-4 border rounded-lg transition-all ${
                  selectedAnswers[currentQuestion] === index
                    ? 'border-blue-500 bg-blue-50'
                    : 'border-gray-200 hover:border-gray-300 hover:bg-gray-50'
                }`}
              >
                <div className="flex items-center gap-3">
                  <div className={`w-4 h-4 rounded-full border-2 ${
                    selectedAnswers[currentQuestion] === index
                      ? 'border-blue-500 bg-blue-500'
                      : 'border-gray-300'
                  }`}>
                    {selectedAnswers[currentQuestion] === index && (
                      <div className="w-2 h-2 bg-white rounded-full mx-auto mt-0.5" />
                    )}
                  </div>
                  <span>{option}</span>
                </div>
              </button>
            ))}
          </div>

          <div className="flex justify-between pt-6">
            <Button
              variant="outline"
              onClick={() => setCurrentQuestion(currentQuestion - 1)}
              disabled={currentQuestion === 0}
            >
              Previous
            </Button>
            
            <Button
              onClick={handleNext}
              disabled={selectedAnswers[currentQuestion] === undefined}
              className={currentQuestion === quiz.questions.length - 1 ? 
                'bg-green-600 hover:bg-green-700' : ''
              }
            >
              {currentQuestion === quiz.questions.length - 1 ? 'Complete Quiz' : 'Next'}
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default QuizInterface;
