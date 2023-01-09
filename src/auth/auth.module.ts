import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthProvider } from './auth.service';

@Module({
  controllers: [AuthController],
  providers: [AuthProvider],
})
export class AuthModule { }
