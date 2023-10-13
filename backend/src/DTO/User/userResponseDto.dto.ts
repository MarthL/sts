import { IsNotEmpty, IsString, MinLength, IsNumber } from 'class-validator';
import { OneToMany } from 'typeorm';

export class UserResponseDto {
  @IsNotEmpty()
  @IsNumber()
  id!: number;

  @IsNotEmpty()
  @IsString()
  username!: string;

  @IsNotEmpty()
  @IsString()
  @MinLength(6)
  password!: string;

  @IsString()
  @MinLength(2)
  family_name!: string;

  @IsString()
  @MinLength(2)
  job_id?: string;
}
