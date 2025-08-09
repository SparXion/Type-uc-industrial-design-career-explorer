# UC Bearcat Grant Industrial Design App

An AI-powered career matching platform that connects industrial design students with companies through intelligent matching of interests, talents, and career paths.

## 🚀 Tech Stack

### Frontend
- **React 18** - Dynamic UI framework
- **Material-UI (MUI)** - Component library and styling
- **TypeScript** - Type safety and better development experience

### Backend
- **Flask** - Python web framework for REST API
- **Python 3.11+** - Backend logic and AI processing

### Database
- **MongoDB** - Flexible, scalable NoSQL database
- **MongoDB Atlas** - Cloud database service

### AI & Machine Learning
- **TensorFlow/OpenCV** - Computer vision and image processing
- **spaCy** - Natural language processing
- **Hugging Face** - Advanced NLP models

### Development & Deployment
- **Docker** - Containerization
- **Git** - Version control
- **Cloud Platform** - AWS/GCP/Azure (to be configured)

## 📁 Project Structure

```
uc-industrial-design-app/
├── frontend/                 # React frontend application
├── backend/                  # Flask backend API
├── docs/                     # Documentation and specifications
├── docker/                   # Docker configuration files
├── scripts/                  # Utility and setup scripts
├── tests/                    # Test suites
└── README.md                 # This file
```

## 🛠️ Installation & Setup

### Prerequisites
- Node.js 18+ and npm
- Python 3.11+
- Git
- Docker (optional, for containerization)

### Quick Start

1. **Clone the repository**
   ```bash
   git clone <your-repo-url>
   cd uc-industrial-design-app
   ```

2. **Install Frontend Dependencies**
   ```bash
   cd frontend
   npm install
   ```

3. **Install Backend Dependencies**
   ```bash
   cd ../backend
   pip install -r requirements.txt
   ```

4. **Set up Environment Variables**
   ```bash
   cp .env.example .env
   # Edit .env with your configuration
   ```

5. **Start Development Servers**
   ```bash
   # Terminal 1 - Frontend
   cd frontend
   npm start
   
   # Terminal 2 - Backend
   cd backend
   python app.py
   ```

## 🔧 Development Commands

### Frontend
- `npm start` - Start development server
- `npm build` - Build for production
- `npm test` - Run tests
- `npm run lint` - Lint code

### Backend
- `python app.py` - Start Flask development server
- `python -m pytest` - Run tests
- `python -m flake8` - Lint code

## 📚 Documentation

- [App Flowchart](./docs/UCApp-flowchart-mermaid.md) - User interface flow
- [Development Plan](./docs/UC-Bearcat-Grant-Plan.md) - Complete project roadmap
- [API Documentation](./docs/api.md) - Backend API endpoints

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

This project is part of the UC Bearcat Grant program.

## 🆘 Support

For questions or issues, please contact the development team or create an issue in this repository.
