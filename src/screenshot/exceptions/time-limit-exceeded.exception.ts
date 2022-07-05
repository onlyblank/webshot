import { RequestTimeoutException } from '@nestjs/common';

export class TimeLimitExceededException extends RequestTimeoutException {
    constructor(timoutMS: number) {
        super(`Process has exceeded ${timoutMS}ms limit.`);
    }
}
