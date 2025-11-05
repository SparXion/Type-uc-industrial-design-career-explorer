"""
Student Routes - API endpoints for student management
"""

from flask import Blueprint, request, jsonify
from flask_jwt_extended import jwt_required, get_jwt_identity
from bson import ObjectId
from datetime import datetime
import logging

from database.connection import get_db
from models.student import StudentProfile, StudentUpdate
from services.student_service import StudentService

# Configure logging
logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)

students_bp = Blueprint('students', __name__)

@students_bp.route('/', methods=['GET'])
def get_students():
    """Get all students with optional filtering"""
    try:
        # Use service layer for filtering and pagination
        filters = {}
        page = int(request.args.get('page', 1))
        limit = int(request.args.get('limit', 20))
        
        # Parse query parameters
        interests = request.args.get('interests', '').split(',') if request.args.get('interests') else []
        skills = request.args.get('skills', '').split(',') if request.args.get('skills') else []
        major = request.args.get('major')
        graduation_year = request.args.get('graduation_year')
        
        if interests:
            filters['interests'] = interests
        if skills:
            filters['skills'] = skills
        if major:
            filters['major'] = major
        if graduation_year:
            filters['graduation_year'] = int(graduation_year)
        
        result = StudentService.get_students_by_filters(filters, page, limit)
        return jsonify(result), 200
        
    except Exception as e:
        logger.error(f"Error fetching students: {str(e)}")
        return jsonify({'error': 'Internal server error'}), 500

@students_bp.route('/<student_id>', methods=['GET'])
def get_student(student_id):
    """Get a specific student by ID"""
    try:
        student = StudentService.get_student_by_id(student_id)
        if not student:
            return jsonify({'error': 'Student not found'}), 404
            
        return jsonify(student), 200
        
    except ValueError as e:
        return jsonify({'error': str(e)}), 400
    except Exception as e:
        logger.error(f"Error fetching student {student_id}: {str(e)}")
        return jsonify({'error': 'Internal server error'}), 500

@students_bp.route('/', methods=['POST'])
@jwt_required()
def create_student():
    """Create a new student profile"""
    try:
        data = request.get_json()
        if not data:
            return jsonify({'error': 'No data provided'}), 400
            
        # Use service layer to create student
        student_id = StudentService.create_student_profile(data)
        
        # Get the created student to return
        student = StudentService.get_student_by_id(student_id)
        
        return jsonify(student), 201
        
    except ValueError as e:
        return jsonify({'error': str(e)}), 400
    except Exception as e:
        logger.error(f"Error creating student: {str(e)}")
        return jsonify({'error': 'Internal server error'}), 500

@students_bp.route('/<student_id>', methods=['PUT'])
@jwt_required()
def update_student(student_id):
    """Update a student profile"""
    try:
        if not ObjectId.is_valid(student_id):
            return jsonify({'error': 'Invalid student ID'}), 400
            
        data = request.get_json()
        if not data:
            return jsonify({'error': 'No data provided'}), 400
            
        # Validate data with Pydantic
        student_data = StudentUpdate(**data)
        
        db = get_db()
        collection = db.students
        
        # Check if student exists
        existing_student = collection.find_one({'_id': ObjectId(student_id)})
        if not existing_student:
            return jsonify({'error': 'Student not found'}), 404
            
        # Update student
        update_data = student_data.dict(exclude_unset=True)
        update_data['updated_at'] = datetime.utcnow()
        
        result = collection.update_one(
            {'_id': ObjectId(student_id)},
            {'$set': update_data}
        )
        
        if result.modified_count == 0:
            return jsonify({'error': 'No changes made'}), 400
            
        # Return updated student
        updated_student = collection.find_one({'_id': ObjectId(student_id)})
        updated_student['_id'] = str(updated_student['_id'])
        updated_student['created_at'] = updated_student['created_at'].isoformat() if updated_student.get('created_at') else None
        updated_student['updated_at'] = updated_student['updated_at'].isoformat() if updated_student.get('updated_at') else None
        
        return jsonify(updated_student), 200
        
    except Exception as e:
        logger.error(f"Error updating student {student_id}: {str(e)}")
        return jsonify({'error': 'Internal server error'}), 500

@students_bp.route('/<student_id>', methods=['DELETE'])
@jwt_required()
def delete_student(student_id):
    """Delete a student profile"""
    try:
        if not ObjectId.is_valid(student_id):
            return jsonify({'error': 'Invalid student ID'}), 400
            
        db = get_db()
        collection = db.students
        
        # Check if student exists
        existing_student = collection.find_one({'_id': ObjectId(student_id)})
        if not existing_student:
            return jsonify({'error': 'Student not found'}), 404
            
        # Delete student
        result = collection.delete_one({'_id': ObjectId(student_id)})
        
        if result.deleted_count == 0:
            return jsonify({'error': 'Failed to delete student'}), 500
            
        return jsonify({'message': 'Student deleted successfully'}), 200
        
    except Exception as e:
        logger.error(f"Error deleting student {student_id}: {str(e)}")
        return jsonify({'error': 'Internal server error'}), 500

