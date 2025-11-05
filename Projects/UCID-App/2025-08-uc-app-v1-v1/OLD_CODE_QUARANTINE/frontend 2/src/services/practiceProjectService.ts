import apiService, { ApiResponse } from './api';
import { PracticeProject } from '../types';

export interface PracticeProjectFilters {
  difficulty?: string;
  skills_focus?: string[];
  duration?: string;
}

export interface ProjectCategories {
  difficulties: string[];
  skill_categories: string[];
  project_types: string[];
}

export interface ProjectStatistics {
  total_projects: number;
  active_projects: number;
  completion_rate: number;
}

export interface StudentProgress {
  progress_percentage: number;
  milestones: any[];
  current_status: string;
}

export interface ProjectSubmission {
  submission_date: string;
  files: string[];
  reflection: string;
  skills_demonstrated: string[];
}

export interface ProjectRecommendationRequest {
  interests: string[];
  skills: string[];
  career_goals: string[];
}

class PracticeProjectService {
  // Get all practice projects with optional filtering
  async getProjects(filters: PracticeProjectFilters = {}): Promise<ApiResponse<{ projects: PracticeProject[]; total: number }>> {
    const queryParams = new URLSearchParams();
    
    if (filters.difficulty) queryParams.append('difficulty', filters.difficulty);
    if (filters.skills_focus) filters.skills_focus.forEach(skill => queryParams.append('skills_focus', skill));
    if (filters.duration) queryParams.append('duration', filters.duration);
    
    const endpoint = `/practice-projects/?${queryParams.toString()}`;
    return apiService.get<{ projects: PracticeProject[]; total: number }>(endpoint);
  }

  // Get a specific practice project by ID
  async getProject(projectId: string): Promise<ApiResponse<PracticeProject>> {
    return apiService.get<PracticeProject>(`/practice-projects/${projectId}`);
  }

  // Get practice projects recommended for a student
  async getRecommendedProjects(request: ProjectRecommendationRequest): Promise<ApiResponse<{ recommended_projects: PracticeProject[] }>> {
    return apiService.post<{ recommended_projects: PracticeProject[] }>('/practice-projects/recommended', request);
  }

  // Submit a completed practice project
  async submitProject(projectId: string, submission: ProjectSubmission): Promise<ApiResponse<{ submission_id: string; message: string }>> {
    return apiService.post<{ submission_id: string; message: string }>(`/practice-projects/${projectId}/submit`, submission);
  }

  // Get all available project categories
  async getCategories(): Promise<ApiResponse<ProjectCategories>> {
    return apiService.get<ProjectCategories>('/practice-projects/categories');
  }

  // Get overall project statistics
  async getStatistics(): Promise<ApiResponse<ProjectStatistics>> {
    return apiService.get<ProjectStatistics>('/practice-projects/statistics');
  }

  // Get a student's progress on a specific project
  async getStudentProgress(projectId: string): Promise<ApiResponse<StudentProgress>> {
    return apiService.get<StudentProgress>(`/practice-projects/${projectId}/student-progress`);
  }

  // Get projects by difficulty level
  async getProjectsByDifficulty(difficulty: string): Promise<ApiResponse<{ projects: PracticeProject[]; total: number }>> {
    return this.getProjects({ difficulty });
  }

  // Get projects by skills focus
  async getProjectsBySkills(skills: string[]): Promise<ApiResponse<{ projects: PracticeProject[]; total: number }>> {
    return this.getProjects({ skills_focus: skills });
  }

  // Get projects by duration
  async getProjectsByDuration(duration: string): Promise<ApiResponse<{ projects: PracticeProject[]; total: number }>> {
    return this.getProjects({ duration });
  }

  // Get beginner-friendly projects
  async getBeginnerProjects(): Promise<ApiResponse<{ projects: PracticeProject[]; total: number }>> {
    return this.getProjects({ difficulty: 'beginner' });
  }

  // Get advanced projects
  async getAdvancedProjects(): Promise<ApiResponse<{ projects: PracticeProject[]; total: number }>> {
    return this.getProjects({ difficulty: 'advanced' });
  }
}

export const practiceProjectService = new PracticeProjectService();
export default practiceProjectService;
