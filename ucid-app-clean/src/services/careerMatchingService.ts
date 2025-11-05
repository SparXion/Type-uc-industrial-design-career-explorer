/**
 * Career Matching Service
 * Matches student interests, talents, and goals to Industrial Design career paths
 */

export interface UserProfile {
  interests: string[];
  talents: string[];
  skills: string[];
  goals: string;
}

export interface CareerMatch {
  id: string;
  title: string;
  description: string;
  confidenceScore: number;
  matchReasons: string[];
  skills: string[];
  companies: string[];
  icon: string;
  salaryRange?: string;
  cincinatiConnections?: string[];
}

interface MatchingRule {
  keywords: string[];
  career: string;
  weight: number;
  category: 'interest' | 'talent' | 'skill' | 'goal';
}

class CareerMatchingService {
  private matchingRules: MatchingRule[] = [
    // Product Design
    { keywords: ['product', 'physical', 'tangible', 'manufacturing', 'consumer'], career: 'product-design', weight: 1.0, category: 'interest' },
    { keywords: ['prototyping', '3d', 'cad', 'modeling', 'fabrication'], career: 'product-design', weight: 1.2, category: 'skill' },
    { keywords: ['building', 'creating', 'making', 'hands-on', 'craft'], career: 'product-design', weight: 0.9, category: 'talent' },
    
    // UX/UI Design
    { keywords: ['digital', 'app', 'website', 'interface', 'user experience', 'ux', 'ui'], career: 'user-experience', weight: 1.0, category: 'interest' },
    { keywords: ['wireframing', 'prototyping', 'figma', 'sketch', 'research'], career: 'user-experience', weight: 1.2, category: 'skill' },
    { keywords: ['empathy', 'understanding people', 'communication', 'psychology'], career: 'user-experience', weight: 0.9, category: 'talent' },
    
    // Sustainable Design
    { keywords: ['environment', 'sustainable', 'eco', 'green', 'circular', 'recycling'], career: 'sustainability', weight: 1.0, category: 'interest' },
    { keywords: ['materials', 'lifecycle', 'sustainability analysis', 'environmental'], career: 'sustainability', weight: 1.2, category: 'skill' },
    { keywords: ['caring', 'future', 'impact', 'responsibility'], career: 'sustainability', weight: 0.8, category: 'talent' },
    
    // Healthcare/Medical Design
    { keywords: ['health', 'medical', 'healthcare', 'hospital', 'patient', 'clinical'], career: 'healthcare', weight: 1.0, category: 'interest' },
    { keywords: ['ergonomics', 'human factors', 'safety', 'regulations', 'compliance'], career: 'healthcare', weight: 1.2, category: 'skill' },
    { keywords: ['helping', 'caring', 'detail-oriented', 'precise', 'empathy'], career: 'healthcare', weight: 0.9, category: 'talent' },
    
    // Transportation Design
    { keywords: ['cars', 'vehicles', 'transportation', 'automotive', 'mobility', 'bikes'], career: 'transportation', weight: 1.0, category: 'interest' },
    { keywords: ['aerodynamics', 'mechanics', 'engineering', 'cad', 'modeling'], career: 'transportation', weight: 1.2, category: 'skill' },
    { keywords: ['passionate', 'technical', 'problem-solving', 'innovative'], career: 'transportation', weight: 0.9, category: 'talent' },
    
    // Toy Design
    { keywords: ['toys', 'games', 'play', 'children', 'fun', 'entertainment'], career: 'toy-design', weight: 1.0, category: 'interest' },
    { keywords: ['imagination', 'storytelling', 'character design', 'playful'], career: 'toy-design', weight: 1.1, category: 'talent' },
    { keywords: ['prototyping', 'manufacturing', 'safety', 'child development'], career: 'toy-design', weight: 1.2, category: 'skill' },
    
    // Furniture Design
    { keywords: ['furniture', 'interior', 'home', 'workspace', 'architecture'], career: 'furniture-design', weight: 1.0, category: 'interest' },
    { keywords: ['woodworking', 'fabrication', 'materials', 'joinery', 'ergonomics'], career: 'furniture-design', weight: 1.2, category: 'skill' },
    { keywords: ['aesthetic', 'craftsmanship', 'detail', 'functional'], career: 'furniture-design', weight: 0.9, category: 'talent' },
    
    // Consumer Electronics
    { keywords: ['electronics', 'gadgets', 'technology', 'devices', 'smart', 'wearable'], career: 'consumer-electronics', weight: 1.0, category: 'interest' },
    { keywords: ['technical', 'engineering', 'electronics', 'programming', 'sensors'], career: 'consumer-electronics', weight: 1.2, category: 'skill' },
    { keywords: ['innovative', 'curious', 'technical', 'problem-solving'], career: 'consumer-electronics', weight: 0.9, category: 'talent' }
  ];

