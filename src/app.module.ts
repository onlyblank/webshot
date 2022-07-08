import { Module } from '@nestjs/common';
import { ScreenshotModule } from './screenshot/screenshot.module';

@Module({
    imports: [ScreenshotModule],
})
export class AppModule {}
