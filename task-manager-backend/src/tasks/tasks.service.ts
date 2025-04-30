import { Injectable } from '@nestjs/common';
import { Task } from './task.interface';
import { CreateTaskDto } from './dto/create-task.dto';
import { v4 as uuidv4 } from 'uuid';
import * as fs from 'fs-extra';
import { join } from 'path';


const TASKS_FILE = join(process.cwd(), 'tasks.json');

@Injectable()
export class TaskService {
    private async ensureFileExists(): Promise<void> {
        const exists = await fs.pathExists(TASKS_FILE);
        if (!exists) {
            await fs.writeJson(TASKS_FILE, []);
        }
    }
    async getTasks(): Promise<Task[]> {
        await this.ensureFileExists();
        return await fs.readJson(TASKS_FILE);
    }

    async getTask(id: string): Promise<Task> {
        const tasks = await this.getTasks();
        const task = tasks.find(task => task.id === id);
        if (!task) {
            throw new Error(`Task with id ${id} not found`);
        }
        return task;
    }

    async createTask(dto: CreateTaskDto): Promise<Task> {
        const tasks = await this.getTasks();
        const newTask: Task = {
            id: uuidv4(),
            taskName: dto.taskName,
            description: dto.description,
            createdAt: new Date().toISOString(),
        };
        tasks.push(newTask);
        await fs.writeJson(TASKS_FILE, tasks, { spaces: 2 });
        return newTask;
    }

    async updateTask(id: string, dto: CreateTaskDto): Promise<Task> {
        const tasks = await this.getTasks();
        const index = tasks.findIndex(task => task.id === id);
        if (index !== -1) {
            tasks[index] = { ...tasks[index], ...dto };
            await fs.writeJson(TASKS_FILE, tasks, { spaces: 2 });
            return tasks[index];
        }
        throw new Error(`Task with id ${id} not found`);
    }

    async deleteTask(id: string): Promise<boolean> {
        let tasks = await this.getTasks();
        const initialLength = tasks.length;
        tasks = tasks.filter(task => task.id !== id);
        await fs.writeJson(TASKS_FILE, tasks, { spaces: 2 });
        return tasks.length !== initialLength;
    }
}
