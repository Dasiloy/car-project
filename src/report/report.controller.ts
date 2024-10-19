import { Body, Controller, Get, Post } from '@nestjs/common';
import { CurrentUser } from '../user/decorators/user.decorator';
import { User } from '../user/user.entity';
import { CreateReportDto } from './dtos/create_report';
import { ReportService } from './report.service';
import { Serialize } from '../interceptors/serialize.intercepyor';
import { CreatedReportDto } from './dtos/created_report.dto';

@Controller('reports')
export class ReportController {
  constructor(private readonly reportService: ReportService) {}
  @Post()
  @Serialize(CreatedReportDto)
  CreateReport(@Body() body: CreateReportDto, @CurrentUser() user: User) {
    return this.reportService.create(body, user);
  }

  @Get('')
  getReports(@CurrentUser() user: User) {
    return user;
  }
}
