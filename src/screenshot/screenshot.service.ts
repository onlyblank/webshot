import { Injectable } from '@nestjs/common';
import * as puppeteer from 'puppeteer';

type Browser = puppeteer.Browser;
type Page = puppeteer.Page;

@Injectable()
export class ScreenshotService {
    private timoutMS = 5000;
    private eventName = 'screenshotReady';

    private async openBrowser(): Promise<Browser> {
        return puppeteer.launch({ args: ['--no-sandbox'] });
    }

    async rejectOnTimeout<R>(
        promise: Promise<R>,
        timeoutMS: number
    ): Promise<R> {
        return await Promise.race([
            promise,
            new Promise((_, reject) => {
                setTimeout(
                    () => reject(`${timeoutMS}ms time limit exceeded.`),
                    timeoutMS
                );
            }) as Promise<never>,
        ]);
    }

    private async _openPage(url: string, waitForEvent: boolean): Promise<Page> {
        const browser = await this.openBrowser();
        const page = await browser.newPage();
        await page.goto(url, {
            waitUntil: 'domcontentloaded',
            timeout: this.timoutMS,
        });
        if (waitForEvent) {
            await page.evaluate(async () => {
                return new Promise(res => {
                    window.addEventListener(this.eventName, res);
                });
            });
        }
        return page;
    }

    public async openPage(url: string, waitForEvent: boolean): Promise<Page> {
        return this.rejectOnTimeout(
            this._openPage(url, waitForEvent),
            this.timoutMS
        );
    }
}
