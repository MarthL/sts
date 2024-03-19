import { IsNotEmpty, IsString, IsNumber, MaxLength } from 'class-validator';

export class CompanyResponseDto {
  @IsNumber()
  id: number;

  @IsNotEmpty()
  @IsString()
  @MaxLength(100)
  name: string;
}