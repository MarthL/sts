import { IsNotEmpty, IsNumber } from 'class-validator';

export class updateLinkDto {
  @IsNumber()
  id: number;

  @IsNotEmpty()
  url: string;
}