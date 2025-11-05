def assess_student_interests():
    print("Welcome to the Industrial Design Student AI Agent!")
    print("Please rate your interest (1-10) in the following areas:\n")
    
    # Collect student inputs with error handling
    try:
        sketching = int(input("Sketching and conceptual art (1-10): "))
        technology = int(input("Technology and gadgets (1-10): "))
        building = int(input("Hands-on building and prototyping (1-10): "))
    except (EOFError, ValueError):
        return "Error: Invalid input. Please enter numbers between 1 and 10."
    
    # Validate inputs
    if not all(1 <= x <= 10 for x in [sketching, technology, building]):
        return "Error: Please enter values between 1 and 10."
    
    # Recommendation logic
    recommendations = []
    resources = []
    
    if sketching >= 7:
        recommendations.append("Toy Design")
        resources.append("Tutorial: Sketching for Character-Driven Toy Design")
        resources.append("Case Study: Designing Collectible Figures")
    if technology >= 7:
        recommendations.append("Wearable Technology")
        resources.append("Guide: Prototyping Wearable Tech with Arduino")
        resources.append("Article: Trends in Smart Fabrics")
    if building >= 7:
        recommendations.append("Drone Design")
        resources.append("Video: Building a Quadcopter Prototype")
        resources.append("Resource: Drone Design Standards")
    
    # Generate output
    if not recommendations:
        return "No strong matches found. Try exploring more ID areas!"
    
    output = f"\nBased on your interests, we recommend focusing on:\n"
    output += "\n".join([f"- {rec}" for rec in recommendations])
    output += "\n\nSuggested Resources:\n"
    output += "\n".join([f"- {res}" for res in resources])
    output += "\n\nNext Steps: Enroll in courses like 3D Modeling or Electronics, and use our email templates to connect with professionals in these fields."
    
    return output

# Run the assessment
if __name__ == "__main__":
    result = assess_student_interests()
    print(result)