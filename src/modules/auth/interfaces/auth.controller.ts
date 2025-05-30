import { Controller, Post, Request } from '@nestjs/common';
import { FindUserByEmailAndPasswordUseCase } from '@application/use-cases/find-user-by-email-and-password.use-case';
import { TokenService } from '../application/token.service';

@Controller('auth')
export class AuthController {
  constructor(private tokenService: TokenService,
    private readonly useCase: FindUserByEmailAndPasswordUseCase
  ) {}

  @Post('login')
  async login(@Request() req) {
    const user = await this.useCase.execute(
      req.body.email,
      req.body.senha,
    );
    if (!user) {
      return { message: 'Invalid credentials' };
    }
    return this.tokenService.generateToken(user);
  }
}
