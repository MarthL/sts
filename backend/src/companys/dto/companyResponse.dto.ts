import {
  IsNotEmpty,
  IsString,
  IsNumber,
  MaxLength,
  IsOptional,
  IsArray,
} from 'class-validator';
import { Projects } from 'src/projects/projects.entity';

export class CompanyResponseDto {
  @IsNumber()
  id: number;

  @IsNotEmpty()
  @IsString()
  @MaxLength(50)
  name: string;

  // @IsOptional()
  // @IsArray()
  // projectsIds: number[];
}
