export type Job = {
  id: string;
  item: string;
  title: string;
  description: string;
  status: JobStatus;
  jobType: JobType;
  comments: Comment[];
}

export type Comment = {
  id: string;
  comment: string;
  timestamp: Date;
  user: string;
}

export enum JobStatus {
  Open = 'Open',
  InProgress = 'In-progress',
  Completed = 'Completed',
}

export enum JobType {
  Issue = 'Issue',
  Service = 'Service',
  Inspection = 'Inspection',
}

/**
 * Get job status color
 * @param status The status
 */
export function getJobStatusColor(status: JobStatus): string {
  if (status === 'Open') {
    return 'bg-negative';
  } else if (status === 'In-progress') {
    return 'bg-warning';
  } else {
    return 'bg-positive';
  }
}
