import { Injectable } from '@nestjs/common';
import { Task } from './task.interface';
import * as fs from 'fs/promises';
import * as path from 'path';


const filePath = path.join(__dirname, '..', '..', 'tasks.json');

@Injectable()
export class TasksService {

    async getTasks(): Promise<Task[]>{
        const data = await fs.readFile(filePath, 'utf-8');
        return JSON.parse(data);
    }

    async getTaskById(id: number): Promise<Task | null> {
        const tasks = await this.getTasks();
        return tasks.find(task => task.id === id) || null;
    }
    async createTask(newTask: Task): Promise<Task> {
        const tasks = await this.getTasks();
        newTask.id = tasks.length ? Math.max(...tasks.map(task => task.id)) + 1 : 1;
        tasks.push(newTask);
        await fs.writeFile(filePath, JSON.stringify(tasks, null, 2));
        return newTask;
    }
    async updateTask(id: number, updatedTask: Partial<Task>): Promise<Task | null> {
        const tasks = await this.getTasks();
        const taskIndex = tasks.findIndex(task => task.id === id);
        if (taskIndex === -1) return null;
        tasks[taskIndex] = { ...tasks[taskIndex], ...updatedTask };
        await fs.writeFile(filePath, JSON.stringify(tasks, null, 2));
        return tasks[taskIndex];
    }
    async deleteTask(id: number): Promise<boolean> {
        const tasks = await this.getTasks();
        const taskIndex = tasks.findIndex(task => task.id === id);
        if (taskIndex === -1) return false;
        tasks.splice(taskIndex, 1);
        await fs.writeFile(filePath, JSON.stringify(tasks, null, 2));
        return true;
    }
    async deleteAllTasks(): Promise<boolean> {
        await fs.writeFile(filePath, JSON.stringify([], null, 2));
        return true;            
    }
}
