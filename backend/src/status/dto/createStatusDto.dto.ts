import { IsNotEmpty, IsInt, MaxLength } from 'class-validator';

export class CreateStatusDto {
  @IsNotEmpty()
  @MaxLength(100)
  name: string;
}
