"""
Career Routes - API endpoints for career management
"""

from flask import Blueprint, request, jsonify
from flask_jwt_extended import jwt_required, get_jwt_identity
from bson import ObjectId
from datetime import datetime
import logging

from database.connection import get_db
from models.career import CareerProfile, CareerUpdate
from services.career_service import CareerService

# Configure logging
logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)

careers_bp = Blueprint('careers', __name__)

@careers_bp.route('/', methods=['GET'])
def get_careers():
    """Get all careers with optional filtering"""
    try:
        # Use service layer for filtering and pagination
        filters = {}
        page = int(request.args.get('page', 1))
        limit = int(request.args.get('limit', 20))
        
        # Parse query parameters
        category = request.args.get('category')
        industry_sectors = request.args.get('industry_sectors', '').split(',') if request.args.get('industry_sectors') else []
        min_salary = request.args.get('min_salary')
        max_salary = request.args.get('max_salary')
        experience_level = request.args.get('experience_level')
        
        if category:
            filters['category'] = category
        if industry_sectors:
            filters['industry_sectors'] = industry_sectors
        if min_salary:
            filters['min_salary'] = int(min_salary)
        if max_salary:
            filters['max_salary'] = int(max_salary)
        if experience_level:
            filters['experience_level'] = experience_level
        
        result = CareerService.get_careers_by_filters(filters, page, limit)
        return jsonify(result), 200
        
    except Exception as e:
        logger.error(f"Error fetching careers: {str(e)}")
        return jsonify({'error': 'Internal server error'}), 500

@careers_bp.route('/<career_id>', methods=['GET'])
def get_career(career_id):
    """Get a specific career by ID"""
    try:
        career = CareerService.get_career_by_id(career_id)
        if not career:
            return jsonify({'error': 'Career not found'}), 404
            
        return jsonify(career), 200
        
    except ValueError as e:
        return jsonify({'error': str(e)}), 400
    except Exception as e:
        logger.error(f"Error fetching career {career_id}: {str(e)}")
        return jsonify({'error': 'Internal server error'}), 500

@careers_bp.route('/', methods=['POST'])
@jwt_required()
def create_career():
    """Create a new career path"""
    try:
        data = request.get_json()
        if not data:
            return jsonify({'error': 'No data provided'}), 400
            
        # Validate data with Pydantic
        career_data = CareerProfile(**data)
        
        db = get_db()
        collection = db.careers
        
        # Add timestamps
        career_doc = career_data.dict(exclude={'id'})
        career_doc['created_at'] = datetime.utcnow()
        career_doc['updated_at'] = datetime.utcnow()
        
        # Insert career
        result = collection.insert_one(career_doc)
        career_doc['_id'] = str(result.inserted_id)
        
        return jsonify(career_doc), 201
        
    except Exception as e:
        logger.error(f"Error creating career: {str(e)}")
        return jsonify({'error': 'Internal server error'}), 500

@careers_bp.route('/<career_id>', methods=['PUT'])
@jwt_required()
def update_career(career_id):
    """Update a career path"""
    try:
        if not ObjectId.is_valid(career_id):
            return jsonify({'error': 'Invalid career ID'}), 400
            
        data = request.get_json()
        if not data:
            return jsonify({'error': 'No data provided'}), 400
            
        # Validate data with Pydantic
        career_data = CareerUpdate(**data)
        
        db = get_db()
        collection = db.careers
        
        # Check if career exists
        existing_career = collection.find_one({'_id': ObjectId(career_id)})
        if not existing_career:
            return jsonify({'error': 'Career not found'}), 404
            
        # Update career
        update_data = career_data.dict(exclude_unset=True)
        update_data['updated_at'] = datetime.utcnow()
        
        result = collection.update_one(
            {'_id': ObjectId(career_id)},
            {'$set': update_data}
        )
        
        if result.modified_count == 0:
            return jsonify({'error': 'No changes made'}), 400
            
        # Return updated career
        updated_career = collection.find_one({'_id': ObjectId(career_id)})
        updated_career['_id'] = str(updated_career['_id'])
        updated_career['created_at'] = updated_career['created_at'].isoformat() if updated_career.get('created_at') else None
        updated_career['updated_at'] = updated_career['updated_at'].isoformat() if updated_career.get('updated_at') else None
        
        return jsonify(updated_career), 200
        
    except Exception as e:
        logger.error(f"Error updating career {career_id}: {str(e)}")
        return jsonify({'error': 'Internal server error'}), 500

