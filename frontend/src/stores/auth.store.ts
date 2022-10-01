import { defineStore } from 'pinia';
import { auth, db } from 'boot/firebase';
import {
  signOut,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from 'firebase/auth';
import { doc, deleteDoc, setDoc } from 'firebase/firestore';
import { useAuth } from '@vueuse/firebase/useAuth';
import { useFirestore } from '@vueuse/firebase/useFirestore';

const { isAuthenticated, user } = useAuth(auth);

/**
 * The auth store.
 */
export const useAuthStore = defineStore({
  id: 'auth',
  state: () => ({}),
  getters: {
    isLoggedIn: () => isAuthenticated.value,
    user: () => user.value,
    organisation: () => {
      const org = useFirestore(doc(db, 'roles', user.value?.uid as string)).value;
      if (org) {
        return org
      }
      return null;
    }
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

    /**
     * Logs the user out.
     */
    async signOut() {
      signOut(auth)
        .then(() => {
          this.router.replace('/');
          alert('Signed out!');
        })
        .catch((error) => {
          alert(error.message);
        });
    },

    /**
     * Checks firestore to see if there is an organisation with the given invite code.
     * Joins the organisation if there is.
     * @param inviteCode The invite code
     */
    async joinOrganisation(inviteCode: string) {
      if (this.organisation != null) {
        alert('You are already in an organisation!');
        return;
      }
      const invite = await queryInviteCode(inviteCode);
      if (invite == null || invite.organisation == null) {
        alert('Invalid invite code!');
        return;
      }
      await setDoc(doc(db, 'roles', this.user?.uid as string), {
        orgID: invite.organisation,
        role: 'Worker',
      });
      alert('Joined organisation!');
    },

    async leaveOrganisation() {
      if (this.organisation == null) {
        alert('You are not in an organisation!');
        return;
      }
      await deleteDoc(doc(db, 'roles', this.user?.uid as string));
      alert('Left organisation!');
    }
  },
  persist: true,
});

/**
 * Queries the database for a given invite code.
 * @param inviteCode The invite code
 */
async function queryInviteCode(inviteCode: string) {
  const invite = await useFirestore(doc(db, 'invite-codes', inviteCode));
  return invite.value;
}
