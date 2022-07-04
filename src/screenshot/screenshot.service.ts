import { Injectable } from '@nestjs/common';
import * as puppeteer from 'puppeteer';

type Browser = puppeteer.Browser;
type Page = puppeteer.Page;

@Injectable()
export class ScreenshotService {
    public async openBrowser(): Promise<Browser> {
        return puppeteer.launch({ args: ['--no-sandbox'] });
    }

    async openUrl(browser: Browser, url: string) {
        const page = await browser.newPage();
        await page.goto(url);
        return page;
    }

    async waitForReadyEvent(page: Page) {
        const eventName = 'screenshotReady';
        const timeoutMS = 5000;

        // Wait until page is ready or timout is reached.
        new Promise((resolve, reject) => {
            setTimeout(
                () => reject(`${timeoutMS}ms time limit exceeded.`),
                timeoutMS
            );
            page.evaluate(async () => {
                return new Promise(res => {
                    window.addEventListener(eventName, res);
                });
            }).then(() => resolve('Event fired'));
        });
    }
}