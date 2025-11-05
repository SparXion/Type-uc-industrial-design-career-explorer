"""
Company Routes - API endpoints for company management
"""

from flask import Blueprint, request, jsonify
from flask_jwt_extended import jwt_required, get_jwt_identity
from bson import ObjectId
from datetime import datetime
import logging

from database.connection import get_db
from services.company_service import CompanyService
from models.company import CompanyProfile, CompanyUpdate

# Configure logging
logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)

companies_bp = Blueprint('companies', __name__)

@companies_bp.route('/', methods=['GET'])
def get_companies():
    """Get all companies with optional filtering"""
    try:
        db = get_db()
        collection = db.companies
        
        # Parse query parameters
        page = int(request.args.get('page', 1))
        limit = int(request.args.get('limit', 20))
        industry = request.args.get('industry', '')
        location = request.args.get('location', '')
        size = request.args.get('size', '')
        
        # Build filter
        filter_query = {}
        if industry:
            filter_query['industry_sectors'] = industry
        if location:
            filter_query['locations.city'] = {'$regex': location, '$options': 'i'}
        if size:
            filter_query['size'] = size
        
        # Execute query with pagination
        skip = (page - 1) * limit
        cursor = collection.find(filter_query).skip(skip).limit(limit)
        companies = list(cursor)
        
        # Convert ObjectId to string for JSON serialization
        for company in companies:
            company['_id'] = str(company['_id'])
            company['created_at'] = company['created_at'].isoformat() if company.get('created_at') else None
            company['updated_at'] = company['updated_at'].isoformat() if company.get('updated_at') else None
        
        # Get total count for pagination
        total = collection.count_documents(filter_query)
        
        return jsonify({
            'companies': companies,
            'pagination': {
                'page': page,
                'limit': limit,
                'total': total,
                'pages': (total + limit - 1) // limit
            }
        }), 200
        
    except Exception as e:
        logger.error(f"Error fetching companies: {str(e)}")
        return jsonify({'error': 'Internal server error'}), 500

@companies_bp.route('/<company_id>', methods=['GET'])
def get_company(company_id):
    """Get a specific company by ID"""
    try:
        if not ObjectId.is_valid(company_id):
            return jsonify({'error': 'Invalid company ID'}), 400
            
        db = get_db()
        collection = db.companies
        
        company = collection.find_one({'_id': ObjectId(company_id)})
        if not company:
            return jsonify({'error': 'Company not found'}), 404
            
        # Convert ObjectId to string
        company['_id'] = str(company['_id'])
        company['created_at'] = company['created_at'].isoformat() if company.get('created_at') else None
        company['updated_at'] = company['updated_at'].isoformat() if company.get('updated_at') else None
        
        return jsonify(company), 200
        
    except Exception as e:
        logger.error(f"Error fetching company {company_id}: {str(e)}")
        return jsonify({'error': 'Internal server error'}), 500

@companies_bp.route('/', methods=['POST'])
@jwt_required()
def create_company():
    """Create a new company profile"""
    try:
        data = request.get_json()
        if not data:
            return jsonify({'error': 'No data provided'}), 400
            
        # Validate data with Pydantic
        company_data = CompanyProfile(**data)
        
        db = get_db()
        collection = db.companies
        
        # Add timestamps
        company_doc = company_data.dict(exclude={'id'})
        company_doc['created_at'] = datetime.utcnow()
        company_doc['updated_at'] = datetime.utcnow()
        
        # Insert company
        result = collection.insert_one(company_doc)
        company_doc['_id'] = str(result.inserted_id)
        
        return jsonify(company_doc), 201
        
    except Exception as e:
        logger.error(f"Error creating company: {str(e)}")
        return jsonify({'error': 'Internal server error'}), 500

