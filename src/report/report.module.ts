import { Module } from '@nestjs/common';
import { AuthModule } from 'src/auth/auth.module';
import { UserModule } from 'src/user/user.module';
import { ReportController } from './report.controller';
import { ReportService } from './report.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Report } from './report.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Report]), AuthModule, UserModule],
  controllers: [ReportController],
  providers: [ReportService],
})
export class ReportModule {}
