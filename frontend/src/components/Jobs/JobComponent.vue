<template>
  <q-card class="bg-grey-3">
    <q-card-section>
      <div class="text-h6">{{ job.title }}</div>
      <div class="text-caption">{{ job.description }}</div>
    </q-card-section>
    <q-card-section :class="getJobStatusColor(job.status)">
      <div class="text-body1 text-white">Status: {{ job.status }}</div>
    </q-card-section>
  </q-card>
</template>

<script setup lang="ts">
import {Job, getJobStatusColor} from 'src/types/Job';

defineProps<{
  job: Job;
}>();
</script>

<style scoped>

</style>
