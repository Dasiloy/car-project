import {
  BadRequestException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { AuthDto } from './dtos/auth.dto';
import * as bcrypt from 'bcrypt';
import { UserService } from './user.service';

@Injectable()
export class AuthService {
  constructor(private readonly userService: UserService) {}

  async signup(data: AuthDto) {
    // check the mail
    const existing_user = await this.userService.findByEmail(data.email);

    if (existing_user) {
      throw new BadRequestException('Email already in use');
    }

    data.password = await bcrypt.hash(data.password, 10);
    return this.userService.create(data);
  }

  async login(data: AuthDto) {
    const existing_user = await this.userService.findByEmail(data.email);

    if (!existing_user) {
      throw new UnauthorizedException('Invalid credentials');
    }

    const is_valid_password = await bcrypt.compare(
      data.password,
      existing_user.password,
    );
    // we will do some more logic here soonest
    if (!is_valid_password) {
      throw new UnauthorizedException('Invalid credentials');
    }

    return existing_user;
  }
}
