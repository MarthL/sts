import { IsNotEmpty, IsInt, IsOptional, MaxLength } from 'class-validator';

export default class ClientsResponseDto {
  
  @IsInt()
  id: number;

  @IsNotEmpty()
  @MaxLength(50)
  name: string;

  @IsNotEmpty()
  @MaxLength(14)
  siret: string;

  @IsOptional()
  @MaxLength(30)
  industry: string;

  @IsNotEmpty()
  @MaxLength(70)
  mail: string;

  @IsNotEmpty()
  @MaxLength(15)
  phone: string;

  @IsOptional()
  @MaxLength(200)
  adress: string;

  @IsOptional()
  @MaxLength(5)
  zip_code: string;

  @IsOptional()
  @MaxLength(50)
  state: string;

  @IsOptional()
  @MaxLength(50)
  city: string;
}