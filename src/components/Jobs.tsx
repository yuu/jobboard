import Job from 'src/components/common/Job'
import styles from 'styles/jobs.module.css'
import { JobList } from 'src/types'

interface JobsProps {
  jobs: JobList
  label: string
}

const Jobs = ({ label, jobs }: JobsProps) => {
  return (
    <div className={styles.container}>
      <div className={styles.day}>
        <h2>{label}</h2>
      </div>
      <div className={styles.jobs}>
        {jobs.map(job => {
          return (
            <Job
              id={job.id}
              key={job.id}
              letter={job.companyName[0]}
              title={job.jobTitle}
              date={job.date}
              company={job.companyName}
              location={job.jobArea}
            />
          )
        })}
      </div>
    </div>
  )
}

export default Jobs
