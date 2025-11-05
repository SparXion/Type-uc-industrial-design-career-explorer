"""
User service for handling user authentication and management
"""

from datetime import datetime
from werkzeug.security import generate_password_hash, check_password_hash
from database.connection import get_db
import logging

logger = logging.getLogger(__name__)

class UserService:
    """Service for user management operations"""
    
    @staticmethod
    def create_user(username: str, email: str, password: str, user_type: str) -> dict:
        """Create a new user account"""
        try:
            db = get_db()
            if db is None:
                raise ConnectionError("Database connection failed")
            
            # Check if user already exists
            existing_user = db.users.find_one({
                "$or": [
                    {"username": username},
                    {"email": email}
                ]
            })
            
            if existing_user:
                if existing_user["username"] == username:
                    raise ValueError("Username already exists")
                else:
                    raise ValueError("Email already exists")
            
            # Hash password and create user
            hashed_password = generate_password_hash(password)
            user_data = {
                "username": username,
                "email": email,
                "password_hash": hashed_password,
                "user_type": user_type,
                "is_active": True,
                "created_at": datetime.utcnow(),
                "updated_at": datetime.utcnow()
            }
            
            result = db.users.insert_one(user_data)
            user_data["_id"] = str(result.inserted_id)
            
            # Remove password hash from response
            del user_data["password_hash"]
            
            logger.info(f"User created successfully: {username}")
            return user_data
            
        except Exception as e:
            logger.error(f"Error creating user: {e}")
            raise
    
    @staticmethod
    def authenticate_user(username: str, password: str) -> dict:
        """Authenticate a user with username and password"""
        try:
            db = get_db()
            if db is None:
                raise ConnectionError("Database connection failed")
            
            # Find user by username
            user = db.users.find_one({"username": username, "is_active": True})
            
            if not user:
                raise ValueError("Invalid credentials")
            
            # Verify password
            if not check_password_hash(user["password_hash"], password):
                raise ValueError("Invalid credentials")
            
            # Remove password hash from response
            user_data = {
                "username": user["username"],
                "email": user["email"],
                "user_type": user["user_type"],
                "created_at": user["created_at"]
            }
            
            logger.info(f"User authenticated successfully: {username}")
            return user_data
            
        except Exception as e:
            logger.error(f"Error authenticating user: {e}")
            raise
    
    @staticmethod
    def get_user_by_username(username: str) -> dict:
        """Get user by username"""
        try:
            db = get_db()
            if db is None:
                raise ConnectionError("Database connection failed")
            
            user = db.users.find_one({"username": username, "is_active": True})
            
            if not user:
                return None
            
            # Remove password hash from response
            user_data = {
                "username": user["username"],
                "email": user["email"],
                "user_type": user["user_type"],
                "created_at": user["created_at"]
            }
            
            return user_data
            
        except Exception as e:
            logger.error(f"Error getting user: {e}")
            raise
