"""
Authentication routes for user login and registration
"""

from flask import Blueprint, request, jsonify
from flask_jwt_extended import create_access_token, create_refresh_token, jwt_required, get_jwt_identity
from werkzeug.security import generate_password_hash, check_password_hash

auth_bp = Blueprint('auth', __name__)

# Mock user database (replace with MongoDB in production)
users_db = {}

@auth_bp.route('/register', methods=['POST'])
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
        user_type = data['user_type']  # 'student' or 'company'
        
        # Check if user already exists
        if username in users_db:
            return jsonify({'error': 'Username already exists'}), 409
        
        # Hash password and store user
        hashed_password = generate_password_hash(password)
        users_db[username] = {
            'username': username,
            'email': email,
            'password_hash': hashed_password,
            'user_type': user_type,
            'created_at': '2025-01-01T00:00:00Z'  # Mock timestamp
        }
        
        return jsonify({
            'message': 'User registered successfully',
            'username': username,
            'user_type': user_type
        }), 201
        
    except Exception as e:
        return jsonify({'error': str(e)}), 500

@auth_bp.route('/login', methods=['POST'])
def login():
    """User login endpoint"""
    try:
        data = request.get_json()
        
        username = data.get('username')
        password = data.get('password')
        
        if not username or not password:
            return jsonify({'error': 'Username and password are required'}), 400
        
        # Check if user exists
        if username not in users_db:
            return jsonify({'error': 'Invalid credentials'}), 401
        
        user = users_db[username]
        
        # Verify password
        if not check_password_hash(user['password_hash'], password):
            return jsonify({'error': 'Invalid credentials'}), 401
        
        # Create tokens
        access_token = create_access_token(identity=username)
        refresh_token = create_refresh_token(identity=username)
        
        return jsonify({
            'message': 'Login successful',
            'access_token': access_token,
            'refresh_token': refresh_token,
            'user': {
                'username': user['username'],
                'email': user['email'],
                'user_type': user['user_type']
            }
        }), 200
        
    except Exception as e:
        return jsonify({'error': str(e)}), 500

@auth_bp.route('/refresh', methods=['POST'])
@jwt_required(refresh=True)
def refresh():
    """Refresh access token"""
    try:
        current_user = get_jwt_identity()
        new_access_token = create_access_token(identity=current_user)
        
        return jsonify({
            'access_token': new_access_token
        }), 200
        
    except Exception as e:
        return jsonify({'error': str(e)}), 500

@auth_bp.route('/profile', methods=['GET'])
@jwt_required()
def get_profile():
    """Get current user profile"""
    try:
        current_user = get_jwt_identity()
        
        if current_user not in users_db:
            return jsonify({'error': 'User not found'}), 404
        
        user = users_db[current_user]
        # Remove sensitive information
        user_profile = {
            'username': user['username'],
            'email': user['email'],
            'user_type': user['user_type'],
            'created_at': user['created_at']
        }
        
        return jsonify(user_profile), 200
        
    except Exception as e:
        return jsonify({'error': str(e)}), 500
