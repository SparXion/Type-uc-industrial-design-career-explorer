#!/usr/bin/env python3
"""
Database initialization script for UCID app
Creates tables and populates with initial data from the UCID guidelines
"""

import logging
import sys
import os
from sqlalchemy import text
from .schema import DatabaseSchema, Base
from .connection import get_engine

# Configure logging
logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)

def populate_ice_breaker_questions(engine):
    """Populate the ice_breaker_questions table with the 100 questions from UCID guidelines"""
    try:
        with engine.connect() as connection:
            # Check if questions already exist
            result = connection.execute(text("SELECT COUNT(*) FROM ice_breaker_questions"))
            if result.fetchone()[0] > 0:
                logger.info("Ice breaker questions already populated, skipping")
                return True
            
            # Sample of the 100 questions (first 20 for brevity, full list would be in production)
            questions = [
                {
                    'category': 'Toys & Playthings',
                    'question': 'What were your favorite toys growing up?',
                    'follow_ups': [
                        'What made that toy so special to you?',
                        'Did you ever modify or build something new with it?',
                        'How did playing with it make you feel creative?',
                        'Do any of those toys remind you of things you see in movies or real life now?',
                        'Would you still play with something similar today, and why?'
                    ]
                },
                {
                    'category': 'Toys & Playthings',
                    'question': 'Do you remember playing with LEGO sets as a kid?',
                    'follow_ups': [
                        'What kinds of structures or vehicles did you build most often?',
                        'Did you follow the instructions or make up your own designs?',
                        'Who did you build with—friends, family, or solo?',
                        'How did it feel when a creation came together or fell apart?',
                        'Have you used similar building blocks in hobbies or school projects since?'
                    ]
                },
                {
                    'category': 'Toys & Playthings',
                    'question': 'What action figures or dolls did you love collecting?',
                    'follow_ups': [
                        'Which superhero or character was your absolute favorite, and why?',
                        'Did you create stories or adventures for them?',
                        'How did you customize their outfits or accessories?',
                        'Did playing with them spark any interest in drawing or storytelling?',
                        'Do you see echoes of those characters in modern games or movies?'
                    ]
                },
                {
                    'category': 'Toys & Playthings',
                    'question': 'Were toy cars or trucks a big part of your playtime?',
                    'follow_ups': [
                        'What kinds of races or construction sites did you set up?',
                        'Did you ever take them apart to see how they worked?',
                        'How did weather or outdoor play change your games?',
                        'Did it lead to any interest in real vehicles or mechanics?',
                        'Would you design a dream toy car if you could?'
                    ]
                },
                {
                    'category': 'Toys & Playthings',
                    'question': 'Did you enjoy puzzles or board games during childhood?',
                    'follow_ups': [
                        'What was the hardest puzzle you ever completed?',
                        'Who was your favorite opponent in board games?',
                        'Did you invent house rules or new ways to play?',
                        'How did it help with patience or strategy?',
                        'Do you still play similar games, and how have they evolved?'
                    ]
                },
                {
                    'category': 'Media & Entertainment',
                    'question': 'What science fiction books did you read growing up?',
                    'follow_ups': [
                        'Which sci-fi worlds or technologies fascinated you most?',
                        'Did you imagine yourself in those futuristic settings?',
                        'How did those stories influence your creative thinking?',
                        'Did you draw or sketch ideas inspired by what you read?',
                        'Do you still enjoy similar stories today?'
                    ]
                },
                {
                    'category': 'Media & Entertainment',
                    'question': 'What TV shows or cartoons captured your imagination?',
                    'follow_ups': [
                        'Which characters or settings did you find most interesting?',
                        'Did you recreate scenes or invent new stories?',
                        'How did those shows influence your play or creativity?',
                        'Did you draw characters or design new scenarios?',
                        'What elements from those shows still inspire you?'
                    ]
                },
                {
                    'category': 'Media & Entertainment',
                    'question': 'What video games did you play as a child?',
                    'follow_ups': [
                        'What types of games did you enjoy most—puzzle, adventure, building?',
                        'Did you create custom levels or modify games?',
                        'How did gaming develop your problem-solving skills?',
                        'Did you imagine designing your own games?',
                        'How do those early gaming experiences influence your interests now?'
                    ]
                },
                {
                    'category': 'Activities & Hobbies',
                    'question': 'Did you enjoy drawing or art as a child?',
                    'follow_ups': [
                        'What did you love to draw most—characters, vehicles, buildings?',
                        'Did you experiment with different art materials?',
                        'How did drawing help you express your ideas?',
                        'Did you create stories or worlds through your art?',
                        'How has your artistic interest evolved over time?'
                    ]
                },
                {
                    'category': 'Activities & Hobbies',
                    'question': 'What creative projects did you work on?',
                    'follow_ups': [
                        'What materials did you enjoy working with most?',
                        'Did you follow instructions or create your own designs?',
                        'How did you feel when a project was completed?',
                        'Did you share your creations with others?',
                        'How did those projects develop your skills?'
                    ]
                },
                {
                    'category': 'Activities & Hobbies',
                    'question': 'Did you participate in science fairs or experiments?',
                    'follow_ups': [
                        'What types of projects did you choose?',
                        'How did you design and test your experiments?',
                        'What did you learn about the scientific process?',
                        'Did you create models or prototypes?',
                        'How did those experiences influence your problem-solving approach?'
                    ]
                },
                {
                    'category': 'Talents & Skills',
                    'question': 'What came naturally to you as a child?',
                    'follow_ups': [
                        'How did you discover these natural abilities?',
                        'Did you enjoy activities that used these talents?',
                        'How did others respond to your natural skills?',
                        'Did you seek out opportunities to develop them further?',
                        'How do these early talents relate to your current interests?'
                    ]
                },
                {
                    'category': 'Talents & Skills',
                    'question': 'What skills did you develop through practice?',
                    'follow_ups': [
                        'What motivated you to keep practicing?',
                        'How did you measure your progress?',
                        'What challenges did you overcome?',
                        'How did practice change your approach to learning?',
                        'What did you learn about yourself through this process?'
                    ]
                },
                {
                    'category': 'Problem Solving',
                    'question': 'How did you approach challenges as a child?',
                    'follow_ups': [
                        'What types of problems did you enjoy solving?',
                        'How did you break down complex challenges?',
                        'Did you work alone or with others?',
                        'How did you feel when you solved a difficult problem?',
                        'How has your problem-solving approach evolved?'
                    ]
                },
                {
                    'category': 'Collaboration',
                    'question': 'What group projects did you enjoy?',
                    'follow_ups': [
                        'What role did you typically take in group work?',
                        'How did you contribute to team success?',
                        'What did you learn about working with others?',
                        'How did collaboration enhance your creativity?',
                        'What skills did you develop through teamwork?'
                    ]
                },
                {
                    'category': 'Innovation',
                    'question': 'Did you ever invent or modify things?',
                    'follow_ups': [
                        'What inspired your inventions or modifications?',
                        'How did you test your ideas?',
                        'What did you learn from the process?',
                        'How did others react to your innovations?',
                        'How did these experiences shape your creative thinking?'
                    ]
                },
                {
                    'category': 'Spatial Thinking',
                    'question': 'How did you interact with 3D spaces?',
                    'follow_ups': [
                        'Did you enjoy building with blocks or construction toys?',
                        'How did you navigate new environments?',
                        'Did you create maps or diagrams?',
                        'How did you visualize objects from different angles?',
                        'How has your spatial awareness developed over time?'
                    ]
                },
                {
                    'category': 'Storytelling',
                    'question': 'Did you create stories or narratives?',
                    'follow_ups': [
                        'What types of stories did you tell?',
                        'How did you develop your characters or worlds?',
                        'Did you act out stories or create props?',
                        'How did storytelling help you express ideas?',
                        'How has your storytelling evolved over time?'
                    ]
                },
                {
                    'category': 'Technology',
                    'question': 'How did you interact with technology?',
                    'follow_ups': [
                        'What devices or gadgets fascinated you?',
                        'Did you try to understand how they worked?',
                        'How did you learn to use new technology?',
                        'Did you imagine designing technology?',
                        'How has your relationship with technology evolved?'
                    ]
                },
                {
                    'category': 'Nature & Science',
                    'question': 'What natural phenomena interested you?',
                    'follow_ups': [
                        'How did you explore the natural world?',
                        'What questions did you have about nature?',
                        'Did you conduct experiments or observations?',
                        'How did nature inspire your creativity?',
                        'How has your curiosity about nature developed?'
                    ]
                }
            ]
            
            # Insert questions
            for q in questions:
                connection.execute(text("""
                    INSERT INTO ice_breaker_questions (category, question, follow_ups)
                    VALUES (:category, :question, :follow_ups)
                """), {
                    'category': q['category'],
                    'question': q['question'],
                    'follow_ups': q['follow_ups']
                })
            
            connection.commit()
            logger.info(f"Successfully populated {len(questions)} ice breaker questions")
            return True
            
    except Exception as e:
        logger.error(f"Failed to populate ice breaker questions: {e}")
        return False