  private careerDatabase: { [key: string]: CareerMatch } = {
    'product-design': {
      id: 'product-design',
      title: 'Product Design',
      description: 'Create innovative physical products that solve real user problems',
      confidenceScore: 0,
      matchReasons: [],
      skills: ['User Research', 'Prototyping', '3D Modeling', 'Design Thinking', 'Manufacturing'],
      companies: ['IDEO', 'Frog Design', 'Smart Design', 'Continuum', 'Artefact'],
      icon: '🎨',
      salaryRange: '$60K - $120K',
      cincinatiConnections: ['Procter & Gamble', 'Luxottica', 'GE Aviation']
    },
    'user-experience': {
      id: 'user-experience',
      title: 'User Experience Design',
      description: 'Design seamless digital interactions and user journeys',
      confidenceScore: 0,
      matchReasons: [],
      skills: ['User Research', 'Wireframing', 'Usability Testing', 'Information Architecture', 'Prototyping'],
      companies: ['Google', 'Apple', 'Microsoft', 'Airbnb', 'Meta'],
      icon: '💡',
      salaryRange: '$70K - $140K',
      cincinatiConnections: ['Kroger Digital', 'Fifth Third Bank', '84.51°']
    },
    'sustainability': {
      id: 'sustainability',
      title: 'Sustainable Design',
      description: 'Create eco-friendly products and circular design solutions',
      confidenceScore: 0,
      matchReasons: [],
      skills: ['Materials Science', 'Life Cycle Analysis', 'Circular Design', 'Environmental Impact', 'Systems Thinking'],
      companies: ['Patagonia', 'Interface', 'Method', 'Bamboo Studio', 'Herman Miller'],
      icon: '🌱',
      salaryRange: '$55K - $110K',
      cincinatiConnections: ['P&G Sustainable Innovation', 'Great Lakes Brewing']
    },
    'healthcare': {
      id: 'healthcare',
      title: 'Healthcare Design',
      description: 'Design medical devices and healthcare experiences',
      confidenceScore: 0,
      matchReasons: [],
      skills: ['Medical Device Design', 'Human Factors', 'Regulatory Compliance', 'Patient Safety', 'Ergonomics'],
      companies: ['Medtronic', 'Johnson & Johnson', 'Philips', 'GE Healthcare', 'Stryker'],
      icon: '🏥',
      salaryRange: '$65K - $130K',
      cincinatiConnections: ['Cincinnati Children\'s Hospital', 'TriHealth', 'Ethicon']
    },
    'transportation': {
      id: 'transportation',
      title: 'Transportation Design',
      description: 'Design vehicles and mobility solutions for the future',
      confidenceScore: 0,
      matchReasons: [],
      skills: ['Vehicle Design', 'Aerodynamics', 'Safety Engineering', 'Mobility Systems', 'CAD Modeling'],
      companies: ['Tesla', 'BMW', 'Ford', 'Rivian', 'Lucid Motors'],
      icon: '🚗',
      salaryRange: '$70K - $150K',
      cincinatiConnections: ['GE Aviation', 'Parker Hannifin', 'Formica']
    },
    'toy-design': {
      id: 'toy-design',
      title: 'Toy & Game Design',
      description: 'Create engaging play experiences for all ages',
      confidenceScore: 0,
      matchReasons: [],
      skills: ['Concept Development', 'Prototyping', 'Child Psychology', 'Manufacturing', 'Safety Standards'],
      companies: ['LEGO', 'Mattel', 'Hasbro', 'Spin Master', 'Fisher-Price'],
      icon: '🧸',
      salaryRange: '$50K - $100K',
      cincinatiConnections: ['American Girl (Mattel)', 'Learning Resources']
    },
    'furniture-design': {
      id: 'furniture-design',
      title: 'Furniture & Interior Design',
      description: 'Design functional and beautiful spaces and objects',
      confidenceScore: 0,
      matchReasons: [],
      skills: ['Woodworking', 'Fabrication', 'Materials', 'Ergonomics', 'Space Planning'],
      companies: ['Herman Miller', 'Knoll', 'Steelcase', 'West Elm', 'CB2'],
      icon: '🪑',
      salaryRange: '$45K - $95K',
      cincinatiConnections: ['Rookwood Pottery', 'Contemporary Arts Center']
    },
    'consumer-electronics': {
      id: 'consumer-electronics',
      title: 'Consumer Electronics Design',
      description: 'Design the next generation of smart devices',
      confidenceScore: 0,
      matchReasons: [],
      skills: ['Electronics Integration', 'Technical Design', 'User Interface', 'Manufacturing', 'Testing'],
      companies: ['Apple', 'Samsung', 'Dyson', 'Sonos', 'Nest'],
      icon: '📱',
      salaryRange: '$65K - $135K',
      cincinatiConnections: ['P&G Innovation', 'Luxottica (Ray-Ban Stories)']
    }
  };

