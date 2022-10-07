<template>
  <q-card>
    <q-card-section class="bg-grey-3">
      <div class="text-h6">{{ job.title }}</div>
      <div class="text-caption">{{ job.description }}</div>
    </q-card-section>
    <q-card-section class="bg-grey-3">
      <div class="text-body1">Status: {{ job.status }}</div>
    </q-card-section>
  </q-card>
</template>

<script setup lang="ts">
import {Job} from 'src/types/Job';

defineProps<{
  job: Job;
}>();
</script>

<style scoped>

</style>
