// A reference implementation of an API service that stores data in memory,
// and executes asynchronous CRUD operations on tasks and users.
// ---
//
// getUsers() : Promise{Array.<User>}
// getTasks() : Promise{Array.<Task>}
// updateTask(PartialTask) : Task
// createTask(NewTask) : Task
// deleteTask(id) : void
//
// <User> = { id, name, avatar }
// <Task> = { id, name, completed, assignedUserId }
// <PartialTask> = { id, [name], [completed], [assignedUserId] }
// <NewTask> = { name, [completed], [assignedUserId] }

export const TASK_FIXTURES = [
  { id: 1, name: "Write specifications", completed: true, assignedUserId: 1 },
  { id: 2, name: "Write client", completed: false, assignedUserId: null }
];

export const USER_FIXTURES = [
  {
    id: 1,
    name: "Alice",
    avatar: "https://cdn-icons-png.flaticon.com/512/1154/1154448.png"
  },
  {
    id: 2,
    name: "Bob",
    avatar: "https://cdn-icons-png.flaticon.com/512/1154/1154476.png"
  },
  {
    id: 3,
    name: "Charlie",
    avatar: "https://cdn-icons-png.flaticon.com/512/1154/1154466.png"
  },
  {
    id: 4,
    name: "Dora",
    avatar: "https://cdn-icons-png.flaticon.com/512/1154/1154442.png"
  }
];

let tasks = [...TASK_FIXTURES];
let users = [...USER_FIXTURES];

// CRUD Operations
// ---

export function getUsers() {
  return resolveLater([...users]);
}

export function getTasks() {
  return resolveLater([...tasks]);
}

export function createTask(task) {
  const newTask = { ...task, id: nextTaskId() };

  tasks.push(newTask);
  console.log({ tasks });

  return resolveLater(newTask);
}

export function updateTask(task) {
  const index = tasks.map((x) => x.id).indexOf(task.id);
  const oldTask = tasks[index];
  const updatedTask = { ...oldTask, ...task };

  tasks.splice(index, 1, updatedTask);

  return resolveLater(updatedTask);
}

export function deleteTask(id) {
  const index = tasks.map((x) => x.id).indexOf(id);

  tasks.splice(index, 1);

  return resolveLater();
}

// Helpers
// ---

function resolveLater(data) {
  return new Promise(function (resolve, reject) {
    window.setTimeout(function () {
      resolve(data);
    }, 0);
  });
}

function nextTaskId() {
  return tasks.map((x) => x.id).sort()[tasks.length - 1] + 1;
}
