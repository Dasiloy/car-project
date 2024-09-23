import { IsEmail, IsOptional } from 'class-validator';

export class UpdateDto {
  @IsEmail()
  @IsOptional()
  email: string;
}
