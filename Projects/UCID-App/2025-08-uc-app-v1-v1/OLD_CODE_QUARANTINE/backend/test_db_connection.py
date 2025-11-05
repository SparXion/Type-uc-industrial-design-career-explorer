#!/usr/bin/env python3
"""
Test script to verify PostgreSQL database connection
"""

import os
import sys
from pathlib import Path

# Add the backend directory to the Python path
backend_dir = Path(__file__).parent
sys.path.insert(0, str(backend_dir))

try:
    from database.connection import get_engine, health_check
    from database.schema import DatabaseSchema
    
    print("🔌 Testing PostgreSQL Database Connection...")
    print("=" * 50)
    
    # Test 1: Get database engine
    print("1. Testing database engine connection...")
    engine = get_engine()
    if engine:
        print("   ✅ Database engine created successfully")
    else:
        print("   ❌ Failed to create database engine")
        sys.exit(1)
    
    # Test 2: Test basic connection
    print("\n2. Testing basic database connection...")
    try:
        with engine.connect() as connection:
            result = connection.execute("SELECT version(), current_database(), current_user")
            row = result.fetchone()
            print(f"   ✅ Connected to PostgreSQL {row[0].split()[1]}")
            print(f"   ✅ Database: {row[1]}")
            print(f"   ✅ User: {row[2]}")
    except Exception as e:
        print(f"   ❌ Connection failed: {e}")
        sys.exit(1)
    
    # Test 3: Health check
    print("\n3. Testing database health check...")
    health_status = health_check()
    if health_status['status'] == 'healthy':
        print("   ✅ Database health check passed")
        print(f"   📊 Tables: {health_status.get('tables', 'N/A')}")
        print(f"   📊 Size: {health_status.get('database_size', 'N/A')}")
    else:
        print(f"   ❌ Health check failed: {health_status['message']}")
    
    # Test 4: Schema creation
    print("\n4. Testing database schema creation...")
    try:
        schema = DatabaseSchema()
        # Just test if we can create the schema object
        print("   ✅ Database schema object created successfully")
        
        # Test table creation (this will create the tables)
        if schema.create_tables():
            print("   ✅ Database tables created successfully")
        else:
            print("   ❌ Failed to create database tables")
            sys.exit(1)
            
    except Exception as e:
        print(f"   ❌ Schema creation failed: {e}")
        sys.exit(1)
    
    # Test 5: Verify tables exist
    print("\n5. Verifying tables were created...")
    try:
        with engine.connect() as connection:
            result = connection.execute("""
                SELECT table_name 
                FROM information_schema.tables 
                WHERE table_schema = 'public' 
                ORDER BY table_name
            """)
            tables = [row[0] for row in result.fetchall()]
            
            expected_tables = [
                'users', 'ice_breaker_questions', 'user_responses', 
                'career_matches', 'generated_questions', 'design_items',
                'sci_fi_concepts', 'manifestation_methods', 'talents'
            ]
            
            print(f"   📋 Found {len(tables)} tables:")
            for table in tables:
                status = "✅" if table in expected_tables else "❓"
                print(f"      {status} {table}")
                
            missing_tables = set(expected_tables) - set(tables)
            if missing_tables:
                print(f"   ⚠️  Missing tables: {', '.join(missing_tables)}")
            else:
                print("   ✅ All expected tables are present")
                
    except Exception as e:
        print(f"   ❌ Table verification failed: {e}")
        sys.exit(1)
    
    print("\n" + "=" * 50)
    print("🎉 Database connection test completed successfully!")
    print("🚀 Your PostgreSQL database is ready to use!")
    
except ImportError as e:
    print(f"❌ Import error: {e}")
    print("💡 Make sure you're running this from the backend directory")
    sys.exit(1)
except Exception as e:
    print(f"❌ Unexpected error: {e}")
    sys.exit(1)
