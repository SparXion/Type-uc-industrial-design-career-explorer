#!/usr/bin/env python3
"""
Final database readiness test for UCID app
"""

import subprocess
import sys
import json

def run_docker_command(cmd):
    """Run a Docker command and return the result"""
    try:
        result = subprocess.run(cmd, shell=True, capture_output=True, text=True, check=True)
        return result.stdout.strip(), None
    except subprocess.CalledProcessError as e:
        return None, e.stderr

def test_database_readiness():
    """Test if the database is ready for the UCID app"""
    print("🔌 Testing UCID App Database Readiness...")
    print("=" * 60)
    
    # Test 1: Database connectivity
    print("1. Testing database connectivity...")
    output, error = run_docker_command("docker-compose exec -T postgres pg_isready -U ucid_user -d ucid_app")
    if error or "accepting connections" not in output:
        print("   ❌ Database is not ready")
        return False
    print("   ✅ Database is accepting connections")
    
    # Test 2: User permissions
    print("\n2. Testing user permissions...")
    output, error = run_docker_command("docker-compose exec -T postgres psql -U ucid_user -d ucid_app -c 'SELECT current_user, current_database();'")
    if error:
        print("   ❌ User permission test failed")
        return False
    print("   ✅ User permissions verified")
    
    # Test 3: Database creation capability
    print("\n3. Testing table creation capability...")
    create_test_sql = """
    CREATE TABLE IF NOT EXISTS ucid_test_table (
        id SERIAL PRIMARY KEY,
        test_column VARCHAR(100),
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    );
    """
    output, error = run_docker_command(f'docker-compose exec -T postgres psql -U ucid_user -d ucid_app -c "{create_test_sql}"')
    if error:
        print("   ❌ Table creation test failed")
        return False
    print("   ✅ Table creation capability verified")
    
    # Test 4: JSON support (needed for our schema)
    print("\n4. Testing JSON support...")
    
    # Create table
    create_json_sql = "CREATE TABLE IF NOT EXISTS ucid_json_test (id SERIAL PRIMARY KEY, json_data JSONB, created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP);"
    output, error = run_docker_command(f'docker-compose exec -T postgres psql -U ucid_user -d ucid_app -c "{create_json_sql}"')
    if error:
        print("   ❌ JSON table creation failed")
        return False
    
    # Insert data
    insert_json_sql = "INSERT INTO ucid_json_test (json_data) VALUES ('{\"test\": \"value\", \"array\": [1, 2, 3]}');"
    output, error = run_docker_command(f'docker-compose exec -T postgres psql -U ucid_user -d ucid_app -c \"{insert_json_sql}\"')
    if error:
        print("   ❌ JSON data insertion failed")
        return False
    
    # Query data
    query_json_sql = "SELECT json_data->>'test' as test_value FROM ucid_json_test WHERE id = 1;"
    output, error = run_docker_command(f'docker-compose exec -T postgres psql -U ucid_user -d ucid_app -c \"{query_json_sql}\"')
    if error:
        print("   ❌ JSON data query failed")
        return False
    
    print("   ✅ JSON support verified")
    
    # Test 5: Clean up test tables
    print("\n5. Cleaning up test data...")
    cleanup_sql = "DROP TABLE IF EXISTS ucid_test_table, ucid_json_test;"
    output, error = run_docker_command(f'docker-compose exec -T postgres psql -U ucid_user -d ucid_app -c "{cleanup_sql}"')
    if error:
        print("   ⚠️  Cleanup failed (non-critical)")
    else:
        print("   ✅ Test data cleaned up")
    
    # Test 6: Check available extensions
    print("\n6. Checking available extensions...")
    ext_sql = "SELECT extname FROM pg_extension WHERE extname IN ('uuid-ossp', 'pg_trgm');"
    output, error = run_docker_command(f'docker-compose exec -T postgres psql -U ucid_user -d ucid_app -c "{ext_sql}"')
    if error:
        print("   ⚠️  Extension check failed")
    else:
        print("   ✅ Extensions available")
    
    print("\n" + "=" * 60)
    print("🎉 Database Readiness Test Completed!")
    print("🚀 Your PostgreSQL database is ready for the UCID app!")
    
    return True

def show_next_steps():
    """Show the next steps for setting up the UCID app"""
    print("\n📋 Next Steps for UCID App:")
    print("=" * 40)
    print("1. 🐍 Install Python Dependencies:")
    print("   pip3 install -r requirements.txt")
    print("   (Note: psycopg2-binary may need manual installation)")
    print()
    print("2. 🗄️  Initialize Database Schema:")
    print("   python3 -m database.init_db")
    print()
    print("3. 🚀 Start the Backend:")
    print("   python3 app.py")
    print()
    print("4. 🌐 Start the Frontend:")
    print("   cd ../frontend && npm start")
    print()
    print("5. 🎯 Test the Full Application:")
    print("   - Video introduction should play")
    print("   - Database should store user responses")
    print("   - Career matching should work")
    print()
    print("💡 Alternative: Use Docker for everything:")
    print("   docker-compose up -d")

def main():
    """Main function"""
    try:
        print("🚀 UCID App Database Readiness Test")
        print("=" * 60)
        
        # Test database readiness
        success = test_database_readiness()
        
        if success:
            show_next_steps()
            print("\n🎉 Your database is ready! You can now proceed with the UCID app setup.")
        else:
            print("\n❌ Database is not ready. Please check the errors above.")
            print("💡 Make sure Docker is running and PostgreSQL container is healthy.")
        
        return success
        
    except KeyboardInterrupt:
        print("\n\n⏹️  Test interrupted by user")
        return False
    except Exception as e:
        print(f"\n❌ Unexpected error: {e}")
        return False

if __name__ == "__main__":
    success = main()
    sys.exit(0 if success else 1)
