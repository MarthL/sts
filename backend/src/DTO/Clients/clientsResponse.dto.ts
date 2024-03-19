import { IsNotEmpty, IsInt, IsOptional, IsString } from 'class-validator';

export default class ClientsResponseDto {
  
  @IsInt()
  id: number;

  @IsNotEmpty()
  @IsString()
<<<<<<< HEAD
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
=======
  name!: string;

  @IsNotEmpty()
  @IsString()
  siret!: string;

  @IsOptional()
  @IsString()
  industry?: string;

  @IsNotEmpty()
  @IsString()
  mail!: string;

  @IsNotEmpty()
  @IsString()
  phone!: string;

  @IsOptional()
  @IsString()
  adress?: string;

  @IsOptional()
  @IsString()
  zip_code?: string;

  @IsOptional()
  @IsString()
  state?: string;

  @IsOptional()
  @IsString()
  city?: string;

  @IsOptional()
  @IsString()
  projects?: any;
>>>>>>> e532615818865792d86e1f360653afa343423383
}