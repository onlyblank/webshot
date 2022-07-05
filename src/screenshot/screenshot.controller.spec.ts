import { Test } from '@nestjs/testing';
import { ScreenshotController } from './screenshot.controller';
import { ScreenshotService } from './screenshot.service';
import * as request from 'supertest';
import { INestApplication } from '@nestjs/common';

describe('ScreenshotService', () => {
    let app: INestApplication;

    beforeAll(async () => {
        const moduleRef = await Test.createTestingModule({
            controllers: [ScreenshotController],
            providers: [ScreenshotService],
        }).compile();

        app = moduleRef.createNestApplication();
        await app.init();
    });

    describe('POST /screenshot', () => {
        test('request with empty body', () => {
            return request(app.getHttpServer()).post('/screenshot').expect(400);
        });
    });
});
