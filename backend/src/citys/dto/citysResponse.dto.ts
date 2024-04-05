import { IsNotEmpty, IsInt, MaxLength } from 'class-validator';

export class CitysResponseDto {
  @IsInt()
  id: number;

  @IsNotEmpty()
  @MaxLength(25)
  city_name: string;

  @IsNotEmpty()
  @MaxLength(5)
  zip_code: string;

  @IsNotEmpty()
  @MaxLength(25)
  state: string;
}