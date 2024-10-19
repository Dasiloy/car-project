import {
  IsLatitude,
  IsLongitude,
  IsNumber,
  IsString,
  Max,
  Min,
} from 'class-validator';

export class CreateReportDto {
  @IsString()
  make: string;

  @IsString()
  model: string;

  @Min(1960)
  @Max(2024)
  @IsNumber()
  year: number;

  @IsLongitude()
  lng: number;

  @IsLatitude()
  lat: number;

  @Min(0)
  @Max(1000000)
  @IsNumber()
  mileage: number;

  @Min(0)
  @Max(1000000)
  @IsNumber()
  price: number;
}
