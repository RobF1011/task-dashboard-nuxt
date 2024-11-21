<template>
  <button 
    :class="computedClasses"
    @click="handleClick"
  >
    <slot />
  </button>
</template>

<script setup lang="ts">
  import type { ButtonProps } from '~/types/buttonProps';

  const { classes = '', onClick } = defineProps<ButtonProps>();

  const defaultClasses = 'flex items-center px-4 py-2 rounded text-white bg-blue-500 hover:bg-blue-600 transition';
  const computedClasses = computed(() => `${defaultClasses} ${classes}`);

  const handleClick = (event: MouseEvent) => {
    if (onClick) onClick(event);
  }
</script>