import React, { useState, useRef, useEffect } from 'react';
import styled from 'styled-components';
import ChatMessage from './components/ChatMessage';
import MessageInput from './components/MessageInput';
import WeatherWidget from './components/WeatherWidget';

const AppContainer = styled.div`
  display: flex;
  height: 100vh;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  font-family: 'Arial', sans-serif;
`;

const Sidebar = styled.div`
  width: 300px;
  background: rgba(255, 255, 255, 0.1);
  backdrop-filter: blur(10px);
  padding: 20px;
  border-right: 1px solid rgba(255, 255, 255, 0.2);
`;

const MainChat = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  background: rgba(255, 255, 255, 0.05);
`;

const Header = styled.div`
  padding: 20px;
  background: rgba(255, 255, 255, 0.1);
  border-bottom: 1px solid rgba(255, 255, 255, 0.2);
  text-align: center;
`;

const Title = styled.h1`
  color: white;
  margin: 0;
  font-size: 24px;
  font-weight: 600;
`;

const Subtitle = styled.p`
  color: rgba(255, 255, 255, 0.8);
  margin: 5px 0 0 0;
  font-size: 14px;
`;

const ChatContainer = styled.div`
  flex: 1;
  overflow-y: auto;
  padding: 20px;
  display: flex;
  flex-direction: column;
  gap: 15px;
`;

const QuickActions = styled.div`
  margin-top: 20px;
`;

const QuickActionTitle = styled.h3`
  color: white;
  font-size: 16px;
  margin-bottom: 15px;
`;

const ActionButton = styled.button`
  width: 100%;
  padding: 12px;
  margin-bottom: 10px;
  background: rgba(255, 255, 255, 0.1);
  border: 1px solid rgba(255, 255, 255, 0.2);
  border-radius: 8px;
  color: white;
  cursor: pointer;
  transition: all 0.3s ease;
  font-size: 14px;

  &:hover {
    background: rgba(255, 255, 255, 0.2);
    transform: translateY(-2px);
  }
`;

const LocationInput = styled.input`
  width: 100%;
  padding: 12px;
  margin-bottom: 15px;
  background: rgba(255, 255, 255, 0.1);
  border: 1px solid rgba(255, 255, 255, 0.2);
  border-radius: 8px;
  color: white;
  font-size: 14px;

  &::placeholder {
    color: rgba(255, 255, 255, 0.6);
  }

  &:focus {
    outline: none;
    border-color: rgba(255, 255, 255, 0.5);
  }
`;

function App() {
  const [messages, setMessages] = useState([
    {
      id: 1,
      text: "Hello! I'm your CropEye AI assistant. I can help you with farming questions about water requirements, soil information, weather conditions, and crop advice. What would you like to know?",
      sender: 'bot',
      timestamp: new Date().toISOString()
    }
  ]);
  const [location, setLocation] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const chatContainerRef = useRef(null);

  const quickActions = [
    "How much water does rice need?",
    "What's the best soil for tomatoes?",
    "Current weather for farming",
    "Wheat growing tips",
    "Soil pH requirements",
    "Irrigation schedule advice"
  ];

  useEffect(() => {
    if (chatContainerRef.current) {
      chatContainerRef.current.scrollTop = chatContainerRef.current.scrollHeight;
    }
  }, [messages]);

  const sendMessage = async (messageText) => {
    if (!messageText.trim()) return;

    const userMessage = {
      id: Date.now(),
      text: messageText,
      sender: 'user',
      timestamp: new Date().toISOString()
    };

    setMessages(prev => [...prev, userMessage]);
    setIsLoading(true);

    try {
      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          message: messageText,
          location: location,
          cropType: null
        })
      });

      if (!response.ok) {
        throw new Error('Failed to get response from server');
      }

      const data = await response.json();

      const botMessage = {
        id: Date.now() + 1,
        text: data.response,
        sender: 'bot',
        timestamp: new Date().toISOString(),
        additionalData: data.additionalData,
        intent: data.intent
      };

      setMessages(prev => [...prev, botMessage]);
    } catch (error) {
      console.error('Error sending message:', error);
      const errorMessage = {
        id: Date.now() + 1,
        text: "Sorry, I encountered an error. Please try again. Make sure the backend server is running on port 5000.",
        sender: 'bot',
        timestamp: new Date().toISOString()
      };
      setMessages(prev => [...prev, errorMessage]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleQuickAction = (action) => {
    sendMessage(action);
  };

  return (
    <AppContainer>
      <Sidebar>
        <div>
          <h2 style={{ color: 'white', fontSize: '18px', marginBottom: '20px' }}>
            🌱 CropEye Assistant
          </h2>
          
          <LocationInput
            type="text"
            placeholder="Enter your location..."
            value={location}
            onChange={(e) => setLocation(e.target.value)}
          />

          <WeatherWidget location={location} />

          <QuickActions>
            <QuickActionTitle>Quick Questions</QuickActionTitle>
            {quickActions.map((action, index) => (
              <ActionButton
                key={index}
                onClick={() => handleQuickAction(action)}
              >
                {action}
              </ActionButton>
            ))}
          </QuickActions>
        </div>
      </Sidebar>

      <MainChat>
        <Header>
          <Title>CropEye AI Farming Assistant</Title>
          <Subtitle>
            Get expert advice on water requirements, soil conditions, weather, and crop management
          </Subtitle>
        </Header>

        <ChatContainer ref={chatContainerRef}>
          {messages.map((message) => (
            <ChatMessage
              key={message.id}
              message={message}
              isLoading={isLoading && message.sender === 'bot' && message === messages[messages.length - 1]}
            />
          ))}
          {isLoading && (
            <ChatMessage
              message={{
                id: 'loading',
                text: 'Analyzing your farming question...',
                sender: 'bot',
                timestamp: new Date().toISOString()
              }}
              isLoading={true}
            />
          )}
        </ChatContainer>

        <MessageInput onSendMessage={sendMessage} disabled={isLoading} />
      </MainChat>
    </AppContainer>
  );
}

export default App;