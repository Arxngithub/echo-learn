
import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';
import { Brain, FileText, BookOpen, HelpCircle, Share2, Download, Eye } from 'lucide-react';
import { toast } from '@/hooks/use-toast';

const ContentGenerator = () => {
  const [generating, setGenerating] = useState(false);
  const [progress, setProgress] = useState(0);
  const [generatedContent, setGeneratedContent] = useState<any>(null);

  const recentLectures = [
    {
      id: 1,
      subject: 'Data Structures',
      topic: 'Binary Trees - Traversal Methods',
      date: '2024-01-15',
      duration: '45 min',
      status: 'processed'
    },
    {
      id: 2,
      subject: 'Algorithms',
      topic: 'Sorting Algorithms Comparison',
      date: '2024-01-14',
      duration: '38 min',
      status: 'processing'
    },
    {
      id: 3,
      subject: 'Database Systems',
      topic: 'SQL Joins and Relationships',
      date: '2024-01-13',
      duration: '52 min',
      status: 'processed'
    }
  ];

  const handleGenerateContent = async (lectureId: number) => {
    setGenerating(true);
    setProgress(0);
    
    // Simulate AI processing
    const steps = [
      { step: 'Transcribing audio...', progress: 20 },
      { step: 'Analyzing content...', progress: 40 },
      { step: 'Generating summary...', progress: 60 },
      { step: 'Creating flashcards...', progress: 80 },
      { step: 'Generating quiz...', progress: 90 },
      { step: 'Finalizing materials...', progress: 100 }
    ];

    for (const step of steps) {
      await new Promise(resolve => setTimeout(resolve, 1000));
      setProgress(step.progress);
      
      if (step.progress === 100) {
        setGeneratedContent({
          summary: "This lecture covered binary tree traversal methods including in-order, pre-order, and post-order traversal. Key concepts include recursive and iterative approaches, time complexity analysis (O(n)), and practical applications in expression parsing and tree serialization.",
          flashcards: [
            { term: "In-order Traversal", definition: "Visit left subtree, root node, then right subtree. Results in sorted order for BST." },
            { term: "Pre-order Traversal", definition: "Visit root node first, then left subtree, then right subtree. Used for tree copying." },
            { term: "Post-order Traversal", definition: "Visit left subtree, right subtree, then root node. Used for tree deletion." }
          ],
          quiz: [
            {
              question: "What is the time complexity of tree traversal?",
              options: ["O(log n)", "O(n)", "O(n²)", "O(1)"],
              correct: 1
            },
            {
              question: "Which traversal visits the root node first?",
              options: ["In-order", "Pre-order", "Post-order", "Level-order"],
              correct: 1
            }
          ]
        });
      }
    }
    
    setGenerating(false);
    toast({
      title: "Content Generated Successfully!",
      description: "All study materials are ready for review and sharing.",
    });
  };

  const handleShareContent = () => {
    toast({
      title: "Content Shared",
      description: "Study materials have been sent to all enrolled students.",
    });
  };

  return (
    <div className="space-y-6">
      {/* Recent Lectures */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Brain className="w-5 h-5" />
            AI Content Generation
          </CardTitle>
          <CardDescription>Generate study materials from your recorded lectures</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {recentLectures.map((lecture) => (
              <div key={lecture.id} className="flex items-center justify-between p-4 border rounded-lg hover:bg-gray-50">
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-2">
                    <h4 className="font-medium">{lecture.topic}</h4>
                    <Badge variant={lecture.status === 'processed' ? 'default' : 'secondary'}>
                      {lecture.status}
                    </Badge>
                  </div>
                  <div className="flex items-center gap-4 text-sm text-gray-600">
                    <span>{lecture.subject}</span>
                    <span>{lecture.date}</span>
                    <span>{lecture.duration}</span>
                  </div>
                </div>
                
                <div className="flex items-center gap-2">
                  {lecture.status === 'processed' ? (
                    <>
                      <Button variant="outline" size="sm">
                        <Eye className="w-4 h-4 mr-1" />
                        View
                      </Button>
                      <Button size="sm">
                        <Share2 className="w-4 h-4 mr-1" />
                        Share
                      </Button>
                    </>
                  ) : (
                    <Button 
                      onClick={() => handleGenerateContent(lecture.id)}
                      disabled={generating}
                      size="sm"
                    >
                      <Brain className="w-4 h-4 mr-1" />
                      Generate
                    </Button>
                  )}
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Generation Progress */}
      {generating && (
        <Card>
          <CardContent className="pt-6">
            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <span className="text-sm font-medium">Generating AI Content...</span>
                <span className="text-sm text-gray-600">{progress}%</span>
              </div>
              <Progress value={progress} className="w-full" />
              <p className="text-xs text-gray-500">This may take a few minutes depending on lecture length</p>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Generated Content Preview */}
      {generatedContent && (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-lg">
                <FileText className="w-5 h-5" />
                Summary
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-gray-700 mb-4">{generatedContent.summary}</p>
              <div className="flex gap-2">
                <Button size="sm" variant="outline">
                  <Download className="w-4 h-4 mr-1" />
                  PDF
                </Button>
                <Button size="sm" onClick={handleShareContent}>
                  <Share2 className="w-4 h-4 mr-1" />
                  Share
                </Button>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-lg">
                <BookOpen className="w-5 h-5" />
                Flashcards
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3 mb-4">
                {generatedContent.flashcards.slice(0, 2).map((card: any, index: number) => (
                  <div key={index} className="text-xs border rounded p-2">
                    <div className="font-medium mb-1">{card.term}</div>
                    <div className="text-gray-600">{card.definition}</div>
                  </div>
                ))}
              </div>
              <div className="flex gap-2">
                <Button size="sm" variant="outline">
                  <Eye className="w-4 h-4 mr-1" />
                  View All
                </Button>
                <Button size="sm" onClick={handleShareContent}>
                  <Share2 className="w-4 h-4 mr-1" />
                  Share
                </Button>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-lg">
                <HelpCircle className="w-5 h-5" />
                Quiz
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3 mb-4">
                {generatedContent.quiz.slice(0, 1).map((q: any, index: number) => (
                  <div key={index} className="text-xs">
                    <div className="font-medium mb-2">{q.question}</div>
                    <div className="space-y-1">
                      {q.options.slice(0, 2).map((option: string, i: number) => (
                        <div key={i} className="text-gray-600">• {option}</div>
                      ))}
                      <div className="text-gray-500">+ 2 more options</div>
                    </div>
                  </div>
                ))}
              </div>
              <div className="flex gap-2">
                <Button size="sm" variant="outline">
                  <Eye className="w-4 h-4 mr-1" />
                  Preview
                </Button>
                <Button size="sm" onClick={handleShareContent}>
                  <Share2 className="w-4 h-4 mr-1" />
                  Share
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      )}
    </div>
  );
};

export default ContentGenerator;
