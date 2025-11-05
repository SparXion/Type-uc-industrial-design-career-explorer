import apiService, { ApiResponse } from './api';
import { StudentProfile, CareerProfile, CompanyProfile } from '../types';

export interface CareerRecommendationsRequest {
  student_profile: StudentProfile;
  preferences: any;
}

export interface CompanyMatchesRequest {
  student_profile: StudentProfile;
  career_goals: any;
}

export interface SkillGapAnalysisRequest {
  current_skills: any;
  target_career: CareerProfile;
}

export interface PracticeProjectRecommendationsRequest {
  student_profile: StudentProfile;
  skill_goals: string[];
}

export interface LearningPathRequest {
  student_profile: StudentProfile;
  career_goals: string[];
  timeline: string;
}

export interface AIAnalysisResults {
  analysis_results: any;
  insights: string[];
  recommendations: string[];
}

export interface CareerRecommendationsResponse {
  career_matches: any[];
  reasoning: string[];
  confidence_scores: number[];
}

export interface CompanyMatchesResponse {
  company_matches: CompanyProfile[];
  match_reasons: string[];
  fit_scores: number[];
}

export interface SkillGapAnalysisResponse {
  skill_gaps: any[];
  development_paths: string[][];
  estimated_time: string[];
}

export interface PracticeProjectRecommendationsResponse {
  recommended_projects: any[];
  skill_focus: string[];
  difficulty_levels: string[];
}

export interface LearningPathResponse {
  learning_path: any[];
  milestones: string[];
  estimated_duration: string;
}

export interface MarketInsights {
  trends: any[];
  market_analysis: any[];
  future_predictions: any[];
}

export interface AIStatus {
  status: string;
  features: string[];
  performance_metrics: any;
}

export interface AIHealth {
  status: string;
  service: string;
  version: string;
  features: string[];
}

class AIService {
  // Analyze a student profile and generate AI insights
  async analyzeStudent(studentId: string): Promise<ApiResponse<AIAnalysisResults>> {
    return apiService.post<AIAnalysisResults>('/ai/analyze-student', { student_id: studentId });
  }

  // Get AI-powered career recommendations
  async getCareerRecommendations(request: CareerRecommendationsRequest): Promise<ApiResponse<CareerRecommendationsResponse>> {
    return apiService.post<CareerRecommendationsResponse>('/ai/career-recommendations', request);
  }

  // Get AI-powered company matches
  async getCompanyMatches(request: CompanyMatchesRequest): Promise<ApiResponse<CompanyMatchesResponse>> {
    return apiService.post<CompanyMatchesResponse>('/ai/company-matches', request);
  }

  // Analyze skill gaps for a target career path
  async analyzeSkillGaps(request: SkillGapAnalysisRequest): Promise<ApiResponse<SkillGapAnalysisResponse>> {
    return apiService.post<SkillGapAnalysisResponse>('/ai/skill-gap-analysis', request);
  }

  // Get AI-powered practice project recommendations
  async getPracticeProjectRecommendations(request: PracticeProjectRecommendationsRequest): Promise<ApiResponse<PracticeProjectRecommendationsResponse>> {
    return apiService.post<PracticeProjectRecommendationsResponse>('/ai/practice-project-recommendations', request);
  }

  // Generate personalized learning path
  async generateLearningPath(request: LearningPathRequest): Promise<ApiResponse<LearningPathResponse>> {
    return apiService.post<LearningPathResponse>('/ai/learning-path', request);
  }

  // Get AI-generated market insights
  async getMarketInsights(): Promise<ApiResponse<MarketInsights>> {
    return apiService.get<MarketInsights>('/ai/market-insights');
  }

  // Get AI service status
  async getStatus(): Promise<ApiResponse<AIStatus>> {
    return apiService.get<AIStatus>('/ai/status');
  }

  // AI service health check
  async getHealth(): Promise<ApiResponse<AIHealth>> {
    return apiService.get<AIHealth>('/ai/health');
  }

  // Get personalized recommendations based on student profile
  async getPersonalizedRecommendations(studentProfile: StudentProfile): Promise<ApiResponse<{
    careers: CareerProfile[];
    companies: CompanyProfile[];
    skills: string[];
    projects: any[];
  }>> {
    // This is a convenience method that combines multiple AI calls
    const [careerResponse, companyResponse, skillResponse] = await Promise.all([
      this.getCareerRecommendations({
        student_profile: studentProfile,
        preferences: studentProfile.career_preferences
      }),
      this.getCompanyMatches({
        student_profile: studentProfile,
        career_goals: studentProfile.career_preferences?.preferred_roles || []
      }),
      this.analyzeSkillGaps({
        current_skills: studentProfile.skills,
        target_career: {} as CareerProfile // This would need to be specified
      })
    ]);

    return {
      data: {
        careers: careerResponse.data?.career_matches || [],
        companies: companyResponse.data?.company_matches || [],
        skills: skillResponse.data?.skill_gaps || [],
        projects: [] // Would need to call practice project recommendations
      }
    };
  }
}

export const aiService = new AIService();
export default aiService;
