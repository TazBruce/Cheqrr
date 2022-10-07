<template>
  <q-page class="q-gutter-y-md">
    <q-breadcrumbs
      class="q-mb-md"
      :separator="`>`"
      :separator-class="`text-grey-8`"
      :label-class="`text-grey-8`"
      :active-class="`text-primary`"
    >
      <q-breadcrumbs-el  label="Items" class="cursor-pointer q-hoverable" @click="router.back()" />
      <q-breadcrumbs-el label="Create Item" class="text-grey-7" />
    </q-breadcrumbs>
    <h1 class="text-h5">Create Item</h1>
    <q-form @submit="onSubmit" class="column q-gutter-y-sm">
      <div class="col self-center">
        <q-img
          class="cursor-pointer q-hoverable bg-primary"
          v-ripple
          :src="imageSrc"
          style="width: 140px; height: 140px;"
          alt="Item Image"
          @click="updateItemImage"
        >
          <q-btn
            class="absolute-center"
            flat
            text-color="white"
            icon="photo_camera"
          />
        </q-img>
      </div>
      <div class="col self-center">
        <q-btn
          color="negative"
          icon="delete"
          label="Remove Image"
          @click="imageSrc = ''"
        />
      </div>
      <q-input
        v-model="name"
        label="Name"
        filled
        lazy-rules
        :rules="[val => val.length > 0 || 'Name is required',
                 val => val.length <= 25 || 'Name must be less than 25 characters']"
      />
      <q-input
        v-model="description"
        label="Description"
        filled
        lazy-rules
        :rules="[val => val.length > 0 || 'Description is required',
        val => val.length < 100 || 'Description must be less than 100 characters']"
      />
      <q-btn type="submit" color="primary" label="Submit" />
    </q-form>
  </q-page>
</template>

<script setup>
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import {Camera, CameraResultType} from '@capacitor/camera';

const router = useRouter();

const name = ref('');
const description = ref('');
const imageSrc = ref('');
const imageBase64 = ref('');

const onSubmit = () => {
  console.log('onSubmit');
};

async function updateItemImage() {
  const image = await Camera.getPhoto({
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
    imageBase64.value = image.base64String;
  }
}
</script>

<style scoped>

</style>
