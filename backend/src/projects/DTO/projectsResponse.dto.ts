import { Exclude, Expose } from 'class-transformer';
import { IsNotEmpty } from 'class-validator';

@Exclude()
export default class ProjectsResponseDto {
  @Exclude()
  @IsNotEmpty()
  id: number;

  @Expose()
  @IsNotEmpty()
  project_name: string;

  @Expose()
  @IsNotEmpty()
  description: string;
}
