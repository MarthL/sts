import { Exclude, Expose } from 'class-transformer';
import { IsNotEmpty } from 'class-validator';

@Exclude()
export class UpdateProjectDto {
  @Exclude()
  @IsNotEmpty()
  id: number;

  @IsNotEmpty()
  project_name: string;

  @IsNotEmpty()
  description: string;
}
