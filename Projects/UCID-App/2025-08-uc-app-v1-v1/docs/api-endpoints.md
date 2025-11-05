# UC Industrial Design Career Explorer - API Documentation

## Overview
This document describes the REST API endpoints for the UC Industrial Design Career Explorer application. The API provides comprehensive functionality for managing students, companies, careers, and AI-powered recommendations.

## Base URL
```
http://localhost:5000/api
```

## Authentication
Most endpoints require JWT authentication. Include the JWT token in the Authorization header:
```
Authorization: Bearer <your-jwt-token>
```

## Endpoints

### Health Check
#### GET /api/health
Returns the health status of the API.

**Response:**
```json
{
  "status": "healthy",
  "service": "UC Industrial Design Career Explorer API",
  "version": "1.0.0"
}
```

---

## Authentication Endpoints

### POST /api/auth/login
Authenticate a user and receive a JWT token.

**Request Body:**
```json
{
  "email": "user@example.com",
  "password": "password123"
}
```

**Response:**
```json
{
  "access_token": "jwt-token-here",
  "user": {
    "id": "user-id",
    "email": "user@example.com",
    "role": "student"
  }
}
```

### POST /api/auth/register
Register a new user account.

**Request Body:**
```json
{
  "email": "newuser@example.com",
  "password": "password123",
  "role": "student"
}
```

---

## Student Endpoints

### GET /api/students
Get all students with optional filtering and pagination.

**Query Parameters:**
- `page` (optional): Page number (default: 1)
- `limit` (optional): Items per page (default: 20)
- `interests` (optional): Comma-separated list of interests
- `skills` (optional): Comma-separated list of skills

**Response:**
```json
{
  "students": [
    {
      "_id": "student-id",
      "name": "John Doe",
      "email": "john@example.com",
      "interests": ["automotive design", "sustainability"],
      "skills": ["CAD", "Sketching", "3D Modeling"],
      "experience_level": "intermediate",
      "created_at": "2024-01-01T00:00:00Z",
      "updated_at": "2024-01-01T00:00:00Z"
    }
  ],
  "pagination": {
    "page": 1,
    "limit": 20,
    "total": 50,
    "pages": 3
  }
}
```

### GET /api/students/{student_id}
Get a specific student by ID.

**Response:**
```json
{
  "_id": "student-id",
  "name": "John Doe",
  "email": "john@example.com",
  "interests": ["automotive design", "sustainability"],
  "skills": ["CAD", "Sketching", "3D Modeling"],
  "experience_level": "intermediate",
  "created_at": "2024-01-01T00:00:00Z",
  "updated_at": "2024-01-01T00:00:00Z"
}
```

### POST /api/students
Create a new student profile. **Requires authentication.**

**Request Body:**
```json
{
  "name": "Jane Smith",
  "email": "jane@example.com",
  "interests": ["product design", "user experience"],
  "skills": ["Figma", "Prototyping", "User Research"],
  "experience_level": "beginner"
}
```

### PUT /api/students/{student_id}
Update a student profile. **Requires authentication.**

**Request Body:**
```json
{
  "skills": ["Figma", "Prototyping", "User Research", "Sketching"]
}
```

### DELETE /api/students/{student_id}
Delete a student profile. **Requires authentication.**

### GET /api/students/{student_id}/career-recommendations
Get career recommendations for a specific student.

**Response:**
```json
{
  "student_id": "student-id",
  "recommendations": [
    {
      "_id": "career-id",
      "title": "Product Designer",
      "description": "Design user-centered products",
      "match_score": 85,
      "required_skills": ["Figma", "Prototyping", "User Research"],
      "industry_focus": "Technology"
    }
  ]
}
```

---

## Company Endpoints

### GET /api/companies
Get all companies with optional filtering and pagination.

**Query Parameters:**
- `page` (optional): Page number (default: 1)
- `limit` (optional): Items per page (default: 20)
- `industry` (optional): Industry sector filter
- `location` (optional): Location filter
- `skills_needed` (optional): Comma-separated list of skills

**Response:**
```json
{
  "companies": [
    {
      "_id": "company-id",
      "name": "Design Studio Inc",
      "industry_sector": "Product Design",
      "location": "San Francisco, CA",
      "skills_needed": ["CAD", "3D Modeling", "Prototyping"],
      "job_opportunities": [
        {
          "title": "Industrial Designer",
          "description": "Design innovative products",
          "requirements": ["CAD", "3D Modeling"]
        }
      ],
      "created_at": "2024-01-01T00:00:00Z",
      "updated_at": "2024-01-01T00:00:00Z"
    }
  ],
  "pagination": {
    "page": 1,
    "limit": 20,
    "total": 30,
    "pages": 2
  }
}
```

### GET /api/companies/{company_id}
Get a specific company by ID.

### POST /api/companies
Create a new company profile. **Requires authentication.**

**Request Body:**
```json
{
  "name": "Innovation Corp",
  "industry_sector": "Automotive Design",
  "location": "Detroit, MI",
  "skills_needed": ["CAD", "Automotive Design", "Prototyping"],
  "description": "Leading automotive design company"
}
```

