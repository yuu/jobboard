import { useContext, useEffect } from 'react'
import type { NextPage } from 'next'
import Load from 'src/components/common/Load'
import Jobs from 'src/components/Jobs'
import { JobContext } from 'src/components/context/JobContext'
import fire from 'src/utils/firebase'
import { getFirestore, doc, onSnapshot } from 'firebase/firestore'

const Home: NextPage = () => {
  const { jobs, setJobs } = useContext(JobContext)

  useEffect(() => {
    const db = getFirestore(fire)

    if (jobs.length < 1) {
      const docRef = doc(db, 'jobs', 'jobsDocument')
      onSnapshot(docRef, snapshot => {
        const job = snapshot?.data()?.allJobs
        if (job === undefined) {
          setJobs([])

          return
        }
        setJobs(job)
      })
    }
  }, [])

  return <>{(jobs.length > 0 && <Jobs label='All the Developer Jobs' jobs={jobs} />) || <Load />}</>
}

export default Home
