<template>
  <q-page>
    <q-card>
      <q-btn
        to="/"
        icon="chevron_left"
        flat
        round
        dense
        color="primary"
      />
      <q-card-section>
        <q-form @submit="onSubmit" @reset="onReset" class="q-gutter-md">
          <q-input
            v-model="username"
            label="Username"
            filled
            dense
            :rules="[val => val.length > 0 || 'Please type something']"
          />
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
            :rules="[val => val && val.length > 0 || 'Please type your password',
                     val => val.length > 7 || 'Password must be at least 8 characters']">
            <template v-slot:append>
              <q-icon
                :name="isPwd ? 'visibility_off' : 'visibility'"
                class="cursor-pointer"
                @click="isPwd = !isPwd"
              />
            </template>
          </q-input>
          <q-input
            v-model="passwordConfirmation"
            label="Password Confirmation"
            filled
            :type="isPwd ? 'password' : 'text'"
            lazy-rules
            :rules="[val => val && val.length > 0 || 'Please type your password confirmation',
                     val => val.length > 7 || 'Password must be at least 8 characters']">
            <template v-slot:append>
              <q-icon
                :name="isPwd ? 'visibility_off' : 'visibility'"
                class="cursor-pointer"
                @click="isPwd = !isPwd"
              />
            </template>
          </q-input>
          <q-btn label="Register" type="submit" color="primary" :loading="isLoading" />
          <q-btn label="Reset" type="reset" color="primary" flat class="q-ml-sm" />
        </q-form>
      </q-card-section>
      <router-link to="login" class="btn btn-link" replace>Login</router-link>
    </q-card>
  </q-page>
</template>

<script setup>
import { ref } from 'vue';
import { useAuthStore } from '../../stores/auth.store';

let isPwd = ref(true)
let isLoading = ref(false)
let username = ref('')
let email = ref('');
let password = ref('');
let passwordConfirmation = ref('');

async function onSubmit () {
  const auth = useAuthStore();
  if (password.value !== passwordConfirmation.value) {
    alert('Password and password confirmation do not match');
  } else {
    isLoading.value = true;
    await auth.register(username.value, email.value, password.value);
    isLoading.value = false;
  }
}

function onReset () {
  email.value = ''
  password.value = ''
  passwordConfirmation.value = ''
}
</script>

<style scoped>

</style>
