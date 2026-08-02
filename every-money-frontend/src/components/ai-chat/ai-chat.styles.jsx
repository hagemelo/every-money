import styled from 'styled-components';

export const ChatCard = styled.section`
  background: white;
  border-radius: 16px;
  padding: 1.5rem;
  margin-bottom: 1.5rem;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.06);
`;

export const ChatHeader = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 1rem;
  margin-bottom: 1rem;
`;

export const ChatTitle = styled.h2`
  color: #374151;
  font-size: 1rem;
  font-weight: 600;
  margin: 0;
`;

export const ChatSubtitle = styled.p`
  color: #9ca3af;
  font-size: 0.8rem;
  margin: 0.25rem 0 0;
`;

export const ChatAction = styled.button`
  background: transparent;
  border: 0;
  color: #6b7280;
  cursor: pointer;
  font-size: 0.8rem;
  padding: 0.25rem;

  &:hover {
    color: #374151;
    text-decoration: underline;
  }
`;

export const MessageList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
  max-height: 300px;
  min-height: 80px;
  overflow-y: auto;
  padding: 0.25rem;
`;

export const EmptyChat = styled.div`
  color: #6b7280;
  font-size: 0.875rem;
  padding: 1rem 0;
  text-align: center;
`;

export const Message = styled.div`
  align-self: ${props => props.$role === 'user' ? 'flex-end' : 'flex-start'};
  background: ${props => props.$role === 'user' ? 'rgb(21, 107, 122)' : '#f3f4f6'};
  border-radius: ${props => props.$role === 'user' ? '14px 14px 4px 14px' : '14px 14px 14px 4px'};
  color: ${props => props.$role === 'user' ? 'white' : '#374151'};
  font-size: 0.875rem;
  line-height: 1.5;
  max-width: min(85%, 680px);
  padding: 0.7rem 0.9rem;
  white-space: pre-wrap;
  word-break: break-word;
`;

export const TypingIndicator = styled.span`
  color: #6b7280;
  font-size: 0.875rem;
  font-style: italic;
`;

export const ChatError = styled.p`
  background: #fef2f2;
  border-radius: 8px;
  color: #b91c1c;
  font-size: 0.8rem;
  margin: 0.75rem 0 0;
  padding: 0.6rem 0.75rem;
`;

export const ChatForm = styled.form`
  display: flex;
  gap: 0.75rem;
  margin-top: 1rem;

  @media (max-width: 600px) {
    align-items: stretch;
    flex-direction: column;
  }
`;

export const ChatInput = styled.textarea`
  border: 1px solid #d1d5db;
  border-radius: 8px;
  color: #374151;
  flex: 1;
  font: inherit;
  min-height: 42px;
  padding: 0.65rem 0.75rem;
  resize: vertical;

  &:focus {
    border-color: rgb(41, 162, 184);
    outline: 2px solid rgba(41, 162, 184, 0.15);
  }
`;

export const ChatButton = styled.button`
  align-self: flex-end;
  background: rgb(21, 107, 122);
  border: 0;
  border-radius: 8px;
  color: white;
  cursor: pointer;
  font-weight: 600;
  min-height: 42px;
  padding: 0.65rem 1rem;

  &:disabled {
    cursor: not-allowed;
    opacity: 0.55;
  }

  &:hover:not(:disabled) {
    background: rgb(15, 80, 92);
  }
`;
