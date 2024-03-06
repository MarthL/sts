import { IsNotEmpty } from 'class-validator';

export default class createLinkDto {
  @IsNotEmpty()
  url: string;
}