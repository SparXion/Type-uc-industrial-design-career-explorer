#!/usr/bin/env python3
"""
Database initialization script for UCID App
Creates PostgreSQL database and initializes schema
"""

import psycopg2
from psycopg2 import sql
from psycopg2.extensions import ISOLATION_LEVEL_AUTOCOMMIT
import os
import sys

def create_database(db_name='ucid_app'):
    """Create the database if it doesn't exist"""
    try:
        # Connect to PostgreSQL server
        conn = psycopg2.connect(
            dbname='postgres',
            user=os.environ.get('DB_USER', 'postgres'),
            password=os.environ.get('DB_PASSWORD', ''),
            host=os.environ.get('DB_HOST', 'localhost'),
            port=os.environ.get('DB_PORT', '5432')
        )
        conn.set_isolation_level(ISOLATION_LEVEL_AUTOCOMMIT)
        cursor = conn.cursor()
        
        # Check if database exists
        cursor.execute("SELECT 1 FROM pg_database WHERE datname = %s", (db_name,))
        exists = cursor.fetchone()
        
        if not exists:
            cursor.execute(sql.SQL("CREATE DATABASE {}").format(
                sql.Identifier(db_name)
            ))
            print(f"✅ Database '{db_name}' created successfully")
        else:
            print(f"ℹ️  Database '{db_name}' already exists")
        
        cursor.close()
        conn.close()
        return True
        
    except Exception as e:
        print(f"❌ Error creating database: {e}")
        return False

def init_schema(db_name='ucid_app'):
    """Initialize database schema"""
    try:
        # Connect to the ucid_app database
        conn = psycopg2.connect(
            dbname=db_name,
            user=os.environ.get('DB_USER', 'postgres'),
            password=os.environ.get('DB_PASSWORD', ''),
            host=os.environ.get('DB_HOST', 'localhost'),
            port=os.environ.get('DB_PORT', '5432')
        )
        cursor = conn.cursor()
        
        # Read schema file
        schema_path = os.path.join(
            os.path.dirname(__file__), 
            '..', '..', 
            'Assets', 'DataSchemas', 
            'UCID-Database-Schema.txt'
        )
        
        if os.path.exists(schema_path):
            with open(schema_path, 'r') as f:
                schema_sql = f.read()
                cursor.execute(schema_sql)
                print("✅ Schema initialized from UCID-Database-Schema.txt")
        else:
            # Fallback schema if file not found
            print("⚠️  Schema file not found, using fallback schema")
            cursor.execute("""
                -- Create users table
                CREATE TABLE IF NOT EXISTS users (
                    id SERIAL PRIMARY KEY,
                    email VARCHAR(255) UNIQUE NOT NULL,
                    password_hash VARCHAR(255) NOT NULL,
                    first_name VARCHAR(100),
                    last_name VARCHAR(100),
                    student_id VARCHAR(50),
                    interests JSONB,
                    talents JSONB,
                    has_completed_onboarding BOOLEAN DEFAULT FALSE,
                    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
                );
                
                -- Create user_responses table
                CREATE TABLE IF NOT EXISTS user_responses (
                    id SERIAL PRIMARY KEY,
                    user_id INTEGER REFERENCES users(id) ON DELETE CASCADE,
                    question TEXT NOT NULL,
                    response TEXT NOT NULL,
                    category VARCHAR(50),
                    responded_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
                );
                
                -- Create career_matches table
                CREATE TABLE IF NOT EXISTS career_matches (
                    id SERIAL PRIMARY KEY,
                    user_id INTEGER REFERENCES users(id) ON DELETE CASCADE,
                    career_path VARCHAR(100) NOT NULL,
                    confidence_score NUMERIC,
                    skills JSONB,
                    design_categories JSONB,
                    matched_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
                );
                
                -- Create indexes
                CREATE INDEX IF NOT EXISTS idx_user_email ON users(email);
                CREATE INDEX IF NOT EXISTS idx_user_id ON user_responses(user_id);
                CREATE INDEX IF NOT EXISTS idx_career_user_id ON career_matches(user_id);
            """)
            print("✅ Fallback schema initialized successfully")
        
        conn.commit()
        cursor.close()
        conn.close()
        return True
        
    except Exception as e:
        print(f"❌ Error initializing schema: {e}")
        return False

def main():
    """Main initialization function"""
    print("🚀 Starting UCID App database initialization...")
    print("=" * 50)
    
    # Create database
    if not create_database():
        sys.exit(1)
    
    # Initialize schema
    if not init_schema():
        sys.exit(1)
    
    print("=" * 50)
    print("✅ Database initialization complete!")
    print("\nYou can now start the Flask backend with:")
    print("  cd backend && python app.py")

if __name__ == '__main__':
    main()

