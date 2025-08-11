"""
UC Industrial Design Career Explorer App - Backend API
Main Flask application with REST API endpoints
"""

from flask import Flask, jsonify, request
from flask_cors import CORS
from flask_jwt_extended import JWTManager
import os
from dotenv import load_dotenv

# Load environment variables
load_dotenv()

def create_app():
    """Application factory pattern for Flask app"""
    app = Flask(__name__)
    
    # Configuration
    app.config['SECRET_KEY'] = os.getenv('SECRET_KEY', 'dev-secret-key-change-in-production')
    app.config['JWT_SECRET_KEY'] = os.getenv('JWT_SECRET_KEY', 'jwt-secret-key-change-in-production')
    app.config['MONGODB_URI'] = os.getenv('MONGODB_URI', 'mongodb://localhost:27017/uc_industrial_design')
    
    # Initialize extensions
    CORS(app, resources={r"/api/*": {"origins": "*"}})
    JWTManager(app)
    
    # Register blueprints
    from routes.auth import auth_bp
    from routes.students import students_bp
    from routes.companies import companies_bp
    from routes.careers import careers_bp
    from routes.ai_engine import ai_engine_bp
    from routes.practice_projects import practice_projects_bp
    
    app.register_blueprint(auth_bp, url_prefix='/api/auth')
    app.register_blueprint(students_bp, url_prefix='/api/students')
    app.register_blueprint(companies_bp, url_prefix='/api/companies')
    app.register_blueprint(careers_bp, url_prefix='/api/careers')
    app.register_blueprint(ai_engine_bp, url_prefix='/api/ai')
    app.register_blueprint(practice_projects_bp, url_prefix='/api/practice-projects')
    
    # Health check endpoint
    @app.route('/api/health')
    def health_check():
        """Health check endpoint for monitoring"""
        return jsonify({
            'status': 'healthy',
            'service': 'UC Industrial Design Career Explorer API',
            'version': '1.0.0'
        })
    
    # Development endpoint for testing (remove in production)
    @app.route('/api/dev/test-student', methods=['POST'])
    def create_test_student():
        """Development endpoint to create a test student without authentication"""
        try:
            data = request.get_json()
            if not data:
                return jsonify({'error': 'No data provided'}), 400
                
            # Import here to avoid circular imports
            from services.student_service import StudentService
            
            # Create student using service
            student_id = StudentService.create_student_profile(data)
            
            # Get the created student to return
            student = StudentService.get_student_by_id(student_id)
            
            return jsonify(student), 201
            
        except Exception as e:
            return jsonify({'error': str(e)}), 500
    
    # Error handlers
    @app.errorhandler(404)
    def not_found(error):
        return jsonify({'error': 'Not found'}), 404
    
    @app.errorhandler(500)
    def internal_error(error):
        return jsonify({'error': 'Internal server error'}), 500
    
    return app

# Create app instance
app = create_app()

if __name__ == '__main__':
    # Development server
    app.run(
        host='0.0.0.0',
        port=int(os.getenv('PORT', 5000)),
        debug=os.getenv('FLASK_ENV') == 'development'
    )
