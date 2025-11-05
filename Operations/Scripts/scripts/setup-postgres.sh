#!/bin/bash

# UCID App PostgreSQL Setup Script
# This script helps set up the PostgreSQL database for the UCID app

set -e

echo "🚀 Setting up UCID App PostgreSQL Database..."

# Check if Docker is running
if ! docker info > /dev/null 2>&1; then
    echo "❌ Docker is not running. Please start Docker and try again."
    exit 1
fi

# Check if docker-compose is available
if ! command -v docker-compose &> /dev/null; then
    echo "❌ docker-compose is not installed. Please install it and try again."
    exit 1
fi

# Create .env file if it doesn't exist
if [ ! -f "../backend/.env" ]; then
    echo "📝 Creating .env file from template..."
    cp ../backend/env.example ../backend/.env
    echo "✅ .env file created. Please review and update the configuration if needed."
else
    echo "✅ .env file already exists."
fi

# Start PostgreSQL container
echo "🐘 Starting PostgreSQL container..."
cd ..
docker-compose up -d postgres

# Wait for PostgreSQL to be ready
echo "⏳ Waiting for PostgreSQL to be ready..."
until docker-compose exec -T postgres pg_isready -U ucid_user -d ucid_app; do
    echo "⏳ PostgreSQL is not ready yet. Waiting..."
    sleep 2
done

echo "✅ PostgreSQL is ready!"

# Initialize the database
echo "🔧 Initializing database schema and data..."
cd backend
python -m database.init_db

if [ $? -eq 0 ]; then
    echo "✅ Database initialization completed successfully!"
    echo ""
    echo "🎉 UCID App PostgreSQL setup is complete!"
    echo ""
    echo "📊 Database Details:"
    echo "   Host: localhost"
    echo "   Port: 5432"
    echo "   Database: ucid_app"
    echo "   Username: ucid_user"
    echo "   Password: ucid_password"
    echo ""
    echo "🚀 To start the full application:"
    echo "   cd .. && docker-compose up -d"
    echo ""
    echo "🔍 To view database logs:"
    echo "   docker-compose logs postgres"
    echo ""
    echo "🛑 To stop the database:"
    echo "   docker-compose stop postgres"
else
    echo "❌ Database initialization failed. Please check the logs above."
    exit 1
fi
