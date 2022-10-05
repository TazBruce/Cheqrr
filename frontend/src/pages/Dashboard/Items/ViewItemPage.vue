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
      <q-breadcrumbs-el :label="item.name" />
    </q-breadcrumbs>
    <h1 class="text-h5">{{item.name}}</h1>
  </q-page>
</template>

<script setup lang="ts">
import {Item} from 'src/types/Item';
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
