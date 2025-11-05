import apiService, { ApiResponse, PaginatedResponse } from './api';
import { StudentProfile, StudentInterests, StudentSkills, CareerMatch } from '../types';

export interface StudentFilters {
  page?: number;
  limit?: number;
  interests?: string[];
  skills?: string[];
  major?: string;
  graduation_year?: number;
}

export interface StudentUpdate {
  interests?: StudentInterests;
  skills?: StudentSkills;
  career_preferences?: any;
}

export interface CareerRecommendations {
  career_matches: CareerMatch[];
  skill_gaps: string[];
  recommendations: string[];
}

export interface ProfileCompletion {
  completion_percentage: number;
  missing_fields: string[];
}

export interface ProgressSummary {
  completed_projects: any[];
  skill_development: any[];
  career_exploration: any[];
}

class StudentService {
  // Get all students with optional filtering
  async getStudents(filters: StudentFilters = {}): Promise<ApiResponse<PaginatedResponse<StudentProfile>>> {
    const queryParams = new URLSearchParams();
    
    if (filters.page) queryParams.append('page', filters.page.toString());
    if (filters.limit) queryParams.append('limit', filters.limit.toString());
    if (filters.interests) filters.interests.forEach(interest => queryParams.append('interests', interest));
    if (filters.skills) filters.skills.forEach(skill => queryParams.append('skills', skill));
    if (filters.major) queryParams.append('major', filters.major);
    if (filters.graduation_year) queryParams.append('graduation_year', filters.graduation_year.toString());
    
    const endpoint = `/students/?${queryParams.toString()}`;
    return apiService.get<PaginatedResponse<StudentProfile>>(endpoint);
  }

  // Get a specific student by ID
  async getStudent(studentId: string): Promise<ApiResponse<StudentProfile>> {
    return apiService.get<StudentProfile>(`/students/${studentId}`);
  }

  // Create a new student profile
  async createStudent(studentData: Omit<StudentProfile, 'id'>): Promise<ApiResponse<StudentProfile>> {
    return apiService.post<StudentProfile>('/students/', studentData);
  }

  // Update a student profile
  async updateStudent(studentId: string, updateData: StudentUpdate): Promise<ApiResponse<{ message: string }>> {
    return apiService.put<{ message: string }>(`/students/${studentId}`, updateData);
  }

  // Delete a student profile
  async deleteStudent(studentId: string): Promise<ApiResponse<{ message: string }>> {
    return apiService.delete<{ message: string }>(`/students/${studentId}`);
  }

  // Update student interests
  async updateInterests(studentId: string, interests: StudentInterests): Promise<ApiResponse<{ message: string }>> {
    return apiService.put<{ message: string }>(`/students/${studentId}/interests`, interests);
  }

  // Update student skills
  async updateSkills(studentId: string, skills: StudentSkills): Promise<ApiResponse<{ message: string }>> {
    return apiService.put<{ message: string }>(`/students/${studentId}/skills`, skills);
  }

  // Get career recommendations for a student
  async getCareerRecommendations(studentId: string): Promise<ApiResponse<CareerRecommendations>> {
    return apiService.get<CareerRecommendations>(`/students/${studentId}/career-recommendations`);
  }

  // Get student profile completion percentage
  async getProfileCompletion(studentId: string): Promise<ApiResponse<ProfileCompletion>> {
    return apiService.get<ProfileCompletion>(`/students/${studentId}/profile-completion`);
  }

  // Get student progress summary
  async getProgressSummary(studentId: string): Promise<ApiResponse<ProgressSummary>> {
    return apiService.get<ProgressSummary>(`/students/${studentId}/progress-summary`);
  }

  // Get current student from localStorage or create a new one
  getCurrentStudent(): StudentProfile | null {
    const stored = localStorage.getItem('currentStudent');
    return stored ? JSON.parse(stored) : null;
  }

  // Save current student to localStorage
  saveCurrentStudent(student: StudentProfile): void {
    localStorage.setItem('currentStudent', JSON.stringify(student));
  }

  // Clear current student from localStorage
  clearCurrentStudent(): void {
    localStorage.removeItem('currentStudent');
  }
}

export const studentService = new StudentService();
export default studentService;
