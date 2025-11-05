"""
UCID Career Explorer Backend API
Flask + PostgreSQL + JWT Authentication
FERPA Compliant Student Data Management
"""

from flask import Flask, request, jsonify
from flask_cors import CORS
from werkzeug.security import generate_password_hash, check_password_hash
import jwt
import psycopg2
from psycopg2.extras import RealDictCursor
from datetime import datetime, timedelta
import os
from functools import wraps
import json

app = Flask(__name__)
CORS(app)

# Configuration
app.config['SECRET_KEY'] = os.environ.get('SECRET_KEY', 'ucid-dev-secret-key-change-in-production')
app.config['DATABASE_URL'] = os.environ.get('DATABASE_URL', 'postgresql://localhost/ucid_app')
app.config['JWT_EXPIRATION_HOURS'] = 24 * 7  # 7 days

# Database connection
def get_db_connection():
    """Create and return a database connection"""
    conn = psycopg2.connect(
        app.config['DATABASE_URL'],
        cursor_factory=RealDictCursor
    )
    return conn

# JWT token decorator
def token_required(f):
    """Decorator to protect routes with JWT authentication"""
    @wraps(f)
    def decorated(*args, **kwargs):
        token = request.headers.get('Authorization')
        
        if not token:
            return jsonify({'message': 'Token is missing'}), 401
        
        try:
            # Remove 'Bearer ' prefix if present
            if token.startswith('Bearer '):
                token = token[7:]
            
            data = jwt.decode(token, app.config['SECRET_KEY'], algorithms=['HS256'])
            current_user_id = data['user_id']
        except jwt.ExpiredSignatureError:
            return jsonify({'message': 'Token has expired'}), 401
        except jwt.InvalidTokenError:
            return jsonify({'message': 'Token is invalid'}), 401
        
        return f(current_user_id, *args, **kwargs)
    
    return decorated

# Initialize database
@app.route('/api/init-db', methods=['POST'])
def init_database():
    """Initialize database tables (development only)"""
    try:
        conn = get_db_connection()
        cursor = conn.cursor()
        
        # Read and execute schema file
        schema_path = os.path.join(os.path.dirname(__file__), '..', '..', 'Assets', 'DataSchemas', 'UCID-Database-Schema.txt')
        
        if os.path.exists(schema_path):
            with open(schema_path, 'r') as f:
                schema_sql = f.read()
                cursor.execute(schema_sql)
        else:
            # Fallback: Create basic tables
            cursor.execute("""
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
                
                CREATE TABLE IF NOT EXISTS user_responses (
                    id SERIAL PRIMARY KEY,
                    user_id INTEGER REFERENCES users(id),
                    question TEXT NOT NULL,
                    response TEXT NOT NULL,
                    category VARCHAR(50),
                    responded_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
                );
                
                CREATE TABLE IF NOT EXISTS career_matches (
                    id SERIAL PRIMARY KEY,
                    user_id INTEGER REFERENCES users(id),
                    career_path VARCHAR(100) NOT NULL,
                    confidence_score NUMERIC,
                    skills JSONB,
                    matched_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
                );
            """)
        
        conn.commit()
        cursor.close()
        conn.close()
        
        return jsonify({'message': 'Database initialized successfully'}), 200
    
    except Exception as e:
        return jsonify({'message': f'Database initialization failed: {str(e)}'}), 500

