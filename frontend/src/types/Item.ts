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

