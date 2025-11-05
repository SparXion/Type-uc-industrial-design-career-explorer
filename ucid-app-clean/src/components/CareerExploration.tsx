import React, { useState, useEffect } from 'react';
import { careerMatchingService, CareerMatch, UserProfile } from '../services/careerMatchingService';

const CareerExploration: React.FC = () => {
  const [selectedPath, setSelectedPath] = useState<string | null>(null);
  const [showDetails, setShowDetails] = useState(false);
  const [careerMatches, setCareerMatches] = useState<CareerMatch[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Load user data from localStorage and generate matches
    const loadMatches = () => {
      try {
        // Get interest responses
        const interestResponses = localStorage.getItem('ucid-interest-responses');
        const formData = localStorage.getItem('ucid-form-data');
        
        let userProfile: UserProfile = {
          interests: [],
          talents: [],
          skills: [],
          goals: ''
        };
        
        if (interestResponses) {
          const responses = JSON.parse(interestResponses);
          userProfile.interests = responses.map((r: any) => r.answer);
        }
        
        if (formData) {
          const data = JSON.parse(formData);
          userProfile.talents = Array.isArray(data.talents) ? data.talents : [];
          userProfile.interests = [...userProfile.interests, ...(Array.isArray(data.interests) ? data.interests : [])];
          userProfile.skills = Array.isArray(data.skills) ? data.skills : [];
          userProfile.goals = data.goals || '';
        }
        
        // Generate career matches
        const matches = careerMatchingService.matchCareers(userProfile);
        setCareerMatches(matches.length > 0 ? matches : careerMatchingService.getAllCareers().slice(0, 5));
        
      } catch (error) {
        console.error('Error loading matches:', error);
        // Fallback to showing all careers
        setCareerMatches(careerMatchingService.getAllCareers().slice(0, 5));
      } finally {
        setLoading(false);
      }
    };
    
    loadMatches();
  }, []);

  // Fallback career paths (kept for backwards compatibility)
  const fallbackCareerPaths: CareerMatch[] = [
    {
      id: 'product-design',
      title: 'Product Design',
      description: 'Create innovative products that solve real user problems',
      skills: ['User Research', 'Prototyping', '3D Modeling', 'Design Thinking'],
      companies: ['IDEO', 'Frog Design', 'Smart Design', 'Continuum'],
      icon: '🎨',
      confidenceScore: 0.85,
      matchReasons: []
    },
    {
      id: 'user-experience',
      title: 'User Experience',
      description: 'Design seamless interactions and user journeys',
      skills: ['User Research', 'Wireframing', 'Usability Testing', 'Information Architecture'],
      companies: ['Google', 'Apple', 'Microsoft', 'Airbnb'],
      icon: '💡'
    },
    {
      id: 'sustainability',
      title: 'Sustainable Design',
      description: 'Create eco-friendly products and circular design solutions',
      skills: ['Materials Science', 'Life Cycle Analysis', 'Circular Design', 'Environmental Impact'],
      companies: ['Patagonia', 'Interface', 'Method', 'Bamboo Studio'],
      icon: '🌱'
    },
    {
      id: 'healthcare',
      title: 'Healthcare Design',
      description: 'Design medical devices and healthcare experiences',
      skills: ['Medical Device Design', 'Human Factors', 'Regulatory Compliance', 'Patient Safety'],
      companies: ['Medtronic', 'Johnson & Johnson', 'Philips', 'GE Healthcare'],
      icon: '🏥'
    },
    {
      id: 'transportation',
      title: 'Transportation Design',
      description: 'Design vehicles and mobility solutions for the future',
      skills: ['Vehicle Design', 'Aerodynamics', 'Safety Engineering', 'Mobility Systems'],
      companies: ['Tesla', 'BMW', 'Ford', 'Uber'],
      icon: '🚗'
    }
  ];

  const handleCareerPathClick = (pathId: string) => {
    setSelectedPath(pathId);
    setShowDetails(true);
  };

  const handleCloseDetails = () => {
    setShowDetails(false);
    setSelectedPath(null);
  };

  const displayPaths = careerMatches.length > 0 ? careerMatches : fallbackCareerPaths;
  const selectedCareer = displayPaths.find(path => path.id === selectedPath);

  if (loading) {
    return (
      <div className="uc-container uc-page-transition">
        <div className="uc-loading-screen">
          <div className="uc-loading-spinner"></div>
          <p className="uc-text-lg uc-text-secondary">Analyzing your responses...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="uc-container uc-page-transition">
      <div className="uc-career-exploration">
        {/* Header */}
        <div className="uc-exploration-header uc-space-6">
          <h1 className="uc-text-3xl uc-text-primary">Career Path Exploration</h1>
          <p className="uc-text-lg uc-text-secondary">
            Based on your interests and talents, here are some career paths to explore
          </p>
        </div>

        {/* Match Summary */}
        {careerMatches.length > 0 && careerMatches[0].confidenceScore > 0 && (
          <div className="uc-match-summary uc-space-6">
            <p className="uc-text-base uc-text-secondary">
              Based on your responses, we found <strong>{careerMatches.length} career paths</strong> that match your interests and talents.
              Your top match has a <strong>{Math.round(careerMatches[0].confidenceScore * 100)}% confidence score</strong>.
            </p>
          </div>
        )}

        {/* Career Path Grid */}
        <div className="uc-career-grid">
          {displayPaths.map((path) => (
            <div
              key={path.id}
              className={`uc-career-box uc-hover-lift ${
                selectedPath === path.id ? 'active' : ''
              }`}
              onClick={() => handleCareerPathClick(path.id)}
            >
              <div className="uc-career-icon uc-space-6">
                <span className="uc-icon-large">{path.icon}</span>
              </div>
              <h3 className="uc-text-xl uc-text-primary uc-space-4">
                {path.title}
              </h3>
              {path.confidenceScore > 0 && (
                <div className="uc-confidence-badge uc-space-2">
                  {Math.round(path.confidenceScore * 100)}% Match
                </div>
              )}
              <p className="uc-text-base uc-text-secondary">
                {path.description}
              </p>
              {path.matchReasons && path.matchReasons.length > 0 && (
                <div className="uc-match-reason uc-space-3">
                  <p className="uc-text-sm uc-text-secondary">
                    💡 {path.matchReasons[0]}
                  </p>
                </div>
              )}
              <div className="uc-career-preview uc-space-4">
                <div className="uc-skills-preview">
                  {path.skills.slice(0, 2).map((skill, index) => (
                    <span key={index} className="uc-skill-tag">
                      {skill}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Career Path Details Modal */}
        {showDetails && selectedCareer && (
          <div className="uc-modal-overlay" onClick={handleCloseDetails}>
            <div className="uc-modal-content" onClick={(e) => e.stopPropagation()}>
              <div className="uc-modal-header">
                <h2 className="uc-text-2xl uc-text-primary">
                  {selectedCareer.title}
                </h2>
                <button 
                  className="uc-close-button"
                  onClick={handleCloseDetails}
                  aria-label="Close details"
                >
                  ×
                </button>
              </div>
              
              <div className="uc-modal-body">
                <div className="uc-career-description uc-space-6">
                  <p className="uc-text-base uc-text-secondary">
                    {selectedCareer.description}
                  </p>
                </div>

                <div className="uc-career-details">
                  <div className="uc-detail-section uc-space-6">
                    <h3 className="uc-text-lg uc-text-primary uc-space-4">
                      Key Skills
                    </h3>
                    <div className="uc-skills-list">
                      {selectedCareer.skills.map((skill, index) => (
                        <span key={index} className="uc-skill-tag">
                          {skill}
                        </span>
                      ))}
                    </div>
                  </div>

                  <div className="uc-detail-section uc-space-6">
                    <h3 className="uc-text-lg uc-text-primary uc-space-4">
                      Companies to Explore
                    </h3>
                    <div className="uc-companies-list">
                      {selectedCareer.companies.map((company, index) => (
                        <div key={index} className="uc-company-item">
                          {company}
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="uc-detail-section uc-space-6">
                    <h3 className="uc-text-lg uc-text-primary uc-space-4">
                      Next Steps
                    </h3>
                    <div className="uc-next-steps">
                      <p className="uc-text-base uc-text-secondary">
                        To pursue a career in {selectedCareer.title}, consider:
                      </p>
                      <ul className="uc-steps-list">
                        <li>Building a portfolio showcasing relevant projects</li>
                        <li>Networking with professionals in the field</li>
                        <li>Taking courses to develop key skills</li>
                        <li>Seeking internships or entry-level positions</li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>

              <div className="uc-modal-footer uc-space-6">
                <button 
                  className="uc-button-primary"
                  onClick={handleCloseDetails}
                >
                  Explore Other Paths
                </button>
                <button 
                  className="uc-button-secondary"
                  onClick={() => {
                    // Save career path preference
                    console.log('Selected career path:', selectedCareer.id);
                    handleCloseDetails();
                  }}
                >
                  Save This Path
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Action Buttons */}
        <div className="uc-exploration-actions uc-space-6">
          <button className="uc-button-primary">
            Get Personalized Recommendations
          </button>
          <button className="uc-button-secondary">
            Download Career Guide
          </button>
        </div>
      </div>
    </div>
  );
};

export default CareerExploration;


