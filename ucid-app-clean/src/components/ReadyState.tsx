import React from 'react';
import { useNavigate } from 'react-router-dom';

const ReadyState: React.FC = () => {
  const navigate = useNavigate();

  const handleArrowClick = () => {
    navigate('/conversation');
  };

  return (
    <div className="uc-artboard uc-page-transition">
      <div className="uc-ready-state">
        {/* Ready Text */}
        <div className="uc-ready-text">
          Ready?
        </div>
        
        {/* Subtitle */}
        <p className="uc-text-lg uc-text-secondary">
          Let's discover your Industrial Design career path
        </p>
        
        {/* Arrow Button - Critical for UX Flow */}
        <button 
          className="uc-arrow-button uc-hover-lift"
          onClick={handleArrowClick}
          aria-label="Start Career Discovery"
        >
          <svg 
            viewBox="0 0 24 24" 
            fill="currentColor"
            className="uc-arrow-icon"
          >
            <path d="M8.59 16.59L13.17 12 8.59 7.41 10 6l6 6-6 6-1.41-1.41z"/>
          </svg>
        </button>
        
        {/* Instructions */}
        <p className="uc-text-sm uc-text-secondary uc-space-6">
          Click the arrow to begin your journey
        </p>
      </div>
    </div>
  );
};

export default ReadyState;


