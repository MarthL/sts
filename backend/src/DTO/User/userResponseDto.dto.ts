import {
  IsNotEmpty,
  IsString,
  MinLength,
  IsNumber,
  IsOptional,
} from 'class-validator';
import { Exclude } from 'class-transformer';

export class UserResponseDto {
  @IsNotEmpty()
  @IsNumber()
  id: number;

  @IsNotEmpty()
  @IsString()
  username: string;

  @IsNotEmpty()
  @IsString()
  @MinLength(2)
  password: string;

  @IsString()
  @MinLength(2)
  @IsOptional()
  family_name: string;

  @IsString()
  @MinLength(2)
  @IsOptional()
  job_id?: number;

  @IsString()
  @IsOptional()
  @MinLength(5)
  address: string;

  @IsString()
  @IsOptional()
  phone_number?: string;

  @IsNumber()
  @IsOptional()
  city_id?: number;

  @IsString()
  @IsOptional()
  email: string;

  @IsNumber()
  @IsOptional()
  company_id?: number;
}
