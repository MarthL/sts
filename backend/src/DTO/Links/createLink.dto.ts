import { IsNotEmpty } from 'class-validator';

export class createLinkDto {
  @IsNotEmpty()
  url: string;
}