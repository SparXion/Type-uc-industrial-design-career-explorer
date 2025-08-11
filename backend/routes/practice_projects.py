"""
Practice Projects Routes - API endpoints for practice project management
"""

from flask import Blueprint, request, jsonify
from flask_jwt_extended import jwt_required, get_jwt_identity
import logging

from services.practice_project_service import PracticeProjectService

# Configure logging
logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)

practice_projects_bp = Blueprint('practice_projects', __name__)

@practice_projects_bp.route('/', methods=['GET'])
def get_practice_projects():
    """Get all practice projects with optional filtering"""
    try:
        # Parse query parameters
        difficulty = request.args.get('difficulty')
        skills_focus = request.args.get('skills_focus', '').split(',') if request.args.get('skills_focus') else []
        duration = request.args.get('duration')
        
        filters = {}
        if difficulty:
            filters['difficulty'] = difficulty
        if skills_focus:
            filters['skills_focus'] = skills_focus
        if duration:
            filters['estimated_duration'] = duration
        
        service = PracticeProjectService()
        projects = service.get_projects_by_filters(filters)
        
        return jsonify(projects), 200
        
    except Exception as e:
        logger.error(f"Error fetching practice projects: {str(e)}")
        return jsonify({'error': 'Internal server error'}), 500

@practice_projects_bp.route('/<project_id>', methods=['GET'])
def get_practice_project(project_id):
    """Get a specific practice project by ID"""
    try:
        service = PracticeProjectService()
        project = service.get_project_by_id(project_id)
        
        if not project:
            return jsonify({'error': 'Practice project not found'}), 404
            
        return jsonify(project), 200
        
    except ValueError as e:
        return jsonify({'error': str(e)}), 400
    except Exception as e:
        logger.error(f"Error fetching practice project {project_id}: {str(e)}")
        return jsonify({'error': 'Internal server error'}), 500

@practice_projects_bp.route('/recommended', methods=['POST'])
def get_recommended_projects():
    """Get practice projects recommended for a student based on their profile"""
    try:
        data = request.get_json()
        if not data:
            return jsonify({'error': 'No data provided'}), 400
            
        student_interests = data.get('interests', {})
        student_skills = data.get('skills', {})
        career_goals = data.get('career_goals', [])
        
        service = PracticeProjectService()
        recommended_projects = service.get_recommended_projects(
            student_interests, student_skills, career_goals
        )
        
        return jsonify(recommended_projects), 200
        
    except Exception as e:
        logger.error(f"Error getting recommended projects: {str(e)}")
        return jsonify({'error': 'Internal server error'}), 500

@practice_projects_bp.route('/<project_id>/submit', methods=['POST'])
@jwt_required()
def submit_project(project_id):
    """Submit a completed practice project"""
    try:
        data = request.get_json()
        if not data:
            return jsonify({'error': 'No data provided'}), 400
            
        student_id = get_jwt_identity()
        submission_data = {
            'student_id': student_id,
            'project_id': project_id,
            'submission_date': data.get('submission_date'),
            'files': data.get('files', []),
            'reflection': data.get('reflection', ''),
            'skills_demonstrated': data.get('skills_demonstrated', [])
        }
        
        service = PracticeProjectService()
        submission_id = service.submit_project(submission_data)
        
        return jsonify({'submission_id': submission_id, 'message': 'Project submitted successfully'}), 201
        
    except ValueError as e:
        return jsonify({'error': str(e)}), 400
    except Exception as e:
        logger.error(f"Error submitting project: {str(e)}")
        return jsonify({'error': 'Internal server error'}), 500

@practice_projects_bp.route('/categories', methods=['GET'])
def get_project_categories():
    """Get all available project categories and difficulties"""
    try:
        categories = {
            'difficulties': ['beginner', 'intermediate', 'advanced'],
            'skill_categories': [
                'technical', 'design', 'business', 'leadership', 
                'communication', 'research', 'prototyping', 'manufacturing'
            ],
            'project_types': [
                'product_design', 'user_research', 'prototyping', 
                'market_analysis', 'sustainability', 'innovation'
            ]
        }
        
        return jsonify(categories), 200
        
    except Exception as e:
        logger.error(f"Error getting project categories: {str(e)}")
        return jsonify({'error': 'Internal server error'}), 500

@practice_projects_bp.route('/statistics', methods=['GET'])
def get_project_statistics():
    """Get overall project statistics and metrics"""
    try:
        service = PracticeProjectService()
        stats = service.get_project_statistics()
        
        return jsonify(stats), 200
        
    except Exception as e:
        logger.error(f"Error getting project statistics: {str(e)}")
        return jsonify({'error': 'Internal server error'}), 500

@practice_projects_bp.route('/<project_id>/student-progress', methods=['GET'])
@jwt_required()
def get_student_project_progress(project_id):
    """Get a student's progress on a specific project"""
    try:
        student_id = get_jwt_identity()
        
        service = PracticeProjectService()
        progress = service.get_student_project_progress(student_id, project_id)
        
        return jsonify(progress), 200
        
    except ValueError as e:
        return jsonify({'error': str(e)}), 400
    except Exception as e:
        logger.error(f"Error getting project progress: {str(e)}")
        return jsonify({'error': 'Internal server error'}), 500
