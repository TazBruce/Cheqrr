<template>
  <q-dialog
    ref="dialogRef"
    @hide="onDialogHide"
    persistent
  >
    <q-card>
      <q-card-section class="q-gutter-y-sm">
        <q-img class="bg-grey-6" :src="imageSrc" alt="camera"/>
        <q-btn icon="photo_camera" color="primary" label="Get Picture" @click="captureImage" />
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
import { useDialogPluginComponent } from 'quasar';
import { ref } from 'vue';
import { Camera, CameraResultType, Photo } from '@capacitor/camera';

defineEmits([
  ...useDialogPluginComponent.emits,
])

const { dialogRef, onDialogHide, onDialogOK, onDialogCancel } = useDialogPluginComponent()

const imageSrc = ref('');
const loading = ref(false);
let image: Photo;

async function captureImage() {
  image = await Camera.getPhoto({
    quality: 90,
    allowEditing: true,
    resultType: CameraResultType.Base64
  })

  // The result will vary on the value of the resultType option.
  // CameraResultType.Uri - Get the result from image.webPath
  // CameraResultType.Base64 - Get the result from image.base64String
  // CameraResultType.DataUrl - Get the result from image.dataUrl
  if (image.base64String) {
    imageSrc.value = 'data:image/png;base64,'+ image.base64String;
  }
}

function close() {
  onDialogCancel()
}

async function save() {
  onDialogOK({ imageSrc: imageSrc.value, imageBase64: image.base64String })
}
</script>

<style scoped>

</style>
