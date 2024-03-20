import { IsNotEmpty, IsString, IsInt } from 'class-validator';

export class CompanyResponseDto {
  @IsInt()
  id: number;

  @IsNotEmpty()
  @IsString()
  name: string;
}