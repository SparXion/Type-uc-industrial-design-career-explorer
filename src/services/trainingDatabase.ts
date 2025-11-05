import { DiscoveryPrompt, ConversationContext, StudentInsights } from '../types/conversation';

// Rich training database based on UCID materials
export interface TrainingQuestion {
  id: string;
  category: 'talents' | 'interests' | 'skills' | 'goals';
  question: string;
  followUp: string[];
  contextHints: string[];
  relatedTopics: string[];
  skillConnections: string[];
  difficulty: 'beginner' | 'intermediate' | 'advanced';
}

export interface ResponsePattern {
  userInput: string[];
  aiResponse: string;
  followUp: string;
  insight: string;
}

export interface ContextualResponse {
  response: string;
  followUp: string;
  insight: string;
  nextDirection: 'deeper' | 'broader' | 'related' | 'next';
}

export class TrainingDatabase {
  private questions: TrainingQuestion[] = [
    // TALENTS - Based on UCID Icebreaker Questions
    {
      id: 'talents-1',
      category: 'talents',
      question: "Think about a time you were really proud of something you created or accomplished. What was it?",
      followUp: [
        "What skills or abilities did you use?",
        "What came naturally to you in that situation?",
        "What did others notice about your work?",
        "How did it make you feel creative?"
      ],
      contextHints: ['childhood projects', 'school achievements', 'personal creations', 'hobbies'],
      relatedTopics: ['problem-solving', 'creativity', 'persistence', 'innovation'],
      skillConnections: ['ideation', 'prototyping', 'visualization', 'execution'],
      difficulty: 'beginner'
    },
    {
      id: 'talents-2',
      category: 'talents',
      question: "When you're working on a project, what part do you find yourself gravitating toward?",
      followUp: [
        "What tasks do you lose track of time doing?",
        "What do you find yourself explaining to others?",
        "What do you think you're naturally good at?",
        "What part do others ask for your help with?"
      ],
      contextHints: ['planning', 'building', 'testing', 'presenting', 'collaborating'],
      relatedTopics: ['focus', 'expertise', 'leadership', 'mentoring'],
      skillConnections: ['project management', 'communication', 'technical skills', 'teamwork'],
      difficulty: 'intermediate'
    },
    {
      id: 'talents-3',
      category: 'talents',
      question: "What toys or activities from your childhood do you think shaped your creative thinking?",
      followUp: [
        "Did you prefer building, drawing, or storytelling?",
        "What made those activities so engaging?",
        "How do you see those skills in your life now?",
        "What would you design based on those experiences?"
      ],
      contextHints: ['LEGO', 'drawing', 'crafts', 'imaginative play', 'puzzles'],
      relatedTopics: ['spatial reasoning', 'creativity', 'problem-solving', 'innovation'],
      skillConnections: ['3D thinking', 'visual design', 'narrative design', 'user experience'],
      difficulty: 'beginner'
    },
    {
      id: 'talents-4',
      category: 'talents',
      question: "What problems do you find yourself naturally trying to solve?",
      followUp: [
        "What frustrates you about everyday objects or systems?",
        "What solutions have you improvised?",
        "What would you redesign if you could?",
        "How do you approach these challenges?"
      ],
      contextHints: ['daily frustrations', 'workarounds', 'improvements', 'innovations'],
      relatedTopics: ['user experience', 'functionality', 'aesthetics', 'accessibility'],
      skillConnections: ['design thinking', 'user research', 'prototyping', 'iteration'],
      difficulty: 'intermediate'
    },

    // INTERESTS - Based on UCID Icebreaker Questions
    {
      id: 'interests-1',
      category: 'interests',
      question: "What problems in the world around you do you find yourself thinking about?",
      followUp: [
        "What products or services frustrate you?",
        "What would you love to improve or redesign?",
        "What areas of life interest you most?",
        "What impact would you like to make?"
      ],
      contextHints: ['environmental issues', 'social problems', 'technological gaps', 'accessibility'],
      relatedTopics: ['sustainability', 'social impact', 'innovation', 'human-centered design'],
      skillConnections: ['research', 'ideation', 'social awareness', 'problem identification'],
      difficulty: 'beginner'
    },
    {
      id: 'interests-2',
      category: 'interests',
      question: "If you could spend a day learning about anything, what would it be?",
      followUp: [
        "What topics do you find yourself researching?",
        "What conversations do you find yourself joining?",
        "What would you love to understand better?",
        "How might this connect to design?"
      ],
      contextHints: ['science', 'technology', 'art', 'culture', 'nature', 'space'],
      relatedTopics: ['curiosity', 'learning', 'interdisciplinary thinking', 'innovation'],
      skillConnections: ['research skills', 'knowledge synthesis', 'creative inspiration', 'trend awareness'],
      difficulty: 'beginner'
    },
    {
      id: 'interests-3',
      category: 'interests',
      question: "What media or stories do you find yourself drawn to repeatedly?",
      followUp: [
        "What elements keep you coming back?",
        "How do they influence your thinking?",
        "What would you create inspired by them?",
        "How do they connect to your values?"
      ],
      contextHints: ['sci-fi', 'fantasy', 'documentaries', 'art', 'music', 'games'],
      relatedTopics: ['storytelling', 'world-building', 'aesthetics', 'narrative design'],
      skillConnections: ['visual storytelling', 'concept development', 'mood creation', 'user engagement'],
      difficulty: 'intermediate'
    },
    {
      id: 'interests-4',
      category: 'interests',
      question: "What activities make you lose track of time completely?",
      followUp: [
        "What is it about these activities that's so absorbing?",
        "What skills are you developing?",
        "How could this translate to design work?",
        "What would you design for others like you?"
      ],
      contextHints: ['flow state', 'deep work', 'passion projects', 'hobbies'],
      relatedTopics: ['engagement', 'skill development', 'passion', 'expertise'],
      skillConnections: ['user research', 'engagement design', 'skill assessment', 'product development'],
      difficulty: 'intermediate'
    },

    // SKILLS - Based on UCID Icebreaker Questions
    {
      id: 'skills-1',
      category: 'skills',
      question: "Looking at your current abilities, what skills do you wish you had?",
      followUp: [
        "What tools or software would you love to master?",
        "What techniques do you see others using that intrigue you?",
        "What skills would make your ideas come to life?",
        "How would these skills change your work?"
      ],
      contextHints: ['digital tools', 'physical skills', 'communication', 'technical skills'],
      relatedTopics: ['skill development', 'learning goals', 'career advancement', 'self-improvement'],
      skillConnections: ['technical proficiency', 'tool mastery', 'skill assessment', 'learning planning'],
      difficulty: 'intermediate'
    },
    {
      id: 'skills-2',
      category: 'skills',
      question: "What skills do you think would be most valuable for your future?",
      followUp: [
        "What abilities would help you solve the problems you care about?",
        "What skills would make you more effective in your field?",
        "What would you love to be able to do?",
        "How do you plan to develop these skills?"
      ],
      contextHints: ['future trends', 'industry needs', 'personal goals', 'market demands'],
      relatedTopics: ['career planning', 'skill forecasting', 'market awareness', 'personal development'],
      skillConnections: ['career strategy', 'skill planning', 'market research', 'development planning'],
      difficulty: 'advanced'
    },
    {
      id: 'skills-3',
      category: 'skills',
      question: "What skills have you developed through unexpected experiences?",
      followUp: [
        "What situations forced you to learn quickly?",
        "How did you adapt to new challenges?",
        "What did you discover about yourself?",
        "How could these skills apply to design?"
      ],
      contextHints: ['challenges', 'adaptation', 'learning', 'resilience'],
      relatedTopics: ['adaptability', 'resilience', 'learning agility', 'problem-solving'],
      skillConnections: ['adaptability', 'quick learning', 'problem-solving', 'resilience'],
      difficulty: 'intermediate'
    },
    {
      id: 'skills-4',
      category: 'skills',
      question: "What skills do you see as essential for the future of design?",
      followUp: [
        "What trends are shaping the industry?",
        "What skills will be in high demand?",
        "How do you see design evolving?",
        "What would you focus on learning?"
      ],
      contextHints: ['AI/ML', 'sustainability', 'digital tools', 'global collaboration', 'user research'],
      relatedTopics: ['future trends', 'industry evolution', 'technology', 'globalization'],
      skillConnections: ['trend awareness', 'future thinking', 'technology integration', 'global perspective'],
      difficulty: 'advanced'
    },

    // GOALS - Based on UCID Icebreaker Questions
    {
      id: 'goals-1',
      category: 'goals',
      question: "Imagine yourself 5 years from now. What kind of impact do you want to have?",
      followUp: [
        "What problems do you want to solve?",
        "What kind of work environment excites you?",
        "What would make you feel fulfilled in your career?",
        "How do you see design helping achieve this?"
      ],
      contextHints: ['social impact', 'environmental change', 'innovation', 'community building'],
      relatedTopics: ['career vision', 'social responsibility', 'personal fulfillment', 'design impact'],
      skillConnections: ['vision development', 'goal setting', 'impact planning', 'career strategy'],
      difficulty: 'advanced'
    },
    {
      id: 'goals-2',
      category: 'goals',
      question: "What kind of legacy do you want to leave through your design work?",
      followUp: [
        "What would you want people to remember about your work?",
        "What values would guide your decisions?",
        "How would you measure success?",
        "What would make you proud?"
      ],
      contextHints: ['values', 'principles', 'impact', 'recognition', 'contribution'],
      relatedTopics: ['personal values', 'design philosophy', 'success metrics', 'legacy building'],
      skillConnections: ['value clarification', 'philosophy development', 'success planning', 'legacy planning'],
      difficulty: 'advanced'
    }
  ];

