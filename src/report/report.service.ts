import { Repository } from 'typeorm';
import { Report } from './report.entity';
import { User } from '../user/user.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateReportDto } from './dtos/create_report';
import { ApproveReportDto } from './dtos/approve_report.dto';
import { Injectable, NotFoundException } from '@nestjs/common';
import { QueryReportDto } from './dtos/query._report.dto';

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

  async findReportById(id: number) {
    const report = await this.reportRepo.findOneBy({
      id,
    });
    if (!report) {
      throw new NotFoundException(`No report with id:${id}`);
    }
    return report;
  }

  async approveReport(id: number, approveReportDto: ApproveReportDto) {
    const report = await this.findReportById(id);
    report.approved = approveReportDto.approved;
    return this.reportRepo.save(report);
  }

  async GetEstimatedPrice(query: QueryReportDto) {
    console.log(query);
    return Promise.resolve({
      price: Math.round(Math.random() * 1000),
    });
  }
}
