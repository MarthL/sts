import { IsNotEmpty, IsString } from 'class-validator';

export class CreateCompanyDto {
  @IsString()
  name: string;
}
