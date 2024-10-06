import { TestingModule, Test } from '@nestjs/testing';
import { UserService } from './user.service';
import { AuthService } from './auth.service';
import { AuthDto } from './dtos/auth.dto';
import { BadRequestException } from '@nestjs/common';
import { User } from './user.entity';

// test block
describe('AuthService', () => {
  let authService: AuthService;
  const users: User[] = [];
  const userService: Partial<UserService> = {
    findByEmail(email: string) {
      const user = users.find((u) => u.email === email);
      return Promise.resolve(user);
    },
    create(data: AuthDto) {
      const user = { id: Math.floor(Math.random() * users.length), ...data };
      users.push(user);
      return Promise.resolve(user);
    },
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        AuthService,
        {
          provide: UserService,
          useValue: userService,
        },
      ],
    }).compile();

    authService = module.get<AuthService>(AuthService);
  });

  // test suites
  it('should be defined', () => {
    expect(authService).toBeDefined();
  });

  it('signs up user with hashed password', async () => {
    const user = await authService.signup({
      email: 'test@test.com',
      password: '123',
    });

    expect(user.password).not.toEqual('123');
  });

  it('throws an error when user signs up with existing email', async () => {
    await authService.signup({
      email: 'test@email.com',
      password: 'testpassword',
    });
    await expect(
      authService.signup({
        email: 'test@email.com',
        password: 'testpassword',
      }),
    ).rejects.toThrow(BadRequestException);
  });

  it('throws an error if user logs in with email that does not exist', async () => {
    await expect(
      authService.login({ email: 'test@test.com', password: '' }),
    ).rejects.toThrow(BadRequestException);
  });

  it('throws an error if user password is invalid', async () => {
    await authService.signup({
      email: 'test2@email.com',
      password: 'testpassword',
    });
    await expect(
      authService.login({ email: 'test2email.com', password: 'testpasswor' }),
    ).rejects.toThrow(BadRequestException);
  });

  it('logs in with correct password', async () => {
    await authService.signup({
      email: 'test3@email.com',
      password: 'testpassword',
    });
    const user = await authService.login({
      email: 'test3@email.com',
      password: 'testpassword',
    });
    expect(user).toBeDefined();
  });
});
