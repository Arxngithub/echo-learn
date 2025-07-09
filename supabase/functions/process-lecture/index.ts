
import { serve } from "https://deno.land/std@0.168.0/http/server.ts"
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2'

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
}

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response('ok', { headers: corsHeaders })
  }

  try {
    const { lectureId, audioUrl } = await req.json()
    
    const supabaseClient = createClient(
      Deno.env.get('SUPABASE_URL') ?? '',
      Deno.env.get('SUPABASE_SERVICE_ROLE_KEY') ?? ''
    )

    // Update processing status
    await supabaseClient
      .from('lectures')
      .update({ processing_status: 'processing' })
      .eq('id', lectureId)

    // Get OpenAI API key
    const openaiApiKey = Deno.env.get('OPENAI_API_KEY')
    if (!openaiApiKey) {
      throw new Error('OpenAI API key not configured')
    }

    // Download audio file
    const audioResponse = await fetch(audioUrl)
    const audioBlob = await audioResponse.blob()

    // Transcribe audio using OpenAI Whisper
    const formData = new FormData()
    formData.append('file', audioBlob, 'audio.wav')
    formData.append('model', 'whisper-1')
    formData.append('response_format', 'text')

    const transcriptionResponse = await fetch('https://api.openai.com/v1/audio/transcriptions', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${openaiApiKey}`,
      },
      body: formData,
    })

    const transcript = await transcriptionResponse.text()

    // Update lecture with transcript
    await supabaseClient
      .from('lectures')
      .update({ 
        transcript,
        processing_status: 'generating_content'
      })
      .eq('id', lectureId)

    // Generate study materials using OpenAI
    const generateContent = async (type: string, prompt: string) => {
      const response = await fetch('https://api.openai.com/v1/chat/completions', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${openaiApiKey}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          model: 'gpt-4',
          messages: [
            {
              role: 'system',
              content: `You are an educational content generator. Create ${type} based on lecture transcripts.`
            },
            {
              role: 'user',
              content: `${prompt}\n\nTranscript: ${transcript}`
            }
          ],
          max_tokens: 2000,
          temperature: 0.7,
        }),
      })

      const data = await response.json()
      return data.choices[0].message.content
    }

    // Generate different types of content
    const summaryContent = await generateContent('summary', 'Create a comprehensive summary of this lecture')
    const notesContent = await generateContent('notes', 'Create detailed study notes from this lecture')
    const flashcardsContent = await generateContent('flashcards', 'Create 10 flashcards in JSON format with question and answer fields')
    const quizContent = await generateContent('quiz', 'Create a 5-question multiple choice quiz in JSON format with questions, options, and correct answers')

    // Save generated content to database
    const materials = [
      {
        lecture_id: lectureId,
        type: 'summary',
        title: 'Lecture Summary',
        content: { text: summaryContent }
      },
      {
        lecture_id: lectureId,
        type: 'notes',
        title: 'Study Notes',
        content: { text: notesContent }
      },
      {
        lecture_id: lectureId,
        type: 'flashcards',
        title: 'Flashcards',
        content: JSON.parse(flashcardsContent)
      },
      {
        lecture_id: lectureId,
        type: 'quiz',
        title: 'Practice Quiz',
        content: JSON.parse(quizContent)
      }
    ]

    await supabaseClient
      .from('lecture_materials')
      .insert(materials)

    // Mark processing as complete
    await supabaseClient
      .from('lectures')
      .update({ processing_status: 'completed' })
      .eq('id', lectureId)

    return new Response(
      JSON.stringify({ success: true, message: 'Lecture processed successfully' }),
      {
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        status: 200,
      }
    )

  } catch (error) {
    console.error('Error processing lecture:', error)
    return new Response(
      JSON.stringify({ error: error.message }),
      {
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        status: 500,
      }
    )
  }
})
