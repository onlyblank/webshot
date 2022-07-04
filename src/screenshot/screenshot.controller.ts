import { Controller, Post } from '@nestjs/common';

@Controller('screenshot')
export class ScreenshotController {
    @Post()
    async main() {
        return 'response';
    }
}
