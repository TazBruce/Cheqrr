<template>
  <q-card
    @click="navigateToItem"
    v-ripple
    class="cursor-pointer q-hoverable text-left"
    style="width: 150px; height: auto;">
    <q-card-section class="no-padding bg-grey-3">
      <q-img :src="itemImage" width="150px" height="150px" alt="{{item.name}}"/>
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
import {Item, getItemStatusColor} from 'src/types/Item';
import { useRouter } from 'vue-router'
import {ref} from 'vue';
import {useItemsStore} from 'stores/items.store';

const router = useRouter()
const itemsStore = useItemsStore();

const props = defineProps<{
  item: Item;
}>();

const itemImage = ref('');

itemsStore.getImageUrl(props.item.id).then((url) => {
  itemImage.value = url;
}).catch(() => {
  itemImage.value = 'https://via.placeholder.com/150x150/cccccc/969696?text=PLACEHOLDER';
});

function navigateToItem() {
  router.push({ name: 'viewItem', params: { id: props.item.id } });
}
</script>
