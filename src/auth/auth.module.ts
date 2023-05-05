import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt/dist';
import { ConfigModule } from '@nestjs/config';
import { PassportModule } from '@nestjs/passport';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { DatabaseModule } from 'src/prisma/database.module';
import { AuthStrategy } from './auth.strategy';
import { UserService } from 'src/user/user.service';
import { UserRepository } from 'src/user/user.repository';

@Module({
  imports: [
    PassportModule.register({ defaultStrategy: 'jwt' }),
    JwtModule.register({
      secret: process.env.SECRET_KEY,
      signOptions: { expiresIn: '24h' },
    }),
    ConfigModule.forRoot(),
    DatabaseModule,
  ],
  controllers: [AuthController],
  providers: [AuthService, UserService, UserRepository, AuthStrategy],
  exports: [AuthStrategy, AuthService],
})
export class AuthModule {}
