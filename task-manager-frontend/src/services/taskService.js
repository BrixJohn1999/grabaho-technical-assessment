const API = "http://localhost:3000/tasks";

export async function getTasks() {
  return fetch(API).then((res) => res.json());
}

export async function getTask(id) {
  return fetch(`${API}/${id}`).then((res) => res.json());
}

export async function createTask(task) {
  return fetch(API, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(task),
  }).then((res) => res.json());
}

export async function updateTask(id, updates) {
  return fetch(`${API}/${id}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(updates),
  }).then((res) => res.json());
}

export async function deleteTask(id) {
  return fetch(`${API}/${id}`, { method: "DELETE" });
}
