import {
  NestInterceptor,
  Injectable,
  ExecutionContext,
  CallHandler,
} from '@nestjs/common';
import { Observable } from 'rxjs';
import { UserService } from '../user.service';

@Injectable()
export class UserInterceptor implements NestInterceptor {
  constructor(private readonly userService: UserService) {}

  async intercept(
    context: ExecutionContext,
    next: CallHandler<any>,
  ): Promise<Observable<any>> {
    const req = context.switchToHttp().getRequest();
    const user_id = req.session?.user_id;
    if (user_id) {
      const user = await this.userService.getOne(user_id);
      req.user = user;
    }

    return next.handle();
  }
}
