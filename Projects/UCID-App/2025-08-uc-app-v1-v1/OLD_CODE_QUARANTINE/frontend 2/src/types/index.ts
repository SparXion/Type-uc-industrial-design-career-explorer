// Frontend types matching backend Pydantic models

// Enums
export enum CareerLevel {
  ENTRY = "entry",
  JUNIOR = "junior",
  MID_LEVEL = "mid_level",
  SENIOR = "senior",
  LEAD = "lead",
  MANAGER = "manager",
  DIRECTOR = "director",
  EXECUTIVE = "executive"
}

export enum SkillCategory {
  TECHNICAL = "technical",
  DESIGN = "design",
  BUSINESS = "business",
  LEADERSHIP = "leadership",
  COMMUNICATION = "communication",
  RESEARCH = "research",
  PROTOTYPING = "prototyping",
  MANUFACTURING = "manufacturing"
}

export enum CompanySize {
  STARTUP = "startup",
  SMALL = "small",
  MEDIUM = "medium",
  LARGE = "large",
  ENTERPRISE = "enterprise"
}

export enum IndustrySector {
  CONSUMER_ELECTRONICS = "consumer_electronics",
  AUTOMOTIVE = "automotive",
  FURNITURE = "furniture",
  MEDICAL_DEVICES = "medical_devices",
  AEROSPACE = "aerospace",
  CONSUMER_GOODS = "consumer_goods",
  TOYS_GAMES = "toys_games",
  SPORTS_EQUIPMENT = "sports_equipment",
  PACKAGING = "packaging",
  SUSTAINABLE_DESIGN = "sustainable_design",
  FASHION_ACCESSORIES = "fashion_accessories",
  ARCHITECTURAL_PRODUCTS = "architectural_products"
}

// Core Models
export interface CareerPath {
  level: CareerLevel;
  title: string;
  years_experience: number;
  salary_range: { min: number; max: number };
  key_responsibilities: string[];
  required_skills: string[];
  growth_opportunities: string[];
}

export interface SkillRequirement {
  skill_name: string;
  category: SkillCategory;
  proficiency_level: number;
  importance: string;
  description: string;
}

export interface IndustryTrend {
  trend_name: string;
  description: string;
  impact: string;
  affected_skills: string[];
  timeline: string;
}

export interface CareerProfile {
  id?: string;
  title: string;
  category: string;
  description: string;
  career_paths: CareerPath[];
  core_skills: SkillRequirement[];
  specialized_skills: SkillRequirement[];
  industry_sectors: string[];
  market_demand: string;
  growth_potential: string;
  education_level: string;
  certifications: string[];
  continuing_education: string[];
  typical_workplaces: string[];
  work_schedule: string;
  travel_requirements: string;
  current_trends: IndustryTrend[];
  future_outlook: string;
  uc_programs: string[];
  uc_alumni_examples: string[];
  learning_resources: string[];
  professional_organizations: string[];
  networking_opportunities: string[];
  created_at: string;
  updated_at: string;
  popularity_score: number;
}

export interface CareerMatch {
  career_id: string;
  match_score: number;
  reasoning: string[];
  skill_gaps: string[];
  recommendations: string[];
}

export interface CompanyLocation {
  city: string;
  state: string;
  country: string;
  remote_friendly: boolean;
  hybrid_available: boolean;
}

export interface JobOpportunity {
  id?: string;
  title: string;
  department: string;
  description: string;
  requirements: string[];
  preferred_skills: string[];
  responsibilities: string[];
  salary_range: { min: number; max: number };
  benefits: string[];
  employment_type: string;
  experience_level: string;
  posted_date: string;
  is_active: boolean;
}

export interface CompanyProfile {
  id?: string;
  name: string;
  website: string;
  description: string;
  mission_statement?: string;
  size: CompanySize;
  founded_year?: number;
  industry_sectors: IndustrySector[];
  locations: CompanyLocation[];
  design_philosophy?: string;
  design_team_size?: number;
  design_tools: string[];
  job_opportunities: JobOpportunity[];
  internship_programs: string[];
  career_development: string[];
  uc_alumni_count?: number;
  uc_partnerships: string[];
  company_culture: string[];
  social_media: Record<string, string>;
  created_at: string;
  updated_at: string;
  verified: boolean;
}

export interface StudentInterests {
  design_fields: string[];
  creative_mediums: string[];
  industry_sectors: string[];
  project_types: string[];
}

export interface StudentSkills {
  technical_skills: string[];
  soft_skills: string[];
  design_skills: string[];
  skill_levels: Record<string, number>;
}

export interface CareerPreferences {
  preferred_roles: string[];
  work_environment: string[];
  location_preferences: string[];
  salary_expectations: { min: number; max: number };
}

export interface StudentProfile {
  id?: string;
  uc_id: string;
  email: string;
  first_name: string;
  last_name: string;
  major: string;
  graduation_year: number;
  interests: StudentInterests;
  skills: StudentSkills;
  career_preferences: CareerPreferences;
  career_matches: CareerMatch[];
  skill_gaps: string[];
  recommendations: string[];
  practice_projects: any[];
  exploration_history: any[];
  created_at: string;
  updated_at: string;
  profile_completion: number;
}

export interface CreativeWork {
  title: string;
  description: string;
  medium: string;
  file_url?: string;
  skills_demonstrated: string[];
  completion_date: string;
  feedback?: string;
}

export interface SkillGap {
  skill_name: string;
  current_level: number;
  required_level: number;
  importance: string;
  development_path: string[];
}

export interface LearningRecommendation {
  title: string;
  type: string;
  description: string;
  difficulty: string;
  estimated_time: string;
  resources: string[];
  uc_connection?: string;
}

export interface PracticeProject {
  id: string;
  title: string;
  description: string;
  skills_focus: string[];
  difficulty: string;
  estimated_duration: string;
  materials_needed: string[];
  learning_objectives: string[];
  submission_guidelines: string[];
  feedback_criteria: string[];
}

// App State
export interface AppState {
  currentStudent?: StudentProfile;
  currentStep: number;
  interests: StudentInterests;
  creativeWorks: CreativeWork[];
  careerMatches: CareerMatch[];
  selectedCareer?: CareerProfile;
  selectedCompany?: CompanyProfile;
  practiceProjects: PracticeProject[];
  completedProjects: any[];
}
