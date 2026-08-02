import React, { useEffect, useRef, useState } from 'react';
import { useAiChat } from '../../hook/useAiChat.tsx';
import {
  ChatAction,
  ChatButton,
  ChatCard,
  ChatError,
  ChatForm,
  ChatHeader,
  ChatInput,
  ChatSubtitle,
  ChatTitle,
  EmptyChat,
  Message,
  MessageList,
  TypingIndicator,
} from './ai-chat.styles';

const MAX_MESSAGE_LENGTH = 500;

const AiChat = ({ contaId, mesReferencia }) => {
  const [input, setInput] = useState('');
  const messagesEndRef = useRef(null);
  const {
    messages,
    isStreaming,
    error,
    sendMessage,
    cancelMessage,
    clearMessages,
  } = useAiChat({ contaId, mesReferencia });

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const handleSubmit = event => {
    event.preventDefault();
    if (!input.trim() || isStreaming) return;
    void sendMessage(input);
    setInput('');
  };

  const handleKeyDown = event => {
    if (event.key === 'Enter' && !event.shiftKey) {
      event.preventDefault();
      event.currentTarget.form?.requestSubmit();
    }
  };

  return (
    <ChatCard>
      <ChatHeader>
        <div>
          <ChatTitle>Assistente financeiro</ChatTitle>
          <ChatSubtitle>
            Pergunte sobre seus gastos, saldo ou orçamento.
          </ChatSubtitle>
        </div>
        {messages.length > 0 && (
          <ChatAction type="button" onClick={clearMessages} disabled={isStreaming}>
            Limpar
          </ChatAction>
        )}
      </ChatHeader>

      <MessageList aria-live="polite">
        {messages.length === 0 ? (
          <EmptyChat>
            Experimente perguntar: “Quanto gastei este mês?”
          </EmptyChat>
        ) : (
          messages.map(message => (
            <Message key={message.id} $role={message.role}>
              {message.content || (isStreaming && message.role === 'assistant'
                ? <TypingIndicator>Analisando...</TypingIndicator>
                : null)}
            </Message>
          ))
        )}
        <div ref={messagesEndRef} />
      </MessageList>

      {error && <ChatError role="alert">{error}</ChatError>}

      <ChatForm onSubmit={handleSubmit}>
        <ChatInput
          value={input}
          onChange={event => setInput(event.target.value)}
          onKeyDown={handleKeyDown}
          placeholder="Digite sua pergunta..."
          maxLength={MAX_MESSAGE_LENGTH}
          rows={1}
          disabled={isStreaming}
          aria-label="Pergunta para o assistente financeiro"
        />
        <ChatButton
          type={isStreaming ? 'button' : 'submit'}
          onClick={isStreaming ? cancelMessage : undefined}
          disabled={!isStreaming && !input.trim()}
        >
          {isStreaming ? 'Cancelar' : 'Enviar'}
        </ChatButton>
      </ChatForm>
    </ChatCard>
  );
};

export default AiChat;
