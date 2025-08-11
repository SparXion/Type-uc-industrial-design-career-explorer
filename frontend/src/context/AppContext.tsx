import React, { createContext, useContext, useReducer, useEffect, ReactNode } from 'react';
import { AppState, StudentProfile, CareerProfile, CompanyProfile, PracticeProject } from '../types';
import { 
  studentService, 
  careerService, 
  companyService, 
  aiService, 
  practiceProjectService,
  ApiResponse 
} from '../services';

// Action types
type AppAction =
  | { type: 'SET_CURRENT_STUDENT'; payload: StudentProfile }
  | { type: 'UPDATE_STUDENT_INTERESTS'; payload: any }
  | { type: 'UPDATE_STUDENT_SKILLS'; payload: any }
  | { type: 'SET_CAREER_MATCHES'; payload: any[] }
  | { type: 'SET_SELECTED_CAREER'; payload: CareerProfile }
  | { type: 'SET_SELECTED_COMPANY'; payload: CompanyProfile }
  | { type: 'SET_PRACTICE_PROJECTS'; payload: PracticeProject[] }
  | { type: 'SET_CURRENT_STEP'; payload: number }
  | { type: 'SET_LOADING'; payload: boolean }
  | { type: 'SET_ERROR'; payload: string | null }
  | { type: 'CLEAR_ERROR' }
  | { type: 'RESET_STATE' };

// Initial state
const initialState: AppState & {
  loading: boolean;
  error: string | null;
} = {
  currentStudent: undefined,
  currentStep: 0,
  interests: {
    design_fields: [],
    creative_mediums: [],
    industry_sectors: [],
    project_types: []
  },
  creativeWorks: [],
  careerMatches: [],
  selectedCareer: undefined,
  selectedCompany: undefined,
  practiceProjects: [],
  completedProjects: [],
  loading: false,
  error: null
};

// Reducer function
function appReducer(state: typeof initialState, action: AppAction): typeof initialState {
  switch (action.type) {
    case 'SET_CURRENT_STUDENT':
      return { ...state, currentStudent: action.payload };
    case 'UPDATE_STUDENT_INTERESTS':
      return { 
        ...state, 
        interests: { ...state.interests, ...action.payload },
        currentStudent: state.currentStudent ? {
          ...state.currentStudent,
          interests: { ...state.currentStudent.interests, ...action.payload }
        } : undefined
      };
    case 'UPDATE_STUDENT_SKILLS':
      return { 
        ...state, 
        currentStudent: state.currentStudent ? {
          ...state.currentStudent,
          skills: { ...state.currentStudent.skills, ...action.payload }
        } : undefined
      };
    case 'SET_CAREER_MATCHES':
      return { ...state, careerMatches: action.payload };
    case 'SET_SELECTED_CAREER':
      return { ...state, selectedCareer: action.payload };
    case 'SET_SELECTED_COMPANY':
      return { ...state, selectedCompany: action.payload };
    case 'SET_PRACTICE_PROJECTS':
      return { ...state, practiceProjects: action.payload };
    case 'SET_CURRENT_STEP':
      return { ...state, currentStep: action.payload };
    case 'SET_LOADING':
      return { ...state, loading: action.payload };
    case 'SET_ERROR':
      return { ...state, error: action.payload };
    case 'CLEAR_ERROR':
      return { ...state, error: null };
    case 'RESET_STATE':
      return initialState;
    default:
      return state;
  }
}

// Context interface
interface AppContextType {
  state: typeof initialState;
  dispatch: React.Dispatch<AppAction>;
  
  // API methods
  createStudent: (studentData: Omit<StudentProfile, 'id'>) => Promise<ApiResponse<StudentProfile>>;
  updateStudent: (studentId: string, updateData: any) => Promise<ApiResponse<{ message: string }>>;
  getCareerRecommendations: (studentId: string) => Promise<ApiResponse<any>>;
  getCareers: (filters?: any) => Promise<ApiResponse<any>>;
  getCompanies: (filters?: any) => Promise<ApiResponse<any>>;
  getPracticeProjects: (filters?: any) => Promise<ApiResponse<any>>;
  getAIRecommendations: (studentProfile: StudentProfile) => Promise<ApiResponse<any>>;
  
  // Utility methods
  setLoading: (loading: boolean) => void;
  setError: (error: string | null) => void;
  clearError: () => void;
  nextStep: () => void;
  previousStep: () => void;
  goToStep: (step: number) => void;
}

// Create context
const AppContext = createContext<AppContextType | undefined>(undefined);

// Provider component
interface AppProviderProps {
  children: ReactNode;
}

