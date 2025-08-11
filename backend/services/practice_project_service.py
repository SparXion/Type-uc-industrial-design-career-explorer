"""
Practice Project Service - Business logic for project operations and student progress
"""

from typing import List, Optional, Dict, Any
from bson import ObjectId
from datetime import datetime
import logging

from database.connection import get_db

logger = logging.getLogger(__name__)

class PracticeProjectService:
    """Service class for practice project-related business logic"""
    
    @staticmethod
    def get_available_projects(filters: Dict[str, Any] = None, limit: int = 20) -> List[Dict[str, Any]]:
        """Get available practice projects with optional filtering"""
        try:
            db = get_db()
            if not db:
                raise ConnectionError("Database connection failed")
            
            # Build filter query
            filter_query = {'is_active': True}
            
            if filters:
                if filters.get('difficulty'):
                    filter_query['difficulty'] = filters['difficulty']
                
                if filters.get('skills_focus'):
                    filter_query['skills_focus'] = {'$in': filters['skills_focus']}
                
                if filters.get('estimated_duration'):
                    filter_query['estimated_duration'] = filters['estimated_duration']
            
            cursor = db.practice_projects.find(filter_query).limit(limit)
            projects = list(cursor)
            
            # Convert ObjectIds to strings
            for project in projects:
                project['_id'] = str(project['_id'])
                project['created_at'] = project['created_at'].isoformat() if project.get('created_at') else None
                project['updated_at'] = project['updated_at'].isoformat() if project.get('updated_at') else None
            
            return projects
            
        except Exception as e:
            logger.error(f"Error fetching available projects: {str(e)}")
            raise
    
    @staticmethod
    def get_project_by_id(project_id: str) -> Optional[Dict[str, Any]]:
        """Get practice project by ID"""
        try:
            if not ObjectId.is_valid(project_id):
                raise ValueError("Invalid project ID format")
            
            db = get_db()
            if not db:
                raise ConnectionError("Database connection failed")
            
            project = db.practice_projects.find_one({'_id': ObjectId(project_id)})
            if project:
                project['_id'] = str(project['_id'])
                project['created_at'] = project['created_at'].isoformat() if project.get('created_at') else None
                project['updated_at'] = project['updated_at'].isoformat() if project.get('updated_at') else None
            
            return project
            
        except Exception as e:
            logger.error(f"Error fetching project {project_id}: {str(e)}")
            raise
    
    @staticmethod
    def get_student_projects(student_id: str, status: str = None) -> List[Dict[str, Any]]:
        """Get projects for a specific student"""
        try:
            if not ObjectId.is_valid(student_id):
                raise ValueError("Invalid student ID format")
            
            db = get_db()
            if not db:
                raise ConnectionError("Database connection failed")
            
            # Build filter query
            filter_query = {'student_id': ObjectId(student_id)}
            if status:
                filter_query['status'] = status
            
            cursor = db.student_projects.find(filter_query)
            projects = list(cursor)
            
            # Convert ObjectIds to strings
            for project in projects:
                project['_id'] = str(project['_id'])
                project['student_id'] = str(project['student_id'])
                project['project_id'] = str(project['project_id'])
                project['started_at'] = project['started_at'].isoformat() if project.get('started_at') else None
                project['completed_at'] = project['completed_at'].isoformat() if project.get('completed_at') else None
                project['created_at'] = project['created_at'].isoformat() if project.get('created_at') else None
                project['updated_at'] = project['updated_at'].isoformat() if project.get('updated_at') else None
            
            return projects
            
        except Exception as e:
            logger.error(f"Error fetching student projects for {student_id}: {str(e)}")
            raise
    
    @staticmethod
    def start_project(student_id: str, project_id: str) -> bool:
        """Start a practice project for a student"""
        try:
            if not ObjectId.is_valid(student_id) or not ObjectId.is_valid(project_id):
                raise ValueError("Invalid ID format")
            
            db = get_db()
            if not db:
                raise ConnectionError("Database connection failed")
            
            # Check if project is available
            project = db.practice_projects.find_one({'_id': ObjectId(project_id), 'is_active': True})
            if not project:
                raise ValueError("Project not available")
            
            # Check if student already has this project
            existing = db.student_projects.find_one({
                'student_id': ObjectId(student_id),
                'project_id': ObjectId(project_id)
            })
            
            if existing:
                raise ValueError("Student already has this project")
            
            # Create student project record
            student_project = {
                'student_id': ObjectId(student_id),
                'project_id': ObjectId(project_id),
                'status': 'in_progress',
                'progress': 0,
                'started_at': datetime.utcnow(),
                'milestones': [],
                'submissions': [],
                'feedback': [],
                'created_at': datetime.utcnow(),
                'updated_at': datetime.utcnow()
            }
            
            result = db.student_projects.insert_one(student_project)
            return result.inserted_id is not None
            
        except Exception as e:
            logger.error(f"Error starting project for student {student_id}: {str(e)}")
            raise
    
    @staticmethod
    def update_project_progress(student_id: str, project_id: str, progress: int, milestone: str = None) -> bool:
        """Update project progress for a student"""
        try:
            if not ObjectId.is_valid(student_id) or not ObjectId.is_valid(project_id):
                raise ValueError("Invalid ID format")
            
            if not 0 <= progress <= 100:
                raise ValueError("Progress must be between 0 and 100")
            
            db = get_db()
            if not db:
                raise ConnectionError("Database connection failed")
            
            update_data = {
                'progress': progress,
                'updated_at': datetime.utcnow()
            }
            
            if milestone:
                update_data['$push'] = {'milestones': {
                    'description': milestone,
                    'timestamp': datetime.utcnow()
                }}
            
            result = db.student_projects.update_one(
                {
                    'student_id': ObjectId(student_id),
                    'project_id': ObjectId(project_id)
                },
                {'$set': update_data}
            )
            
            # If milestone was added, update the push operation
            if milestone and result.modified_count > 0:
                db.student_projects.update_one(
                    {
                        'student_id': ObjectId(student_id),
                        'project_id': ObjectId(project_id)
                    },
                    {'$push': {'milestones': {
                        'description': milestone,
                        'timestamp': datetime.utcnow()
                    }}}
                )
            
            return result.modified_count > 0
            
        except Exception as e:
            logger.error(f"Error updating project progress: {str(e)}")
            raise
    
    @staticmethod
    def submit_project_work(student_id: str, project_id: str, submission: Dict[str, Any]) -> bool:
        """Submit work for a practice project"""
        try:
            if not ObjectId.is_valid(student_id) or not ObjectId.is_valid(project_id):
                raise ValueError("Invalid ID format")
            
            db = get_db()
            if not db:
                raise ConnectionError("Database connection failed")
            
            # Add submission metadata
            submission['submitted_at'] = datetime.utcnow()
            submission['status'] = 'pending_review'
            
            result = db.student_projects.update_one(
                {
                    'student_id': ObjectId(student_id),
                    'project_id': ObjectId(project_id)
                },
                {
                    '$push': {'submissions': submission},
                    '$set': {'updated_at': datetime.utcnow()}
                }
            )
            
            return result.modified_count > 0
            
        except Exception as e:
            logger.error(f"Error submitting project work: {str(e)}")
            raise
    
    @staticmethod
    def complete_project(student_id: str, project_id: str, final_submission: Dict[str, Any]) -> bool:
        """Mark a project as completed"""
        try:
            if not ObjectId.is_valid(student_id) or not ObjectId.is_valid(project_id):
                raise ValueError("Invalid ID format")
            
            db = get_db()
            if not db:
                raise ConnectionError("Database connection failed")
            
            # Add completion metadata
            final_submission['submitted_at'] = datetime.utcnow()
            final_submission['status'] = 'completed'
            
            result = db.student_projects.update_one(
                {
                    'student_id': ObjectId(student_id),
                    'project_id': ObjectId(project_id)
                },
                {
                    '$set': {
                        'status': 'completed',
                        'progress': 100,
                        'completed_at': datetime.utcnow(),
                        'updated_at': datetime.utcnow()
                    },
                    '$push': {'submissions': final_submission}
                }
            )
            
            if result.modified_count > 0:
                # Update student's completed projects
                db.students.update_one(
                    {'_id': ObjectId(student_id)},
                    {'$push': {'practice_projects': str(project_id)}}
                )
                
                # Update project completion stats
                db.practice_projects.update_one(
                    {'_id': ObjectId(project_id)},
                    {'$inc': {'completion_count': 1}}
                )
            
            return result.modified_count > 0
            
        except Exception as e:
            logger.error(f"Error completing project: {str(e)}")
            raise
    
    @staticmethod
    def get_project_recommendations_for_student(student_id: str, limit: int = 5) -> List[Dict[str, Any]]:
        """Get personalized project recommendations for a student"""
        try:
            if not ObjectId.is_valid(student_id):
                raise ValueError("Invalid student ID format")
            
            db = get_db()
            if not db:
                raise ConnectionError("Database connection failed")
            
            # Get student profile
            student = db.students.find_one({'_id': ObjectId(student_id)})
            if not student:
                raise ValueError("Student not found")
            
            # Get student's current skills and interests
            student_skills = student.get('skills', {}).get('technical_skills', [])
            student_interests = student.get('interests', {}).get('design_fields', [])
            
            # Get available projects
            available_projects = list(db.practice_projects.find({'is_active': True}))
            
            # Score projects based on student profile
            scored_projects = []
            for project in available_projects:
                score = 0
                
                # Skill alignment scoring
                project_skills = project.get('skills_focus', [])
                for skill in project_skills:
                    if skill in student_skills:
                        score += 10  # Student has this skill
                    else:
                        score += 5   # Student can develop this skill
                
                # Interest alignment scoring
                if any(interest in project.get('description', '') for interest in student_interests):
                    score += 5
                
                # Difficulty scoring (prefer projects that challenge but don't overwhelm)
                difficulty = project.get('difficulty', 'beginner')
                if difficulty == 'beginner' and len(student_skills) < 3:
                    score += 10
                elif difficulty == 'intermediate' and 3 <= len(student_skills) < 6:
                    score += 15
                elif difficulty == 'advanced' and len(student_skills) >= 6:
                    score += 10
                
                scored_projects.append({
                    'project': project,
                    'score': score
                })
            
            # Sort by score and return top recommendations
            scored_projects.sort(key=lambda x: x['score'], reverse=True)
            
            recommendations = []
            for item in scored_projects[:limit]:
                project = item['project']
                project['_id'] = str(project['_id'])
                project['created_at'] = project['created_at'].isoformat() if project.get('created_at') else None
                project['updated_at'] = project['updated_at'].isoformat() if project.get('updated_at') else None
                project['recommendation_score'] = item['score']
                recommendations.append(project)
            
            return recommendations
            
        except Exception as e:
            logger.error(f"Error getting project recommendations for student {student_id}: {str(e)}")
            raise
    
    @staticmethod
    def get_student_progress_summary(student_id: str) -> Dict[str, Any]:
        """Get a summary of student's project progress"""
        try:
            if not ObjectId.is_valid(student_id):
                raise ValueError("Invalid student ID format")
            
            db = get_db()
            if not db:
                raise ConnectionError("Database connection failed")
            
            # Get all student projects
            student_projects = list(db.student_projects.find({'student_id': ObjectId(student_id)}))
            
            # Calculate statistics
            total_projects = len(student_projects)
            completed_projects = len([p for p in student_projects if p.get('status') == 'completed'])
            in_progress_projects = len([p for p in student_projects if p.get('status') == 'in_progress'])
            
            # Calculate average progress
            if in_progress_projects > 0:
                total_progress = sum(p.get('progress', 0) for p in student_projects if p.get('status') == 'in_progress')
                avg_progress = total_progress / in_progress_projects
            else:
                avg_progress = 0
            
            # Get skills developed
            skills_developed = set()
            for project in student_projects:
                if project.get('status') == 'completed':
                    project_details = db.practice_projects.find_one({'_id': project['project_id']})
                    if project_details:
                        skills_developed.update(project_details.get('skills_focus', []))
            
            return {
                'total_projects': total_projects,
                'completed_projects': completed_projects,
                'in_progress_projects': in_progress_projects,
                'completion_rate': (completed_projects / total_projects * 100) if total_projects > 0 else 0,
                'average_progress': round(avg_progress, 1),
                'skills_developed': list(skills_developed),
                'recent_activity': [
                    {
                        'project_id': str(p['project_id']),
                        'status': p.get('status'),
                        'progress': p.get('progress', 0),
                        'updated_at': p.get('updated_at').isoformat() if p.get('updated_at') else None
                    }
                    for p in sorted(student_projects, key=lambda x: x.get('updated_at', datetime.min), reverse=True)[:5]
                ]
            }
            
        except Exception as e:
            logger.error(f"Error getting progress summary for student {student_id}: {str(e)}")
            raise
