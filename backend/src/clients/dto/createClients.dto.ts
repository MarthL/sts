import { IsInt, IsNotEmpty, IsOptional, IsString, MaxLength } from 'class-validator';

export default class CreateClientsDto {
  @IsString()
  @IsNotEmpty()
  @MaxLength(50)
  name!: string;

  @IsString()
  @IsNotEmpty()
  @MaxLength(14)
  siret!: string;

  @IsString()
  @IsOptional()
  @MaxLength(50)
  industry?: string;

  @IsString()
  @IsNotEmpty()
  @MaxLength(70)
  mail!: string;

  @IsString()
  @IsNotEmpty()
  @MaxLength(12)
  phone!: string;

  @IsString()
  @IsOptional()
  @MaxLength(100)
  address?: string;

  @IsInt()
  @IsOptional()
  @MaxLength(5)
  city_id?: number;

  @IsInt()
  @IsOptional()
  projects_id?: number;
}