import { useState, createContext, ReactNode, Dispatch } from 'react'

const HireContext = createContext({
  jobTitle: '',
  setJobTitle: (() => undefined) as Dispatch<string>,
  jobType: 'Full-time',
  setJobType: (() => undefined) as Dispatch<string>,
  jobArea: '',
  setJobArea: (() => undefined) as Dispatch<string>,
  jobLink: '',
  setJobLink: (() => undefined) as Dispatch<string>,
  jobDescription: '',
  setJobDescription: (() => undefined) as Dispatch<string>,
  companyName: '',
  setCompanyName: (() => undefined) as Dispatch<string>,
  companyEmail: '',
  setCompanyEmail: (() => undefined) as Dispatch<string>,
  companyWebsite: '',
  setCompanyWebsite: (() => undefined) as Dispatch<string>,
  companyDescription: '',
  setCompanyDescription: (() => undefined) as Dispatch<string>,
  date: '',
  setDate: (() => undefined) as Dispatch<string>
})

interface HireProviderProps {
  children: ReactNode
}

const HireProvider = ({ children }: HireProviderProps) => {
  // job states
  const [jobTitle, setJobTitle] = useState('')
  const [jobType, setJobType] = useState('Full-time')
  const [jobArea, setJobArea] = useState('')
  const [jobLink, setJobLink] = useState('')
  const [jobDescription, setJobDescription] = useState('')
  const [date, setDate] = useState('')

  // company states
  const [companyName, setCompanyName] = useState('')
  const [companyEmail, setCompanyEmail] = useState('')
  const [companyWebsite, setCompanyWebsite] = useState('')
  const [companyDescription, setCompanyDescription] = useState('')

  return (
    <HireContext.Provider
      value={{
        jobTitle,
        setJobTitle,
        jobType,
        setJobType,
        jobArea,
        setJobArea,
        jobLink,
        setJobLink,
        jobDescription,
        setJobDescription,
        companyName,
        setCompanyName,
        companyEmail,
        setCompanyEmail,
        companyWebsite,
        setCompanyWebsite,
        companyDescription,
        setCompanyDescription,
        date,
        setDate
      }}
    >
      {children}
    </HireContext.Provider>
  )
}

export { HireContext, HireProvider }
