import { useState, createContext, ReactNode, Dispatch } from 'react'

const AuthContext = createContext({
  user: '',
  setUser: (() => undefined) as Dispatch<any>,
  email: '',
  setEmail: (() => undefined) as Dispatch<any>,
  password: '',
  setPassword: (() => undefined) as Dispatch<any>,
  emailErr: '',
  setEmailErr: (() => undefined) as Dispatch<any>,
  passwordErr: '',
  setPasswordErr: (() => undefined) as Dispatch<any>,
  isOrg: 'true',
  setIsOrg: (() => undefined) as Dispatch<string>,
  hasSignedIn: false,
  setHasSignedIn: (() => undefined) as Dispatch<any>
})

interface AuthProviderProps {
  children: ReactNode
}

const AuthProvider = ({ children }: AuthProviderProps) => {
  const [user, setUser] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [emailErr, setEmailErr] = useState('')
  const [passwordErr, setPasswordErr] = useState('')
  const [isOrg, setIsOrg] = useState('true')
  const [hasSignedIn, setHasSignedIn] = useState(false)

  return (
    <AuthContext.Provider
      value={{
        user,
        setUser,
        email,
        setEmail,
        password,
        setPassword,
        emailErr,
        setEmailErr,
        passwordErr,
        setPasswordErr,
        isOrg,
        setIsOrg,
        hasSignedIn,
        setHasSignedIn
      }}
    >
      {children}
    </AuthContext.Provider>
  )
}

export { AuthContext, AuthProvider }
