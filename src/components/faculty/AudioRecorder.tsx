
import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Mic, Square, Upload, FileAudio, Play, Pause } from 'lucide-react';
import { toast } from '@/hooks/use-toast';

const AudioRecorder = () => {
  const [isRecording, setIsRecording] = useState(false);
  const [recordingTime, setRecordingTime] = useState(0);
  const [subject, setSubject] = useState('');
  const [topic, setTopic] = useState('');
  const [description, setDescription] = useState('');

  const handleStartRecording = () => {
    setIsRecording(true);
    setRecordingTime(0);
    // Start timer
    const timer = setInterval(() => {
      setRecordingTime(prev => prev + 1);
    }, 1000);
    
    toast({
      title: "Recording Started",
      description: "Your lecture is being recorded...",
    });
  };

  const handleStopRecording = () => {
    setIsRecording(false);
    toast({
      title: "Recording Stopped",
      description: `Lecture recorded for ${Math.floor(recordingTime / 60)}:${String(recordingTime % 60).padStart(2, '0')}`,
    });
  };

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${String(mins).padStart(2, '0')}:${String(secs).padStart(2, '0')}`;
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
      {/* Recording Controls */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Mic className="w-5 h-5" />
            Record New Lecture
          </CardTitle>
          <CardDescription>Capture your lecture audio for AI processing</CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="subject">Subject</Label>
                <Select value={subject} onValueChange={setSubject}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select subject" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="data-structures">Data Structures</SelectItem>
                    <SelectItem value="algorithms">Algorithms</SelectItem>
                    <SelectItem value="database-systems">Database Systems</SelectItem>
                    <SelectItem value="machine-learning">Machine Learning</SelectItem>
                    <SelectItem value="software-engineering">Software Engineering</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label htmlFor="topic">Topic</Label>
                <Input
                  id="topic"
                  value={topic}
                  onChange={(e) => setTopic(e.target.value)}
                  placeholder="e.g., Binary Trees"
                />
              </div>
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="description">Description (Optional)</Label>
              <Textarea
                id="description"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                placeholder="Brief description of the lecture content..."
                rows={3}
              />
            </div>
          </div>

          {/* Recording Interface */}
          <div className="bg-gray-50 rounded-lg p-6 text-center space-y-4">
            <div className="text-4xl font-mono font-bold text-gray-700">
              {formatTime(recordingTime)}
            </div>
            
            <div className="flex justify-center gap-4">
              {!isRecording ? (
                <Button
                  onClick={handleStartRecording}
                  size="lg"
                  className="bg-red-600 hover:bg-red-700 text-white px-8"
                  disabled={!subject || !topic}
                >
                  <Mic className="w-5 h-5 mr-2" />
                  Start Recording
                </Button>
              ) : (
                <Button
                  onClick={handleStopRecording}
                  size="lg"
                  variant="outline"
                  className="border-red-600 text-red-600 hover:bg-red-50 px-8"
                >
                  <Square className="w-5 h-5 mr-2" />
                  Stop Recording
                </Button>
              )}
            </div>
            
            {isRecording && (
              <div className="flex items-center justify-center gap-2 text-red-600">
                <div className="w-3 h-3 bg-red-600 rounded-full animate-pulse"></div>
                <span className="text-sm font-medium">Recording in progress...</span>
              </div>
            )}
          </div>
        </CardContent>
      </Card>

      {/* Upload Alternative */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Upload className="w-5 h-5" />
            Upload Audio File
          </CardTitle>
          <CardDescription>Upload pre-recorded lecture audio files</CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center space-y-4 hover:border-blue-400 transition-colors">
            <FileAudio className="w-12 h-12 text-gray-400 mx-auto" />
            <div>
              <p className="text-lg font-medium text-gray-700">Drop your audio file here</p>
              <p className="text-sm text-gray-500">or click to browse</p>
            </div>
            <Button variant="outline">
              Choose File
            </Button>
          </div>
          
          <div className="text-xs text-gray-500 space-y-1">
            <p>Supported formats: MP3, WAV, M4A, FLAC</p>
            <p>Maximum file size: 500MB</p>
            <p>Maximum duration: 3 hours</p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default AudioRecorder;
