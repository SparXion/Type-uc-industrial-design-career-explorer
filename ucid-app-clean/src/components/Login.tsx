import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

interface LoginProps {
  onLogin: (userId: string, userData: any) => void;
}

const Login: React.FC<LoginProps> = ({ onLogin }) => {
  const [isSignup, setIsSignup] = useState(false);
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    firstName: '',
    lastName: '',
    studentId: ''
  });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
    setError('');
  };

  const validateEmail = (email: string): boolean => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    // Validation
    if (!validateEmail(formData.email)) {
      setError('Please enter a valid email address');
      setLoading(false);
      return;
    }

    if (formData.password.length < 6) {
      setError('Password must be at least 6 characters');
      setLoading(false);
      return;
    }

    if (isSignup) {
      if (!formData.firstName || !formData.lastName) {
        setError('Please fill in all required fields');
        setLoading(false);
        return;
      }
    }

    try {
      const endpoint = isSignup ? '/api/auth/signup' : '/api/auth/login';
      const response = await fetch(`http://localhost:5000${endpoint}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || 'Authentication failed');
      }

      // Store auth token and user data
      localStorage.setItem('ucid-auth-token', data.token);
      localStorage.setItem('ucid-user-id', data.userId);
      localStorage.setItem('ucid-user-data', JSON.stringify(data.userData));

      // Call the onLogin callback
      onLogin(data.userId, data.userData);

      // Check if user has completed onboarding
      if (data.userData.hasCompletedOnboarding) {
        navigate('/exploration');
      } else {
        navigate('/');
      }

    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred');
    } finally {
      setLoading(false);
    }
  };

  const handleSkipLogin = () => {
    // Guest mode - generate temporary ID
    const guestId = `guest-${Date.now()}`;
    localStorage.setItem('ucid-user-id', guestId);
    localStorage.setItem('ucid-is-guest', 'true');
    onLogin(guestId, { isGuest: true });
    navigate('/');
  };

  return (
    <div className="uc-container uc-page-transition">
      <div className="uc-login-container">
        {/* Header */}
        <div className="uc-login-header uc-space-6">
          <h1 className="uc-text-3xl uc-text-primary">
            UC Industrial Design Career Explorer
          </h1>
          <p className="uc-text-lg uc-text-secondary">
            {isSignup ? 'Create your account to begin' : 'Welcome back! Sign in to continue your journey'}
          </p>
        </div>

        {/* Login/Signup Form */}
        <div className="uc-login-card">
          <form onSubmit={handleSubmit} className="uc-login-form">
            {/* Toggle between Login and Signup */}
            <div className="uc-form-toggle uc-space-6">
              <button
                type="button"
                className={`uc-toggle-button ${!isSignup ? 'active' : ''}`}
                onClick={() => setIsSignup(false)}
              >
                Sign In
              </button>
              <button
                type="button"
                className={`uc-toggle-button ${isSignup ? 'active' : ''}`}
                onClick={() => setIsSignup(true)}
              >
                Sign Up
              </button>
            </div>

            {/* Signup-only fields */}
            {isSignup && (
              <>
                <div className="uc-form-row">
                  <div className="uc-form-group">
                    <label htmlFor="firstName" className="uc-label">
                      First Name <span className="uc-required">*</span>
                    </label>
                    <input
                      type="text"
                      id="firstName"
                      name="firstName"
                      value={formData.firstName}
                      onChange={handleInputChange}
                      className="uc-input"
                      required={isSignup}
                    />
                  </div>

                  <div className="uc-form-group">
                    <label htmlFor="lastName" className="uc-label">
                      Last Name <span className="uc-required">*</span>
                    </label>
                    <input
                      type="text"
                      id="lastName"
                      name="lastName"
                      value={formData.lastName}
                      onChange={handleInputChange}
                      className="uc-input"
                      required={isSignup}
                    />
                  </div>
                </div>

                <div className="uc-form-group">
                  <label htmlFor="studentId" className="uc-label">
                    Student ID (Optional)
                  </label>
                  <input
                    type="text"
                    id="studentId"
                    name="studentId"
                    value={formData.studentId}
                    onChange={handleInputChange}
                    className="uc-input"
                    placeholder="e.g., UC123456"
                  />
                  <p className="uc-text-sm uc-text-secondary uc-space-2">
                    UC students can enter their ID for personalized recommendations
                  </p>
                </div>
              </>
            )}

            {/* Email field */}
            <div className="uc-form-group">
              <label htmlFor="email" className="uc-label">
                Email Address <span className="uc-required">*</span>
              </label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleInputChange}
                className="uc-input"
                placeholder="your.email@uc.edu"
                required
              />
            </div>

            {/* Password field */}
            <div className="uc-form-group">
              <label htmlFor="password" className="uc-label">
                Password <span className="uc-required">*</span>
              </label>
              <input
                type="password"
                id="password"
                name="password"
                value={formData.password}
                onChange={handleInputChange}
                className="uc-input"
                placeholder="At least 6 characters"
                required
              />
            </div>

            {/* Error message */}
            {error && (
              <div className="uc-error-message uc-space-4">
                {error}
              </div>
            )}

            {/* Submit button */}
            <button
              type="submit"
              className="uc-button-primary uc-button-large uc-space-6"
              disabled={loading}
            >
              {loading ? 'Please wait...' : (isSignup ? 'Create Account' : 'Sign In')}
            </button>

            {/* Guest mode */}
            <div className="uc-divider uc-space-6">
              <span className="uc-text-sm uc-text-secondary">or</span>
            </div>

            <button
              type="button"
              onClick={handleSkipLogin}
              className="uc-button-secondary uc-button-large"
            >
              Continue as Guest
            </button>

            <p className="uc-text-xs uc-text-secondary uc-space-4">
              Guest mode: Your progress won't be saved permanently
            </p>
          </form>

          {/* Privacy notice */}
          <div className="uc-privacy-notice uc-space-6">
            <p className="uc-text-xs uc-text-secondary">
              By signing up, you agree to our data handling practices.
              Your information is protected under FERPA guidelines and will only be used
              to provide personalized career guidance.
            </p>
          </div>
        </div>

        {/* Benefits section */}
        <div className="uc-benefits-section uc-space-8">
          <h3 className="uc-text-xl uc-text-primary uc-space-4">
            Why create an account?
          </h3>
          <div className="uc-benefits-grid">
            <div className="uc-benefit-item">
              <div className="uc-benefit-icon">💾</div>
              <div className="uc-benefit-content">
                <h4 className="uc-text-base uc-text-primary">Save Your Progress</h4>
                <p className="uc-text-sm uc-text-secondary">
                  Pick up right where you left off
                </p>
              </div>
            </div>
            <div className="uc-benefit-item">
              <div className="uc-benefit-icon">🎯</div>
              <div className="uc-benefit-content">
                <h4 className="uc-text-base uc-text-primary">Personalized Matches</h4>
                <p className="uc-text-sm uc-text-secondary">
                  Get tailored career recommendations
                </p>
              </div>
            </div>
            <div className="uc-benefit-item">
              <div className="uc-benefit-icon">🔗</div>
              <div className="uc-benefit-content">
                <h4 className="uc-text-base uc-text-primary">Connect with UC</h4>
                <p className="uc-text-sm uc-text-secondary">
                  Access Cincinnati industry connections
                </p>
              </div>
            </div>
            <div className="uc-benefit-item">
              <div className="uc-benefit-icon">📊</div>
              <div className="uc-benefit-content">
                <h4 className="uc-text-base uc-text-primary">Track Your Journey</h4>
                <p className="uc-text-sm uc-text-secondary">
                  See how your interests evolve over time
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;

