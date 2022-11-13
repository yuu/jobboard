import { useEffect, useContext, useCallback } from 'react'
import { useRouter } from 'next/router'
import { AuthContext } from 'src/components/context/AuthContext'
import Input from 'src/components/common/Input'
import HelperMsg from 'src/components/common/HelperMsg'
import Button from 'src/components/common/Button'
import styles from 'styles/auth.module.css'
import fire from 'src/utils/firebase'
import { FirebaseError } from '@firebase/app'
import { getAuth, createUserWithEmailAndPassword, onAuthStateChanged } from 'firebase/auth'
import { getFirestore, doc, setDoc } from 'firebase/firestore'

const SignUp = () => {
  const { setUser } = useContext(AuthContext)
  const { email, setEmail } = useContext(AuthContext)
  const { password, setPassword } = useContext(AuthContext)
  const { emailErr, setEmailErr } = useContext(AuthContext)
  const { passwordErr, setPasswordErr } = useContext(AuthContext)
  const { isOrg, setIsOrg } = useContext(AuthContext)
  const { hasSignedIn } = useContext(AuthContext)
  const router = useRouter()

  const clearInput = useCallback(() => {
    setEmail('')
    setPassword('')
  }, [setEmail, setPassword])

  const clearErrs = useCallback(() => {
    setEmailErr('')
    setPasswordErr('')
  }, [setEmailErr, setPasswordErr])

  const handleSignUp = async () => {
    clearErrs()
    const auth = getAuth(fire)
    const db = getFirestore(fire)

    try {
      await createUserWithEmailAndPassword(auth, email, password)
      await setDoc(doc(db, 'users', email), {
        email: email,
        isOrg: isOrg === 'false' ? false : true,
        jobList: []
      })
      router.push('/login')
    } catch (err) {
      if (err instanceof FirebaseError) {
        const { code, message } = err
        if (code === 'auth/email-already-in-use' || code === 'auth/invalid-email') {
          setEmailErr(message)
        }

        if (code === 'auth/weak-password') {
          setPasswordErr(message)
        }

        return
      }
      console.error('Error adding document: ', err)
    }
  }

  const authListener = useCallback(() => {
    const auth = getAuth(fire)
    onAuthStateChanged(auth, user => {
      if (user) {
        clearInput()
        setUser(user)
      } else {
        setUser('')
      }
    })
  }, [setUser, clearInput])

  useEffect(() => {
    authListener()
    if (hasSignedIn) {
      router.push('/')
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
        <Input
          htmlFor='isOrg'
          label='Are you signing up as a company?'
          dropdown={true}
          handleOnChange={ev => setIsOrg(ev)}
        />
        <Button label='Sign Up' onClick={handleSignUp} />
        <HelperMsg content='Already have an account?' option='Sign in' url='login' />
      </div>
    </div>
  )
}

export default SignUp
