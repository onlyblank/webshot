import { BadGatewayException, Injectable } from '@nestjs/common';
import * as puppeteer from 'puppeteer';
import { ScreenshotOptions } from 'puppeteer';
import { TimeLimitExceededException } from './exceptions/time-limit-exceeded.exception';

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
                    () => reject(new TimeLimitExceededException(timeoutMS)),
                    timeoutMS
                );
            }) as Promise<never>,
        ]);
    }

    private async _openPage(url: string, waitForEvent?: string): Promise<Page> {
        const browser = await this.openBrowser();
        const page = await browser.newPage();
        try {
            await page.goto(url, {
                waitUntil: waitForEvent ? undefined : 'domcontentloaded',
                timeout: this.timoutMS,
            });
        } catch (err) {
            throw new BadGatewayException(err);
        }
        if (waitForEvent) {
            await page.evaluate(async event => {
                return new Promise(res => {
                    window.addEventListener(event, res);
                });
            }, waitForEvent);
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
            let style;
            try {
                style = await page.$eval(config.selector, (el: HTMLElement) => {
                    el.scrollIntoView();
                    const rect = el.getBoundingClientRect();
                    return {
                        x: rect.x,
                        y: rect.y,
                        width: rect.width,
                        height: rect.height,
                    };
                });
            } catch (err) {
                throw new BadGatewayException(
                    "Element wasn't found on specified selector."
                );
            }

            options.clip = style;
        } else {
            options.fullPage = true;
        }

        const buffer = (await page.screenshot(options)) as Buffer;
        page.browser().close();
        return buffer;
    }
}
