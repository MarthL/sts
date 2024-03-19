import { IsNotEmpty, IsString, IsNumber } from 'class-validator';

export class CompanyResponseDto {
  @IsNumber()
  id: number;

  @IsNotEmpty()
  @IsString()
  name: string;
}