@companies_bp.route('/<company_id>', methods=['PUT'])
@jwt_required()
def update_company(company_id):
    """Update a company profile"""
    try:
        if not ObjectId.is_valid(company_id):
            return jsonify({'error': 'Invalid company ID'}), 400
            
        data = request.get_json()
        if not data:
            return jsonify({'error': 'No data provided'}), 400
            
        # Validate data with Pydantic
        company_data = CompanyUpdate(**data)
        
        db = get_db()
        collection = db.companies
        
        # Check if company exists
        existing_company = collection.find_one({'_id': ObjectId(company_id)})
        if not existing_company:
            return jsonify({'error': 'Company not found'}), 404
            
        # Update company
        update_data = company_data.dict(exclude_unset=True)
        update_data['updated_at'] = datetime.utcnow()
        
        result = collection.update_one(
            {'_id': ObjectId(company_id)},
            {'$set': update_data}
        )
        
        if result.modified_count == 0:
            return jsonify({'error': 'No changes made'}), 400
            
        # Return updated company
        updated_company = collection.find_one({'_id': ObjectId(company_id)})
        updated_company['_id'] = str(updated_company['_id'])
        updated_company['created_at'] = updated_company['created_at'].isoformat() if updated_company.get('created_at') else None
        updated_company['updated_at'] = updated_company['updated_at'].isoformat() if updated_company.get('updated_at') else None
        
        return jsonify(updated_company), 200
        
    except Exception as e:
        logger.error(f"Error updating company {company_id}: {str(e)}")
        return jsonify({'error': 'Internal server error'}), 500

@companies_bp.route('/<company_id>', methods=['DELETE'])
@jwt_required()
def delete_company(company_id):
    """Delete a company profile"""
    try:
        if not ObjectId.is_valid(company_id):
            return jsonify({'error': 'Invalid company ID'}), 400
            
        db = get_db()
        collection = db.companies
        
        # Check if company exists
        existing_company = collection.find_one({'_id': ObjectId(company_id)})
        if not existing_company:
            return jsonify({'error': 'Company not found'}), 404
            
        # Delete company
        result = collection.delete_one({'_id': ObjectId(company_id)})
        
        if result.deleted_count == 0:
            return jsonify({'error': 'Failed to delete company'}), 500
            
        return jsonify({'message': 'Company deleted successfully'}), 200
        
    except Exception as e:
        logger.error(f"Error deleting company {company_id}: {str(e)}")
        return jsonify({'error': 'Internal server error'}), 500

@companies_bp.route('/<company_id>/job-opportunities', methods=['GET'])
def get_company_jobs(company_id):
    """Get job opportunities for a specific company"""
    try:
        if not ObjectId.is_valid(company_id):
            return jsonify({'error': 'Invalid company ID'}), 400
            
        db = get_db()
        collection = db.companies
        
        company = collection.find_one({'_id': ObjectId(company_id)})
        if not company:
            return jsonify({'error': 'Company not found'}), 404
            
        # Return job opportunities from company profile
        job_opportunities = company.get('job_opportunities', [])
        
        return jsonify({
            'company_id': company_id,
            'company_name': company.get('name', ''),
            'job_opportunities': job_opportunities
        }), 200
        
    except Exception as e:
        logger.error(f"Error fetching job opportunities for company {company_id}: {str(e)}")
        return jsonify({'error': 'Internal server error'}), 500

@companies_bp.route('/<company_id>/student-matches', methods=['GET'])
def get_company_student_matches(company_id):
    """Get student matches for a specific company based on their needs"""
    try:
        if not ObjectId.is_valid(company_id):
            return jsonify({'error': 'Invalid company ID'}), 400
            
        db = get_db()
        companies_collection = db.companies
        students_collection = db.students
        
        # Get company profile
        company = companies_collection.find_one({'_id': ObjectId(company_id)})
        if not company:
            return jsonify({'error': 'Company not found'}), 404
            
        # Get company needs from job opportunities
        skills_needed = set()
        for job in company.get('job_opportunities', []):
            skills_needed.update(job.get('requirements', []))
            skills_needed.update(job.get('preferred_skills', []))
        
        industry_focus = company.get('industry_sectors', [])
        
        # Find matching students
        matching_students = []
        
        # Query students with matching skills
        if skills_needed:
            # Check technical skills in student profile
            skill_matches = students_collection.find({
                'skills.technical_skills': {'$in': list(skills_needed)}
            }).limit(20)
            matching_students.extend(list(skill_matches))
            
        # Query students with matching interests (industry focus)
        if industry_focus:
            interest_matches = students_collection.find({
                'interests.industry_sectors': {'$in': industry_focus}
            }).limit(20)
            matching_students.extend(list(interest_matches))
            
        # Remove duplicates and calculate match scores
        seen_ids = set()
        unique_students = []
        for student in matching_students:
            student_id = str(student['_id'])
            if student_id not in seen_ids:
                seen_ids.add(student_id)
                student['_id'] = student_id
                student['match_score'] = calculate_company_student_match(company, student)
                unique_students.append(student)
                
        # Sort by match score
        unique_students.sort(key=lambda x: x['match_score'], reverse=True)
        
        return jsonify({
            'company_id': company_id,
            'company_name': company.get('name', ''),
            'matches': unique_students[:15]
        }), 200
        
    except Exception as e:
        logger.error(f"Error getting student matches for company {company_id}: {str(e)}")
        return jsonify({'error': 'Internal server error'}), 500

