"""
Real LLM Service Integration
Supports both Anthropic Claude and OpenAI APIs
"""

import os
import json
from typing import Dict, List, Optional
import anthropic
import openai

class LLMService:
    def __init__(self):
        self.anthropic_key = os.environ.get('ANTHROPIC_API_KEY')
        self.openai_key = os.environ.get('OPENAI_API_KEY')
        self.provider = 'anthropic' if self.anthropic_key else 'openai' if self.openai_key else 'mock'
        
        if self.provider == 'anthropic':
            self.client = anthropic.Anthropic(api_key=self.anthropic_key)
        elif self.provider == 'openai':
            openai.api_key = self.openai_key
    
    def generate_response(self, 
                         question: str, 
                         user_response: str, 
                         context: Dict) -> str:
        """
        Generate a contextual AI response to user's answer
        """
        prompt = self._build_prompt(question, user_response, context)
        
        if self.provider == 'anthropic':
            return self._call_anthropic(prompt)
        elif self.provider == 'openai':
            return self._call_openai(prompt)
        else:
            return self._mock_response(user_response)
    
    def generate_follow_up(self, 
                          conversation_history: List[Dict],
                          category: str) -> str:
        """
        Generate intelligent follow-up question based on conversation
        """
        prompt = self._build_followup_prompt(conversation_history, category)
        
        if self.provider == 'anthropic':
            return self._call_anthropic(prompt)
        elif self.provider == 'openai':
            return self._call_openai(prompt)
        else:
            return self._mock_followup(category)
    
    def extract_insights(self, 
                        user_responses: List[str],
                        category: str) -> Dict:
        """
        Extract key insights from user responses for career matching
        """
        prompt = self._build_insights_prompt(user_responses, category)
        
        if self.provider == 'anthropic':
            insights = self._call_anthropic(prompt)
        elif self.provider == 'openai':
            insights = self._call_openai(prompt)
        else:
            insights = self._mock_insights(user_responses, category)
        
        return {
            'category': category,
            'insights': [insights],
            'confidence': 0.85
        }
    
    def _build_prompt(self, question: str, user_response: str, context: Dict) -> str:
        """Build prompt for contextual response"""
        return f"""You are a friendly career counselor helping industrial design students explore career paths.

Current Question: {question}
Student's Answer: {user_response}
Conversation Context: {json.dumps(context.get('previous_responses', [])[:3])}

Generate a warm, encouraging response that:
1. Acknowledges their answer
2. Makes a connection to industrial design careers
3. Is conversational and supportive (2-3 sentences max)

Response:"""
    
    def _build_followup_prompt(self, history: List[Dict], category: str) -> str:
        """Build prompt for follow-up question"""
        return f"""You are a career counselor for industrial design students.

Category: {category}
Recent Conversation:
{json.dumps(history[-3:], indent=2)}

Generate ONE natural follow-up question that:
1. Builds on their previous answers
2. Helps uncover more about their {category}
3. Feels conversational, not interrogative

Question:"""
    
    def _build_insights_prompt(self, responses: List[str], category: str) -> str:
        """Build prompt for extracting insights"""
        return f"""Analyze these student responses about their {category}:

{json.dumps(responses, indent=2)}

Extract the key insight about this student's {category} in one concise sentence. 
Focus on what makes them unique and what career paths might suit them.

Insight:"""
    
    def _call_anthropic(self, prompt: str) -> str:
        """Call Anthropic Claude API"""
        try:
            message = self.client.messages.create(
                model="claude-3-5-sonnet-20241022",
                max_tokens=300,
                temperature=0.7,
                messages=[
                    {"role": "user", "content": prompt}
                ]
            )
            return message.content[0].text.strip()
        except Exception as e:
            print(f"Anthropic API error: {e}")
            return self._mock_response("")
    
    def _call_openai(self, prompt: str) -> str:
        """Call OpenAI API"""
        try:
            response = openai.ChatCompletion.create(
                model="gpt-4",
                messages=[
                    {"role": "system", "content": "You are a friendly career counselor for industrial design students."},
                    {"role": "user", "content": prompt}
                ],
                max_tokens=300,
                temperature=0.7
            )
            return response.choices[0].message.content.strip()
        except Exception as e:
            print(f"OpenAI API error: {e}")
            return self._mock_response("")
    
    def _mock_response(self, user_response: str) -> str:
        """Fallback mock response"""
        if not user_response:
            return "That's interesting! Tell me more about that."
        
        # Simple keyword-based responses
        response_lower = user_response.lower()
        
        if any(word in response_lower for word in ['love', 'enjoy', 'passionate', 'excited']):
            return "Your enthusiasm really comes through! That passion is exactly what makes great designers stand out."
        elif any(word in response_lower for word in ['building', 'making', 'creating']):
            return "Hands-on creation is at the heart of industrial design. That maker mindset will serve you well!"
        elif any(word in response_lower for word in ['help', 'people', 'solving']):
            return "User-centered thinking is crucial! The best designers always keep human needs at the center."
        else:
            return "That's a great insight into your interests. This kind of self-awareness helps guide your design journey."
    
    def _mock_followup(self, category: str) -> str:
        """Fallback mock follow-up"""
        followups = {
            'talents': "What other skills or abilities do you think come naturally to you?",
            'interests': "How do you see these interests connecting to real-world problems you'd like to solve?",
            'skills': "What skills would you most like to develop further?",
            'goals': "What kind of impact do you hope to make through your design work?"
        }
        return followups.get(category, "What else would you like to share?")
    
    def _mock_insights(self, responses: List[str], category: str) -> str:
        """Fallback mock insights"""
        return f"Shows strong interest in {category} with clear self-awareness and potential for design careers"

# Singleton instance
llm_service = LLMService()

