import { IsString } from "class-validator";

export class CreateParentSegmentDto {
    @IsString()
    name: string;

    @IsString()
    description: string;

    
}