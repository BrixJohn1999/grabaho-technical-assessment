<template>
  <div class="container">
    <h1>Task Manager</h1>
    <form @submit.prevent="submitTask">
      <input v-model="title" placeholder="Title" required />
      <input v-model="description" placeholder="Description" required />
      <button type="submit">Add Task</button>
    </form>

    <ul>
      <li v-for="task in tasks" :key="task.id">
        <input
          type="checkbox"
          v-model="task.completed"
          @change="toggleComplete(task)"
        />
        {{ task.title }} - {{ task.description }}
        <button @click="removeTask(task.id)">Delete</button>
      </li>
    </ul>
  </div>
</template>

<script setup>
import { ref, onMounted } from "vue";
import {
  getTasks,
  createTask,
  deleteTask,
  updateTask,
} from "../services/taskService";

const tasks = ref([]);
const title = ref("");
const description = ref("");

const loadTasks = async () => {
  tasks.value = await getTasks();
};

const submitTask = async () => {
  await createTask({
    title: title.value,
    description: description.value,
    completed: false,
  });
  title.value = "";
  description.value = "";
  await loadTasks();
};

const removeTask = async (id) => {
  await deleteTask(id);
  await loadTasks();
};

const toggleComplete = async (task) => {
  await updateTask(task.id, { completed: task.completed });
};

onMounted(loadTasks);
</script>

<style>
.container {
  max-width: 600px;
  margin: auto;
}
</style>
