import { IsNotEmpty, IsInt } from 'class-validator';

export class CitysResponseDto {
  @IsInt()
  id: number;

  @IsNotEmpty()
  city_name: string;

  @IsNotEmpty()
  zip_code: string;

  @IsNotEmpty()
  state: string;
}
