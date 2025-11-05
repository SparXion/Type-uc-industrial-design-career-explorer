import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const FormCollection: React.FC = () => {
  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState({
    talents: '',
    interests: '',
    goals: ''
  });
  const navigate = useNavigate();

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleNext = () => {
    if (currentStep < 3) {
      setCurrentStep(currentStep + 1);
    } else {
      // Save data and proceed
      localStorage.setItem('ucid-form-data', JSON.stringify(formData));
      navigate('/exploration');
    }
  };

  const handleBack = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    } else {
      navigate('/conversation');
    }
  };

  const renderStep = () => {
    switch (currentStep) {
      case 1:
        return (
          <div>
            <h2 className="uc-heading-2">What are your natural talents?</h2>
            <p className="uc-text-large">
              Think about what comes naturally to you. What do people often ask you for help with?
            </p>
            <textarea
              className="uc-input"
              value={formData.talents}
              onChange={(e) => handleInputChange('talents', e.target.value)}
              placeholder="For example: I'm good at visualizing 3D spaces, I love problem-solving, I enjoy working with my hands..."
              rows={6}
              style={{ resize: 'vertical' }}
            />
          </div>
        );
      
      case 2:
        return (
          <div>
            <h2 className="uc-heading-2">What interests you most?</h2>
            <p className="uc-text-large">
              What topics, industries, or types of problems get you excited?
            </p>
            <textarea
              className="uc-input"
              value={formData.interests}
              onChange={(e) => handleInputChange('interests', e.target.value)}
              placeholder="For example: Sustainable design, medical devices, automotive design, user experience..."
              rows={6}
              style={{ resize: 'vertical' }}
            />
          </div>
        );
      
      case 3:
        return (
          <div>
            <h2 className="uc-heading-2">What are your career goals?</h2>
            <p className="uc-text-large">
              Where do you see yourself in 5-10 years? What kind of impact do you want to make?
            </p>
            <textarea
              className="uc-input"
              value={formData.goals}
              onChange={(e) => handleInputChange('goals', e.target.value)}
              placeholder="For example: I want to design products that help people with disabilities, I want to work at a startup creating innovative solutions..."
              rows={6}
              style={{ resize: 'vertical' }}
            />
          </div>
        );
      
      default:
        return null;
    }
  };

  const isStepComplete = () => {
    switch (currentStep) {
      case 1: return formData.talents.trim().length > 0;
      case 2: return formData.interests.trim().length > 0;
      case 3: return formData.goals.trim().length > 0;
      default: return false;
    }
  };

  return (
    <div className="uc-fullscreen uc-page-transition">
      <div style={{ 
        maxWidth: '800px', 
        width: '100%', 
        padding: 'var(--uc-space-6)',
        textAlign: 'center'
      }}>
        {/* Progress indicator */}
        <div style={{ 
          display: 'flex', 
          justifyContent: 'center', 
          marginBottom: 'var(--uc-space-8)',
          gap: 'var(--uc-space-2)'
        }}>
          {[1, 2, 3].map((step) => (
            <div
              key={step}
              style={{
                width: '12px',
                height: '12px',
                borderRadius: '50%',
                background: step <= currentStep ? 'var(--uc-primary)' : 'var(--uc-border)',
                transition: 'all 0.3s ease'
              }}
            />
          ))}
        </div>

        {renderStep()}

        {/* Navigation buttons */}
        <div style={{ 
          display: 'flex', 
          justifyContent: 'space-between', 
          marginTop: 'var(--uc-space-8)',
          gap: 'var(--uc-space-4)'
        }}>
          <button
            className="uc-button-primary"
            onClick={handleBack}
            style={{ 
              background: 'var(--uc-secondary)',
              opacity: currentStep === 1 ? 0.5 : 1
            }}
            disabled={currentStep === 1}
          >
            Back
          </button>
          
          <button
            className="uc-button-primary"
            onClick={handleNext}
            disabled={!isStepComplete()}
            style={{ 
              opacity: isStepComplete() ? 1 : 0.5,
              cursor: isStepComplete() ? 'pointer' : 'not-allowed'
            }}
          >
            {currentStep === 3 ? 'Explore Careers' : 'Next'}
          </button>
        </div>

        <p style={{ 
          marginTop: 'var(--uc-space-4)', 
          fontSize: 'var(--uc-text-sm)', 
          color: 'var(--uc-text-secondary)' 
        }}>
          Step {currentStep} of 3
        </p>
      </div>
    </div>
  );
};

export default FormCollection;