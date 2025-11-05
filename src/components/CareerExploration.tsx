import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

interface CareerPath {
  id: string;
  title: string;
  description: string;
  icon: string;
  skills: string[];
  companies: string[];
  salary: string;
}

const CareerExploration: React.FC = () => {
  const [selectedCareer, setSelectedCareer] = useState<string | null>(null);
  const [formData, setFormData] = useState<any>(null);
  const navigate = useNavigate();

  useEffect(() => {
    // Load form data from localStorage
    const savedData = localStorage.getItem('ucid-form-data');
    if (savedData) {
      setFormData(JSON.parse(savedData));
    }
  }, []);

  const careerPaths: CareerPath[] = [
    {
      id: 'product-design',
      title: 'Product Design',
      description: 'Create innovative products that solve real user problems',
      icon: '',
      skills: ['User Research', 'Prototyping', '3D Modeling', 'Design Thinking'],
      companies: ['IDEO', 'Frog Design', 'Smart Design', 'Continuum'],
      salary: '$65,000 - $120,000'
    },
    {
      id: 'user-experience',
      title: 'User Experience',
      description: 'Design seamless interactions and user journeys',
      icon: '',
      skills: ['User Research', 'Wireframing', 'Usability Testing', 'Information Architecture'],
      companies: ['Google', 'Apple', 'Microsoft', 'Airbnb'],
      salary: '$70,000 - $130,000'
    },
    {
      id: 'sustainability',
      title: 'Sustainable Design',
      description: 'Create eco-friendly products and circular design solutions',
      icon: '',
      skills: ['Materials Science', 'Life Cycle Analysis', 'Circular Design', 'Environmental Impact'],
      companies: ['Patagonia', 'Interface', 'Method', 'Bamboo Studio'],
      salary: '$60,000 - $110,000'
    },
    {
      id: 'medical-devices',
      title: 'Medical Device Design',
      description: 'Design healthcare products that improve patient outcomes',
      icon: '',
      skills: ['Regulatory Knowledge', 'Human Factors', 'Biocompatibility', 'Clinical Research'],
      companies: ['Medtronic', 'Johnson & Johnson', 'Boston Scientific', 'Stryker'],
      salary: '$75,000 - $140,000'
    },
    {
      id: 'automotive',
      title: 'Automotive Design',
      description: 'Shape the future of transportation and mobility',
      icon: '',
      skills: ['Aerodynamics', 'Manufacturing', 'Safety Systems', 'Electric Vehicles'],
      companies: ['Tesla', 'Ford', 'BMW', 'Toyota'],
      salary: '$80,000 - $150,000'
    }
  ];

  const handleCareerSelect = (careerId: string) => {
    setSelectedCareer(careerId);
  };

  const handleStartOver = () => {
    localStorage.removeItem('ucid-form-data');
    navigate('/video');
  };

  const selectedCareerData = careerPaths.find(career => career.id === selectedCareer);

  return (
    <div className="uc-fullscreen uc-page-transition">
      <div style={{ 
        maxWidth: '1200px', 
        width: '100%', 
        padding: 'var(--uc-space-6)',
        textAlign: 'center'
      }}>
        <h1 className="uc-heading-1">Your Career Paths</h1>
        <p className="uc-text-large">
          Based on your interests and talents, here are some Industrial Design career paths to explore:
        </p>

        {formData && (
          <div style={{ 
            background: 'var(--uc-off-white)', 
            padding: 'var(--uc-space-4)', 
            borderRadius: '12px',
            marginBottom: 'var(--uc-space-8)',
            textAlign: 'left'
          }}>
            <h3 style={{ marginBottom: 'var(--uc-space-2)' }}>Your Profile Summary:</h3>
            <p><strong>Talents:</strong> {formData.talents}</p>
            <p><strong>Interests:</strong> {formData.interests}</p>
            <p><strong>Goals:</strong> {formData.goals}</p>
          </div>
        )}

        <div className="uc-career-grid">
          {careerPaths.map((career) => (
            <div
              key={career.id}
              className={`uc-career-box ${selectedCareer === career.id ? 'active' : ''}`}
              onClick={() => handleCareerSelect(career.id)}
            >
              <div className="uc-career-icon">{career.icon}</div>
              <h3 className="uc-career-title">{career.title}</h3>
              <p className="uc-career-description">{career.description}</p>
              <p style={{ 
                fontSize: 'var(--uc-text-sm)', 
                color: 'var(--uc-accent)',
                fontWeight: '600',
                marginTop: 'var(--uc-space-2)'
              }}>
                {career.salary}
              </p>
            </div>
          ))}
        </div>

        {selectedCareerData && (
          <div style={{ 
            background: 'var(--uc-white)', 
            border: '2px solid var(--uc-accent)',
            borderRadius: '12px',
            padding: 'var(--uc-space-6)',
            marginTop: 'var(--uc-space-8)',
            textAlign: 'left'
          }}>
            <h2 style={{ 
              textAlign: 'center', 
              marginBottom: 'var(--uc-space-4)',
              color: 'var(--uc-accent)'
            }}>
              {selectedCareerData.title}
            </h2>
            
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: 'var(--uc-space-6)' }}>
              <div>
                <h4>Key Skills to Develop:</h4>
                <ul style={{ paddingLeft: 'var(--uc-space-4)' }}>
                  {selectedCareerData.skills.map((skill, index) => (
                    <li key={index} style={{ marginBottom: 'var(--uc-space-1)' }}>{skill}</li>
                  ))}
                </ul>
              </div>
              
              <div>
                <h4>Top Companies:</h4>
                <ul style={{ paddingLeft: 'var(--uc-space-4)' }}>
                  {selectedCareerData.companies.map((company, index) => (
                    <li key={index} style={{ marginBottom: 'var(--uc-space-1)' }}>{company}</li>
                  ))}
                </ul>
              </div>
            </div>
            
            <div style={{ 
              textAlign: 'center', 
              marginTop: 'var(--uc-space-6)',
              padding: 'var(--uc-space-4)',
              background: 'var(--uc-off-white)',
              borderRadius: '8px'
            }}>
              <h4>Next Steps:</h4>
              <p>1. Research these companies and their design processes</p>
              <p>2. Build a portfolio showcasing relevant skills</p>
              <p>3. Connect with professionals in this field</p>
              <p>4. Consider internships or co-op opportunities</p>
            </div>
          </div>
        )}

        <div style={{ 
          marginTop: 'var(--uc-space-8)',
          display: 'flex',
          justifyContent: 'center',
          gap: 'var(--uc-space-4)'
        }}>
          <button
            className="uc-button-primary"
            onClick={handleStartOver}
            style={{ background: 'var(--uc-secondary)' }}
          >
            Start Over
          </button>
          
          <button
            className="uc-button-primary"
            onClick={() => window.print()}
          >
            Print Career Summary
          </button>
        </div>
      </div>
    </div>
  );
};

export default CareerExploration;