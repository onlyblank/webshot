import { Injectable } from '@nestjs/common';
import * as puppeteer from 'puppeteer';

@Injectable()
export class TaskService {
    private static readonly FRONTEND_URL = 'https://setest.surge.sh';

    async render(taskId: number): Promise<Buffer> {
        const browser = await puppeteer.launch({ args: ['--no-sandbox'] });
        const page = await browser.newPage();
        await page.goto(TaskService.FRONTEND_URL + `/task/${taskId}`);

        // Wait until the task is rendered.
        await page.evaluate(async () => {
            return new Promise(res => {
                window.addEventListener('taskReady', res);
            });
        });

        // Get width and height of the task element.
        const style = await page.$eval('.task__wrapper', el => {
            const style = window.getComputedStyle(el);
            return {
                width: parseInt(style.getPropertyValue('width')),
                height: parseInt(style.getPropertyValue('height')),
            };
        });

        const buffer: Buffer = (await page.screenshot({
            type: 'png',
            clip: {
                x: 0,
                y: 0,
                ...style,
            },
            encoding: 'binary',
        })) as Buffer;

        await browser.close();

        return buffer;
    }
}
