import { Exclude } from 'class-transformer';
import { IsNotEmpty, IsString } from 'class-validator';

@Exclude()
export class updateProjectDto {
  @Exclude()
  @IsNotEmpty()
  id: number;

  @IsNotEmpty()
  @IsString()
  project_name: string;

  @IsNotEmpty()
  @IsString()
  description: string;
}