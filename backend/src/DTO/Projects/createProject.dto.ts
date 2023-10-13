import { Exclude, Expose } from 'class-transformer';
import { IsNotEmpty } from 'class-validator';

@Exclude()
export default class createProjectDto {
  @IsNotEmpty()
  project_name: string;

  @IsNotEmpty()
  description: string;
}