# Authentication routes
@app.route('/api/auth/signup', methods=['POST'])
def signup():
    """Register a new user"""
    try:
        data = request.json
        
        # Validate required fields
        if not data.get('email') or not data.get('password'):
            return jsonify({'message': 'Email and password are required'}), 400
        
        # Hash password
        password_hash = generate_password_hash(data['password'])
        
        conn = get_db_connection()
        cursor = conn.cursor()
        
        # Check if user already exists
        cursor.execute('SELECT id FROM users WHERE email = %s', (data['email'],))
        existing_user = cursor.fetchone()
        
        if existing_user:
            cursor.close()
            conn.close()
            return jsonify({'message': 'User already exists'}), 409
        
        # Create new user
        cursor.execute("""
            INSERT INTO users (email, password_hash, first_name, last_name, student_id)
            VALUES (%s, %s, %s, %s, %s)
            RETURNING id, email, first_name, last_name, student_id
        """, (
            data['email'],
            password_hash,
            data.get('firstName', ''),
            data.get('lastName', ''),
            data.get('studentId', '')
        ))
        
        new_user = cursor.fetchone()
        conn.commit()
        
        # Generate JWT token
        token = jwt.encode({
            'user_id': new_user['id'],
            'email': new_user['email'],
            'exp': datetime.utcnow() + timedelta(hours=app.config['JWT_EXPIRATION_HOURS'])
        }, app.config['SECRET_KEY'], algorithm='HS256')
        
        cursor.close()
        conn.close()
        
        return jsonify({
            'message': 'User created successfully',
            'token': token,
            'userId': new_user['id'],
            'userData': {
                'email': new_user['email'],
                'firstName': new_user['first_name'],
                'lastName': new_user['last_name'],
                'studentId': new_user['student_id'],
                'hasCompletedOnboarding': False
            }
        }), 201
    
    except Exception as e:
        return jsonify({'message': f'Signup failed: {str(e)}'}), 500

@app.route('/api/auth/login', methods=['POST'])
def login():
    """Authenticate user and return JWT token"""
    try:
        data = request.json
        
        if not data.get('email') or not data.get('password'):
            return jsonify({'message': 'Email and password are required'}), 400
        
        conn = get_db_connection()
        cursor = conn.cursor()
        
        # Find user
        cursor.execute("""
            SELECT id, email, password_hash, first_name, last_name, 
                   student_id, has_completed_onboarding
            FROM users WHERE email = %s
        """, (data['email'],))
        
        user = cursor.fetchone()
        
        if not user or not check_password_hash(user['password_hash'], data['password']):
            cursor.close()
            conn.close()
            return jsonify({'message': 'Invalid email or password'}), 401
        
        # Generate JWT token
        token = jwt.encode({
            'user_id': user['id'],
            'email': user['email'],
            'exp': datetime.utcnow() + timedelta(hours=app.config['JWT_EXPIRATION_HOURS'])
        }, app.config['SECRET_KEY'], algorithm='HS256')
        
        cursor.close()
        conn.close()
        
        return jsonify({
            'message': 'Login successful',
            'token': token,
            'userId': user['id'],
            'userData': {
                'email': user['email'],
                'firstName': user['first_name'],
                'lastName': user['last_name'],
                'studentId': user['student_id'],
                'hasCompletedOnboarding': user['has_completed_onboarding']
            }
        }), 200
    
    except Exception as e:
        return jsonify({'message': f'Login failed: {str(e)}'}), 500

# User profile routes
@app.route('/api/user/profile', methods=['GET'])
@token_required
def get_profile(current_user_id):
    """Get user profile"""
    try:
        conn = get_db_connection()
        cursor = conn.cursor()
        
        cursor.execute("""
            SELECT id, email, first_name, last_name, student_id, 
                   interests, talents, has_completed_onboarding, created_at
            FROM users WHERE id = %s
        """, (current_user_id,))
        
        user = cursor.fetchone()
        cursor.close()
        conn.close()
        
        if not user:
            return jsonify({'message': 'User not found'}), 404
        
        return jsonify({
            'user': dict(user)
        }), 200
    
    except Exception as e:
        return jsonify({'message': f'Failed to fetch profile: {str(e)}'}), 500

@app.route('/api/user/profile', methods=['PUT'])
@token_required
def update_profile(current_user_id):
    """Update user profile"""
    try:
        data = request.json
        
        conn = get_db_connection()
        cursor = conn.cursor()
        
        cursor.execute("""
            UPDATE users 
            SET first_name = %s, last_name = %s, student_id = %s,
                interests = %s, talents = %s, has_completed_onboarding = %s
            WHERE id = %s
            RETURNING id, email, first_name, last_name, student_id
        """, (
            data.get('firstName'),
            data.get('lastName'),
            data.get('studentId'),
            json.dumps(data.get('interests', {})),
            json.dumps(data.get('talents', {})),
            data.get('hasCompletedOnboarding', False),
            current_user_id
        ))
        
        updated_user = cursor.fetchone()
        conn.commit()
        cursor.close()
        conn.close()
        
        return jsonify({
            'message': 'Profile updated successfully',
            'user': dict(updated_user)
        }), 200
    
    except Exception as e:
        return jsonify({'message': f'Failed to update profile: {str(e)}'}), 500

