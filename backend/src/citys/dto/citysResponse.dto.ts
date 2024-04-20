import { IsNotEmpty, IsInt, MaxLength, IsString } from 'class-validator';

export class CitysResponseDto {
  @IsInt()
  id: number;

  @IsNotEmpty()
  @MaxLength(25)
  @IsString()
  city_name: string;

  @IsNotEmpty()
  @MaxLength(5)
  @IsString()
  zip_code: string;

  @IsNotEmpty()
  @MaxLength(25)
  @IsString()
  state: string;
}