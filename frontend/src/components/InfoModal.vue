<template>
  <q-dialog :model-value="show">
    <q-card>
      <q-card-section class="row items-center">
        <q-avatar icon="info" color="primary" text-color="white" />
        <div class="text-h6 q-ml-sm">Information</div>
      </q-card-section>
      <q-card-section>
        <q-input
          :model-value="property"
          label="Property"
          filled
          dense
          clearable
        />
        <q-input
          :model-value="value"
          label="Value"
          filled
          dense
          clearable
        />
      </q-card-section>
      <q-card-actions align="right">
        <q-btn
          label="Cancel"
          color="negative"
          flat
          @click="close"
        />
        <q-btn
          label="Save"
          color="primary"
          flat
          @click="save"
        />
      </q-card-actions>
    </q-card>
  </q-dialog>
</template>

<script setup lang="ts">
import { defineProps, defineEmits } from 'vue'

const props = defineProps<{
  property: string;
  value: string;
  show: boolean;
}>();

const emits = defineEmits<{
  (e: 'save', property: string, value: string): void;
  (e: 'close'): void;
}>()

function save() {
  emits('save', props.property, props.value);
}

function close() {
  emits('close');
}
</script>

<style scoped>

</style>
