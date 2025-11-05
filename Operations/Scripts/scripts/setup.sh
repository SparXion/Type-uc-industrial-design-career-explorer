#!/bin/bash

# UC Industrial Design Career Explorer App - Setup Script
# This script sets up the development environment

set -e

echo "🚀 Setting up UC Industrial Design Career Explorer App..."

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

# Function to print colored output
print_status() {
    echo -e "${BLUE}[INFO]${NC} $1"
}

print_success() {
    echo -e "${GREEN}[SUCCESS]${NC} $1"
}

print_warning() {
    echo -e "${YELLOW}[WARNING]${NC} $1"
}

print_error() {
    echo -e "${RED}[ERROR]${NC} $1"
}

# Check if required tools are installed
check_requirements() {
    print_status "Checking system requirements..."
    
    # Check Node.js
    if ! command -v node &> /dev/null; then
        print_error "Node.js is not installed. Please install Node.js 18+ first."
        exit 1
    fi
    
    # Check npm
    if ! command -v npm &> /dev/null; then
        print_error "npm is not installed. Please install npm first."
        exit 1
    fi
    
    # Check Python
    if ! command -v python3 &> /dev/null; then
        print_error "Python 3 is not installed. Please install Python 3.11+ first."
        exit 1
    fi
    
    # Check pip
    if ! command -v pip3 &> /dev/null; then
        print_error "pip3 is not installed. Please install pip3 first."
        exit 1
    fi
    
    # Check Git
    if ! command -v git &> /dev/null; then
        print_error "Git is not installed. Please install Git first."
        exit 1
    fi
    
    # Check Docker (optional)
    if ! command -v docker &> /dev/null; then
        print_warning "Docker is not installed. Docker is optional but recommended for development."
    fi
    
    print_success "System requirements check passed!"
}

# Create project structure
create_structure() {
    print_status "Creating project directory structure..."
    
    # Create directories
    mkdir -p frontend/src/{components,pages,services,utils,types}
    mkdir -p frontend/public
    mkdir -p backend/{routes,models,services,utils,tests}
    mkdir -p docs
    mkdir -p scripts
    mkdir -p uploads
    mkdir -p models
    
    print_success "Project structure created!"
}

# Setup frontend
setup_frontend() {
    print_status "Setting up React frontend..."
    
    cd frontend
    
    # Install dependencies
    print_status "Installing frontend dependencies..."
    npm install
    
    # Create basic React app structure
    if [ ! -f "src/index.tsx" ]; then
        print_status "Creating basic React app structure..."
        # This will be created in the next step
    fi
    
    cd ..
    print_success "Frontend setup completed!"
}

# Setup backend
setup_backend() {
    print_status "Setting up Flask backend..."
    
    cd backend
    
    # Create virtual environment
    print_status "Creating Python virtual environment..."
    python3 -m venv venv
    
    # Activate virtual environment
    source venv/bin/activate
    
    # Upgrade pip
    pip install --upgrade pip
    
    # Install dependencies
    print_status "Installing backend dependencies..."
    pip install -r requirements.txt
    
    # Download spaCy model
    print_status "Downloading spaCy language model..."
    python -m spacy download en_core_web_sm
    
    # Deactivate virtual environment
    deactivate
    
    cd ..
    print_success "Backend setup completed!"
}

# Setup Git repository
setup_git() {
    print_status "Setting up Git repository..."
    
    if [ ! -d ".git" ]; then
        git init
        git add .
        git commit -m "Initial commit: Project setup and structure"
        print_success "Git repository initialized!"
    else
        print_status "Git repository already exists, skipping initialization."
    fi
}

# Create environment file
create_env_file() {
    print_status "Creating environment configuration..."
    
    if [ ! -f "backend/.env" ]; then
        cp backend/env.example backend/.env
        print_success "Environment file created from template!"
        print_warning "Please edit backend/.env with your actual configuration values."
    else
        print_status "Environment file already exists."
    fi
}

# Main setup function
main() {
    echo "=========================================="
    echo "  UC Industrial Design Career Explorer"
    echo "  Development Environment Setup"
    echo "=========================================="
    echo ""
    
    check_requirements
    create_structure
    setup_frontend
    setup_backend
    setup_git
    create_env_file
    
    echo ""
    echo "=========================================="
    print_success "Setup completed successfully!"
    echo "=========================================="
    echo ""
    echo "Next steps:"
    echo "1. Edit backend/.env with your configuration"
    echo "2. Start the development servers:"
    echo "   - Frontend: cd frontend && npm start"
    echo "   - Backend: cd backend && source venv/bin/activate && python app.py"
    echo "3. Or use Docker: docker-compose up"
    echo ""
    echo "Happy coding! 🎉"
}

# Run main function
main "$@"
