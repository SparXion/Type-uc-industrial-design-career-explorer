import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const VideoIntroduction: React.FC = () => {
  const [showSkip, setShowSkip] = useState(false);
  const navigate = useNavigate();

  const handleSkip = () => {
    navigate('/ready');
  };

  const handleVideoEnd = () => {
    navigate('/ready');
  };

  return (
    <div className="uc-fullscreen">
      <div className="uc-video-container">
        {/* Placeholder for video - will be replaced with actual video */}
        <div 
          style={{
            width: '100%',
            height: '100%',
            background: 'linear-gradient(135deg, #007BFF 0%, #0056b3 100%)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            color: 'white',
            fontSize: '2rem',
            fontWeight: 'bold'
          }}
        >
          What is Industrial Design?<br />
          <small style={{ fontSize: '1rem', marginTop: '1rem', opacity: 0.8 }}>
            Video Introduction (what-Is-ID-001.mp4)
          </small>
        </div>
        
        {/* Skip button appears after 3 seconds */}
        {!showSkip && (
          <div style={{ position: 'absolute', top: '20px', right: '20px' }}>
            <button 
              className="uc-skip-button"
              onClick={handleSkip}
              onMouseEnter={() => setShowSkip(true)}
            >
              Skip
            </button>
          </div>
        )}
        
        {/* Simulate video end after 10 seconds for demo */}
        <div style={{ position: 'absolute', bottom: '20px', left: '50%', transform: 'translateX(-50%)' }}>
          <button 
            className="uc-button-primary"
            onClick={handleVideoEnd}
            style={{ opacity: 0.8 }}
          >
            Continue to Ready State
          </button>
        </div>
      </div>
    </div>
  );
};

export default VideoIntroduction;