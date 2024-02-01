import { IsNotEmpty, IsString, IsNumber } from 'class-validator';

export class CompanyResponseDto {
  @IsNotEmpty()
  @IsNumber()
  id: number;

  @IsNotEmpty()
  @IsString()
  name: string;
}
