import { Exclude } from 'class-transformer';
import { IsInt, IsNotEmpty, IsString } from 'class-validator';

@Exclude()
export class updateProjectDto {
  @Exclude()
  @IsNotEmpty()
  @IsInt()
  id: number;

  @IsNotEmpty()
  @IsString()
  project_name: string;

  @IsNotEmpty()
  @IsString()
  description: string;

  @IsInt()
  status_id: number;
}