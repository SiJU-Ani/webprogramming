import React, { useState, useRef, useEffect, useCallback } from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { X } from 'lucide-react';

// Sample responses for common restaurant queries
const PREDEFINED_RESPONSES = {
  default: "I'm not sure how to help with that. Would you like to know about our menu, make a reservation, or get recommendations?",
  greeting: "Hello! I'm your restaurant assistant. How can I help you today? You can ask me about our menu, make reservations, or get recommendations!",
  menu: "Our menu features a variety of delicious dishes. Some of our specialties include Butter Chicken, Paneer Tikka, Vegetable Biryani, and Chicken Curry. Would you like to know more about a specific dish?",
  reservation: "Sure, I'd be happy to help you make a reservation. Please use our reservations page for booking a table. You can specify your preferred date, time, and party size there.",
  hours: "We are open Monday to Friday from 11:00 AM to 10:00 PM, and weekends from 10:00 AM to 11:00 PM.",
  location: "We are located at 123 FoodiGoodi Street, Downtown Foodieville.",
  contact: "You can reach us at (555) 123-4567 or email us at info@foodigoodi.com.",
  recommendations: "I recommend trying our Chef's Special Biryani, Butter Chicken, or Paneer Tikka. They're customer favorites!",
  delivery: "Yes, we offer delivery through our online ordering system. You can place an order through our Order Online page.",
  payment: "We accept all major credit cards, digital wallets, and cash.",
  vegetarian: "We have many vegetarian options including Paneer Tikka, Vegetable Biryani, and Dal Makhani.",
  vegan: "We offer several vegan dishes including Vegetable Curry, Aloo Gobi, and Chana Masala.",
  gluten: "We have gluten-free options available. Please inform our staff about any dietary restrictions when ordering.",
  spicy: "We can adjust the spice level of most dishes according to your preference.",
  popular: "Our most popular dishes include Butter Chicken, Biryani, and Naan bread."
};

