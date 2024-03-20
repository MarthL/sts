import {
  IsNotEmpty,
  IsString,
  MinLength,
  IsOptional,
  IsInt,
} from 'class-validator';

export class UserResponseDto {
  @IsNotEmpty()
  @IsInt()
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

  @IsInt()
  @IsOptional()
  city_id?: number;

  @IsString()
  @IsOptional()
  email: string;

  @IsInt()
  @IsOptional()
  company_id?: number;

  @IsInt()
  @IsOptional()
  link_id?: number;
}