/* eslint-disable @typescript-eslint/no-require-imports */
import { MiddlewareConsumer, Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './user/user.module';
import { ReportModule } from './report/report.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './user/user.entity';
import { Report } from './report/report.entity';
import { ConfigModule } from '@nestjs/config';
import * as morgan from 'morgan';
import * as Joi from 'joi';
const cookieSession = require('cookie-session');

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: `.env.${process.env.NODE_ENV}`,
      validationSchema: Joi.object({
        session_secret: Joi.string().required(),
      }),
    }),
    TypeOrmModule.forRoot({
      type: 'sqlite',
      database: 'db.sqlite',
      synchronize: true,
      entities: [User, Report],
    }),
    UserModule,
    ReportModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(
        cookieSession({
          name: 'session',
          httpOnly: true,
          keys: [process.env.session_secret],
          secure: process.env.NODE_ENV === 'production',
        }),
        process.env.NODE_ENV === 'development' && morgan('tiny'),
      )
      .forRoutes('*');
  }
}
