import fs from 'fs';
import path from 'path';
import { addToKnowledgeBase } from './knowledgeBase';

// Function to split text into chunks of appropriate size
function splitIntoChunks(text: string, chunkSize: number = 1000): string[] {
  const chunks: string[] = [];
  
  // Split text into sentences (roughly)
  const sentences = text.split(/(?<=[.!?])\s+/);
  
  let currentChunk = '';
  for (const sentence of sentences) {
    // If adding this sentence would exceed our chunk size and we already have content,
    // save the current chunk and start a new one
    if (currentChunk.length + sentence.length > chunkSize && currentChunk.length > 0) {
      chunks.push(currentChunk);
      currentChunk = '';
    }
    
    currentChunk += (currentChunk ? ' ' : '') + sentence;
  }
  
  // Add the last chunk if it has content
  if (currentChunk.length > 0) {
    chunks.push(currentChunk);
  }
  
  return chunks;
}

// Function to load a text file and add it to the knowledge base
export async function loadTextFile(
  filePath: string,
  metadata: Record<string, unknown> = {}
): Promise<boolean> {
  try {
    const content = fs.readFileSync(filePath, 'utf-8');
    const fileName = path.basename(filePath);
    
    // Split the content into appropriate chunks
    const chunks = splitIntoChunks(content);
    
    // Add each chunk to the knowledge base with appropriate metadata
    for (let i = 0; i < chunks.length; i++) {
      const chunkMetadata = {
        ...metadata,
        source: filePath,
        fileName,
        chunk: i + 1,
        totalChunks: chunks.length,
      };
      
      await addToKnowledgeBase(chunks[i], chunkMetadata);
    }
    
    return true;
  } catch (error) {
    console.error(`Error loading file ${filePath}:`, error);
    return false;
  }
}

// Function to load markdown files from a directory
export async function loadMarkdownFiles(
  dirPath: string,
  metadata: Record<string, unknown> = {}
): Promise<boolean> {
  try {
    const files = fs.readdirSync(dirPath);
    
    for (const file of files) {
      if (file.endsWith('.md')) {
        const filePath = path.join(dirPath, file);
        await loadTextFile(filePath, {
          ...metadata,
          type: 'markdown',
        });
      }
    }
    
    return true;
  } catch (error) {
    console.error(`Error loading markdown files from ${dirPath}:`, error);
    return false;
  }
}

// Function to add structured data directly
export async function addStructuredData(
  data: Record<string, unknown>,
  category: string
): Promise<boolean> {
  try {
    // Convert the structured data to a string format suitable for embedding
    const content = JSON.stringify(data, null, 2);
    
    await addToKnowledgeBase(content, {
      type: 'structured',
      category,
    });
    
    return true;
  } catch (error) {
    console.error(`Error adding structured data for ${category}:`, error);
    return false;
  }
}
