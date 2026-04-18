import { NextRequest, NextResponse } from 'next/server';
import { retrieveContext, buildSystemPrompt, getLiveGithubContext } from '@/lib/rag';

export const runtime = 'edge';

// Mock streaming response when Gemini key is not configured
function mockStream(question: string): ReadableStream {
  const MOCK_ANSWERS: Record<string, string> = {
    default: "I'm Huzaifa Imran's AI assistant. Huzaifa is a full-stack engineer skilled in **Next.js**, **TypeScript**, **Python**, and **Go**. He's built AI chatbots, e-commerce platforms, and distributed systems. Feel free to ask about any specific skill or project!",
  };

  const response = MOCK_ANSWERS.default;
  const words = response.split(' ');

  return new ReadableStream({
    async start(controller) {
      for (const word of words) {
        controller.enqueue(new TextEncoder().encode(word + ' '));
        await new Promise((r) => setTimeout(r, 40));
      }
      controller.close();
    },
  });
}

export async function POST(req: NextRequest) {
  try {
    const { messages } = await req.json();
    const apiKey = process.env.GROQ_API_KEY;

    if (!apiKey) {
      const lastMessage = messages[messages.length - 1]?.content || '';
      return new Response(mockStream(lastMessage), {
        headers: { 'Content-Type': 'text/plain; charset=utf-8' },
      });
    }

    const lastMessage = messages[messages.length - 1]?.content || '';
    const ragContext = await retrieveContext(lastMessage);
    const liveContext = await getLiveGithubContext();
    const systemPrompt = buildSystemPrompt(`${ragContext}\n\n${liveContext}`);

    // Groq is OpenAI-compatible
    const response = await fetch('https://api.groq.com/openai/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${apiKey}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        model: 'llama-3.3-70b-versatile',
        messages: [
          { role: 'system', content: systemPrompt },
          ...messages.map((m: any) => ({
            role: m.role === 'user' ? 'user' : 'assistant',
            content: m.content,
          }))
        ],
        stream: true,
        temperature: 0.7,
      }),
    });

    if (!response.ok) {
      const err = await response.json();
      console.error('[Groq API Error]', err);
      return NextResponse.json({ error: 'Chat Provider Error', details: err.error?.message }, { status: response.status });
    }

    const stream = new ReadableStream({
      async start(controller) {
        const reader = response.body?.getReader();
        if (!reader) return controller.close();

        const decoder = new TextDecoder();
        let buffer = '';

        while (true) {
          const { done, value } = await reader.read();
          if (done) break;

          buffer += decoder.decode(value, { stream: true });
          const lines = buffer.split('\n');
          buffer = lines.pop() || '';

          for (const line of lines) {
            const trimmed = line.trim();
            if (!trimmed || trimmed === 'data: [DONE]') continue;
            if (trimmed.startsWith('data: ')) {
              try {
                const json = JSON.parse(trimmed.slice(6));
                const text = json.choices?.[0]?.delta?.content;
                if (text) controller.enqueue(new TextEncoder().encode(text));
              } catch (e) {
                // Ignore partial JSON
              }
            }
          }
        }
        controller.close();
      },
    });

    return new Response(stream, {
      headers: { 'Content-Type': 'text/plain; charset=utf-8' },
    });
  } catch (err) {
    console.error('[Chat API]', err);
    return NextResponse.json({ 
      error: 'Neural Core failure', 
      details: err instanceof Error ? err.message : String(err)
    }, { status: 500 });
  }
}
