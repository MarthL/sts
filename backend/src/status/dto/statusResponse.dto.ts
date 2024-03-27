import { IsInt, IsString } from "class-validator";

export class StatusResponseDto {
    @IsInt()
    id: number;

    @IsString()
    statusName: string;
}