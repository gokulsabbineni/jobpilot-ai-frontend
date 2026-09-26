export interface Job {
    id: string;
    company: string;
    title: string;
    location: string;
    remote: boolean;
    salary?: string;
    postedAt: string;
    status?: string;
  }