import { IsInt, IsNotEmpty, IsOptional, IsString } from 'class-validator';

export default class CreateClientsDto {
  @IsString()
  @IsNotEmpty()
  name!: string;

  @IsString()
  @IsNotEmpty()
  siret!: string;

  @IsString()
  @IsOptional()
  industry?: string;

  @IsString()
  @IsNotEmpty()
  mail!: string;

  @IsString()
  @IsNotEmpty()
  phone!: string;

  @IsString()
  @IsOptional()
  address?: string;

  @IsInt()
  @IsOptional()
  city_id?: number;

  @IsInt()
  @IsOptional()
  projects_id?: number;
}