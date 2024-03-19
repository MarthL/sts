import { IsNotEmpty, IsInt, IsOptional, MaxLength } from 'class-validator';

export default class ClientsResponseDto {
  
  @IsInt()
  id: number;

  @IsNotEmpty()
  @MaxLength(100)
  name: string;

  @IsNotEmpty()
  @MaxLength(14)
  siret: string;

  @IsOptional()
  @MaxLength(50)
  industry: string;

  @IsNotEmpty()
  @MaxLength(200)
  mail: string;

  @IsNotEmpty()
  @MaxLength(12)
  phone: string;

  @IsOptional()
  @MaxLength(255)
  adress: string;

  @IsOptional()
  @MaxLength(5)
  zip_code: string;

  @IsOptional()
  @MaxLength(170)
  state: string;

  @IsOptional()
  @MaxLength(50)
  city: string;
}