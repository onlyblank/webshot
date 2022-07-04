import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsBoolean, IsOptional, IsString } from 'class-validator';

export class ScreenshotDto {
    @ApiProperty({
        example: 'yourserver.com/item/3',
        description: 'Page url to make screenshot.',
    })
    @IsString()
    url: string;

    @ApiPropertyOptional({
        example: '#item-wrapper',
        description: "Element selector to clip screenshot by it's bounds.",
    })
    @IsOptional()
    @IsString()
    clipSelector?: string;

    @ApiPropertyOptional({
        description:
            'Will wait for special event to fire before creating a screenshot.',
    })
    @IsOptional()
    @IsBoolean()
    waitForEvent?: boolean;
}
