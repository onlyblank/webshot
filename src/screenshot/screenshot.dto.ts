import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class ScreenshotDto {
    @ApiProperty({
        example: 'https://yourserver.com/page/3',
        description: 'Page url to make screenshot. Should start with protocol',
    })
    @IsString()
    @IsNotEmpty()
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
            'Will wait for sepecified window event to raise before taking a screenshot.',
        example: 'DOMContentLoaded',
    })
    @IsOptional()
    @IsString()
    @IsNotEmpty()
    waitForEvent?: string;
}
