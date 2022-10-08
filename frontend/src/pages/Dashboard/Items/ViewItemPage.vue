<template>
  <q-page class="q-gutter-y-md">
    <q-breadcrumbs
      class="q-mb-md"
      :separator="`>`"
      :separator-class="`text-grey-8`"
      :label-class="`text-grey-8`"
      :active-class="`text-primary`"
    >
      <q-breadcrumbs-el  label="Items" class="cursor-pointer q-hoverable" @click="router.push({name: 'items'})" />
      <q-breadcrumbs-el :label="item.name" class="text-grey-7" />
    </q-breadcrumbs>
    <div class="row q-gutter-x-sm">
      <q-img
        class="q-responsive cursor-pointer q-hoverable"
        v-ripple
        :src="itemImage"
        style="width: 160px; height: 160px;"
        alt="{{item.name}}"
        @click="updateItemImage"
      >
        <q-btn
          class="absolute-bottom-right"
          flat
          text-color="white"
          icon="photo_camera"
        />
      </q-img>
      <div class="column" style="height: 170px">
        <div class="col-10">
          <div class="text-h6 wrap ellipsis-3-lines">{{item.name}}</div>
          <div class="text-subtitle1 text-grey-8 wrap ellipsis-2-lines">{{item.description}}</div>
          <q-btn
            class="absolute-top-right"
            style="margin-right: 20px; margin-top: 60px;"
            color="primary"
            icon="edit"
            @click="router.push({ name: 'editItem', params: { id: item.id }});"
          />
        </div>
        <div class="col-2">
          <div class="row q-gutter-x-xs self-end">
            <q-avatar size="xs" :class="getItemStatusColor(item.status)"></q-avatar>
            <div class="text-subtitle2">{{ item.status }}</div>
          </div>
        </div>
      </div>
    </div>
    <div class="row">
      <div class="column full-height full-width">
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
            <q-tab name="jobs" label="Jobs" />
            <q-tab name="comments" label="Comments" />
            <q-tab name="info" label="Info" />
          </q-tabs>
          <q-separator />
          <q-tab-panels v-model="tab" animated class="absolute fit">
            <q-tab-panel name="jobs">
              <div class="text-h6">Jobs</div>
              <q-btn
                color="primary"
                icon="add"
                @click="router.push({ name: 'createJob', params: { itemID: item.id }});"
              />
              <q-list class="q-gutter-md row">
                <JobComponent
                  v-for="job in jobs"
                  :key="job.id"
                  :job="job"
                />
              </q-list>
            </q-tab-panel>
            <q-tab-panel name="comments">
              <div class="text-h6">Comments</div>
              <CommentTable :object="item" :is-job="false" />
            </q-tab-panel>
            <q-tab-panel name="info">
              <div class="text-h6">Information</div>
              <InfoTable :id="item.id"/>
            </q-tab-panel>
          </q-tab-panels>
        </q-card>
      </div>
    </div>
  </q-page>
</template>

<script setup lang="ts">
import {Item, getItemStatusColor} from 'src/types/Item';
import {ref} from 'vue';
import {useItemsStore} from 'stores/items.store';
import {useJobsStore} from 'stores/jobs.store';
import {useRouter} from 'vue-router';
import InfoTable from '../../../components/Items/Info/InfoTable.vue';
import ImageDialog from 'components/ImageDialog.vue';
import {useQuasar} from 'quasar';
import JobComponent from 'components/Jobs/JobComponent.vue';
import CommentTable from 'components/CommentTable.vue';


const router = useRouter();
const $q = useQuasar();
const itemsStore = useItemsStore();

const props = defineProps<{
  id: string;
}>()

const item = ref<Item | undefined>(itemsStore.getItem(props.id));
const jobs = useJobsStore().getJobsForItem(props.id);
const tab = ref('jobs');
const itemImage = ref('');

itemsStore.getImageUrl(item.value?.id).then((url) => {
  itemImage.value = url;
}).catch(() => {
  itemImage.value = 'https://via.placeholder.com/150x150/cccccc/969696?text=PLACEHOLDER';
  Promise.resolve();
});

if (item.value === undefined) {
  useRouter().push({ name: '404'});
}

function updateItemImage() {
  $q.dialog({
    component: ImageDialog,
  }).onOk((payload) => {
    itemImage.value = payload.imageSrc;
    itemsStore.uploadImage(props.id, payload.imageBase64);
  });
}
</script>

<style scoped>

</style>
