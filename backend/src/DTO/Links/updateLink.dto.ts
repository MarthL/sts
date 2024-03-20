import { IsInt, IsNotEmpty, IsString } from 'class-validator';

export class updateLinkDto {
  @IsInt()
  id: number;

  @IsNotEmpty()
  @IsString()
  url: string;
}