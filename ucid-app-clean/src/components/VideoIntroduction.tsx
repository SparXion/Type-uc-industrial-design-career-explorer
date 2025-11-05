import React, { useState, useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const VideoIntroduction: React.FC = () => {
  const [showSkip, setShowSkip] = useState(false);
  const [videoEnded, setVideoEnded] = useState(false);
  const [videoError, setVideoError] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);
  const navigate = useNavigate();

  useEffect(() => {
    // Show skip button after 3 seconds
    const timer = setTimeout(() => setShowSkip(true), 3000);
    return () => clearTimeout(timer);
  }, []);

  const handleSkip = () => {
    navigate('/ready');
  };

  const handleVideoEnd = () => {
    setVideoEnded(true);
    // Auto-navigate to ready state after video ends
    setTimeout(() => navigate('/ready'), 1000);
  };

  const handleVideoClick = () => {
    if (videoRef.current) {
      if (videoRef.current.paused) {
        videoRef.current.play();
      } else {
        videoRef.current.pause();
      }
    }
  };

  const handleVideoError = (e: React.SyntheticEvent<HTMLVideoElement, Event>) => {
    console.error('Video error:', e);
    setVideoError(true);
    setShowSkip(true);
  };

  const handleVideoLoad = () => {
    console.log('Video loaded successfully');
  };

  return (
    <div className="uc-video-container">
      {/* Video Element - Fills entire screen */}
      {!videoError ? (
        <video
          ref={videoRef}
          className="uc-video-element"
          autoPlay
          muted
          playsInline
          onEnded={handleVideoEnd}
          onClick={handleVideoClick}
          onError={handleVideoError}
          onLoadedData={handleVideoLoad}
        >
          <source src="/What-Is-ID-001.mp4" type="video/mp4" />
          Your browser does not support the video tag.
        </video>
      ) : (
        <div className="uc-video-placeholder">
          <div className="uc-artboard">
            <div className="uc-ready-text">Welcome to UCID</div>
            <p className="uc-text-lg uc-text-secondary">
              Industrial Design Career Explorer
            </p>
            <div className="uc-video-info uc-space-4">
              <p className="uc-text-base uc-text-primary">
                🎯 Ready to discover your Industrial Design career path?
              </p>
              <p className="uc-text-sm uc-text-secondary">
                We'll help you explore your interests and connect them to design opportunities
              </p>
            </div>
            <button 
              className="uc-button-primary uc-space-6"
              onClick={handleSkip}
            >
              Start Your Journey
            </button>
          </div>
        </div>
      )}

      {/* Skip Button */}
      {showSkip && (
        <button 
          className="uc-skip-button uc-page-transition"
          onClick={handleSkip}
        >
          Skip Intro
        </button>
      )}

      {/* Video Controls Overlay */}
      <div className="uc-video-controls">
        <button 
          className="uc-button-primary"
          onClick={handleSkip}
        >
          Continue to App
        </button>
      </div>
    </div>
  );
};

export default VideoIntroduction;
