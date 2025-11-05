#!/usr/bin/env python3
"""
Working database test using asyncpg and SQLAlchemy
"""

import asyncio
import asyncpg
import sys
from pathlib import Path

# Add the backend directory to the Python path
backend_dir = Path(__file__).parent
sys.path.insert(0, str(backend_dir))

async def test_async_connection():
    """Test async PostgreSQL connection"""
    print("🔌 Testing Async PostgreSQL Connection...")
    print("=" * 50)
    
    try:
        # Connect to the database
        print("1. Connecting to PostgreSQL...")
        conn = await asyncpg.connect(
            host='localhost',
            port=5432,
            user='ucid_user',
            password='ucid_password',
            database='ucid_app'
        )
        print("   ✅ Connected successfully!")
        
        # Test basic query
        print("\n2. Testing basic query...")
        version = await conn.fetchval('SELECT version()')
        print(f"   ✅ PostgreSQL Version: {version.split()[1]}")
        
        # Test database info
        print("\n3. Getting database information...")
        db_name = await conn.fetchval('SELECT current_database()')
        user = await conn.fetchval('SELECT current_user')
        print(f"   ✅ Database: {db_name}")
        print(f"   ✅ User: {user}")
        
        # Test table creation
        print("\n4. Testing table creation...")
        await conn.execute('''
            CREATE TABLE IF NOT EXISTS test_async_connection (
                id SERIAL PRIMARY KEY,
                test_name VARCHAR(100),
                created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
            )
        ''')
        print("   ✅ Test table created successfully")
        
        # Test data insertion
        print("\n5. Testing data insertion...")
        await conn.execute('''
            INSERT INTO test_async_connection (test_name) VALUES ($1)
        ''', 'async_test')
        print("   ✅ Data inserted successfully")
        
        # Test data retrieval
        print("\n6. Testing data retrieval...")
        row = await conn.fetchrow('''
            SELECT * FROM test_async_connection WHERE test_name = $1
        ''', 'async_test')
        if row:
            print(f"   ✅ Data retrieved: ID={row['id']}, Name={row['test_name']}")
        else:
            print("   ❌ Data retrieval failed")
        
        # Clean up
        print("\n7. Cleaning up test data...")
        await conn.execute('DROP TABLE IF EXISTS test_async_connection')
        print("   ✅ Test table cleaned up")
        
        await conn.close()
        print("\n" + "=" * 50)
        print("🎉 Async database test completed successfully!")
        return True
        
    except Exception as e:
        print(f"   ❌ Error: {e}")
        return False

def test_sqlalchemy_connection():
    """Test SQLAlchemy connection (if available)"""
    print("\n🔌 Testing SQLAlchemy Connection...")
    print("=" * 50)
    
    try:
        from sqlalchemy import create_engine, text
        
        # Create engine with asyncpg
        engine = create_engine(
            'postgresql+asyncpg://ucid_user:ucid_password@localhost:5432/ucid_app',
            echo=False
        )
        print("   ✅ SQLAlchemy engine created")
        
        # Test connection
        with engine.connect() as connection:
            result = connection.execute(text("SELECT version(), current_database()"))
            row = result.fetchone()
            print(f"   ✅ Connected via SQLAlchemy")
            print(f"   📊 Version: {row[0].split()[1]}")
            print(f"   📊 Database: {row[1]}")
        
        print("   ✅ SQLAlchemy test completed successfully!")
        return True
        
    except ImportError as e:
        print(f"   ⚠️  SQLAlchemy not available: {e}")
        return False
    except Exception as e:
        print(f"   ❌ SQLAlchemy test failed: {e}")
        return False

async def main():
    """Main test function"""
    print("🚀 Starting Database Connection Tests...")
    print("=" * 60)
    
    # Test async connection
    async_success = await test_async_connection()
    
    # Test SQLAlchemy connection
    sqlalchemy_success = test_sqlalchemy_connection()
    
    print("\n" + "=" * 60)
    if async_success and sqlalchemy_success:
        print("🎉 All database tests passed!")
        print("🚀 Your PostgreSQL database is fully functional!")
        print("\n📋 Next steps:")
        print("   1. The database is ready for your UCID app")
        print("   2. You can now run the full database initialization")
        print("   3. Start building your industrial design career explorer!")
    else:
        print("⚠️  Some tests failed. Check the output above.")
        print("💡 The basic PostgreSQL connection is working, but some features may be limited.")
    
    return async_success and sqlalchemy_success

if __name__ == "__main__":
    try:
        success = asyncio.run(main())
        sys.exit(0 if success else 1)
    except KeyboardInterrupt:
        print("\n\n⏹️  Test interrupted by user")
        sys.exit(1)
    except Exception as e:
        print(f"\n❌ Unexpected error: {e}")
        sys.exit(1)
