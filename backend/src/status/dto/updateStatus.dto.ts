import { IsInt, IsString } from "class-validator";

export class UpdateStatusDto {
    @IsInt()
    id: number;

    @IsString()
    statusName: string;
}