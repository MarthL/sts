import { IsNotEmpty, IsString, MinLength, IsNumber } from 'class-validator';
import { OneToMany } from 'typeorm';

export class UserLoginDto {
  @IsNotEmpty()
  @IsNumber()
  id!: number;

  @IsNotEmpty()
  @IsString()
  username!: string;

  @IsNotEmpty()
  @IsString()
  @MinLength(2)
  password!: string;
}
