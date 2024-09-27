import { IUser } from '../user.interfcae';
import { createParamDecorator, ExecutionContext } from '@nestjs/common';

export const User = createParamDecorator(
  (data: keyof IUser, context: ExecutionContext) => {
    const ctx = context.switchToHttp();
    const user = ctx.getRequest().user;
    return data ? user[data] : user;
  },
);