const AIAssistant = () => {
  const [messages, setMessages] = useState([]);
  const [userInput, setUserInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const chatBoxRef = useRef(null);
  const navigate = useNavigate();

  // Initial greeting message
  useEffect(() => {
    setMessages([
      {
        text: PREDEFINED_RESPONSES.greeting,
        sender: 'bot'
      }
    ]);
  }, []);

  // Scroll to bottom of chat box whenever messages update
  useEffect(() => {
    if (chatBoxRef.current) {
      chatBoxRef.current.scrollTop = chatBoxRef.current.scrollHeight;
    }
  }, [messages]);

  // Close the chat and return to previous page
  const handleClose = () => {
    navigate(-1);
  };

  // Function to get response based on user input
  const getResponse = useCallback((input) => {
    // Convert input to lowercase for easier matching
    const lowerInput = input.toLowerCase();
    
    // Simple keyword matching
    if (lowerInput.includes('hello') || lowerInput.includes('hi') || lowerInput.includes('hey')) {
      return PREDEFINED_RESPONSES.greeting;
    } else if (lowerInput.includes('menu') || lowerInput.includes('food') || lowerInput.includes('eat')) {
      return PREDEFINED_RESPONSES.menu;
    } else if (lowerInput.includes('reservation') || lowerInput.includes('book') || lowerInput.includes('table')) {
      return PREDEFINED_RESPONSES.reservation;
    } else if (lowerInput.includes('hour') || lowerInput.includes('time') || lowerInput.includes('open')) {
      return PREDEFINED_RESPONSES.hours;
    } else if (lowerInput.includes('location') || lowerInput.includes('address') || lowerInput.includes('where')) {
      return PREDEFINED_RESPONSES.location;
    } else if (lowerInput.includes('contact') || lowerInput.includes('phone') || lowerInput.includes('email')) {
      return PREDEFINED_RESPONSES.contact;
    } else if (lowerInput.includes('recommend') || lowerInput.includes('suggest') || lowerInput.includes('best')) {
      return PREDEFINED_RESPONSES.recommendations;
    } else if (lowerInput.includes('delivery') || lowerInput.includes('takeout') || lowerInput.includes('pickup')) {
      return PREDEFINED_RESPONSES.delivery;
    } else if (lowerInput.includes('payment') || lowerInput.includes('pay') || lowerInput.includes('card')) {
      return PREDEFINED_RESPONSES.payment;
    } else if (lowerInput.includes('vegetarian') || lowerInput.includes('veg')) {
      return PREDEFINED_RESPONSES.vegetarian;
    } else if (lowerInput.includes('vegan')) {
      return PREDEFINED_RESPONSES.vegan;
    } else if (lowerInput.includes('gluten') || lowerInput.includes('allergy')) {
      return PREDEFINED_RESPONSES.gluten;
    } else if (lowerInput.includes('spicy') || lowerInput.includes('hot')) {
      return PREDEFINED_RESPONSES.spicy;
    } else if (lowerInput.includes('popular') || lowerInput.includes('favorite')) {
      return PREDEFINED_RESPONSES.popular;
    }
    
    return PREDEFINED_RESPONSES.default;
  }, []);

  const sendMessage = async () => {
    if (!userInput.trim()) return;
    
    // Add user message to chat
    const newMessages = [...messages, { text: userInput, sender: 'user' }];
    setMessages(newMessages);
    setUserInput('');
    setIsLoading(true);
    
    // Simulate delay for a more natural interaction
    setTimeout(() => {
      const botResponse = getResponse(userInput);
      setMessages([...newMessages, { text: botResponse, sender: 'bot' }]);
      setIsLoading(false);
    }, 1000);
  };

  // Handle Enter key press
  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="ai-assistant-container"
    >
      <div className="chat-container" style={{
        maxWidth: '800px',
        margin: '0 auto',
        padding: '20px',
        position: 'relative'
      }}>
        <div style={{
          position: 'absolute',
          top: '10px',
          right: '10px',
          cursor: 'pointer',
          zIndex: 10
        }} onClick={handleClose}>
          <X size={24} />
        </div>
        
        <h1 style={{
          textAlign: 'center',
          color: '#e74c3c',
          marginBottom: '30px'
        }}>AI Restaurant Assistant</h1>
        
        {/* Chat Box */}
        <div 
          ref={chatBoxRef}
          className="chat-box"
          style={{
            height: '500px',
            border: '1px solid #ddd',
            borderRadius: '8px',
            padding: '20px',
            overflowY: 'auto',
            backgroundColor: '#fff',
            boxShadow: '0 2px 10px rgba(0,0,0,0.1)',
            marginBottom: '20px'
          }}
        >
          {messages.map((message, index) => (
            <div 
              key={index}
              style={{
                display: 'flex',
                justifyContent: message.sender === 'user' ? 'flex-end' : 'flex-start',
                marginBottom: '15px'
              }}
            >
              <div style={{
                maxWidth: '70%',
                padding: '12px 16px',
                borderRadius: message.sender === 'user' ? '20px 20px 0 20px' : '20px 20px 20px 0',
                backgroundColor: message.sender === 'user' ? '#e74c3c' : '#f8f9fa',
                color: message.sender === 'user' ? 'white' : '#333',
                boxShadow: '0 1px 3px rgba(0,0,0,0.1)'
              }}>
                {message.text}
              </div>
            </div>
          ))}
          {isLoading && (
            <div style={{ textAlign: 'center', padding: '10px' }}>
              Thinking...
            </div>
          )}
        </div>
        
        {/* Input Area */}
        <div style={{
          display: 'flex',
          gap: '10px'
        }}>
          <input
            type="text"
            value={userInput}
            onChange={(e) => setUserInput(e.target.value)}
            onKeyPress={handleKeyPress}
            placeholder="Type your message here..."
            style={{
              flex: 1,
              padding: '12px 16px',
              borderRadius: '25px',
              border: '1px solid #ddd',
              fontSize: '16px',
              outline: 'none',
              transition: 'border-color 0.3s'
            }}
          />
          <button
            onClick={sendMessage}
            disabled={isLoading}
            style={{
              padding: '12px 24px',
              borderRadius: '25px',
              border: 'none',
              backgroundColor: '#e74c3c',
              color: 'white',
              fontSize: '16px',
              cursor: 'pointer',
              transition: 'background-color 0.3s',
              opacity: isLoading ? 0.7 : 1
            }}
          >
            Send
          </button>
        </div>
      </div>
    </motion.div>
  );
};

export default AIAssistant; 