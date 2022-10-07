<template>
  <q-card class="bg-grey-3 column" style="width: 200px; height: 250px;">
    <q-card-section class="col-10">
      <div class="text-h6">{{ job.title }}</div>
      <div class="text-caption">{{ job.description }}</div>
    </q-card-section>
    <q-card-section class="col" :class="getJobStatusColor(job.status)">
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
