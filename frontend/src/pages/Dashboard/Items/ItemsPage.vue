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
    <q-page-sticky position="bottom-right" :offset="[18, 50]">
      <q-btn to="items/create" fab icon="add" color="primary" />
    </q-page-sticky>
  </q-page>
</template>

<script setup lang="ts">
import { useItemsStore } from 'stores/items.store';
import ItemComponent from 'components/Items/ItemComponent.vue';

const { items } = useItemsStore()
</script>

<style scoped>

</style>
