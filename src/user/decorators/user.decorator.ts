import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { User as UserEntity } from '../user.entity';

export const User = createParamDecorator(
  (data: keyof UserEntity, context: ExecutionContext) => {
    const ctx = context.switchToHttp();
    const user = ctx.getRequest().user;
    return data ? user[data] : user;
  },
);
