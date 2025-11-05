import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import VideoIntroduction from './components/VideoIntroduction';
import ReadyState from './components/ReadyState';
import InterestDiscovery from './components/InterestDiscovery';
import FormCollection from './components/FormCollection';
import CareerExploration from './components/CareerExploration';
import Login from './components/Login';
import { AuthContext, useAuthState } from './hooks/useAuth';
import './styles/north-star-system.css';

function App() {
  const authState = useAuthState();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Check authentication status on mount
    const checkAuth = async () => {
      // Auth is checked in useAuthState hook via localStorage
      setIsLoading(false);
    };
    
    checkAuth();
  }, []);

  if (isLoading) {
    return (
      <div className="uc-loading-screen">
        <div className="uc-loading-spinner"></div>
        <p className="uc-text-lg uc-text-secondary">Loading...</p>
      </div>
    );
  }

  return (
    <AuthContext.Provider value={authState}>
      <Router>
        <div className="uc-app">
          <Routes>
            {/* Authentication */}
            <Route 
              path="/login" 
              element={
                authState.isAuthenticated ? 
                  <Navigate to="/" replace /> : 
                  <Login onLogin={authState.login} />
              } 
            />
            
            {/* Protected Routes */}
            <Route
              path="/"
              element={
                authState.isAuthenticated ? 
                  <VideoIntroduction /> : 
                  <Navigate to="/login" replace />
              }
            />
            
            <Route
              path="/ready"
              element={
                authState.isAuthenticated ? 
                  <ReadyState /> : 
                  <Navigate to="/login" replace />
              }
            />
            
            <Route
              path="/conversation"
              element={
                authState.isAuthenticated ? 
                  <InterestDiscovery /> : 
                  <Navigate to="/login" replace />
              }
            />
            
            <Route
              path="/collection"
              element={
                authState.isAuthenticated ? 
                  <FormCollection /> : 
                  <Navigate to="/login" replace />
              }
            />
            
            <Route
              path="/exploration"
              element={
                authState.isAuthenticated ? 
                  <CareerExploration /> : 
                  <Navigate to="/login" replace />
              }
            />

            {/* Fallback */}
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </div>
      </Router>
    </AuthContext.Provider>
  );
}

export default App;


