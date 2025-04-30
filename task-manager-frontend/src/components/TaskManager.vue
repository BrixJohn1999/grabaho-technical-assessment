<template>
  <div>
    <h1 class="text-xl font-bold mb-4">Task Manager</h1>
    <form @submit.prevent="handleSubmit" class="mb-4 space-y-2">
      <input
        v-model="form.taskName"
        placeholder="Task name"
        class="border p-2 w-full"
      />
      <input
        v-model="form.description"
        placeholder="Description"
        class="border p-2 w-full"
      />
      <button type="submit" class="bg-blue-500 text-white px-4 py-2">
        {{ form.id ? "Update" : "Create" }} Task
      </button>
    </form>

    <ul>
      <li v-for="task in tasks" :key="task.id" class="mb-2 border p-2">
        <strong>{{ task.taskName }}</strong>
        <p>{{ task.description }}</p>
        <small>{{ new Date(task.createdAt).toLocaleString() }}</small>
        <div class="mt-2 space-x-2">
          <button @click="editTask(task)" class="bg-yellow-400 px-2 py-1">
            Edit
          </button>
          <button
            @click="removeTask(task.id)"
            class="bg-red-500 text-white px-2 py-1"
          >
            Delete
          </button>
        </div>
      </li>
    </ul>
  </div>
</template>

<script setup>
import { ref, onMounted } from "vue";
import * as api from "../services/taskService";

const tasks = ref([]);
const form = ref({ taskName: "", description: "", id: null });

const loadTasks = async () => {
  const res = await api.getTasks();
  tasks.value = res.data;
};

const handleSubmit = async () => {
  if (form.value.id) {
    await api.updateTask(form.value.id, form.value);
  } else {
    await api.createTask(form.value);
  }
  form.value = { taskName: "", description: "", id: null };
  loadTasks();
};

const editTask = (task) => {
  form.value = { ...task };
};

const removeTask = async (id) => {
  await api.deleteTask(id);
  loadTasks();
};

onMounted(loadTasks);
</script>
