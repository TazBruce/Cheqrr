<template>
  <q-page>
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
      <div class="col-4">
        <q-img :src="getImgUrl(item.image)" class="responsive" alt="{{item.name}}"/>
      </div>
      <div class="col">
        <div class="column" style="height: 170px">
          <div class="col-8 bg-white">
            <div class="text-h6 wrap ellipsis-3-lines">{{item.name}}</div>
            <div class="text-subtitle1 text-grey-8">{{item.description}}</div>
          </div>
          <div class="col-4">
            <div class="row q-gutter-x-xs bg-white self-end">
              <q-avatar size="xs" :class="getItemStatusColor(item.status)"></q-avatar>
              <div class="text-subtitle2">{{ item.status }}</div>
            </div>
          </div>
        </div>
      </div>
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

if (item.value === undefined) {
  useRouter().push({ name: '404'});
}
</script>

<style scoped>

</style>
