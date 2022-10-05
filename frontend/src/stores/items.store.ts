import { Item } from 'src/types/Item';
import { defineStore } from 'pinia';
import { db } from 'boot/firebase';
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
     */
    addItem(item: Item) {
      this.items.push(item);
    },

    /**
     * Get an item from the store
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
      if (item === undefined) {
        return;
      }
      delete item.information[informationKey];
      await updateItem(item);
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
