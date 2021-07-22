import { Injectable } from '@nestjs/common';
import { RenderTaskDto } from './RenderTaskDto';
import * as puppeteer from 'puppeteer';
import * as path from 'path';

// Task page assets.
import html from './assets/index.html';
import css from './assets/style.css';

@Injectable()
export class TaskService {
  async render(task: RenderTaskDto): Promise<Buffer> {
    const browser = await puppeteer.launch({ args: ['--no-sandbox'] });
    const page = await browser.newPage();

    // Add html template.
    await page.$eval(
      'body',
      (body, html: string) => {
        const container = document.createElement('div');
        container.innerHTML = html;
        const content = container.children[0];
        body.appendChild(content);
      },
      html,
    );

    // Add CodeMirror.
    await page.addScriptTag({
      path: path.resolve(
        __dirname,
        '../../node_modules/codemirror/lib/codemirror.js',
      ),
    });

    await page.addStyleTag({
      path: path.resolve(
        __dirname,
        '../../node_modules/codemirror/lib/codemirror.css',
      ),
    });
    await page.addStyleTag({
      path: path.resolve(
        __dirname,
        '../../node_modules/codemirror/theme/dracula.css',
      ),
    });

    await page.addScriptTag({
      path: path.resolve(
        __dirname,
        '../../node_modules/codemirror/mode/clike/clike.js',
      ),
    });

    // Add css.
    await page.addStyleTag({ content: css });

    // Fill task with provided data.
    await page.evaluate((_task) => {
      task = _task as unknown as RenderTaskDto;
      document.querySelector('.task__question').textContent = task.question;
      document.querySelector('.task__annotation').textContent = task.annotation;

      if (task.code !== null) {
        const wrapper = document.querySelector('.task__code-wrapper');

        CodeMirror(wrapper, {
          lineNumbers: true,
          mode: 'text/x-csharp',
          theme: 'dracula',
          lineWrapping: true,
          scrollbarStyle: 'null',
          viewportMargin: Infinity,
          value: task.code,
        });
      }
    }, task as unknown as puppeteer.JSONObject);

    // Get width and height of the task element.
    const style = await page.$eval('.task', (el) => {
      const style = window.getComputedStyle(el);
      return {
        width: parseInt(style.getPropertyValue('width')),
        height: parseInt(style.getPropertyValue('height')),
      };
    });

    const buffer: Buffer = (await page.screenshot({
      type: 'png',
      clip: {
        x: 0,
        y: 0,
        ...style,
      },
      encoding: 'binary',
    })) as Buffer;

    await browser.close();

    return buffer;
  }
}

function CodeMirror(
  wrapper: Element,
  arg1: {
    lineNumbers: boolean;
    mode: string;
    theme: string;
    lineWrapping: boolean;
    scrollbarStyle: string;
    viewportMargin: number;
    value: string;
  },
) {
  throw new Error('Function not implemented.');
}
