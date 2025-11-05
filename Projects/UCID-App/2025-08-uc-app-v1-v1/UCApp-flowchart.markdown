# Flowchart: Industrial Design Career Explorer Interface

## Legend
- **Node**: [Screen Name] - Represents a user interface screen.
- **Edge**: --> - Indicates a transition between screens or actions.
- **Decision**: ? - Marks a user choice or branching path.
- **Annotation**: (Note: ...) - Describes animations, AI actions, or feedback.

## Flowchart
1. [Landing Page]  
   - Displays animated splash with Industrial Design assets.  
   - Shows registration/login form and welcome message.  
   --> Click "Start Now" --> [Interests Input]  
   (Note: Smooth fade-in animation for assets; form validates username/password.)

2. [Interests Input]  
   - Visual cards (e.g., “sci-fi movies”) and image upload for interests.  
   ? Select cards or upload image ?  
   --> Submit 3–5 inputs --> [Creative Outlets Input]  
   (Note: Cards zoom in on hover; AI stores selections in MongoDB.)

3. [Creative Outlets Input]  
   - Visual tiles (e.g., “coding”) and image upload for talents.  
   ? Select tiles or upload image ?  
   --> Submit 3–5 inputs --> [Skills & Suggestions]  
   (Note: Tiles glow when selected; AI highlights unrecognized talents.)

4. [Skills & Suggestions]  
   - Input area slides left; 3 semi-transparent career boxes (e.g., “Concept Artist”) appear.  
   ? Continue input or click career box ?  
   --> Continue input --> Update boxes (fade/strengthen)  
   --> Click career box --> [Career Exploration]  
   (Note: Boxes adjust opacity based on AI confidence; hover scales boxes.)

5. [Career Exploration]  
   - Displays mind map or grid (A/B testing) with artwork, videos, industry contacts.  
   ? Select content box or “Practice Project” ?  
   --> Select content box --> [Sub-Exploration]  
   --> Click “Practice Project” --> [Practice Project]  
   --> Click back arrow --> [Skills & Suggestions]  
   (Note: Left-to-right slide transition; content from MongoDB Atlas.)

6. [Sub-Exploration]  
   - 2–3 layers of sub-grids/maps with deeper content.  
   ? Select sub-box or back ?  
   --> Select sub-box --> Deeper layer or content  
   --> Click back --> [Career Exploration]  
   (Note: Fluid transitions; feedback sliders refine AI suggestions.)

7. [Practice Project]  
   - AI-generated task (e.g., “Design sci-fi gadget”) with guided steps.  
   --> Complete or back --> [Career Exploration]  
   (Note: Task aligns with user skills; saves progress to profile.)

8. [Wrap-Up]  
   - Summarizes interests, talents, careers, and project (if completed).  
   ? Save profile or connect with industry ?  
   --> Save --> End session  
   --> Connect --> External links (e.g., UC alumni)  
   (Note: Animated summary display; mobile-friendly.)

## Notes
- **A/B Testing**: [Career Exploration] tests mind map vs. grid, tracking engagement via Google Analytics.  
- **Feedback Loops**: Sliders in [Career Exploration] and [Sub-Exploration] refine AI outputs.  
- **Transitions**: All screen changes use smooth animations (e.g., slides, fades) for a conversational feel.