@students_bp.route('/<student_id>/interests', methods=['PUT'])
@jwt_required()
def update_student_interests(student_id):
    """Update student interests"""
    try:
        data = request.get_json()
        if not data:
            return jsonify({'error': 'No data provided'}), 400
            
        from models.student import StudentInterests
        interests = StudentInterests(**data)
        
        success = StudentService.update_student_interests(student_id, interests)
        if success:
            # Get updated student
            student = StudentService.get_student_by_id(student_id)
            return jsonify(student), 200
        else:
            return jsonify({'error': 'Failed to update interests'}), 400
            
    except ValueError as e:
        return jsonify({'error': str(e)}), 400
    except Exception as e:
        logger.error(f"Error updating student interests {student_id}: {str(e)}")
        return jsonify({'error': 'Internal server error'}), 500

@students_bp.route('/<student_id>/skills', methods=['PUT'])
@jwt_required()
def update_student_skills(student_id):
    """Update student skills"""
    try:
        data = request.get_json()
        if not data:
            return jsonify({'error': 'No data provided'}), 400
            
        from models.student import StudentSkills
        skills = StudentSkills(**data)
        
        success = StudentService.update_student_skills(student_id, skills)
        if success:
            # Get updated student
            student = StudentService.get_student_by_id(student_id)
            return jsonify(student), 200
        else:
            return jsonify({'error': 'Failed to update skills'}), 400
            
    except ValueError as e:
        return jsonify({'error': str(e)}), 400
    except Exception as e:
        logger.error(f"Error updating student skills {student_id}: {str(e)}")
        return jsonify({'error': 'Internal server error'}), 500

@students_bp.route('/<student_id>/career-recommendations', methods=['GET'])
def get_student_career_recommendations(student_id):
    """Get career recommendations for a specific student"""
    try:
        if not ObjectId.is_valid(student_id):
            return jsonify({'error': 'Invalid student ID'}), 400
            
        db = get_db()
        students_collection = db.students
        careers_collection = db.careers
        
        # Get student profile
        student = students_collection.find_one({'_id': ObjectId(student_id)})
        if not student:
            return jsonify({'error': 'Student not found'}), 404
            
        # Get student interests and skills
        student_interests = student.get('interests', {})
        student_skills = student.get('skills', {})
        
        # Extract flat lists for matching
        design_fields = student_interests.get('design_fields', [])
        technical_skills = student_skills.get('technical_skills', [])
        
        # Find matching careers based on interests and skills
        matching_careers = []
        
        # Query careers that match student interests
        if design_fields:
            interest_matches = careers_collection.find({
                'required_interests': {'$in': design_fields}
            }).limit(10)
            matching_careers.extend(list(interest_matches))
            
        # Query careers that match student skills
        if technical_skills:
            skill_matches = careers_collection.find({
                'required_skills': {'$in': technical_skills}
            }).limit(10)
            matching_careers.extend(list(skill_matches))
            
        # Remove duplicates and convert ObjectIds
        seen_ids = set()
        unique_careers = []
        for career in matching_careers:
            career_id = str(career['_id'])
            if career_id not in seen_ids:
                seen_ids.add(career_id)
                career['_id'] = career_id
                career['match_score'] = calculate_match_score(student, career)
                unique_careers.append(career)
                
        # Sort by match score
        unique_careers.sort(key=lambda x: x['match_score'], reverse=True)
        
        return jsonify({
            'student_id': student_id,
            'recommendations': unique_careers[:10]
        }), 200
        
    except Exception as e:
        logger.error(f"Error getting career recommendations for student {student_id}: {str(e)}")
        return jsonify({'error': 'Internal server error'}), 500

@students_bp.route('/<student_id>/profile-completion', methods=['GET'])
def get_student_profile_completion(student_id):
    """Get student profile completion percentage and missing fields"""
    try:
        if not ObjectId.is_valid(student_id):
            return jsonify({'error': 'Invalid student ID'}), 400
            
        service = StudentService()
        completion_data = service.get_profile_completion_status(student_id)
        
        return jsonify(completion_data), 200
        
    except ValueError as e:
        return jsonify({'error': str(e)}), 400
    except Exception as e:
        logger.error(f"Error getting profile completion for student {student_id}: {str(e)}")
        return jsonify({'error': 'Internal server error'}), 500

@students_bp.route('/<student_id>/progress-summary', methods=['GET'])
def get_student_progress_summary(student_id):
    """Get student progress summary including completed projects and skill development"""
    try:
        if not ObjectId.is_valid(student_id):
            return jsonify({'error': 'Invalid student ID'}), 400
            
        service = StudentService()
        progress_summary = service.get_student_progress_summary(student_id)
        
        return jsonify(progress_summary), 200
        
    except ValueError as e:
        return jsonify({'error': str(e)}), 400
    except Exception as e:
        logger.error(f"Error getting progress summary for student {student_id}: {str(e)}")
        return jsonify({'error': 'Internal server error'}), 500

def calculate_match_score(student, career):
    """Calculate a simple match score between student and career"""
    score = 0
    
    # Interest matching
    student_interests = set(student.get('interests', {}).get('design_fields', []))
    career_interests = set(career.get('required_interests', []))
    interest_matches = len(student_interests.intersection(career_interests))
    score += interest_matches * 10
    
    # Skill matching
    student_skills = set(student.get('skills', {}).get('technical_skills', []))
    career_skills = set(career.get('required_skills', []))
    skill_matches = len(student_skills.intersection(career_skills))
    score += skill_matches * 15
    
    # Experience level bonus
    student_experience = student.get('experience_level', 'beginner')
    career_level = career.get('entry_level', 'beginner')
    if student_experience == career_level:
        score += 20
    elif student_experience in ['intermediate', 'advanced'] and career_level == 'beginner':
        score += 10
        
    return min(score, 100)  # Cap at 100
