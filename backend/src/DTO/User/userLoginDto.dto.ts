import { IsNotEmpty, IsString, MinLength, IsInt } from 'class-validator';

export class UserLoginDto {
  @IsNotEmpty()
  @IsInt()
  id!: number;

  @IsNotEmpty()
  @IsString()
  username!: string;

  @IsNotEmpty()
  @IsString()
  @MinLength(2)
  password!: string;
}