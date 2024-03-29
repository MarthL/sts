import { IsNotEmpty, IsString, MinLength } from 'class-validator';
import { Exclude } from 'class-transformer';

export class UserLoginDto {
  @IsNotEmpty()
  @IsString()
  username!: string;

  @IsNotEmpty()
  @Exclude()
  @IsString()
  @MinLength(3)
  password!: string;
}
