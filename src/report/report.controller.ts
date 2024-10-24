import {
  Body,
  Controller,
  Get,
  Post,
  Patch,
  Param,
  ParseIntPipe,
  UseGuards,
  Query,
} from '@nestjs/common';
import { CurrentUser } from '../user/decorators/user.decorator';
import { User } from '../user/user.entity';
import { CreateReportDto } from './dtos/create_report';
import { ReportService } from './report.service';
import { Serialize } from '../interceptors/serialize.intercepyor';
import { CreatedReportDto } from './dtos/created_report.dto';
import { ApproveReportDto } from './dtos/approve_report.dto';
import { AdminGuard } from '../guards/admin.guard';
import { QueryReportDto } from './dtos/query._report.dto';

@Controller('reports')
export class ReportController {
  constructor(private readonly reportService: ReportService) {}
  @Post()
  @Serialize(CreatedReportDto)
  CreateReport(@Body() body: CreateReportDto, @CurrentUser() user: User) {
    return this.reportService.create(body, user);
  }

  @Get('')
  getReports(@Query() query: QueryReportDto) {
    return this.reportService.GetEstimatedPrice(query);
  }

  @Patch('/:id')
  @UseGuards(AdminGuard)
  approveReport(
    @Param('id', ParseIntPipe) id: number,
    @Body() body: ApproveReportDto,
  ) {
    return this.reportService.approveReport(id, body);
  }
}
