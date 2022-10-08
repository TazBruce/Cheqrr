<template>
  <q-page>
    <h1 class="text-h5">Settings</h1>
    <q-card
      class="column bg-grey-3"
      style="margin-top: 20px"
    >
      <q-card-section
        class="col-auto"
        align="center"
      >
        <div class="text-h5">
          Invite Code
        </div>
      </q-card-section>
      <q-card-section
        class="col-auto"
      >
        <div
          class="text-h6 text-white bg-primary rounded-borders text-center"
          style="padding: 10px;"
        >
          {{ inviteCode }}
          <q-btn
            color="white"
            text-color="primary"
            icon="content_copy"
            @click="copyInviteCode"
          />
        </div>
      </q-card-section>
      <q-card-actions
        align="center"
      >
        <q-btn
          color="primary"
          label="Sign Out"
          @click="signOut"
        />
        <q-btn
          color="negative"
          @click="authStore.leaveOrganisation()"
        >
          Leave Organization
        </q-btn>
      </q-card-actions>
    </q-card>

  </q-page>
</template>

<script setup lang="ts">
import { useAuthStore} from 'stores/auth.store';
import { ref } from 'vue';

const authStore = useAuthStore();

const inviteCode = ref('');
authStore.getInviteCode().then((code) => {
  inviteCode.value = code;
});

function copyInviteCode() {
  navigator.clipboard.writeText(inviteCode.value);
}

function signOut() {
  authStore.signOut();
}
</script>

<style scoped>

</style>
