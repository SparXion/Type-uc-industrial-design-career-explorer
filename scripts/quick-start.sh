#!/bin/bash

# UC Industrial Design Career Explorer - Quick Start Script
# This script provides quick commands to start development

echo "🚀 UC Industrial Design Career Explorer - Quick Start"
echo "=================================================="
echo ""

# Check if we're in the right directory
if [ ! -f "README.md" ]; then
    echo "❌ Error: Please run this script from the project root directory"
    exit 1
fi

echo "✅ Project structure verified"
echo ""

echo "📋 Available commands:"
echo ""
echo "1. 🐳 Start with Docker (Recommended):"
echo "   docker-compose up"
echo ""
echo "2. 🚀 Start Frontend (React):"
echo "   cd frontend && npm install && npm start"
echo ""
echo "3. 🐍 Start Backend (Flask):"
echo "   cd backend && python3 -m venv venv && source venv/bin/activate && pip install -r requirements.txt && python app.py"
echo ""
echo "4. 🗄️  Start MongoDB only:"
echo "   docker run -d -p 27017:27017 --name uc_mongodb mongo:7.0"
echo ""
echo "5. 🔧 Run full setup script:"
echo "   ./scripts/setup.sh"
echo ""

echo "🌐 Access URLs:"
echo "   Frontend: http://localhost:3000"
echo "   Backend API: http://localhost:5000"
echo "   MongoDB: mongodb://localhost:27017"
echo ""

echo "📚 Documentation:"
echo "   - README.md - Project overview and setup"
echo "   - docs/UCApp-flowchart-mermaid.md - App flow diagram"
echo "   - docs/UC-Bearcat-Grant-Plan.md - Development roadmap"
echo ""

echo "🎯 Next Steps:"
echo "   1. Choose a start method above"
echo "   2. Open the frontend URL in your browser"
echo "   3. Start building your app!"
echo ""

echo "💡 Tip: Use 'docker-compose up -d' to run services in background"
echo "💡 Tip: Use 'docker-compose logs -f' to view service logs"
echo ""
