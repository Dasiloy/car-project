import {
  Body,
  Controller,
  HttpCode,
  HttpStatus,
  Post,
  Session,
  UnauthorizedException,
} from '@nestjs/common';
import { AuthDto } from './dtos/auth.dto';
import { AuthService } from './auth.service';
import { Serialize } from 'src/interceptors/serialize.intercepyor';
import { UserDto } from 'src/user/dtos/user.dto';
import { Public } from 'src/metadata/route.metadata';

@Controller('auth')
@Serialize(UserDto)
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Public()
  @Post('/signup')
  async signup(@Body() body: AuthDto, @Session() session: any) {
    const user = await this.authService.signup(body);
    session.user_id = user.id;
    return user;
  }

  @Public()
  @Post('/login')
  @HttpCode(HttpStatus.OK)
  async login(@Body() body: AuthDto, @Session() session: any) {
    const user = await this.authService.login(body);
    if (!user) {
      throw new UnauthorizedException('Unauthorized');
    }
    session.user_id = user.id;
    return user;
  }

  @Post('/logout')
  @HttpCode(HttpStatus.OK)
  logout(@Session() session: any) {
    session.user_id = null;
  }
}
