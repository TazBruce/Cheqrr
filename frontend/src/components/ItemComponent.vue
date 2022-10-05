<template>
  <q-card v-ripple class="cursor-pointer q-hoverable text-left" style="width: 150px; height: auto;">
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
import {Item} from 'src/types/Item';

defineProps<{
  item: Item;
}>();

/**
 * Get the image url
 * @param image The image
 */
function getImgUrl(image: string): string {
  return image !== '' ? image : 'https://via.placeholder.com/150x150/ffffff/969696?text=PLACEHOLDER';
}

/**
 * Get item status color
 * @param status The status
 */
function getItemStatusColor(status: string): string {
  if (status === 'Available') {
    return 'bg-positive';
  } else if (status === 'Maintenance') {
    return 'bg-warning';
  } else {
    return 'bg-negative';
  }
}
</script>
