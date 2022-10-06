import { RouteRecordRaw, RouterView } from 'vue-router';

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
    component: () => import('layouts/DashboardLayout.vue'),
    children: [
      { path: '', component: () => import('../pages/Dashboard/JobsPage.vue') },
      { path: 'items', component: RouterView,
        children: [
          { path: '', component: () => import('../pages/Dashboard/Items/ItemsPage.vue') },
          { name: 'createItem', path: 'create', component: () => import('../pages/Dashboard/Items/WriteItemPage.vue') },
          { name: 'editItem', path: 'edit/:id', component: () => import('../pages/Dashboard/Items/WriteItemPage.vue') },
          { name: 'viewItem', path: ':id', component: () => import('../pages/Dashboard/Items/ViewItemPage.vue'), props: true }
        ]
      },
      { path: 'forms', component: () => import('../pages/Dashboard/FormsPage.vue') },
    ],
  },


  // Always leave this as last one,
  // but you can also remove it
  {
    name: '404',
    path: '/:catchAll(.*)*',
    component: () => import('pages/ErrorNotFound.vue'),
  },
];

export default routes;
