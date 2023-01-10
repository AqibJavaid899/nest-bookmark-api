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
      delete user.password;

      return user;
    } catch (error) {
      if (error instanceof PrismaClientKnownRequestError) {
        if (error.code === 'P2002') {
          throw new ForbiddenException(
            'Credentials already taken by another user',
          );
        }
      }
      throw error;
    }
  }

  async signin(dto: AuthDto) {
    try {
      // find the user from the db and throw error if not found
      const user = await this.prisma.user.findUnique({
        where: {
          email: dto.email,
        },
      });

      if (!user) throw new ForbiddenException('User record not found');

      // Compare the password and throw exception if it does not match with the record
      const isMatched = await argon.verify(user.password, dto.password);

      if (!isMatched) throw new ForbiddenException('Credentials are incorrect');

      delete user.password;

      return user;
    } catch (error) {
      throw error;
    }
  }
}
