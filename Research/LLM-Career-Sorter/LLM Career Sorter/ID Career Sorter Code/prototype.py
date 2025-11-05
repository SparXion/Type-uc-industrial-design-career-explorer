**Summary**: `prototype.py` is the main script for the Industrial Design Career Sorter, running in a Python virtual environment on macOS. It connects to the `idcareersorter` Neo4j database, uses `sentence-transformers` (`all-MiniLM-L6-v2`) to match user inputs (e.g., “I loved drawing spaceships”) to interests via cosine similarity, and retrieves associated skills and roles. Features include an interactive input loop (exit with “exit”), “Concept Art” skill highlighting, course suggestions for roles, output logging to `career_sorter_output.txt`, a session-wide role summary, and input validation. The script is versioned (1.0, May 2025) and integrated with GitHub (`JohnnyCarthief/id-career-sorter`).

# Industrial Design Career Sorter
# Version: 1.0 (May 2025)
# Matches childhood interests to design careers using Neo4j and sentence-transformers

from neo4j import GraphDatabase
from sentence_transformers import SentenceTransformer
import numpy as np
from datetime import datetime

# Neo4j connection details
NEO4J_URI = "bolt://localhost:7687"
NEO4J_USER = "neo4j"
NEO4J_PASSWORD = "your_password"  # Ensure this is your Neo4j password

# Initialize SentenceTransformer model
model = SentenceTransformer('all-MiniLM-L6-v2')

# Learning resources for roles
LEARNING_RESOURCES = {
    "Concept Designer": "Coursera: Concept Art for Video Games (California Institute of the Arts)",
    "Toy Designer": "Udemy: Toy Design and Prototyping Fundamentals",
    "Product Designer": "Coursera: Product Design and Development (University of Pennsylvania)",
    "Industrial Designer": "LinkedIn Learning: Industrial Design Foundations",
    "Prototype Specialist": "Udemy: Rapid Prototyping for Product Design",
    "Interaction Designer": "Coursera: Interaction Design Specialization (UC San Diego)",
    "Game Designer": "Udemy: Complete Guide to Game Design",
    "Furniture Designer": "Domestika: Furniture Design and Woodworking",
    "Exhibit Designer": "LinkedIn Learning: Exhibition Design Basics",
    "Branding Designer": "Coursera: Graphic Design Specialization (CalArts)",
    "Product Photographer": "Skillshare: Product Photography for E-Commerce",
    "Consumer Product Designer": "Coursera: Product Design and Innovation",
    "Fashion Designer": "Udemy: Fashion Design and Creation",
    "Packaging Designer": "Domestika: Packaging Design Fundamentals",
    "Multimedia Designer": "Coursera: Multimedia Design Basics",
    "Repair Designer": "iFixit: Repair and Design Fundamentals (Free Guides)",
    "Material Designer": "LinkedIn Learning: Material Science for Design",
    "Outdoor Gear Designer": "Udemy: Outdoor Product Design",
    "Soft Goods Designer": "Domestika: Textile Design for Products",
    "Accessory Designer": "Skillshare: Accessory Design Essentials",
    "Interior Designer": "Coursera: Interior Design Fundamentals",
    "Software-Integrated Designer": "Udemy: Designing for IoT and Smart Products",
    "Sustainable Designer": "Coursera: Sustainable Design and Innovation",
    "Game Peripheral Designer": "LinkedIn Learning: Designing Gaming Accessories",
    "Automotive Designer": "Udemy: Automotive Design and Styling"
}

def get_interests(tx):
    """Query Neo4j for interest nodes with descriptions."""
    query = "MATCH (i:Interest) RETURN i.name AS name, i.description AS description"
    result = tx.run(query)
    return [(record["name"], record["description"]) for record in result]

def get_roles_for_interest(tx, interest_name):
    """Query skills and roles for a given interest, highlighting Concept Art."""
    query = """
    MATCH (i:Interest {name: $name})-[:DEVELOPS]->(s:Skill)-[:LEADS_TO]->(r:Role)
    RETURN s.name AS skill, r.name AS role, s.name = 'Concept Art' AS is_concept_art
    ORDER BY is_concept_art DESC
    """
    result = tx.run(query, name=interest_name)
    return [(record["skill"], record["role"], record["is_concept_art"]) for record in result]