  private responsePatterns: Map<string, ResponsePattern[]> = new Map();
  private conversationHistory: Map<string, string[]> = new Map();

  constructor() {
    this.initializeResponsePatterns();
  }

  private initializeResponsePatterns() {
    // Initialize with some basic patterns that can be expanded
    this.responsePatterns.set('talents', [
      {
        userInput: ['drawing', 'art', 'sketching', 'painting'],
        aiResponse: "I can see you have a strong visual sense! Drawing and art are fundamental to industrial design. What kind of things do you most enjoy drawing?",
        followUp: "How do you think your visual skills could translate to designing products or spaces?",
        insight: "Strong visual communication and artistic abilities"
      },
      {
        userInput: ['building', 'construction', 'lego', 'blocks'],
        aiResponse: "Building and construction show great spatial reasoning - that's essential for understanding how things fit together in 3D space.",
        followUp: "What's the most complex thing you've ever built?",
        insight: "Excellent spatial reasoning and 3D thinking skills"
      }
    ]);

    this.responsePatterns.set('interests', [
      {
        userInput: ['environment', 'sustainability', 'nature'],
        aiResponse: "Environmental awareness is crucial for responsible design. How do you think design can help solve environmental challenges?",
        followUp: "What sustainable design solutions have you seen that inspire you?",
        insight: "Strong environmental consciousness and sustainability focus"
      }
    ]);
  }

