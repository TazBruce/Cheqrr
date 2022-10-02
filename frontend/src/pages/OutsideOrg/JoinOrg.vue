<template>
  <q-page>
    <div class="column justify-center q-gutter-y-md">
      <div class="text-center text-h5 text-bold">Join Team</div>
      <div class="text-center text-body1">
        Ask your team mate for an invite code and enter it below.
        Otherwise, ask them for an invite link and simply press it!
      </div>
      <q-form class="column justify-center q-mx-auto" @submit="joinOrg" >
        <q-input
          v-model="inviteCode"
          class="q-mx-auto"
          outlined
          label="Invite Code"
          color="primary"
          :rules="[val => val.length === 6 || 'Invite code must be 6 characters long']"
        />
        <q-btn
          class="q-mx-auto"
          size="lg"
          type="submit"
          label="Join Team"
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

const inviteCode = ref('')
const isLoading = ref(false)

async function joinOrg() {
  await authStore.joinOrganisation(inviteCode.value);
}

</script>

<style scoped>

</style>
