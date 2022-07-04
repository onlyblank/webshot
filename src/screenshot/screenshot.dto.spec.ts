import { validate } from 'class-validator';
import { ScreenshotDto } from './screenshot.dto';

function expectToBeValid(value: any) {
    validate(value).then(errorArray => expect(errorArray).toHaveLength(0));
}

function expectToBeInvalid(value: any) {
    validate(value).then(errorArray => expect(errorArray).not.toHaveLength(0));
}

function makeScreenshotDto(source: any) {
    return Object.assign(new ScreenshotDto(), source);
}

describe('ScreenshotDto fields validation', () => {
    test('validating empty object', async () => {
        const value = makeScreenshotDto({});
        expectToBeInvalid(value);
    });

    test('object with url only', () => {
        const value = makeScreenshotDto({ url: 'someserver.com' });
        expectToBeValid(value);
    });

    test('object with all possible fields', () => {
        const value = makeScreenshotDto({
            url: 'someserver.com',
            clipSelector: '#root',
            waitForEvent: true,
        });
        expectToBeValid(value);
    });

    test('object with required fields and some excess fields', () => {
        const value = makeScreenshotDto({
            url: 'someserver.com',
            excess1: 'useless data',
            excess2: 123,
        });
        expectToBeValid(value);
    });

    it('should fail on empty url field', () => {
        const value = makeScreenshotDto({
            url: '',
        });
        expectToBeInvalid(value);
    });

    it('should fail if url is not a string', () => {
        const value = makeScreenshotDto({
            url: 123,
        });
        expectToBeInvalid(value);
    });

    it('should fail if clipSelector is not a string', () => {
        const value = makeScreenshotDto({
            clipSelector: 123,
        });
        expectToBeInvalid(value);
    });

    it('should fail if waitForEvent is not a boolean', () => {
        const value = makeScreenshotDto({
            clipSelector: 'string',
        });
        expectToBeInvalid(value);
    });

    it('should fail if waitForEvent is null', () => {
        const value = makeScreenshotDto({
            clipSelector: null,
        });
        expectToBeInvalid(value);
    });
});
