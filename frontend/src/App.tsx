import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { Box, Container } from '@mui/material';
import { AppProvider, useAppContext } from './context/AppContext';
import Header from './components/Header';
import LandingPage from './pages/LandingPage';
import Login from './pages/Login';
import InterestsInput from './pages/InterestsInput';
import CreativeOutletsInput from './pages/CreativeOutletsInput';
import SkillsSuggestions from './pages/SkillsSuggestions';
import CareerExploration from './pages/CareerExploration';
import PracticeProject from './pages/PracticeProject';
import WrapUp from './pages/WrapUp';
import TestApi from './pages/TestApi';
import { authService } from './services';

// Protected Route component
const ProtectedRoute: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const isAuthenticated = authService.isAuthenticated();
  
  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }
  
  return <>{children}</>;
};

function App() {
  return (
    <AppProvider>
      <Router>
        <Box sx={{ minHeight: '100vh', backgroundColor: 'background.default' }}>
          <Header />
          <Container maxWidth="lg" sx={{ py:4 }}>
            <Routes>
              <Route path="/" element={<LandingPage />} />
              <Route path="/login" element={<Login />} />
              <Route path="/interests" element={
                <ProtectedRoute>
                  <InterestsInput />
                </ProtectedRoute>
              } />
              <Route path="/creative-outlets" element={
                <ProtectedRoute>
                  <CreativeOutletsInput />
                </ProtectedRoute>
              } />
              <Route path="/skills-suggestions" element={
                <ProtectedRoute>
                  <SkillsSuggestions />
                </ProtectedRoute>
              } />
              <Route path="/career-exploration" element={
                <ProtectedRoute>
                  <CareerExploration />
                </ProtectedRoute>
              } />
              <Route path="/practice-project" element={
                <ProtectedRoute>
                  <PracticeProject />
                </ProtectedRoute>
              } />
              <Route path="/wrap-up" element={
                <ProtectedRoute>
                  <WrapUp />
                </ProtectedRoute>
              } />
              <Route path="/test-api" element={<TestApi />} />
            </Routes>
          </Container>
        </Box>
      </Router>
    </AppProvider>
  );
}

export default App;
