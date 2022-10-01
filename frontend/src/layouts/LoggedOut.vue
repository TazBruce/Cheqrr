<template>
  <q-layout>
    <q-page-container>
      <q-btn
        to="/"
        icon="chevron_left"
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
    </q-page-container>
  </q-layout>
</template>

<script>
export default {
  name: 'LoggedOut'
}
</script>

<style scoped>

</style>
