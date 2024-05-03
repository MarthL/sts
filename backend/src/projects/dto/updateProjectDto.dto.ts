import { Exclude } from 'class-transformer';
import { IsNotEmpty, IsOptional, MaxLength, IsNumber } from 'class-validator';

@Exclude()
export class updateProjectDto {
  @IsNotEmpty()
  @MaxLength(50)
  project_name: string;

  @IsNotEmpty()
  description: string;

  @IsOptional()
  @IsNumber()
  statusId: number;

  @IsOptional()
  collaborators: number[];

  @IsOptional()
  project_picture: string;
}
