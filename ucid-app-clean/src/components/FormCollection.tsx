import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { llmService } from '../services/llmService';
import { ConversationContext, StudentInsights } from '../types/conversation';

const FormCollection: React.FC = () => {
  const [currentStep, setCurrentStep] = useState(1);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [userResponses, setUserResponses] = useState<string[]>([]);
  const [inputValue, setInputValue] = useState('');
  const [showContinue, setShowContinue] = useState(false);
  const [stepResponses, setStepResponses] = useState<{[key: number]: string[]}>({});
  const [conversationHistory, setConversationHistory] = useState<string[]>([]);
  const navigate = useNavigate();

  // Specific, targeted questions for each step
  const stepQuestions = {
    1: [ // Talents
      "What was your favorite movie or TV show growing up?",
      "Do you have any favorite comic book characters?",
      "What toys did you love playing with as a kid?",
      "Did you used to draw or build things?"
    ],
    2: [ // Interests
      "What kind of music do you listen to?",
      "What hobbies do you enjoy in your free time?",
      "What subjects in school did you find most interesting?",
      "What would you do if you had unlimited free time?"
    ],
    3: [ // Skills
      "What are you good at that others might not be?",
      "What do people often ask for your help with?",
      "What have you taught yourself to do?",
      "What skills do you want to improve?"
    ],
    4: [ // Goals
      "What kind of impact do you want to have on the world?",
      "What problems do you want to solve?",
      "What would make you feel fulfilled in your career?",
      "Where do you see yourself in 5 years?"
    ]
  };

  const getCurrentQuestion = () => {
    return stepQuestions[currentStep as keyof typeof stepQuestions][currentQuestionIndex];
  };

  const getStepTitle = () => {
    switch (currentStep) {
      case 1: return "Discovering Your Talents";
      case 2: return "Exploring Your Interests";
      case 3: return "Identifying Your Skills";
      case 4: return "Understanding Your Goals";
      default: return "Discovery";
    }
  };


  const handleSendResponse = async () => {
    if (!inputValue.trim()) return;

    const newResponse = inputValue.trim();
    
    // Cache the response for current question
    setUserResponses(prev => [...prev, newResponse]);
    setConversationHistory(prev => [...prev, `Student: ${newResponse}`]);
    setInputValue('');
    
    // Move to next question immediately (no AI delay)
    handleNextQuestion();
  };

  const handleNextQuestion = () => {
    const currentStepQuestions = stepQuestions[currentStep as keyof typeof stepQuestions];
    
    if (currentQuestionIndex < currentStepQuestions.length - 1) {
      // More questions in current step - DON'T clear responses yet
      setCurrentQuestionIndex(currentQuestionIndex + 1);
    } else {
      // Step completed
      completeStep();
    }
  };

  const completeStep = () => {
    // Save current step responses
    setStepResponses(prev => ({
      ...prev,
      [currentStep]: [...userResponses]
    }));

    // Show continue button
    setShowContinue(true);
  };

  const handleContinue = () => {
    if (currentStep < 4) {
      // Move to next step - clear responses for fresh start
      setCurrentStep(currentStep + 1);
      setCurrentQuestionIndex(0);
      setUserResponses([]);
      setConversationHistory([]);
      setShowContinue(false);
    } else {
      // All steps completed
      processResponses();
      navigate('/exploration');
    }
  };

  const processResponses = () => {
    const allResponses = Object.values(stepResponses).flat();
    console.log('All step responses:', stepResponses);
    console.log('All responses:', allResponses);
    
    const processedData = {
      talents: stepResponses[1] || [],
      interests: stepResponses[2] || [],
      skills: stepResponses[3] || [],
      goals: stepResponses[4]?.join(', ') || 'Career impact and fulfillment'
    };
    
    // Store in localStorage for persistence
    localStorage.setItem('ucid-form-data', JSON.stringify(processedData));
    localStorage.setItem('ucid-conversation-history', JSON.stringify(conversationHistory));
  };

  const getCategoryForStep = (step: number): string => {
    switch (step) {
      case 1: return 'talents';
      case 2: return 'interests';
      case 3: return 'skills';
      case 4: return 'goals';
      default: return 'talents';
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendResponse();
    }
  };

  return (
    <div className="uc-container uc-page-transition">
      <div className="uc-form-container">
        {/* Header */}
        <div className="uc-form-header uc-space-6">
          <h1 className="uc-text-2xl uc-text-primary">{getStepTitle()}</h1>
          <p className="uc-text-base uc-text-secondary">
            Step {currentStep} of 4: Let's discover what makes you unique
          </p>
        </div>

        {/* Progress */}
        <div className="uc-progress-bar uc-space-6">
          <div className="uc-progress-track">
            <div 
              className="uc-progress-fill" 
              style={{ width: `${(currentStep / 4) * 100}%` }}
            />
          </div>
          <span className="uc-text-sm uc-text-secondary">
            {currentStep} of 4 steps completed
          </span>
        </div>

        {/* Current Question */}
        <div className="uc-question-section uc-space-6">
          <h2 className="uc-text-xl uc-text-primary uc-space-4">
            {getCurrentQuestion()}
          </h2>
          <p className="uc-text-sm uc-text-secondary">
            Question {currentQuestionIndex + 1} of {stepQuestions[currentStep as keyof typeof stepQuestions].length} in this step
          </p>
        </div>

        {/* Current Step Responses Only - Keep it Clean */}
        {userResponses.length > 0 && (
          <div className="uc-current-responses uc-space-6">
            <h3 className="uc-text-base uc-text-primary">Your answers so far:</h3>
            <div className="uc-responses-summary">
              {userResponses.map((response, index) => (
                <div key={index} className="uc-response-chip">
                  {response}
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Input Area */}
        {!showContinue && (
          <div className="uc-input-area uc-space-6">
            <div className="uc-input-container">
              <textarea
                className="uc-input"
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                onKeyPress={handleKeyPress}
                placeholder="Share your thoughts..."
                rows={3}
              />
              <button 
                className="uc-button-primary"
                onClick={handleSendResponse}
                disabled={!inputValue.trim() || isTyping}
              >
                Send
              </button>
            </div>
          </div>
        )}

        {/* Continue Button */}
        {showContinue && (
          <div className="uc-continue-section uc-space-6">
            <button 
              className="uc-button-primary uc-arrow-button"
              onClick={handleContinue}
            >
              Continue to Next Step
            </button>
            <p className="uc-text-sm uc-text-secondary">
              {currentStep < 4 ? 'Ready for the next step?' : 'Complete your profile!'}
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default FormCollection;
