<template>
  <q-card
    class="column cursor-pointer q-hoverable text-left"
    style="width: 200px; height: 250px;"
    @click="viewJob"
    v-ripple
  >
    <q-card-section class="col-10 bg-grey-3">
      <div class="text-h6">{{ job.title }}</div>
      <div class="text-caption">{{ job.description }}</div>
    </q-card-section>
    <q-card-section class="col" :class="getJobStatusColor(job.status)">
      <div class="text-body1 text-white">Status: {{ job.status }}</div>
    </q-card-section>
    <span class="q-focus-helper"></span>
  </q-card>
</template>

<script setup lang="ts">
import {Job, getJobStatusColor} from 'src/types/Job';
import {useRouter} from 'vue-router';

const props = defineProps<{
  job: Job;
}>();

const router = useRouter();

function viewJob() {
  router.push({ name: 'viewJob', params: { id: props.job.id }});
}
</script>

<style scoped>

</style>
