<template>
  <q-page>
    <div class="column justify-center q-gutter-y-md">
      <div class="text-center text-h5 text-bold">Create Team</div>
      <div class="text-center text-body1">
        Add the details of your team here. These can be changed later.
      </div>
      <q-form class="column justify-center q-gutter-y-md" @submit="createOrg" >
        <q-input
          v-model="orgName"
          class="q-mx-auto"
          outlined
          label="Team Name"
          color="primary"
          :rules="[val => val.length > 0 || 'Team name must be at least 1 character long']"
        />
        <q-btn
          class="q-mx-auto"
          size="lg"
          type="submit"
          label="Create Team"
          rounded
          color="primary"
          :loading="isLoading"
        />
      </q-form>
    </div>
  </q-page>
</template>

<script setup>
import { ref } from 'vue'
import { useAuthStore } from '../../stores/auth.store';

const authStore = useAuthStore()

const orgName = ref('')
const isLoading = ref(false)

async function createOrg() {
  isLoading.value = true;
  await authStore.createOrganisation(orgName.value);
  isLoading.value = false;
}

</script>

<style scoped>

</style>
