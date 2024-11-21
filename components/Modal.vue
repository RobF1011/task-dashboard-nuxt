<template>
  <dialog
    ref="modal"
    class="w-4/5 max-w-xl p-6 rounded-lg bg-white dark:bg-gray-800 shadow-lg border dark:border-gray-700"
  >
    <div class="modal-header flex justify-between items-center mb-4">
      <h2 class="text-lg font-semibold text-gray-900 dark:text-gray-100">
        {{ title }}
      </h2>
      <button
        type="button"
        class="text-gray-500 hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-200"
        @click="closeModal"
      >
        <Icon name="ic:twotone-close" size="26"/>
      </button>
    </div>
    <div class="modal-body text-gray-800 dark:text-gray-300">
      <slot></slot>
    </div>
    <div class="modal-footer mt-6 flex justify-end">
      <Button
        @click="buttonFunction"
      >
        {{ buttonText }}
      </Button>
    </div>
  </dialog>
</template>

<script setup lang="ts">
  import type { ModalProps } from '~/types/modalProps';

  defineProps<ModalProps>();

  const modal = ref<HTMLDialogElement | null>(null);

  const openModal = () => {
    modal.value?.showModal();
  };

  const closeModal = () => {
    modal.value?.close();
  };

  defineExpose({
    openModal,
    closeModal,
  });
</script>

<style scoped>
  dialog::backdrop {
    background-color: rgba(0, 0, 0, 0.6);
  }
</style>