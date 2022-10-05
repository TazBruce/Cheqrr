<template>
  <q-card @click="navigateToItem" v-ripple class="cursor-pointer q-hoverable text-left" style="width: 150px; height: auto;">
    <q-card-section class="no-padding bg-grey-3">
      <img :src="getImgUrl(item.image)" class="responsive"  alt="{{item.name}}"/>
    </q-card-section>
    <q-card-section class="bg-grey-3 q-gutter-y-xs" style="padding-top: 0; padding-bottom: 5px">
      <div class="text-body1 ellipsis">{{ item.name }}</div>
      <div class="row q-gutter-x-xs bg">
        <q-avatar size="xs" :class="getItemStatusColor(item.status)"></q-avatar>
        <div class="text-caption">{{ item.status }}</div>
      </div>
    </q-card-section>
    <span class="q-focus-helper"></span>
  </q-card>
</template>

<script setup lang="ts">
import {Item, getItemStatusColor, getImgUrl} from 'src/types/Item';
import { useRouter } from 'vue-router'

const router = useRouter()

const props = defineProps<{
  item: Item;
}>();

function navigateToItem() {
  router.push({ name: 'viewItem', params: { id: props.item.id } });
}
</script>
