<script setup lang="ts">
const props = defineProps<{ error: { statusCode: number; message: string } }>();
const handle = () => clearError({ redirect: '/' });
</script>

<template>
  <div class="flex min-h-screen flex-col items-center justify-center gap-4 bg-ink-900 px-6 text-center text-ink-100">
    <h1 class="text-5xl font-bold text-white">{{ props.error.statusCode }}</h1>
    <p class="max-w-md text-ink-300">{{ props.error.message || 'Something went wrong.' }}</p>
    <button class="btn-primary" @click="handle">Back to home</button>
  </div>
</template>