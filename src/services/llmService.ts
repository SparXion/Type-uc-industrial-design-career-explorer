import { DiscoveryPrompt, ConversationContext, StudentInsights } from '../types/conversation';
import { trainingDatabase, ContextualResponse } from './trainingDatabase';

export interface LLMService {
  generateResponse(context: ConversationContext): Promise<string>;
  generateFollowUp(context: ConversationContext, category: string): Promise<string>;
  extractInsights(context: ConversationContext): Promise<StudentInsights>;
  analyzeResponse(response: string, category: string): Promise<{
    insights: string[];
    confidence: number;
    followUpQuestions: string[];
  }>;
}

export class MockLLMService implements LLMService {
  async generateResponse(context: ConversationContext): Promise<string> {
    await new Promise(resolve => setTimeout(resolve, 800)); // Reduced delay for better UX
    
    // Use the training database for context-aware responses
    const contextualResponse = trainingDatabase.generateContextualResponse(context);
    
    // Record the conversation for future context
    trainingDatabase.recordConversation('user', context.userResponses[context.userResponses.length - 1] || '');
    
    return contextualResponse.response;
  }

  async generateFollowUp(context: ConversationContext, category: string): Promise<string> {
    await new Promise(resolve => setTimeout(resolve, 600));
    
    // Get contextual follow-up from training database
    const contextualResponse = trainingDatabase.generateContextualResponse(context);
    return contextualResponse.followUp;
  }

  async extractInsights(context: ConversationContext): Promise<StudentInsights> {
    await new Promise(resolve => setTimeout(resolve, 500));
    
    // Extract insights using training database
    const contextualResponse = trainingDatabase.generateContextualResponse(context);
    
    return {
      category: context.category,
      insights: [contextualResponse.insight],
      confidence: 0.85,
      followUpQuestions: [contextualResponse.followUp]
    };
  }

  async analyzeResponse(response: string, category: string): Promise<{
    insights: string[];
    confidence: number;
    followUpQuestions: string[];
  }> {
    await new Promise(resolve => setTimeout(resolve, 400));
    
    // Create a mock context for analysis
    const mockContext: ConversationContext = {
      currentPrompt: { id: 'mock', question: '', followUp: [], category: 'talents' },
      userResponses: [response],
      category: category as any,
      currentStep: 1,
      stepResponses: {}
    };
    
    const contextualResponse = trainingDatabase.generateContextualResponse(mockContext);
    
    return {
      insights: [contextualResponse.insight],
      confidence: 0.8,
      followUpQuestions: [contextualResponse.followUp]
    };
  }
}

export class RealLLMService implements LLMService {
  private apiKey: string;
  private baseUrl: string;

  constructor(apiKey: string, baseUrl: string = 'https://api.anthropic.com/v1') {
    this.apiKey = apiKey;
    this.baseUrl = baseUrl;
  }

  async generateResponse(context: ConversationContext): Promise<string> {
    // TODO: Implement real Claude API call
    return "I'm analyzing your response... (Real LLM integration coming soon!)";
  }

  async generateFollowUp(context: ConversationContext, category: string): Promise<string> {
    // TODO: Implement real Claude API call
    return "What would you like to explore next?";
  }

  async extractInsights(context: ConversationContext): Promise<StudentInsights> {
    // TODO: Implement real Claude API call
    return {
      category: context.category,
      insights: ["Sample insight from real LLM"],
      confidence: 0.9,
      followUpQuestions: ["What would you like to explore next?"]
    };
  }

  async analyzeResponse(response: string, category: string): Promise<{
    insights: string[];
    confidence: number;
    followUpQuestions: string[];
  }> {
    // TODO: Implement real Claude API call
    return {
      insights: ["Sample analysis from real LLM"],
      confidence: 0.9,
      followUpQuestions: ["What would you like to explore next?"]
    };
  }
}

export const llmService: LLMService = new MockLLMService();
