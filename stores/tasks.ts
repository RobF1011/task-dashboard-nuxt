import type { Task } from '~/types/task';

export const useTasksStore = defineStore('tasks', () => {
  // State
  const tasks = ref<Task[]>([]);

  // Getters
  const getAllAssignees = computed(() => {
    const allAssignees = tasks.value.map((task) => task.assignee);
    return Array.from(new Set(allAssignees));
  });

  // Actions
  const setTasks = (newTasks: Task[]) => {
    tasks.value = newTasks;
  };

  const updateTaskStatus = (taskId: number, newStatus: Task['status']) => {
    const task = tasks.value.find((t) => t.id === taskId);
    if (task) {
      task.status = newStatus;
    }
  };

  const editTask = (taskId: number, updates: Partial<Task>) => {
    const task = tasks.value.find((t) => t.id === taskId);
    if (task) {
      Object.assign(task, updates)
    }
  }
  
  const deleteTask = (taskId: number) => {
    tasks.value = tasks.value.filter((task) => task.id !== taskId);
  }

  const addTask = (newTask: Omit<Task, 'id'>) => {
    const highestId = tasks.value.reduce((max, task) => Math.max(max, task.id), 0);
    const taskWithId: Task = { id: highestId + 1, ...newTask };
    tasks.value.unshift(taskWithId);
  }

  const fetchTasks = async () => {
    try {
      const { data } = await useFetch<Task[]>('/api/tasks');
      if (data.value) {
        tasks.value = data.value;
      }
    } catch (error) {
      console.error('Failed to load tasks:', error);
    }
  };

  return {
    tasks,
    getAllAssignees,
    setTasks,
    addTask,
    updateTaskStatus,
    editTask,
    deleteTask,
    fetchTasks,
  };
});