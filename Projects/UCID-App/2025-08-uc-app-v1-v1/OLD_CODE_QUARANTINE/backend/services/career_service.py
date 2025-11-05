"""
Career Service - Business logic for career management
"""

from bson import ObjectId
from datetime import datetime
import logging
from typing import Dict, List, Any, Optional

from database.connection import get_db
from models.career import CareerProfile, CareerPath, SkillRequirement

logger = logging.getLogger(__name__)

class CareerService:
    """Service class for career-related business logic"""
    
    @staticmethod
    def get_career_by_id(career_id: str) -> Optional[Dict[str, Any]]:
        """Get career profile by ID"""
        try:
            if not ObjectId.is_valid(career_id):
                raise ValueError("Invalid career ID format")
            
            db = get_db()
            if not db:
                raise ConnectionError("Database connection failed")
            
            career = db.careers.find_one({'_id': ObjectId(career_id)})
            if career:
                career['_id'] = str(career['_id'])
                career['created_at'] = career['created_at'].isoformat() if career.get('created_at') else None
                career['updated_at'] = career['updated_at'].isoformat() if career.get('updated_at') else None
            
            return career
            
        except Exception as e:
            logger.error(f"Error fetching career {career_id}: {str(e)}")
            raise
    
    @staticmethod
    def get_careers_by_filters(filters: Dict[str, Any], page: int = 1, limit: int = 20) -> Dict[str, Any]:
        """Get careers with filtering and pagination"""
        try:
            db = get_db()
            if not db:
                raise ConnectionError("Database connection failed")
            
            # Build filter query
            filter_query = {}
            
            if filters.get('category'):
                filter_query['category'] = filters['category']
            
            if filters.get('industry_sectors'):
                filter_query['industry_sectors'] = {'$in': filters['industry_sectors']}
            
            if filters.get('min_salary'):
                filter_query['career_paths.salary_range.min'] = {'$gte': filters['min_salary']}
            
            if filters.get('max_salary'):
                filter_query['career_paths.salary_range.max'] = {'$lte': filters['max_salary']}
            
            if filters.get('experience_level'):
                filter_query['career_paths.level'] = filters['experience_level']
            
            # Execute query with pagination
            skip = (page - 1) * limit
            cursor = db.careers.find(filter_query).skip(skip).limit(limit)
            careers = list(cursor)
            
            # Convert ObjectIds to strings
            for career in careers:
                career['_id'] = str(career['_id'])
                career['created_at'] = career['created_at'].isoformat() if career.get('created_at') else None
                career['updated_at'] = career['updated_at'].isoformat() if career.get('updated_at') else None
            
            # Get total count
            total = db.careers.count_documents(filter_query)
            
            return {
                'careers': careers,
                'pagination': {
                    'page': page,
                    'limit': limit,
                    'total': total,
                    'pages': (total + limit - 1) // limit
                }
            }
            
        except Exception as e:
            logger.error(f"Error fetching careers with filters: {str(e)}")
            raise
    
    @staticmethod
    def get_popular_careers(limit: int = 10) -> List[Dict[str, Any]]:
        """Get most popular careers based on popularity score"""
        try:
            db = get_db()
            if not db:
                raise ConnectionError("Database connection failed")
            
            cursor = db.careers.find().sort('popularity_score', -1).limit(limit)
            careers = list(cursor)
            
            # Convert ObjectIds to strings
            for career in careers:
                career['_id'] = str(career['_id'])
                career['created_at'] = career['created_at'].isoformat() if career.get('created_at') else None
                career['updated_at'] = career['updated_at'].isoformat() if career.get('updated_at') else None
            
            return careers
            
        except Exception as e:
            logger.error(f"Error fetching popular careers: {str(e)}")
            raise
    
    @staticmethod
    def get_careers_by_industry(industry: str, limit: int = 20) -> List[Dict[str, Any]]:
        """Get careers by specific industry sector"""
        try:
            db = get_db()
            if not db:
                raise ConnectionError("Database connection failed")
            
            cursor = db.careers.find({'industry_sectors': industry}).limit(limit)
            careers = list(cursor)
            
            # Convert ObjectIds to strings
            for career in careers:
                career['_id'] = str(career['_id'])
                career['created_at'] = career['created_at'].isoformat() if career.get('created_at') else None
                career['updated_at'] = career['updated_at'].isoformat() if career.get('updated_at') else None
            
            return careers
            
        except Exception as e:
            logger.error(f"Error fetching careers by industry {industry}: {str(e)}")
            raise
    
    @staticmethod
    def calculate_career_match(student_profile: Dict[str, Any], career: Dict[str, Any]) -> Dict[str, Any]:
        """Calculate match score between student and career"""
        try:
            match_score = 0
            reasoning = []
            skill_gaps = []
            recommendations = []
            
            student_interests = student_profile.get('interests', {})
            student_skills = student_profile.get('skills', {})
            
            # Interest matching (30% of score)
            interest_score = 0
            if student_interests.get('design_fields'):
                for field in student_interests['design_fields']:
                    if field in career.get('core_skills', []):
                        interest_score += 10
                reasoning.append(f"Interest alignment: {interest_score/10} design fields match")
            
            if student_interests.get('industry_sectors'):
                for sector in student_interests['industry_sectors']:
                    if sector in career.get('industry_sectors', []):
                        interest_score += 5
                reasoning.append(f"Industry preference: {sector} sector matches")
            
            match_score += min(interest_score, 30)
            
            # Skill matching (50% of score)
            skill_score = 0
            required_skills = career.get('core_skills', [])
            student_skill_levels = student_skills.get('skill_levels', {})
            
            for skill_req in required_skills:
                skill_name = skill_req.get('skill_name', '')
                required_level = skill_req.get('proficiency_level', 1)
                importance = skill_req.get('importance', 'medium')
                
                student_level = student_skill_levels.get(skill_name, 0)
                
                if student_level >= required_level:
                    skill_score += 10 if importance == 'high' else 5
                else:
                    skill_gaps.append({
                        'skill_name': skill_name,
                        'current_level': student_level,
                        'required_level': required_level,
                        'importance': importance
                    })
            
            match_score += min(skill_score, 50)
            
            # Experience level matching (20% of score)
            experience_score = 0
            student_year = student_profile.get('graduation_year', 2025)
            current_year = datetime.now().year
            years_until_graduation = student_year - current_year
            
            if years_until_graduation <= 0:  # Graduated
                experience_score = 20
            elif years_until_graduation <= 1:  # Senior
                experience_score = 15
            elif years_until_graduation <= 2:  # Junior
                experience_score = 10
            else:  # Freshman/Sophomore
                experience_score = 5
            
            match_score += experience_score
            
            # Generate recommendations based on skill gaps
            if skill_gaps:
                for gap in skill_gaps[:3]:  # Top 3 gaps
                    recommendations.append(f"Develop {gap['skill_name']} skills to level {gap['required_level']}")
            
            # Add general recommendations
            if match_score < 50:
                recommendations.append("Consider entry-level positions or internships")
                recommendations.append("Focus on building core technical skills")
            elif match_score < 80:
                recommendations.append("Continue developing specialized skills")
                recommendations.append("Gain practical experience through projects")
            else:
                recommendations.append("You're well-positioned for this career path")
                recommendations.append("Focus on networking and industry connections")
            
            return {
                'career_id': str(career['_id']),
                'match_score': match_score,
                'reasoning': reasoning,
                'skill_gaps': skill_gaps,
                'recommendations': recommendations
            }
            
        except Exception as e:
            logger.error(f"Error calculating career match: {str(e)}")
            raise
    
    @staticmethod
    def get_career_recommendations_for_student(student_id: str, limit: int = 10) -> List[Dict[str, Any]]:
        """Get personalized career recommendations for a student"""
        try:
            db = get_db()
            if not db:
                raise ConnectionError("Database connection failed")
            
            # Get student profile
            student = db.students.find_one({'_id': ObjectId(student_id)})
            if not student:
                raise ValueError("Student not found")
            
            # Get all careers
            careers = list(db.careers.find())
            
            # Calculate matches for all careers
            matches = []
            for career in careers:
                match = CareerService.calculate_career_match(student, career)
                matches.append(match)
            
            # Sort by match score and return top matches
            matches.sort(key=lambda x: x['match_score'], reverse=True)
            
            return matches[:limit]
            
        except Exception as e:
            logger.error(f"Error getting career recommendations for student {student_id}: {str(e)}")
            raise
    
    @staticmethod
    def get_career_path_details(career_id: str, level: str) -> Optional[Dict[str, Any]]:
        """Get detailed information about a specific career path level"""
        try:
            career = CareerService.get_career_by_id(career_id)
            if not career:
                return None
            
            for path in career.get('career_paths', []):
                if path.get('level') == level:
                    return path
            
            return None
            
        except Exception as e:
            logger.error(f"Error getting career path details: {str(e)}")
            raise
    
    @staticmethod
    def get_industry_trends(industry: str = None) -> List[Dict[str, Any]]:
        """Get industry trends and insights"""
        try:
            db = get_db()
            if not db:
                raise ConnectionError("Database connection failed")
            
            filter_query = {}
            if industry:
                filter_query['industry_sectors'] = industry
            
            cursor = db.careers.find(filter_query)
            careers = list(cursor)
            
            # Aggregate trends from all matching careers
            all_trends = []
            for career in careers:
                trends = career.get('current_trends', [])
                for trend in trends:
                    trend['career_title'] = career.get('title', '')
                    all_trends.append(trend)
            
            # Remove duplicates and sort by impact
            unique_trends = {}
            for trend in all_trends:
                key = trend.get('trend_name', '')
                if key not in unique_trends or trend.get('impact') == 'high':
                    unique_trends[key] = trend
            
            return list(unique_trends.values())
            
        except Exception as e:
            logger.error(f"Error getting industry trends: {str(e)}")
            raise
