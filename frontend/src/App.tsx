import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Box, Container } from '@mui/material';
import Header from './components/Header';
import LandingPage from './pages/LandingPage';
import InterestsInput from './pages/InterestsInput';
import CreativeOutletsInput from './pages/CreativeOutletsInput';
import SkillsSuggestions from './pages/SkillsSuggestions';
import CareerExploration from './pages/CareerExploration';
import PracticeProject from './pages/PracticeProject';
import WrapUp from './pages/WrapUp';

function App() {
  return (
    <Router>
      <Box sx={{ minHeight: '100vh', backgroundColor: 'background.default' }}>
        <Header />
        <Container maxWidth="lg" sx={{ py: 4 }}>
          <Routes>
            <Route path="/" element={<LandingPage />} />
            <Route path="/interests" element={<InterestsInput />} />
            <Route path="/creative-outlets" element={<CreativeOutletsInput />} />
            <Route path="/skills-suggestions" element={<SkillsSuggestions />} />
            <Route path="/career-exploration" element={<CareerExploration />} />
            <Route path="/practice-project" element={<PracticeProject />} />
            <Route path="/wrap-up" element={<WrapUp />} />
          </Routes>
        </Container>
      </Box>
    </Router>
  );
}

export default App;
