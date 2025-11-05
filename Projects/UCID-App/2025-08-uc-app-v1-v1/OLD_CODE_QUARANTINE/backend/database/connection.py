import os
import logging
from typing import Optional
from contextlib import contextmanager
from sqlalchemy import create_engine, text
from sqlalchemy.orm import sessionmaker, Session
from sqlalchemy.exc import SQLAlchemyError, OperationalError
import asyncpg

# Configure logging
logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)

class DatabaseConnection:
    """PostgreSQL connection manager with connection pooling and error handling"""
    
    def __init__(self):
        self.engine = None
        self.SessionLocal = None
        self.connection_string = os.getenv('DATABASE_URL', 'postgresql://localhost:5432/ucid_app')
        self.database_name = os.getenv('POSTGRES_DB', 'ucid_app')
        self.max_pool_size = int(os.getenv('POSTGRES_MAX_POOL_SIZE', '20'))
        self.pool_timeout = int(os.getenv('POSTGRES_POOL_TIMEOUT', '30'))
        
    def connect(self) -> bool:
        """Establish connection to PostgreSQL"""
        try:
            # Create SQLAlchemy engine with connection pooling
            self.engine = create_engine(
                self.connection_string,
                pool_size=self.max_pool_size,
                max_overflow=0,
                pool_timeout=self.pool_timeout,
                pool_pre_ping=True,
                echo=False  # Set to True for SQL query logging
            )
            
            # Test connection
            with self.engine.connect() as connection:
                connection.execute(text("SELECT 1"))
            
            # Create session factory
            self.SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=self.engine)
            
            logger.info(f"Successfully connected to PostgreSQL database: {self.database_name}")
            return True
            
        except (OperationalError, SQLAlchemyError) as e:
            logger.error(f"Failed to connect to PostgreSQL: {e}")
            return False
        except Exception as e:
            logger.error(f"Unexpected error connecting to PostgreSQL: {e}")
            return False
    
    def disconnect(self):
        """Close PostgreSQL connection"""
        if self.engine:
            self.engine.dispose()
            self.engine = None
            self.SessionLocal = None
            logger.info("PostgreSQL connection closed")
    
    def get_engine(self):
        """Get the SQLAlchemy engine instance"""
        if self.engine is None and not self.connect():
            return None
        return self.engine
    
    def get_session(self) -> Optional[Session]:
        """Get a new database session"""
        if self.SessionLocal is None and not self.connect():
            return None
        return self.SessionLocal()
    
    def health_check(self) -> dict:
        """Check database health and return status"""
        try:
            if not self.engine:
                return {
                    'status': 'disconnected',
                    'message': 'No active connection',
                    'timestamp': None
                }
            
            # Test connection with simple query
            start_time = time.time()
            with self.engine.connect() as connection:
                result = connection.execute(text("SELECT version(), current_database(), current_user"))
                row = result.fetchone()
            
            response_time = (time.time() - start_time) * 1000
            
            # Get database stats
            with self.engine.connect() as connection:
                # Get table count
                table_count = connection.execute(text("""
                    SELECT COUNT(*) as table_count 
                    FROM information_schema.tables 
                    WHERE table_schema = 'public'
                """)).fetchone()[0]
                
                # Get database size
                db_size = connection.execute(text("""
                    SELECT pg_size_pretty(pg_database_size(current_database())) as db_size
                """)).fetchone()[0]
            
            return {
                'status': 'healthy',
                'message': 'Database connection successful',
                'response_time_ms': round(response_time, 2),
                'database': self.database_name,
                'postgres_version': row[0].split()[1] if row[0] else 'Unknown',
                'current_user': row[2] if row[2] else 'Unknown',
                'tables': table_count,
                'database_size': db_size,
                'timestamp': datetime.utcnow().isoformat()
            }
            
        except Exception as e:
            return {
                'status': 'unhealthy',
                'message': f'Health check failed: {str(e)}',
                'timestamp': datetime.utcnow().isoformat()
            }
    
    @contextmanager
    def get_session_context(self):
        """Context manager for database sessions"""
        session = self.get_session()
        try:
            yield session
        except Exception as e:
            session.rollback()
            logger.error(f"Database operation failed: {e}")
            raise
        finally:
            session.close()

# Global database connection instance
db_connection = DatabaseConnection()

def get_engine():
    """Get SQLAlchemy engine instance"""
    return db_connection.get_engine()

def get_session() -> Optional[Session]:
    """Get database session"""
    return db_connection.get_session()

def health_check() -> dict:
    """Check database health"""
    return db_connection.health_check()

# Import time and datetime for health check
import time
from datetime import datetime
