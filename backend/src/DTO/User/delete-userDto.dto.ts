import {
  IsArray,
  IsNotEmpty,
  IsEmpty,
  isArray,
  IsNumber,
  IsOptional,
} from 'class-validator';

export class DeleteUserDto {
  @IsEmpty()
  @IsArray()
  raw: [];

  @IsNumber()
  @IsOptional()
  affected?: number;
}
