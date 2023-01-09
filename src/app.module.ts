import { Module } from '@nestjs/common';
import { AuthModule } from './auth/auth.module';
import { BookmarkModule } from './bookmark/bookmark.module';
import { UserModule } from './user/user.module';
import { PrismaModule } from './prisma/prisma.module';

@Module({
  imports: [AuthModule, BookmarkModule, UserModule, PrismaModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
