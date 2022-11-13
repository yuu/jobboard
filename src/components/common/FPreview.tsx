import { useContext, useEffect } from 'react'
import { JobContext } from 'src/components/context/JobContext'
import { HireContext } from 'src/components/context/HireContext'
import Preview from 'src/components/Preview'

interface FPreviewProps {
  id: number
}

const FPreview = ({ id }: FPreviewProps) => {
  // job contexts
  const { setJobTitle, setJobType, setJobArea, setJobDescription, setJobLink } = useContext(HireContext)

  // company contexts
  const { setCompanyName, setCompanyEmail, setCompanyWebsite, setCompanyDescription } = useContext(HireContext)

  const { jobs } = useContext(JobContext)

  useEffect(() => {
    let index = 0
    for (let i = 0; i < jobs.length; i++) {
      if (jobs[i].id === id) {
        index = i
        break
      }
    }
    const data = jobs[index]

    setJobTitle(data.jobTitle)
    setJobType(data.jobType)
    setJobArea(data.jobArea)
    setJobDescription(data.jobDescription)
    setJobLink(data.jobLink)
    setCompanyName(data.companyName)
    setCompanyEmail(data.companyEmail)
    setCompanyWebsite(data.companyWebsite)
    setCompanyDescription(data.companyDescription)
  }, [])

  return <Preview mainPreview={true} />
}

export default FPreview
