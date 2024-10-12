import { TestingModule, Test } from '@nestjs/testing';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { User } from './user.entity';
import { UnauthorizedException } from '@nestjs/common';

describe('AuthController', () => {
  let users: User[];
  let authService: Partial<AuthService>;
  let controller: AuthController;

  beforeEach(async () => {
    users = [];
    authService = {
      signup(data) {
        const user = { ...data, id: 1 };
        users.push(user);
        return Promise.resolve(user);
      },
      login(data) {
        const user = users.find((u) => u.email === data.email);
        return Promise.resolve(user);
      },
    };
    const module: TestingModule = await Test.createTestingModule({
      controllers: [AuthController],
      providers: [
        {
          provide: AuthService,
          useValue: authService,
        },
      ],
    }).compile();

    controller = module.get<AuthController>(AuthController);
  });

  it("expects 'controller' to be defined", () => {
    expect(controller).toBeDefined();
  });

  it('expects user from sign up and update session', async () => {
    const session = { user_id: null };
    const user = await controller.signup(
      {
        email: 'test@test.com',
        password: 'test',
      },
      session,
    );
    expect(user).toBeDefined();
    expect(session.user_id).toEqual(user.id);
  });

  it('expects 401 error when trying to login with invalid credentials', async () => {
    const session = { user_id: null };
    const data = {
      email: 'test@test.com',
      password: 'test',
    };
    await expect(controller.login(data, session)).rejects.toThrow(
      UnauthorizedException,
    );
  });

  it('expects user and update session when trying to login with valid credentials', async () => {
    const session = { user_id: null };
    const data = {
      email: 'test@test.com',
      password: 'test',
    };
    await controller.signup(data, session);
    const user = await controller.login(data, session);
    expect(user).toBeDefined();
    expect(session.user_id).toEqual(user.id);
  });

  it('expects session to clear on logout', async () => {
    const session = { user_id: 1 };
    controller.logout(session);
    expect(session.user_id).toBeNull();
  });
});
