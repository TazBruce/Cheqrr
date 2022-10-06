<template>
  <q-markup-table
    class="full-height"
  >
    <thead>
    <tr>
      <th>Property</th>
      <th>Value</th>
      <th>Actions</th>
    </tr>
    </thead>
    <tbody>
    <tr v-for="key in Object.keys(item.information)" v-bind:key="key">
      <td key="key" class="text-center">{{key}}</td>
      <td key="value" class="text-center">{{item.information[key]}}</td>
      <td key="actions" class="text-center">
        <q-btn
          class="q-mr-sm"
          color="primary"
          text-color="white"
          icon="edit"
          @click="updateItemInformation(key)"
        />
        <q-btn
          class="q-ml-sm"
          color="negative"
          text-color="white"
          icon="delete"
          @click="deleteItemInformation(key)"
        />
      </td>
    </tr>
    <tr>
      <td key="key" class="text-center">
        <q-input
          v-model="newPropertyKey"
          label="Property"
          filled
          dense
        />
      </td>
      <td key="value" class="text-center">
        <q-input
          v-model="newPropertyValue"
          label="Value"
          filled
          dense
        />
      </td>
      <td key="actions" class="text-center">
        <q-btn
          class="q-mr-sm"
          color="primary"
          text-color="white"
          icon="add"
          @click="addItemInformation"
        />
      </td>
    </tr>
    </tbody>
  </q-markup-table>
</template>
<script setup lang="ts">
import {defineProps, ref} from 'vue'
import {useItemsStore} from 'stores/items.store';
import {useQuasar} from 'quasar';
import {Item} from 'src/types/Item';
import InfoDialog from 'components/Items/Info/InfoDialog.vue';

const props = defineProps<{
  id: string;
}>()

const $q = useQuasar();
const item = ref<Item | undefined>(useItemsStore().getItem(props.id));
const selectedPropertyKey = ref('');
const selectedPropertyValue = ref('');
const itemStore = useItemsStore();
const newPropertyKey = ref('');
const newPropertyValue = ref('');

/**
 * Delete item information
 * @param key property key
 */
function deleteItemInformation(key: string) {
  if (item.value !== undefined) {
    itemStore.deleteInformation(item.value.id, key);
  }
}

/**
 * Edit item information
 * @param key property key
 */
function updateItemInformation(key: string) {
  selectedPropertyKey.value = key;
  const value = item.value?.information[key];
  selectedPropertyValue.value = value !== undefined ? value.toString() : '';
  $q.dialog({
    component: InfoDialog,
    componentProps: {
      propertyKey: selectedPropertyKey.value,
      propertyValue: selectedPropertyValue.value,
    },
  }).onOk((payload) => {
    if (item.value !== undefined) {
      itemStore.updateInformation(item.value.id, payload.property, payload.value);
    }
  });
}

/**
 * Add item information
 */
function addItemInformation() {
  if (item.value !== undefined && newPropertyKey.value !== '' && newPropertyValue.value !== '') {
    itemStore.updateInformation(item.value.id, newPropertyKey.value, newPropertyValue.value);
    newPropertyKey.value = '';
    newPropertyValue.value = '';
  }
}
</script>

<style scoped>

</style>
