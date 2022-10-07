import {Item} from 'src/types/Item';
import {defineStore} from 'pinia';
import {db, storage} from 'boot/firebase';
import {getDownloadURL, ref, uploadString} from 'firebase/storage';
import {collection, CollectionReference, doc, DocumentData, getDocs, setDoc} from 'firebase/firestore';
import {useAuthStore} from 'stores/auth.store';

type State = {
  items: Item[]
}

const createCollection = <T = DocumentData>(collectionName: string) => {
  return collection(db, collectionName) as CollectionReference<T>;
}


export const useItemsStore = defineStore({
  id: 'items',
  state: (): State => ({
    items: [] as Item[]
  }),
  actions: {
    /**
     * Fetches all items from Firebase
     */
    async fetchItems() {
      if (useAuthStore().organisation === null) {
        return;
      }
      const itemsCollection = createCollection<Item>('organisations/' + useAuthStore().organisation + '/items');
      this.items = (await getDocs(itemsCollection)).docs.map((doc) => {
        const item = doc.data();
        item.id = doc.id;
        return item;
      });
    },

    /**
     * Get an item from the store
     * @param id The id of the item to get
     */
    getItem(id: string): Item | undefined {
      return this.items.find((item) => item.id === id);
    },

    /**
     * A helper function to update an item in Firebase
     * @param item The item to update
     * @param image The base64 of an image to upload (optional)
     */
    async updateItem(item: Item, image?: string) {
      if (useAuthStore().organisation === null) {
        return;
      }
      const itemsCollection = createCollection<Item>('organisations/' + useAuthStore().organisation + '/items');
      let itemDoc;
      let isUpdate = false;
      if (item.id == '') {
        itemDoc = doc(itemsCollection);
        item.id = itemDoc.id;
      } else {
        isUpdate = true;
        itemDoc = doc(itemsCollection, item.id);
      }
      if (image !== undefined && image !== '') {
        await this.uploadImage(item.id, image);
      }
      await setDoc(itemDoc, item, {merge: true}).then(() => {
        if (!isUpdate) {
          this.items.push(item);
        } else {
          const index = this.items.findIndex((i) => i.id === item.id);
          this.items[index] = item;
        }
        this.router.back();
      });
    },

    /**
     * Deletes an information property from a given item
     * @param itemID The ID of the item
     * @param informationKey The key of the information property
     */
    async deleteInformation(itemID: string, informationKey: string) {
      const item = this.getItem(itemID);
      if (item === undefined || informationKey === '' ) {
        return;
      }
      delete item.information[informationKey];
      await this.updateItem(item);
    },

    /**
     * Updates an information property of a given item
     * @param itemID The ID of the item
     * @param informationKey The key of the information property
     * @param informationValue The value of the information property
     */
    async updateInformation(itemID: string, informationKey: string, informationValue: string) {
      const item = this.getItem(itemID);
      if (item === undefined || informationKey === '' || informationValue === '') {
        return;
      }
      item.information[informationKey] = informationValue;
      await this.updateItem(item);
    },

    /**
     * Uploads an image to Firebase
     * @param itemID The ID of the item
     * @param image The base64 of an image to upload
     */
    async uploadImage(itemID: string, image: string | undefined) {
      if (image === undefined) {
        return;
      }
      const metadata = {
        cacheControl: 'public, max-age=31536000',
        contentType: 'image/png',
        name: itemID
      }
      const storageRef = ref(storage, `organisations/${useAuthStore().organisation}/items/${itemID}`);
      await uploadString(storageRef, image, 'base64', metadata);
    },

    /**
     * Gets the image url of an item
     */
    async getImageUrl(itemID: string | undefined): Promise<string> {
      const storageRef = ref(storage, `organisations/${useAuthStore().organisation}/items/${itemID}`);
      return getDownloadURL(storageRef);
    }
  },
  persist: true
});
