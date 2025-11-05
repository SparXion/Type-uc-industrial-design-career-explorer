# UCID North Star: Industrial Design Career Explorer

*Last Updated: August 28, 2025*  
*Version: 1.0*

## 🎯 Vision Statement

**The student has been able to discover their interests + talents to create a career path to guide them in their Industrial Design Education at the University of Cincinnati.**

## 🚨 Problem Statement

Industrial Design is a wide-ranging professional field with nearly infinite possibilities, which poses the problem of discerning a career path. **It's too big!** A powerful way to discern a career path is to follow your interests and combine them with your talents to generate a guide to develop the necessary skills to have a career in Industrial Design targeted specifically to **YOU!**

## 👥 Target Users

**Primary:** Industrial Design Students at the University of Cincinnati School of Design (SOD) at The College of Design Architecture Art and Planning.

**Context:** Limited understanding of the scope of Industrial Design.

**Top Jobs-to-be-Done:**
1. Identify interests + talents
2. Connect them to sub-disciplines within the world of Industrial Design

## ❌ Non-Goals

*To be defined as we iterate*

## 📊 Success Metrics

**Student Outcomes:**
- ✅ Identify 3-5 career paths that align with their interests and talents
- ✅ Articulate a vision for their careers
- ✅ Identify skill sets they want to develop
- ✅ Identify companies they want to target for their development
- ✅ Identify concrete steps toward their career paths:
  - Skills to develop
  - Companies to reach out to
  - Coaching on how to reach out to companies (separate skills from ID-specific)

## 🚀 V1 Scope vs. V2+

### V1 (Current Target)
- **Solely targeting Industrial Design Students**
- Conversational discernment of interests and talents
- Narrowing down to suggested career paths
- Ability to explore suggestions with mind map or grid
- "Rabbit hole" curiosity-driven discovery process

### V2+ Expansion
- Different disciplines: Communication Design (CODE), Fashion Design (FASH), anything creative
- Future versions: Adapt to just about any industry

## 💬 Conversational Principles

**Core Approach:** Curious and gently probing, mix of prompts/questions/word salad interpretation

**Key Behaviors:**
- Elicit insights that may be tucked away and not on the top of the student's mind
- Non-intrusive interaction
- Data privacy features
- Avoid revealing identifying personal information
- Keep it light and fun

**Technical:** Say anything and the system can discern the core concepts

## 🎨 UX Anchors

### Anchor 1: Opening Scene
- **Video:** `what-Is-ID-001.mp4` - **FILL THE SCREEN**
- Skip button acceptable

### Anchor 2: Video Transition
- End of video shows `Artboard 13.png`
- Seamless transition with "ready?" text
- Arrow button appears
- Pressing arrow launches the application

### Anchor 3: Conversation Start
- Start of conversation page
- May begin with prompt from "icebreakers" document
- Further NLP training integration
- Reference: `Artboard 14.png`

### Anchor 4: Data Collection
- `Artboard 15.png` starts collecting answers (talents + interests)
- Another arrow button appears

### Anchor 5: Career Exploration
- Launches career exploration page
- Five contextual/subject/career path boxes
- Hover effects for emphasis
- Click to activate "rabbit hole" discovery mind map or grid
- Tied to specific subject areas

## 🏗️ System Overview

### Database Change
- **Significant change:** MongoDB → **PostgreSQL** (required)
- Security and privacy requirements must be adhered to
- Open to better execution methods, particularly for conversation style

### Grant Requirements
- Reference: `Violette_BearcatAIGrants.pdf` in training folder
- Security and privacy standards must meet grant application requirements

## 📚 Data Sources

### Training Materials
The markdowns found in the training folder start the process of training the LLM to make the associations necessary for students to explore the scope of industrial design, constrained to:
- Interests + talents
- Possible career paths

### Student Profiles
- Students create unique profiles
- Maintained for indefinite amount of time
- Privacy and security paramount

## 🔗 Integrations

### Required
- **PostgreSQL** (database - must)
- Docker
- AWS (likely)
- Hugging Face (likely)

### To Investigate
- Scour the UC | APP DESIGN MASTER folder to discern additional requirements
- Grant application specifications
- Security compliance requirements

## ⚠️ Risks & Assumptions

### Student Knowledge Assumption
- **Assume zero knowledge** except for the name "Industrial Design"
- Some students will have some knowledge - accommodate for that
- Design for both complete beginners and those with partial knowledge

### Data Security Requirements
- **Super secure** according to grant application standards
- FERPA/GDPR-compliant storage on PostgreSQL
- Protect student anonymity
- No exposure to anything that might compromise their data

### Process Transparency
- Need transparency in the association process
- Figure out how to make the AI decision-making process explainable

## 📅 Timeline

### Phase 1: August 2025
- Develop platform and databases

### Phase 2: September–December 2025
- Pilot with 50 students
- Mid-year report (November 14, 2025)

### Phase 3: January–February 2026
- Evaluate pilot
- Present at UC AI Symposium (February 2026)

### Phase 4: March–April 2026
- Finalize evaluation
- End-of-year report (April 17, 2026)

## 📝 Naming & Glossary

*To be captured as we go - document key terms the app uses*

## 🔍 Key Documents

### Starter Training Materials
1. `UCID-IceBreaker-Questions-Combined.markdown`
2. `2025-08-25-UCID - App Activities.md`
3. `2025-08-25-UCID - App Drawing Items.md`
4. `2025-08-25-UCID - App Manifestations.md`
5. `2025-08-25-UCID - App SciFi Design.md`
6. `2025-08-25-UCID - App Talents.md`

### Reference Documents
- `Violette_BearcatAIGrants.pdf` - Grant requirements and specifications
- `2025-0814-IDCareerExplorerPRDv2.md` - Product Requirements Document

### Assets
- Video: `what-Is-ID-001.mp4` (opening scene)
- Artboards: 13, 14, 15 (key UX transitions)

## 🎯 Next Steps

1. **Review and validate** this North Star document
2. **Add grant PDF and PRD** to Starter-Training folder
3. **Identify discrepancies** between PRD and current vision
4. **Begin technical architecture** planning
5. **Start conversation flow** design
6. **Plan pilot program** logistics

---

*This document serves as the guiding light for all development decisions. Update as requirements evolve.*
