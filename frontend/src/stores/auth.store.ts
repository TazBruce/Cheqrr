import { defineStore } from 'pinia';
import { auth } from 'boot/firebase';
import {
  signOut,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from 'firebase/auth';
import { User } from '../types/User';

/**
 * The auth store.
 */
export const useAuth = defineStore({
  id: 'auth',
  state: () => ({
    user: {} as User,
    isLoggedIn: false as boolean,
  }),
  getters: {},
  actions: {

    /**
     * Registers the user.
     * @param email The email of the user
     * @param password The password of the user
     */
    async register(email: string, password: string) {
      createUserWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
          this.user = userCredential.user;
          this.isLoggedIn = true;
          this.router.push('/dashboard');
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
      signInWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
          this.user = userCredential.user;
          this.isLoggedIn = true;
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
          this.user = {} as User;
          this.isLoggedIn = false;
          alert('Signed out!');
        })
        .catch((error) => {
          alert(error.message);
        });
    },
  },
  persist: true,
});
