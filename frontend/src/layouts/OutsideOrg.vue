<template>
  <q-layout>
    <q-page-container>
      <div class="column" style="width: 100%">
        <div class="col-8 bg-primary">
          <h3 class="text-center text-white">Cheqrr</h3>
        </div>
        <div class="col-4">
          <q-btn
            to="/setup"
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
        </div>
      </div>
    </q-page-container>
  </q-layout>
</template>

<script>
export default {
  name: 'OutsideOrg'
}
</script>

<style scoped>

</style>