  public getQuestionForCategory(category: string, difficulty: string = 'beginner'): TrainingQuestion | null {
    const availableQuestions = this.questions.filter(q => 
      q.category === category && q.difficulty === difficulty
    );
    
    if (availableQuestions.length === 0) {
      // Fallback to any question in category
      const fallbackQuestions = this.questions.filter(q => q.category === category);
      return fallbackQuestions[Math.floor(Math.random() * fallbackQuestions.length)] || null;
    }
    
    return availableQuestions[Math.floor(Math.random() * availableQuestions.length)];
  }

  public generateContextualResponse(context: ConversationContext): ContextualResponse {
    const { userResponses, category } = context;
    const lastResponse = userResponses[userResponses.length - 1] || '';
    
    // Analyze the user's response for context
    const responseAnalysis = this.analyzeResponse(lastResponse, category);
    
    // Generate contextual response based on analysis
    const response = this.createContextualResponse(responseAnalysis, context);
    const followUp = this.generateFollowUp(responseAnalysis, context);
    const insight = this.extractInsight(responseAnalysis, context);
    
    // Determine next direction based on conversation flow
    const nextDirection = this.determineNextDirection(context, responseAnalysis);
    
    return {
      response,
      followUp,
      insight,
      nextDirection
    };
  }

  private analyzeResponse(response: string, category: string): any {
    const lowerResponse = response.toLowerCase();
    
    // Analyze for key themes and patterns
    const themes = {
      creativity: ['creative', 'imaginative', 'artistic', 'innovative', 'original'],
      technical: ['technical', 'precise', 'detailed', 'systematic', 'logical'],
      social: ['helping', 'people', 'community', 'collaboration', 'teamwork'],
      environmental: ['environment', 'sustainable', 'nature', 'eco', 'green'],
      technological: ['technology', 'digital', 'software', 'apps', 'gadgets'],
      practical: ['practical', 'useful', 'functional', 'helpful', 'solving']
    };

    const detectedThemes = Object.entries(themes)
      .filter(([theme, keywords]) => 
        keywords.some(keyword => lowerResponse.includes(keyword))
      )
      .map(([theme]) => theme);

    return {
      themes: detectedThemes,
      length: response.length,
      complexity: this.assessComplexity(response),
      sentiment: this.assessSentiment(response),
      keywords: this.extractKeywords(response)
    };
  }

