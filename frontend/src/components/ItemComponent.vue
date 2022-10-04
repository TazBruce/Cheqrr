<template>
  <q-item
    clickable
    tag="a"
    target="_blank"
  >
    <q-item-section>
      {{ item.description }}
    </q-item-section>

    <q-item-section>
      <q-item-label>{{ item.name }}</q-item-label>
    </q-item-section>
  </q-item>
</template>

<script setup lang="ts">
import {Item} from 'src/types/Item';

defineProps<{
  item: Item;
}>();
</script>
