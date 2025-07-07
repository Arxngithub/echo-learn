
import { useState } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { ArrowLeft, RotateCcw, ChevronLeft, ChevronRight, BookOpen } from 'lucide-react';

interface FlashcardViewerProps {
  onBack: () => void;
}

const FlashcardViewer = ({ onBack }: FlashcardViewerProps) => {
  const [currentCard, setCurrentCard] = useState(0);
  const [isFlipped, setIsFlipped] = useState(false);

  const flashcards = [
    {
      term: "Binary Search Tree (BST)",
      definition: "A binary tree where for each node, all values in the left subtree are less than the node's value, and all values in the right subtree are greater than the node's value."
    },
    {
      term: "In-order Traversal",
      definition: "A tree traversal method that visits nodes in the order: left subtree → root → right subtree. For BST, this gives values in sorted order."
    },
    {
      term: "Pre-order Traversal",
      definition: "A tree traversal method that visits nodes in the order: root → left subtree → right subtree. Used for copying tree structure."
    },
    {
      term: "Post-order Traversal",
      definition: "A tree traversal method that visits nodes in the order: left subtree → right subtree → root. Used for deleting trees safely."
    },
    {
      term: "Time Complexity",
      definition: "For tree traversal operations, the time complexity is O(n) where n is the number of nodes, as each node must be visited exactly once."
    },
    {
      term: "Recursion",
      definition: "A programming technique where a function calls itself to solve smaller instances of the same problem. Fundamental for tree operations."
    }
  ];

  const handleNext = () => {
    if (currentCard < flashcards.length - 1) {
      setCurrentCard(currentCard + 1);
      setIsFlipped(false);
    }
  };

  const handlePrevious = () => {
    if (currentCard > 0) {
      setCurrentCard(currentCard - 1);
      setIsFlipped(false);
    }
  };

  const handleFlip = () => {
    setIsFlipped(!isFlipped);
  };

  const progress = ((currentCard + 1) / flashcards.length) * 100;

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
      {/* Header */}
      <div className="mb-8">
        <Button
          variant="ghost"
          onClick={onBack}
          className="mb-4 flex items-center gap-2"
        >
          <ArrowLeft className="w-4 h-4" />
          Back to Dashboard
        </Button>
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-3xl font-bold text-gray-900 mb-2">Flashcards</h2>
            <p className="text-gray-600">Binary Trees - Traversal Methods</p>
          </div>
          <div className="text-right">
            <p className="text-sm text-gray-600">Card {currentCard + 1} of {flashcards.length}</p>
            <Progress value={progress} className="w-32 mt-2" />
          </div>
        </div>
      </div>

      {/* Flashcard */}
      <div className="mb-8">
        <Card 
          className="h-96 cursor-pointer transform transition-all duration-300 hover:scale-[1.02] shadow-lg"
          onClick={handleFlip}
        >
          <CardContent className="h-full flex flex-col items-center justify-center p-8 text-center">
            <div className="mb-4">
              <BookOpen className="w-8 h-8 text-blue-600 mx-auto" />
            </div>
            
            {!isFlipped ? (
              <div className="space-y-4">
                <h3 className="text-2xl font-bold text-gray-900">
                  {flashcards[currentCard].term}
                </h3>
                <p className="text-gray-500">Click to reveal definition</p>
              </div>
            ) : (
              <div className="space-y-4">
                <p className="text-lg text-gray-700 leading-relaxed">
                  {flashcards[currentCard].definition}
                </p>
                <p className="text-sm text-gray-400">Click to see term again</p>
              </div>
            )}
            
            <div className="mt-6 flex items-center gap-2 text-sm text-gray-400">
              <RotateCcw className="w-4 h-4" />
              Tap to flip
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Navigation */}
      <div className="flex items-center justify-between">
        <Button
          variant="outline"
          onClick={handlePrevious}
          disabled={currentCard === 0}
          className="flex items-center gap-2"
        >
          <ChevronLeft className="w-4 h-4" />
          Previous
        </Button>
        
        <div className="flex items-center gap-4">
          <Button
            variant="secondary"
            onClick={handleFlip}
            className="flex items-center gap-2"
          >
            <RotateCcw className="w-4 h-4" />
            Flip Card
          </Button>
          
          <div className="text-sm text-gray-600 bg-gray-100 px-3 py-1 rounded-full">
            {currentCard + 1} / {flashcards.length}
          </div>
        </div>
        
        <Button
          variant="outline"
          onClick={handleNext}
          disabled={currentCard === flashcards.length - 1}
          className="flex items-center gap-2"
        >
          Next
          <ChevronRight className="w-4 h-4" />
        </Button>
      </div>

      {/* Study Tips */}
      <Card className="mt-8">
        <CardContent className="p-6">
          <h4 className="font-semibold mb-3">Study Tips</h4>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm text-gray-600">
            <div>
              <strong>Review regularly:</strong> Go through flashcards daily for better retention
            </div>
            <div>
              <strong>Active recall:</strong> Try to remember the definition before flipping
            </div>
            <div>
              <strong>Spaced repetition:</strong> Focus more on cards you find difficult
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default FlashcardViewer;
