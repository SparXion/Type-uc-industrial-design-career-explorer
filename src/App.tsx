import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import VideoIntroduction from './components/VideoIntroduction';
import ReadyState from './components/ReadyState';
import ConversationalInterface from './components/ConversationalInterface';
import FormCollection from './components/FormCollection';
import CareerExploration from './components/CareerExploration';
import './styles/north-star.css';

function App() {
  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path="/" element={<Navigate to="/video" replace />} />
          <Route path="/video" element={<VideoIntroduction />} />
          <Route path="/ready" element={<ReadyState />} />
          <Route path="/conversation" element={<ConversationalInterface />} />
          <Route path="/collection" element={<FormCollection />} />
          <Route path="/exploration" element={<CareerExploration />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;