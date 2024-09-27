import { Controller, Get } from '@nestjs/common';
import { User } from 'src/user/decorators/user.decorator';
import { IUser } from 'src/user/user.interfcae';

@Controller('reports')
export class ReportController {
  @Get('')
  getReports(@User() user: IUser) {
    return user;
  }
}
