<template>
  <q-layout view="hHh lpR fFf">
    <q-header elevated>
      <q-toolbar>
        <q-btn
          v-show="$q.platform.is.desktop"
          dense
          flat
          round
          icon="menu"
          @click="leftDrawerOpen = !leftDrawerOpen"
        />
        <q-toolbar-title class="text-center">
          Cheqrr
        </q-toolbar-title>

        <q-btn
          flat
          dense
          round
          v-if="$q.platform.is.desktop"
          icon="settings"
          aria-label="Settings"
          to="/dashboard/settings"
          />
      </q-toolbar>
    </q-header>
    <q-drawer
      v-model="leftDrawerOpen"
      v-show="$q.platform.is.desktop"
      :width="200"
      :breakpoint="500"
      bordered
      class="bg-white"
    >
      <q-scroll-area class="fit">
        <q-list>
          <template v-for="(menuItem, index) in menuList" :key="index">
            <q-item :to="menuItem.route" replace exact v-ripple :class="{
                  'text-grey-14': $route.path !== menuItem.route
                }">
              <q-item-section avatar>
                <q-icon :name="menuItem.icon" />
              </q-item-section>
              <q-item-section>
                {{ menuItem.label }}
              </q-item-section>
            </q-item>
            <q-separator :key="'sep' + index"  v-if="menuItem.separator" />
          </template>
        </q-list>
      </q-scroll-area>
    </q-drawer>

    <q-page-container>
      <router-view style="padding-left: 10px; padding-top: 10px; padding-right: 20px"/>
    </q-page-container>

    <q-footer v-show="$q.platform.is.mobile" bordered class="bg-white text-primary">
      <q-tabs
        no-caps
        align="justify"
        :breakpoint="0"
        active-color="primary"
        indicator-color="transparent"
        class="text-grey-14"
      >
        <q-route-tab to="/dashboard/items" replace name="items" label="Items" icon="inventory" />
        <q-route-tab to="/dashboard/jobs" replace name="jobs" label="Jobs" icon="assignment" />
        <q-route-tab to="/dashboard/settings" replace name="settings" label="Settings" icon="settings" />
      </q-tabs>
    </q-footer>
  </q-layout>
</template>

<script setup>
import { ref } from 'vue';

const menuList = [
  {
    icon: 'assignment',
    label: 'Jobs',
    route: '/dashboard/jobs',
    separator: false,
  },
  {
    icon: 'inventory',
    label: 'Items',
    route: '/dashboard/items',
    separator: false
  },
]

const leftDrawerOpen = ref(false);
</script>
