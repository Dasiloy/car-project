import { Injectable } from '@nestjs/common';
import { User } from 'src/user/user.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { AuthDto } from './dtos/auth.dto';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(User) private readonly authRepo: Repository<User>,
  ) {}

  signup(data: AuthDto) {
    const user = this.authRepo.create(data);
    return this.authRepo.save(user);
  }

  login(data: AuthDto) {
    // we will do some more logic here soonest
    return this.authRepo.findOneBy({
      email: data.email,
    });
  }
}
