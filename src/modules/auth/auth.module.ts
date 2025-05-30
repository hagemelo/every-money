import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { JwtStrategy } from './application/jwt.strategy'; 
import { TokenService } from './application/token.service';
import {  ConfigModule, ConfigService } from '@nestjs/config';
import { ApplicationModule } from '@application/application.module';
import { AuthController } from './interfaces/auth.controller';

@Module({
  imports: [
    ApplicationModule,
    ConfigModule, // Import ConfigModule to use ConfigService
    JwtModule.registerAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: async (configService: ConfigService) => ({
        secret: configService.get<string>('JWT_SECRET'),
        signOptions: {
          expiresIn: configService.get<string>('JWT_EXPIRES_IN') || '60s',
        },
      }),
    }),
    
  ],
  providers: [TokenService, JwtStrategy],
  exports: [TokenService],
  controllers: [AuthController],
})
export class AuthModule {}
