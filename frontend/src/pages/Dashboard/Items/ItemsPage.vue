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
    <q-page-sticky position="bottom-right" :offset="[100, 50]">
      <q-btn color="primary" fab icon="qr_code" @click="scanBarcode"/>
    </q-page-sticky>
  </q-page>
</template>

<script setup lang="ts">
import { useItemsStore } from 'stores/items.store';
import ScannerDialog from 'components/ScannerDialog.vue';
import ItemComponent from 'components/Items/ItemComponent.vue';
import {useQuasar} from 'quasar';

const { items } = useItemsStore()
const $q = useQuasar();

function scanBarcode() {
  $q.dialog({
    component: ScannerDialog,
  }).onOk((result: string) => {
    console.log(result);
  });
}

</script>

<style scoped>

</style>
