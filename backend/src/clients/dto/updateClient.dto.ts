import { IsInt, IsOptional, IsString } from 'class-validator';
import { Citys } from 'src/citys/citys.entity';
import { Projects } from 'src/projects/projects.entity';

export default class UpdateClientDto {
  @IsString()
  name!: string;

  @IsString()
  siret!: string;

  @IsString()
  @IsOptional()
  industry?: string;

  @IsString()
  mail!: string;

  @IsString()
  phone!: string;

  @IsString()
  @IsOptional()
  address?: string;

  @IsInt()
  @IsOptional()
  city_id?: Citys[];

  @IsOptional()
  projects_id?: Projects[];
}