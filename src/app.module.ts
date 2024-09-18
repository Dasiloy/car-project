import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthService } from './auth/auth.service';
import { AuthController } from './auth/auth.controller';
import { AuthModule } from './auth/auth.module';
import { UserService } from './user/user.service';
import { UserController } from './user/user.controller';
import { UserModule } from './user/user.module';
import { ReportService } from './report/report.service';
import { ReportController } from './report/report.controller';
import { ReportModule } from './report/report.module';

@Module({
  imports: [AuthModule, UserModule, ReportModule],
  controllers: [AppController, AuthController, UserController, ReportController],
  providers: [AppService, AuthService, UserService, ReportService],
})
export class AppModule {}
