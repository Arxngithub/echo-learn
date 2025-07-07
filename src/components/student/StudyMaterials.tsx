
import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { ArrowLeft, Search, Download, BookOpen, FileText, Calendar, Filter } from 'lucide-react';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

interface StudyMaterialsProps {
  onBack: () => void;
}

const StudyMaterials = ({ onBack }: StudyMaterialsProps) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [subjectFilter, setSubjectFilter] = useState('all');
  
  const materials = [
    {
      id: 1,
      title: 'Binary Trees - Traversal Methods',
      subject: 'Data Structures',
      type: 'Lecture Summary',
      date: '2024-01-15',
      size: '2.3 MB',
      pages: 8,
      downloadCount: 45,
      description: 'Comprehensive guide covering in-order, pre-order, and post-order traversal methods with examples and time complexity analysis.'
    },
    {
      id: 2,
      title: 'Sorting Algorithms Comparison',
      subject: 'Algorithms',
      type: 'Study Guide',
      date: '2024-01-14',
      size: '1.8 MB',
      pages: 6,
      downloadCount: 38,
      description: 'Detailed comparison of bubble sort, merge sort, quick sort, and heap sort with performance metrics and use cases.'
    },
    {
      id: 3,
      title: 'SQL Joins and Relationships',
      subject: 'Database Systems',
      type: 'Lecture Notes',
      date: '2024-01-13',
      size: '3.1 MB',
      pages: 12,
      downloadCount: 52,
      description: 'Complete reference for SQL joins including inner, outer, left, right joins with practical examples and best practices.'
    },
    {
      id: 4,
      title: 'Machine Learning Fundamentals',
      subject: 'Machine Learning',
      type: 'Lecture Summary',
      date: '2024-01-12',
      size: '4.2 MB',
      pages: 15,
      downloadCount: 67,
      description: 'Introduction to supervised and unsupervised learning, feature engineering, and model evaluation techniques.'
    },
    {
      id: 5,
      title: 'Software Development Lifecycle',
      subject: 'Software Engineering',
      type: 'Study Guide',
      date: '2024-01-11',
      size: '2.7 MB',
      pages: 10,
      downloadCount: 41,
      description: 'Overview of SDLC phases, agile methodologies, testing strategies, and project management principles.'
    }
  ];

  const subjects = ['All Subjects', 'Data Structures', 'Algorithms', 'Database Systems', 'Machine Learning', 'Software Engineering'];

  const filteredMaterials = materials.filter(material => {
    const matchesSearch = material.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         material.subject.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesSubject = subjectFilter === 'all' || material.subject === subjectFilter;
    return matchesSearch && matchesSubject;
  });

  const handleDownload = (materialId: number, title: string) => {
    // Simulate download
    console.log(`Downloading: ${title}`);
  };

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
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
            <h2 className="text-3xl font-bold text-gray-900 mb-2">Study Materials</h2>
            <p className="text-gray-600">Access your AI-generated lecture summaries and study guides</p>
          </div>
          <div className="text-right">
            <p className="text-2xl font-bold text-blue-600">{materials.length}</p>
            <p className="text-sm text-gray-600">Materials Available</p>
          </div>
        </div>
      </div>

      {/* Search and Filters */}
      <Card className="mb-6">
        <CardContent className="p-6">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
              <Input
                placeholder="Search materials..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
            <Select value={subjectFilter} onValueChange={setSubjectFilter}>
              <SelectTrigger className="w-full md:w-48">
                <div className="flex items-center gap-2">
                  <Filter className="w-4 h-4" />
                  <SelectValue placeholder="Filter by subject" />
                </div>
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Subjects</SelectItem>
                <SelectItem value="Data Structures">Data Structures</SelectItem>
                <SelectItem value="Algorithms">Algorithms</SelectItem>
                <SelectItem value="Database Systems">Database Systems</SelectItem>
                <SelectItem value="Machine Learning">Machine Learning</SelectItem>
                <SelectItem value="Software Engineering">Software Engineering</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>

      {/* Materials Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {filteredMaterials.map((material) => (
          <Card key={material.id} className="hover:shadow-lg transition-shadow">
            <CardHeader>
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <CardTitle className="text-lg mb-2">{material.title}</CardTitle>
                  <div className="flex items-center gap-2 mb-2">
                    <Badge variant="secondary">{material.subject}</Badge>
                    <Badge variant="outline">{material.type}</Badge>
                  </div>
                  <CardDescription className="text-sm">
                    {material.description}
                  </CardDescription>
                </div>
                <FileText className="w-8 h-8 text-blue-600 ml-4" />
              </div>
            </CardHeader>
            
            <CardContent>
              <div className="grid grid-cols-2 gap-4 mb-4 text-sm text-gray-600">
                <div className="flex items-center gap-2">
                  <Calendar className="w-4 h-4" />
                  <span>{material.date}</span>
                </div>
                <div>
                  <span>{material.pages} pages • {material.size}</span>
                </div>
                <div>
                  <span>{material.downloadCount} downloads</span>
                </div>
              </div>
              
              <div className="flex gap-2">
                <Button
                  onClick={() => handleDownload(material.id, material.title)}
                  className="flex-1 flex items-center justify-center gap-2"
                >
                  <Download className="w-4 h-4" />
                  Download PDF
                </Button>
                <Button variant="outline" className="flex items-center gap-2">
                  <BookOpen className="w-4 h-4" />
                  Preview
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {filteredMaterials.length === 0 && (
        <Card className="text-center py-12">
          <CardContent>
            <FileText className="w-16 h-16 text-gray-300 mx-auto mb-4" />
            <h3 className="text-lg font-medium mb-2">No materials found</h3>
            <p className="text-gray-600">Try adjusting your search terms or filters</p>
          </CardContent>
        </Card>
      )}

      {/* Study Tips */}
      <Card className="mt-8">
        <CardHeader>
          <CardTitle className="text-lg">Study Tips</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm text-gray-600">
            <div>
              <strong className="text-gray-900">Download for offline:</strong> Save materials to study without internet connection
            </div>
            <div>
              <strong className="text-gray-900">Print key sections:</strong> Physical notes can help with retention
            </div>
            <div>
              <strong className="text-gray-900">Review regularly:</strong> Revisit materials before exams for better results
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default StudyMaterials;
