import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './user.entity';
import { UserController } from './user.controller';
import { UserService } from './user.service';
import { APP_INTERCEPTOR } from '@nestjs/core';
import { UserInterceptor } from './interceptors/user.interceptor';

@Module({
  imports: [TypeOrmModule.forFeature([User])],
  controllers: [UserController],
  providers: [
    UserService,
    {
      provide: APP_INTERCEPTOR,
      useClass: UserInterceptor, // attach user to response
    },
  ],
  exports: [TypeOrmModule, UserService],
})
export class UserModule {}
