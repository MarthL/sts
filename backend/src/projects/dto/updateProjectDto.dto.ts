import { Exclude } from 'class-transformer';
import { IsInt, IsNotEmpty, IsString } from 'class-validator';
import { Status } from 'src/status/status.entity';
import { Column } from 'typeorm';

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

  @Column()
  status: Status;
}