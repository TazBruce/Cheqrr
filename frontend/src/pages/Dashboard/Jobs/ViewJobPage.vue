<template>
  <q-page class="row">
    <div class="col-12">
      <div class="row">
        <q-breadcrumbs
          class="q-mb-md"
          :separator="`>`"
          :separator-class="`text-grey-8`"
          :label-class="`text-grey-8`"
          :active-class="`text-primary`"
        >
          <q-breadcrumbs-el
            label="Items"
            class="cursor-pointer q-hoverable"
            @click="router.push({name: 'items'})"
          />
          <q-breadcrumbs-el
            :label="item.name"
            class="cursor-pointer q-hoverable"
            @click="router.push({name: 'viewItem', params: {id: item.id}})"
          />
          <q-breadcrumbs-el
            :label="job.title"
            class="text-grey-7"
          />
        </q-breadcrumbs>
      </div>
      <div class="row" style="padding-bottom: 15px">
        <div class="col-auto">
          <div style="width: 200px;">
            <q-carousel
              v-model="slide"
              thumbnails
              infinite
              swipeable
              animated
              :arrows="true"
              height="200px"
              style="{ width: 200px; padding-right: 10px;}"
            >
              <q-carousel-slide
                v-for="(image, index) in images"
                :key="index"
                :name="index"
                :img-src="image"
              />
              <template v-slot:control>
                <q-carousel-control
                  position="top-left"
                >
                  <q-btn
                    flat
                    text-color="white"
                    icon="photo_camera"
                    @click="addImage"
                  />
                </q-carousel-control>
                <q-carousel-control
                  position="top-right"
                >
                  <q-btn
                    flat
                    text-color="negative"
                    icon="delete"
                    @click="deleteImage"
                  />
                </q-carousel-control>
              </template>
            </q-carousel>
          </div>
        </div>
        <div class="col-5">
          <div class="column full-height justify-between">
            <div class="col-8">
              <div class="text-h6 wrap ellipsis">
                {{ job.title }}
              </div>
              <div class="text-subtitle1 text-grey-8 wrap ellipsis-3-lines">
                {{ job.description }}
              </div>
              <q-btn
                class="absolute-top-right"
                style="margin-right: 20px; margin-top: 60px;"
                color="primary"
                icon="edit"
                @click="editJob"
              />
            </div>
            <div class="col-2 text-subtitle2">
              <q-avatar size="xs" :class="getJobStatusColor(job.status)"></q-avatar>
              {{ job.status }}
            </div>
          </div>
        </div>
      </div>
      <div class="row">
        <q-card class="col-auto absolute fit">
          <q-tabs
            v-model="tab"
            dense
            align="justify"
            class="text-grey"
            active-color="primary"
            indicator-color="primary"
            narrow-indicator
          >
            <q-tab name="comments" label="Comments" />
          </q-tabs>
          <q-separator />
          <q-tab-panels v-model="tab" animated class="absolute fit">
            <q-tab-panel name="comments">
              Lorem ipsum dolor sit amet consectetur adipisicing elit.
            </q-tab-panel>
          </q-tab-panels>
        </q-card>
      </div>
    </div>
  </q-page>
</template>

<script setup lang="ts">
import {Job, getJobStatusColor} from 'src/types/Job';
import {Item} from 'src/types/Item';
import {ref} from 'vue';
import {useJobsStore} from 'stores/jobs.store';
import {useItemsStore} from 'stores/items.store';
import {useRouter} from 'vue-router';
import {useQuasar} from 'quasar';

const jobsStore = useJobsStore();
const itemsStore = useItemsStore();
const $q = useQuasar();
const router = useRouter();

const props = defineProps<{
  id: string;
}>();

const job = ref<Job | undefined>(jobsStore.getJob(props.id));
const item = ref<Item | undefined>(itemsStore.getItem(job.value?.item ?? ''));
const images = ref<string[]>([]);
const slide = ref<number>(0);
const tab = ref<string>('comments');

jobsStore.getJobImages(props.id).then((jobImages) => {
  images.value = jobImages
});

if (job.value === undefined) {
  router.push({ name: '404'});
}

/**
 * Navigate to the edit job page
 */
function editJob() {
  router.push({ name: 'editJob', params: { id: job.value?.id }});
}

/**
 * Adds a new image to the job
 */
function addImage() {
  $q.dialog({
    component: () => import('components/ImageDialog.vue'),
  }).onOk((image) => {
    //jobsStore.addJobImage(job.value?.id ?? '', image);
  });
}

/**
 * Deletes the current image from the job
 */
function deleteImage() {
  $q.dialog({
    title: 'Delete Image',
    message: 'Are you sure you want to delete this image?',
    ok: 'Yes',
    cancel: 'No',
  }).onOk(() => {
    //jobsStore.deleteJobImage(job.value?.id ?? '', images.value[slide.value]);
  });
}
</script>

<style scoped>

</style>
