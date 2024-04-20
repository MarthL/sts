import { IsNotEmpty, IsInt, IsOptional, IsString, MaxLength } from 'class-validator';

export default class ClientsResponseDto {
  @IsInt()
  id: number;

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
  @MaxLength(30)
  industry?: string;

  @IsString()
  @IsNotEmpty()
  @MaxLength(70)
  mail!: string;

  @IsString()
  @IsNotEmpty()
  @MaxLength(15)
  phone!: string;

  @IsString()
  @IsOptional()
  @MaxLength(200)
  address?: string;

  @IsInt()
  @IsOptional()
  @MaxLength(5)
  city_id?: number;

  @IsInt()
  @IsOptional()
  projects_id?: number;
}
  