def compute_similarity(user_input, interests):
    """Compute cosine similarity between user input and interest descriptions."""
    user_embedding = model.encode(user_input)
    interest_embeddings = model.encode([interest[1] for interest in interests])
    similarities = np.dot(interest_embeddings, user_embedding) / (
        np.linalg.norm(interest_embeddings, axis=1) * np.linalg.norm(user_embedding)
    )
    return similarities

def run_sorter(driver, user_input, output_lines, unique_roles):
    """Run the sorter for a single input and append results to output_lines."""
    output_lines.append(f"Input: {user_input}\n")
    output_lines.append("Based on your input, here are the top matching interests and career paths:\n")
    
    try:
        with driver.session(database="idcareersorter") as session:
            # Get interests from Neo4j
            interests = session.execute_read(get_interests)
            if not interests:
                print("No interests found in the database.")
                output_lines.append("No interests found in the database.\n")
                return
            
            # Compute similarities
            similarities = compute_similarity(user_input, interests)
            
            # Sort interests by similarity
            sorted_interests = sorted(
                zip(interests, similarities), key=lambda x: x[1], reverse=True
            )
            
            # Get top 2 interests and their roles
            for (name, description), score in sorted_interests[:2]:
                print(f"\nInterest: {name} (Similarity = {score:.4f})")
                print(f"Description: {description}")
                output_lines.append(f"\nInterest: {name} (Similarity = {score:.4f})\n")
                output_lines.append(f"Description: {description}\n")
                # Get skills and roles
                skills_roles = session.execute_read(get_roles_for_interest, name)
                if skills_roles:
                    print("Skills and Roles:")
                    output_lines.append("Skills and Roles:\n")
                    for skill, role, is_concept_art in skills_roles:
                        prefix = "[Concept Art Skill] " if is_concept_art else "  - "
                        print(f"{prefix}Skill: {skill} → Role: {role}")
                        output_lines.append(f"{prefix}Skill: {skill} → Role: {role}\n")
                        unique_roles.add(role)  # Track unique roles
                        if role in LEARNING_RESOURCES:
                            print(f"    Suggested Course: {LEARNING_RESOURCES[role]}")
                            output_lines.append(f"    Suggested Course: {LEARNING_RESOURCES[role]}\n")
                else:
                    print("  No specific skills or roles found for this interest.")
                    output_lines.append("  No specific skills or roles found for this interest.\n")
    
    except Exception as e:
        print(f"Error: {e}")
        output_lines.append(f"Error: {e}\n")

def main():
    driver = GraphDatabase.driver(NEO4J_URI, auth=(NEO4J_USER, NEO4J_PASSWORD))
    unique_roles = set()  # Track unique roles across runs
    try:
        while True:
            user_input = input("Enter your childhood interests (type 'exit' to quit): ")
            if user_input.lower() == "exit":
                break
            if not user_input.strip():
                print("Error: Input cannot be empty. Please try again.")
                continue
            
            # Prepare output for file
            output_lines = [f"Career Sorter Output - {datetime.now().strftime('%Y-%m-%d %H:%M:%S')}\n"]
            run_sorter(driver, user_input, output_lines, unique_roles)
            
            # Save output to file
            with open("career_sorter_output.txt", "a") as f:
                f.writelines(output_lines)
                f.write("\n---\n")
            print("\nOutput saved to career_sorter_output.txt")
        
        # Print summary of unique roles
        if unique_roles:
            print("\nSummary of Suggested Career Paths:")
            for role in sorted(unique_roles):
                print(f"- {role}")
                if role in LEARNING_RESOURCES:
                    print(f"  Suggested Course: {LEARNING_RESOURCES[role]}")
        else:
            print("\nNo career paths suggested in this session.")
    
    finally:
        driver.close()

if __name__ == "__main__":
    main()