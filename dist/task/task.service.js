"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.TaskService = void 0;
const common_1 = require("@nestjs/common");
const puppeteer = require("puppeteer");
const path = require("path");
const index_html_1 = require("./assets/index.html");
const style_css_1 = require("./assets/style.css");
let TaskService = class TaskService {
    async render(task) {
        const browser = await puppeteer.launch();
        const page = await browser.newPage();
        await page.$eval('body', (body, html) => {
            const container = document.createElement('div');
            container.innerHTML = html;
            const content = container.children[0];
            body.appendChild(content);
        }, index_html_1.default);
        await page.addScriptTag({
            path: path.resolve(__dirname, '../../node_modules/codemirror/lib/codemirror.js'),
        });
        await page.addStyleTag({
            path: path.resolve(__dirname, '../../node_modules/codemirror/lib/codemirror.css'),
        });
        await page.addStyleTag({
            path: path.resolve(__dirname, '../../node_modules/codemirror/theme/dracula.css'),
        });
        await page.addScriptTag({
            path: path.resolve(__dirname, '../../node_modules/codemirror/mode/clike/clike.js'),
        });
        await page.addStyleTag({ content: style_css_1.default });
        await page.evaluate((_task) => {
            task = _task;
            document.querySelector('.task__question').textContent = task.question;
            document.querySelector('.task__annotation').textContent = task.annotation;
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
        }, task);
        const style = await page.$eval('.task', (el) => {
            const style = window.getComputedStyle(el);
            return {
                width: parseInt(style.getPropertyValue('width')),
                height: parseInt(style.getPropertyValue('height')),
            };
        });
        const buffer = (await page.screenshot({
            type: 'png',
            clip: Object.assign({ x: 0, y: 0 }, style),
            encoding: 'binary',
        }));
        await browser.close();
        return buffer;
    }
};
TaskService = __decorate([
    common_1.Injectable()
], TaskService);
exports.TaskService = TaskService;
function CodeMirror(wrapper, arg1) {
    throw new Error('Function not implemented.');
}
//# sourceMappingURL=task.service.js.map