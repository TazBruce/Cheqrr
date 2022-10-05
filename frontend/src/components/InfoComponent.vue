<template>
  <q-page>
    <div class="text-subtitle2">{{info}}</div>
    <div class="text-body2">{{value}}</div>
  </q-page>
</template>

<script setup lang="ts">
defineProps<{
  info: string;
  value: string | boolean | number | Date;
}>();
</script>

<style scoped>

</style>
