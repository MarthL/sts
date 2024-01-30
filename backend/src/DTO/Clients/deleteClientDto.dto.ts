import {
    IsNotEmpty,
    IsOptional,
  } from 'class-validator';
  
  export class DeleteClientDto {
    @IsNotEmpty()

    @IsOptional()
    affected?: number;
  }
  