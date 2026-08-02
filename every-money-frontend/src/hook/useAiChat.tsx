import { useCallback, useEffect, useRef, useState } from 'react';
import { aiChatService } from '../service/ai-chat.service.ts';

export type ChatMessage = {
  id: string;
  role: 'user' | 'assistant';
  content: string;
};

const MAX_MESSAGE_LENGTH = 500;

export const useAiChat = (context: { contaId?: number; mesReferencia?: string }) => {
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [isStreaming, setIsStreaming] = useState(false);
  const [error, setError] = useState('');
  const abortControllerRef = useRef<AbortController | null>(null);

  const cancelMessage = useCallback(() => {
    abortControllerRef.current?.abort();
    abortControllerRef.current = null;
    setIsStreaming(false);
  }, []);

  const clearMessages = useCallback(() => {
    cancelMessage();
    setMessages([]);
    setError('');
  }, [cancelMessage]);

  const sendMessage = useCallback(async (value: string) => {
    const content = value.trim();
    if (!content || content.length > MAX_MESSAGE_LENGTH || isStreaming) return;

    const userMessage: ChatMessage = {
      id: `${Date.now()}-user`,
      role: 'user',
      content,
    };
    const assistantId = `${Date.now()}-assistant`;
    const assistantMessage: ChatMessage = {
      id: assistantId,
      role: 'assistant',
      content: '',
    };

    setMessages(current => [...current, userMessage, assistantMessage]);
    setError('');
    setIsStreaming(true);

    const controller = new AbortController();
    abortControllerRef.current = controller;

    try {
      await aiChatService.streamMessage(
        content,
        context,
        chunk => {
          setMessages(current => current.map(message => (
            message.id === assistantId
              ? { ...message, content: message.content + chunk }
              : message
          )));
        },
        controller.signal,
      );
    } catch (requestError) {
      if ((requestError as Error)?.name !== 'AbortError') {
        setError('Não foi possível obter uma resposta agora. Tente novamente.');
        setMessages(current => current.filter(message => message.id !== assistantId));
      }
    } finally {
      if (abortControllerRef.current === controller) {
        abortControllerRef.current = null;
        setIsStreaming(false);
      }
    }
  }, [context, isStreaming]);

  useEffect(() => () => {
    abortControllerRef.current?.abort();
  }, []);

  return {
    messages,
    isStreaming,
    error,
    sendMessage,
    cancelMessage,
    clearMessages,
  };
};
