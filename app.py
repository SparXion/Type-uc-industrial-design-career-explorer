@app.route('/api/chat', methods=['POST'])
def chat():
    data = request.get_json()
    user_message = data.get('message', '')
    
    # Simple response logic (you can enhance this later)
    if 'hello' in user_message.lower():
        response = "Hello! How can I help you with industrial design today?"
    elif 'career' in user_message.lower():
        response = "I can help you explore industrial design careers. What interests you?"
    else:
        response = "That's interesting! Tell me more about your industrial design interests."
    
    return jsonify({"response": response})
