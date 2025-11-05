export interface DiscoveryPrompt {
  id: string;
  question: string;
  followUp: string[];
  category: 'talents' | 'interests' | 'skills' | 'goals';
}

export interface ConversationContext {
  currentPrompt: DiscoveryPrompt;
  userResponses: string[];
  category: 'talents' | 'interests' | 'skills' | 'goals';
  currentStep: number;
  stepResponses: {[key: number]: string[]};
}

export interface StudentInsights {
  category: string;
  insights: string[];
  confidence: number;
  followUpQuestions?: string[];
  summary?: string;
}

export interface LLMResponse {
  text: string;
  followUp?: string;
  insight?: string;
}

export interface ConversationState {
  currentPrompt: DiscoveryPrompt;
  userResponses: string[];
  aiResponses: string[];
  isTyping: boolean;
}

export interface FormData {
  talents: string[];
  interests: string[];
  skills: string[];
  goals: string;
}
