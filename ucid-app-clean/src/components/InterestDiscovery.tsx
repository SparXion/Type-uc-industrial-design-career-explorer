import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

interface InterestResponse {
  question: string;
  answer: string;
  timestamp: Date;
}

const InterestDiscovery: React.FC = () => {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [responses, setResponses] = useState<InterestResponse[]>([]);
  const [currentAnswer, setCurrentAnswer] = useState('');
  const [showContinue, setShowContinue] = useState(false);
  const navigate = useNavigate();

  const questions = [
    "What are you good at?",
    "What did you like to draw or create as a kid?",
    "What's your favorite movie, TV show, or video game?",
    "Have you ever used a 3D printer or built something cool?",
    "What kind of problems do you like to solve?"
  ];

  const currentQuestion = questions[currentQuestionIndex];

  const handleSubmit = () => {
    if (!currentAnswer.trim()) return;

    const newResponse: InterestResponse = {
      question: currentQuestion,
      answer: currentAnswer.trim(),
      timestamp: new Date()
    };

    setResponses(prev => [...prev, newResponse]);
    setCurrentAnswer('');

    if (currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex(prev => prev + 1);
    } else {
      setShowContinue(true);
    }
  };

  const handleContinue = () => {
    // Save responses to localStorage
    localStorage.setItem('ucid-interest-responses', JSON.stringify(responses));
    navigate('/collection');
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSubmit();
    }
  };

  return (
    <div className="uc-container uc-page-transition">
      <div className="uc-discovery-container">
        {/* Header */}
        <div className="uc-discovery-header uc-space-6">
          <h1 className="uc-text-2xl uc-text-primary">Discover Your Design Path 🎨</h1>
          <p className="uc-text-base uc-text-secondary">
            Let's explore your interests and talents to find your perfect design career
          </p>
        </div>

        {/* Progress */}
        <div className="uc-progress-container uc-space-4">
          <div className="uc-progress-bar">
            <div 
              className="uc-progress-fill"
              style={{ width: `${((currentQuestionIndex + 1) / questions.length) * 100}%` }}
            />
          </div>
          <p className="uc-text-sm uc-text-secondary">
            Question {currentQuestionIndex + 1} of {questions.length}
          </p>
        </div>

        {/* Question Card */}
        <div className="uc-question-card">
          <div className="uc-question-content">
            <h2 className="uc-text-xl uc-text-primary uc-space-4">
              {currentQuestion}
            </h2>
            <p className="uc-text-base uc-text-secondary">
              Take your time and be specific about what you enjoy
            </p>
          </div>
          
          <div className="uc-response-area uc-space-6">
            <textarea
              value={currentAnswer}
              onChange={(e) => setCurrentAnswer(e.target.value)}
              onKeyPress={handleKeyPress}
              placeholder="Share your thoughts here..."
              className="uc-textarea"
              rows={4}
              autoFocus
            />
            <button
              onClick={handleSubmit}
              disabled={!currentAnswer.trim()}
              className="uc-button-primary"
            >
              {currentQuestionIndex < questions.length - 1 ? 'Next Question' : 'Finish'}
            </button>
          </div>
        </div>

        {/* Responses Summary */}
        {responses.length > 0 && (
          <div className="uc-responses-summary">
            <h3 className="uc-text-lg uc-text-primary uc-space-4">Your Responses</h3>
            <div className="uc-responses-list">
              {responses.map((response, index) => (
                <div key={index} className="uc-response-item">
                  <div className="uc-response-question uc-text-sm uc-text-secondary">
                    {response.question}
                  </div>
                  <div className="uc-response-answer uc-text-base">
                    {response.answer}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Continue Button */}
        {showContinue && (
          <div className="uc-continue-section">
            <div className="uc-continue-card">
              <h3 className="uc-text-lg uc-text-primary">Great! Ready to explore your career options?</h3>
              <p className="uc-text-base uc-text-secondary">
                Based on your responses, we'll show you some exciting design career paths
              </p>
              <button
                onClick={handleContinue}
                className="uc-button-primary uc-button-large"
              >
                Explore Career Paths
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default InterestDiscovery;
