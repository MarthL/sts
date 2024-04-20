import {
  IsNotEmpty,
  IsString,
  MinLength,
  IsOptional,
  IsInt,
  MaxLength,
} from 'class-validator';

export class UserResponseDto {
  @IsNotEmpty()
  @IsInt()
  id: number;

  @IsNotEmpty()
  @IsString()
  @MinLength(3)
  @MaxLength(50)
  username: string;

  @IsNotEmpty()
  @IsString()
  @MinLength(2)
  @MaxLength(72)
  password: string;

  @IsOptional()
  @IsString()
  @MaxLength(100)
  family_name: string;
  
  @IsOptional()
  @IsString()
  job_id?: number;

  @IsOptional()
  @IsString()
  @MaxLength(255)
  address: string;

  @IsOptional()
  @IsString()
  @MaxLength(12)
  phone_number?: string;

  @IsInt()
  @IsOptional()
  city_id?: number;

  @IsOptional()
  @IsString()
  @MaxLength(100)
  email: string;

  @IsInt()
  @IsOptional()
  company_id?: number;

  @IsInt()
  @IsOptional()
  link_id?: number;
}