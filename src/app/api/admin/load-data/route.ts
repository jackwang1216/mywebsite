import { NextRequest, NextResponse } from 'next/server';
import path from 'path';
import fs from 'fs';
import { loadTextFile, loadMarkdownFiles } from '@/utils/dataLoader';
import { getAllDocuments } from '@/utils/knowledgeBase';
import { supabase } from '@/utils/supabase';

// This API should be protected in production!
export async function POST(request: NextRequest) {
  try {
    // Check for an admin key to secure this endpoint
    const authHeader = request.headers.get('authorization');
    if (authHeader !== `Bearer ${process.env.ADMIN_API_KEY}`) {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      );
    }

    // First, check if Supabase connection is working
    const { data: testData, error: testError } = await supabase.from('jack_knowledge').select('count');
    if (testError) {
      return NextResponse.json({
        success: false,
        error: 'Supabase connection failed',
        details: testError
      }, { status: 500 });
    }

    // Clear existing data if requested
    const { clearExisting } = await request.json().catch(() => ({ clearExisting: false }));
    if (clearExisting) {
      const { error: deleteError } = await supabase.from('jack_knowledge').delete().neq('id', 0);
      if (deleteError) {
        console.error('Error clearing existing data:', deleteError);
      }
    }

    const dataDir = path.join(process.cwd(), 'src', 'data', 'personal');
    
    // Get list of markdown files
    const files = fs.readdirSync(dataDir).filter(file => file.endsWith('.md'));
    if (files.length === 0) {
      return NextResponse.json({
        success: false,
        error: 'No markdown files found',
        path: dataDir
      }, { status: 404 });
    }
    
    // Load all markdown files from the personal data directory
    const results = [];
    for (const file of files) {
      const filePath = path.join(dataDir, file);
      const fileContent = fs.readFileSync(filePath, 'utf-8');
      const result = await loadTextFile(filePath, {
        category: 'personal',
        type: 'markdown',
        fileName: file
      });
      
      results.push({
        file,
        success: result,
        contentLength: fileContent.length
      });
    }

    // Get the count of documents in the knowledge base
    const documents = await getAllDocuments();

    return NextResponse.json({
      success: true,
      message: 'Data processed',
      fileResults: results,
      documentsCount: documents.length,
      documents: documents.slice(0, 3) // Return first 3 documents as a sample
    });
  } catch (error) {
    console.error('Error loading data:', error);
    return NextResponse.json({
      success: false,
      error: 'Failed to load data',
      details: error instanceof Error ? error.message : String(error)
    }, { status: 500 });
  }
}
