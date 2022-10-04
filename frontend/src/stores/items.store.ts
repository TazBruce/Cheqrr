import { Item } from 'src/types/Item';
import { defineStore } from 'pinia';
import { db } from 'boot/firebase';
import { DocumentData, collection, getDocs, CollectionReference } from 'firebase/firestore';
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
      this.items = (await getDocs(itemsCollection)).docs.map((doc) => doc.data());
      console.log(this.items);
    },

    /**
     * Adds an item to the store
     */
    addItem(item: Item) {
      this.items.push(item);
    },
  },
  persist: true
});
