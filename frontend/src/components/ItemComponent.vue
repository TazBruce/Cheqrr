<template>
  <q-card class="text-center" style="width: 150px; height: auto;">
    <q-card-section>
      <img src="https://via.placeholder.com/150" class="responsive"  alt="{{item.name}}"/>
    </q-card-section>
    <q-card-section>
      <div class="text-h6">{{ item.name }}</div>
    </q-card-section>
    <q-card-section>
      <div class="text-subtitle2">{{ item.description }}</div>
    </q-card-section>
  </q-card>
</template>

<script setup lang="ts">
import {Item} from 'src/types/Item';

defineProps<{
  item: Item;
}>();
</script>
