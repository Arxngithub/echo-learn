
import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { toast } from '@/hooks/use-toast';

interface LectureMaterial {
  id: string;
  lecture_id: string;
  type: 'summary' | 'notes' | 'flashcards' | 'quiz';
  title: string;
  content: any;
  created_at: string;
  updated_at: string;
}

export const useLectureMaterials = (lectureId?: string) => {
  const [materials, setMaterials] = useState<LectureMaterial[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (lectureId) {
      fetchMaterials();
    } else {
      fetchAllMaterials();
    }
  }, [lectureId]);

  const fetchMaterials = async () => {
    try {
      let query = supabase
        .from('lecture_materials')
        .select('*')
        .order('created_at', { ascending: false });

      if (lectureId) {
        query = query.eq('lecture_id', lectureId);
      }

      const { data, error } = await query;

      if (error) throw error;
      setMaterials(data || []);
    } catch (error) {
      console.error('Error fetching materials:', error);
      toast({
        title: "Error",
        description: "Failed to fetch lecture materials",
        variant: "destructive"
      });
    } finally {
      setLoading(false);
    }
  };

  const fetchAllMaterials = async () => {
    try {
      const { data, error } = await supabase
        .from('lecture_materials')
        .select(`
          *,
          lectures (
            title,
            subject,
            topic
          )
        `)
        .order('created_at', { ascending: false });

      if (error) throw error;
      setMaterials(data || []);
    } catch (error) {
      console.error('Error fetching all materials:', error);
      toast({
        title: "Error",
        description: "Failed to fetch lecture materials",
        variant: "destructive"
      });
    } finally {
      setLoading(false);
    }
  };

  const getMaterialsByType = (type: string) => {
    return materials.filter(material => material.type === type);
  };

  return {
    materials,
    loading,
    getMaterialsByType,
    refreshMaterials: lectureId ? fetchMaterials : fetchAllMaterials
  };
};
