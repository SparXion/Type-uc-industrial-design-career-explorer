# Product Requirements Document: Industrial Design Career Explorer

## Overview
The Industrial Design Career Explorer is a web app for UC DAAP students to discover personalized industrial design (ID) career paths by matching their motivations, interests, and talents to roles (e.g., Concept Artist) using AI. It emphasizes problem-solving and aligns with UC’s “Next Lives Here” vision.

## Objectives
- Guide students to define ID personally, starting with “Why did you choose industrial design?”
- Match motivations, interests, and talents to ID careers, avoiding oversaturated fields (e.g., footwear design).
- Deliver curated curricula and Cincinnati industry connections.

## Key Features
1. **Landing Page**: Animated video (15–20s) showcasing ID (cars, toys, UI/UX). Displays “What is Industrial Design?” with a dictionary definition and “Discover what ID means to YOU.” Visual prompt: “Why did you choose industrial design?” via selectable cards (e.g., “Love solving problems,” “Inspired by futuristic designs”). Buttons for login/registration or “Start Your Journey.”
2. **Interests Input**: Visual cards (20–30, e.g., “robotics”) zoom on hover; image upload option. Submits 3–5 selections.
3. **Creative Outlets Input**: Glowing tiles (20–30, e.g., “coding”) for talents; image upload. Submits 3–5 selections.
4. **Skills & Suggestions**: Input pane slides left; 3 semi-transparent career boxes (e.g., “Product Designer”) fade in, opacity reflecting AI confidence based on motivations, interests, and talents. Hover scales boxes; click leads to exploration.
5. **Career Exploration**: Mind map or grid (A/B tested) with artwork, videos, and Cincinnati contacts (e.g., Procter & Gamble). Back arrow to inputs.
6. **Practice Project**: AI-generated task (e.g., “Design a sustainable toy”) with visual prompts.
7. **Wrap-Up**: Animated summary of motivations, interests, talents, and careers. Save profile or connect to UC alumni.

## Technical Requirements
- **Frontend**: React, Tailwind CSS, React Spring for animations.
- **Backend**: Flask, Hugging Face (“all-MiniLM-L6-v2”) for NLP, PostgreSQL for data (students, motivations, interests, careers).
- **APIs**: `/prompts`, `/profiles`, `/update_data`.
- **Analytics**: Google Analytics for A/B testing (mind map vs. grid).

## Success Metrics
- 90% of 50 pilot students report increased ID interest; 85% find career relevance (surveys, June–December 2025).