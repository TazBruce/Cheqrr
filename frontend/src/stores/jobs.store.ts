import {Job, JobStatus} from 'src/types/Job';
import {defineStore} from 'pinia';
import {db} from 'boot/firebase';
import {collection, CollectionReference, doc, DocumentData, getDocs, setDoc, deleteDoc} from 'firebase/firestore';
import {useAuthStore} from 'stores/auth.store';

type State = {
  jobs: Job[];
}

const createCollection = <T = DocumentData>(collectionName: string) => {
  return collection(db, collectionName) as CollectionReference<T>;
}

export const useJobsStore = defineStore({
  id: 'jobs',
  state: (): State => ({
    jobs: [] as Job[]
  }),
  actions: {
    /**
     * Fetches all jobs from Firebase
     */
    async fetchJobs() {
      if (useAuthStore().organisation === null) {
        return;
      }
      const jobsCollection = createCollection<Job>('organisations/' + useAuthStore().organisation + '/jobs');
      this.jobs = (await getDocs(jobsCollection)).docs.map((doc) => {
        const job = doc.data();
        job.id = doc.id;
        return job;
      });
    },

    /**
     * Get a job from the store
     */
    getJob(id: string): Job | undefined {
      return this.jobs.find((job) => job.id === id);
    },

    /**
     * A helper function to update a job in Firebase
     */
    async updateJob(job: Job) {
      if (useAuthStore().organisation === null) {
        return;
      }
      const jobsCollection = createCollection<Job>('organisations/' + useAuthStore().organisation + '/jobs');
      let jobDoc;
      let isUpdate = false;
      if (job.id == '') {
        jobDoc = doc(jobsCollection);
        job.id = jobDoc.id;
      } else {
        jobDoc = doc(jobsCollection, job.id);
        isUpdate = true;
      }
      await setDoc(jobDoc, job);
      if (!isUpdate) {
        this.jobs.push(job);
      }
    },

    /**
     * A helper function to delete a job from Firebase
     */
    async deleteJob(job: Job) {
      if (useAuthStore().organisation === null) {
        return;
      }
      const jobsCollection = createCollection<Job>('organisations/' + useAuthStore().organisation + '/jobs');
      await deleteDoc(doc(jobsCollection, job.id));
      this.jobs = this.jobs.filter((j) => j.id !== job.id);
    },

    /**
     * A helper function to update a job's status in Firebase
     */
    async updateJobStatus(job: Job, status: JobStatus) {
      if (useAuthStore().organisation === null) {
        return;
      }
      const jobsCollection = createCollection<Job>('organisations/' + useAuthStore().organisation + '/jobs');
      await setDoc(doc(jobsCollection, job.id), {
        status: status
      }, {merge: true});
      job.status = status;
    }
  },
  persist: true
});
