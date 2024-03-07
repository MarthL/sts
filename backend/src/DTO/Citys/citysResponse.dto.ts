import { IsNotEmpty, IsInt, IsString } from 'class-validator';

export class CitysResponseDto {
  @IsInt()
  id: number;

  @IsNotEmpty()
  @IsString()
  city_name: string;

  @IsNotEmpty()
  @IsString()
  zip_code: string;

  @IsNotEmpty()
  @IsString()
  state: string;
}