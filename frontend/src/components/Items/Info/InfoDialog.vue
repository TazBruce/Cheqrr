<template>
  <q-dialog ref="dialogRef" @hide="onDialogHide">
    <q-card>
      <q-card-section class="row items-center">
        <q-avatar icon="info" color="primary" text-color="white" />
        <div class="text-h6 q-ml-sm">Update Property</div>
      </q-card-section>
      <q-card-section>
        <q-input
          v-model="propertyKey"
          label="Property"
          filled
          dense
        />
        <q-input
          v-model="propertyValue"
          label="Value"
          filled
          dense
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
import { useDialogPluginComponent } from 'quasar';
import { ref } from 'vue';

const props = defineProps<{
  propertyKey: string;
  propertyValue: string;
}>();

defineEmits([
  ...useDialogPluginComponent.emits,
])

const { dialogRef, onDialogHide, onDialogOK, onDialogCancel } = useDialogPluginComponent()

const propertyKey = ref(props.propertyKey);
const propertyValue = ref(props.propertyValue);

function save() {
  onDialogOK({ property: propertyKey.value, value: propertyValue.value })
}

function close() {
  onDialogCancel()
}
</script>

<style scoped>

</style>
