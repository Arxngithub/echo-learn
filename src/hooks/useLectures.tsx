
import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from './useAuth';
import { toast } from '@/hooks/use-toast';

interface Lecture {
  id: string;
  title: string;
  subject: string;
  topic: string;
  description: string;
  duration: number;
  audio_url: string;
  transcript: string;
  processing_status: string;
  created_at: string;
  updated_at: string;
}

export const useLectures = () => {
  const [lectures, setLectures] = useState<Lecture[]>([]);
  const [loading, setLoading] = useState(true);
  const { user } = useAuth();

  useEffect(() => {
    if (user) {
      fetchLectures();
    }
  }, [user]);

  const fetchLectures = async () => {
    try {
      const { data, error } = await supabase
        .from('lectures')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) throw error;
      setLectures(data || []);
    } catch (error) {
      console.error('Error fetching lectures:', error);
      toast({
        title: "Error",
        description: "Failed to fetch lectures",
        variant: "destructive"
      });
    } finally {
      setLoading(false);
    }
  };

  const uploadLecture = async (
    audioFile: File,
    metadata: {
      title: string;
      subject: string;
      topic: string;
      description: string;
    }
  ) => {
    try {
      setLoading(true);

      // Upload audio file to storage
      const fileName = `${Date.now()}-${audioFile.name}`;
      const { data: uploadData, error: uploadError } = await supabase.storage
        .from('lecture-audio')
        .upload(fileName, audioFile);

      if (uploadError) throw uploadError;

      // Get public URL for the uploaded file
      const { data: { publicUrl } } = supabase.storage
        .from('lecture-audio')
        .getPublicUrl(fileName);

      // Create lecture record
      const { data: lectureData, error: lectureError } = await supabase
        .from('lectures')
        .insert({
          title: metadata.title,
          subject: metadata.subject,
          topic: metadata.topic,
          description: metadata.description,
          audio_url: publicUrl,
          faculty_id: user?.id,
          processing_status: 'pending'
        })
        .select()
        .single();

      if (lectureError) throw lectureError;

      // Process lecture with OpenAI
      const { error: functionError } = await supabase.functions.invoke('process-lecture', {
        body: {
          lectureId: lectureData.id,
          audioUrl: publicUrl
        }
      });

      if (functionError) {
        console.error('Error processing lecture:', functionError);
        toast({
          title: "Upload Successful",
          description: "Audio uploaded but processing failed. You can retry processing later.",
          variant: "default"
        });
      } else {
        toast({
          title: "Success",
          description: "Lecture uploaded and processing started!",
        });
      }

      await fetchLectures();
      return { success: true, lectureId: lectureData.id };

    } catch (error) {
      console.error('Error uploading lecture:', error);
      toast({
        title: "Upload Failed",
        description: error.message || "Failed to upload lecture",
        variant: "destructive"
      });
      return { success: false, error: error.message };
    } finally {
      setLoading(false);
    }
  };

  const deleteLecture = async (lectureId: string) => {
    try {
      const { error } = await supabase
        .from('lectures')
        .delete()
        .eq('id', lectureId);

      if (error) throw error;

      toast({
        title: "Success",
        description: "Lecture deleted successfully",
      });

      await fetchLectures();
    } catch (error) {
      console.error('Error deleting lecture:', error);
      toast({
        title: "Error",
        description: "Failed to delete lecture",
        variant: "destructive"
      });
    }
  };

  return {
    lectures,
    loading,
    uploadLecture,
    deleteLecture,
    refreshLectures: fetchLectures
  };
};
