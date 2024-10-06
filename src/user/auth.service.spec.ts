import { TestingModule, Test } from '@nestjs/testing';
import { UserService } from './user.service';
import { AuthService } from './auth.service';
import { AuthDto } from './dtos/auth.dto';
import { BadRequestException } from '@nestjs/common';

// test block
describe('AuthService', () => {
  let authService: AuthService;
  const userService: Partial<UserService> = {
    findByEmail(email: string) {
      console.log(email);
      return Promise.resolve(null);
    },
    create(data: AuthDto) {
      return Promise.resolve({ ...data, id: 1 });
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
    userService.findByEmail = () =>
      Promise.resolve({ id: 2, email: '', password: '' });
    await expect(
      authService.signup({ email: 'john', password: 'duran' }),
    ).rejects.toThrow(BadRequestException);
  });
});
