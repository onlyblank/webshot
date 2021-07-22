import { Body, Controller, Get, Header, Post, UsePipes } from '@nestjs/common';
import { TaskService } from './task.service';
import { RenderTaskDto } from './RenderTaskDto';
import { ValidationPipe } from '@nestjs/common';
import { Res } from '@nestjs/common';
import { Response } from 'express';
import { Readable } from 'stream';

@Controller('task')
export class TaskController {
  constructor(private readonly taskService: TaskService) {}

  @Post()
  @UsePipes(new ValidationPipe({ transform: true }))
  async getTaskAsImage(@Body() task: RenderTaskDto, @Res() res: Response) {
    const buffer = await this.taskService.render(task);

    res.set({
      'Content-Type': 'image/png',
      'Content-Length': buffer.length,
    });

    const stream = new Readable();
    stream.push(buffer);
    stream.push(null);

    stream.pipe(res);
  }
}
