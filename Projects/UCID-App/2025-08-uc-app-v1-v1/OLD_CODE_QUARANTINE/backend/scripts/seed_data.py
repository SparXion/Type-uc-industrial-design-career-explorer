"""
Data Seeding Script - Populate database with sample data
"""

import sys
import os
from datetime import datetime, timedelta
import random

# Add parent directory to path to import models
sys.path.append(os.path.dirname(os.path.dirname(os.path.abspath(__file__))))

from database.connection import get_db
from models.student import StudentProfile, StudentInterests, StudentSkills, CareerPreferences
from models.career import CareerProfile, CareerPath, SkillRequirement, IndustryTrend
from models.company import CompanyProfile, CompanyLocation, JobOpportunity

def seed_careers():
    """Seed career profiles with sample data"""
    db = get_db()
    if not db:
        print("Failed to connect to database")
        return
    
    careers_data = [
        {
            "title": "Product Designer",
            "category": "Design",
            "description": "Create innovative product designs that balance aesthetics, functionality, and manufacturability",
            "career_paths": [
                {
                    "level": "entry",
                    "title": "Junior Product Designer",
                    "years_experience": 0,
                    "salary_range": {"min": 45000, "max": 65000},
                    "key_responsibilities": ["Assist senior designers", "Create concept sketches", "Participate in design reviews"],
                    "required_skills": ["Sketching", "CAD modeling", "Design thinking"],
                    "growth_opportunities": ["Learn advanced CAD tools", "Develop prototyping skills", "Understand manufacturing processes"]
                },
                {
                    "level": "mid_level",
                    "title": "Product Designer",
                    "years_experience": 3,
                    "salary_range": {"min": 65000, "max": 95000},
                    "key_responsibilities": ["Lead design projects", "Collaborate with engineering", "Present to stakeholders"],
                    "required_skills": ["Advanced CAD", "Prototyping", "Project management"],
                    "growth_opportunities": ["Lead design teams", "Specialize in specific industries", "Develop business acumen"]
                }
            ],
            "core_skills": [
                {"skill_name": "Sketching", "category": "design", "proficiency_level": 4, "importance": "high", "description": "Ability to quickly communicate ideas through hand sketches"},
                {"skill_name": "CAD Modeling", "category": "technical", "proficiency_level": 4, "importance": "high", "description": "3D modeling using software like SolidWorks, Fusion 360"},
                {"skill_name": "Design Thinking", "category": "design", "proficiency_level": 3, "importance": "high", "description": "Human-centered approach to problem solving"}
            ],
            "specialized_skills": [
                {"skill_name": "Prototyping", "category": "prototyping", "proficiency_level": 3, "importance": "medium", "description": "Creating physical prototypes to test concepts"},
                {"skill_name": "Manufacturing Processes", "category": "manufacturing", "proficiency_level": 3, "importance": "medium", "description": "Understanding how products are made"}
            ],
            "industry_sectors": ["consumer_electronics", "furniture", "consumer_goods"],
            "market_demand": "High - Growing demand for user-centered design",
            "growth_potential": "Excellent - Path to senior designer and design director",
            "education_level": "Bachelor's in Industrial Design or related field",
            "certifications": ["SolidWorks Certified", "Design Thinking Certification"],
            "continuing_education": ["Advanced CAD courses", "Design leadership workshops"],
            "typical_workplaces": ["Design agencies", "Manufacturing companies", "Startups"],
            "work_schedule": "Full-time, some overtime during project deadlines",
            "travel_requirements": "Occasional travel to manufacturing sites or client meetings",
            "current_trends": [
                {
                    "trend_name": "Sustainable Design",
                    "description": "Focus on eco-friendly materials and processes",
                    "impact": "high",
                    "affected_skills": ["Material selection", "Life cycle analysis"],
                    "timeline": "Ongoing"
                }
            ],
            "future_outlook": "Very positive - Increasing focus on user experience and sustainability",
            "uc_programs": ["Industrial Design", "Design Innovation"],
            "uc_alumni_examples": ["Sarah Chen - Senior Designer at Apple", "Mike Rodriguez - Design Director at IDEO"],
            "learning_resources": ["Design Museum", "Industrial Design Society of America"],
            "professional_organizations": ["IDSA", "AIGA"],
            "networking_opportunities": ["Design conferences", "Local design meetups"],
            "created_at": datetime.utcnow(),
            "updated_at": datetime.utcnow(),
            "popularity_score": 85
        },
        {
            "title": "UX/UI Designer",
            "category": "Digital Design",
            "description": "Design user experiences and interfaces for digital products and applications",
            "career_paths": [
                {
                    "level": "entry",
                    "title": "Junior UX Designer",
                    "years_experience": 0,
                    "salary_range": {"min": 50000, "max": 70000},
                    "key_responsibilities": ["Conduct user research", "Create wireframes", "Assist with usability testing"],
                    "required_skills": ["User research", "Wireframing", "Prototyping tools"],
                    "growth_opportunities": ["Learn advanced prototyping", "Develop visual design skills", "Understand business metrics"]
                }
            ],
            "core_skills": [
                {"skill_name": "User Research", "category": "research", "proficiency_level": 4, "importance": "high", "description": "Understanding user needs through interviews and surveys"},
                {"skill_name": "Wireframing", "category": "design", "proficiency_level": 4, "importance": "high", "description": "Creating low-fidelity layouts and user flows"},
                {"skill_name": "Prototyping", "category": "prototyping", "proficiency_level": 3, "importance": "high", "description": "Building interactive prototypes using tools like Figma"}
            ],
            "industry_sectors": ["consumer_electronics", "software", "healthcare"],
            "market_demand": "Very High - Critical for digital product success",
            "growth_potential": "Excellent - High demand across all industries",
            "education_level": "Bachelor's in Design, HCI, or related field",
            "uc_programs": ["Digital Design", "Human-Computer Interaction"],
            "created_at": datetime.utcnow(),
            "updated_at": datetime.utcnow(),
            "popularity_score": 90
        },
        {
            "title": "Industrial Engineer",
            "category": "Engineering",
            "description": "Optimize manufacturing processes and systems for efficiency and quality",
            "career_paths": [
                {
                    "level": "entry",
                    "title": "Process Engineer",
                    "years_experience": 0,
                    "salary_range": {"min": 55000, "max": 75000},
                    "key_responsibilities": ["Analyze production processes", "Implement improvements", "Monitor quality metrics"],
                    "required_skills": ["Process analysis", "Statistical analysis", "Lean principles"],
                    "growth_opportunities": ["Learn advanced analytics", "Develop leadership skills", "Specialize in specific industries"]
                }
            ],
            "core_skills": [
                {"skill_name": "Process Analysis", "category": "technical", "proficiency_level": 4, "importance": "high", "description": "Analyzing and improving manufacturing processes"},
                {"skill_name": "Statistical Analysis", "category": "technical", "proficiency_level": 3, "importance": "medium", "description": "Using data to make process decisions"}
            ],
            "industry_sectors": ["automotive", "aerospace", "manufacturing"],
            "market_demand": "High - Essential for manufacturing efficiency",
            "growth_potential": "Good - Path to operations management",
            "education_level": "Bachelor's in Industrial Engineering",
            "uc_programs": ["Industrial Engineering", "Manufacturing Engineering"],
            "created_at": datetime.utcnow(),
            "updated_at": datetime.utcnow(),
            "popularity_score": 75
        }
    ]
    
    # Clear existing careers
    db.careers.delete_many({})
    
    # Insert new careers
    result = db.careers.insert_many(careers_data)
    print(f"Inserted {len(result.inserted_ids)} career profiles")

