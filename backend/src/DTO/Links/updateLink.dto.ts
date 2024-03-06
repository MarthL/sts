import { Exclude } from 'class-transformer';
import { IsNotEmpty } from 'class-validator';

@Exclude()
export class updateLinkDto {
  @Exclude()
  id: number;

  @IsNotEmpty()
  url: string;
}