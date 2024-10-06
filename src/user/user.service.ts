import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './user.entity';
import { AuthDto } from 'src/user/dtos/auth.dto';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User) private readonly userRepo: Repository<User>,
  ) {}

  getAll(query: Partial<Omit<User, 'id' | 'password'>>) {
    return this.userRepo.find({
      where: query,
    });
  }

  getOne(id: number) {
    return this.userRepo.findOneBy({ id });
  }

  update(user: User, attrs: Partial<Omit<User, 'id' | 'password'>>) {
    Object.assign(user, attrs);
    return this.userRepo.save(user);
  }

  delete(user: User) {
    return this.userRepo.remove(user);
  }

  findByEmail(email: string): Promise<User | null> {
    return this.userRepo.findOne({
      where: { email },
    });
  }

  create(data: AuthDto) {
    const user = this.userRepo.create(data);
    return this.userRepo.save(user);
  }
}