### PUT /api/companies/{company_id}
Update a company profile. **Requires authentication.**

### DELETE /api/companies/{company_id}
Delete a company profile. **Requires authentication.**

### GET /api/companies/{company_id}/job-opportunities
Get job opportunities for a specific company.

### GET /api/companies/{company_id}/student-matches
Get student matches for a company based on their needs.

**Response:**
```json
{
  "company_id": "company-id",
  "company_name": "Design Studio Inc",
  "matches": [
    {
      "_id": "student-id",
      "name": "John Doe",
      "match_score": 90,
      "skills": ["CAD", "3D Modeling", "Prototyping"],
      "interests": ["product design", "innovation"]
    }
  ]
}
```

### GET /api/companies/industries
Get all available industry sectors.

**Response:**
```json
{
  "industries": [
    "Product Design",
    "Automotive Design",
    "Furniture Design",
    "Consumer Electronics"
  ]
}
```

---

## Career Endpoints

### GET /api/careers
Get all careers with optional filtering and pagination.

**Query Parameters:**
- `page` (optional): Page number (default: 1)
- `limit` (optional): Items per page (default: 20)
- `industry` (optional): Industry focus filter
- `entry_level` (optional): Entry level filter
- `skills` (optional): Comma-separated list of skills

**Response:**
```json
{
  "careers": [
    {
      "_id": "career-id",
      "title": "Industrial Designer",
      "description": "Design functional and aesthetic products",
      "required_skills": ["CAD", "Sketching", "3D Modeling"],
      "required_interests": ["product design", "innovation"],
      "industry_focus": "Manufacturing",
      "entry_level": "beginner",
      "skill_progression": {
        "beginner": ["Basic CAD", "Sketching"],
        "intermediate": ["Advanced CAD", "Prototyping"],
        "advanced": ["Project Management", "Team Leadership"]
      },
      "created_at": "2024-01-01T00:00:00Z",
      "updated_at": "2024-01-01T00:00:00Z"
    }
  ],
  "pagination": {
    "page": 1,
    "limit": 20,
    "total": 25,
    "pages": 2
  }
}
```

### GET /api/careers/{career_id}
Get a specific career by ID.

### POST /api/careers
Create a new career path. **Requires authentication.**

**Request Body:**
```json
{
  "title": "UX Designer",
  "description": "Design user experiences for digital products",
  "required_skills": ["Figma", "Prototyping", "User Research"],
  "required_interests": ["user experience", "digital design"],
  "industry_focus": "Technology",
  "entry_level": "beginner"
}
```

### PUT /api/careers/{career_id}
Update a career path. **Requires authentication.**

### DELETE /api/careers/{career_id}
Delete a career path. **Requires authentication.**

### GET /api/careers/{career_id}/related-careers
Get related careers based on skills and interests.

**Response:**
```json
{
  "target_career_id": "career-id",
  "target_career_name": "Industrial Designer",
  "related_careers": [
    {
      "_id": "related-career-id",
      "title": "Product Designer",
      "similarity_score": 85,
      "required_skills": ["CAD", "Sketching", "Prototyping"]
    }
  ]
}
```

### GET /api/careers/{career_id}/skill-path
Get the skill development path for a career.

**Response:**
```json
{
  "career_id": "career-id",
  "career_title": "Industrial Designer",
  "skill_path": {
    "beginner": ["Basic CAD", "Sketching"],
    "intermediate": ["Advanced CAD", "Prototyping"],
    "advanced": ["Project Management", "Team Leadership"]
  }
}
```

### GET /api/careers/industries
Get all available industry focuses for careers.

### GET /api/careers/skills
Get all available skills across careers.

---

## AI Engine Endpoints

### POST /api/ai/analyze-student
Analyze a student profile and generate AI insights. **Requires authentication.**

**Request Body:**
```json
{
  "student_id": "student-id"
}
```

**Response:**
```json
{
  "analysis_id": "analysis-id",
  "student_id": "student-id",
  "analysis": {
    "insights": {
      "strength_areas": ["CAD", "Sketching"],
      "growth_opportunities": ["Product Designer", "UX Designer"],
      "market_alignment": "High"
    },
    "recommendations": {
      "career_paths": [
        {
          "id": "career-id",
          "title": "Product Designer",
          "match_score": 90
        }
      ],
      "skill_development": [
        {
          "skill": "Prototyping",
          "priority": "high",
          "careers_requiring": 3,
          "learning_resources": ["Online course", "Practice projects"]
        }
      ],
      "company_targets": [
        {
          "id": "company-id",
          "name": "Design Studio Inc",
          "match_score": 85
        }
      ]
    },
    "confidence_score": 92,
    "market_insights": {
      "industry_trends": ["Growing demand", "Technology integration"],
      "skill_demand": ["High demand for technical skills"],
      "salary_insights": "Entry-level positions typically start at $45,000-$65,000"
    }
  }
}
```

