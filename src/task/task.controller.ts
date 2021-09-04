import {
  Controller,
  Param,
  ParseIntPipe,
  Post,
  UsePipes,
} from '@nestjs/common';
import { TaskService } from './task.service';
import { Res } from '@nestjs/common';
import { Response } from 'express';
import { Readable } from 'stream';

@Controller('task')
export class TaskController {
  constructor(private readonly taskService: TaskService) {}

  @Post(':id')
  @UsePipes(ParseIntPipe)
  async getTaskAsImage(@Param('id') id: number, @Res() res: Response) {
    const buffer = await this.taskService.render(id);

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
