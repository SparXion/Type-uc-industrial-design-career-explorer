import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ThemeProvider } from '@mui/material/styles';
import { CssBaseline } from '@mui/material';
import { ucidTheme } from './theme';
import VideoIntroduction from './components/VideoIntroduction';
import ConversationalInterface from './components/ConversationalInterface';

function App() {
  return (
    <ThemeProvider theme={ucidTheme}>
      <CssBaseline />
      <Router>
        <Routes>
          <Route path="/" element={<VideoIntroduction />} />
          <Route path="/conversation" element={<ConversationalInterface />} />
        </Routes>
      </Router>
    </ThemeProvider>
  );
}

export default App;

