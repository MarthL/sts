import { IsNotEmpty, IsString, MinLength, IsNumber } from 'class-validator';
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
  @Exclude()
  @MinLength(2)
  password: string;

  @IsString()
  @MinLength(2)
  family_name: string;

  @IsString()
  @MinLength(2)
  job_id?: number;

  @IsString()
  @MinLength(5)
  address: string;

  @IsString()
  @MinLength(2)
  phone_number?: string;

  @IsNumber()
  city_id?: number;

  @IsString()
  @MinLength(2)
  email: string;

  // @IsNumber()
  // company_id?: number;
}
