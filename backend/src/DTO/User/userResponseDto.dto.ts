import { IsNotEmpty, IsString, MinLength, IsNumber } from 'class-validator';
import { Exclude } from 'class-transformer';
import { OneToMany } from 'typeorm';

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

  @IsString()
  @MinLength(3)
  city: string;

  @IsNumber()
  @MinLength(3)
  state?: number;

  @IsNumber()
  @MinLength(2)
  zip_code?: number;

  @IsString()
  @MinLength(3)
  country?: string;

  @IsString()
  @MinLength(2)
  email: string;
}
