import { Exclude } from 'class-transformer';
import { IsNotEmpty, IsInt } from 'class-validator';

export default class ClientsResponseDto {
  @IsNotEmpty()
  @IsInt()
  id: number;

  @IsNotEmpty()
  name: string;

  @IsNotEmpty()
  description: string;
}
