from sqlalchemy import create_engine, Column, Integer, String, Text, DateTime, JSON, ForeignKey, Index, Boolean, Numeric, text
from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy.orm import relationship, sessionmaker
from sqlalchemy.sql import func
from sqlalchemy.exc import SQLAlchemyError
import logging
from typing import List, Dict, Any
from .connection import get_engine

logger = logging.getLogger(__name__)

Base = declarative_base()

class User(Base):
    """Users table for storing user profiles and preferences"""
    __tablename__ = 'users'
    
    id = Column(Integer, primary_key=True)
    username = Column(String(100), unique=True, nullable=False)
    email = Column(String(255), unique=True, nullable=False)
    first_name = Column(String(100))
    last_name = Column(String(100))
    user_type = Column(String(50), default='student')  # student, professional, educator
    interests = Column(JSON)  # e.g., {"toys": ["LEGO", "trucks"], "media": ["sci-fi", "anime"]}
    talents = Column(JSON)  # e.g., {"creative": ["drawing", "sculpting"], "technical": ["coding", "electronics"]}
    is_active = Column(Boolean, default=True)
    created_at = Column(DateTime(timezone=True), server_default=func.now())
    updated_at = Column(DateTime(timezone=True), onupdate=func.now())
    
    # Relationships
    responses = relationship("UserResponse", back_populates="user")
    career_matches = relationship("CareerMatch", back_populates="user")
    
    def __repr__(self):
        return f"<User(id={self.id}, username='{self.username}', email='{self.email}')>"

class IceBreakerQuestion(Base):
    """Ice breaker questions for initiating conversations"""
    __tablename__ = 'ice_breaker_questions'
    
    id = Column(Integer, primary_key=True)
    category = Column(String(100), nullable=False)  # e.g., 'Toys & Playthings', 'Media & Entertainment'
    question = Column(Text, nullable=False)
    follow_ups = Column(JSON, nullable=False)  # Array of follow-up questions
    is_active = Column(Boolean, default=True)
    created_at = Column(DateTime(timezone=True), server_default=func.now())
    
    # Relationships
    responses = relationship("UserResponse", back_populates="question")
    
    def __repr__(self):
        return f"<IceBreakerQuestion(id={self.id}, category='{self.category}', question='{self.question[:50]}...')>"

class UserResponse(Base):
    """User responses to ice breaker questions"""
    __tablename__ = 'user_responses'
    
    id = Column(Integer, primary_key=True)
    user_id = Column(Integer, ForeignKey('users.id'), nullable=False)
    question_id = Column(Integer, ForeignKey('ice_breaker_questions.id'), nullable=False)
    response = Column(Text, nullable=False)
    response_data = Column(JSON)  # Additional structured data from the response
    responded_at = Column(DateTime(timezone=True), server_default=func.now())
    
    # Relationships
    user = relationship("User", back_populates="responses")
    question = relationship("IceBreakerQuestion", back_populates="responses")
    
    def __repr__(self):
        return f"<UserResponse(id={self.id}, user_id={self.user_id}, question_id={self.question_id})>"

class CareerMatch(Base):
    """Career matches based on user interests and talents"""
    __tablename__ = 'career_matches'
    
    id = Column(Integer, primary_key=True)
    user_id = Column(Integer, ForeignKey('users.id'), nullable=False)
    skills = Column(JSON)  # e.g., ["prototyping", "spatial reasoning", "visualization"]
    design_categories = Column(JSON)  # e.g., ["vehicles", "sci-fi design", "furniture"]
    career_paths = Column(JSON)  # e.g., ["product designer", "automotive designer", "concept artist"]
    confidence_score = Column(Numeric(3, 2))  # 0.00 to 1.00
    matched_at = Column(DateTime(timezone=True), server_default=func.now())
    
    # Relationships
    user = relationship("User", back_populates="career_matches")
    
    def __repr__(self):
        return f"<CareerMatch(id={self.id}, user_id={self.user_id}, confidence_score={self.confidence_score})>"

class GeneratedQuestion(Base):
    """AI-generated questions for NLP framework expansion"""
    __tablename__ = 'generated_questions'
    
    id = Column(Integer, primary_key=True)
    original_question_id = Column(Integer, ForeignKey('ice_breaker_questions.id'))  # Link to seed question if derived
    category = Column(String(100))
    question = Column(Text, nullable=False)
    follow_ups = Column(JSON)
    generation_source = Column(String(100))  # e.g., 'NLP model output', 'AI generation'
    relevance_score = Column(Numeric(3, 2))  # Optional: Score from NLP evaluation (0-1)
    is_approved = Column(Boolean, default=False)  # For moderation
    created_at = Column(DateTime(timezone=True), server_default=func.now())
    
    # Relationships
    original_question = relationship("IceBreakerQuestion")
    
    def __repr__(self):
        return f"<GeneratedQuestion(id={self.id}, category='{self.category}', relevance_score={self.relevance_score})>"

class DesignItem(Base):
    """Industrial design items and categories for reference"""
    __tablename__ = 'design_items'
    
    id = Column(Integer, primary_key=True)
    category = Column(String(100), nullable=False)  # e.g., 'Furniture', 'Vehicles', 'Electronics'
    subcategory = Column(String(100))  # e.g., 'Chairs', 'Cars', 'Smartphones'
    name = Column(String(255), nullable=False)
    description = Column(Text)
    examples = Column(JSON)  # Array of example products
    skills_required = Column(JSON)  # Array of skills needed for this category
    created_at = Column(DateTime(timezone=True), server_default=func.now())
    
    def __repr__(self):
        return f"<DesignItem(id={self.id}, category='{self.category}', name='{self.name}')>"

