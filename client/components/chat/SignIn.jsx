import React from 'react'

import firebase from 'firebase/app'
import firebaseApp from '../../firebase.config'

const auth = firebaseApp.auth()

export default function SignIn () {
  const SignInWithGoogle = () => {
    const provider = new firebase.auth.GoogleAuthProvider()
    auth.signInWithPopup(provider)
  }

  return (
    <button className='sign-in' onClick={SignInWithGoogle}>sign in with Google</button>
  )
}
