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
  information: Record<string, unknown>;
}

/**
 * Converts a firebase map into a list of objects
 * @param obj The object to convert
 */
export function getObjectList(obj: Record<string, unknown> | unknown): Record<string, unknown>[] {
  if (obj) {
    return Object.keys(obj).map((key) => {
      return {
        key,
        value: obj[key as keyof typeof obj]
      };
    });
  } else {
    return [];
  }
}

/**
 * Get the image url
 * @param image The image
 */
export function getImgUrl(image: string): string {
  return image !== '' ? image : 'https://via.placeholder.com/150x150/cccccc/969696?text=PLACEHOLDER';
}

/**
 * Get item status color
 * @param status The status
 */
export function getItemStatusColor(status: string): string {
  if (status === 'Available') {
    return 'bg-positive';
  } else if (status === 'Maintenance') {
    return 'bg-warning';
  } else {
    return 'bg-negative';
  }
}

