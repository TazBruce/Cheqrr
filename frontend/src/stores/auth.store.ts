import { defineStore } from 'pinia';
import { auth } from 'boot/firebase';
import {
  signOut,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from 'firebase/auth';
import { useAuth } from '@vueuse/firebase/useAuth';

const { isAuthenticated, user } = useAuth(auth);

/**
 * The auth store.
 */
export const useAuthStore = defineStore({
  id: 'auth',
  state: () => ({
    organisation: null as string | null,
  }),
  getters: {
    isLoggedIn: () => isAuthenticated.value,
    user: () => user.value,
  },
  actions: {

    /**
     * Registers the user.
     * @param email The email of the user
     * @param password The password of the user
     */
    async register(email: string, password: string) {
      await createUserWithEmailAndPassword(auth, email, password)
        .then(() => {
          this.router.push('/setup');
          alert('Registered!');
        })
        .catch((error) => {
          alert(error.message);
        });
    },

    /**
     * Logs the user in.
     * @param email The email of the user
     * @param password The password of the user
     */
    async signIn(email: string, password: string) {
      await signInWithEmailAndPassword(auth, email, password)
        .then(() => {
          this.router.push('/dashboard');
          alert('Signed in!');
        })
        .catch((error) => {
          alert(error.message);
        });
    },

    async signOut() {
      signOut(auth)
        .then(() => {
          this.organisation = null;
          this.router.replace('/');
          alert('Signed out!');
        })
        .catch((error) => {
          alert(error.message);
        });
    },
  },
  persist: true,
});
