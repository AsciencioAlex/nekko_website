import React, { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPaperPlane } from '@fortawesome/free-solid-svg-icons';
import './App.css';

const API_URL = 'http://localhost:8000';

function App() {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const [conversationContext, setConversationContext] = useState("");
  const messagesEndRef = useRef(null);

  useEffect(() => {
    // Initialize conversation
    if (messages.length === 0) {
      addBotMessage("Hello! I'm Nekko BhAI. How can I help you today?");
    }
  }, []);

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  const addBotMessage = (text) => {
    setMessages(prev => [...prev, {
      sender: 'bot',
      text: text,
      time: new Date().toLocaleTimeString()
    }]);
  };

  const handleSendMessage = async () => {
    if (!input.trim()) return;

    // Add user message
    const userMessage = {
      sender: 'user',
      text: input,
      time: new Date().toLocaleTimeString()
    };
    
    setMessages(prev => [...prev, userMessage]);
    setInput("");

    try {
      const response = await axios.post(`${API_URL}/chat`, {
        user_input: input,
        conversation_context: conversationContext
      });

      const botResponse = response.data.bot_response;
      setConversationContext(response.data.updated_context);
      
      addBotMessage(botResponse);

      // Check if we need to collect lead information
      if (response.data.requires_lead_info) {
        promptForLeadInfo();
      }

    } catch (error) {
      console.error('Chat error:', error);
      addBotMessage("Sorry, I'm having trouble connecting. Please try again later.");
    }
  };

  const promptForLeadInfo = () => {
    const questions = [
      "May I have your name please?",
      "Could you share your phone number?",
      "What's your email address? (optional)",
      "Any specific pain points or challenges you'd like to share?"
    ];

    questions.forEach((question, index) => {
      setTimeout(() => addBotMessage(question), (index + 1) * 1000);
    });
  };

  const handleInputChange = (e) => setInput(e.target.value);

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') handleSendMessage();
  };

  return (
    <div className="chat-container">
      <main className="chat-main">
        <div className="chat-container">
          <div className="chat-header">
            <div className="chat-header-left">
              <img src="https://api.dicebear.com/7.x/notionists/svg?scale=200&seed=123" 
                   alt="Bot Avatar" 
                   className="avatar" />
              <div>
                <h2>Nekko BhAI</h2>
                <p className="status">Online</p>
              </div>
            </div>
          </div>

          <div className="chat-messages">
            {messages.map((msg, index) => (
              <div key={index} className={`message ${msg.sender}`}>
                <img src={`https://api.dicebear.com/7.x/notionists/svg?scale=200&seed=${msg.sender === 'user' ? '456' : '123'}`}
                     alt={`${msg.sender} avatar`}
                     className="avatar" />
                <div className={`message-bubble ${msg.sender}`}>
                  <p>{msg.text}</p>
                  <span className="timestamp">{msg.time}</span>
                </div>
              </div>
            ))}
            <div ref={messagesEndRef} />
          </div>

          <div className="chat-input">
            <input
              type="text"
              placeholder="Type your message..."
              value={input}
              onChange={handleInputChange}
              onKeyPress={handleKeyPress}
            />
            <button onClick={handleSendMessage}>
              <FontAwesomeIcon icon={faPaperPlane} />
            </button>
          </div>
        </div>
      </main>
    </div>
  );
}

export default App;