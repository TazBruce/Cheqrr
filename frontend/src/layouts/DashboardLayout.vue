<template>
  <q-layout view="lHh Lpr lFf">
    <q-header elevated>
      <q-toolbar>
        <q-toolbar-title class="text-center">
          Cheqrr
        </q-toolbar-title>

        <q-btn
          flat
          dense
          round
          icon="account_circle"
          aria-label="Account"
          @click="signOut"
          />
      </q-toolbar>
    </q-header>

    <q-page-container>
      <router-view />
    </q-page-container>

    <q-footer bordered class="bg-white text-primary">
      <q-tabs
        no-caps
        align="justify"
        :breakpoint="0"
        active-color="primary"
        indicator-color="transparent"
        class="text-grey"
        v-model="tab">
        <q-tab name="items" label="Items" icon="inventory" />
        <q-tab name="jobs" label="Jobs" icon="assignment" />
        <q-tab name="forms" label="Forms" icon="topic" />
      </q-tabs>
    </q-footer>
  </q-layout>
</template>

<script setup>
import { useAuthStore } from 'src/stores/auth.store';
import {ref} from 'vue';

const tab = ref('images');

function signOut() {
  const auth = useAuthStore();
  auth.signOut();
}
</script>
