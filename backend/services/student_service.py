"""
Student Service - Business logic for student management
"""

from bson import ObjectId
from datetime import datetime
import logging
from typing import Dict, List, Any, Optional

from database.connection import get_db
from models.student import StudentProfile, StudentInterests, StudentSkills, CareerPreferences

logger = logging.getLogger(__name__)

class StudentService:
    """Service class for student-related business logic"""
    
    @staticmethod
    def create_student_profile(student_data: Dict[str, Any]) -> Optional[str]:
        """Create a new student profile"""
        try:
            db = get_db()
            if db is None:
                raise ConnectionError("Database connection failed")
            
            # Validate required fields
            required_fields = ['uc_id', 'email', 'first_name', 'last_name', 'major', 'graduation_year']
            for field in required_fields:
                if not student_data.get(field):
                    raise ValueError(f"Missing required field: {field}")
            
            # Create student document
            student_doc = {
                'uc_id': student_data['uc_id'],
                'email': student_data['email'],
                'first_name': student_data['first_name'],
                'last_name': student_data['last_name'],
                'major': student_data['major'],
                'graduation_year': student_data['graduation_year'],
                'interests': student_data.get('interests', {
                    'design_fields': [],
                    'creative_mediums': [],
                    'industry_sectors': [],
                    'project_types': []
                }),
                'skills': student_data.get('skills', {
                    'technical_skills': [],
                    'soft_skills': [],
                    'design_skills': [],
                    'skill_levels': {}
                }),
                'career_preferences': student_data.get('career_preferences', {
                    'preferred_roles': [],
                    'work_environment': [],
                    'location_preferences': [],
                    'salary_expectations': {'min': 0, 'max': 0}
                }),
                'career_matches': [],
                'skill_gaps': [],
                'recommendations': [],
                'practice_projects': [],
                'exploration_history': [],
                'created_at': datetime.utcnow(),
                'updated_at': datetime.utcnow(),
                'profile_completion': 0
            }
            
            # Insert into database
            result = db.students.insert_one(student_doc)
            return str(result.inserted_id)
            
        except Exception as e:
            logger.error(f"Error creating student profile: {str(e)}")
            raise
    
    @staticmethod
    def get_student_by_id(student_id: str) -> Optional[Dict[str, Any]]:
        """Get student profile by ID"""
        try:
            if not ObjectId.is_valid(student_id):
                raise ValueError("Invalid student ID format")
            
            db = get_db()
            if db is None:
                raise ConnectionError("Database connection failed")
            
            student = db.students.find_one({'_id': ObjectId(student_id)})
            if student:
                student['_id'] = str(student['_id'])
                student['created_at'] = student['created_at'].isoformat() if student.get('created_at') else None
                student['updated_at'] = student['updated_at'].isoformat() if student.get('updated_at') else None
            
            return student
            
        except Exception as e:
            logger.error(f"Error fetching student {student_id}: {str(e)}")
            raise
    
    @staticmethod
    def update_student_interests(student_id: str, interests: StudentInterests) -> bool:
        """Update student interests and recalculate profile completion"""
        try:
            if not ObjectId.is_valid(student_id):
                raise ValueError("Invalid student ID format")
            
            db = get_db()
            if not db:
                raise ConnectionError("Database connection failed")
            
            # Update interests
            update_data = {
                'interests': interests.dict() if hasattr(interests, 'dict') else interests,
                'updated_at': datetime.utcnow()
            }
            
            result = db.students.update_one(
                {'_id': ObjectId(student_id)},
                {'$set': update_data}
            )
            
            if result.modified_count > 0:
                # Recalculate profile completion
                StudentService._update_profile_completion(student_id)
                return True
            
            return False
            
        except Exception as e:
            logger.error(f"Error updating student interests {student_id}: {str(e)}")
            raise
    
    @staticmethod
    def update_student_skills(student_id: str, skills: StudentSkills) -> bool:
        """Update student skills and recalculate profile completion"""
        try:
            if not ObjectId.is_valid(student_id):
                raise ValueError("Invalid student ID format")
            
            db = get_db()
            if not db:
                raise ConnectionError("Database connection failed")
            
            # Update skills
            update_data = {
                'skills': skills.dict() if hasattr(skills, 'dict') else skills,
                'updated_at': datetime.utcnow()
            }
            
            result = db.students.update_one(
                {'_id': ObjectId(student_id)},
                {'$set': update_data}
            )
            
            if result.modified_count > 0:
                # Recalculate profile completion
                StudentService._update_profile_completion(student_id)
                return True
            
            return False
            
        except Exception as e:
            logger.error(f"Error updating student skills {student_id}: {str(e)}")
            raise
    
    @staticmethod
    def add_creative_work(student_id: str, creative_work: Dict[str, Any]) -> bool:
        """Add a creative work to student portfolio"""
        try:
            if not ObjectId.is_valid(student_id):
                raise ValueError("Invalid student ID format")
            
            db = get_db()
            if not db:
                raise ConnectionError("Database connection failed")
            
            # Add creative work to portfolio
            creative_work['completion_date'] = datetime.utcnow()
            
            result = db.students.update_one(
                {'_id': ObjectId(student_id)},
                {
                    '$push': {'creative_works': creative_work},
                    '$set': {'updated_at': datetime.utcnow()}
                }
            )
            
            if result.modified_count > 0:
                # Recalculate profile completion
                StudentService._update_profile_completion(student_id)
                return True
            
            return False
            
        except Exception as e:
            logger.error(f"Error adding creative work for student {student_id}: {str(e)}")
            raise
    
    @staticmethod
    def _update_profile_completion(student_id: str) -> None:
        """Update profile completion percentage based on filled fields"""
        try:
            db = get_db()
            if not db:
                return
            
            student = db.students.find_one({'_id': ObjectId(student_id)})
            if not student:
                return
            
            # Calculate completion based on filled fields
            total_fields = 0
            filled_fields = 0
            
            # Check interests
            interests = student.get('interests', {})
            for key in ['design_fields', 'creative_mediums', 'industry_sectors', 'project_types']:
                total_fields += 1
                if interests.get(key) and len(interests[key]) > 0:
                    filled_fields += 1
            
            # Check skills
            skills = student.get('skills', {})
            for key in ['technical_skills', 'soft_skills', 'design_skills']:
                total_fields += 1
                if skills.get(key) and len(skills[key]) > 0:
                    filled_fields += 1
            
            # Check career preferences
            career_prefs = student.get('career_preferences', {})
            for key in ['preferred_roles', 'work_environment', 'location_preferences']:
                total_fields += 1
                if career_prefs.get(key) and len(career_prefs[key]) > 0:
                    filled_fields += 1
            
            # Check creative works
            total_fields += 1
            if student.get('creative_works') and len(student['creative_works']) > 0:
                filled_fields += 1
            
            # Calculate percentage
            completion_percentage = int((filled_fields / total_fields) * 100) if total_fields > 0 else 0
            
            # Update completion percentage
            db.students.update_one(
                {'_id': ObjectId(student_id)},
                {'$set': {'profile_completion': completion_percentage}}
            )
            
        except Exception as e:
            logger.error(f"Error updating profile completion for student {student_id}: {str(e)}")
    
    @staticmethod
    def get_students_by_filters(filters: Dict[str, Any], page: int = 1, limit: int = 20) -> Dict[str, Any]:
        """Get students with filtering and pagination"""
        try:
            db = get_db()
            if not db:
                raise ConnectionError("Database connection failed")
            
            # Build filter query
            filter_query = {}
            
            if filters.get('interests'):
                filter_query['interests.design_fields'] = {'$in': filters['interests']}
            
            if filters.get('skills'):
                filter_query['skills.technical_skills'] = {'$in': filters['skills']}
            
            if filters.get('major'):
                filter_query['major'] = filters['major']
            
            if filters.get('graduation_year'):
                filter_query['graduation_year'] = filters['graduation_year']
            
            # Execute query with pagination
            skip = (page - 1) * limit
            cursor = db.students.find(filter_query).skip(skip).limit(limit)
            students = list(cursor)
            
            # Convert ObjectIds to strings
            for student in students:
                student['_id'] = str(student['_id'])
                student['created_at'] = student['created_at'].isoformat() if student.get('created_at') else None
                student['updated_at'] = student['updated_at'].isoformat() if student.get('updated_at') else None
            
            # Get total count
            total = db.students.count_documents(filter_query)
            
            return {
                'students': students,
                'pagination': {
                    'page': page,
                    'limit': limit,
                    'total': total,
                    'pages': (total + limit - 1) // limit
                }
            }
            
        except Exception as e:
            logger.error(f"Error fetching students with filters: {str(e)}")
            raise
