import { IsNotEmpty, IsOptional } from 'class-validator';

export default class createClientsDto {
  @IsNotEmpty()
  name: string;

  @IsNotEmpty()
  siret: string;

  @IsOptional()
  industry: string;

  @IsNotEmpty()
  mail: string;

  @IsNotEmpty()
  phone: string;

  @IsOptional()
  adress: string;

  @IsOptional()
  zip_code: string;

  @IsOptional()
  state: string;

  @IsOptional()
  city: string;
}
