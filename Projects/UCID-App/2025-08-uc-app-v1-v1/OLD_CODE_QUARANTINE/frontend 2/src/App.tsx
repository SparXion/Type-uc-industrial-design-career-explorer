import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AppProvider } from './context/AppContext';
import { ThemeProvider } from './theme/ThemeProvider';
import VideoIntroduction from './pages/VideoIntroduction';
import LandingPage from './pages/LandingPage';
import InterestsInput from './pages/InterestsInput';
import CreativeOutletsInput from './pages/CreativeOutletsInput';
import SkillsSuggestions from './pages/SkillsSuggestions';
import CareerExploration from './pages/CareerExploration';
import PracticeProject from './pages/PracticeProject';
import WrapUp from './pages/WrapUp';
import Login from './pages/Login';
import ExplorationJourney from './pages/ExplorationJourney';
import CareerExplorationDetail from './pages/CareerExplorationDetail';
import ThemeDemo from './pages/ThemeDemo';

function App() {
  return (
    <ThemeProvider>
      <AppProvider>
        <Router>
          <Routes>
            {/* Bypass authentication - go straight to video intro */}
            <Route path="/" element={<VideoIntroduction />} />
            <Route path="/landing" element={<LandingPage />} />
            <Route path="/interests" element={<InterestsInput />} />
            <Route path="/creative-outlets" element={<CreativeOutletsInput />} />
            <Route path="/skills-suggestions" element={<SkillsSuggestions />} />
            <Route path="/career-exploration" element={<CareerExploration />} />
            <Route path="/practice-project" element={<PracticeProject />} />
            <Route path="/wrap-up" element={<WrapUp />} />
            <Route path="/login" element={<Login />} />
            <Route path="/exploration-journey" element={<ExplorationJourney />} />
            <Route path="/career-exploration/:category" element={<CareerExplorationDetail />} />
            <Route path="/theme-demo" element={<ThemeDemo />} />
            
            {/* Redirect any unknown routes to the main app */}
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </Router>
      </AppProvider>
    </ThemeProvider>
  );
}

export default App;
