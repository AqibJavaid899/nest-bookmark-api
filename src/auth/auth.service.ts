import { ForbiddenException, Injectable } from '@nestjs/common';
import { PrismaClientKnownRequestError } from '@prisma/client/runtime';
import * as argon from 'argon2';

import { PrismaService } from 'src/prisma/prisma.service';
import { AuthDto } from './dto';

@Injectable()
export class AuthProvider {
  constructor(private prisma: PrismaService) {}

  async signup(dto: AuthDto) {
    const hashedPassword = await argon.hash(dto.password);

    try {
      const user = await this.prisma.user.create({
      data: {
        email: dto.email,
        password: hashedPassword,
      },
    });
    delete user.password

    return user;
    } catch (error) {
      if(error instanceof PrismaClientKnownRequestError) {
        if(error.code === 'P2002') {
          throw new ForbiddenException("Credentials already taken by another user")
        }
      }
      throw error;
    }
    
  }

  signin() {
    return { msg: 'Signing in...' };
  }
}
