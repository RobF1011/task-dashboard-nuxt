<template>
  <div class="task-card p-4 bg-white dark:bg-gray-950 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300">
    <div class="flex items-center w-full justify-between mb-4">
      <h3 class="font-header text-lg font-semibold text-gray-900 dark:text-gray-100">{{ name }}</h3>
      <Icon class="cursor-pointer hover:text-red-500" @click="deleteTask" name="ic:baseline-delete-forever" size="26"/>
    </div>
    <p class="text-sm text-gray-600 dark:text-gray-300 mb-4">{{ description }}</p>
    <div class="flex justify-between items-center mb-8">
      <p class="text-sm text-gray-800 dark:text-gray-200">
        <strong>Assignee:</strong> {{ assignee }}
      </p>
      <p class="text-sm">
        <strong>Priority: </strong>
        <span :class="priorityClass">{{ priority }}</span>
      </p>
    </div>
    <div class="flex justify-between items-center">
      <Button @click="openEditModal">Edit</Button>
      <Modal
        ref="modalRef"
        title="Edit Task"
        buttonText="Update"
        :buttonFunction="confirmUpdate"
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
            class="w-4/5 px-3 py-2 border rounded-lg dark:bg-gray-800 border-gray-300 dark:border-gray-600"
            v-model="nameVal"
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
            v-model="descriptionVal"
          ></textarea>
        </div>
        <div class="flex items-center justify-end mt-4">
          <label for="task-assignee" class="mr-4 text-md font-medium text-gray-900 dark:text-gray-200">
            Assignee
          </label>
          <select 
            name="task-assignee"
            id="task-assignee"
            v-model="assigneeVal"
            class="w-4/5 px-4 py-2 border rounded-lg shadow-sm bg-white text-black dark:bg-gray-800 dark:text-white border-gray-300 dark:border-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          >
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
            v-model="priorityVal"
            class="w-4/5 px-4 py-2 border rounded-lg shadow-sm bg-white text-black dark:bg-gray-800 dark:text-white border-gray-300 dark:border-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          >
            <option value="High">High</option>
            <option value="Medium">Medium</option>
            <option value="Low">Low</option>
          </select>
        </div>
      </Modal>
      <select 
        v-model="statusVal"
        @change="updateStatus"
        class="px-4 py-2 border rounded-lg shadow-sm bg-white text-black dark:bg-gray-800 dark:text-white border-gray-300 dark:border-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
      >
        <option value="To do">To do</option>
        <option value="In progress">In progress</option>
        <option value="Completed">Completed</option>
      </select>
    </div>
  </div>
</template>

<script setup lang="ts">
  import type { Task } from '~/types/task';
  import Modal from '~/components/Modal.vue';

  const tasksStore = useTasksStore();
  const { id, name, description, assignee, priority, status } = defineProps<Task>();

  const assignees = tasksStore.getAllAssignees;

  const statusVal = ref(status);
  const nameVal = ref(name);
  const descriptionVal = ref(description);
  const assigneeVal = ref(assignee);
  const priorityVal = ref(priority);

  const priorityClass = computed(() => {
    const baseClasses = 'p-2 text-white rounded-xl';
    const priorityColors = {
      High: 'bg-red-600',
      Medium: 'bg-yellow-600',
      Low: 'bg-green-600',
    };
    return `${baseClasses} ${priorityColors[priority] || 'bg-gray-600'}`;
  });

  const updateStatus = () => {
    tasksStore.updateTaskStatus(id, statusVal.value);
  };

  const modalRef = ref<InstanceType<typeof Modal> | null>(null);
  const firstInput = ref<HTMLInputElement | null>(null);

  const openEditModal = () => {
    modalRef.value?.openModal();
    firstInput.value?.focus();
  }

  const confirmUpdate = () => {
    const updates = {
      name: nameVal.value,
      description: descriptionVal.value,
      assignee: assigneeVal.value,
      priority: priorityVal.value
    }
    tasksStore.editTask(id, updates);
    modalRef.value?.closeModal();
  }

  const deleteTask = () => {
    tasksStore.deleteTask(id);
  }
</script>