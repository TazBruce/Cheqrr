export type Job = {
  id: string;
  itemID: string;
  title: string;
  description: string;
  status: JobStatus;
  jobType: JobType;
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
