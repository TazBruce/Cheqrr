import { Item } from 'src/types/Item';
import { defineStore } from 'pinia';
import { db, storage } from 'boot/firebase';
import { ref, uploadString } from 'firebase/storage';
import { DocumentData, collection, getDocs, CollectionReference, doc, setDoc } from 'firebase/firestore';
import { useAuthStore } from 'stores/auth.store';

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
     * Adds an item to the store
     * @param item The item to add
     */
    addItem(item: Item) {
      this.items.push(item);
    },

    /**
     * Get an item from the store
     * @param id The id of the item to get
     */
    getItem(id: string): Item | undefined {
      return this.items.find((item) => item.id === id);
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
      await updateItem(item);
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
      await updateItem(item);
    },

    /**
     * Uploads an image to Firebase Storage and updates the image property of the given item
     * @param itemID The ID of the item
     * @param image The base64 of an image to upload
     */
    async uploadImage(itemID: string, image: string | undefined) {
      const item = this.getItem(itemID);
      if (item === undefined || image === undefined) {
        return;
      }
      const metadata = {
        contentType: 'image/jpeg',
        name: itemID
      }
      const storageRef = ref(storage, `organisations/${useAuthStore().organisation}/items/${itemID}`);
      await uploadString(storageRef, image, 'base64', metadata);
    }
  },
  persist: true
});

/**
 * A helper function to update an item in Firebase
 * @param item The item to update
 */
async function updateItem(item: Item) {
  const itemsCollection = createCollection<Item>('organisations/' + useAuthStore().organisation + '/items');
  const itemDoc = doc(itemsCollection, item.id);
  await setDoc(itemDoc, item);
}
