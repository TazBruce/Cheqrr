import {defineStore} from 'pinia';
import {auth, db} from 'boot/firebase';
import {createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut, User} from 'firebase/auth';
import {deleteDoc, doc, getDoc, setDoc, addDoc, collection} from 'firebase/firestore';
import {Role, RoleType} from 'src/types/Role';
import {useItemsStore} from 'stores/items.store';
import {useJobsStore} from 'stores/jobs.store';

type State = {
  role: Role | null;
  username: string | null;
  user: User | null;
  isLoggedIn: boolean;
}

/**
 * The auth store.
 */
export const useAuthStore = defineStore({
  id: 'auth',
  state: (): State => ({
    role: null,
    username: null,
    user: null,
    isLoggedIn: false
  }),
  getters: {
    organisation: (state) => {
      if (state.role === null) {
        return null;
      }
      return state.role.orgID;
    }
  },
  actions: {
    /**
     * Gets the invite code for the organisation.
     */
    async getInviteCode() {
      if (this.role === null) {
        return '';
      }
      const org = await getDoc(doc(db, 'organisations', this.role.orgID));
      if (org.exists()) {
        return org.data()?.inviteCode;
      }
      return '';
    },

    /**
     * Registers the user.
     * @param username The username
     * @param email The email of the user
     * @param password The password of the user
     */
    async register(username: string, email: string, password: string) {
      await createUserWithEmailAndPassword(auth, email, password)
        .then(async (userCredential) => {
          await setDoc(doc(db, 'users', userCredential.user.uid), {
            username,
          }).then(() => {
            this.username = username;
            this.user = userCredential.user;
            this.isLoggedIn = true;
            this.router.push('/setup');
            alert('Registered!');
          });
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
        .then(async (userCredential) => {
          await getRole(userCredential.user.uid).then(async (userRole) => {
            if (userRole != undefined) {
              this.role = {
                orgID: userRole.orgID,
                role: userRole.role
              };
              await useItemsStore().fetchItems();
              await useJobsStore().fetchJobs();
            }
          }).finally(async() => {
            await getDoc(doc(db, 'users', userCredential.user.uid)).then(async (userDoc) => {
              if (userDoc.exists()) {
                this.username = userDoc.data().username;
                this.user = userCredential.user;
                this.isLoggedIn = true;
                this.router.push('/dashboard');
                alert('Signed in!');
              }
            });
          });
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
          useItemsStore().$reset();
          useJobsStore().$reset();
          this.$reset();
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
      if (this.user === null) {
        alert('You must be logged in to join an organisation.');
        return;
      }
      if (this.organisation != null) {
        alert('You are already in an organisation!');
        return;
      }
      const inviteSnap = await getDoc(doc(db, 'invite-codes', inviteCode))
      if (!inviteSnap.exists()) {
        alert('Invalid invite code!');
        return;
      }
      const invite = inviteSnap.data();
      if (invite == null || invite.orgID == null) {
        alert('Invalid invite code!');
        return;
      }
      await setDoc(doc(db, 'roles', this.user?.uid as string), {
        orgID: invite.orgID,
        role: 'Reporter',
      });
      this.role = {
        orgID: invite.orgID,
        role: RoleType.Reporter,
      }
      await useItemsStore().fetchItems();
      await useJobsStore().fetchJobs();
      alert('Joined organisation!');
      this.router.push('/dashboard');
    },

    /**
     * Creates an organisation.
     * @param orgName The name of the organisation
     */
    async createOrganisation(orgName: string) {
      if (this.user === null) {
        alert('You must be logged in to create an organisation.');
        return;
      }
      if (this.organisation != null) {
        alert('You are already in an organisation!');
        return;
      }
      const orgRef = collection(db, 'organisations');
      await addDoc(orgRef, {
        name: orgName,
        owner: this.user?.uid as string,
      }).then((docRef) => {
        this.role = {
          orgID: docRef.id,
          role: RoleType.Owner,
        }
        alert('Created organisation!');
        this.router.push('/dashboard');
        return;
      }).catch((reason) => {
        alert('Failed to create organisation!: ' + reason);
        return;
      });
    },

    /**
     * Leaves the organisation.
     */
    async leaveOrganisation() {
      if (this.organisation == null) {
        alert('You are not in an organisation!');
        return;
      }
      useItemsStore().$reset();
      useJobsStore().$reset();
      await deleteDoc(doc(db, 'roles', this.user?.uid as string));
      this.role = null;
      this.router.push('/dashboard');
      alert('Left organisation!');
    }
  },
  persist: true,
});

/**
 * Gets the role of the user.
 * @param userID The user ID
 */
async function getRole(userID: string) {
  const roleDoc = await getDoc(doc(db, 'roles', userID));
  if (!roleDoc.exists()) {
    console.log('Failed to get role');
    return;
  }
  return roleDoc.data();
}
