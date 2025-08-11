# UC Industrial Design Career Explorer - API Endpoints

## Base URL
```
http://localhost:5000/api
```

## Authentication Endpoints

### POST /auth/register
User registration endpoint
- **Body**: `{username, email, password, user_type}`
- **Response**: `{message, username, user_type}`

### POST /auth/login
User login endpoint
- **Body**: `{username, password}`
- **Response**: `{message, access_token, refresh_token, user}`

### POST /auth/refresh
Refresh access token
- **Headers**: `Authorization: Bearer <refresh_token>`
- **Response**: `{access_token}`

### GET /auth/profile
Get user profile
- **Headers**: `Authorization: Bearer <access_token>`
- **Response**: `{username, email, user_type, created_at}`

### POST /auth/logout
User logout endpoint
- **Headers**: `Authorization: Bearer <access_token>`
- **Response**: `{message}`

## Student Endpoints

### GET /students/
Get all students with optional filtering
- **Query Parameters**: `page`, `limit`, `interests`, `skills`, `major`, `graduation_year`
- **Response**: `{students: [], total: number, page: number}`

### GET /students/{student_id}
Get a specific student by ID
- **Response**: `StudentProfile`

### POST /students/
Create a new student profile
- **Headers**: `Authorization: Bearer <access_token>`
- **Body**: `StudentProfile`
- **Response**: `StudentProfile`

### PUT /students/{student_id}
Update a student profile
- **Headers**: `Authorization: Bearer <access_token>`
- **Body**: `StudentUpdate`
- **Response**: `{message}`

### DELETE /students/{student_id}
Delete a student profile
- **Headers**: `Authorization: Bearer <access_token>`
- **Response**: `{message}`

### PUT /students/{student_id}/interests
Update student interests
- **Headers**: `Authorization: Bearer <access_token>`
- **Body**: `StudentInterests`
- **Response**: `{message}`

### PUT /students/{student_id}/skills
Update student skills
- **Headers**: `Authorization: Bearer <access_token>`
- **Body**: `StudentSkills`
- **Response**: `{message}`

### GET /students/{student_id}/career-recommendations
Get career recommendations for a student
- **Response**: `{career_matches: [], skill_gaps: [], recommendations: []}`

### GET /students/{student_id}/profile-completion
Get student profile completion percentage
- **Response**: `{completion_percentage: number, missing_fields: []}`

### GET /students/{student_id}/progress-summary
Get student progress summary
- **Response**: `{completed_projects: [], skill_development: [], career_exploration: []}`

## Career Endpoints

### GET /careers/
Get all careers with optional filtering
- **Query Parameters**: `category`, `industry_sector`, `experience_level`
- **Response**: `{careers: [], total: number}`

### GET /careers/{career_id}
Get a specific career by ID
- **Response**: `CareerProfile`

### POST /careers/
Create a new career profile
- **Headers**: `Authorization: Bearer <access_token>`
- **Body**: `CareerProfile`
- **Response**: `CareerProfile`

### PUT /careers/{career_id}
Update a career profile
- **Headers**: `Authorization: Bearer <access_token>`
- **Body**: `CareerProfile`
- **Response**: `{message}`

### DELETE /careers/{career_id}
Delete a career profile
- **Headers**: `Authorization: Bearer <access_token>`
- **Response**: `{message}`

### GET /careers/categories
Get all available career categories
- **Response**: `{career_categories: [], industry_sectors: [], skill_categories: []}`

### GET /careers/trending
Get trending careers
- **Response**: `{trending_careers: []}`

## Company Endpoints

### GET /companies/
Get all companies with optional filtering
- **Query Parameters**: `industry_sector`, `size`, `location`
- **Response**: `{companies: [], total: number}`

### GET /companies/{company_id}
Get a specific company by ID
- **Response**: `CompanyProfile`

### POST /companies/
Create a new company profile
- **Headers**: `Authorization: Bearer <access_token>`
- **Body**: `CompanyProfile`
- **Response**: `CompanyProfile`

### PUT /companies/{company_id}
Update a company profile
- **Headers**: `Authorization: Bearer <access_token>`
- **Body**: `CompanyProfile`
- **Response**: `{message}`