@careers_bp.route('/<career_id>', methods=['DELETE'])
@jwt_required()
def delete_career(career_id):
    """Delete a career path"""
    try:
        if not ObjectId.is_valid(career_id):
            return jsonify({'error': 'Invalid career ID'}), 400
            
        db = get_db()
        collection = db.careers
        
        # Check if career exists
        existing_career = collection.find_one({'_id': ObjectId(career_id)})
        if not existing_career:
            return jsonify({'error': 'Career not found'}), 404
            
        # Delete career
        result = collection.delete_one({'_id': ObjectId(career_id)})
        
        if result.deleted_count == 0:
            return jsonify({'error': 'Failed to delete career'}), 500
            
        return jsonify({'message': 'Career deleted successfully'}), 200
        
    except Exception as e:
        logger.error(f"Error deleting career {career_id}: {str(e)}")
        return jsonify({'error': 'Internal server error'}), 500

@careers_bp.route('/<career_id>/related-careers', methods=['GET'])
def get_related_careers(career_id):
    """Get related careers based on skills and interests"""
    try:
        if not ObjectId.is_valid(career_id):
            return jsonify({'error': 'Invalid career ID'}), 400
            
        db = get_db()
        collection = db.careers
        
        # Get the target career
        target_career = collection.find_one({'_id': ObjectId(career_id)})
        if not target_career:
            return jsonify({'error': 'Career not found'}), 404
            
        # Get skills and interests from target career
        target_skills = set()
        target_interests = set()
        
        # Extract skills from core_skills
        for skill_req in target_career.get('core_skills', []):
            target_skills.add(skill_req.get('skill_name', ''))
        
        target_industry = target_career.get('industry_sectors', [])
        
        # Find related careers
        related_careers = []
        
        # Query careers with similar skills
        if target_skills:
            skill_matches = collection.find({
                '_id': {'$ne': ObjectId(career_id)},
                'core_skills.skill_name': {'$in': list(target_skills)}
            }).limit(10)
            related_careers.extend(list(skill_matches))
            
        # Query careers in same industry
        if target_industry:
            industry_matches = collection.find({
                '_id': {'$ne': ObjectId(career_id)},
                'industry_sectors': {'$in': target_industry}
            }).limit(10)
            related_careers.extend(list(industry_matches))
            
        # Remove duplicates and calculate similarity scores
        seen_ids = set()
        unique_careers = []
        for career in related_careers:
            career_id = str(career['_id'])
            if career_id not in seen_ids:
                seen_ids.add(career_id)
                career['_id'] = career_id
                career['similarity_score'] = calculate_career_similarity(target_career, career)
                unique_careers.append(career)
                
        # Sort by similarity score
        unique_careers.sort(key=lambda x: x['similarity_score'], reverse=True)
        
        return jsonify({
            'target_career_id': career_id,
            'target_career_name': target_career.get('title', ''),
            'related_careers': unique_careers[:10]
        }), 200
        
    except Exception as e:
        logger.error(f"Error getting related careers for {career_id}: {str(e)}")
        return jsonify({'error': 'Internal server error'}), 500

@careers_bp.route('/<career_id>/skill-path', methods=['GET'])
def get_career_skill_path(career_id):
    """Get the skill development path for a career"""
    try:
        if not ObjectId.is_valid(career_id):
            return jsonify({'error': 'Invalid career ID'}), 400
            
        db = get_db()
        collection = db.careers
        
        career = collection.find_one({'_id': ObjectId(career_id)})
        if not career:
            return jsonify({'error': 'Career not found'}), 404
            
        # Get skill progression levels
        skill_path = career.get('career_paths', {})
        
        return jsonify({
            'career_id': career_id,
            'career_title': career.get('title', ''),
            'skill_path': skill_path
        }), 200
        
    except Exception as e:
        logger.error(f"Error getting skill path for career {career_id}: {str(e)}")
        return jsonify({'error': 'Internal server error'}), 500

@careers_bp.route('/popular', methods=['GET'])
def get_popular_careers():
    """Get most popular careers"""
    try:
        limit = int(request.args.get('limit', 10))
        careers = CareerService.get_popular_careers(limit)
        return jsonify({'careers': careers}), 200
        
    except Exception as e:
        logger.error(f"Error fetching popular careers: {str(e)}")
        return jsonify({'error': 'Internal server error'}), 500

@careers_bp.route('/industry/<industry>', methods=['GET'])
def get_careers_by_industry(industry):
    """Get careers by specific industry sector"""
    try:
        limit = int(request.args.get('limit', 20))
        careers = CareerService.get_careers_by_industry(industry, limit)
        return jsonify({'careers': careers}), 200
        
    except Exception as e:
        logger.error(f"Error fetching careers by industry {industry}: {str(e)}")
        return jsonify({'error': 'Internal server error'}), 500

