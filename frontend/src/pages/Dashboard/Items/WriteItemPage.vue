<template>
  <q-page>
    <h1 class="text-h5">Create Item</h1>
    <q-form @submit="onSubmit">
      <q-input
        v-model="name"
        label="Name"
        filled
        lazy-rules
        :rules="[val => val.length > 0 || 'Name is required']"
      />
      <q-input
        v-model="description"
        label="Description"
        filled
        lazy-rules
        :rules="[val => val.length > 0 || 'Description is required']"
      />
      <q-btn type="submit" color="primary" label="Submit" />
    </q-form>
  </q-page>
</template>

<script setup>
import { ref } from 'vue';

const name = ref('');
const description = ref('');

const onSubmit = () => {
  console.log('onSubmit');
};
</script>

<style scoped>

</style>
