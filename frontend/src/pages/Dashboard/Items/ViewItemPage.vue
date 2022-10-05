<template>
  <q-page class="q-gutter-y-md">
    <q-breadcrumbs
      class="q-mb-md"
      :separator="`>`"
      :separator-class="`text-grey-8`"
      :label-class="`text-grey-8`"
      :active-class="`text-primary`"
    >
      <q-breadcrumbs-el  label="Items" class="cursor-pointer q-hoverable" @click="router.back()" />
      <q-breadcrumbs-el :label="item.name" class="text-grey-7" />
    </q-breadcrumbs>
    <div class="row q-gutter-x-sm">
      <q-img :src="getImgUrl(item.image)" style="max-width: 140px;" class="q-responsive" alt="{{item.name}}"/>
      <div class="column" style="height: 170px">
        <div class="col-10">
          <div class="text-h6 wrap ellipsis-3-lines">{{item.name}}</div>
          <div class="text-subtitle1 text-grey-8 wrap ellipsis-2-lines">{{item.description}}</div>
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
      <q-card class="full-width full-height">
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
        <q-tab-panels v-model="tab" animated>
          <q-tab-panel name="jobs">
            <div class="text-h6">Jobs</div>
            Lorem ipsum dolor sit amet consectetur adipisicing elit.
          </q-tab-panel>

          <q-tab-panel name="comments">
            <div class="text-h6">Comments</div>
            Lorem ipsum dolor sit amet consectetur adipisicing elit.
          </q-tab-panel>

          <q-tab-panel name="info">
            <div class="text-h6">Info</div>
            Lorem ipsum dolor sit amet consectetur adipisicing elit.
          </q-tab-panel>
        </q-tab-panels>
      </q-card>
    </div>
  </q-page>
</template>

<script setup lang="ts">
import {Item, getImgUrl, getItemStatusColor} from 'src/types/Item';
import {ref} from 'vue';
import {useItemsStore} from 'stores/items.store';
import {useRouter} from 'vue-router';

const router = useRouter();

const props = defineProps<{
  id: string;
}>()

const item = ref<Item | undefined>(useItemsStore().getItem(props.id));
const tab = ref('jobs');

if (item.value === undefined) {
  useRouter().push({ name: '404'});
}
</script>

<style scoped>

</style>
