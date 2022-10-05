<template>
  <q-page>
    <h1 class="text-h5">View Item</h1>
  </q-page>
</template>

<script setup lang="ts">
import {Item} from 'src/types/Item';
import {ref} from 'vue';
import {useItemsStore} from 'stores/items.store';
import {useRouter} from 'vue-router';

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
