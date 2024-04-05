import { IsNotEmpty, IsString, MaxLength, MinLength } from 'class-validator';
import { Exclude } from 'class-transformer';

export class UserLoginDto {
  @IsNotEmpty()
  @IsString()
  @MinLength(3)
  @MaxLength(50)
  username!: string;

  @IsNotEmpty()
  @Exclude()
  @IsString()
  @MinLength(2)
  @MaxLength(72)
  password!: string;
}