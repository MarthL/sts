<<<<<<< HEAD
import { IsNotEmpty, IsInt, IsString } from 'class-validator';
=======
import { IsNotEmpty, IsInt, IsOptional } from 'class-validator';
>>>>>>> e532615818865792d86e1f360653afa343423383

export default class ProjectsResponseDto {
  @IsNotEmpty()
  @IsInt()
  id: number;

  @IsNotEmpty()
  @IsString()
  project_name: string;

  @IsNotEmpty()
  @IsString()
  description: string;

  @IsOptional()
  clients?: string;
}