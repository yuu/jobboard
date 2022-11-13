import { useState, createContext, ReactNode, Dispatch } from 'react'
import { JobList } from 'src/types'

const JobContext = createContext({
  jobs: [] as JobList,
  setJobs: (() => undefined) as Dispatch<any>,
  individualJob: '',
  setIndividualJob: (() => undefined) as Dispatch<any>,
  userJobs: [] as JobList,
  setUserJobs: (() => undefined) as Dispatch<any>
})

interface JobProviderProps {
  children: ReactNode
}

const JobProvider = ({ children }: JobProviderProps) => {
  const [jobs, setJobs] = useState<JobList>([])
  const [individualJob, setIndividualJob] = useState('')
  const [userJobs, setUserJobs] = useState<JobList>([])

  return (
    <JobContext.Provider
      value={{
        jobs,
        setJobs,
        individualJob,
        setIndividualJob,
        userJobs,
        setUserJobs
      }}
    >
      {children}
    </JobContext.Provider>
  )
}

export { JobContext, JobProvider }
