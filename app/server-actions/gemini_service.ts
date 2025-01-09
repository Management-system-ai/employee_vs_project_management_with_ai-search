'use server';
import { GoogleGenerativeAI } from '@google/generative-ai';
import { GoogleAICacheManager } from '@google/generative-ai/server';
import { USER_ROLE, AI_KEY } from '@/constants';
import { ChatHistory } from '@/types/types';

export const generateGeminiResponse = async (
  userMessage: string,
  chatHistory: ChatHistory[]
) => {
  // Constants
  const BOT_ERROR_MESSAGE = 'Something went wrong !!';
  const MODEL_NAME = 'models/gemini-1.5-flash-002';
  const CACHE_TTL_SECONDS = 300;
  const CACHE_DISPLAY_NAME = 'chat-conversation-cache';
  const SYSTEM_INSTRUCTION =
    'You are an expert assistant, please continue the conversation based on the previous context.';

  // Generation configuration
  const generationConfig = {
    temperature: 1,
    topP: 0.95,
    topK: 40,
    maxOutputTokens: 8192,
    responseMimeType: 'text/plain'
  };

  try {
    // Validate key
    if (!AI_KEY) {
      throw new Error('Missing API key');
    }

    // Initialize AI model
    const genAI = new GoogleGenerativeAI(AI_KEY);

    // Create cache manager and setup cache
    const cacheManager = new GoogleAICacheManager(AI_KEY);
    const formattedChatHistory = chatHistory.map(
      (message: { role: string; content: string }) => ({
        role: message.role,
        parts: [{ text: message.content }]
      })
    );

    // Create cache with prev messages
    const cache = await cacheManager.create({
      model: MODEL_NAME,
      displayName: CACHE_DISPLAY_NAME,
      systemInstruction: SYSTEM_INSTRUCTION,
      contents: formattedChatHistory,
      ttlSeconds: CACHE_TTL_SECONDS
    });

    // Generate response
    const genModel = genAI.getGenerativeModelFromCachedContent(cache);
    const result = await genModel.generateContent({
      contents: [{ role: USER_ROLE, parts: [{ text: userMessage }] }],
      generationConfig
    });

    return { text: result.response.text() };
  } catch (error) {
    console.error(error);
    const errorMessage =
      error instanceof Error ? error.message : BOT_ERROR_MESSAGE;
    throw new Error(errorMessage);
  }
};