  private createContextualResponse(analysis: any, context: ConversationContext): string {
    const { themes } = analysis;
    const { category } = context;
    
    // Base responses that build on detected themes
    let response = '';
    
    if (themes.includes('creativity')) {
      response = "Your creative thinking really shines through! ";
      if (category === 'talents') {
        response += "Creative problem-solving is at the heart of great design. ";
      } else if (category === 'interests') {
        response += "Creative interests often lead to innovative design solutions. ";
      }
    } else if (themes.includes('technical')) {
      response = "I can see you have a strong technical mindset! ";
      if (category === 'skills') {
        response += "Technical skills are incredibly valuable in industrial design. ";
      }
    } else if (themes.includes('environmental')) {
      response = "Your environmental awareness is inspiring! ";
      response += "Sustainable design is becoming increasingly important. ";
    } else {
      response = "That's really interesting! ";
    }
    
    // Add category-specific context
    response += this.getCategoryContext(category, analysis);
    
    return response;
  }

  private generateFollowUp(analysis: any, context: ConversationContext): string {
    const { themes } = analysis;
    const { category } = context;
    
    // Generate follow-ups based on detected themes and category
    if (themes.includes('creativity')) {
      return "How do you think your creative approach could be applied to solving real-world problems?";
    } else if (themes.includes('technical')) {
      return "What technical challenges do you find most interesting to tackle?";
    } else if (themes.includes('environmental')) {
      return "What environmental problems do you think design could help solve?";
    } else {
      // Default follow-ups based on category
      const categoryFollowUps = {
        talents: "What other areas do you think you might be naturally good at?",
        interests: "How do you see these interests connecting to potential career paths?",
        skills: "What skills would you love to develop further?",
        goals: "What steps do you think would help you achieve these goals?"
      };
      return categoryFollowUps[category] || "What would you like to explore next?";
    }
  }

  private extractInsight(analysis: any, context: ConversationContext): string {
    const { themes } = analysis;
    
    // Generate insights based on analysis
    let insight = '';
    
    if (themes.includes('creativity')) {
      insight = "Strong creative thinking and innovative mindset";
    } else if (themes.includes('technical')) {
      insight = "Excellent technical aptitude and systematic thinking";
    } else if (themes.includes('environmental')) {
      insight = "Deep environmental consciousness and sustainability focus";
    } else if (themes.includes('social')) {
      insight = "Strong interpersonal skills and community orientation";
    } else {
      insight = "Clear self-awareness and thoughtful reflection";
    }
    
    return insight;
  }

