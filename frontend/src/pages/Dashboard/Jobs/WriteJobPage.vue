<template>
  <q-page class="q-gutter-y-md">
    <q-breadcrumbs
      class="q-mb-md"
      :separator="`>`"
      :separator-class="`text-grey-8`"
      :label-class="`text-grey-8`"
      :active-class="`text-primary`"
    >
      <q-breadcrumbs-el  label="Jobs" class="cursor-pointer q-hoverable" @click="router.push('/dashboard/jobs')" />
      <q-breadcrumbs-el :label="job.title" class="cursor-pointer q-hoverable" @click="router.go(-1)" />
      <q-breadcrumbs-el :label="title" class="text-grey-7" />
    </q-breadcrumbs>
    <h1 class="text-h5">{{title}}</h1>
    <q-btn
      class="absolute-top-right"
      :class="{hidden: !editMode}"
      style="margin-right: 20px; margin-top: 60px;"
      color="negative"
      icon="delete"
      @click="deleteJob"
    />
    <q-form @submit="onSubmit" class="column q-gutter-y-sm">
      <q-input
        v-model="job.title"
        label="Title"
        filled
        lazy-rules
        :disable="loading"
        :rules="[val => val.length > 0 || 'Title is required',
                 val => val.length <= 25 || 'Title must be less than 25 characters']"
      />
      <q-input
        v-model="job.description"
        label="Description"
        filled
        lazy-rules
        :disable="loading"
        :rules="[val => val.length > 0 || 'Description is required',
                 val => val.length <= 100 || 'Description must be less than 100 characters']"
      />
      <q-select
        v-model="job.status"
        label="Status"
        filled
        :options="statusOptions"
        :disable="loading"
      />
      <q-btn
        color="primary"
        label="Submit"
        type="submit"
        :disable="loading"
      />
    </q-form>
  </q-page>
</template>

<script setup lang="ts">
import {useJobsStore} from 'stores/jobs.store';
import {useRouter} from 'vue-router';
import {ref} from 'vue';
import {Job, JobStatus, JobType} from 'src/types/Job';

const jobsStore = useJobsStore();
const router = useRouter();

const props = defineProps<{
  id?: string;
  itemID: string;
}>();

const job = ref<Job | undefined>(undefined);
const title = ref<string>('Create Job');
const editMode = ref<boolean>(false);
const loading = ref<boolean>(false);

const statusOptions = [
  JobStatus.Open,
  JobStatus.Completed,
  JobStatus.InProgress
];

if (props.id) {
  const newJob = jobsStore.getJob(props.id);
  if (newJob) {
    job.value = newJob;
    title.value = 'Edit Job';
    editMode.value = true;
  } else {
    router.push({ name: '404'});
  }
} else {
  job.value = {
    id: '',
    item: props.itemID,
    title: '',
    description: '',
    status: JobStatus.Open,
    comments: [],
    jobType: JobType.Issue,
  };
}

/**
 * Submits a job
 */
async function onSubmit() {
  loading.value = true;
  const jobID = await jobsStore.updateJob(job.value);
  await router.push({name: 'viewJob', params: {id: jobID}});
  loading.value = false;
}

/**
 * Deletes the current job
 */
async function deleteJob() {
  await jobsStore.deleteJob(props.id);
  await router.push({name: 'jobs'});
}

</script>

<style scoped>

</style>
