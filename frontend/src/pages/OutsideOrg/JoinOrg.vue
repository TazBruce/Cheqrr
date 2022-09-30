<template>
  <q-page>
    <h1>Join Organisation</h1>
    <q-card>
      <router-link to="/setup/create-organisation" class="btn btn-link" replace>Create Org</router-link>
    </q-card>
  </q-page>
</template>

<script setup>
import { useAuthStore } from '../../stores/auth.store';
import { ref } from 'vue';

let isPwd = ref(true)
let isLoading = ref(false)
let email = ref('');
let password = ref('');

async function onSubmit() {
  const auth = useAuthStore();
  isLoading.value = true;
  await auth.signIn(email.value, password.value);
  isLoading.value = false;
}

function onReset() {
  email.value = ''
  password.value = ''
}

</script>

<style scoped>

</style>
