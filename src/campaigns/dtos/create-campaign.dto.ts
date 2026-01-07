import { IsString, IsNumber, IsEnum, IsOptional, IsDateString } from "class-validator";
import { CampaignType } from "../campaign.entity";
import { ApiProperty } from "@nestjs/swagger";

export class CreateCampaignDto {

    @IsString()
    @ApiProperty({
        example: 'Diwali Festive Offers 2026'
    })
    name: string;

    @IsOptional()
    @IsString()
    @ApiProperty({
        example: 'Give users Diwali offer 2026 that increase our sales!'
    })
    description: string;

    @IsEnum(CampaignType)
    type: CampaignType;

    @IsDateString()
    startAt: Date;

    @IsDateString()
    endAt: Date;


    @IsOptional() 
    metadata: Record<string, any>




}