<template>
  <header class="bg-gray-200 dark:bg-gray-900 flex justify-between items-center p-5">
    <h1 class="text-2xl font-header">Team Task Dashboard</h1>
    <div class="flex">
      <label class="relative flex justify-between items-center group p-2 text-l">
        Dark mode
        <input type="checkbox" v-model="isDark" @change="toggleTheme" class="absolute left-1/2 -translate-x-1/2 w-full h-full peer appearance-none rounded-md" />
        <span class="w-10 h-6 flex items-center flex-shrink-0 ml-2 p-1 bg-gray-300 rounded-full duration-300 ease-in-out peer-checked:bg-green-400 after:w-4 after:h-4 after:bg-white after:rounded-full after:shadow-md after:duration-300 peer-checked:after:translate-x-4 cursor-pointer"></span>
      </label>
    </div>
  </header>
</template>

<script lang="ts" setup>
  const theme = useState('theme', () => {
    const savedTheme = useCookie('theme').value;
    return savedTheme || 'light';
  })

  const isDark = ref(theme.value === 'dark');

  const toggleTheme = () => {
    theme.value = isDark.value ? 'dark' : 'light';
    useCookie('theme').value = theme.value;
  }

  useHead({
    htmlAttrs: {
      class: () => (theme.value === 'dark' ? 'dark' : ''),
    }
  });
</script>