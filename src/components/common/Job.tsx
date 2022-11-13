import { useState } from 'react'
import Image from 'next/image'
import FPreview from './FPreview'
import Initial from './Initial'
import styles from 'styles/job.module.css'

const Job = ({ letter, title, date, company, location, id, isPreview = true }) => {
  const [showJob, setShowJob] = useState(false)

  /**
   *
   *
   * show preview
   */
  const showPreview = () => {
    if (isPreview) showJob ? setShowJob(false) : setShowJob(true)
  }

  return (
    <>
      <div className={styles.container} onClick={showPreview}>
        <div className={styles.initial_wrapper}>
          <Initial letter={letter} />
        </div>
        <div className={styles.job_info}>
          <div className={styles.title_wrapper}>
            <p className={styles.title}>{title}</p>
            <p className={styles.date}>{date}</p>
          </div>
          <p className={styles.company}>{company}</p>
          <p className={styles.location}>
            {' '}
            <Image src='/location.png' alt='location' width={14} height={14} /> {location}
          </p>
        </div>
      </div>
      {showJob && <FPreview id={id} />}
    </>
  )
}

export default Job
