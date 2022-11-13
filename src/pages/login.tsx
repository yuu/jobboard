import { useEffect, useContext, useCallback } from 'react'
import { useRouter } from 'next/router'
import { AuthContext } from 'src/components/context/AuthContext'
import Input from 'src/components/common/Input'
import HelperMsg from 'src/components/common/HelperMsg'
import Button from 'src/components/common/Button'
import styles from 'styles/auth.module.css'
import fire from 'src/utils/firebase'
import { FirebaseError } from '@firebase/app'
import { getAuth, signInWithEmailAndPassword, onAuthStateChanged } from 'firebase/auth'

const Login = () => {
  const { setUser } = useContext(AuthContext)
  const { email, setEmail } = useContext(AuthContext)
  const { password, setPassword } = useContext(AuthContext)
  const { emailErr, setEmailErr } = useContext(AuthContext)
  const { passwordErr, setPasswordErr } = useContext(AuthContext)
  const { setHasSignedIn, hasSignedIn } = useContext(AuthContext)
  const router = useRouter()

  const clearErrs = () => {
    setEmailErr('')
    setPasswordErr('')
  }

  const handleLogin = async () => {
    clearErrs()
    const auth = getAuth(fire)

    try {
      await signInWithEmailAndPassword(auth, email, password)
      setHasSignedIn(true)
      localStorage.setItem('hasSignedIn', 'true')
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

  const authListener = useCallback(() => {
    const auth = getAuth(fire)
    onAuthStateChanged(auth, user => {
      if (user) {
        setUser(user)
      } else {
        setUser('')
      }
    })
  }, [setUser])

  useEffect(() => {
    authListener()
    if (hasSignedIn) {
      router.push('/dashboard')
    }
  }, [authListener, router, hasSignedIn])

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
