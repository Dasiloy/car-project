import {
  BadRequestException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { User } from 'src/user/user.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { AuthDto } from './dtos/auth.dto';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(User) private readonly authRepo: Repository<User>,
  ) {}

  async signup(data: AuthDto) {
    // check the mail
    const existing_user = await this.authRepo.findOne({
      where: { email: data.email },
    });

    if (existing_user) {
      throw new BadRequestException('Email already in use');
    }

    data.password = await bcrypt.hash(data.password, 10);
    const user = this.authRepo.create(data);
    return this.authRepo.save(user);
  }

  async login(data: AuthDto) {
    const existing_user = await this.authRepo.findOne({
      where: { email: data.email },
    });

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
