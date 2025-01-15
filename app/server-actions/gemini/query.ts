'use server';

import { analyzeUserQuestion } from './analyzeUserQuestion';
import { executeQuery } from '@/utils/query-executor';
import { ChatHistory } from '@/types/types';

export async function processUserQuery(
  userMessage: string,
  chatHistory: ChatHistory[]
) {
  try {
    // 1. Analyze question using AI
    const analysis = await analyzeUserQuestion(userMessage, chatHistory);

    // 2. Validate analysis results
    if (!analysis.intent || !analysis.intent.type) {
      return {
        success: false,
        ...analysis
      };
    }
    // 3. Execute query
    const results = await executeQuery(analysis.intent);
    // 4. Format results
    const formattedResults = {
      data: results,
      explanation: analysis.explanation,
      userMessage: userMessage,
      navigationContext: analysis.navigationContext,
      metadata: {
        queryType: analysis.intent.type,
        timestamp: new Date().toISOString()
      }
    };

    return {
      success: true,
      ...formattedResults
    };
  } catch (error) {
    console.error('Query Processing Error:', error);
    return {
      success: false,
      error: error instanceof Error ? error.message : 'Unknown error occurred'
    };
  }
}
