import { Exclude } from 'class-transformer';
import { IsNotEmpty, IsOptional, MaxLength, IsNumber } from 'class-validator';
import { Status } from 'src/status/status.entity';
import { Users } from 'src/users/users.entity';

@Exclude()
export class updateProjectDto {
  @IsNotEmpty()
  @MaxLength(50)
  project_name: string;

  @IsNotEmpty()
  description: string;

  @IsOptional()
  @IsNumber()
  status?: Status;

  @IsOptional()
  collaborators: Users[];

  @IsOptional()
  startDate: Date;

  @IsOptional()
  endDate: Date;

  @IsOptional()
  @IsNumber()
  companyId?: number;

  @IsOptional()
  project_picture?: string;
}
