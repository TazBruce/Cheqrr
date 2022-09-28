import { route } from 'quasar/wrappers';
import {
  createMemoryHistory,
  createRouter,
  createWebHashHistory,
  createWebHistory,
} from 'vue-router';

import routes from './routes';
import { useAuth } from 'stores/auth.store';

/*
 * If not building with SSR mode, you can
 * directly export the Router instantiation;
 *
 * The function below can be async too; either use
 * async/await or return a Promise which resolves
 * with the Router instance.
 */

export default route(function (/* { store, ssrContext } */) {
  const createHistory = process.env.SERVER
    ? createMemoryHistory
    : (process.env.VUE_ROUTER_MODE === 'history' ? createWebHistory : createWebHashHistory);

  const Router = createRouter({
    scrollBehavior: () => ({ left: 0, top: 0 }),
    routes,

    // Leave this as is and make changes in quasar.conf.js instead!
    // quasar.conf.js -> build -> vueRouterMode
    // quasar.conf.js -> build -> publicPath
    history: createHistory(process.env.VUE_ROUTER_BASE),
  });

  Router.beforeEach(async  (to) => {
    console.log(to.path);
    const publicPages = ['/','/login', '/register'];
    const authRequired = !publicPages.includes(to.path);
    const authStore = useAuth();

    if (authRequired && !authStore.isLoggedIn) {
      return '/';
    } else if (!authRequired && authStore.isLoggedIn) {
      return '/dashboard';
    }
  })

  Router.afterEach((to, from) => {
    let toDepth = to.path.split('/').length;
    const fromDepth = from.path.split('/').length;
    if (to.path === '/') {
      toDepth = 0;
    }
    to.meta.entryTransitionName = toDepth < fromDepth ? 'slideInLeft' : 'slideInRight';
    to.meta.exitTransitionName = toDepth < fromDepth ? 'slideOutRight' : 'slideOutLeft';
  });

  return Router;
});
