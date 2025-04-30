import { Body, Controller, Delete, Get, NotFoundException, Param, Post, Put } from '@nestjs/common';
import { TasksService } from './tasks.service';
import { Task } from './task.interface';
@Controller('tasks')
export class TasksController {
    constructor(private readonly tasksService: TasksService) { }

    @Get()
    getAll() {
        return this.tasksService.getTasks();
    }

    @Get(':id')
    async getTaskById(@Param('id') id: string) {
        const task = await this.tasksService.getTaskById(+id);
        if (!task) throw new NotFoundException(`Task with id ${id} not found`);
        return task;
    }

    @Post()
    createTask(@Body() task: Task) {
        return this.tasksService.createTask(task);
    }

    @Put(':id')
    update(@Param('id') id: string, @Body() task: Partial<Task>) {
        return this.tasksService.updateTask(+id, task);
    }

    @Delete(':id')
    delete(@Param('id') id: string) {
        return this.tasksService.deleteTask(+id);
    }

}

