from pymongo import MongoClient
from pymongo.database import Database
from pymongo.collection import Collection
from pymongo.errors import ConnectionFailure, ServerSelectionTimeoutError
import os
import logging
from typing import Optional
from contextlib import contextmanager

# Configure logging
logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)

class DatabaseConnection:
    """MongoDB connection manager with connection pooling and error handling"""
    
    def __init__(self):
        self.client: Optional[MongoClient] = None
        self.database: Optional[Database] = None
        self.connection_string = os.getenv('MONGODB_URI', 'mongodb://localhost:27017/uc_industrial_design')
        self.database_name = os.getenv('MONGODB_DATABASE', 'uc_industrial_design')
        self.max_pool_size = int(os.getenv('MONGODB_MAX_POOL_SIZE', '50'))
        self.server_selection_timeout = int(os.getenv('MONGODB_TIMEOUT', '5000'))
        
    def connect(self) -> bool:
        """Establish connection to MongoDB"""
        try:
            # Connection options
            connection_options = {
                'maxPoolSize': self.max_pool_size,
                'serverSelectionTimeoutMS': self.server_selection_timeout,
                'connectTimeoutMS': 10000,
                'socketTimeoutMS': 30000,
                'retryWrites': True,
                'w': 'majority'
            }
            
            # Create client
            self.client = MongoClient(self.connection_string, **connection_options)
            
            # Test connection
            self.client.admin.command('ping')
            
            # Get database
            self.database = self.client[self.database_name]
            
            logger.info(f"Successfully connected to MongoDB database: {self.database_name}")
            return True
            
        except (ConnectionFailure, ServerSelectionTimeoutError) as e:
            logger.error(f"Failed to connect to MongoDB: {e}")
            return False
        except Exception as e:
            logger.error(f"Unexpected error connecting to MongoDB: {e}")
            return False
    
    def disconnect(self):
        """Close MongoDB connection"""
        if self.client:
            self.client.close()
            self.client = None
            self.database = None
            logger.info("MongoDB connection closed")
    
    def get_database(self) -> Optional[Database]:
        """Get the database instance"""
        if self.database is None and not self.connect():
            return None
        return self.database
    
    def get_collection(self, collection_name: str) -> Optional[Collection]:
        """Get a collection from the database"""
        database = self.get_database()
        if database is not None:
            return database[collection_name]
        return None
    
    def health_check(self) -> dict:
        """Check database health and return status"""
        try:
            if not self.client:
                return {
                    'status': 'disconnected',
                    'message': 'No active connection',
                    'timestamp': None
                }
            
            # Test connection with ping
            start_time = time.time()
            self.client.admin.command('ping')
            response_time = (time.time() - start_time) * 1000
            
            # Get database stats
            db_stats = self.database.command('dbStats')
            
            return {
                'status': 'healthy',
                'message': 'Database connection successful',
                'response_time_ms': round(response_time, 2),
                'database': self.database_name,
                'collections': db_stats.get('collections', 0),
                'data_size_mb': round(db_stats.get('dataSize', 0) / (1024 * 1024), 2),
                'storage_size_mb': round(db_stats.get('storageSize', 0) / (1024 * 1024), 2),
                'timestamp': datetime.utcnow().isoformat()
            }
            
        except Exception as e:
            return {
                'status': 'unhealthy',
                'message': f'Health check failed: {str(e)}',
                'timestamp': datetime.utcnow().isoformat()
            }
    
    @contextmanager
    def get_connection(self):
        """Context manager for database connections"""
        try:
            if not self.database and not self.connect():
                raise ConnectionError("Failed to connect to database")
            yield self.database
        except Exception as e:
            logger.error(f"Database operation failed: {e}")
            raise
        finally:
            # Connection pooling handles cleanup automatically
            pass

# Global database connection instance
db_connection = DatabaseConnection()

def get_db() -> Optional[Database]:
    """Get database instance"""
    return db_connection.get_database()

def get_collection(collection_name: str) -> Optional[Collection]:
    """Get collection instance"""
    return db_connection.get_collection(collection_name)

def health_check() -> dict:
    """Check database health"""
    return db_connection.health_check()

# Import time and datetime for health check
import time
from datetime import datetime
