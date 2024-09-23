import { IsEmail, IsOptional } from 'class-validator';

export class QueryDto {
  @IsEmail()
  @IsOptional()
  email: string;
}
