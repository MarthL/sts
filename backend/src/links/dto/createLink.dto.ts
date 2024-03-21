import { IsNotEmpty, IsString } from 'class-validator';

export class createLinkDto {
  @IsNotEmpty()
  @IsString()
  url: string;
}