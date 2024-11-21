<template>
  <div class="flex justify-end mb-6">
    <Button 
      @click="openNewTaskModal"
    >
      <Icon class="mr-2" size="20" name="ic:baseline-add-circle-outline"/> New Task
    </Button>
    <Modal
      ref="modalRef"
      title="Add New Task"
      buttonText="Add"
      :buttonFunction="confirmNewTask"
    >
      <div class="flex items-center justify-end">
        <label for="task-name" class="mr-4 text-md font-medium text-gray-900 dark:text-gray-200">
          Title
        </label>
        <input
          ref="firstInput"
          name="task-name"
          id="task-name"
          type="text"
          placeholder="Add Task Name"
          class="w-4/5 px-3 py-2 border rounded-lg dark:bg-gray-800 border-gray-300 dark:border-gray-600"
          v-model="newTaskName"
        />
      </div>
      <div class="flex items-start justify-end mt-4">
        <label for="task-description" class="mr-4 text-md font-medium text-gray-900 dark:text-gray-200">
          Description
        </label>
        <textarea
          name="task-description"
          id="task-description"
          placeholder="Add description"
          class="w-4/5 px-3 py-2 border rounded-lg dark:bg-gray-800 border-gray-300 dark:border-gray-600"
          v-model="newTaskDescription"
        ></textarea>
      </div>
      <div class="flex items-center justify-end mt-4">
        <label for="task-assignee" class="mr-4 text-md font-medium text-gray-900 dark:text-gray-200">
          Assignee
        </label>
        <select 
          name="task-assignee"
          id="task-assignee"
          v-model="newTaskAssignee"
          class="w-4/5 px-4 py-2 border rounded-lg shadow-sm bg-white text-black dark:bg-gray-800 dark:text-white border-gray-300 dark:border-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
        >
          <option value="" disabled>Select an assignee</option>
          <option v-for="assignee in assignees" :key="assignee" :value="assignee">{{ assignee }}</option>
        </select>
      </div>
      <div class="flex items-center justify-end mt-4">
        <label for="task-priority" class="mr-4 text-md font-medium text-gray-900 dark:text-gray-200">
          Priority
        </label>
        <select 
          name="task-priority"
          id="task-priority"
          v-model="newTaskPriority"
          class="w-4/5 px-4 py-2 border rounded-lg shadow-sm bg-white text-black dark:bg-gray-800 dark:text-white border-gray-300 dark:border-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
        >
          <option value="High">High</option>
          <option value="Medium">Medium</option>
          <option value="Low">Low</option>
        </select>
      </div>
    </Modal>
  </div>
  <div class="dashboard grid grid-cols-1 md:grid-cols-3 gap-4 min-h-screen">
    <div
      v-for="(tasks, status) in columns"
      :key="status"
      :class="['column rounded-lg shadow-md p-4', draggingOverColumn === status ? 'bg-blue-200 dark:bg-blue-800' : 'bg-gray-200 dark:bg-gray-800']"
      @dragover.prevent="onDragOver"
      @dragenter="onDragEnter(status)"
      @dragleave="(event) => onDragLeave(event, status)"
      @drop="onDropCustom(status)"
    >
      <h2 class="text-xl font-bold text-gray-900 dark:text-gray-100 mb-4 text-center">
        {{ status }}
      </h2>
      <div class="task-list space-y-4">
        <TaskCard
          v-for="task in tasks"
          :key="task.id"
          v-bind="task"
          @dragstart="onDragStart(task.id)"
          draggable="true"
        />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
  import type { Task } from '~/types/task';
  import Modal from '~/components/Modal.vue';

  const tasksStore = useTasksStore();
  await useAsyncData('tasks', () => tasksStore.fetchTasks().then(() => true));

  // Get all assignees for select dropdown
  const assignees = tasksStore.getAllAssignees;

  // Filter tasks by columns, sort by priority 
  const columns = computed(() => {
    const priorityMap = { High: 1, Medium: 2, Low: 3 };

    return {
      'To do': tasksStore.tasks
        ?.filter((task) => task.status === 'To do')
        .sort((a, b) => priorityMap[a.priority] - priorityMap[b.priority]) || [],
      'In progress': tasksStore.tasks
        ?.filter((task) => task.status === 'In progress')
        .sort((a, b) => priorityMap[a.priority] - priorityMap[b.priority]) || [],
      Completed: tasksStore.tasks
        ?.filter((task) => task.status === 'Completed')
        .sort((a, b) => priorityMap[a.priority] - priorityMap[b.priority]) || [],
    };
  });

  // For drag and drop functionality
  const { onDragStart, onDragOver, onDrop } = useDragAndDrop(tasksStore.tasks);

  const draggingOverColumn = ref<string | null>(null);

  const onDragEnter = (status: string) => {
    draggingOverColumn.value = status;
  };

  const onDragLeave = (event: DragEvent, status: string) => {
    const target = event.target as HTMLElement;
    if (target?.classList.contains('column') && draggingOverColumn.value === status) {
      draggingOverColumn.value = null;
    }
  };

  const onDropCustom = (status: string) => {
    draggingOverColumn.value = null;
    onDrop(status);
  }

  // New task
  const newTaskName = ref('');
  const newTaskDescription = ref('');
  const newTaskAssignee = ref('');
  const newTaskPriority = ref('High');

  const modalRef = ref<InstanceType<typeof Modal> | null>(null);
  const firstInput = ref<HTMLInputElement | null>(null);

  const openNewTaskModal = () => {
    modalRef.value?.openModal();
    firstInput.value?.focus();
  }

  const confirmNewTask = () => {
    if (!newTaskName.value || !newTaskDescription.value || !newTaskAssignee.value || !newTaskPriority.value) {
      alert('Please fill out all fields');
      return;
    }

    const newTask = {
      name: newTaskName.value,
      description: newTaskDescription.value,
      assignee: newTaskAssignee.value,
      priority: newTaskPriority.value as Task['priority'],
      status: 'To do' as const
    }
    tasksStore.addTask(newTask);
    modalRef.value?.closeModal();
  }
</script>