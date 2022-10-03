import {defineStore} from 'pinia';
import {auth, db} from 'boot/firebase';
import {createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut, User} from 'firebase/auth';
import {deleteDoc, doc, getDoc, setDoc} from 'firebase/firestore';
import {Role, RoleType} from 'src/types/Role';

type State = {
  role: Role | null;
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
     * Registers the user.
     * @param email The email of the user
     * @param password The password of the user
     */
    async register(email: string, password: string) {
      await createUserWithEmailAndPassword(auth, email, password)
        .then(async (userCredential) => {
          this.user = userCredential.user;
          this.isLoggedIn = true;
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
        .then(async (userCredential) => {
          await getRole(userCredential.user.uid).then((userRole) => {
            if (userRole != undefined) {
              this.role = {
                orgID: userRole.orgID,
                role: userRole.role
              };
            }
            this.user = userCredential.user;
            this.isLoggedIn = true;
            this.router.push('/dashboard');
            alert('Signed in!');
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
          this.user = null;
          this.role = null;
          this.isLoggedIn = false;
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
      const orgRef = doc(db, 'organisations');
      await setDoc(orgRef, {
        name: orgName,
      }).then(() => {
        this.role = {
          orgID: orgRef.id,
          role: RoleType.Admin,
        }
        alert('Created organisation!');
        this.router.push('/dashboard');
        return;
      }).catch(() => {
        alert('Failed to create organisation!');
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
      await deleteDoc(doc(db, 'roles', this.user?.uid as string));
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
