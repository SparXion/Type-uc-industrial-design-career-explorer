import apiService, { ApiResponse } from './api';
import { CareerProfile } from '../types';

export interface CareerFilters {
  category?: string;
  industry_sector?: string;
  experience_level?: string;
}

export interface CareerCategories {
  career_categories: string[];
  industry_sectors: string[];
  skill_categories: string[];
}

export interface TrendingCareers {
  trending_careers: CareerProfile[];
}

class CareerService {
  // Get all careers with optional filtering
  async getCareers(filters: CareerFilters = {}): Promise<ApiResponse<{ careers: CareerProfile[]; total: number }>> {
    const queryParams = new URLSearchParams();
    
    if (filters.category) queryParams.append('category', filters.category);
    if (filters.industry_sector) queryParams.append('industry_sector', filters.industry_sector);
    if (filters.experience_level) queryParams.append('experience_level', filters.experience_level);
    
    const endpoint = `/careers/?${queryParams.toString()}`;
    return apiService.get<{ careers: CareerProfile[]; total: number }>(endpoint);
  }

  // Get a specific career by ID
  async getCareer(careerId: string): Promise<ApiResponse<CareerProfile>> {
    return apiService.get<CareerProfile>(`/careers/${careerId}`);
  }

  // Create a new career profile
  async createCareer(careerData: Omit<CareerProfile, 'id'>): Promise<ApiResponse<CareerProfile>> {
    return apiService.post<CareerProfile>('/careers/', careerData);
  }

  // Update a career profile
  async updateCareer(careerId: string, careerData: CareerProfile): Promise<ApiResponse<{ message: string }>> {
    return apiService.put<{ message: string }>(`/careers/${careerId}`, careerData);
  }

  // Delete a career profile
  async deleteCareer(careerId: string): Promise<ApiResponse<{ message: string }>> {
    return apiService.delete<{ message: string }>(`/careers/${careerId}`);
  }

  // Get all available career categories
  async getCategories(): Promise<ApiResponse<CareerCategories>> {
    return apiService.get<CareerCategories>('/careers/categories');
  }

  // Get trending careers
  async getTrendingCareers(): Promise<ApiResponse<TrendingCareers>> {
    return apiService.get<TrendingCareers>('/careers/trending');
  }

  // Search careers by title or description
  async searchCareers(query: string): Promise<ApiResponse<{ careers: CareerProfile[] }>> {
    const queryParams = new URLSearchParams({ q: query });
    const endpoint = `/careers/search?${queryParams.toString()}`;
    return apiService.get<{ careers: CareerProfile[] }>(endpoint);
  }

  // Get careers by specific industry sector
  async getCareersByIndustry(industrySector: string): Promise<ApiResponse<{ careers: CareerProfile[]; total: number }>> {
    return this.getCareers({ industry_sector: industrySector });
  }

  // Get careers by experience level
  async getCareersByExperience(experienceLevel: string): Promise<ApiResponse<{ careers: CareerProfile[]; total: number }>> {
    return this.getCareers({ experience_level: experienceLevel });
  }
}

export const careerService = new CareerService();
export default careerService;
