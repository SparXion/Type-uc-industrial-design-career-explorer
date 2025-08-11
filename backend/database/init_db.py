#!/usr/bin/env python3
"""
Database initialization script for UC Industrial Design Career Explorer
Run this script to set up the database schema, indexes, and sample data
"""

import os
import sys
import logging
from pathlib import Path

# Add the backend directory to the Python path
backend_dir = Path(__file__).parent.parent
sys.path.insert(0, str(backend_dir))

from database.schema import setup_database
from database.connection import db_connection

# Configure logging
logging.basicConfig(
    level=logging.INFO,
    format='%(asctime)s - %(name)s - %(levelname)s - %(message)s'
)
logger = logging.getLogger(__name__)

def main():
    """Main function to initialize the database"""
    logger.info("Starting database initialization...")
    
    # Check if MongoDB is running
    try:
        # Try to connect to MongoDB
        if not db_connection.connect():
            logger.error("Failed to connect to MongoDB. Please ensure MongoDB is running.")
            logger.info("To start MongoDB with Docker: docker-compose up -d mongodb")
            return False
        
        logger.info("Successfully connected to MongoDB")
        
        # Set up database schema and indexes
        logger.info("Setting up database schema...")
        if setup_database():
            logger.info("Database initialization completed successfully!")
            
            # Display database status
            health_status = db_connection.health_check()
            logger.info(f"Database health: {health_status['status']}")
            
            if health_status['status'] == 'healthy':
                logger.info(f"Database: {health_status['database']}")
                logger.info(f"Collections: {health_status['collections']}")
                logger.info(f"Data size: {health_status['data_size_mb']} MB")
            
            return True
        else:
            logger.error("Database initialization failed!")
            return False
            
    except Exception as e:
        logger.error(f"Unexpected error during database initialization: {e}")
        return False
    finally:
        # Close the connection
        db_connection.disconnect()

if __name__ == "__main__":
    success = main()
    sys.exit(0 if success else 1)