def seed_companies():
    """Seed company profiles with sample data"""
    db = get_db()
    if not db:
        print("Failed to connect to database")
        return
    
    companies_data = [
        {
            "name": "DesignWorks Inc.",
            "website": "https://designworks.com",
            "description": "Leading product design agency specializing in consumer electronics and furniture",
            "mission_statement": "Creating meaningful products that enhance people's lives through thoughtful design",
            "size": "medium",
            "founded_year": 2010,
            "industry_sectors": ["consumer_electronics", "furniture"],
            "locations": [
                {
                    "city": "Cincinnati",
                    "state": "OH",
                    "country": "USA",
                    "remote_friendly": True,
                    "hybrid_available": True
                }
            ],
            "design_philosophy": "Human-centered design with focus on sustainability",
            "design_team_size": 25,
            "design_tools": ["SolidWorks", "Figma", "Adobe Creative Suite"],
            "job_opportunities": [
                {
                    "title": "Senior Product Designer",
                    "department": "Design",
                    "description": "Lead design projects for major clients",
                    "requirements": ["5+ years experience", "Strong portfolio", "Leadership skills"],
                    "salary_range": {"min": 80000, "max": 120000},
                    "employment_type": "Full-time",
                    "experience_level": "Senior"
                }
            ],
            "uc_alumni_count": 8,
            "uc_partnerships": ["Design internship program", "Capstone project collaboration"],
            "created_at": datetime.utcnow(),
            "updated_at": datetime.utcnow(),
            "verified": True
        },
        {
            "name": "TechCorp",
            "website": "https://techcorp.com",
            "description": "Innovative technology company focused on smart home devices",
            "size": "large",
            "founded_year": 2005,
            "industry_sectors": ["consumer_electronics", "smart_home"],
            "locations": [
                {
                    "city": "San Francisco",
                    "state": "CA",
                    "country": "USA",
                    "remote_friendly": True,
                    "hybrid_available": False
                }
            ],
            "design_team_size": 50,
            "design_tools": ["Figma", "Sketch", "Principle"],
            "uc_alumni_count": 15,
            "created_at": datetime.utcnow(),
            "updated_at": datetime.utcnow(),
            "verified": True
        }
    ]
    
    # Clear existing companies
    db.companies.delete_many({})
    
    # Insert new companies
    result = db.companies.insert_many(companies_data)
    print(f"Inserted {len(result.inserted_ids)} company profiles")

