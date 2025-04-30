import { Controller, Get, Post, Body, Param, Put, Delete } from '@nestjs/common';
import { TaskService } from './tasks.service';
import { CreateTaskDto } from './dto/create-task.dto';

@Controller('tasks')
export class TasksController {
    constructor(private readonly taskService: TaskService) { }

    @Get()
    getAll() {
        return this.taskService.getTasks();
    }

    @Get(':id')
    getOne(@Param('id') id: string) {
        return this.taskService.getTask(id);
    }

    @Post()
    create(@Body() dto: CreateTaskDto) {
        return this.taskService.createTask(dto);
    }

    @Put(':id')
    update(@Param('id') id: string, @Body() dto: CreateTaskDto) {
        return this.taskService.updateTask(id, dto);
    }

    @Delete(':id')
    delete(@Param('id') id: string) {
        return this.taskService.deleteTask(id);
    }
}
