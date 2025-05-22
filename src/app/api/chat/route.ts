import { NextRequest, NextResponse } from 'next/server';
import { searchKnowledgeBase } from '@/utils/knowledgeBase';

type MessageItem = {
  role: string;
  content: string;
};

export async function POST(request: NextRequest) {
  try {
    const { message, history = [] } = await request.json();

    // Validate input
    if (!message || typeof message !== 'string') {
      return NextResponse.json(
        { error: 'Invalid request: message is required' },
        { status: 400 }
      );
    }

    // Search the knowledge base for relevant information
    // Use the current message for the search with increased document count
    const relevantDocs = await searchKnowledgeBase(message, 5);

    // Extract the content from the relevant documents
    const contextText = relevantDocs
      .map(doc => doc.content)
      .join('\n\n');

    // Create a dynamic system message that includes the relevant information
    let systemMessage = `You are Jack.ai, a digital representation of Jack Wang. Answer as if you were Jack based on the following information about him, depending on the question asked, decide to answer in a humorous way or serious tone:

Jack Wang is a student studying math and cs at mit. He has experience in full-stack development, machine learning, and hmore.
He's passionate about AI and its applications in solving real-world problems.
Jack has worked on various projects including web applications and machine learning models.`;

    // Only add context if we found relevant documents
    if (contextText && contextText.trim()) {
      systemMessage += `\n\nHere is specific information about Jack that's relevant to this question:\n${contextText}`;
    }

    systemMessage += `\n\nIf asked about opinions, preferences, or personal details not included in this information, respond naturally but make it clear you're offering a general perspective that may not exactly match Jack's views.
Keep your responses concise, helpful, and in a conversational tone.\n\nMaintain continuity with the conversation history.`;

    // Prepare messages array for the API
    const messages: MessageItem[] = [
      { role: 'system', content: systemMessage }
    ];

    // Add conversation history if provided
    if (history && Array.isArray(history) && history.length > 0) {
      // Only include valid history items
      const validHistory = history.filter(
        (item: any) => 
          item && 
          typeof item === 'object' && 
          (item.role === 'user' || item.role === 'assistant') && 
          typeof item.content === 'string'
      );
      
      // Add the history to the messages array
      messages.push(...validHistory);
    } else {
      // If no history, just add the current message
      messages.push({ role: 'user', content: message });
    }

    // Call to OpenAI API
    const response = await fetch('https://api.openai.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${process.env.OPENAI_API_KEY}`,
      },
      body: JSON.stringify({
        model: 'gpt-4o',
        messages,
        temperature: 0.7,
        max_tokens: 500,
      }),
    });

    if (!response.ok) {
      const error = await response.json();
      console.error('OpenAI API error:', error);
      throw new Error('Failed to get response from AI service');
    }

    const data = await response.json();
    const aiResponse = data.choices[0].message.content;

    return NextResponse.json({ response: aiResponse });
  } catch (error) {
    console.error('Error in chat API:', error);
    return NextResponse.json(
      { error: 'Failed to process request' },
      { status: 500 }
    );
  }
}
