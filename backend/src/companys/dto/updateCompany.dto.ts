import {
  IsOptional,
  IsArray,
  IsInt,
  IsString,
  MaxLength,
} from 'class-validator';

export class UpdateCompanyDto {
  @IsOptional()
  @IsString()
  @MaxLength(50)
  name: string;

  @IsOptional()
  @IsArray()
  @IsInt({ each: true })
  projectsIds?: number[];
}
