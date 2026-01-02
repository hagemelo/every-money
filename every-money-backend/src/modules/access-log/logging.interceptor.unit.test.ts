import { Test, TestingModule } from '@nestjs/testing';
import { ExecutionContext, CallHandler } from '@nestjs/common';
import { of } from 'rxjs';
import { LoggingInterceptor } from './logging.interceptor';

describe('LoggingInterceptor', () => {
  let interceptor: LoggingInterceptor;
  let mockLogger: { log: jest.Mock };
  let mockContext: ExecutionContext;
  let mockHandler: CallHandler;

  beforeEach(async () => {

    mockLogger = { log: jest.fn() };
    mockContext = {
      switchToHttp: jest.fn().mockReturnThis(),
      getRequest: jest.fn().mockReturnValue({
        method: 'GET',
        url: '/test',
      }),
    } as any;

    mockHandler = {
      handle: jest.fn().mockReturnValue(of('test')),
    };

    const module: TestingModule = await Test.createTestingModule({
      providers: [
        LoggingInterceptor,
        {
          provide: 'Logger',
          useValue: mockLogger,
        },
      ],
    }).compile();

    interceptor = module.get<LoggingInterceptor>(LoggingInterceptor);
    (interceptor as any).logger = mockLogger;
  });

  afterEach(() => {
    jest.clearAllMocks();
    delete process.env.ACCESS_LOG_ENABLED;
  });

  it('should log request when ACCESS_LOG_ENABLED is true', (done) => {
    process.env.ACCESS_LOG_ENABLED = 'true';
    
    const now = Date.now();
    jest.spyOn(Date, 'now')
      .mockReturnValueOnce(now)
      .mockReturnValueOnce(now + 100); 

    interceptor.intercept(mockContext, mockHandler).subscribe({
      next: () => {
        expect(mockLogger.log).toHaveBeenCalledWith('GET /test 100ms');
        done();
      },
      error: done.fail,
    });
  });

  it('should not log when ACCESS_LOG_ENABLED is false', (done) => {
    process.env.ACCESS_LOG_ENABLED = 'false';
    
    interceptor.intercept(mockContext, mockHandler).subscribe({
      next: () => {
        expect(mockLogger.log).not.toHaveBeenCalled();
        done();
      },
      error: done.fail,
    });
  });

  it('should call next.handle() even when logging is disabled', (done) => {
    process.env.ACCESS_LOG_ENABLED = 'false';
    
    interceptor.intercept(mockContext, mockHandler).subscribe({
      next: (result) => {
        expect(mockHandler.handle).toHaveBeenCalled();
        expect(result).toBe('test');
        done();
      },
      error: done.fail,
    });
  });
});
