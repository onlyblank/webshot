/// <reference types="node" />
import { RenderTaskDto } from './RenderTaskDto';
export declare class TaskService {
    render(task: RenderTaskDto): Promise<Buffer>;
}
