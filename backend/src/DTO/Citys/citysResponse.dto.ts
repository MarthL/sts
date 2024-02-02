import { IsNotEmpty, IsInt } from 'class-validator';

export default class CitysResponseDto {
  @IsInt()
  id: number;

  @IsNotEmpty()
  city_name: string;

  @IsNotEmpty()
  zip_code: string;

  @IsNotEmpty()
  state: string;
}
