import {Job, JobStatus} from 'src/types/Job';
import {defineStore} from 'pinia';
import {db, storage} from 'boot/firebase';
import {collection, CollectionReference, doc, DocumentData, getDocs, setDoc, deleteDoc} from 'firebase/firestore';
import {ref, listAll, getDownloadURL} from 'firebase/storage';
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
     * @param id The id of the job
     */
    getJob(id: string): Job | undefined {
      return this.jobs.find((job) => job.id === id);
    },

    /**
     * A helper function to update a job in Firebase
     * @param job The job to update
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
     * @param jobID The ID of the job to delete
     */
    async deleteJob(jobID?: string) {
      if (useAuthStore().organisation === null || jobID === undefined) {
        return;
      }
      const jobsCollection = createCollection<Job>('organisations/' + useAuthStore().organisation + '/jobs');
      await deleteDoc(doc(jobsCollection, jobID));
      this.jobs = this.jobs.filter((j) => j.id !== jobID);
    },

    /**
     * A helper function to update a job's status in Firebase
     * @param job The job to update
     * @param status The new status of the job
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
    },

    /**
     * Pulls all images from Firebase Storage that are associated with a job
     * @param jobID The ID of the job to pull images for
     * @returns An array of image URLs
     */
    async getJobImages(jobID: string) {
      if (useAuthStore().organisation === null || jobID === '') {
        return ['https://via.placeholder.com/150x150/cccccc/969696?text=PLACEHOLDER'];
      }
      const storageRef = ref(storage, `organisations/${useAuthStore().organisation}/jobs/${jobID}/`);
      const images: string[] = [];
      listAll(storageRef).then((res) => {
        res.items.forEach((itemRef) => {
          getDownloadURL(itemRef).then((url) => {
            images.push(url);
          });
        });
      }
      );
      if (images.length === 0) {
        return ['https://via.placeholder.com/150x150/cccccc/969696?text=PLACEHOLDER'];
      }
      return images;
    }
  },
  persist: true
});
