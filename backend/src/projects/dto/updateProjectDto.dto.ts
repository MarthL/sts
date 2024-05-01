import { Exclude } from 'class-transformer';
import { IsNotEmpty, IsOptional, MaxLength, IsNumber } from 'class-validator';
import { Status } from 'src/status/status.entity';

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

  @IsOptional()
  @IsNumber()
  statusId: number;
}
