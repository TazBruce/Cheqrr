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
    <q-form @submit="onSubmit">
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

const router = useRouter();

const name = ref('');
const description = ref('');

const onSubmit = () => {
  console.log('onSubmit');
};
</script>

<style scoped>

</style>
