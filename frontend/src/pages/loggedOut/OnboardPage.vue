<!-- Page for on boarding a user, this will allow them to navigate to login or register page -->
<template>
  <q-page class="bg-primary row justify-center items-center">
    <div class="col"/>
    <div class="col-8">
      <div class="row q-gutter-md">
        <h3 class="text-center text-white">Cheqrr</h3>
        <h6 class="text-white">Inspect and manage your equipment here!</h6>
        <q-btn
          rounded
          class="full-width"
          color="white"
          text-color="primary"
          label="Login"
          @click="login"
        />
        <q-btn
          outline
          rounded
          color="white"
          class="full-width"
          label="Register"
          @click="register"
        />
      </div>
    </div>
    <div class="col"/>
  </q-page>
</template>

<script setup>
import { useRouter } from 'vue-router';
const router = useRouter();

const login = () => {
  router.push('/login')
}

const register = () => {
  router.push('/register')
}
</script>

<style scoped>

</style>
