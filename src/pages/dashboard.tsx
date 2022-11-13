import { useState, useEffect, useContext } from 'react'
import { useRouter } from 'next/router'
import Image from 'next/image'
import Job from 'src/components/common/Job'
import { AuthContext } from 'src/components/context/AuthContext'
import { JobContext } from 'src/components/context/JobContext'
import styles from 'styles/dashboard.module.css'
import fire from 'src/utils/firebase'
import { getFirestore, doc, onSnapshot, updateDoc } from 'firebase/firestore'

const Dashbaord = () => {
  const { email, setHasSignedIn, setIsOrg: flag } = useContext(AuthContext)
  const { jobs, setJobs, userJobs, setUserJobs } = useContext(JobContext)
  const [isOrg, setIsOrg] = useState(false)
  const [orgMsg, setOrgMsg] = useState('')
  const [usrMsg, setUsrMsg] = useState('')
  const router = useRouter()
  const db = getFirestore(fire)

  useEffect(() => {
    if (email === '') {
      return
    }
    if (typeof window !== undefined) {
      const hasSignedIn = localStorage.getItem('hasSignedIn')

      if (hasSignedIn === 'false') {
        router.push('/')
      } else {
        const eml = localStorage.getItem('email') ?? 'eml'

        setOrgMsg('Loading...')
        setUsrMsg('Loading...')
        const docRef = doc(db, 'users', eml)
        onSnapshot(docRef, snapshot => {
          const org = snapshot?.data()?.isOrg
          const jobs = snapshot?.data()?.jobList

          setIsOrg(org)
          flag(org)
          setUserJobs(jobs)
          setOrgMsg('No jobs from your organization has been posted yet.')
          setUsrMsg('You have not applied to any jobs yet...')
        })

        setHasSignedIn(true)
      }
    }
  }, [email])

  /**
   *
   *
   *	delete job
   */
  const handleDelete = async (id: number) => {
    let firstIndex, secondIndex
    for (let i = 0; i < userJobs.length; i++) {
      if (userJobs[i].id === id) {
        firstIndex = i
        break
      }
    }

    for (let i = 0; i < jobs.length; i++) {
      if (jobs[i]?.id === id) {
        secondIndex = i
        break
      }
    }

    const newState = [...userJobs]
    newState.splice(firstIndex ?? 0, 1)

    const newJobState = [...jobs]
    newJobState.splice(secondIndex ?? 0, 1)

    try {
      const eml = localStorage.getItem('email') ?? 'eml'
      await updateDoc(doc(db, 'users', eml), { jobList: newState })
      await updateDoc(doc(db, 'jobs', 'jobsDocument'), { allJobs: newJobState })

      setUserJobs(newState)
      setJobs(newJobState)
    } catch (err) {
      console.error(err)
    }
  }

  return (
    <div className={styles.container}>
      <div className={styles.subcontainer_1}>
        <div className={styles.btn}>
          {!isOrg && <button>Applied Jobs</button>}
          {isOrg && <button>Posted Jobs</button>}
        </div>
      </div>
      <div className={styles.subcontainer_2}>
        <div className={styles.job_listing}>
          {isOrg ? (
            <div className={styles.org_jobs}>
              {userJobs.length > 0 ? (
                userJobs.map(job => {
                  return (
                    <div className={styles.job_list} key={job.id}>
                      <Job
                        letter={job.companyName[0]}
                        title={job.jobTitle}
                        date={job.date}
                        company={job.companyName}
                        location={job.jobArea}
                        id={job.id}
                        isPreview={false}
                      />
                      <div className={styles.image} onClick={() => handleDelete(job.id)}>
                        <Image src='/delete.png' alt='delete' width={512} height={512} />
                      </div>
                    </div>
                  )
                })
              ) : (
                <h2 className={styles.notice}>{orgMsg}</h2>
              )}
            </div>
          ) : (
            <div className={styles.org_jobs}>
              {userJobs.length > 0 ? (
                userJobs.map(job => {
                  return (
                    <div key={job.id} className={styles.job_list}>
                      <Job
                        letter={job.companyName[0]}
                        title={job.jobTitle}
                        date={job.date}
                        company={job.companyName}
                        location={job.jobArea}
                        isPreview={false}
                        id={job.id}
                      />
                    </div>
                  )
                })
              ) : (
                <h2 className={styles.notice}>{usrMsg}</h2>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

export default Dashbaord
