import React, { useState, useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { llmService } from '../services/llmService';
import { ConversationContext, DiscoveryPrompt } from '../types/conversation';

interface Message {
  id: number;
  text: string;
  isUser: boolean;
  timestamp: Date;
}

const ConversationalInterface: React.FC = () => {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: 1,
      text: "Hi! I'm here to help you discover your interests and talents in Industrial Design. Let's start with something simple - what kinds of things do you enjoy creating or working on?",
      isUser: false,
      timestamp: new Date()
    }
  ]);
  const [inputValue, setInputValue] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [isExpanded, setIsExpanded] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const navigate = useNavigate();

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSendMessage = async () => {
    if (!inputValue.trim()) return;

    if (!isExpanded) {
      setIsExpanded(true);
    }

    const userMessage: Message = {
      id: Date.now(),
      text: inputValue.trim(),
      isUser: true,
      timestamp: new Date()
    };

    setMessages(prev => {
      const updatedMessages = [...prev, userMessage];
      
      // Generate contextual AI response using LLM service with updated messages
      (async () => {
        try {
          const userMessages = updatedMessages.filter(m => m.isUser).map(m => m.text);
          
          const defaultPrompt: DiscoveryPrompt = {
            id: 'conversation-1',
            question: "Hi! I'm here to help you discover your interests and talents in Industrial Design. Let's start with something simple - what kinds of things do you enjoy creating or working on?",
            followUp: [],
            category: 'talents'
          };

          const context: ConversationContext = {
            currentPrompt: defaultPrompt,
            userResponses: userMessages,
            category: 'talents',
            currentStep: userMessages.length,
            stepResponses: {}
          };

          const aiResponse = await llmService.generateResponse(context);
          
          const aiMessage: Message = {
            id: Date.now() + 1,
            text: aiResponse,
            isUser: false,
            timestamp: new Date()
          };

          setMessages(prevMsgs => [...prevMsgs, aiMessage]);
          setIsTyping(false);

          // After 3 exchanges, show continue button
          if (updatedMessages.length >= 5) {
            setTimeout(() => {
              const continueMessage: Message = {
                id: Date.now() + 2,
                text: "Great! I have a good sense of your interests. Ready to explore some career paths?",
                isUser: false,
                timestamp: new Date()
              };
              setMessages(prevMsgs => [...prevMsgs, continueMessage]);
            }, 1000);
          }
        } catch (error) {
          console.error('Error generating AI response:', error);
          setIsTyping(false);
          const errorMessage: Message = {
            id: Date.now() + 1,
            text: "I'm having trouble processing that right now. Could you try rephrasing?",
            isUser: false,
            timestamp: new Date()
          };
          setMessages(prevMsgs => [...prevMsgs, errorMessage]);
        }
      })();
      
      return updatedMessages;
    });
    setInputValue('');
    setIsTyping(true);
  };

  const handleContinue = () => {
    navigate('/collection');
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  const handleInputFocus = () => {
    if (!isExpanded) {
      setIsExpanded(true);
    }
  };

  const handleBoxClick = (e: React.MouseEvent) => {
    if (!isExpanded && e.target === e.currentTarget) {
      setIsExpanded(true);
    }
  };

  return (
    <div className="uc-chat-wrapper">
      <div 
        className={`uc-chat-box ${isExpanded ? 'uc-chat-box-expanded' : 'uc-chat-box-collapsed'}`}
        onClick={handleBoxClick}
      >
        <div className="uc-chat-messages">
          {messages.map((message) => (
            <div
              key={message.id}
              className={`uc-chat-message ${message.isUser ? 'uc-chat-message-user' : 'uc-chat-message-ai'}`}
            >
              {message.text}
            </div>
          ))}
          
          {isTyping && (
            <div className="uc-chat-message uc-chat-message-ai">
              <div className="uc-typing-dots">
                <span></span>
                <span></span>
                <span></span>
              </div>
            </div>
          )}
          
          <div ref={messagesEndRef} />
        </div>

        <div 
          className="uc-chat-input-wrapper"
          onClick={(e) => e.stopPropagation()}
        >
          <input
            type="text"
            className="uc-chat-input"
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            onKeyPress={handleKeyPress}
            onFocus={handleInputFocus}
            placeholder={isExpanded ? "Tell me about your interests..." : "Start a conversation..."}
            disabled={isTyping}
          />
          <button
            className="uc-chat-send-button"
            onClick={handleSendMessage}
            disabled={!inputValue.trim() || isTyping}
          >
            Send
          </button>
        </div>

        {messages.length >= 6 && (
          <div className="uc-chat-continue">
            <button
              className="uc-button-primary"
              onClick={handleContinue}
            >
              Continue to Career Exploration
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default ConversationalInterface;