class SciFiConcept(Base):
    """Sci-fi design concepts for inspiration"""
    __tablename__ = 'sci_fi_concepts'
    
    id = Column(Integer, primary_key=True)
    category = Column(String(100), nullable=False)  # e.g., 'Vehicles', 'Weapons', 'Architecture'
    name = Column(String(255), nullable=False)
    description = Column(Text)
    inspiration_sources = Column(JSON)  # Array of movies, books, games that inspired this
    design_principles = Column(JSON)  # Array of design principles applied
    created_at = Column(DateTime(timezone=True), server_default=func.now())
    
    def __repr__(self):
        return f"<SciFiConcept(id={self.id}, category='{self.category}', name='{self.name}')>"

class ManifestationMethod(Base):
    """Methods for representing industrial design concepts"""
    __tablename__ = 'manifestation_methods'
    
    id = Column(Integer, primary_key=True)
    category = Column(String(100), nullable=False)  # e.g., '2D', '3D', 'Physical', 'Digital'
    method = Column(String(255), nullable=False)
    description = Column(Text)
    tools_required = Column(JSON)  # Array of tools/software needed
    skill_level = Column(String(50))  # beginner, intermediate, advanced
    created_at = Column(DateTime(timezone=True), server_default=func.now())
    
    def __repr__(self):
        return f"<ManifestationMethod(id={self.id}, category='{self.category}', method='{self.method}')>"

class Talent(Base):
    """Innate talents that align with industrial design"""
    __tablename__ = 'talents'
    
    id = Column(Integer, primary_key=True)
    category = Column(String(100), nullable=False)  # e.g., 'Creative', 'Technical', 'Problem-Solving'
    talent = Column(String(255), nullable=False)
    description = Column(Text)
    related_skills = Column(JSON)  # Array of related industrial design skills
    development_path = Column(Text)  # How to develop this talent
    created_at = Column(DateTime(timezone=True), server_default=func.now())
    
    def __repr__(self):
        return f"<Talent(id={self.id}, category='{self.category}', talent='{self.talent}')>"

class DatabaseSchema:
    """Database schema manager for setting up tables, indexes, and validation"""
    
    def __init__(self):
        self.engine = get_engine()
        
    def create_tables(self):
        """Create all tables in the database"""
        try:
            Base.metadata.create_all(self.engine)
            logger.info("All tables created successfully")
            return True
        except Exception as e:
            logger.error(f"Failed to create tables: {e}")
            return False
    
    def drop_tables(self):
        """Drop all tables in the database"""
        try:
            Base.metadata.drop_all(self.engine)
            logger.info("All tables dropped successfully")
            return True
        except Exception as e:
            logger.error(f"Failed to drop tables: {e}")
            return False
    
    def create_indexes(self):
        """Create additional indexes for performance"""
        try:
            with self.engine.connect() as connection:
                # Create indexes for better query performance
                indexes = [
                    "CREATE INDEX IF NOT EXISTS idx_users_username ON users(username)",
                    "CREATE INDEX IF NOT EXISTS idx_users_email ON users(email)",
                    "CREATE INDEX IF NOT EXISTS idx_users_user_type ON users(user_type)",
                    "CREATE INDEX IF NOT EXISTS idx_users_created_at ON users(created_at)",
                    "CREATE INDEX IF NOT EXISTS idx_questions_category ON ice_breaker_questions(category)",
                    "CREATE INDEX IF NOT EXISTS idx_questions_active ON ice_breaker_questions(is_active)",
                    "CREATE INDEX IF NOT EXISTS idx_responses_user_id ON user_responses(user_id)",
                    "CREATE INDEX IF NOT EXISTS idx_responses_question_id ON user_responses(question_id)",
                    "CREATE INDEX IF NOT EXISTS idx_responses_responded_at ON user_responses(responded_at)",
                    "CREATE INDEX IF NOT EXISTS idx_career_matches_user_id ON career_matches(user_id)",
                    "CREATE INDEX IF NOT EXISTS idx_career_matches_confidence ON career_matches(confidence_score)",
                    "CREATE INDEX IF NOT EXISTS idx_generated_questions_category ON generated_questions(category)",
                    "CREATE INDEX IF NOT EXISTS idx_generated_questions_relevance ON generated_questions(relevance_score)",
                    "CREATE INDEX IF NOT EXISTS idx_design_items_category ON design_items(category)",
                    "CREATE INDEX IF NOT EXISTS idx_sci_fi_concepts_category ON sci_fi_concepts(category)",
                    "CREATE INDEX IF NOT EXISTS idx_manifestation_methods_category ON manifestation_methods(category)",
                    "CREATE INDEX IF NOT EXISTS idx_talents_category ON talents(category)"
                ]
                
                for index_sql in indexes:
                    connection.execute(text(index_sql))
                
                connection.commit()
            
            logger.info("All indexes created successfully")
            return True
        except Exception as e:
            logger.error(f"Failed to create indexes: {e}")
            return False
    
    def setup_database(self):
        """Set up the complete database schema"""
        try:
            if self.create_tables():
                if self.create_indexes():
                    logger.info("Database schema setup completed successfully")
                    return True
            return False
        except Exception as e:
            logger.error(f"Database setup failed: {e}")
            return False
    
    def get_session(self):
        """Get a new database session"""
        from .connection import get_session
        return get_session()

# Export the Base for use in other modules
__all__ = ['Base', 'User', 'IceBreakerQuestion', 'UserResponse', 'CareerMatch', 
           'GeneratedQuestion', 'DesignItem', 'SciFiConcept', 'ManifestationMethod', 
           'Talent', 'DatabaseSchema']
