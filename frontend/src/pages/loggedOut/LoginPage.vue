<template>
  <q-page>
    <q-card>
      <q-card-section>
        <q-btn
          to="/"
          icon="chevron_left"
          flat
          round
          dense
          color="primary"
        />
        <q-form @submit="onSubmit" @reset="onReset" class="q-gutter-md">
          <q-input
            v-model="email"
            label="Email"
            filled
            lazy-rules
            :rules="[val => val && val.length > 0 || 'Please type your email']"
          />
          <q-input
            v-model="password"
            label="Password"
            filled
            :type="isPwd ? 'password' : 'text'"
            lazy-rules
            :rules="[val => val && val.length > 0 || 'Please type your password']">
            <template v-slot:append>
              <q-icon
                :name="isPwd ? 'visibility_off' : 'visibility'"
                class="cursor-pointer"
                @click="isPwd = !isPwd"
              />
            </template>
          </q-input>
          <q-btn label="Login" type="submit" color="primary" :loading="isLoading"/>
          <q-btn label="Reset" type="reset" color="primary" flat class="q-ml-sm" />
        </q-form>
      </q-card-section>
      <router-link to="register" class="btn btn-link" replace>Register</router-link>
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
