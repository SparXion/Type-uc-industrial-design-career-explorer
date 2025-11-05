"""
AI Engine Routes - AI-powered recommendations and analysis
"""

from flask import Blueprint, request, jsonify
from flask_jwt_extended import jwt_required, get_jwt_identity
import logging

from services.ai_service import AIService

# Configure logging
logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)

ai_engine_bp = Blueprint('ai_engine', __name__)

@ai_engine_bp.route('/analyze-student', methods=['POST'])
@jwt_required()
def analyze_student():
    """Analyze a student profile and generate AI insights"""
    try:
        data = request.get_json()
        if not data:
            return jsonify({'error': 'No data provided'}), 400
            
        student_id = data.get('student_id')
        if not student_id:
            return jsonify({'error': 'Student ID required'}), 400
            
        ai_service = AIService()
        result = ai_service.analyze_student_profile(student_id)
        
        return jsonify(result), 201
        
    except ValueError as e:
        return jsonify({'error': str(e)}), 400
    except Exception as e:
        logger.error(f"Error analyzing student: {str(e)}")
        return jsonify({'error': 'Internal server error'}), 500

@ai_engine_bp.route('/career-recommendations', methods=['POST'])
def get_ai_career_recommendations():
    """Get AI-powered career recommendations based on profile data"""
    try:
        data = request.get_json()
        if not data:
            return jsonify({'error': 'No data provided'}), 400
            
        ai_service = AIService()
        result = ai_service.get_career_recommendations(data)
        
        return jsonify(result), 200
        
    except ValueError as e:
        return jsonify({'error': str(e)}), 400
    except Exception as e:
        logger.error(f"Error getting AI career recommendations: {str(e)}")
        return jsonify({'error': 'Internal server error'}), 500

@ai_engine_bp.route('/company-matches', methods=['POST'])
def get_ai_company_matches():
    """Get AI-powered company matches based on profile data"""
    try:
        data = request.get_json()
        if not data:
            return jsonify({'error': 'No data provided'}), 400
            
        ai_service = AIService()
        result = ai_service.get_company_matches(data)
        
        return jsonify(result), 200
        
    except ValueError as e:
        return jsonify({'error': str(e)}), 400
    except Exception as e:
        logger.error(f"Error getting AI company matches: {str(e)}")
        return jsonify({'error': 'Internal server error'}), 500

@ai_engine_bp.route('/skill-gap-analysis', methods=['POST'])
def analyze_skill_gaps():
    """Analyze skill gaps for a target career path"""
    try:
        data = request.get_json()
        if not data:
            return jsonify({'error': 'No data provided'}), 400
            
        ai_service = AIService()
        result = ai_service.analyze_skill_gaps(data)
        
        return jsonify(result), 200
        
    except ValueError as e:
        return jsonify({'error': str(e)}), 400
    except Exception as e:
        logger.error(f"Error analyzing skill gaps: {str(e)}")
        return jsonify({'error': 'Internal server error'}), 500

@ai_engine_bp.route('/market-insights', methods=['GET'])
def get_market_insights():
    """Get AI-generated market insights for industrial design careers"""
    try:
        ai_service = AIService()
        result = ai_service.get_market_insights()
        
        return jsonify(result), 200
        
    except Exception as e:
        logger.error(f"Error getting market insights: {str(e)}")
        return jsonify({'error': 'Internal server error'}), 500

@ai_engine_bp.route('/practice-project-recommendations', methods=['POST'])
def get_practice_project_recommendations():
    """Get AI-powered practice project recommendations based on student profile"""
    try:
        data = request.get_json()
        if not data:
            return jsonify({'error': 'No data provided'}), 400
            
        ai_service = AIService()
        result = ai_service.get_practice_project_recommendations(data)
        
        return jsonify(result), 200
        
    except ValueError as e:
        return jsonify({'error': str(e)}), 400
    except Exception as e:
        logger.error(f"Error getting practice project recommendations: {str(e)}")
        return jsonify({'error': 'Internal server error'}), 500

@ai_engine_bp.route('/learning-path', methods=['POST'])
def generate_learning_path():
    """Generate personalized learning path for career development"""
    try:
        data = request.get_json()
        if not data:
            return jsonify({'error': 'No data provided'}), 400
            
        ai_service = AIService()
        result = ai_service.generate_learning_path(data)
        
        return jsonify(result), 200
        
    except ValueError as e:
        return jsonify({'error': str(e)}), 400
    except Exception as e:
        logger.error(f"Error generating learning path: {str(e)}")
        return jsonify({'error': 'Internal server error'}), 500

@ai_engine_bp.route('/status', methods=['GET'])
def get_ai_service_status():
    """Get AI service status and available features"""
    try:
        ai_service = AIService()
        status = ai_service.get_service_status()
        
        return jsonify(status), 200
        
    except Exception as e:
        logger.error(f"Error getting AI service status: {str(e)}")
        return jsonify({'error': 'Internal server error'}), 500

@ai_engine_bp.route('/health', methods=['GET'])
def ai_health_check():
    """Health check endpoint for AI service"""
    try:
        return jsonify({
            'status': 'healthy',
            'service': 'AI Engine',
            'version': '1.0.0',
            'features': [
                'career_recommendations',
                'company_matches',
                'skill_gap_analysis',
                'practice_project_recommendations',
                'learning_path_generation'
            ]
        }), 200
        
    except Exception as e:
        logger.error(f"Error in AI health check: {str(e)}")
        return jsonify({'error': 'Internal server error'}), 500
