// src/services/llm.service.ts
// Supports both Gemini (free) and OpenAI

const LLM_PROVIDER = process.env.LLM_PROVIDER || 'gemini';
const GEMINI_API_KEY = process.env.GEMINI_API_KEY;
const OPENAI_API_KEY = process.env.OPENAI_API_KEY;

// Model configurations
const MODELS = {
  gemini: 'gemini-flash-latest',  // Latest flash model
  openai: 'gpt-4o-mini',
};

export interface ChatMessage {
  role: 'system' | 'user' | 'assistant';
  content: string;
}

export interface ChatResponse {
  content: string;
  model: string;
  provider: string;
}

/**
 * Generate chat response using Google Gemini (FREE!)
 */
async function geminiChat(messages: ChatMessage[]): Promise<ChatResponse> {
  if (!GEMINI_API_KEY) {
    throw new Error('GEMINI_API_KEY not configured');
  }

  // Convert to Gemini format - combine system + user messages
  const systemMsg = messages.find(m => m.role === 'system');
  const userMsgs = messages.filter(m => m.role !== 'system');

  const contents = userMsgs.map((msg, i) => {
    let text = msg.content;
    if (i === 0 && systemMsg) {
      text = `${systemMsg.content}\n\n${text}`;
    }
    return {
      role: msg.role === 'assistant' ? 'model' : 'user',
      parts: [{ text }],
    };
  });

  const response = await fetch(
    `https://generativelanguage.googleapis.com/v1beta/models/gemini-flash-latest:generateContent?key=${GEMINI_API_KEY}`,
    {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        contents,
        generationConfig: {
          temperature: 0.3,
          maxOutputTokens: 1000,
        },
      }),
    }
  );

  if (!response.ok) {
    const error = await response.text();
    throw new Error(`Gemini chat failed: ${error}`);
  }

  const data = await response.json();
  const content = data.candidates?.[0]?.content?.parts?.[0]?.text || '';

  return {
    content,
    model: MODELS.gemini,
    provider: 'gemini',
  };
}

/**
 * Generate chat response using OpenAI
 */
async function openaiChat(messages: ChatMessage[]): Promise<ChatResponse> {
  if (!OPENAI_API_KEY) {
    throw new Error('OPENAI_API_KEY not configured');
  }

  const response = await fetch('https://api.openai.com/v1/chat/completions', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${OPENAI_API_KEY}`,
    },
    body: JSON.stringify({
      model: MODELS.openai,
      messages,
      temperature: 0.3,
      max_tokens: 1000,
    }),
  });

  if (!response.ok) {
    const error = await response.text();
    throw new Error(`OpenAI chat failed: ${error}`);
  }

  const data = await response.json();

  return {
    content: data.choices[0]?.message?.content || '',
    model: MODELS.openai,
    provider: 'openai',
  };
}

/**
 * Generate chat completion
 */
export async function chat(messages: ChatMessage[]): Promise<ChatResponse> {
  if (LLM_PROVIDER === 'openai') {
    return openaiChat(messages);
  }
  return geminiChat(messages);
}

/**
 * Generate RAG answer using context
 */
export async function generateRAGAnswer(
  query: string,
  context: { text: string; score: number }[]
): Promise<ChatResponse> {
  const contextText = context
    .map((c, i) => `[${i + 1}] ${c.text}`)
    .join('\n\n');

  const messages: ChatMessage[] = [
    {
      role: 'system',
      content: `You are a helpful assistant that answers questions based on the provided context.
Use ONLY the information from the context to answer. If the answer is not in the context, say so.
Be concise and accurate. Cite the relevant context numbers in brackets like [1], [2] when appropriate.`,
    },
    {
      role: 'user',
      content: `Context:\n${contextText}\n\nQuestion: ${query}`,
    },
  ];

  return chat(messages);
}

/**
 * Check if LLM service is configured
 */
export function isLLMConfigured(): boolean {
  if (LLM_PROVIDER === 'openai') {
    return !!OPENAI_API_KEY;
  }
  return !!GEMINI_API_KEY;
}

/**
 * Get LLM provider info
 */
export function getLLMProviderInfo(): { provider: string; model: string } {
  return {
    provider: LLM_PROVIDER,
    model: MODELS[LLM_PROVIDER as keyof typeof MODELS] || MODELS.gemini,
  };
}
