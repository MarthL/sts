import { IsNotEmpty, IsString, IsInt, MaxLength } from 'class-validator';

export class CompanyResponseDto {
  @IsInt()
  id: number;

  @IsNotEmpty()
  @IsString()
  @MaxLength(50)
  name: string;
}