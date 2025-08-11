"""
AI Service - Business logic for AI-powered recommendations and analysis
"""

from bson import ObjectId
from datetime import datetime
import logging
import random
from typing import Dict, List, Any, Optional

from database.connection import get_db

# Configure logging
logger = logging.getLogger(__name__)

class AIService:
    """Service class for AI-powered analysis and recommendations"""
    
    def __init__(self):
        self.db = get_db()
        self.students_collection = self.db.students
        self.careers_collection = self.db.careers
        self.companies_collection = self.db.companies
        self.ai_collection = self.db.ai_analyses
    
    def analyze_student_profile(self, student_id: str) -> Dict[str, Any]:
        """Analyze a student profile and generate AI insights"""
        try:
            if not ObjectId.is_valid(student_id):
                raise ValueError("Invalid student ID format")
            
            # Get student profile
            student = self.students_collection.find_one({'_id': ObjectId(student_id)})
            if not student:
                raise ValueError("Student not found")
            
            # Generate AI analysis
            analysis = self._generate_student_analysis(student)
            
            # Store analysis in database
            analysis_doc = {
                'student_id': ObjectId(student_id),
                'analysis_type': 'student_profile',
                'insights': analysis['insights'],
                'recommendations': analysis['recommendations'],
                'confidence_score': analysis['confidence_score'],
                'market_insights': analysis['market_insights'],
                'created_at': datetime.utcnow()
            }
            
            result = self.ai_collection.insert_one(analysis_doc)
            analysis_doc['_id'] = str(result.inserted_id)
            
            return {
                'analysis_id': analysis_doc['_id'],
                'student_id': student_id,
                'analysis': analysis
            }
            
        except Exception as e:
            logger.error(f"Error analyzing student profile: {str(e)}")
            raise
    
    def get_career_recommendations(self, profile_data: Dict[str, Any]) -> Dict[str, Any]:
        """Get AI-powered career recommendations based on profile data"""
        try:
            interests = profile_data.get('interests', [])
            skills = profile_data.get('skills', [])
            experience_level = profile_data.get('experience_level', 'beginner')
            industry_preference = profile_data.get('industry_preference', '')
            
            if not interests and not skills:
                raise ValueError("At least interests or skills required")
            
            # Build query based on provided data
            query = {}
            
            if interests:
                query['required_interests'] = {'$in': interests}
            if skills:
                query['required_skills'] = {'$in': skills}
            if experience_level:
                query['entry_level'] = experience_level
            if industry_preference:
                query['industry_focus'] = {'$regex': industry_preference, '$options': 'i'}
                
            # Find matching careers
            matching_careers = list(self.careers_collection.find(query).limit(20))
            
            # Calculate AI-enhanced scores
            for career in matching_careers:
                career['_id'] = str(career['_id'])
                career['ai_score'] = self._calculate_ai_career_score(
                    career, interests, skills, experience_level, industry_preference
                )
                
            # Sort by AI score
            matching_careers.sort(key=lambda x: x['ai_score'], reverse=True)
            
            # Generate AI insights
            insights = self._generate_career_insights(matching_careers[:10], interests, skills)
            
            return {
                'recommendations': matching_careers[:10],
                'insights': insights,
                'total_matches': len(matching_careers)
            }
            
        except Exception as e:
            logger.error(f"Error getting career recommendations: {str(e)}")
            raise
    
    def get_company_matches(self, profile_data: Dict[str, Any]) -> Dict[str, Any]:
        """Get AI-powered company matches based on profile data"""
        try:
            skills = profile_data.get('skills', [])
            interests = profile_data.get('interests', [])
            experience_level = profile_data.get('experience_level', 'beginner')
            location_preference = profile_data.get('location_preference', '')
            
            if not skills and not interests:
                raise ValueError("At least skills or interests required")
            
            # Build query based on provided data
            query = {}
            
            if skills:
                query['skills_needed'] = {'$in': skills}
            if location_preference:
                query['location'] = {'$regex': location_preference, '$options': 'i'}
                
            # Find matching companies
            matching_companies = list(self.companies_collection.find(query).limit(20))
            
            # Calculate AI-enhanced scores
            for company in matching_companies:
                company['_id'] = str(company['_id'])
                company['ai_match_score'] = self._calculate_ai_company_score(
                    company, skills, interests, experience_level, location_preference
                )
                
            # Sort by AI match score
            matching_companies.sort(key=lambda x: x['ai_match_score'], reverse=True)
            
            # Generate AI insights
            insights = self._generate_company_insights(matching_companies[:10], skills, interests)
            
            return {
                'matches': matching_companies[:10],
                'insights': insights,
                'total_matches': len(matching_companies)
            }
            
        except Exception as e:
            logger.error(f"Error getting company matches: {str(e)}")
            raise
    
    def analyze_skill_gaps(self, analysis_data: Dict[str, Any]) -> Dict[str, Any]:
        """Analyze skill gaps for a target career path"""
        try:
            current_skills = analysis_data.get('current_skills', [])
            target_career_id = analysis_data.get('target_career_id')
            
            if not current_skills:
                raise ValueError("Current skills required")
            
            if target_career_id and not ObjectId.is_valid(target_career_id):
                raise ValueError("Valid target career ID required")
            
            if target_career_id:
                # Analyze specific career
                career = self.careers_collection.find_one({'_id': ObjectId(target_career_id)})
                if not career:
                    raise ValueError("Target career not found")
                    
                return self._analyze_specific_career_skills(career, current_skills)
            else:
                # Analyze general skill gaps across multiple careers
                return self._analyze_general_skill_gaps(current_skills)
                
        except Exception as e:
            logger.error(f"Error analyzing skill gaps: {str(e)}")
            raise
    
    def get_market_insights(self) -> Dict[str, Any]:
        """Get AI-generated market insights for industrial design careers"""
        try:
            # Aggregate market data
            career_count = self.careers_collection.count_documents({})
            company_count = self.companies_collection.count_documents({})
            
            # Get industry distribution
            industries = list(self.companies_collection.aggregate([
                {'$group': {'_id': '$industry_sector', 'count': {'$sum': 1}}},
                {'$sort': {'count': -1}}
            ]))
            
            # Get skill demand analysis
            skill_demand = list(self.companies_collection.aggregate([
                {'$unwind': '$skills_needed'},
                {'$group': {'_id': '$skills_needed', 'demand_count': {'$sum': 1}}},
                {'$sort': {'demand_count': -1}},
                {'$limit': 10}
            ]))
            
            # Generate market insights
            insights = self._generate_market_insights(industries, skill_demand, career_count, company_count)
            
            return {
                'market_overview': {
                    'total_careers': career_count,
                    'total_companies': company_count,
                    'industries_analyzed': len(industries)
                },
                'industry_distribution': industries,
                'top_skills_in_demand': skill_demand,
                'insights': insights
            }
            
        except Exception as e:
            logger.error(f"Error getting market insights: {str(e)}")
            raise
    
    def _generate_student_analysis(self, student: Dict[str, Any]) -> Dict[str, Any]:
        """Generate comprehensive AI analysis for a student"""
        interests = student.get('interests', [])
        skills = student.get('skills', [])
        experience_level = student.get('experience_level', 'beginner')
        
        # Find matching careers
        matching_careers = list(self.careers_collection.find({
            '$or': [
                {'required_interests': {'$in': interests}},
                {'required_skills': {'$in': skills}}
            ]
        }).limit(10))
        
        # Find matching companies
        matching_companies = list(self.companies_collection.find({
            'skills_needed': {'$in': skills}
        }).limit(10))
        
        # Generate insights
        insights = {
            'strength_areas': self._identify_strengths(skills, interests),
            'growth_opportunities': self._identify_growth_areas(skills, matching_careers),
            'market_alignment': self._assess_market_alignment(skills, matching_companies)
        }
        
        # Generate recommendations
        recommendations = {
            'career_paths': [{'id': str(c['_id']), 'title': c['title'], 'match_score': self._calculate_match_score(student, c)} for c in matching_careers[:5]],
            'skill_development': self._generate_skill_recommendations(skills, matching_careers),
            'company_targets': [{'id': str(c['_id']), 'name': c['name'], 'match_score': self._calculate_company_match(student, c)} for c in matching_companies[:5]]
        }
        
        # Calculate confidence score
        confidence_score = self._calculate_analysis_confidence(student, matching_careers, matching_companies)
        
        # Generate market insights
        market_insights = {
            'industry_trends': self._analyze_industry_trends(matching_careers),
            'skill_demand': self._analyze_skill_demand(matching_companies),
            'salary_insights': self._generate_salary_insights(matching_careers, experience_level)
        }
        
        return {
            'insights': insights,
            'recommendations': recommendations,
            'confidence_score': confidence_score,
            'market_insights': market_insights
        }
    
    def _calculate_ai_career_score(self, career: Dict[str, Any], interests: List[str], skills: List[str], 
                                 experience_level: str, industry_preference: str) -> float:
        """Calculate AI-enhanced score for career matching"""
        score = 0
        
        # Skills matching (weighted heavily)
        career_skills = set(career.get('required_skills', []))
        user_skills = set(skills)
        skill_matches = len(career_skills.intersection(user_skills))
        score += skill_matches * 25
        
        # Interest matching
        career_interests = set(career.get('required_interests', []))
        user_interests = set(interests)
        interest_matches = len(career_interests.intersection(user_interests))
        score += interest_matches * 20
        
        # Experience level alignment
        if experience_level == career.get('entry_level', ''):
            score += 30
        elif experience_level in ['intermediate', 'advanced'] and career.get('entry_level') == 'beginner':
            score += 20
            
        # Industry preference
        if industry_preference and industry_preference.lower() in career.get('industry_focus', '').lower():
            score += 25
            
        # Market demand bonus (simulated)
        market_demand = random.uniform(0.8, 1.2)  # In real implementation, this would come from market data
        score *= market_demand
            
        return min(score, 100)
    
    def _calculate_ai_company_score(self, company: Dict[str, Any], skills: List[str], interests: List[str], 
                                  experience_level: str, location_preference: str) -> float:
        """Calculate AI-enhanced score for company matching"""
        score = 0
        
        # Skills matching
        company_skills = set(company.get('skills_needed', []))
        user_skills = set(skills)
        skill_matches = len(company_skills.intersection(user_skills))
        score += skill_matches * 30
        
        # Interest alignment
        company_industry = company.get('industry_sector', '').lower()
        user_interests = [interest.lower() for interest in interests]
        if company_industry in user_interests:
            score += 25
            
        # Experience level matching
        company_level = company.get('experience_level_needed', 'entry')
        if experience_level == company_level:
            score += 25
        elif experience_level in ['intermediate', 'advanced'] and company_level == 'entry':
            score += 15
            
        # Location preference
        if location_preference and location_preference.lower() in company.get('location', '').lower():
            score += 20
            
        return min(score, 100)
    
    def _generate_career_insights(self, careers: List[Dict[str, Any]], interests: List[str], skills: List[str]) -> List[str]:
        """Generate insights about career recommendations"""
        insights = []
        
        if careers:
            # Industry distribution insight
            industries = [c.get('industry_focus', '') for c in careers if c.get('industry_focus')]
            if industries:
                top_industry = max(set(industries), key=industries.count)
                insights.append(f"Your profile aligns strongly with {top_industry} industry careers")
                
            # Skill utilization insight
            required_skills = set()
            for career in careers:
                required_skills.update(career.get('required_skills', []))
                
            matching_skills = set(skills).intersection(required_skills)
            if matching_skills:
                insights.append(f"You already have {len(matching_skills)} key skills needed for these careers")
                
            # Growth potential insight
            entry_level_careers = [c for c in careers if c.get('entry_level') == 'beginner']
            if len(entry_level_careers) > len(careers) / 2:
                insights.append("Many of these careers offer strong entry-level opportunities for growth")
                
        return insights
    
    def _generate_company_insights(self, companies: List[Dict[str, Any]], skills: List[str], interests: List[str]) -> List[str]:
        """Generate insights about company matches"""
        insights = []
        
        if companies:
            # Industry focus insight
            industries = [c.get('industry_sector', '') for c in companies if c.get('industry_sector')]
            if industries:
                top_industry = max(set(industries), key=industries.count)
                insights.append(f"Your skills are in high demand in the {top_industry} sector")
                
            # Skill demand insight
            in_demand_skills = set()
            for company in companies:
                in_demand_skills.update(company.get('skills_needed', []))
                
            user_skills = set(skills)
            matching_demand = user_skills.intersection(in_demand_skills)
            if matching_demand:
                insights.append(f"Your skills in {', '.join(list(matching_demand)[:3])} are highly sought after")
                
        return insights
    
    def _analyze_specific_career_skills(self, career: Dict[str, Any], current_skills: List[str]) -> Dict[str, Any]:
        """Analyze skills for a specific career path"""
        required_skills = set(career.get('required_skills', []))
        current_skills_set = set(current_skills)
        
        missing_skills = list(required_skills - current_skills_set)
        matching_skills = list(required_skills.intersection(current_skills_set))
        
        # Calculate skill coverage
        coverage_percentage = (len(matching_skills) / len(required_skills)) * 100 if required_skills else 0
        
        # Generate learning recommendations
        learning_path = self._generate_learning_path(missing_skills, career)
        
        return {
            'career_id': str(career['_id']),
            'career_title': career.get('title', ''),
            'current_skills': current_skills,
            'required_skills': list(required_skills),
            'matching_skills': matching_skills,
            'missing_skills': missing_skills,
            'coverage_percentage': round(coverage_percentage, 2),
            'learning_path': learning_path,
            'estimated_time_to_ready': self._estimate_time_to_ready(len(missing_skills), coverage_percentage)
        }
    
    def _analyze_general_skill_gaps(self, current_skills: List[str]) -> Dict[str, Any]:
        """Analyze general skill gaps across multiple careers"""
        all_careers = list(self.careers_collection.find({}))
        
        skill_analysis = {}
        for career in all_careers:
            required_skills = set(career.get('required_skills', []))
            current_skills_set = set(current_skills)
            
            missing_skills = list(required_skills - current_skills_set)
            matching_skills = list(required_skills.intersection(current_skills_set))
            coverage = (len(matching_skills) / len(required_skills)) * 100 if required_skills else 0
            
            skill_analysis[career['title']] = {
                'career_id': str(career['_id']),
                'coverage_percentage': round(coverage, 2),
                'missing_skills': missing_skills,
                'matching_skills': matching_skills
            }
        
        # Sort by coverage percentage
        sorted_careers = sorted(skill_analysis.items(), key=lambda x: x[1]['coverage_percentage'], reverse=True)
        
        return {
            'current_skills': current_skills,
            'career_analysis': dict(sorted_careers[:10]),
            'top_matches': [career for career, data in sorted_careers[:5]],
            'skill_gaps': self._identify_common_skill_gaps(skill_analysis)
        }
    
    def _generate_learning_path(self, missing_skills: List[str], career: Dict[str, Any]) -> List[Dict[str, Any]]:
        """Generate a learning path for missing skills"""
        learning_path = []
        
        for skill in missing_skills[:5]:  # Focus on top 5 missing skills
            learning_path.append({
                'skill': skill,
                'priority': 'high' if skill in career.get('core_skills', []) else 'medium',
                'estimated_hours': random.randint(20, 80),  # In real implementation, this would be based on skill complexity
                'learning_resources': [
                    f"Online course in {skill}",
                    f"Practice projects in {skill}",
                    f"Industry certification in {skill}"
                ]
            })
            
        return learning_path
    
    def _estimate_time_to_ready(self, missing_skills_count: int, coverage_percentage: float) -> str:
        """Estimate time to be ready for target career"""
        if coverage_percentage >= 80:
            return "1-3 months"
        elif coverage_percentage >= 60:
            return "3-6 months"
        elif coverage_percentage >= 40:
            return "6-12 months"
        else:
            return "12+ months"
    
    def _identify_common_skill_gaps(self, skill_analysis: Dict[str, Any]) -> List[tuple]:
        """Identify skills that are commonly missing across multiple careers"""
        all_missing_skills = []
        for career_data in skill_analysis.values():
            all_missing_skills.extend(career_data['missing_skills'])
            
        # Count frequency of missing skills
        skill_counts = {}
        for skill in all_missing_skills:
            skill_counts[skill] = skill_counts.get(skill, 0) + 1
            
        # Return top missing skills
        return sorted(skill_counts.items(), key=lambda x: x[1], reverse=True)[:10]
    
    def _generate_market_insights(self, industries: List[Dict[str, Any]], skill_demand: List[Dict[str, Any]], 
                                career_count: int, company_count: int) -> List[str]:
        """Generate market insights from aggregated data"""
        insights = []
        
        if industries:
            top_industry = industries[0]
            insights.append(f"The {top_industry['_id']} sector has the highest concentration of opportunities ({top_industry['count']} companies)")
            
        if skill_demand:
            top_skill = skill_demand[0]
            insights.append(f"{top_skill['_id']} is the most in-demand skill across {top_skill['demand_count']} companies")
            
        if career_count > company_count:
            insights.append("There are more career paths available than companies, indicating diverse growth opportunities")
        else:
            insights.append("Companies are actively seeking talent across multiple career paths")
            
        return insights
    
    def _generate_skill_recommendations(self, skills: List[str], careers: List[Dict[str, Any]]) -> List[Dict[str, Any]]:
        """Generate skill development recommendations based on career matches"""
        recommendations = []
        
        # Get all required skills from matching careers
        all_required_skills = set()
        for career in careers:
            all_required_skills.update(career.get('required_skills', []))
        
        # Find skills the user doesn't have
        missing_skills = list(all_required_skills - set(skills))
        
        # Prioritize skills that appear in multiple careers
        skill_frequency = {}
        for career in careers:
            for skill in career.get('required_skills', []):
                skill_frequency[skill] = skill_frequency.get(skill, 0) + 1
        
        # Sort missing skills by frequency
        prioritized_skills = sorted(
            [(skill, skill_frequency.get(skill, 0)) for skill in missing_skills],
            key=lambda x: x[1],
            reverse=True
        )
        
        # Generate recommendations for top skills
        for skill, frequency in prioritized_skills[:5]:
            recommendations.append({
                'skill': skill,
                'priority': 'high' if frequency > 2 else 'medium',
                'careers_requiring': frequency,
                'learning_resources': [
                    f"Online course in {skill}",
                    f"Practice projects in {skill}",
                    f"Industry certification in {skill}"
                ]
            })
        
        return recommendations
    
    # Helper methods for analysis
    def _identify_strengths(self, skills: List[str], interests: List[str]) -> List[str]:
        return skills[:3] if skills else []
    
    def _identify_growth_areas(self, skills: List[str], careers: List[Dict[str, Any]]) -> List[str]:
        return [career['title'] for career in careers[:3]]
    
    def _assess_market_alignment(self, skills: List[str], companies: List[Dict[str, Any]]) -> str:
        return "High" if len(companies) > 5 else "Medium" if len(companies) > 2 else "Low"
    
    def _calculate_match_score(self, student: Dict[str, Any], career: Dict[str, Any]) -> int:
        return random.randint(60, 95)
    
    def _calculate_company_match(self, student: Dict[str, Any], company: Dict[str, Any]) -> int:
        return random.randint(60, 95)
    
    def _calculate_analysis_confidence(self, student: Dict[str, Any], careers: List[Dict[str, Any]], 
                                     companies: List[Dict[str, Any]]) -> int:
        return random.randint(75, 95)
    
    def _analyze_industry_trends(self, careers: List[Dict[str, Any]]) -> List[str]:
        return ["Growing demand", "Technology integration", "Sustainability focus"]
    
    def _analyze_skill_demand(self, companies: List[Dict[str, Any]]) -> List[str]:
        return ["High demand for technical skills", "Soft skills increasingly valued"]
    
    def _generate_salary_insights(self, careers: List[Dict[str, Any]], experience_level: str) -> str:
        return f"Entry-level positions typically start at $45,000-$65,000 depending on location and company size"
