/* eslint-disable @typescript-eslint/no-require-imports */
import { MiddlewareConsumer, Module, ValidationPipe } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './user/user.module';
import { ReportModule } from './report/report.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './user/user.entity';
import { Report } from './report/report.entity';
import { ConfigModule, ConfigService } from '@nestjs/config';
import * as morgan from 'morgan';
import * as Joi from 'joi';
import { APP_PIPE } from '@nestjs/core';
const cookieSession = require('cookie-session');

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: `.env.${process.env.NODE_ENV}`,
      validationSchema: Joi.object({
        DB_NAME: Joi.string().required(),
        SESSION_SECRET: Joi.string().required(),
      }),
    }),
    TypeOrmModule.forRootAsync({
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => ({
        type: 'sqlite',
        database: configService.get<string>('DB_NAME'),
        synchronize: true,
        entities: [User, Report],
      }),
    }),
    UserModule,
    ReportModule,
  ],
  controllers: [AppController],
  providers: [
    AppService,
    {
      provide: APP_PIPE,
      useValue: new ValidationPipe({
        whitelist: true,
      }),
    },
  ],
})
export class AppModule {
  constructor(private readonly configService: ConfigService) {}
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(
        cookieSession({
          name: 'session',
          httpOnly: true,
          keys: [this.configService.get<string>('SESSION_SECRET')],
          secure: this.configService.get<string>('NODE_ENV') === 'production',
        }),
        this.configService.get<string>('NODE_ENV') === 'development' &&
          morgan('tiny'),
      )
      .forRoutes('*');
  }
}
