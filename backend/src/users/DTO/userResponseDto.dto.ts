import { IsNotEmpty, IsString, MinLength, IsNumber } from 'class-validator';

export class UserResponseDto {
  @IsNotEmpty()
  @IsString()
  username: string;

  @IsNotEmpty()
  @IsString()
  @MinLength(6)
  password: string;
}