# Response management routes
@app.route('/api/responses', methods=['POST'])
@token_required
def save_response(current_user_id):
    """Save user response to a question"""
    try:
        data = request.json
        
        conn = get_db_connection()
        cursor = conn.cursor()
        
        cursor.execute("""
            INSERT INTO user_responses (user_id, question, response, category)
            VALUES (%s, %s, %s, %s)
            RETURNING id, responded_at
        """, (
            current_user_id,
            data.get('question'),
            data.get('response'),
            data.get('category')
        ))
        
        new_response = cursor.fetchone()
        conn.commit()
        cursor.close()
        conn.close()
        
        return jsonify({
            'message': 'Response saved successfully',
            'responseId': new_response['id'],
            'timestamp': new_response['responded_at'].isoformat()
        }), 201
    
    except Exception as e:
        return jsonify({'message': f'Failed to save response: {str(e)}'}), 500

@app.route('/api/responses', methods=['GET'])
@token_required
def get_responses(current_user_id):
    """Get all user responses"""
    try:
        conn = get_db_connection()
        cursor = conn.cursor()
        
        cursor.execute("""
            SELECT id, question, response, category, responded_at
            FROM user_responses
            WHERE user_id = %s
            ORDER BY responded_at DESC
        """, (current_user_id,))
        
        responses = cursor.fetchall()
        cursor.close()
        conn.close()
        
        return jsonify({
            'responses': [dict(r) for r in responses]
        }), 200
    
    except Exception as e:
        return jsonify({'message': f'Failed to fetch responses: {str(e)}'}), 500

# Career matching routes
@app.route('/api/careers/match', methods=['POST'])
@token_required
def match_careers(current_user_id):
    """Generate career matches based on user responses"""
    try:
        data = request.json
        
        # TODO: Implement sophisticated matching algorithm
        # For now, return mock matches
        
        conn = get_db_connection()
        cursor = conn.cursor()
        
        # Save career match
        cursor.execute("""
            INSERT INTO career_matches (user_id, career_path, confidence_score, skills)
            VALUES (%s, %s, %s, %s)
            RETURNING id
        """, (
            current_user_id,
            data.get('careerPath', 'Product Design'),
            data.get('confidence', 0.85),
            json.dumps(data.get('skills', []))
        ))
        
        match_id = cursor.fetchone()['id']
        conn.commit()
        cursor.close()
        conn.close()
        
        return jsonify({
            'message': 'Career matches generated',
            'matchId': match_id
        }), 201
    
    except Exception as e:
        return jsonify({'message': f'Failed to generate matches: {str(e)}'}), 500

@app.route('/api/careers/matches', methods=['GET'])
@token_required
def get_career_matches(current_user_id):
    """Get all career matches for user"""
    try:
        conn = get_db_connection()
        cursor = conn.cursor()
        
        cursor.execute("""
            SELECT id, career_path, confidence_score, skills, matched_at
            FROM career_matches
            WHERE user_id = %s
            ORDER BY confidence_score DESC, matched_at DESC
        """, (current_user_id,))
        
        matches = cursor.fetchall()
        cursor.close()
        conn.close()
        
        return jsonify({
            'matches': [dict(m) for m in matches]
        }), 200
    
    except Exception as e:
        return jsonify({'message': f'Failed to fetch matches: {str(e)}'}), 500

# Health check
@app.route('/api/health', methods=['GET'])
def health_check():
    """API health check"""
    return jsonify({
        'status': 'healthy',
        'timestamp': datetime.utcnow().isoformat()
    }), 200

if __name__ == '__main__':
    app.run(host='0.0.0.0', port=5000, debug=True)

