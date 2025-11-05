#!/usr/bin/env python3
"""
Simple PostgreSQL connection test using Docker
"""

import subprocess
import sys
import time

def run_docker_command(cmd):
    """Run a Docker command and return the result"""
    try:
        result = subprocess.run(cmd, shell=True, capture_output=True, text=True, check=True)
        return result.stdout.strip(), None
    except subprocess.CalledProcessError as e:
        return None, e.stderr

def test_postgres_connection():
    """Test PostgreSQL connection through Docker"""
    print("🔌 Testing PostgreSQL Database Connection via Docker...")
    print("=" * 60)
    
    # Test 1: Check if PostgreSQL container is running
    print("1. Checking PostgreSQL container status...")
    output, error = run_docker_command("docker-compose ps postgres")
    if error:
        print(f"   ❌ Failed to check container status: {error}")
        return False
    
    if "Up" in output:
        print("   ✅ PostgreSQL container is running")
    else:
        print("   ❌ PostgreSQL container is not running")
        print(f"   📋 Container status: {output}")
        return False
    
    # Test 2: Check if PostgreSQL is accepting connections
    print("\n2. Testing PostgreSQL connection readiness...")
    output, error = run_docker_command("docker-compose exec -T postgres pg_isready -U ucid_user -d ucid_app")
    if error:
        print(f"   ❌ PostgreSQL is not ready: {error}")
        return False
    
    if "accepting connections" in output:
        print("   ✅ PostgreSQL is accepting connections")
    else:
        print("   ❌ PostgreSQL is not ready")
        print(f"   📋 Status: {output}")
        return False
    
    # Test 3: Test basic SQL query
    print("\n3. Testing basic SQL query...")
    sql_query = "SELECT version(), current_database(), current_user, current_timestamp;"
    output, error = run_docker_command(f'docker-compose exec -T postgres psql -U ucid_user -d ucid_app -c "{sql_query}"')
    if error:
        print(f"   ❌ SQL query failed: {error}")
        return False
    
    if "PostgreSQL" in output:
        print("   ✅ SQL query executed successfully")
        # Parse the output to show version and database info
        lines = output.strip().split('\n')
        for line in lines:
            if 'PostgreSQL' in line:
                version = line.split()[1]
                print(f"      📊 PostgreSQL Version: {version}")
            elif 'ucid_app' in line:
                print(f"      📊 Database: ucid_app")
            elif 'ucid_user' in line:
                print(f"      📊 User: ucid_user")
    else:
        print("   ❌ Unexpected SQL output")
        print(f"   📋 Output: {output}")
        return False
    
    # Test 4: Check database size and table count
    print("\n4. Checking database statistics...")
    stats_query = """
    SELECT 
        COUNT(*) as table_count,
        pg_size_pretty(pg_database_size(current_database())) as db_size
    FROM information_schema.tables 
    WHERE table_schema = 'public';
    """
    output, error = run_docker_command(f'docker-compose exec -T postgres psql -U ucid_user -d ucid_app -c "{stats_query}"')
    if error:
        print(f"   ❌ Statistics query failed: {error}")
        return False
    
    if "table_count" in output:
        print("   ✅ Database statistics retrieved")
        lines = output.strip().split('\n')
        for line in lines:
            if 'table_count' in line or 'db_size' in line:
                print(f"      📊 {line.strip()}")
    else:
        print("   ❌ Statistics query failed")
        print(f"   📋 Output: {output}")
    
    # Test 5: Test creating a simple table
    print("\n5. Testing table creation capability...")
    create_table_sql = """
    CREATE TABLE IF NOT EXISTS test_connection (
        id SERIAL PRIMARY KEY,
        test_name VARCHAR(100),
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    );
    """
    output, error = run_docker_command(f'docker-compose exec -T postgres psql -U ucid_user -d ucid_app -c "{create_table_sql}"')
    if error:
        print(f"   ❌ Table creation failed: {error}")
        return False
    
    if "CREATE TABLE" in output or "already exists" in output:
        print("   ✅ Table creation test passed")
    else:
        print("   ❌ Table creation test failed")
        print(f"   📋 Output: {output}")
    
    # Test 6: Clean up test table
    print("\n6. Cleaning up test table...")
    drop_table_sql = "DROP TABLE IF EXISTS test_connection;"
    output, error = run_docker_command(f'docker-compose exec -T postgres psql -U ucid_user -d ucid_app -c "{drop_table_sql}"')
    if error:
        print(f"   ⚠️  Failed to clean up test table: {error}")
    else:
        print("   ✅ Test table cleaned up")
    
    print("\n" + "=" * 60)
    print("🎉 Database connection test completed successfully!")
    print("🚀 Your PostgreSQL database is ready to use!")
    print("\n📋 Connection Details:")
    print("   Host: localhost")
    print("   Port: 5432")
    print("   Database: ucid_app")
    print("   Username: ucid_user")
    print("   Password: ucid_password")
    print("\n🔧 Next steps:")
    print("   1. Install Python dependencies: pip3 install -r requirements.txt")
    print("   2. Run database initialization: python3 -m database.init_db")
    print("   3. Start your Flask backend")
    
    return True

if __name__ == "__main__":
    try:
        success = test_postgres_connection()
        sys.exit(0 if success else 1)
    except KeyboardInterrupt:
        print("\n\n⏹️  Test interrupted by user")
        sys.exit(1)
    except Exception as e:
        print(f"\n❌ Unexpected error: {e}")
        sys.exit(1)
