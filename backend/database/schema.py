from pymongo import ASCENDING, DESCENDING, TEXT, IndexModel
from pymongo.errors import OperationFailure
import logging
from typing import List, Dict, Any
from .connection import get_db

logger = logging.getLogger(__name__)

class DatabaseSchema:
    """Database schema manager for setting up collections, indexes, and validation"""
    
    def __init__(self):
        self.db = get_db()
        
    def _setup_users_collection(self):
        """Set up users collection with indexes and validation"""
        collection = self.db.users
        
        # Create indexes
        indexes = [
            IndexModel([("username", ASCENDING)], unique=True),
            IndexModel([("email", ASCENDING)], unique=True),
            IndexModel([("user_type", ASCENDING)]),
            IndexModel([("created_at", DESCENDING)]),
            IndexModel([("is_active", ASCENDING)])
        ]
        
        collection.create_indexes(indexes)
        
        logger.info("Users collection indexes created")
        
    def setup_collections(self):
        """Set up all collections with proper indexes and validation"""
        try:
            self._setup_users_collection()
            self._setup_students_collection()
            self._setup_companies_collection()
            self._setup_careers_collection()
            self._setup_ai_analyses_collection()
            self._setup_sessions_collection()
            logger.info("All collections and indexes set up successfully")
            return True
        except Exception as e:
            logger.error(f"Failed to set up collections: {e}")
            return False
    
    def _setup_students_collection(self):
        """Set up students collection with indexes and validation"""
        collection = self.db.students
        
        # Create indexes
        indexes = [
            IndexModel([("uc_id", ASCENDING)], unique=True),
            IndexModel([("email", ASCENDING)], unique=True),
            IndexModel([("major", ASCENDING)]),
            IndexModel([("graduation_year", ASCENDING)]),
            IndexModel([("interests.design_fields", ASCENDING)]),
            IndexModel([("interests.industry_sectors", ASCENDING)]),
            IndexModel([("skills.technical_skills", ASCENDING)]),
            IndexModel([("created_at", DESCENDING)]),
            IndexModel([("profile_completion", DESCENDING)])
        ]
        
        collection.create_indexes(indexes)
        
        # Create text index for search
        collection.create_index([
            ("first_name", TEXT),
            ("last_name", TEXT),
            ("major", TEXT),
            ("interests.design_fields", TEXT),
            ("skills.technical_skills", TEXT)
        ])
        
        logger.info("Students collection indexes created")
    
    def _setup_companies_collection(self):
        """Set up companies collection with indexes and validation"""
        collection = self.db.companies
        
        # Create indexes
        indexes = [
            IndexModel([("name", ASCENDING)], unique=True),
            IndexModel([("website", ASCENDING)], unique=True),
            IndexModel([("size", ASCENDING)]),
            IndexModel([("industry_sectors", ASCENDING)]),
            IndexModel([("locations.city", ASCENDING)]),
            IndexModel([("locations.state", ASCENDING)]),
            IndexModel([("verified", ASCENDING)]),
            IndexModel([("created_at", DESCENDING)]),
            IndexModel([("job_opportunities.is_active", ASCENDING)])
        ]
        
        collection.create_indexes(indexes)
        
        # Create text index for search
        collection.create_index([
            ("name", TEXT),
            ("description", TEXT),
            ("industry_sectors", TEXT),
            ("design_philosophy", TEXT)
        ])
        
        logger.info("Companies collection indexes created")
    
    def _setup_careers_collection(self):
        """Set up careers collection with indexes and validation"""
        collection = self.db.careers
        
        # Create indexes
        indexes = [
            IndexModel([("title", ASCENDING)], unique=True),
            IndexModel([("category", ASCENDING)]),
            IndexModel([("industry_sectors", ASCENDING)]),
            IndexModel([("market_demand", ASCENDING)]),
            IndexModel([("growth_potential", ASCENDING)]),
            IndexModel([("education_level", ASCENDING)]),
            IndexModel([("popularity_score", DESCENDING)]),
            IndexModel([("created_at", DESCENDING)])
        ]
        
        collection.create_indexes(indexes)
        
        # Create text index for search
        collection.create_index([
            ("title", TEXT),
            ("description", TEXT),
            ("category", TEXT),
            ("industry_sectors", TEXT)
        ])
        
        logger.info("Careers collection indexes created")
    
    def _setup_ai_analyses_collection(self):
        """Set up AI analyses collection with indexes and validation"""
        collection = self.db.ai_analyses
        
        # Create indexes
        indexes = [
            IndexModel([("student_id", ASCENDING)]),
            IndexModel([("analysis_type", ASCENDING)]),
            IndexModel([("created_at", DESCENDING)]),
            IndexModel([("expires_at", ASCENDING)]),
            IndexModel([("overall_score", DESCENDING)]),
            IndexModel([("model_version", ASCENDING)])
        ]
        
        collection.create_indexes(indexes)
        
        # Create compound index for student analysis history
        collection.create_index([
            ("student_id", ASCENDING),
            ("analysis_type", ASCENDING),
            ("created_at", DESCENDING)
        ])
        
        logger.info("AI analyses collection indexes created")
    
    def _setup_sessions_collection(self):
        """Set up user sessions collection with indexes and validation"""
        collection = self.db.sessions
        
        # Create indexes
        indexes = [
            IndexModel([("student_id", ASCENDING)]),
            IndexModel([("session_type", ASCENDING)]),
            IndexModel([("started_at", DESCENDING)]),
            IndexModel([("completed_at", DESCENDING)]),
            IndexModel([("status", ASCENDING)])
        ]
        
        collection.create_indexes(indexes)
        
        # Create TTL index for session cleanup
        collection.create_index("expires_at", expireAfterSeconds=0)
        
        logger.info("Sessions collection indexes created")
    
    def create_sample_data(self):
        """Create sample data for development and testing"""
        try:
            self._create_sample_careers()
            self._create_sample_companies()
            logger.info("Sample data created successfully")
            return True
        except Exception as e:
            logger.error(f"Failed to create sample data: {e}")
            return False
    
    def _create_sample_careers(self):
        """Create sample career profiles"""
        careers_collection = self.db.careers
        
        # Check if careers already exist
        if careers_collection.count_documents({}) > 0:
            logger.info("Careers collection already has data, skipping sample creation")
            return
        
        sample_careers = [
            {
                "title": "Product Designer",
                "category": "Design",
                "description": "Create innovative product designs that solve user problems and meet business goals",
                "career_paths": [
                    {
                        "level": "entry",
                        "title": "Junior Product Designer",
                        "years_experience": 0,
                        "salary_range": {"min": 45000, "max": 65000},
                        "key_responsibilities": [
                            "Assist with design projects",
                            "Create sketches and mockups",
                            "Participate in user research"
                        ],
                        "required_skills": ["Sketching", "3D Modeling", "Design Thinking"],
                        "growth_opportunities": ["Senior Designer", "Lead Designer", "Design Manager"]
                    },
                    {
                        "level": "mid_level",
                        "title": "Product Designer",
                        "years_experience": 3,
                        "salary_range": {"min": 65000, "max": 90000},
                        "key_responsibilities": [
                            "Lead design projects",
                            "Conduct user research",
                            "Present design solutions"
                        ],
                        "required_skills": ["User Research", "Prototyping", "Communication"],
                        "growth_opportunities": ["Senior Designer", "Lead Designer"]
                    }
                ],
                "core_skills": [
                    {
                        "skill_name": "Design Thinking",
                        "category": "design",
                        "proficiency_level": 8,
                        "importance": "critical",
                        "description": "Ability to solve problems through design methodology"
                    },
                    {
                        "skill_name": "Sketching",
                        "category": "design",
                        "proficiency_level": 7,
                        "importance": "critical",
                        "description": "Quick visual communication through hand drawing"
                    },
                    {
                        "skill_name": "3D Modeling",
                        "category": "technical",
                        "proficiency_level": 7,
                        "importance": "important",
                        "description": "Creating digital 3D representations of products"
                    }
                ],
                "industry_sectors": ["consumer_electronics", "consumer_goods", "furniture"],
                "market_demand": "high",
                "growth_potential": "high",
                "education_level": "bachelor",
                "typical_workplaces": ["Design Agencies", "Startups", "Corporations"],
                "uc_programs": ["Industrial Design", "Design", "Architecture"],
                "learning_resources": [
                    "IDSA (Industrial Designers Society of America)",
                    "Behance portfolio platform",
                    "Design conferences and workshops"
                ]
            },
            {
                "title": "UX Designer",
                "category": "Design",
                "description": "Focus on user experience and interaction design for digital and physical products",
                "career_paths": [
                    {
                        "level": "entry",
                        "title": "UX Designer",
                        "years_experience": 0,
                        "salary_range": {"min": 50000, "max": 70000},
                        "key_responsibilities": [
                            "Conduct user research",
                            "Create user personas",
                            "Design user flows and wireframes"
                        ],
                        "required_skills": ["User Research", "Wireframing", "Usability Testing"],
                        "growth_opportunities": ["Senior UX Designer", "UX Lead", "UX Manager"]
                    }
                ],
                "core_skills": [
                    {
                        "skill_name": "User Research",
                        "category": "research",
                        "proficiency_level": 8,
                        "importance": "critical",
                        "description": "Understanding user needs through research methods"
                    }
                ],
                "industry_sectors": ["consumer_electronics", "software", "healthcare"],
                "market_demand": "very_high",
                "growth_potential": "very_high",
                "uc_programs": ["Industrial Design", "Computer Science", "Psychology"]
            }
        ]
        
        careers_collection.insert_many(sample_careers)
        logger.info(f"Created {len(sample_careers)} sample careers")
    
    def _create_sample_companies(self):
        """Create sample company profiles"""
        companies_collection = self.db.companies
        
        # Check if companies already exist
        if companies_collection.count_documents({}) > 0:
            logger.info("Companies collection already has data, skipping sample creation")
            return
        
        sample_companies = [
            {
                "name": "Design Innovation Co.",
                "website": "https://designinnovation.com",
                "description": "Leading product design firm specializing in consumer electronics and sustainable design",
                "size": "medium",
                "industry_sectors": ["consumer_electronics", "sustainable_design"],
                "locations": [
                    {
                        "city": "Cincinnati",
                        "state": "OH",
                        "remote_friendly": True,
                        "hybrid_available": True
                    }
                ],
                "design_philosophy": "Human-centered design that solves real problems",
                "design_team_size": 15,
                "design_tools": ["SolidWorks", "Figma", "Adobe Creative Suite"],
                "job_opportunities": [
                    {
                        "title": "Industrial Designer",
                        "department": "Product Design",
                        "description": "Create innovative product designs for consumer electronics",
                        "requirements": ["Bachelor's in Industrial Design", "3+ years experience"],
                        "salary_range": {"min": 60000, "max": 90000},
                        "benefits": ["Health insurance", "401k", "Professional development"],
                        "employment_type": "full-time",
                        "experience_level": "mid_level"
                    }
                ],
                "company_culture": ["Collaborative", "Innovation-focused", "Work-life balance"],
                "uc_alumni_count": 8,
                "uc_partnerships": ["Capstone projects", "Internship program"]
            }
        ]
        
        companies_collection.insert_many(sample_companies)
        logger.info(f"Created {len(sample_companies)} sample companies")

def setup_database():
    """Main function to set up the database"""
    schema = DatabaseSchema()
    success = schema.setup_collections()
    
    if success:
        # Create sample data for development
        schema.create_sample_data()
    
    return success
