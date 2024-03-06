import { IsNotEmpty, IsInt, IsString } from 'class-validator';

export default class LinksResponseDto {
  @IsNotEmpty()
  @IsInt()
  id: number;

  @IsNotEmpty()
  @IsString()
  url: string;
}