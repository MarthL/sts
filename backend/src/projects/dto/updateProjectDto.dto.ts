import { Exclude } from 'class-transformer';
import { IsNotEmpty, MaxLength } from 'class-validator';

@Exclude()
export class updateProjectDto {
  @Exclude()
  @IsNotEmpty()
  id: number;

  @IsNotEmpty()
  @MaxLength(50)
  project_name: string;

  @IsNotEmpty()
  description: string;
}