export function AppProvider({ children }: AppProviderProps) {
  const [state, dispatch] = useReducer(appReducer, initialState);

  // Load current student from localStorage on mount
  useEffect(() => {
    const savedStudent = studentService.getCurrentStudent();
    if (savedStudent) {
      dispatch({ type: 'SET_CURRENT_STUDENT', payload: savedStudent });
    }
  }, []);

  // Save student to localStorage when it changes
  useEffect(() => {
    if (state.currentStudent) {
      studentService.saveCurrentStudent(state.currentStudent);
    }
  }, [state.currentStudent]);

  // API methods
  const createStudent = async (studentData: Omit<StudentProfile, 'id'>) => {
    dispatch({ type: 'SET_LOADING', payload: true });
    dispatch({ type: 'CLEAR_ERROR' });
    
    try {
      const response = await studentService.createStudent(studentData);
      if (response.error) {
        dispatch({ type: 'SET_ERROR', payload: response.error });
        return response;
      }
      
      if (response.data) {
        dispatch({ type: 'SET_CURRENT_STUDENT', payload: response.data });
      }
      
      return response;
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'An unexpected error occurred';
      dispatch({ type: 'SET_ERROR', payload: errorMessage });
      return { error: errorMessage };
    } finally {
      dispatch({ type: 'SET_LOADING', payload: false });
    }
  };

  const updateStudent = async (studentId: string, updateData: any) => {
    dispatch({ type: 'SET_LOADING', payload: true });
    dispatch({ type: 'CLEAR_ERROR' });
    
    try {
      const response = await studentService.updateStudent(studentId, updateData);
      if (response.error) {
        dispatch({ type: 'SET_ERROR', payload: response.error });
        return response;
      }
      
      // Update local state if successful
      if (state.currentStudent && response.data) {
        dispatch({ type: 'SET_CURRENT_STUDENT', payload: {
          ...state.currentStudent,
          ...updateData
        }});
      }
      
      return response;
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'An unexpected error occurred';
      dispatch({ type: 'SET_ERROR', payload: errorMessage });
      return { error: errorMessage };
    } finally {
      dispatch({ type: 'SET_LOADING', payload: false });
    }
  };

  const getCareerRecommendations = async (studentId: string) => {
    dispatch({ type: 'SET_LOADING', payload: true });
    dispatch({ type: 'CLEAR_ERROR' });
    
    try {
      const response = await studentService.getCareerRecommendations(studentId);
      if (response.error) {
        dispatch({ type: 'SET_ERROR', payload: response.error });
        return response;
      }
      
      if (response.data) {
        dispatch({ type: 'SET_CAREER_MATCHES', payload: response.data.career_matches || [] });
      }
      
      return response;
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'An unexpected error occurred';
      dispatch({ type: 'SET_ERROR', payload: errorMessage });
      return { error: errorMessage };
    } finally {
      dispatch({ type: 'SET_LOADING', payload: false });
    }
  };

  const getCareers = async (filters?: any) => {
    dispatch({ type: 'SET_LOADING', payload: true });
    dispatch({ type: 'CLEAR_ERROR' });
    
    try {
      const response = await careerService.getCareers(filters);
      if (response.error) {
        dispatch({ type: 'SET_ERROR', payload: response.error });
        return response;
      }
      
      return response;
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'An unexpected error occurred';
      dispatch({ type: 'SET_ERROR', payload: errorMessage });
      return { error: errorMessage };
    } finally {
      dispatch({ type: 'SET_LOADING', payload: false });
    }
  };

  const getCompanies = async (filters?: any) => {
    dispatch({ type: 'SET_LOADING', payload: true });
    dispatch({ type: 'CLEAR_ERROR' });
    
    try {
      const response = await companyService.getCompanies(filters);
      if (response.error) {
        dispatch({ type: 'SET_ERROR', payload: response.error });
        return response;
      }
      
      return response;
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'An unexpected error occurred';
      dispatch({ type: 'SET_ERROR', payload: errorMessage });
      return { error: errorMessage };
    } finally {
      dispatch({ type: 'SET_LOADING', payload: false });
    }
  };

  const getPracticeProjects = async (filters?: any) => {
    dispatch({ type: 'SET_LOADING', payload: true });
    dispatch({ type: 'CLEAR_ERROR' });
    
    try {
      const response = await practiceProjectService.getProjects(filters);
      if (response.error) {
        dispatch({ type: 'SET_ERROR', payload: response.error });
        return response;
      }
      
      if (response.data) {
        dispatch({ type: 'SET_PRACTICE_PROJECTS', payload: response.data.projects || [] });
      }
      
      return response;
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'An unexpected error occurred';
      dispatch({ type: 'SET_ERROR', payload: errorMessage });
      return { error: errorMessage };
    } finally {
      dispatch({ type: 'SET_LOADING', payload: false });
    }
  };

  const getAIRecommendations = async (studentProfile: StudentProfile) => {
    dispatch({ type: 'SET_LOADING', payload: true });
    dispatch({ type: 'CLEAR_ERROR' });
    
    try {
      const response = await aiService.getPersonalizedRecommendations(studentProfile);
      if (response.error) {
        dispatch({ type: 'SET_ERROR', payload: response.error });
        return response;
      }
      
      return response;
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'An unexpected error occurred';
      dispatch({ type: 'SET_ERROR', payload: errorMessage });
      return { error: errorMessage };
    } finally {
      dispatch({ type: 'SET_LOADING', payload: false });
    }
  };

  // Utility methods
  const setLoading = (loading: boolean) => {
    dispatch({ type: 'SET_LOADING', payload: loading });
  };

  const setError = (error: string | null) => {
    dispatch({ type: 'SET_ERROR', payload: error });
  };

  const clearError = () => {
    dispatch({ type: 'CLEAR_ERROR' });
  };

  const nextStep = () => {
    dispatch({ type: 'SET_CURRENT_STEP', payload: state.currentStep + 1 });
  };

  const previousStep = () => {
    dispatch({ type: 'SET_CURRENT_STEP', payload: Math.max(0, state.currentStep - 1) });
  };

  const goToStep = (step: number) => {
    dispatch({ type: 'SET_CURRENT_STEP', payload: step });
  };

  const contextValue: AppContextType = {
    state,
    dispatch,
    createStudent,
    updateStudent,
    getCareerRecommendations,
    getCareers,
    getCompanies,
    getPracticeProjects,
    getAIRecommendations,
    setLoading,
    setError,
    clearError,
    nextStep,
    previousStep,
    goToStep,
  };

  return (
    <AppContext.Provider value={contextValue}>
      {children}
    </AppContext.Provider>
  );
}

// Custom hook to use the context
export function useAppContext() {
  const context = useContext(AppContext);
  if (context === undefined) {
    throw new Error('useAppContext must be used within an AppProvider');
  }
  return context;
}
