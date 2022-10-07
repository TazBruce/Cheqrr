<template>
  <q-page class="q-gutter-y-md">
    <q-breadcrumbs
      class="q-mb-md"
      :separator="`>`"
      :separator-class="`text-grey-8`"
      :label-class="`text-grey-8`"
      :active-class="`text-primary`"
    >
      <q-breadcrumbs-el  label="Items" class="cursor-pointer q-hoverable" @click="router.go(-2)" />
      <q-breadcrumbs-el :label="name" class="cursor-pointer q-hoverable" @click="router.go(-1)" />
      <q-breadcrumbs-el :label="title" class="text-grey-7" />
    </q-breadcrumbs>
    <h1 class="text-h5">{{title}}</h1>
    <q-btn
      class="absolute-top-right"
      style="margin-right: 20px; margin-top: 60px;"
      color="negative"
      icon="delete"
      @click="deleteItem"
      :hidden="!editMode"
    />
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
      <q-select
        v-model="status"
        label="Status"
        filled
        :options="statusOptions"
        :disable="loading"
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
const itemsStore = useItemsStore();

const props = defineProps<{
  id?: string;
}>()

let item: Item | undefined;
const editMode = ref(false);
const title = ref('Create Item');
const name = ref('');
const description = ref('');
const imageSrc = ref('');
const imageBase64 = ref('');
const loading = ref(false);
const status = ref(ItemStatus.available);

const statusOptions = [
  ItemStatus.available,
  ItemStatus.unavailable,
  ItemStatus.flagged,
  ItemStatus.maintenance
];

if (props.id) {
  item = useItemsStore().getItem(props.id);
  if (item) {
    editMode.value = true;
    title.value = 'Edit Item';
    name.value = item.name;
    description.value = item.description;
    status.value = item.status;
    itemsStore.getImageUrl(item.id).then((url) => {
      imageSrc.value = url;
    }).catch(() => {
      imageSrc.value = 'https://via.placeholder.com/150x150/cccccc/969696?text=PLACEHOLDER';
    });
  } else {
    router.push({name: 'Dashboard'});
  }
}

async function onSubmit() {
  loading.value = true;
  const newItem: Item = {
    id: props.id || '',
    name: name.value,
    description: description.value,
    information: item?.information ? item.information : {},
    status: status.value
  };
  await itemsStore.updateItem(newItem, imageBase64.value);
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

/**
 * Deletes the item.
 */
async function deleteItem() {
  if (!loading.value) {
    await itemsStore.deleteItem(item?.id || '');
  }
}
</script>

<style scoped>

</style>
