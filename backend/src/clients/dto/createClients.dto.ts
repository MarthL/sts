import { IsNotEmpty, IsOptional } from 'class-validator';
import { Citys } from 'src/citys/citys.entity';

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
  adress?: string;

  @IsOptional()
  city_id?: Citys[];
}