// src/image-generation/dto/job-status.dto.ts

export class JobStatusDto {
  jobId: string;
  jobStatus: 'PENDING' | 'PROCESSING' | 'COMPLETED' | 'FAILED' | 'NOT_FOUND';
  prompt?: string;
  createdAt?: string;
  s3ImageUrl?: string;
}