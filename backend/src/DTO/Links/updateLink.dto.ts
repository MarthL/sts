import { Exclude } from 'class-transformer';
import { IsNotEmpty } from 'class-validator';

@Exclude()
export class updateLinkDto {
  @Exclude()
  @IsNotEmpty()
  id: number;

  @IsNotEmpty()
  url: string;
}