def seed_practice_projects():
    """Seed practice projects with sample data"""
    db = get_db()
    if not db:
        print("Failed to connect to database")
        return
    
    projects_data = [
        {
            "title": "Sustainable Water Bottle Design",
            "description": "Design an eco-friendly water bottle that addresses plastic waste issues",
            "skills_focus": ["Sketching", "CAD modeling", "Material selection", "Sustainability"],
            "difficulty": "intermediate",
            "estimated_duration": "4-6 weeks",
            "materials_needed": ["Sketchbook", "CAD software", "Research materials"],
            "learning_objectives": [
                "Apply sustainable design principles",
                "Practice user-centered design process",
                "Develop material selection skills"
            ],
            "submission_guidelines": [
                "Concept sketches (minimum 10)",
                "3D CAD model",
                "Material specification sheet",
                "Design rationale document"
            ],
            "feedback_criteria": [
                "Innovation and creativity",
                "Technical execution",
                "Sustainability impact",
                "User experience"
            ],
            "is_active": True,
            "completion_count": 0,
            "created_at": datetime.utcnow(),
            "updated_at": datetime.utcnow()
        },
        {
            "title": "Smartphone Stand Prototype",
            "description": "Create a functional smartphone stand using basic materials and tools",
            "skills_focus": ["Prototyping", "Sketching", "Basic fabrication", "User testing"],
            "difficulty": "beginner",
            "estimated_duration": "2-3 weeks",
            "materials_needed": ["Cardboard", "Wood", "Basic tools", "Smartphone for testing"],
            "learning_objectives": [
                "Learn rapid prototyping techniques",
                "Practice user testing",
                "Develop fabrication skills"
            ],
            "submission_guidelines": [
                "Physical prototype",
                "Process documentation",
                "User testing results",
                "Iteration notes"
            ],
            "feedback_criteria": [
                "Functionality",
                "Durability",
                "User experience",
                "Documentation quality"
            ],
            "is_active": True,
            "completion_count": 0,
            "created_at": datetime.utcnow(),
            "updated_at": datetime.utcnow()
        },
        {
            "title": "Furniture Design Challenge",
            "description": "Design a piece of furniture for small living spaces",
            "skills_focus": ["Furniture design", "Space planning", "Material selection", "Ergonomics"],
            "difficulty": "advanced",
            "estimated_duration": "6-8 weeks",
            "materials_needed": ["Sketching materials", "CAD software", "Material samples", "Scale models"],
            "learning_objectives": [
                "Master furniture design principles",
                "Apply ergonomic considerations",
                "Develop material expertise"
            ],
            "submission_guidelines": [
                "Design concept presentation",
                "Detailed technical drawings",
                "Material specification",
                "Prototype or detailed model"
            ],
            "feedback_criteria": [
                "Design innovation",
                "Technical execution",
                "Ergonomic considerations",
                "Manufacturability"
            ],
            "is_active": True,
            "completion_count": 0,
            "created_at": datetime.utcnow(),
            "updated_at": datetime.utcnow()
        }
    ]
    
    # Clear existing projects
    db.practice_projects.delete_many({})
    
    # Insert new projects
    result = db.practice_projects.insert_many(projects_data)
    print(f"Inserted {len(result.inserted_ids)} practice projects")

