import { IsNotEmpty, IsOptional, MaxLength } from 'class-validator';

export default class CreateClientsDto {
  @IsNotEmpty()
  @MaxLength(50)
  name: string;

  @IsNotEmpty()
  @MaxLength(14)
  siret: string;

  @IsOptional()
  @MaxLength(50)
  industry: string;

  @IsNotEmpty()
  @MaxLength(70)
  mail: string;

  @IsNotEmpty()
  @MaxLength(12)
  phone: string;

  @IsOptional()
  @MaxLength(100)
  adress: string;

  @IsOptional()
  @MaxLength(5)
  zip_code: string;

  @IsOptional()
  @MaxLength(100)
  state: string;

  @IsOptional()
  @MaxLength(50)
  city: string;
}