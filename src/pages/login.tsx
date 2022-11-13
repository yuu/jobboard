import { useEffect, useContext } from 'react'
import { useRouter } from 'next/router'
import { AuthContext } from 'src/components/context/AuthContext'
import { JobContext } from 'src/components/context/JobContext'
import Input from 'src/components/common/Input'
import HelperMsg from 'src/components/common/HelperMsg'
import Button from 'src/components/common/Button'
import styles from 'styles/auth.module.css'
import fire from 'src/utils/firebase'
import { FirebaseError } from '@firebase/app'
import { getAuth, signInWithEmailAndPassword, createUserWithEmailAndPassword, onAuthStateChanged } from 'firebase/auth'
import { getFirestore, doc, setDoc } from 'firebase/firestore'

const Login = () => {
  const { user, setUser } = useContext(AuthContext)
  const { email, setEmail } = useContext(AuthContext)
  const { password, setPassword } = useContext(AuthContext)
  const { emailErr, setEmailErr } = useContext(AuthContext)
  const { passwordErr, setPasswordErr } = useContext(AuthContext)
  const { setHasSignedIn, hasSignedIn } = useContext(AuthContext)
  const { setIsOrg } = useContext(AuthContext)
  const { userJobs, setUserJobs } = useContext(JobContext)
  const router = useRouter()

  /**
   *
   *
   * reset values ofo inputs to empty string
   */
  const clearInput = () => {
    setEmail('')
    setPassword('')
  }

  /**
   *
   *
   * reset values of errors to empty string
   */
  const clearErrs = () => {
    setEmailErr('')
    setPasswordErr('')
  }

  /**
   *
   *
   * logs in the systems
   */
  const handleLogin = async () => {
    clearErrs()
    const auth = getAuth(fire)

    try {
      await signInWithEmailAndPassword(auth, email, password)
      setHasSignedIn(true)
      localStorage.setItem('hasSignedIn', true)
      localStorage.setItem('email', email)
      router.push('/dashboard')
    } catch (err) {
      if (err instanceof FirebaseError) {
        const { code, message } = err

        if (code === 'auth/invalid-email' || code === 'auth/user-disabled' || code === 'auth/user-not-found') {
          setEmailErr(message)
        }

        if (code === 'auth/wrong-password') {
          setPasswordErr(message)
        }
      }
    }
  }

  /**
   *
   *
   * checks where the user is logged in or not
   */
  const authListener = () => {
    const auth = getAuth(fire)
    onAuthStateChanged(auth, user => {
      if (user) {
        setUser(user)
      } else {
        setUser('')
      }
    })
  }

  useEffect(() => {
    authListener()
    if (hasSignedIn) {
      router.push('/dashboard')
    }
  }, [])

  return (
    <div className={styles.container}>
      <div className={styles.subcontainer}>
        <Input
          htmlFor='email'
          label='Email'
          type='email'
          autoFocus={true}
          value={email}
          handleOnChange={setEmail}
          err={emailErr}
        />
        <Input
          htmlFor='password'
          label='Password'
          type='password'
          value={password}
          handleOnChange={setPassword}
          err={passwordErr}
        />
        <Button label='Login' onClick={handleLogin} />
        <HelperMsg content="Don't have an account?" option='Sign Up' url='signup' />
      </div>
    </div>
  )
}

export default Login
