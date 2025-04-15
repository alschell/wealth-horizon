
export interface JobPosition {
  id: string;
  title: string;
  department: string;
  location: string;
  type: string;
  description: string;
  requirements: string[];
  responsibilities: string[];
  benefits: string[];
  salary?: {
    min: number;
    max: number;
    currency: string;
  };
  postedDate: string;
  applicationDeadline?: string;
}
