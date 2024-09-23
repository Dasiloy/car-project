import {
  Body,
  Controller,
  HttpCode,
  Post,
  UnauthorizedException,
} from '@nestjs/common';
import { AuthDto } from './dtos/auth.dto';
import { AuthService } from './auth.service';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('/signup')
  signup(@Body() body: AuthDto) {
    return this.authService.signup(body);
  }

  @Post('/login')
  @HttpCode(200)
  async login(@Body() body: AuthDto) {
    const user = await this.authService.login(body);
    if (!user) {
      throw new UnauthorizedException('Unauthorized');
    }
    return user;
  }
}
