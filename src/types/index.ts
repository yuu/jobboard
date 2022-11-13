export interface Job {
  id: number
  companyDescription: string
  companyEmail: string
  companyName: string
  companyWebsite: string
  date: string
  jobArea: string
  jobDescription: string
  jobLink: string
  jobTitle: string
  jobType: string
}

export type JobList = Array<Job>
