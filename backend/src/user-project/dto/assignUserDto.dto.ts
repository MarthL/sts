import { ApiProperty } from '@nestjs/swagger';

export class AssignUserDto {
  @ApiProperty()
  userId: number;

  @ApiProperty()
  projectId: number;

  @ApiProperty({ example: 0.8 })
  occupation_rate: number;
}
