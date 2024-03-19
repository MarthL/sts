import { IsNotEmpty, IsString, MaxLength, MinLength } from 'class-validator';

export class CreateUserDto {
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