### DELETE /companies/{company_id}
Delete a company profile
- **Headers**: `Authorization: Bearer <access_token>`
- **Response**: `{message}`

### GET /companies/categories
Get all available company categories
- **Response**: `{company_sizes: [], industry_sectors: [], design_philosophies: []}`

### GET /companies/featured
Get featured companies
- **Response**: `{featured_companies: []}`

### GET /companies/search
Search companies by name or description
- **Query Parameters**: `q` (search query)
- **Response**: `{companies: []}`

## AI Engine Endpoints

### POST /ai/analyze-student
Analyze a student profile and generate AI insights
- **Headers**: `Authorization: Bearer <access_token>`
- **Body**: `{student_id}`
- **Response**: `{analysis_results: {}, insights: [], recommendations: []}`

### POST /ai/career-recommendations
Get AI-powered career recommendations
- **Body**: `{student_profile, preferences}`
- **Response**: `{career_matches: [], reasoning: [], confidence_scores: []}`

### POST /ai/company-matches
Get AI-powered company matches
- **Body**: `{student_profile, career_goals}`
- **Response**: `{company_matches: [], match_reasons: [], fit_scores: []}`

### POST /ai/skill-gap-analysis
Analyze skill gaps for a target career path
- **Body**: `{current_skills, target_career}`
- **Response**: `{skill_gaps: [], development_paths: [], estimated_time: []}`

### GET /ai/market-insights
Get AI-generated market insights
- **Response**: `{trends: [], market_analysis: [], future_predictions: []}`

### POST /ai/practice-project-recommendations
Get AI-powered practice project recommendations
- **Body**: `{student_profile, skill_goals}`
- **Response**: `{recommended_projects: [], skill_focus: [], difficulty_levels: []}`

### POST /ai/learning-path
Generate personalized learning path
- **Body**: `{student_profile, career_goals, timeline}`
- **Response**: `{learning_path: [], milestones: [], estimated_duration: []}`

### GET /ai/status
Get AI service status
- **Response**: `{status: string, features: [], performance_metrics: {}}`

### GET /ai/health
AI service health check
- **Response**: `{status: string, service: string, version: string, features: []}`

## Practice Project Endpoints

### GET /practice-projects/
Get all practice projects with optional filtering
- **Query Parameters**: `difficulty`, `skills_focus`, `duration`
- **Response**: `{projects: [], total: number}`

### GET /practice-projects/{project_id}
Get a specific practice project by ID
- **Response**: `PracticeProject`

### POST /practice-projects/recommended
Get practice projects recommended for a student
- **Body**: `{interests, skills, career_goals}`
- **Response**: `{recommended_projects: []}`

### POST /practice-projects/{project_id}/submit
Submit a completed practice project
- **Headers**: `Authorization: Bearer <access_token>`
- **Body**: `{submission_date, files, reflection, skills_demonstrated}`
- **Response**: `{submission_id, message}`

### GET /practice-projects/categories
Get all available project categories
- **Response**: `{difficulties: [], skill_categories: [], project_types: []}`

### GET /practice-projects/statistics
Get overall project statistics
- **Response**: `{total_projects: number, active_projects: number, completion_rate: number}`

### GET /practice-projects/{project_id}/student-progress
Get a student's progress on a specific project
- **Headers**: `Authorization: Bearer <access_token>`
- **Response**: `{progress_percentage: number, milestones: [], current_status: string}`

## Health Check Endpoints

### GET /health
Main application health check
- **Response**: `{status: string, service: string, version: string}`

## Error Responses

All endpoints return consistent error responses:

```json
{
  "error": "Error message description"
}
```

Common HTTP status codes:
- `200`: Success
- `201`: Created
- `400`: Bad Request
- `401`: Unauthorized
- `404`: Not Found
- `500`: Internal Server Error

## Authentication

Most endpoints require authentication using JWT tokens. Include the token in the Authorization header:

```
Authorization: Bearer <access_token>
```

## Rate Limiting

API endpoints are subject to rate limiting to ensure fair usage and system stability.

## CORS

Cross-Origin Resource Sharing is enabled for all origins to support frontend development.
