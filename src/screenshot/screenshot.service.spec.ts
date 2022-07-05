import { TimeLimitExceededException } from './exceptions/time-limit-exceeded.exception';
import { ScreenshotService } from './screenshot.service';

describe('ScreenshotService', () => {
    let screenshotService: ScreenshotService;

    beforeAll(async () => {
        screenshotService = new ScreenshotService();
    });

    describe('rejectOnTimeout', () => {
        test('immediate function call', async () => {
            const promise = Promise.resolve(3);
            expect(await screenshotService.rejectOnTimeout(promise, 50)).toBe(
                3
            );
        });

        test('continous execution but within timeout', async () => {
            const promise = new Promise(res => setTimeout(() => res(4), 25));
            expect(await screenshotService.rejectOnTimeout(promise, 50)).toBe(
                4
            );
        });

        test('continous execution with exceeded timeout', async () => {
            const promise = new Promise(res => setTimeout(() => res(4), 50));

            await expect(
                screenshotService.rejectOnTimeout(promise, 25)
            ).rejects.toThrowError(TimeLimitExceededException);
        });
    });
});
