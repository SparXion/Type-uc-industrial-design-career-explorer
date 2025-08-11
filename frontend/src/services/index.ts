// Export all services for easy importing

export { default as apiService } from './api';
export { default as authService } from './authService';
export { default as studentService } from './studentService';
export { default as careerService } from './careerService';
export { default as companyService } from './companyService';
export { default as aiService } from './aiService';
export { default as practiceProjectService } from './practiceProjectService';

// Export types
export type { ApiResponse, PaginatedResponse } from './api';
export type { 
  LoginCredentials, 
  RegisterData, 
  AuthResponse, 
  UserProfile 
} from './authService';
export type { 
  StudentFilters, 
  StudentUpdate, 
  CareerRecommendations, 
  ProfileCompletion, 
  ProgressSummary 
} from './studentService';
export type { 
  CareerFilters, 
  CareerCategories, 
  TrendingCareers 
} from './careerService';
export type { 
  CompanyFilters, 
  CompanyCategories, 
  FeaturedCompanies 
} from './companyService';
export type { 
  CareerRecommendationsRequest,
  CompanyMatchesRequest,
  SkillGapAnalysisRequest,
  PracticeProjectRecommendationsRequest,
  LearningPathRequest,
  AIAnalysisResults,
  CareerRecommendationsResponse,
  CompanyMatchesResponse,
  SkillGapAnalysisResponse,
  PracticeProjectRecommendationsResponse,
  LearningPathResponse,
  MarketInsights,
  AIStatus,
  AIHealth
} from './aiService';
export type { 
  PracticeProjectFilters,
  ProjectCategories,
  ProjectStatistics,
  StudentProgress,
  ProjectSubmission,
  ProjectRecommendationRequest
} from './practiceProjectService';
