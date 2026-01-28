import { IsArray, IsEnum, IsOptional, IsString } from "class-validator";
import { inclusion_status } from "../enums/inclusion_status.enum";

export class CreateAdvancedSegmentDto {

    @IsEnum(inclusion_status)
    inclusion_status: inclusion_status;

    @IsString()
    selectedSegment: string[];

}