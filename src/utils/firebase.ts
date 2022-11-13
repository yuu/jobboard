import firebase from 'firebase/compat/app'
import 'firebase/compat/auth'
import 'firebase/compat/firestore'

const firebaseConfig = {
  apiKey: `${process.env.NEXT_PUBLIC_Firebase_API_Key}`,
  authDomain: `${process.env.NEXT_PUBLIC_Auth_Domain}`,
  projectId: `${process.env.NEXT_PUBLIC_Project_Id}`,
  storageBucket: `${process.env.NEXT_PUBLIC_Storage_Bucket}`,
  messagingSenderId: `${process.env.NEXT_PUBLIC_Message_Sender_Id}`,
  appId: `${process.env.NEXT_PUBLIC_App_Id}`
}

const fire = firebase.initializeApp(firebaseConfig)

export default fire
