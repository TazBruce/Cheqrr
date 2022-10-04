export enum ItemStatus {
  available = 'available',
  underMaintenance = 'underMaintenance',
  damaged = 'damaged',
  unavailable = 'unavailable',
}

export type Item = {
  id: string;
  name: string;
  description: string;
  status: ItemStatus;
  image: string;
  information: Map<string, string | boolean | number | Date>
}

