import { Injectable } from '@nestjs/common';
import * as puppeteer from 'puppeteer';
import { ScreenshotOptions } from 'puppeteer';

type Browser = puppeteer.Browser;
type Page = puppeteer.Page;

interface ScreenshotConfig {
    selector?: string;
}

@Injectable()
export class ScreenshotService {
    private timoutMS = 5000;

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

    private async _openPage(url: string, waitForEvent?: string): Promise<Page> {
        const browser = await this.openBrowser();
        const page = await browser.newPage();
        await page.goto(url, {
            waitUntil: 'domcontentloaded',
            timeout: this.timoutMS,
        });
        if (waitForEvent) {
            await page.evaluate(async () => {
                return new Promise(res => {
                    window.addEventListener(waitForEvent, res);
                });
            });
        }
        return page;
    }

    public async openPage(url: string, waitForEvent?: string): Promise<Page> {
        return this.rejectOnTimeout(
            this._openPage(url, waitForEvent),
            this.timoutMS
        );
    }

    public async screenshot(page: Page, config?: ScreenshotConfig) {
        const options: ScreenshotOptions = {
            type: 'png',
            encoding: 'binary',
        };

        if (config && config.selector) {
            // Get width and height of selected element.
            const style = await page.$eval(
                config.selector,
                (el: HTMLElement) => {
                    el.scrollIntoView();
                    const rect = el.getBoundingClientRect();
                    return {
                        x: rect.x,
                        y: rect.y,
                        width: rect.width,
                        height: rect.height,
                    };
                }
            );

            options.clip = style;
        } else {
            options.fullPage = true;
        }

        // TODO: close browser.
        const buffer = (await page.screenshot(options)) as Buffer;
        return buffer;
    }
}
