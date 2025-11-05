import { useState, useEffect, createContext, useContext, ReactNode } from 'react';

interface User {
  id: string;
  email: string;
  firstName: string;
  lastName: string;
  studentId?: string;
  hasCompletedOnboarding: boolean;
  isGuest?: boolean;
}

interface AuthContextType {
  user: User | null;
  token: string | null;
  isAuthenticated: boolean;
  isGuest: boolean;
  login: (userId: string, userData: any, authToken?: string) => void;
  logout: () => void;
  updateUser: (userData: Partial<User>) => void;
}

export const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export const useAuthState = () => {
  const [user, setUser] = useState<User | null>(null);
  const [token, setToken] = useState<string | null>(null);
  const [isGuest, setIsGuest] = useState(false);

  useEffect(() => {
    // Check for existing auth on mount
    const savedToken = localStorage.getItem('ucid-auth-token');
    const savedUserId = localStorage.getItem('ucid-user-id');
    const savedUserData = localStorage.getItem('ucid-user-data');
    const guestMode = localStorage.getItem('ucid-is-guest') === 'true';

    if (guestMode && savedUserId) {
      setIsGuest(true);
      setUser({
        id: savedUserId,
        email: '',
        firstName: 'Guest',
        lastName: '',
        hasCompletedOnboarding: false,
        isGuest: true
      });
    } else if (savedToken && savedUserId && savedUserData) {
      setToken(savedToken);
      setUser(JSON.parse(savedUserData));
      setIsGuest(false);
    }
  }, []);

  const login = (userId: string, userData: any, authToken?: string) => {
    if (userData.isGuest) {
      setIsGuest(true);
      setUser({
        id: userId,
        email: '',
        firstName: 'Guest',
        lastName: '',
        hasCompletedOnboarding: false,
        isGuest: true
      });
    } else {
      setToken(authToken || '');
      setUser(userData);
      setIsGuest(false);
    }
  };

  const logout = () => {
    localStorage.removeItem('ucid-auth-token');
    localStorage.removeItem('ucid-user-id');
    localStorage.removeItem('ucid-user-data');
    localStorage.removeItem('ucid-is-guest');
    localStorage.removeItem('ucid-interest-responses');
    localStorage.removeItem('ucid-form-data');
    localStorage.removeItem('ucid-conversation-history');
    setUser(null);
    setToken(null);
    setIsGuest(false);
  };

  const updateUser = (userData: Partial<User>) => {
    if (user) {
      const updatedUser = { ...user, ...userData };
      setUser(updatedUser);
      localStorage.setItem('ucid-user-data', JSON.stringify(updatedUser));
    }
  };

  return {
    user,
    token,
    isAuthenticated: !!user,
    isGuest,
    login,
    logout,
    updateUser
  };
};

