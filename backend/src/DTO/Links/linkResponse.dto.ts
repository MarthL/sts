import { IsNotEmpty, IsInt, IsString } from 'class-validator';

export class LinksResponseDto {
  @IsInt()
  id: number;

  @IsNotEmpty()
  @IsString()
  url: string;
}