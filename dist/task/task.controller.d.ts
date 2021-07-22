import { TaskService } from './task.service';
import { RenderTaskDto } from './RenderTaskDto';
import { Response } from 'express';
export declare class TaskController {
    private readonly taskService;
    constructor(taskService: TaskService);
    getTaskAsImage(task: RenderTaskDto, res: Response): Promise<void>;
}
