import { IsNotEmpty, IsInt, IsOptional } from 'class-validator';
// import { OneToMany } from 'typeorm';

export default class ClientsResponseDto {
  
  @IsInt()
  id: number;

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
