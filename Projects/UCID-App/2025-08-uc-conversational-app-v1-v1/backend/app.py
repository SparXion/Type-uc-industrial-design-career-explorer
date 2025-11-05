from flask import Flask, request, jsonify
from flask_cors import CORS
import os

app = Flask(__name__)
CORS(app)

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

@app.route('/api/health', methods=['GET'])
def health_check():
    return jsonify({"status": "healthy", "message": "Backend is running"})

if __name__ == '__main__':
    port = int(os.environ.get('PORT', 5001))
    app.run(debug=True, host='0.0.0.0', port=port)
