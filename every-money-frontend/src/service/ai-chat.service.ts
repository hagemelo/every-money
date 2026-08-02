import { LocalStorageService } from '../share/storage/local.storage.service.tsx';

const backendUrl = process.env.REACT_APP_BACKEND_API || 'http://localhost:3000';

const getChatUrl = (message: string, contaId?: number, mesReferencia?: string) => {
  const url = new URL('/ai/chat-stream', backendUrl);
  url.searchParams.set('message', message);

  if (contaId) {
    url.searchParams.set('contaId', String(contaId));
  }

  if (mesReferencia) {
    url.searchParams.set('mesReferencia', mesReferencia);
  }

  return url.toString();
};

const extractStreamText = (chunk: string) => {
  return chunk
    .split(/\r?\n/)
    .filter(line => line.startsWith('data:'))
    .map(line => line.slice(5).trimStart())
    .filter(line => line !== '[DONE]')
    .map(line => {
      try {
        const parsed = JSON.parse(line);
        return parsed.content ?? parsed.message ?? parsed.token ?? parsed.text ?? '';
      } catch {
        return line;
      }
    })
    .join('');
};

export class AiChatService {
  private readonly tokenStorage = new LocalStorageService('token');

  async streamMessage(
    message: string,
    context: { contaId?: number; mesReferencia?: string },
    onChunk: (chunk: string) => void,
    signal?: AbortSignal,
  ) {
    const token = this.tokenStorage.getItem();

    if (!token) {
      throw new Error('Sessão não encontrada. Faça login novamente.');
    }

    const response = await fetch(getChatUrl(message, context.contaId, context.mesReferencia), {
      method: 'GET',
      headers: {
        Accept: 'text/event-stream, application/json, text/plain',
        Authorization: `Bearer ${token}`,
      },
      signal,
    });

    if (!response.ok) {
      throw new Error('Não foi possível obter uma resposta do assistente.');
    }

    if (!response.body) {
      const text = await response.text();
      if (text) onChunk(text);
      return;
    }

    const reader = response.body.getReader();
    const decoder = new TextDecoder();
    const isEventStream = response.headers.get('content-type')?.includes('text/event-stream');
    let pending = '';

    try {
      while (true) {
        const { done, value } = await reader.read();
        if (done) break;

        const decoded = decoder.decode(value, { stream: true });

        if (isEventStream) {
          pending += decoded;
          const completeLines = pending.split(/\r?\n/);
          pending = completeLines.pop() ?? '';
          const text = extractStreamText(completeLines.join('\n'));
          if (text) onChunk(text);
        } else {
          onChunk(decoded);
        }
      }

      if (isEventStream) {
        const lastText = extractStreamText(pending);
        if (lastText) onChunk(lastText);
      } else {
        const lastText = decoder.decode();
        if (lastText) onChunk(lastText);
      }
    } finally {
      reader.releaseLock();
    }
  }
}

export const aiChatService = new AiChatService();
