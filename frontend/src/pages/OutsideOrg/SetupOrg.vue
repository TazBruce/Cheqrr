<template>
  <q-page>
    <div class="column justify-center q-gutter-y-md">
      <div class="text-center text-h5 text-bold">You're not in a team!</div>
      <div class="text-center text-body1">You can either create a new team or join an existing one.</div>
      <q-btn
        to="/setup/join-organisation"
        class="q-mx-auto"
        size="lg"
        label="Join Team"
        rounded
        color="primary"
      />
      <q-btn
        to="/setup/create-organisation"
        class="q-mx-auto"
        size="lg"
        label="Create Team"
        rounded
        outline
        color="primary"
      />
    </div>
  </q-page>
</template>

<script setup>

</script>

<style scoped>

</style>
