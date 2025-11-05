"""
Simple Flask backend for testing registration functionality
"""

from flask import Flask, request, jsonify
from flask_cors import CORS
from werkzeug.security import generate_password_hash, check_password_hash
import os
from datetime import datetime

app = Flask(__name__)
CORS(app)

# In-memory storage for testing (replace with database later)
users = []

@app.route('/api/health')
def health_check():
    """Health check endpoint"""
    return jsonify({
        'status': 'healthy',
        'service': 'UC Industrial Design Career Explorer API',
        'version': '1.0.0'
    })

@app.route('/api/auth/register', methods=['POST'])
def register():
    """User registration endpoint"""
    try:
        data = request.get_json()
        
        # Validate required fields
        required_fields = ['username', 'email', 'password', 'user_type']
        for field in required_fields:
            if field not in data:
                return jsonify({'error': f'Missing required field: {field}'}), 400
        
        username = data['username']
        email = data['email']
        password = data['password']
        user_type = data['user_type']
        
        # Check if user already exists
        existing_user = next((u for u in users if u['username'] == username or u['email'] == email), None)
        if existing_user:
            if existing_user['username'] == username:
                return jsonify({'error': 'Username already exists'}), 409
            else:
                return jsonify({'error': 'Email already exists'}), 409
        
        # Hash password and create user
        hashed_password = generate_password_hash(password)
        user_data = {
            'id': len(users) + 1,
            'username': username,
            'email': email,
            'password_hash': hashed_password,
            'user_type': user_type,
            'is_active': True,
            'created_at': datetime.utcnow().isoformat(),
            'updated_at': datetime.utcnow().isoformat()
        }
        
        users.append(user_data)
        
        # Remove password hash from response
        response_data = {k: v for k, v in user_data.items() if k != 'password_hash'}
        
        return jsonify({
            'message': 'User registered successfully',
            'user': response_data
        }), 201
        
    except Exception as e:
        print(f"Registration error: {e}")
        return jsonify({'error': 'Registration failed. Please try again.'}), 500

@app.route('/api/auth/login', methods=['POST'])
def login():
    """User login endpoint"""
    try:
        data = request.get_json()
        
        username = data.get('username')
        password = data.get('password')
        
        if not username or not password:
            return jsonify({'error': 'Username and password are required'}), 400
        
        # Find user by username
        user = next((u for u in users if u['username'] == username and u['is_active']), None)
        
        if not user:
            return jsonify({'error': 'Invalid credentials'}), 401
        
        # Verify password
        if not check_password_hash(user['password_hash'], password):
            return jsonify({'error': 'Invalid credentials'}), 401
        
        # Create simple token (replace with JWT later)
        token = f"token_{user['id']}_{datetime.utcnow().timestamp()}"
        
        # Remove password hash from response
        user_data = {
            'username': user['username'],
            'email': user['email'],
            'user_type': user['user_type'],
            'created_at': user['created_at']
        }
        
        return jsonify({
            'message': 'Login successful',
            'access_token': token,
            'refresh_token': token,
            'user': user_data
        }), 200
        
    except Exception as e:
        print(f"Login error: {e}")
        return jsonify({'error': 'Login failed. Please try again.'}), 500

@app.route('/api/auth/profile', methods=['GET'])
def get_profile():
    """Get current user profile (simple version)"""
    # For now, return a mock profile
    return jsonify({
        'username': 'test_user',
        'email': 'test@example.com',
        'user_type': 'student'
    })

if __name__ == '__main__':
    print("Starting simple Flask backend...")
    print("Available endpoints:")
    print("- POST /api/auth/register")
    print("- POST /api/auth/login")
    print("- GET /api/health")
    print("\nBackend will be available at: http://localhost:5000")
    
    app.run(
        host='0.0.0.0',
        port=8000,
        debug=True
    )