def populate_reference_data(engine):
    """Populate reference tables with data from UCID guidelines"""
    try:
        with engine.connect() as connection:
            # Populate design items categories
            design_categories = [
                'Furniture and Homeware',
                'Packaging and Containers', 
                'Fashion, Jewelry, and Accessories',
                'Lighting Products',
                'Toys, Games, and Recreation',
                'Digital and Electronic Devices',
                'Vehicles and Transportation',
                'Home Appliances',
                'Tools and Equipment',
                'Medical and Scientific Devices',
                'Food and Culinary Items',
                'Building Materials and Components',
                'Heavy Machinery',
                'Sports, Entertainment, and Recreation Equipment',
                'Safety Clothing and Personal Protective Equipment',
                'Pet Supplies and Animal Products',
                'Baby, Kids, and Children\'s Products'
            ]
            
            for category in design_categories:
                connection.execute(text("""
                    INSERT INTO design_items (category, name, description)
                    VALUES (:category, :name, :description)
                    ON CONFLICT DO NOTHING
                """), {
                    'category': category,
                    'name': category,
                    'description': f'Industrial design category for {category.lower()}'
                })
            
            # Populate manifestation methods
            manifestation_methods = [
                ('2D', 'Hand-drawn sketches', 'Traditional drawing with pencil, ink, markers'),
                ('2D', 'Digital sketches', 'Digital drawing using tablets and software'),
                ('2D', 'Technical drawings', 'Orthographic, perspective, and exploded views'),
                ('3D', '3D modeling', 'Digital 3D creation using CAD software'),
                ('3D', 'Digital sculpting', '3D sculpting using tools like ZBrush'),
                ('Physical', 'Clay models', 'Hand-sculpted physical prototypes'),
                ('Physical', '3D printing', 'Additive manufacturing for rapid prototyping'),
                ('Physical', 'Foam models', 'Lightweight foam construction for concept testing'),
                ('Digital', 'Rendering', 'Photorealistic visualization of designs'),
                ('Digital', 'Animation', 'Moving representations of design concepts')
            ]
            
            for method in manifestation_methods:
                connection.execute(text("""
                    INSERT INTO manifestation_methods (category, method, description)
                    VALUES (:category, :method, :description)
                    ON CONFLICT DO NOTHING
                """), {
                    'category': method[0],
                    'method': method[1],
                    'description': method[2]
                })
            
            # Populate talents
            talents = [
                ('Creative & Artistic', 'Drawing', 'Ability to visualize and communicate through sketches'),
                ('Creative & Artistic', 'Sculpting', 'Working with 3D forms and materials'),
                ('Creative & Artistic', 'Color Theory', 'Understanding color relationships and psychology'),
                ('Technical & Mechanical', 'Problem Solving', 'Analyzing and solving complex design challenges'),
                ('Technical & Mechanical', 'Spatial Reasoning', 'Understanding 3D space and relationships'),
                ('Technical & Mechanical', 'Prototyping', 'Creating physical or digital models'),
                ('Interpersonal', 'Communication', 'Explaining design concepts clearly'),
                ('Interpersonal', 'Collaboration', 'Working effectively in team environments'),
                ('Analytical', 'Research', 'Gathering and analyzing user needs and market data'),
                ('Analytical', 'Critical Thinking', 'Evaluating design solutions objectively')
            ]
            
            for talent in talents:
                connection.execute(text("""
                    INSERT INTO talents (category, talent, description)
                    VALUES (:category, :talent, :description)
                    ON CONFLICT DO NOTHING
                """), {
                    'category': talent[0],
                    'talent': talent[1],
                    'description': talent[2]
                })
            
            connection.commit()
            logger.info("Successfully populated reference data")
            return True
            
    except Exception as e:
        logger.error(f"Failed to populate reference data: {e}")
        return False

def main():
    """Main function to initialize the database"""
    try:
        logger.info("Starting database initialization...")
        
        # Get database engine
        engine = get_engine()
        if not engine:
            logger.error("Failed to get database engine")
            return False
        
        # Create schema manager
        schema = DatabaseSchema()
        
        # Set up database
        if not schema.setup_database():
            logger.error("Failed to set up database schema")
            return False
        
        # Populate with initial data
        if not populate_ice_breaker_questions(engine):
            logger.error("Failed to populate ice breaker questions")
            return False
        
        if not populate_reference_data(engine):
            logger.error("Failed to populate reference data")
            return False
        
        logger.info("Database initialization completed successfully!")
        return True
        
    except Exception as e:
        logger.error(f"Database initialization failed: {e}")
        return False

if __name__ == "__main__":
    success = main()
    sys.exit(0 if success else 1)
