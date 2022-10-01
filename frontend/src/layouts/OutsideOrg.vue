<template>
  <q-layout>
    <q-page-container>
      <div class="column" style="height: 100%">
        <div class="col-8 bg-primary">
          <h3 class="text-center text-white">Cheqrr</h3>
        </div>
        <div class="col-4 q-gutter-y-none">
          <q-btn
            @click="goBack"
            icon="chevron_left"
            size="xl"
            flat
            round
            dense
            color="primary"
          />
          <router-view v-slot="{ Component, route }">
            <transition
              appear
              duration="300"
              :enter-active-class="'animated '+route.meta.entryTransitionName"
              :leave-active-class="'animated '+route.meta.exitTransitionName"
            >
              <component :is="Component" />
            </transition>
          </router-view>
        </div>
      </div>
    </q-page-container>
  </q-layout>
</template>

<script setup>
import { useRouter } from 'vue-router';
import { useAuthStore } from '../stores/auth.store';

const router = useRouter();

function goBack() {
  if (router.currentRoute.value.path === '/setup') {
    const auth = useAuthStore();
    auth.signOut();
  } else {
    router.go(-1);
  }
}
</script>

<style scoped>

</style>
