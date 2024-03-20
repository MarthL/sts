import { IsNotEmpty, IsOptional } from 'class-validator';

export default class CreateClientsDto {
  @IsNotEmpty()
  name!: string;

  @IsNotEmpty()
  siret!: string;

  @IsOptional()
  industry?: string;

  @IsNotEmpty()
  mail!: string;

  @IsNotEmpty()
  phone!: string;

  @IsOptional()
  address?: string;

  @IsOptional()
  city_id?: number;

  @IsOptional()
  projects_id?: number;
}