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
          :disable="loading"
        />
      </div>
      <q-input
        v-model="name"
        label="Name"
        filled
        lazy-rules
        :disable="loading"
        :rules="[val => val.length > 0 || 'Name is required',
                 val => val.length <= 25 || 'Name must be less than 25 characters']"
      />
      <q-input
        v-model="description"
        label="Description"
        filled
        lazy-rules
        :disable="loading"
        :rules="[val => val.length > 0 || 'Description is required',
        val => val.length < 100 || 'Description must be less than 100 characters']"
      />
      <q-btn type="submit" color="primary" label="Submit" :loading="loading" />
    </q-form>
  </q-page>
</template>

<script setup lang="ts">
import {ref} from 'vue';
import {useRouter} from 'vue-router';
import {Camera, CameraResultType} from '@capacitor/camera';
import {Item, ItemStatus} from 'src/types/Item';
import {useItemsStore} from 'src/stores/items.store';

const router = useRouter();

const name = ref('');
const description = ref('');
const imageSrc = ref('');
const imageBase64 = ref('');
const loading = ref(false);

async function onSubmit() {
  loading.value = true;
  const item: Item = {
    id: '',
    name: name.value,
    description: description.value,
    status: ItemStatus.available,
    information: {}
  };
  await useItemsStore().updateItem(item, imageBase64.value);
  loading.value = false;
};

/**
 * Opens the camera and allows the user to take a picture.
 */
async function updateItemImage() {
  if (!loading.value) {
    const image = await Camera.getPhoto({
      quality: 90,
      allowEditing: true,
      resultType: CameraResultType.Base64
    })
    if (image.base64String) {
      imageSrc.value = 'data:image/png;base64,'+ image.base64String;
      imageBase64.value = image.base64String;
    }
  }
}
</script>

<style scoped>

</style>
