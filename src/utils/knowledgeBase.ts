import { supabase } from './supabase';

// Interface for a document in our knowledge base
export interface KnowledgeDocument {
  id?: number;
  content: string;
  metadata: Record<string, any>;
  embedding?: number[];
}

/**
 * Generate embeddings for text using OpenAI's API
 */
async function generateEmbedding(text: string): Promise<number[]> {
  try {
    const response = await fetch('https://api.openai.com/v1/embeddings', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${process.env.OPENAI_API_KEY}`
      },
      body: JSON.stringify({
        model: 'text-embedding-3-small',
        input: text.replace(/\n/g, ' ')
      })
    });

    const result = await response.json();
    return result.data[0].embedding;
  } catch (error) {
    console.error('Error generating embedding:', error);
    throw error;
  }
}

/**
 * Add a document to the knowledge base
 */
export async function addToKnowledgeBase(
  content: string,
  metadata: Record<string, any> = {}
): Promise<boolean> {
  try {
    // Generate embedding for the content
    const embedding = await generateEmbedding(content);

    // Insert into Supabase
    const { error } = await supabase.from('jack_knowledge').insert({
      content,
      metadata,
      embedding
    });

    if (error) throw error;
    return true;
  } catch (error) {
    console.error('Error adding to knowledge base:', error);
    return false;
  }
}

/**
 * Search the knowledge base for documents similar to the query
 */
export async function searchKnowledgeBase(query: string, limit: number = 5): Promise<KnowledgeDocument[]> {
  try {
    // Generate embedding for the query
    const embedding = await generateEmbedding(query);

    // Lower the threshold to catch more potentially relevant documents
    const match_threshold = 0.21; // More permissive threshold (was 0.5)

    // Perform similarity search using Supabase's pgvector extension
    const { data, error } = await supabase.rpc('match_documents', {
      query_embedding: embedding,
      match_threshold,
      match_count: limit
    });

    if (error) throw error;

    // If we didn't get enough results, try a keyword-based fallback search
    if (!data || data.length < 2) {
      // Extract keywords from the query (basic implementation)
      const keywords = query.toLowerCase()
        .replace(/[^\w\s]/g, '') // Remove punctuation
        .split(/\s+/) // Split by whitespace
        .filter(word => word.length > 3); // Only words longer than 3 chars

      if (keywords.length > 0) {
        // Try to search by keywords in content
        const { data: keywordData, error: keywordError } = await supabase
          .from('jack_knowledge')
          .select('*')
          .or(keywords.map(word => `content.ilike.%${word}%`).join(','))
          .limit(limit - (data?.length || 0));

        if (!keywordError && keywordData && keywordData.length > 0) {
          return [...(data || []), ...keywordData] as KnowledgeDocument[];
        }
      }
    }

    return data as KnowledgeDocument[];
  } catch (error) {
    console.error('Error searching knowledge base:', error);
    return [];
  }
}

/**
 * Get all documents from the knowledge base
 */
export async function getAllDocuments(): Promise<KnowledgeDocument[]> {
  try {
    const { data, error } = await supabase
      .from('jack_knowledge')
      .select('id, content, metadata')
      .order('id', { ascending: false });

    if (error) throw error;
    return data as KnowledgeDocument[];
  } catch (error) {
    console.error('Error getting all documents:', error);
    return [];
  }
}
