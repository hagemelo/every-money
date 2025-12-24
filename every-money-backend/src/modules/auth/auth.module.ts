import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { JwtStrategy } from './application/jwt.strategy'; 
import { TokenService } from './application/token.service';
import {  ConfigModule, ConfigService } from '@nestjs/config';
import { ApplicationModule } from '@application/application.module';
import { AuthController } from './interfaces/auth.controller';
import { JwtRefreshStrategy } from './application/jwt.refresh.strategy';

@Module({
  imports: [
    ApplicationModule,
    ConfigModule, 
    JwtModule.registerAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: async (configService: ConfigService) => ({
        secret: configService.get<string>('JWT_SECRET'),
        signOptions: {
          expiresIn: configService.get<string>('JWT_EXPIRES_IN'),
        },
        refreshSecret: configService.get<string>('JWT_REFRESH_SECRET'),
        refreshSignOptions: {
          expiresIn: configService.get<string>('JWT_REFRESH_EXPIRES_IN'),
        },
      }),
    }),
    
  ],
  providers: [TokenService, JwtStrategy, JwtRefreshStrategy],
  exports: [TokenService],
  controllers: [AuthController],
})
export class AuthModule {}
