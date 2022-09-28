<!-- Page for on boarding a user, this will allow them to navigate to login or register page -->
<template>
  <q-page class="bg-primary row justify-center items-center">
    <div class="col"/>
    <div class="col-8">
      <h3 class="text-center text-white">Cheqrr</h3>
      <h6 class="text-center text-white">Inspect and manage your equipment here!</h6>
      <div class="q-gutter-y-md">
        <q-btn
          to="login"
          rounded
          class="full-width"
          color="white"
          text-color="primary"
          label="Login"
        />
        <q-btn
          to="register"
          outline
          rounded
          color="white"
          class="full-width"
          label="Register"
        />
      </div>
    </div>
    <div class="col"/>
  </q-page>
</template>

<script setup>
</script>

<style scoped>

</style>
