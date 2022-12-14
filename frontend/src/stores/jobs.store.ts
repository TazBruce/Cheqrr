import {Comment, Job, JobStatus} from 'src/types/Job';
import {defineStore} from 'pinia';
import {db, storage} from 'boot/firebase';
import {collection, CollectionReference, doc, DocumentData, getDocs, setDoc, deleteDoc} from 'firebase/firestore';
import {ref, listAll, getDownloadURL, uploadString, deleteObject} from 'firebase/storage';
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
    getJob(id: string | undefined): Job | undefined {
      if (id === undefined) {
        return undefined;
      }
      return this.jobs.find((job) => job.id === id);
    },

    /**
     * Get all jobs for an item
     * @param itemId The id of the item
     */
    getJobsForItem(itemId: string | undefined): Job[] {
      if (itemId === undefined) {
        return [];
      }
      return this.jobs.filter((job) => job.item === itemId);
    },

    /**
     * A helper function to update a job in Firebase
     * @param job The job to update
     */
    async updateJob(job: Job | undefined) {
      if (useAuthStore().organisation === null || job === undefined) {
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
      return job.id;
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
     * Pulls all images from Firebase Storage that are associated with a job
     * @param jobID The ID of the job to pull images for
     * @returns An array of image URLs
     */
    async getJobImages(jobID: string) {
      if (useAuthStore().organisation === null || jobID === '') {
        return [];
      }
      const storageRef = ref(storage, `organisations/${useAuthStore().organisation}/jobs/${jobID}/`);
      const images = [];
      try {
        const list = await listAll(storageRef);
        for (const item of list.items) {
          images.push(await getDownloadURL(item));
        }
      } catch (e) {
        console.log(e);
      }
      return images;
    },

    /**
     * Adds an image to Firebase Storage that is associated with a job
     * @param jobID The ID of the job to add the image to
     * @param image The image to add
     * @param name The name of the image
     */
    async addJobImage(jobID: string, image: string, name: string) {
      if (useAuthStore().organisation === null || jobID === '' || image === '') {
        return;
      }
      const metadata = {
        cacheControl: 'public, max-age=31536000',
        contentType: 'image/png',
      }
      const storageRef = ref(storage, `organisations/${useAuthStore().organisation}/jobs/${jobID}/${name}`);
      await uploadString(storageRef, image, 'base64', metadata);
    },

    /**
     * Deletes an image from Firebase Storage that is associated with a job
     * @param jobID The ID of the job to delete the image from
     * @param url The URL of the image to delete
     */
    async deleteJobImage(jobID: string, url: string) {
      if (useAuthStore().organisation === null || jobID === '' || url === '') {
        return;
      }
      const storageRef = ref(storage, url);
      await deleteObject(storageRef);
    },

    /**
     * Adds a comment to a job
     * @param jobID The ID of the job to add the comment to
     * @param commentID The ID of the comment to update
     * @param comment The comment to add
     */
    async updateComment(jobID: string, commentID: number, comment: string) {
      const job = this.getJob(jobID);
      const authStore = useAuthStore();
      if (authStore.organisation === null || authStore.username === null || job === undefined || comment === '') {
        return;
      } else {
        const newComment: Comment = {
          comment: comment,
          author: authStore.username,
        }
        if (commentID === -1) {
          job.comments.push(newComment);
        } else {
          job.comments[commentID] = newComment;
        }
        await this.updateJob(job);
      }
    },

    /**
     * Deletes a comment from a job
     */
    async deleteComment(jobID: string, commentID: number) {
      const job = this.getJob(jobID);
      if (job === undefined || job.comments[commentID] === undefined) {
        return;
      } else {
        job.comments.splice(commentID, 1);
        await this.updateJob(job);
      }
    }
  },
  persist: true
});
