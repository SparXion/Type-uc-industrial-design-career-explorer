import React from 'react';
import { useNavigate } from 'react-router-dom';

const ReadyState: React.FC = () => {
  const navigate = useNavigate();

  const handleStart = () => {
    navigate('/conversation');
  };

  return (
    <div className="uc-fullscreen uc-page-transition">
      <div style={{ textAlign: 'center' }}>
        <h1 className="uc-heading-1">Ready?</h1>
        <p className="uc-text-large">
          Let's discover your interests and talents to find your perfect Industrial Design career path.
        </p>
        
        <div style={{ marginTop: '3rem' }}>
          <button 
            className="uc-arrow-button"
            onClick={handleStart}
            aria-label="Start conversation"
          >
            →
          </button>
        </div>
        
        <p style={{ 
          marginTop: '2rem', 
          fontSize: 'var(--uc-text-sm)', 
          color: 'var(--uc-text-secondary)' 
        }}>
          Click the arrow to begin your career discovery journey
        </p>
      </div>
    </div>
  );
};

export default ReadyState;