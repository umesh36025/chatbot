import React from 'react';
import styled, { keyframes, css } from 'styled-components';
import { FaUser, FaLeaf } from 'react-icons/fa';

const typing = keyframes`
  0%, 60%, 100% { transform: translateY(0); }
  30% { transform: translateY(-10px); }
`;

const MessageContainer = styled.div`
  display: flex;
  align-items: flex-start;
  gap: 12px;
  margin-bottom: 20px;
  ${props => props.isUser && css`flex-direction: row-reverse;`}
`;

const Avatar = styled.div`
  width: 40px;
  height: 40px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 18px;
  ${props => props.isUser ? css`
    background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
    color: white;
  ` : css`
    background: linear-gradient(135deg, #11998e 0%, #38ef7d 100%);
    color: white;
  `}
`;

const MessageBubble = styled.div`
  max-width: 70%;
  padding: 15px 20px;
  border-radius: 18px;
  ${props => props.isUser ? css`
    background: rgba(255, 255, 255, 0.9);
    color: #333;
    border-bottom-right-radius: 5px;
  ` : css`
    background: rgba(255, 255, 255, 0.1);
    color: white;
    border-bottom-left-radius: 5px;
    backdrop-filter: blur(10px);
    border: 1px solid rgba(255, 255, 255, 0.2);
  `}
  
  ${props => props.isLoading && css`
    animation: ${typing} 1.5s infinite;
  `}
`;

const MessageText = styled.div`
  line-height: 1.5;
  white-space: pre-wrap;
  word-wrap: break-word;
  
  strong {
    font-weight: 600;
  }
  
  ul, ol {
    margin: 10px 0;
    padding-left: 20px;
  }
  
  li {
    margin: 5px 0;
  }
`;

const Timestamp = styled.div`
  font-size: 11px;
  opacity: 0.6;
  margin-top: 8px;
  ${props => props.isUser ? css`text-align: right;` : css`text-align: left;`}
`;

const AdditionalData = styled.div`
  margin-top: 15px;
  padding: 12px;
  background: rgba(255, 255, 255, 0.1);
  border-radius: 8px;
  border-left: 3px solid #38ef7d;
  font-size: 14px;
`;

const IntentBadge = styled.span`
  display: inline-block;
  padding: 4px 8px;
  background: rgba(56, 239, 125, 0.2);
  border: 1px solid rgba(56, 239, 125, 0.4);
  border-radius: 12px;
  font-size: 11px;
  margin-bottom: 10px;
  color: #38ef7d;
  text-transform: uppercase;
  font-weight: 600;
`;

const formatMessage = (text) => {
  // Convert markdown-like formatting to HTML
  return text
    .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
    .replace(/\*(.*?)\*/g, '<em>$1</em>')
    .replace(/•/g, '•');
};

const ChatMessage = ({ message, isLoading }) => {
  const isUser = message.sender === 'user';
  
  const formatTimestamp = (timestamp) => {
    return new Date(timestamp).toLocaleTimeString([], { 
      hour: '2-digit', 
      minute: '2-digit' 
    });
  };

  return (
    <MessageContainer isUser={isUser}>
      <Avatar isUser={isUser}>
        {isUser ? <FaUser /> : <FaLeaf />}
      </Avatar>
      
      <div style={{ flex: 1 }}>
        <MessageBubble isUser={isUser} isLoading={isLoading}>
          {!isUser && message.intent && (
            <IntentBadge>{message.intent.replace('_', ' ')}</IntentBadge>
          )}
          
          <MessageText 
            dangerouslySetInnerHTML={{ 
              __html: formatMessage(message.text) 
            }}
          />
          
          {message.additionalData && Object.keys(message.additionalData).length > 0 && (
            <AdditionalData>
              <strong>Additional Information:</strong>
              <pre style={{ margin: '8px 0', fontSize: '12px', opacity: 0.8 }}>
                {JSON.stringify(message.additionalData, null, 2)}
              </pre>
            </AdditionalData>
          )}
          
          <Timestamp isUser={isUser}>
            {formatTimestamp(message.timestamp)}
          </Timestamp>
        </MessageBubble>
      </div>
    </MessageContainer>
  );
};

export default ChatMessage;