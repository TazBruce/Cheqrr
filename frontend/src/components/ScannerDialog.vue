<template>
  <q-dialog ref="dialogRef" @hide="onDialogHide" persistent>
    <q-card class="bg-grey-1">
      <q-form @submit="save">
        <q-card-section>
          <q-input
            v-model="scanResult"
            label="Scanned ID"
            :disable="true"
            filled
            dense
          />
          <q-btn
            class="q-mt-md content-center"
            color="primary"
            label="Scan"
            @click="camera = 'auto'"
          />
          <div>
            <QrStream :camera="camera" @decode="onDecode" @init="onInit"></QrStream>
          </div>
          <div class="text-body1 text-center text-negative">
            {{ error }}
          </div>
        </q-card-section>
        <q-card-actions>
          <q-btn
            label="Close"
            color="primary"
            flat
            @click="onDialogCancel"
          />
          <q-btn
            type="submit"
            label="Submit"
            color="primary"
            flat
          />
        </q-card-actions>
        <q-inner-loading
          :showing="loading"
          label="Please wait..."
          label-class="text-teal"
          label-style="font-size: 1.1em"
        />
      </q-form>
    </q-card>
  </q-dialog>
</template>

<script setup>
import { useDialogPluginComponent } from 'quasar';
import { ref } from 'vue';
import { QrStream } from 'vue3-qr-reader'

defineEmits([
  ...useDialogPluginComponent.emits,
])

const { dialogRef, onDialogHide, onDialogOK, onDialogCancel } = useDialogPluginComponent()

const scanResult = ref('');
const loading = ref(false);
const error = ref('');
const isValid = ref(undefined);
const camera = ref('auto');
const result = ref(null);

let image;

function onInit(promise) {
  promise
    .catch(console.error)
    .then(resetValidationState)
}

function resetValidationState() {
  isValid.value = undefined
}

async function onDecode(content) {
  scanResult.value = content;
  result.value = content
  turnCameraOff()
}

function turnCameraOn() {
  camera.value = 'auto'
}

function turnCameraOff() {
  camera.value = 'off'
}

async function save() {
  if (scanResult.value === 'INVALID CODE' || scanResult.value === '') {
    error.value = 'You must scan a valid code';
  } else {
    loading.value = true;
    await onDialogOK(scanResult.value);
    loading.value = false;
  }
}
</script>

<style scoped>

</style>
