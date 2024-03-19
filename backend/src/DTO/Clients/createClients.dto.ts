<<<<<<< HEAD
import { IsNotEmpty, IsOptional, IsString } from 'class-validator';
=======
import { IsNotEmpty, IsOptional, IsString, IsInt } from 'class-validator';
import { Projects } from 'src/projects/projects.entity';
>>>>>>> e532615818865792d86e1f360653afa343423383

export default class CreateClientsDto {
  @IsInt()
  id: number;

  @IsNotEmpty()
  @IsString()
<<<<<<< HEAD
  name: string;
=======
  name!: string;
>>>>>>> e532615818865792d86e1f360653afa343423383

  @IsString()
  @IsNotEmpty()
<<<<<<< HEAD
  @IsString()
  siret: string;
=======
  siret!: string;
>>>>>>> e532615818865792d86e1f360653afa343423383

  @IsString()
  @IsOptional()
<<<<<<< HEAD
  @IsString()
  industry: string;
=======
  industry?: string;
>>>>>>> e532615818865792d86e1f360653afa343423383

  @IsString()
  @IsNotEmpty()
<<<<<<< HEAD
  @IsString()
  mail: string;
=======
  mail!: string;
>>>>>>> e532615818865792d86e1f360653afa343423383

  @IsString()
  @IsNotEmpty()
<<<<<<< HEAD
  @IsString()
  phone: string;
=======
  phone!: string;

  @IsString()
  @IsOptional()
  adress?: string;
>>>>>>> e532615818865792d86e1f360653afa343423383

  @IsString()
  @IsOptional()
<<<<<<< HEAD
  @IsString()
  adress: string;
=======
  zip_code?: string;
>>>>>>> e532615818865792d86e1f360653afa343423383

  @IsString()
  @IsOptional()
<<<<<<< HEAD
  @IsString()
  zip_code: string;
=======
  state?: string;
>>>>>>> e532615818865792d86e1f360653afa343423383

  @IsString()
  @IsOptional()
<<<<<<< HEAD
  @IsString()
  state: string;
=======
  city?: string;
>>>>>>> e532615818865792d86e1f360653afa343423383

  @IsString()
  @IsOptional()
<<<<<<< HEAD
  @IsString()
  city: string;
=======
  projects?: Projects;
>>>>>>> e532615818865792d86e1f360653afa343423383
}