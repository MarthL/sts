import { IsNotEmpty, IsInt, MaxLength } from 'class-validator';

export class CreateStatusDto {
  @IsNotEmpty()
  @IsInt()
  id: number;

  @IsNotEmpty()
  @MaxLength(100)
  status: string;
}
