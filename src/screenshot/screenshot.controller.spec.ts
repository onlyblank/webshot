import { Test } from '@nestjs/testing';
import { ScreenshotController } from './screenshot.controller';
import { ScreenshotService } from './screenshot.service';
import * as request from 'supertest';
import { INestApplication } from '@nestjs/common';
import * as path from 'path';
import * as fs from 'fs';

function saveScreenshot(name: string, buffer: Buffer) {
    const filepath = path.resolve(
        __dirname,
        `../../test/screenshots/${name}.png`
    );

    if (!fs.existsSync(filepath)) {
        fs.writeFileSync(filepath, buffer);
    }
}

function getScreenshot(name: string): Buffer {
    const filepath = path.resolve(
        __dirname,
        `../../test/screenshots/${name}.png`
    );
    return fs.readFileSync(filepath);
}

function areBuffersEqual(buffer1: Buffer, buffer2: Buffer): boolean {
    return buffer1.compare(buffer2) == 0;
}

function getHtmlPagePath(name: string): string {
    return path.resolve(__dirname, `../../test/pages/${name}.html`);
}

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

        test('red square in the top left corner', function (done) {
            request(app.getHttpServer())
                .post('/screenshot')
                .set('Content-Type', 'application/json')
                .send({
                    url: getHtmlPagePath('red-square-corner'),
                    clipSelector: '.square',
                })
                .expect(200)
                .expect('Content-Type', /image/)
                .then(res => {
                    const buffer = res.body;
                    //saveScreenshot("red-square", buffer);
                    if (areBuffersEqual(buffer, getScreenshot('red-square')))
                        done();
                    else throw 'Buffers are not equal';
                })
                .catch(err => done(err));
        });

        test('red square with the offsets on both coordinates', function (done) {
            request(app.getHttpServer())
                .post('/screenshot')
                .set('Content-Type', 'application/json')
                .send({
                    url: getHtmlPagePath('red-square-offsetted'),
                    clipSelector: '.square',
                })
                .expect(200)
                .expect('Content-Type', /image/)
                .then(res => {
                    const buffer = res.body;
                    //saveScreenshot("red-square", buffer);
                    if (areBuffersEqual(buffer, getScreenshot('red-square')))
                        done();
                    else throw 'Buffers are not equal';
                })
                .catch(err => done(err));
        });
    });
});
