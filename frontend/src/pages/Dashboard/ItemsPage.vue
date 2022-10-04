<template>
  <q-page>
    <h1 class="text-h5">Items</h1>
    <q-list class="q-gutter-md row">
      <ItemComponent
        v-for="item in items"
        :key="item.id"
        :item="item"
      />
    </q-list>
  </q-page>
</template>

<script setup lang="ts">
import { useItemsStore } from 'stores/items.store';
import ItemComponent from 'components/ItemComponent.vue';

const { items } = useItemsStore()
</script>

<style scoped>

</style>
