import apiService, { ApiResponse } from './api';
import { CompanyProfile } from '../types';

export interface CompanyFilters {
  industry_sector?: string;
  size?: string;
  location?: string;
}

export interface CompanyCategories {
  company_sizes: string[];
  industry_sectors: string[];
  design_philosophies: string[];
}

export interface FeaturedCompanies {
  featured_companies: CompanyProfile[];
}

class CompanyService {
  // Get all companies with optional filtering
  async getCompanies(filters: CompanyFilters = {}): Promise<ApiResponse<{ companies: CompanyProfile[]; total: number }>> {
    const queryParams = new URLSearchParams();
    
    if (filters.industry_sector) queryParams.append('industry_sector', filters.industry_sector);
    if (filters.size) queryParams.append('size', filters.size);
    if (filters.location) queryParams.append('location', filters.location);
    
    const endpoint = `/companies/?${queryParams.toString()}`;
    return apiService.get<{ companies: CompanyProfile[]; total: number }>(endpoint);
  }

  // Get a specific company by ID
  async getCompany(companyId: string): Promise<ApiResponse<CompanyProfile>> {
    return apiService.get<CompanyProfile>(`/companies/${companyId}`);
  }

  // Create a new company profile
  async createCompany(companyData: Omit<CompanyProfile, 'id'>): Promise<ApiResponse<CompanyProfile>> {
    return apiService.post<CompanyProfile>('/companies/', companyData);
  }

  // Update a company profile
  async updateCompany(companyId: string, companyData: CompanyProfile): Promise<ApiResponse<{ message: string }>> {
    return apiService.put<{ message: string }>(`/companies/${companyId}`, companyData);
  }

  // Delete a company profile
  async deleteCompany(companyId: string): Promise<ApiResponse<{ message: string }>> {
    return apiService.delete<{ message: string }>(`/companies/${companyId}`);
  }

  // Get all available company categories
  async getCategories(): Promise<ApiResponse<CompanyCategories>> {
    return apiService.get<CompanyCategories>('/companies/categories');
  }

  // Get featured companies
  async getFeaturedCompanies(): Promise<ApiResponse<FeaturedCompanies>> {
    return apiService.get<FeaturedCompanies>('/companies/featured');
  }

  // Search companies by name or description
  async searchCompanies(query: string): Promise<ApiResponse<{ companies: CompanyProfile[] }>> {
    const queryParams = new URLSearchParams({ q: query });
    const endpoint = `/companies/search?${queryParams.toString()}`;
    return apiService.get<{ companies: CompanyProfile[] }>(endpoint);
  }

  // Get companies by specific industry sector
  async getCompaniesByIndustry(industrySector: string): Promise<ApiResponse<{ companies: CompanyProfile[]; total: number }>> {
    return this.getCompanies({ industry_sector: industrySector });
  }

  // Get companies by size
  async getCompaniesBySize(size: string): Promise<ApiResponse<{ companies: CompanyProfile[]; total: number }>> {
    return this.getCompanies({ size });
  }

  // Get companies by location
  async getCompaniesByLocation(location: string): Promise<ApiResponse<{ companies: CompanyProfile[]; total: number }>> {
    return this.getCompanies({ location });
  }
}

export const companyService = new CompanyService();
export default companyService;
