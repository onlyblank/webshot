import {
    BadRequestException,
    Body,
    Controller,
    Post,
    Res,
    StreamableFile,
    UsePipes,
    ValidationPipe,
} from '@nestjs/common';
import { ScreenshotDto } from './screenshot.dto';
import { ScreenshotService } from './screenshot.service';
import { Page } from 'puppeteer';
import { Response } from 'express';
@Controller('screenshot')
export class ScreenshotController {
    constructor(private screenshotService: ScreenshotService) {}

    @Post()
    @UsePipes(ValidationPipe)
    async main(
        @Body() screenshotDto: ScreenshotDto,
        @Res({ passthrough: true }) res: Response
    ): Promise<StreamableFile> {
        let page: Page;
        try {
            page = await this.screenshotService.openPage(
                screenshotDto.url,
                screenshotDto.waitForEvent
            );
        } catch (err) {
            console.error(err);
            throw new BadRequestException(err);
        }

        const buffer = await this.screenshotService.screenshot(page, {
            selector: screenshotDto.clipSelector,
        });

        res.set({
            'Content-Type': 'image/png',
            'Content-Length': buffer.length,
        });
        return new StreamableFile(buffer);
    }
}
