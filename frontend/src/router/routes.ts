import { RouteRecordRaw } from 'vue-router';

const routes: RouteRecordRaw[] = [
  {
    path: '/',
    component: () => import('layouts/LoggedOut.vue'),
    children: [
      { path: '', component: () => import('../pages/loggedOut/OnboardPage.vue') },
      { path: 'login', component: () => import('../pages/loggedOut/LoginPage.vue') },
      { path: 'register', component: () => import('../pages/loggedOut/RegisterPage.vue') }
    ],
  },
  {
    path: '/setup',
    component: () => import('layouts/OutsideOrg.vue'),
    children: [
      { path: '', component: () => import('../pages/OutsideOrg/SetupOrg.vue') },
      { path: 'create-organisation', component: () => import('../pages/OutsideOrg/CreateOrg.vue') },
      { path: 'join-organisation', component: () => import('../pages/OutsideOrg/JoinOrg.vue') }
    ],
  },
  {
    path: '/dashboard',
    component: () => import('layouts/Dashboard.vue'),
    children: [
      { path: '', component: () => import('../pages/Dashboard/IndexPage.vue') },
    ],
  },


  // Always leave this as last one,
  // but you can also remove it
  {
    path: '/:catchAll(.*)*',
    component: () => import('pages/ErrorNotFound.vue'),
  },
];

export default routes;
