export enum ItemStatus {
  available = 'Available',
  maintenance = 'Maintenance',
  flagged = 'Flagged',
  unavailable = 'Unavailable',
}

export type Item = {
  id: string;
  name: string;
  description: string;
  status: ItemStatus;
  image: string;
  information: Map<string, string | boolean | number | Date>
}

