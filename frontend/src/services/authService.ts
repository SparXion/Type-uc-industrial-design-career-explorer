import apiService, { ApiResponse } from './api';

export interface LoginCredentials {
  username: string;
  password: string;
}

export interface RegisterData {
  username: string;
  email: string;
  password: string;
  user_type: 'student' | 'company';
}

export interface AuthResponse {
  message: string;
  access_token: string;
  refresh_token: string;
  user: {
    username: string;
    email: string;
    user_type: string;
  };
}

export interface UserProfile {
  username: string;
  email: string;
  user_type: string;
}

class AuthService {
  // User registration
  async register(userData: RegisterData): Promise<ApiResponse<AuthResponse>> {
    return apiService.post<AuthResponse>('/auth/register', userData);
  }

  // User login
  async login(credentials: LoginCredentials): Promise<ApiResponse<AuthResponse>> {
    return apiService.post<AuthResponse>('/auth/login', credentials);
  }

  // Get user profile
  async getProfile(): Promise<ApiResponse<UserProfile>> {
    return apiService.get<UserProfile>('/auth/profile');
  }

  // Refresh access token
  async refreshToken(): Promise<ApiResponse<{ access_token: string }>> {
    const refreshToken = localStorage.getItem('refresh_token');
    if (!refreshToken) {
      return { error: 'No refresh token available' };
    }

    try {
      const response = await fetch(`${apiService.baseURL}/auth/refresh`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${refreshToken}`
        }
      });

      if (!response.ok) {
        throw new Error('Token refresh failed');
      }

      const data = await response.json();
      return { data };
    } catch (error) {
      return { error: 'Token refresh failed' };
    }
  }

  // Store tokens in localStorage
  storeTokens(accessToken: string, refreshToken: string): void {
    localStorage.setItem('access_token', accessToken);
    localStorage.setItem('refresh_token', refreshToken);
  }

  // Get access token from localStorage
  getAccessToken(): string | null {
    return localStorage.getItem('access_token');
  }

  // Get refresh token from localStorage
  getRefreshToken(): string | null {
    return localStorage.getItem('refresh_token');
  }

  // Clear tokens from localStorage
  clearTokens(): void {
    localStorage.removeItem('access_token');
    localStorage.removeItem('refresh_token');
  }

  // Check if user is authenticated
  isAuthenticated(): boolean {
    const token = this.getAccessToken();
    return !!token;
  }

  // Logout user
  logout(): void {
    this.clearTokens();
    // Clear any other user data
    localStorage.removeItem('currentStudent');
    localStorage.removeItem('currentCompany');
  }
}

export const authService = new AuthService();
export default authService;