@careers_bp.route('/<career_id>/match/<student_id>', methods=['GET'])
def get_career_match(career_id, student_id):
    """Get career match score for a specific student"""
    try:
        # Get student profile
        from services.student_service import StudentService
        student = StudentService.get_student_by_id(student_id)
        if not student:
            return jsonify({'error': 'Student not found'}), 404
        
        # Get career profile
        career = CareerService.get_career_by_id(career_id)
        if not career:
            return jsonify({'error': 'Career not found'}), 404
        
        # Calculate match
        match = CareerService.calculate_career_match(student, career)
        return jsonify(match), 200
        
    except Exception as e:
        logger.error(f"Error calculating career match: {str(e)}")
        return jsonify({'error': 'Internal server error'}), 500

@careers_bp.route('/<career_id>/path/<level>', methods=['GET'])
def get_career_path_details(career_id, level):
    """Get detailed information about a specific career path level"""
    try:
        path_details = CareerService.get_career_path_details(career_id, level)
        if not path_details:
            return jsonify({'error': 'Career path level not found'}), 404
            
        return jsonify(path_details), 200
        
    except Exception as e:
        logger.error(f"Error getting career path details: {str(e)}")
        return jsonify({'error': 'Internal server error'}), 500

@careers_bp.route('/trends', methods=['GET'])
def get_industry_trends():
    """Get industry trends and insights"""
    try:
        industry = request.args.get('industry')
        trends = CareerService.get_industry_trends(industry)
        return jsonify({'trends': trends}), 200
        
    except Exception as e:
        logger.error(f"Error fetching industry trends: {str(e)}")
        return jsonify({'error': 'Internal server error'}), 500

@careers_bp.route('/industries', methods=['GET'])
def get_career_industries():
    """Get all available industry focuses for careers"""
    try:
        db = get_db()
        collection = db.careers
        
        # Get unique industry focuses
        industries = collection.distinct('industry_sectors')
        
        return jsonify({
            'industries': sorted(industries)
        }), 200
        
    except Exception as e:
        logger.error(f"Error fetching career industries: {str(e)}")
        return jsonify({'error': 'Internal server error'}), 500

@careers_bp.route('/skills', methods=['GET'])
def get_career_skills():
    """Get all available skills across careers"""
    try:
        db = get_db()
        collection = db.careers
        
        # Get unique skills from core_skills
        skills = set()
        for career in collection.find({}, {'core_skills.skill_name': 1}):
            for skill_req in career.get('core_skills', []):
                skills.add(skill_req.get('skill_name', ''))
        
        return jsonify({
            'skills': sorted(list(skills))
        }), 200
        
    except Exception as e:
        logger.error(f"Error fetching career skills: {str(e)}")
        return jsonify({'error': 'Internal server error'}), 500

@careers_bp.route('/categories', methods=['GET'])
def get_career_categories():
    """Get all available career categories and industry sectors"""
    try:
        categories = {
            'career_categories': [
                'product_design', 'user_experience', 'industrial_design', 
                'sustainable_design', 'packaging_design', 'automotive_design',
                'furniture_design', 'medical_device_design', 'toy_design'
            ],
            'industry_sectors': [
                'consumer_electronics', 'automotive', 'furniture', 'medical_devices',
                'aerospace', 'consumer_goods', 'toys_games', 'sports_equipment',
                'packaging', 'sustainable_design', 'fashion_accessories', 'architectural_products'
            ],
            'skill_categories': [
                'technical', 'design', 'business', 'leadership', 
                'communication', 'research', 'prototyping', 'manufacturing'
            ]
        }
        
        return jsonify(categories), 200
        
    except Exception as e:
        logger.error(f"Error getting career categories: {str(e)}")
        return jsonify({'error': 'Internal server error'}), 500

@careers_bp.route('/trending', methods=['GET'])
def get_trending_careers():
    """Get trending careers based on market demand and popularity"""
    try:
        service = CareerService()
        trending_careers = service.get_trending_careers()
        
        return jsonify(trending_careers), 200
        
    except Exception as e:
        logger.error(f"Error getting trending careers: {str(e)}")
        return jsonify({'error': 'Internal server error'}), 500

def calculate_career_similarity(career1, career2):
    """Calculate similarity score between two careers"""
    score = 0
    
    # Skills similarity
    skills1 = set()
    skills2 = set()
    
    for skill_req in career1.get('core_skills', []):
        skills1.add(skill_req.get('skill_name', ''))
    
    for skill_req in career2.get('core_skills', []):
        skills2.add(skill_req.get('skill_name', ''))
    
    skill_overlap = len(skills1.intersection(skills2))
    score += skill_overlap * 15
    
    # Industry similarity
    industry1 = set(career1.get('industry_sectors', []))
    industry2 = set(career2.get('industry_sectors', []))
    industry_overlap = len(industry1.intersection(industry2))
    score += industry_overlap * 10
    
    # Category similarity
    if career1.get('category') == career2.get('category'):
        score += 25
        
    return min(score, 100)  # Cap at 100
