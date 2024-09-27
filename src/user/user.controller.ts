import {
  Body,
  Controller,
  Delete,
  Get,
  NotFoundException,
  Param,
  ParseIntPipe,
  Patch,
  Query,
  Session,
} from '@nestjs/common';
import { UserService } from './user.service';
import { QueryDto } from './dtos/user.query.dto';
import { UpdateDto } from './dtos/user.update.dto';
import { User } from './decorators/user.decorator';
import { IUser } from './user.interfcae';
import { Serialize } from 'src/interceptors/serialize.intercepyor';
import { UserDto } from './dtos/user.dto';

@Controller('users')
@Serialize(UserDto)
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get()
  getUsers(@Query() query: QueryDto, @Session() session: any) {
    console.log(session);
    return this.userService.getAll(query);
  }

  @Get('/me')
  getCurrentUser(@User() user: IUser) {
    return user;
  }

  @Get('/:id')
  async getUser(@Param('id', ParseIntPipe) id: number) {
    const user = await this.userService.getOne(id);
    if (!user) {
      throw new NotFoundException(`No user found with id:${id}`);
    }
    return user;
  }

  @Patch('/:id')
  async updateUser(
    @Param('id', ParseIntPipe) id: number,
    @Body() body: UpdateDto,
  ) {
    const user = await this.userService.getOne(id);
    if (!user) {
      throw new NotFoundException(`No user found with id:${id}`);
    }
    return this.userService.update(user, body);
  }

  @Delete('/:id')
  async deleteUSer(@Param('id', ParseIntPipe) id: number) {
    const user = await this.userService.getOne(id);
    if (!user) {
      throw new NotFoundException(`No user found with id:${id}`);
    }
    return this.userService.delete(user);
  }
}
