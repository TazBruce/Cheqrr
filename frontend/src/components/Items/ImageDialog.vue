<template>
  <q-dialog
    ref="dialogRef"
    @hide="onDialogHide"
    persistent
  >
    <q-card>
      <q-card-section>
        <q-btn color="primary" label="Get Picture" @click="captureImage" />
        <img :src="imageSrc" alt="camera">
      </q-card-section>
      <q-card-actions align="right">
        <q-btn
          label="Close"
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
      <q-inner-loading
        :showing="loading"
        label="Please wait..."
        label-class="text-teal"
        label-style="font-size: 1.1em"
      />
    </q-card>
  </q-dialog>
</template>

<script setup lang="ts">
import { defineProps, defineEmits } from 'vue'
import { useDialogPluginComponent } from 'quasar';
import { ref } from 'vue';
import { useItemsStore } from 'stores/items.store';
import { Camera, CameraResultType } from '@capacitor/camera';

const props = defineProps<{
  itemID: string;
}>();

defineEmits([
  ...useDialogPluginComponent.emits,
])

const { dialogRef, onDialogHide, onDialogOK, onDialogCancel } = useDialogPluginComponent()
const itemsStore = useItemsStore();

const imageSrc = ref('');
const loading = ref(false);

async function captureImage() {
  const image = await Camera.getPhoto({
    quality: 90,
    allowEditing: true,
    resultType: CameraResultType.Base64
  })

  // The result will vary on the value of the resultType option.
  // CameraResultType.Uri - Get the result from image.webPath
  // CameraResultType.Base64 - Get the result from image.base64String
  // CameraResultType.DataUrl - Get the result from image.dataUrl
  if (image.webPath) {
    imageSrc.value = image.webPath;
  }
  loading.value = true;
  await itemsStore.uploadImage(props.itemID, image.base64String);
  loading.value = false;
  onDialogHide();
}

function close() {
  onDialogCancel()
}

function save() {
  onDialogOK()
}
</script>

<style scoped>

</style>
