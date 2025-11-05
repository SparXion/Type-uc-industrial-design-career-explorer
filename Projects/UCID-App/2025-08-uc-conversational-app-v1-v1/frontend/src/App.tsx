import React, { useState } from 'react';

function App() {
  const [message, setMessage] = useState('');
  const [conversation, setConversation] = useState<Array<{message: string, response: string}>>([]);

  const sendMessage = async () => {
    if (!message.trim()) return;
    
    try {
      const response = await fetch('http://localhost:5001/api/chat', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ message: message })
      });
      const data = await response.json();
      
      setConversation(prev => [...prev, { message, response: data.response }]);
    } catch (error) {
      setConversation(prev => [...prev, { message, response: "Error connecting to backend" }]);
    }
    
    setMessage('');
  };

  return (
    <div style={{ padding: '20px', maxWidth: '600px', margin: '0 auto' }}>
      <h1>UC Conversational App</h1>
      
      <div style={{ marginBottom: '20px' }}>
        {conversation.map((item, index) => (
          <div key={index} style={{ marginBottom: '10px' }}>
            <div><strong>You:</strong> {item.message}</div>
            <div><strong>App:</strong> {item.response}</div>
          </div>
        ))}
      </div>
      
      <div>
        <input
          type="text"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          placeholder="Type your message..."
          style={{ width: '70%', padding: '8px' }}
        />
        <button onClick={sendMessage} style={{ padding: '8px 16px', marginLeft: '10px' }}>
          Send
        </button>
      </div>
    </div>
  );
}

export default App;