@companies_bp.route('/industries', methods=['GET'])
def get_industries():
    """Get all available industry sectors"""
    try:
        db = get_db()
        collection = db.companies
        
        # Get unique industry sectors
        industries = collection.distinct('industry_sectors')
        
        return jsonify({
            'industries': sorted(industries)
        }), 200
        
    except Exception as e:
        logger.error(f"Error fetching industries: {str(e)}")
        return jsonify({'error': 'Internal server error'}), 500

@companies_bp.route('/sizes', methods=['GET'])
def get_company_sizes():
    """Get all available company sizes"""
    try:
        from models.company import CompanySize
        
        sizes = [size.value for size in CompanySize]
        return jsonify({
            'sizes': sizes
        }), 200
        
    except Exception as e:
        logger.error(f"Error fetching company sizes: {str(e)}")
        return jsonify({'error': 'Internal server error'}), 500

@companies_bp.route('/locations', methods=['GET'])
def get_company_locations():
    """Get all available company locations"""
    try:
        db = get_db()
        collection = db.companies
        
        # Get unique cities
        cities = collection.distinct('locations.city')
        
        return jsonify({
            'cities': sorted(cities)
        }), 200
        
    except Exception as e:
        logger.error(f"Error fetching company locations: {str(e)}")
        return jsonify({'error': 'Internal server error'}), 500

@companies_bp.route('/categories', methods=['GET'])
def get_company_categories():
    """Get all available company categories and industry sectors"""
    try:
        categories = {
            'company_sizes': [
                'startup', 'small', 'medium', 'large', 'enterprise'
            ],
            'industry_sectors': [
                'consumer_electronics', 'automotive', 'furniture', 'medical_devices',
                'aerospace', 'consumer_goods', 'toys_games', 'sports_equipment',
                'packaging', 'sustainable_design', 'fashion_accessories', 'architectural_products'
            ],
            'design_philosophies': [
                'user_centered', 'sustainable', 'innovative', 'minimalist', 
                'functional', 'aesthetic', 'ergonomic', 'accessible'
            ]
        }
        
        return jsonify(categories), 200
        
    except Exception as e:
        logger.error(f"Error getting company categories: {str(e)}")
        return jsonify({'error': 'Internal server error'}), 500

@companies_bp.route('/featured', methods=['GET'])
def get_featured_companies():
    """Get featured companies for the frontend"""
    try:
        service = CompanyService()
        featured_companies = service.get_featured_companies()
        
        return jsonify(featured_companies), 200
        
    except Exception as e:
        logger.error(f"Error getting featured companies: {str(e)}")
        return jsonify({'error': 'Internal server error'}), 500

def calculate_company_student_match(company, student):
    """Calculate match score between company needs and student profile"""
    score = 0
    
    # Skills matching
    company_skills = set()
    for job in company.get('job_opportunities', []):
        company_skills.update(job.get('requirements', []))
        company_skills.update(job.get('preferred_skills', []))
    
    student_technical_skills = set(student.get('skills', {}).get('technical_skills', []))
    skill_matches = len(company_skills.intersection(student_technical_skills))
    score += skill_matches * 20
    
    # Industry interest matching
    company_industries = set(company.get('industry_sectors', []))
    student_industries = set(student.get('interests', {}).get('industry_sectors', []))
    industry_matches = len(company_industries.intersection(student_industries))
    score += industry_matches * 15
        
    # Experience level matching
    company_levels = set()
    for job in company.get('job_opportunities', []):
        company_levels.add(job.get('experience_level', 'entry'))
    
    student_year = student.get('graduation_year', 2025)
    current_year = datetime.now().year
    years_until_graduation = student_year - current_year
    
    if years_until_graduation <= 0:  # Graduated
        student_level = 'senior'
    elif years_until_graduation <= 1:  # Senior
        student_level = 'mid'
    elif years_until_graduation <= 2:  # Junior
        student_level = 'entry'
    else:  # Freshman/Sophomore
        student_level = 'entry'
    
    if student_level in company_levels:
        score += 25
        
    # Location preference (if available)
    company_locations = [loc.get('city', '').lower() for loc in company.get('locations', [])]
    student_location = student.get('location', '').lower()
    
    if company_locations and student_location and any(loc in student_location for loc in company_locations):
        score += 10
        
    return min(score, 100)  # Cap at 100
