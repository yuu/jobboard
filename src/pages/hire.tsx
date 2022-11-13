import { useState, useEffect, useContext } from 'react'
import { useRouter } from 'next/router'
import { HireContext } from 'src/components/context/HireContext'
import Form from 'src/components/Form'
import Preview from 'src/components/Preview'
import Thumbnail from 'src/components/Thumbnail'
import styles from 'styles/hire.module.css'

const Hire = () => {
  const [createJob, setCreateJob] = useState(`${styles.create_job} + ${styles.border}`)
  const [preview, setPreview] = useState(`${styles.preview}`)
  const [showForm, setShowForm] = useState(true)
  const [showPreview, setShowPreview] = useState(false)

  // job contexts
  const { setJobTitle } = useContext(HireContext)
  const { setJobType } = useContext(HireContext)
  const { setJobArea } = useContext(HireContext)
  const { setJobLink } = useContext(HireContext)
  const { setJobDescription } = useContext(HireContext)

  // company contexts
  const { setCompanyName } = useContext(HireContext)
  const { setCompanyEmail } = useContext(HireContext)
  const { setCompanyWebsite } = useContext(HireContext)
  const { setCompanyDescription } = useContext(HireContext)
  const router = useRouter()

  useEffect(() => {
    if (typeof window !== undefined) {
      const hasSignedIn = localStorage.getItem('hasSignedIn')
      console.log('a', hasSignedIn)

      if (hasSignedIn === 'false') {
        router.push('/')
      }
    }

    setJobTitle('')
    setJobType('')
    setJobArea('')
    setJobLink('')
    setJobDescription('')
    setCompanyName('')
    setCompanyEmail('')
    setCompanyWebsite('')
    setCompanyDescription('')
  }, [])

  /**
   *
   *
   * shows job creation seciton
   */
  const handleJobCreation = () => {
    setCreateJob(`${styles.create_job} ${styles.border}`)
    setPreview(`${styles.preview}`)
    setShowForm(true)
    setShowPreview(false)
  }

  /**
   *
   *
   * shows preview
   */
  const handlePreview = () => {
    setPreview(`${styles.preview} ${styles.border}`)
    setCreateJob(`${styles.create_job}`)
    setShowForm(false)
    setShowPreview(true)
  }

  return (
    <div className={styles.container}>
      <div className={styles.sub_container}>
        <div className={styles.tagline}>
          <h2>Hire Software Developers</h2>
          <h3>Post a Job Opening</h3>
        </div>
        <div className={styles.form}>
          <div className={styles.form_section_btns}>
            <div className={createJob} onClick={handleJobCreation}>
              <h3>Create Job</h3>
            </div>
            <div className={preview} onClick={handlePreview}>
              <h3>Preview</h3>
            </div>
          </div>
          {showForm && <Form onClick={handlePreview} />}
          {showPreview && <Preview />}
        </div>
      </div>
      <Thumbnail />
    </div>
  )
}

export default Hire
