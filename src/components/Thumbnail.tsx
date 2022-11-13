import { useContext } from 'react'
import { HireContext } from 'src/components/context/HireContext'
import Job from 'src/components/common/Job'
import styles from 'styles/thumbnail.module.css'

const Thumbnail = () => {
  // job contexts
  const { jobTitle, companyName, jobArea, date } = useContext(HireContext)

  return (
    <div className={styles.thumbnail}>
      <Job letter={companyName[0]} date={date} title={jobTitle} company={companyName} location={jobArea} />
    </div>
  )
}

export default Thumbnail
