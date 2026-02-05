import React, { useState } from 'react';
import styled from 'styled-components';
import { FaPaperPlane } from 'react-icons/fa';

const InputContainer = styled.div`
  padding: 20px;
  background: rgba(255, 255, 255, 0.1);
  border-top: 1px solid rgba(255, 255, 255, 0.2);
  backdrop-filter: blur(10px);
`;

const InputWrapper = styled.div`
  display: flex;
  gap: 12px;
  align-items: flex-end;
`;

const TextArea = styled.textarea`
  flex: 1;
  min-height: 50px;
  max-height: 120px;
  padding: 15px 20px;
  border: 1px solid rgba(255, 255, 255, 0.2);
  border-radius: 25px;
  background: rgba(255, 255, 255, 0.1);
  color: white;
  font-size: 16px;
  font-family: inherit;
  resize: none;
  outline: none;
  backdrop-filter: blur(10px);

  &::placeholder {
    color: rgba(255, 255, 255, 0.6);
  }

  &:focus {
    border-color: rgba(255, 255, 255, 0.5);
    background: rgba(255, 255, 255, 0.15);
  }

  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }
`;

const SendButton = styled.button`
  width: 50px;
  height: 50px;
  border-radius: 50%;
  border: none;
  background: linear-gradient(135deg, #11998e 0%, #38ef7d 100%);
  color: white;
  font-size: 18px;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.3s ease;
  
  &:hover:not(:disabled) {
    transform: scale(1.05);
    box-shadow: 0 5px 15px rgba(56, 239, 125, 0.4);
  }
  
  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
    transform: none;
  }
`;

const SuggestionChips = styled.div`
  display: flex;
  gap: 8px;
  margin-bottom: 15px;
  flex-wrap: wrap;
`;

const Chip = styled.button`
  padding: 8px 16px;
  background: rgba(255, 255, 255, 0.1);
  border: 1px solid rgba(255, 255, 255, 0.2);
  border-radius: 20px;
  color: white;
  font-size: 14px;
  cursor: pointer;
  transition: all 0.3s ease;

  &:hover {
    background: rgba(255, 255, 255, 0.2);
    transform: translateY(-2px);
  }
`;

const MessageInput = ({ onSendMessage, disabled }) => {
  const [message, setMessage] = useState('');

  const suggestions = [
    "Water needs for corn",
    "Best soil for vegetables",
    "Weather forecast",
    "Pest control tips"
  ];

  const handleSubmit = (e) => {
    e.preventDefault();
    if (message.trim() && !disabled) {
      onSendMessage(message.trim());
      setMessage('');
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSubmit(e);
    }
  };

  const handleSuggestionClick = (suggestion) => {
    if (!disabled) {
      onSendMessage(suggestion);
    }
  };

  return (
    <InputContainer>
      <SuggestionChips>
        {suggestions.map((suggestion, index) => (
          <Chip
            key={index}
            onClick={() => handleSuggestionClick(suggestion)}
            disabled={disabled}
          >
            {suggestion}
          </Chip>
        ))}
      </SuggestionChips>
      
      <form onSubmit={handleSubmit}>
        <InputWrapper>
          <TextArea
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            onKeyPress={handleKeyPress}
            placeholder="Ask me about farming, crops, soil, weather, or irrigation..."
            disabled={disabled}
            rows={1}
          />
          
          <SendButton
            type="submit"
            disabled={disabled || !message.trim()}
          >
            <FaPaperPlane />
          </SendButton>
        </InputWrapper>
      </form>
    </InputContainer>
  );
};

export default MessageInput;