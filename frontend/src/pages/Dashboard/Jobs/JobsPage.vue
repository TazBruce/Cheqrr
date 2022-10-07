<template>
  <q-page>
    <h1 class="text-h5">Jobs</h1>
    <q-list class="q-gutter-md row">
      <JobComponent
        v-for="job in jobs"
        :key="job.id"
        :job="job"
      />
    </q-list>
  </q-page>
</template>

<script setup>
import JobComponent from '../../../components/Jobs/JobComponent.vue';
import { useJobsStore } from '../../../stores/jobs.store';

const { jobs } = useJobsStore();
</script>

<style scoped>

</style>