### POST /api/ai/career-recommendations
Get AI-powered career recommendations based on profile data.

**Request Body:**
```json
{
  "interests": ["automotive design", "sustainability"],
  "skills": ["CAD", "Sketching"],
  "experience_level": "beginner",
  "industry_preference": "automotive"
}
```

**Response:**
```json
{
  "recommendations": [
    {
      "_id": "career-id",
      "title": "Automotive Designer",
      "ai_score": 95,
      "required_skills": ["CAD", "Automotive Design", "Sketching"],
      "industry_focus": "Automotive"
    }
  ],
  "insights": [
    "Your profile aligns strongly with automotive industry careers",
    "You already have 2 key skills needed for these careers"
  ],
  "total_matches": 15
}
```

### POST /api/ai/company-matches
Get AI-powered company matches based on profile data.

**Request Body:**
```json
{
  "skills": ["CAD", "3D Modeling"],
  "interests": ["product design"],
  "experience_level": "intermediate",
  "location_preference": "San Francisco"
}
```

**Response:**
```json
{
  "matches": [
    {
      "_id": "company-id",
      "name": "Design Studio Inc",
      "ai_match_score": 90,
      "industry_sector": "Product Design",
      "location": "San Francisco, CA"
    }
  ],
  "insights": [
    "Your skills are in high demand in the Product Design sector",
    "Your skills in CAD, 3D Modeling are highly sought after"
  ],
  "total_matches": 12
}
```

### POST /api/ai/skill-gap-analysis
Analyze skill gaps for a target career path.

**Request Body:**
```json
{
  "current_skills": ["CAD", "Sketching"],
  "target_career_id": "career-id"
}
```

**Response:**
```json
{
  "career_id": "career-id",
  "career_title": "Product Designer",
  "current_skills": ["CAD", "Sketching"],
  "required_skills": ["CAD", "Sketching", "Prototyping", "User Research"],
  "matching_skills": ["CAD", "Sketching"],
  "missing_skills": ["Prototyping", "User Research"],
  "coverage_percentage": 50.0,
  "learning_path": [
    {
      "skill": "Prototyping",
      "priority": "high",
      "estimated_hours": 40,
      "learning_resources": ["Online course in Prototyping", "Practice projects in Prototyping"]
    }
  ],
  "estimated_time_to_ready": "3-6 months"
}
```

### GET /api/ai/market-insights
Get AI-generated market insights for industrial design careers.

**Response:**
```json
{
  "market_overview": {
    "total_careers": 25,
    "total_companies": 30,
    "industries_analyzed": 8
  },
  "industry_distribution": [
    {
      "_id": "Product Design",
      "count": 12
    },
    {
      "_id": "Automotive Design",
      "count": 8
    }
  ],
  "top_skills_in_demand": [
    {
      "_id": "CAD",
      "demand_count": 25
    },
    {
      "_id": "3D Modeling",
      "demand_count": 20
    }
  ],
  "insights": [
    "The Product Design sector has the highest concentration of opportunities (12 companies)",
    "CAD is the most in-demand skill across 25 companies"
  ]
}
```

---

## Error Responses

All endpoints return consistent error responses:

**400 Bad Request:**
```json
{
  "error": "Validation error message"
}
```

**401 Unauthorized:**
```json
{
  "error": "Authentication required"
}
```

**404 Not Found:**
```json
{
  "error": "Resource not found"
}
```

**500 Internal Server Error:**
```json
{
  "error": "Internal server error"
}
```

---

## Rate Limiting

The API implements rate limiting to ensure fair usage:
- **Authenticated users**: 1000 requests per hour
- **Unauthenticated users**: 100 requests per hour

---

## Pagination

List endpoints support pagination with the following parameters:
- `page`: Page number (starts from 1)
- `limit`: Number of items per page (default: 20, max: 100)

Pagination response includes:
- `page`: Current page number
- `limit`: Items per page
- `total`: Total number of items
- `pages`: Total number of pages

---

## Data Validation

All endpoints use Pydantic models for data validation:
- **Student**: Name, email, interests, skills, experience level
- **Company**: Name, industry sector, location, skills needed
- **Career**: Title, description, required skills, required interests
- **AI Analysis**: Student ID, analysis type, insights, recommendations

---

## WebSocket Support

For real-time features, the API supports WebSocket connections:
- **Endpoint**: `/ws`
- **Events**: Real-time updates for career recommendations, company matches, and market insights

---

## Testing

The API includes comprehensive test coverage:
- **Unit tests**: Individual endpoint testing
- **Integration tests**: End-to-end API testing
- **Performance tests**: Load testing and benchmarking

Run tests with:
```bash
cd backend
python -m pytest tests/
```

---

## Deployment

The API is containerized with Docker and includes:
- **Production**: Gunicorn with multiple workers
- **Development**: Flask development server
- **Environment**: Configurable via environment variables

---

## Support

For API support and questions:
- **Documentation**: This document and inline code comments
- **Issues**: GitHub repository issues
- **Contact**: Development team via repository discussions