  private determineNextDirection(context: ConversationContext, analysis: any): 'deeper' | 'broader' | 'related' | 'next' {
    const { userResponses } = context;
    
    // If we have few responses, go deeper
    if (userResponses.length < 2) return 'deeper';
    
    // If we have many responses, move to related or next
    if (userResponses.length >= 3) return 'related';
    
    // Default to broader exploration
    return 'broader';
  }

  private getCategoryContext(category: string, analysis: any): string {
    const contexts: { [key: string]: string } = {
      talents: "This kind of self-awareness about your natural abilities is exactly what helps designers understand their strengths.",
      interests: "Your interests often reveal the problems you're passionate about solving - that's the foundation of great design.",
      skills: "Understanding what skills you want to develop helps create a clear path forward in your design journey.",
      goals: "Having clear goals helps focus your design work and ensures you're making the impact you want to make."
    };
    
    return contexts[category] || "This kind of reflection is really valuable for understanding your design path.";
  }

  private assessComplexity(response: string): 'simple' | 'moderate' | 'complex' {
    const words = response.split(' ').length;
    if (words < 10) return 'simple';
    if (words < 25) return 'moderate';
    return 'complex';
  }

  private assessSentiment(response: string): 'positive' | 'neutral' | 'negative' {
    const positiveWords = ['love', 'enjoy', 'excited', 'passionate', 'inspiring', 'amazing', 'great'];
    const negativeWords = ['hate', 'frustrated', 'difficult', 'challenging', 'worried', 'concerned'];
    
    const lowerResponse = response.toLowerCase();
    const positiveCount = positiveWords.filter(word => lowerResponse.includes(word)).length;
    const negativeCount = negativeWords.filter(word => lowerResponse.includes(word)).length;
    
    if (positiveCount > negativeCount) return 'positive';
    if (negativeCount > positiveCount) return 'negative';
    return 'neutral';
  }

  private extractKeywords(response: string): string[] {
    // Simple keyword extraction - could be enhanced with NLP
    const commonWords = ['the', 'a', 'an', 'and', 'or', 'but', 'in', 'on', 'at', 'to', 'for', 'of', 'with', 'by'];
    const words = response.toLowerCase().split(/\W+/);
    return words.filter(word => 
      word.length > 3 && !commonWords.includes(word)
    ).slice(0, 5);
  }

  public getNextQuestion(context: ConversationContext): TrainingQuestion | null {
    const { category } = context;
    
    // Get next question based on current progress
    const currentQuestions = this.questions.filter(q => q.category === category);
    const currentIndex = currentQuestions.findIndex(q => q.id === context.currentPrompt?.id);
    
    if (currentIndex < currentQuestions.length - 1) {
      return currentQuestions[currentIndex + 1];
    }
    
    // Move to next category
    const nextCategory = this.getNextCategory(category);
    if (nextCategory) {
      return this.getQuestionForCategory(nextCategory, 'beginner');
    }
    
    return null;
  }

  private getNextCategory(currentCategory: string): string | null {
    const categoryOrder = ['talents', 'interests', 'skills', 'goals'];
    const currentIndex = categoryOrder.indexOf(currentCategory);
    
    if (currentIndex < categoryOrder.length - 1) {
      return categoryOrder[currentIndex + 1];
    }
    
    return null;
  }

  public recordConversation(userId: string, response: string) {
    if (!this.conversationHistory.has(userId)) {
      this.conversationHistory.set(userId, []);
    }
    
    const history = this.conversationHistory.get(userId)!;
    history.push(response);
    
    // Keep only last 10 responses to maintain context
    if (history.length > 10) {
      history.shift();
    }
  }

  public getConversationHistory(userId: string): string[] {
    return this.conversationHistory.get(userId) || [];
  }
}

export const trainingDatabase = new TrainingDatabase();