  /**
   * Match user profile to career paths
   */
  public matchCareers(profile: UserProfile): CareerMatch[] {
    const scores: { [key: string]: { score: number; reasons: string[] } } = {};
    
    // Initialize scores
    Object.keys(this.careerDatabase).forEach(careerKey => {
      scores[careerKey] = { score: 0, reasons: [] };
    });
    
    // Process interests
    profile.interests.forEach(interest => {
      this.processField(interest, 'interest', scores);
    });
    
    // Process talents
    profile.talents.forEach(talent => {
      this.processField(talent, 'talent', scores);
    });
    
    // Process skills
    profile.skills.forEach(skill => {
      this.processField(skill, 'skill', scores);
    });
    
    // Process goals
    this.processField(profile.goals, 'goal', scores);
    
    // Convert scores to career matches
    const matches: CareerMatch[] = [];
    
    Object.entries(scores).forEach(([careerKey, scoreData]) => {
      if (scoreData.score > 0) {
        const career = { ...this.careerDatabase[careerKey] };
        career.confidenceScore = this.normalizeScore(scoreData.score);
        career.matchReasons = scoreData.reasons.slice(0, 3); // Top 3 reasons
        matches.push(career);
      }
    });
    
    // Sort by confidence score
    matches.sort((a, b) => b.confidenceScore - a.confidenceScore);
    
    // Return top 5 matches
    return matches.slice(0, 5);
  }

  /**
   * Process a field (interest, talent, skill, goal) against matching rules
   */
  private processField(
    field: string,
    category: 'interest' | 'talent' | 'skill' | 'goal',
    scores: { [key: string]: { score: number; reasons: string[] } }
  ): void {
    const fieldLower = field.toLowerCase();
    
    this.matchingRules.forEach(rule => {
      if (rule.category !== category) return;
      
      rule.keywords.forEach(keyword => {
        if (fieldLower.includes(keyword)) {
          scores[rule.career].score += rule.weight;
          
          // Add reason if not already added
          const reason = `Your ${category} in ${field} aligns with ${rule.career}`;
          if (!scores[rule.career].reasons.includes(reason)) {
            scores[rule.career].reasons.push(reason);
          }
        }
      });
    });
  }

  /**
   * Normalize score to 0-1 range
   */
  private normalizeScore(rawScore: number): number {
    // Max possible score is roughly 5 (if all fields match strongly)
    const maxScore = 5;
    const normalized = Math.min(rawScore / maxScore, 1.0);
    
    // Round to 2 decimal places
    return Math.round(normalized * 100) / 100;
  }

  /**
   * Get career details by ID
   */
  public getCareerById(careerId: string): CareerMatch | null {
    return this.careerDatabase[careerId] || null;
  }

  /**
   * Get all available careers
   */
  public getAllCareers(): CareerMatch[] {
    return Object.values(this.careerDatabase);
  }
}

export const careerMatchingService = new CareerMatchingService();
export default careerMatchingService;

