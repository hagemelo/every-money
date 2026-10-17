jest.mock('@infrastructure/ia-memory/mastra-memory.provider', () => {
  const memoryToken = Symbol('FINANCIAL_ASSISTANT_MEMORY');

  return {
    FINANCIAL_ASSISTANT_MEMORY: memoryToken,
    financialAssistantMemoryProvider: {
      provide: memoryToken,
      useValue: {},
    },
  };
});
