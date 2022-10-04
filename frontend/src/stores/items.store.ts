import { Item } from 'src/types/Item';
import { defineStore } from 'pinia';

type State = {
  items: Item[]
}

export const useItemsStore = defineStore({
  id: 'items',
  state: (): State => ({
    items: []
  }),
  actions: {
    /**
     * Adds an item to the store
     */
    addItem(item: Item) {
      this.items.push(item);
    },
  },
  persist: true
});
