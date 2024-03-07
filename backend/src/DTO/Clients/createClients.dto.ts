import { IsNotEmpty, IsOptional, IsString } from 'class-validator';

export default class CreateClientsDto {
  @IsNotEmpty()
  @IsString()
  name: string;

  @IsNotEmpty()
  @IsString()
  siret: string;

  @IsOptional()
  @IsString()
  industry: string;

  @IsNotEmpty()
  @IsString()
  mail: string;

  @IsNotEmpty()
  @IsString()
  phone: string;

  @IsOptional()
  @IsString()
  adress: string;

  @IsOptional()
  @IsString()
  zip_code: string;

  @IsOptional()
  @IsString()
  state: string;

  @IsOptional()
  @IsString()
  city: string;
}