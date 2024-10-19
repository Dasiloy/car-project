import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { Report } from './report.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateReportDto } from './dtos/create_report';
import { User } from '../user/user.entity';

@Injectable()
export class ReportService {
  constructor(
    @InjectRepository(Report) private readonly reportRepo: Repository<Report>,
  ) {}
  create(createReport: CreateReportDto, user: User) {
    const report = this.reportRepo.create(createReport);
    report.user = user;
    return this.reportRepo.save(report);
  }
}
