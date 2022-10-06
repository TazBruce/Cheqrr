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
          @click="editItemInformation(key)"
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

/**
 * Delete item information
 * @param key property key
 */
function deleteItemInformation(key: string) {
  if (item.value !== undefined) {
    useItemsStore().deleteInformation(item.value.id, key);
  }
}

/**
 * Edit item information
 * @param key property key
 */
function editItemInformation(key: string) {
  selectedPropertyKey.value = key;
  selectedPropertyValue.value = item.value?.information[key].toString() ?? '';
  $q.dialog({
    component: InfoDialog,
    componentProps: {
      propertyKey: selectedPropertyKey.value,
      propertyValue: selectedPropertyValue.value,
    },
  }).onOk((payload) => {
    if (item.value !== undefined) {
      useItemsStore().updateInformation(item.value.id, payload.property, payload.value);
    }
  });
}
</script>

<style scoped>

</style>
