import {
  IsNotEmpty,
  IsString,
  MinLength,
  IsNumber,
  IsOptional,
  MaxLength,
} from 'class-validator';

export class UserResponseDto {
  @IsNotEmpty()
  @IsNumber()
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

  @IsOptional()
  @IsNumber()
  city_id?: number;

  @IsOptional()
  @IsString()
  @MaxLength(100)
  email: string;

  @IsOptional()
  @IsNumber()
  company_id?: number;

  @IsOptional()
  @IsString()
  profile_picture?: string;
}
