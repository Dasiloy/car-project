import { Controller, Get } from '@nestjs/common';
import { User } from 'src/user/decorators/user.decorator';
import { User as UserEntity } from 'src/user/user.entity';

@Controller('reports')
export class ReportController {
  @Get('')
  getReports(@User() user: UserEntity) {
    return user;
  }
}
