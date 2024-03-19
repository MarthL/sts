import { IsNotEmpty, IsString, MinLength, IsNumber, MaxLength } from 'class-validator';

export class UserLoginDto {
  @IsNotEmpty()
  @IsNumber()
  id!: number;

  @IsNotEmpty()
  @IsString()
  @MinLength(3)
  @MaxLength(50)
  username!: string;

  @IsNotEmpty()
  @IsString()
  @MinLength(2)
  @MaxLength(72)
  password!: string;
}