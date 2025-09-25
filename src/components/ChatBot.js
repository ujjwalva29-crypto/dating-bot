import React, { useState, useRef, useEffect } from 'react';
import { sendMessage } from '../services/asiApi';
import './ChatBot.css';

const ChatBot = () => {
  const [messages, setMessages] = useState([
    {
      role: 'assistant',
      content: '👋 Hey there! I\'m your personal dating coach and profile analyst. I can help you with:\n\n💡 Dating advice and strategies\n📊 Profile analysis and improvements\n💌 Personalized pickup lines\n💬 Conversation starters based on bio data\n\nWhat would you like help with today?'
    }
  ]);
  const [inputMessage, setInputMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [conversationHistory, setConversationHistory] = useState([]);
  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSendMessage = async (e) => {
    e.preventDefault();
    if (!inputMessage.trim() || isLoading) return;

    const userMessage = { role: 'user', content: inputMessage.trim() };
    setMessages(prev => [...prev, userMessage]);
    setInputMessage('');
    setIsLoading(true);

    try {
      // Send message with conversation history for context
      const response = await sendMessage(inputMessage.trim(), conversationHistory);
      const assistantMessage = { 
        role: 'assistant', 
        content: response.choices[0].message.content 
      };
      
      // Update both messages and conversation history
      setMessages(prev => [...prev, assistantMessage]);
      setConversationHistory(prev => [
        ...prev.slice(-10), // Keep last 10 messages for context
        userMessage,
        assistantMessage
      ]);
    } catch (error) {
      console.error('Error sending message:', error);
      const errorMessage = { 
        role: 'assistant', 
        content: 'Sorry, I encountered an error. Please check your API key and try again.' 
      };
      setMessages(prev => [...prev, errorMessage]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleQuickAction = (action) => {
    const quickMessages = {
      'profile_analysis': 'I need help analyzing my dating profile. Can you review it and give me suggestions for improvement?',
      'pickup_line': 'Can you help me create a personalized pickup line based on someone\'s interests and bio?',
      'conversation_starter': 'I need a good conversation starter based on someone\'s profile information.',
      'dating_advice': 'I\'d like some general dating advice and strategies for better success.'
    };
    
    setInputMessage(quickMessages[action]);
  };

  return (
    <div className="chatbot">
      <div className="chat-container">
        <div className="messages">
          {messages.map((message, index) => (
            <div
              key={index}
              className={`message ${message.role === 'user' ? 'user-message' : 'assistant-message'}`}
            >
              <div className="message-content">
                {message.content.split('\n').map((line, i) => (
                  <div key={i}>{line}</div>
                ))}
              </div>
            </div>
          ))}
          {isLoading && (
            <div className="message assistant-message">
              <div className="message-content">
                <div className="typing-indicator">
                  <span></span>
                  <span></span>
                  <span></span>
                </div>
              </div>
            </div>
          )}
          <div ref={messagesEndRef} />
        </div>
        
        {/* Quick Action Buttons */}
        <div className="quick-actions">
          <button 
            onClick={() => handleQuickAction('profile_analysis')}
            className="quick-action-btn"
          >
            📊 Profile Analysis
          </button>
          <button 
            onClick={() => handleQuickAction('pickup_line')}
            className="quick-action-btn"
          >
            💌 Pickup Lines
          </button>
          <button 
            onClick={() => handleQuickAction('conversation_starter')}
            className="quick-action-btn"
          >
            💬 Conversation Starters
          </button>
          <button 
            onClick={() => handleQuickAction('dating_advice')}
            className="quick-action-btn"
          >
            💡 Dating Advice
          </button>
        </div>
        
        <form onSubmit={handleSendMessage} className="input-form">
          <div className="input-container">
            <input
              type="text"
              value={inputMessage}
              onChange={(e) => setInputMessage(e.target.value)}
              placeholder="Ask me anything about dating, profiles, or pickup lines..."
              disabled={isLoading}
              className="message-input"
            />
            <button
              type="submit"
              disabled={!inputMessage.trim() || isLoading}
              className="send-button"
            >
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <line x1="22" y1="2" x2="11" y2="13"></line>
                <polygon points="22,2 15,22 11,13 2,9 22,2"></polygon>
              </svg>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ChatBot;
