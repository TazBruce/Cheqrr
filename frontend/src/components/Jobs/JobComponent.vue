<template>
  <q-card
    class="column cursor-pointer q-hoverable text-left"
    style="width: 200px; height: 180px;"
    @click="viewJob"
    v-ripple
  >
    <q-card-section class="col-8 bg-grey-3">
      <div class="text-h6">{{ job.title }}</div>
      <div class="text-caption">{{ job.description }}</div>
      <div class="text-bold">{{ item.name }}</div>
    </q-card-section>
    <q-card-section class="col-4" :class="getJobStatusColor(job.status)">
      <div class="text-body1 text-white">Status: {{ job.status }}</div>
    </q-card-section>
    <span class="q-focus-helper"></span>
  </q-card>
</template>

<script setup lang="ts">
import {Job, getJobStatusColor} from 'src/types/Job';
import {Item} from 'src/types/Item';
import {ref} from 'vue';
import {useRouter} from 'vue-router';
import {useItemsStore} from 'stores/items.store';

const props = defineProps<{
  job: Job;
}>();

const router = useRouter();
const itemsStore = useItemsStore();

const item = ref<Item | undefined>(itemsStore.getItem(props.job.item));

function viewJob() {
  router.push({ name: 'viewJob', params: { id: props.job.id }});
}
</script>

<style scoped>

</style>