def seed_sample_students():
    """Seed sample student profiles"""
    db = get_db()
    if not db:
        print("Failed to connect to database")
        return
    
    students_data = [
        {
            "uc_id": "UC001",
            "email": "sarah.chen@uc.edu",
            "first_name": "Sarah",
            "last_name": "Chen",
            "major": "Industrial Design",
            "graduation_year": 2025,
            "interests": {
                "design_fields": ["Product Design", "Furniture Design", "Sustainable Design"],
                "creative_mediums": ["Sketching", "Digital Design", "3D Modeling"],
                "industry_sectors": ["Consumer Electronics", "Furniture", "Sustainable Design"],
                "project_types": ["Product Development", "Concept Design", "Prototyping"]
            },
            "skills": {
                "technical_skills": ["SolidWorks", "Sketching", "Prototyping"],
                "soft_skills": ["Communication", "Teamwork", "Problem Solving"],
                "design_skills": ["User Research", "Design Thinking", "Visual Design"],
                "skill_levels": {
                    "SolidWorks": 4,
                    "Sketching": 5,
                    "Prototyping": 3,
                    "User Research": 3
                }
            },
            "career_preferences": {
                "preferred_roles": ["Product Designer", "UX Designer"],
                "work_environment": ["Design Agency", "Startup", "Large Company"],
                "location_preferences": ["Cincinnati", "Remote", "San Francisco"],
                "salary_expectations": {"min": 60000, "max": 90000}
            },
            "profile_completion": 85,
            "created_at": datetime.utcnow(),
            "updated_at": datetime.utcnow()
        },
        {
            "uc_id": "UC002",
            "email": "mike.rodriguez@uc.edu",
            "first_name": "Mike",
            "last_name": "Rodriguez",
            "major": "Digital Design",
            "graduation_year": 2026,
            "interests": {
                "design_fields": ["UX/UI Design", "Digital Product Design", "Interaction Design"],
                "creative_mediums": ["Digital Design", "Prototyping", "User Research"],
                "industry_sectors": ["Software", "Consumer Electronics", "Healthcare"],
                "project_types": ["App Design", "Website Design", "User Research"]
            },
            "skills": {
                "technical_skills": ["Figma", "Sketch", "Adobe Creative Suite"],
                "soft_skills": ["User Empathy", "Analytical Thinking", "Presentation"],
                "design_skills": ["User Research", "Information Architecture", "Visual Design"],
                "skill_levels": {
                    "Figma": 4,
                    "User Research": 4,
                    "Visual Design": 3
                }
            },
            "career_preferences": {
                "preferred_roles": ["UX Designer", "Product Designer"],
                "work_environment": ["Tech Company", "Design Agency"],
                "location_preferences": ["Remote", "San Francisco", "New York"],
                "salary_expectations": {"min": 55000, "max": 85000}
            },
            "profile_completion": 70,
            "created_at": datetime.utcnow(),
            "updated_at": datetime.utcnow()
        }
    ]
    
    # Clear existing students
    db.students.delete_many({})
    
    # Insert new students
    result = db.students.insert_many(students_data)
    print(f"Inserted {len(result.inserted_ids)} sample student profiles")

def main():
    """Main seeding function"""
    print("Starting database seeding...")
    
    try:
        seed_careers()
        seed_companies()
        seed_practice_projects()
        seed_sample_students()
        
        print("Database seeding completed successfully!")
        
    except Exception as e:
        print(f"Error during seeding: {str(e)}")
        sys.exit(1)

if __name__ == "__main__":
    main()
