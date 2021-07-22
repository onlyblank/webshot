"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.TaskController = void 0;
const common_1 = require("@nestjs/common");
const task_service_1 = require("./task.service");
const RenderTaskDto_1 = require("./RenderTaskDto");
const common_2 = require("@nestjs/common");
const common_3 = require("@nestjs/common");
const stream_1 = require("stream");
let TaskController = class TaskController {
    constructor(taskService) {
        this.taskService = taskService;
    }
    async getTaskAsImage(task, res) {
        const buffer = await this.taskService.render(task);
        res.set({
            'Content-Type': 'image/png',
            'Content-Length': buffer.length,
        });
        const stream = new stream_1.Readable();
        stream.push(buffer);
        stream.push(null);
        stream.pipe(res);
    }
};
__decorate([
    common_1.Get(),
    common_1.UsePipes(new common_2.ValidationPipe({ transform: true })),
    __param(0, common_1.Body()),
    __param(1, common_3.Res()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [RenderTaskDto_1.RenderTaskDto, Object]),
    __metadata("design:returntype", Promise)
], TaskController.prototype, "getTaskAsImage", null);
TaskController = __decorate([
    common_1.Controller('task'),
    __metadata("design:paramtypes", [task_service_1.TaskService])
], TaskController);
exports.TaskController = TaskController;
//# sourceMappingURL=task.controller.js.map