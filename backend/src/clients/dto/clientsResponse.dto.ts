import { IsNotEmpty, IsInt, IsOptional } from 'class-validator';
import { Citys } from 'src/citys/citys.entity';
import { Projects } from 'src/projects/projects.entity';

export default class ClientsResponseDto {
  @IsInt()
  id: number;

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
  city_id?: Citys[];

  @IsOptional()
  projects_id?: Projects[];
}